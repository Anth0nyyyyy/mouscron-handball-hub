# Site Web du HC Mouscron

> Ce projet est un site vitrine que je développe en tant qu'étudiant pour mon club de handball, le HC Mouscron, afin de moderniser sa présence en ligne.

##  Démarrage Rapide

Pour lancer le projet sur votre machine en local, suivez ces étapes.

# **Prérequis :**
Assurez-vous d'avoir [Node.js](https://nodejs.org/) (version 18 ou supérieure) et npm installés.

# **Installation :**

# 1. Clonez ce dépôt
git clone https://github.com/Anth0nyyyyy/mouscron-handball-hub.git

# 2. Naviguez dans le répertoire du projet
cd mouscron-handball-hub

# 3. Installez les dépendances
npm install

# 4. Lancez le serveur de développement
npm run dev

Le site sera alors visible à l'adresse http://localhost:5173. Le rechargement automatique est activé pour chaque modification du code.

# Technologies Utilisées

Ce projet est construit avec un stack moderne pour garantir performance et une bonne expérience utilisateur :

    Vite : Outil de build frontend ultra-rapide.

    React : Bibliothèque JavaScript pour la construction d'interfaces utilisateur.

    TypeScript : Pour un code plus sûr et plus robuste.

    Tailwind CSS : Framework CSS pour un design rapide et personnalisé.

    shadcn/ui : Collection de composants d'interface utilisateur accessibles.

    React Router : Pour la gestion des routes et de la navigation (client-side).

    Framer Motion : Pour créer des animations fluides et complexes.

# Déploiement

Le site est actuellement hébergé chez OVH.

Pour mettre à jour le site en production, il faut suivre ces étapes :

    Générer les fichiers statiques optimisés pour la production avec la commande :
        
    npm run build

    Transférer le contenu du dossier dist (qui vient d'être créé) sur le serveur d'hébergement via un client FTP (comme FileZilla) ou tout autre moyen fourni par OVH.
