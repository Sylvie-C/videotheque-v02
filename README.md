# Vidéothèque

Cette application est pour toi, Développeur(se) ! Elle permet :  
- de visionner tes vidéos en navigateur (navigateur moderne recommandé), si les vidéos sont au format supporté (.mp4, .webm et .ogg),  
- de visualiser la liste de tes vidéos,  
- d'imprimer un .pdf de ta vidéothèque.  

Ce projet est un projet "en dehors des clous" car il scanne le **dossier local** où se trouvent les vidéos (plus de capacité qu'en cloud), à définir en variable d'environnement.  

Mais il est prêt pour évoluer vers un déploiement fonctionnel avec storage vidéos en cloud (intéractions client-serveur avec **Server Actions**, **route backend** pour lancer lecture vidéo sans utiliser le dossier /public).  

## Dossier vidéos
Les vidéos doivent être classées dans des sous-dossiers qui respectent la structure suivante :  
``` 
|-Videos  
  |-Movies  
  |-Series  
  |-Shows  
  |-Miscellaneous  
```

On peut choisir le nom de dossier souhaité, mais les **vidéos en racine de dossier /Videos ne sont pas détectées**.  
Elles doivent donc être placées en sous-dossiers catégories.  

Dans chaque sous-dossier Catégorie de vidéos, les vidéos peuvent être placées dans d'autres sous-dossiers.  
Les **vidéos sont scannées en profondeur dans tous les sous-dossiers imbriqués**.  

### Particularité Séries : liste condensée / liste détaillée
L'application liste donc tous les fichiers contenus dans dossiers ou sous-dossiers. 

Mais pour la **catégorie "Séries"**, l'application propose l'affichage uniquement du premier sous-dossier pour une **liste condensée**.  
Ex. :  
```
|- videos  
  |- series    
    |- Desperate Housewives  
      |- Desperate Housewives S01  
        |- Desperate Housewives S01E01, Desperate Housewives S01E02, Desperate Housewives S01E03, ...  
    |- Game Of Thrones
      |- Game Of Thrones S01
        |- Game Of Thrones S01E01, Game Of Thrones S01E02, ... 
```

Si l'utilisateur choisit l'option "liste condensée", la liste contiendra :  
```
Séries  
  Desperate Housewives  
  Game Of Thrones  
  ... 
```  
Sinon, la liste contiendra le détail de tous les fichiers de chaque saison.  

### Affichage titres ou extensions
L'application propose de visualiser/imprimer la liste vidéos avec titre ou format fichier avec extension. 
 

## Variables d'environnement

### Serveur
Variables d'environnement utilisées côté serveur :  
- VIDEOS_DIR= *"chemin complet vers dossier vidéos"*. Ex. : public/videos
- BASE_URL= *"racine dossier vidéos"*. Ex. : /videos
- SERIES_DIR= *"chemin complet vers dossier séries"*. Ex. : public/videos/mes_series

- SERVER_URL= *"chemin complet URL serveur"*. Ex. : /home/[username]/Bureau, sans /videos à la fin !  
👉 **Pour lecture de vidéos en dehors du dossier /public**.    

### Client
Variables d'environnemnet utilisées côté client.  
**Ces variables doivent correspondre au nom des sous-dossiers système où se trouvent les vidéos.**    
- NEXT_PUBLIC_MOVIES_DIR= *"nom du dossier pour catégorie films, où se trouvent les vidéos de films"*. Ex. : 'Mes Films'
- NEXT_PUBLIC_SERIES_DIR= *"nom du dossier pour catégorie séries"*. Ex. : 'SÉRIES'"*
- NEXT_PUBLIC_SHOWS_DIR= *"nom du dossier pour catégorie spectacles"*. Ex. : 'Shows'
- NEXT_PUBLIC_MISC_DIR= *"nom du dossier pour catégorie divers"*. Ex. : 'Divers'
- NEXT_PUBLIC_GET_VIDEO= *"route appelée pour lecture vidéo"*. Ex. : '/api/video' ici, ou '.' si vidéos en dossier /public.
👉 **À utiliser si appel à route GET pour lecture vidéo**.  


## Techno

Comme indiqué en intro, bien que cette version du projet fonctionne pour une **vidéothèque locale** (sur PC), des **Server Actions** sont tout de même utilisées pour préparer le projet à l'utilisation de ressources distantes (vidéos en Cloud, avec data en DB), et une **route /api/video** (requête GET) permet de lire une vidéo sans utiliser le dossier  /public  .  

Ce projet est développé avec [Next.js](https://nextjs.org) et généré avec [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  

Il faut donc avoir installé **node** au préalable, ainsi que les dépendances du projet (`npm install`).  


## Démarrer l'application

Démarrer le serveur :  

```bash
npm run dev 
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) en navigateur.


## Démo Vercel

Cette [démo Vercel](https://sylvieswebcorner.netlify.app/projects) Vercel est une version simplifiée.  
L'API de démo scanne le dossier local fictif `/app/mock_folder/videos`, indiqué en variable d'environnement.  
Le/La Développeur(se) peut donc utiliser n'importe quel dossier sur son PC.  

