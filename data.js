// Plan : "jour(s)|titre". Les plages sont étendues automatiquement.
const RAW=`1|Le web et le fonctionnement d'un site
2|Structure HTML et balises
3|Titres, paragraphes, listes
4|Liens, images, attributs
5|Tableaux et formulaires
6|HTML sémantique
7|Mini-projet : page de profil
8|CSS : bases et sélecteurs
9|Couleurs, polices, unités
10|Box model
11|Display et position
12|Flexbox
13|Grid
14|Design responsive
15|Media queries
16|Animations et transitions
17-18|Cloner un site simple
19|Git : bases
20|Workflow GitHub
21|Branches et merge
22|Pousser ses projets
23|JavaScript : intro et variables
24|Types de données et opérateurs
25|Conditions
26|Boucles
27|Fonctions
28|Tableaux
29|Objets
30|Exercices pratiques JS
31|Scope et hoisting
32|Arrow functions
33|Méthodes de tableaux
34|Méthodes de chaînes
35|Déstructuration
36|Spread et rest
37|Callbacks
38|Promises
39|async/await
40|Gestion d'erreurs
41-45|Mini-projets JS
46|Bases du DOM
47|Événements
48|Gestion des formulaires
49|LocalStorage
50|Fetch API
51-55|Apps JS (Todo, Calculatrice)
56|Bases de React
57|JSX et composants
58|Props
59|State
60|Petite app React
61-62|Hooks (useState, useEffect)
63|Rendu conditionnel
64|Listes et keys
65|Formulaires React
66|React Router
67|Context API
68|Intégration d'API
69|Gestion d'erreurs React
70|Performances de base
71-75|Projet : app météo
76-80|Projet : UI d'authentification
81-85|Projet : UI de dashboard
86-90|Projet : application React complète
91|Bases de Node.js
92|Modules
93|Introduction à Express
94|Routing
95|Middleware
96|API REST
97|Postman
98|Architecture MVC
99|Gestion d'erreurs Express
100|Validation
101|JWT
102|API de login
103|API d'inscription
104|Hachage de mots de passe
105|Authentification par rôles
106-110|Projet d'authentification
111-113|API CRUD
114-115|Pagination
116-117|Recherche
118-120|Mini-projet backend
121-125|MongoDB
126-128|Conception de schémas
129-130|Indexation
131-135|Connecter frontend + backend
136-140|Authentification full stack
141-145|Bases du paiement en ligne
146-150|Projet full stack
151-155|Bases de la sécurité
156-158|Déploiement
159-160|Bases du CI/CD
161-167|Projet : application e-commerce
168-171|Projet : dashboard admin
172-175|Projet : plateforme de blog
176|Construire son CV
177|Nettoyer son GitHub
178|Questions d'entretien
179-180|Bases du system design`;

const DAYS=[];
RAW.split('\n').forEach(l=>{
  const[r,t]=l.split('|'),[a,b=a]=r.split('-').map(Number);
  for(let d=a;d<=b;d++)DAYS[d]={n:d,title:a==b?t:`${t} (${d-a+1}/${b-a+1})`};
});

// Leçons détaillées (t = cours, s = code de départ, x = travaux pratiques)
const LESSONS={
1:{t:`<h3>Comment fonctionne le web</h3>
<p>Quand tu tapes une adresse, ton <b>navigateur</b> (client) envoie une requête <b>HTTP</b> à un <b>serveur</b>. Celui-ci renvoie des fichiers : <code>HTML</code> (structure), <code>CSS</code> (style), <code>JavaScript</code> (comportement).</p>
<ul><li><b>DNS</b> : traduit <code>exemple.com</code> en adresse IP</li><li><b>Requête</b> : <code>GET /index.html</code></li><li><b>Réponse</b> : code 200 + fichier, ou 404 si introuvable</li></ul>
<p>Astuce : ouvre F12 → onglet Réseau, recharge une page et observe les requêtes.</p>`,
s:`<h1>Mon premier site</h1>\n<p>Bonjour le web !</p>`,
x:['Observer les requêtes d\'un site dans F12 > Réseau','Expliquer client, serveur, HTTP et DNS avec mes propres mots','Modifier le titre ci-dessus et exécuter le code']},
2:{t:`<h3>Structure d'une page HTML</h3>
<p>Une page HTML est un arbre de <b>balises</b>. Une balise s'ouvre <code>&lt;p&gt;</code> et se ferme <code>&lt;/p&gt;</code>.</p>
<ul><li><code>&lt;!DOCTYPE html&gt;</code> : déclare le HTML5</li><li><code>&lt;head&gt;</code> : infos invisibles (titre, encodage)</li><li><code>&lt;body&gt;</code> : contenu visible</li></ul>
<p>Les balises s'imbriquent : toujours fermer la dernière ouverte en premier.</p>`,
s:`<!DOCTYPE html>\n<html lang="fr">\n<head>\n  <meta charset="UTF-8">\n  <title>Ma page</title>\n</head>\n<body>\n  <p>Contenu</p>\n</body>\n</html>`,
x:['Écrire de mémoire une page complète, sans copier','Provoquer une erreur d\'imbrication et observer le résultat','Ajouter 3 balises différentes dans le body']},
3:{t:`<h3>Titres, paragraphes, listes</h3>
<ul><li><code>&lt;h1&gt;</code> à <code>&lt;h6&gt;</code> : titres (un seul h1 par page)</li><li><code>&lt;p&gt;</code> : paragraphe</li><li><code>&lt;ul&gt;</code> liste à puces, <code>&lt;ol&gt;</code> liste numérotée, <code>&lt;li&gt;</code> élément</li><li><code>&lt;strong&gt;</code> / <code>&lt;em&gt;</code> : importance / emphase</li></ul>`,
s:`<h1>Ma recette</h1>\n<h2>Ingrédients</h2>\n<ul>\n  <li>...</li>\n</ul>\n<h2>Étapes</h2>\n<ol>\n  <li>...</li>\n</ol>`,
x:['Écrire une page de recette avec h1, h2, ul et ol','Utiliser strong et em au moins une fois','Imbriquer une liste dans une liste']}
};
