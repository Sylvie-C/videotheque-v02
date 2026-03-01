import { NextRequest } from 'next/server'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'   // forcer le runtime Node


const BASE_DIR = process.env.SERVER_URL!

const VIDEO_EXTENSIONS = [
  ".3gp", ".ari", ".asf", ".avi", ".dng", ".flv", ".m2ts", ".mkv", ".mov",
  ".mp4", ".mpeg", ".mpg", ".mts", ".mxf", ".ogg", ".ogv", ".r3d", ".ts",
  ".vob", ".webm"
]


export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) { 
  
  const { slug } = await params

  if (!slug.length) {
    return new Response("Missing file", { status: 400 });
  }

  // reconstruction du chemin demandé
  const requestedPath = path.join(BASE_DIR, ...slug)

  // 🔒 normalisation
  const safePath = path.normalize(requestedPath);
  const basePath = path.normalize(BASE_DIR);

  // 🔒 protection path traversal
  if (!safePath.startsWith(basePath + path.sep)) {
    return new Response("Forbidden", { status: 403 });
  }

  // 🔒 vérifier extension vidéo
  const ext = path.extname(safePath).toLowerCase();

  if (!VIDEO_EXTENSIONS.includes(ext)) {
    return new Response("Forbidden", { status: 403 });
  }

  if (!fs.existsSync(safePath)) {
    return new Response("Not found", { status: 404 });
  }

  const stat = fs.statSync(safePath);
  const fileSize = stat.size;

  const range = req.headers.get("range");

  if (!range) {
    return new Response("Requires Range header", {
      status: 416,
    });
  }

  const [startStr, endStr] =
    range.replace(/bytes=/, "").split("-");

  const start = Number(startStr);
  const end = endStr ? Number(endStr) : fileSize - 1;

  const stream = fs.createReadStream(safePath, {
    start,
    end,
  });

  return new Response(stream as any, {
    status: 206,
    headers: {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": (end - start + 1).toString(),
      "Content-Type": `video/${ext.replace(".", "")}`,
    },
  });
}
