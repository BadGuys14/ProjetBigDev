<div align="center">

# 🚀 ProjetBigDev

**Ma plateforme d'apprentissage personnelle pour maîtriser le développement Fullstack en 180 jours.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/H%C3%A9bergement-GitHub_Pages-181717?logo=github&logoColor=white)
![Hors ligne](https://img.shields.io/badge/Fonctionne-hors_ligne-3ecf8e)

*Créé par **Emmanuel BILOMBO-SILAHO**, développeur congolais 🇨🇬🇨🇩*

</div>

---

## 📖 À propos

**ProjetBigDev** est un site web statique conçu sur mesure pour m'accompagner, pas à pas, dans une roadmap Fullstack de **180 jours** : du HTML jusqu'au déploiement et à la préparation d'entretiens.

Le principe est simple : **1 jour = 1 leçon**. Pour m'obliger à garder un rythme régulier et à ne pas survoler les notions, le site verrouille automatiquement la suite tant que je n'ai pas terminé la leçon du jour, puis jusqu'au lendemain.

Aucun serveur, aucune dépendance, aucun framework : uniquement du **HTML, du CSS et du JavaScript pur**.

---

## ✨ Fonctionnalités

| Fonctionnalité | Description |
|---|---|
| 📊 **Tableau de bord** | Barre de progression dynamique et grille des 180 jours |
| 🔒 **Verrouillage strict** | Impossible de sauter des leçons à l'avance |
| ⏳ **Règle anti-précipitation** | Après validation, la leçon suivante s'ouvre le lendemain |
| 🏷️ **Badges d'état** | `Verrouillé` · `Disponible` · `Terminé` · `En attente de demain` |
| 📚 **Page de cours quotidienne** | Théorie du jour + travaux pratiques à cocher |
| ✅ **Validation par les TP** | Le bouton « Valider » ne s'active que lorsque tous les TP sont cochés |
| 💻 **Éditeur de code intégré** | Écriture de HTML, CSS ou JavaScript dans le navigateur |
| ▶️ **Exécution instantanée** | Bouton « Exécuter le code » (ou `Ctrl + Entrée`) |
| 🖥️ **Console intégrée** | Affiche les `console.log` et les erreurs en direct |
| 👁️ **Aperçu visuel** | Rendu en direct pour les jours HTML/CSS/DOM |
| 💾 **Sauvegarde automatique** | Le code de chaque jour est conservé dans le navigateur |
| 📴 **Hors ligne** | Aucune ressource externe nécessaire |

---

## 🗺️ La roadmap en un coup d'œil

| Mois | Thème | Jours |
|---|---|---|
| **1** | Fondamentaux du web : HTML, CSS, Git & GitHub, bases de JavaScript | 1 – 30 |
| **2** | Maîtrise de JavaScript : JS moderne, asynchrone, DOM, intro à React | 31 – 60 |
| **3** | Frontend React : hooks, routing, context, API, projets | 61 – 90 |
| **4** | Backend : Node.js, Express, API REST, authentification (JWT) | 91 – 120 |
| **5** | Bases de données & Full Stack : MongoDB, intégration, paiement | 121 – 150 |
| **6** | Avancé & prêt pour l'emploi : sécurité, déploiement, CI/CD, gros projets, carrière | 151 – 180 |

Le détail jour par jour se trouve dans [`data.js`](data.js).

---

## 🗂️ Structure du projet

```
ProjetBigDev/
├── index.html   # Tableau de bord : progression + grille des 180 jours
├── day.html     # Page de cours : théorie, TP, éditeur, console
├── app.js       # Logique : verrouillage, progression, exécution du code
├── data.js      # Plan des 180 jours + contenu des leçons
├── style.css    # Thème sombre partagé
└── README.md
```

---

## 🔐 Comment fonctionne le verrouillage

La progression est stockée dans le `localStorage` du navigateur, sous la forme `{ numéro du jour : date de validation }`.

- **Jour 1** : disponible dès le départ.
- Quand je valide le jour *N*, la date du jour est enregistrée.
- Le jour *N + 1* reste en **« Demain »** jusqu'à ce que la date change.
- Tout jour au-delà de *N + 1* reste **verrouillé**.
- Un jour terminé reste consultable à tout moment.

> ⚠️ Le `localStorage` peut être vidé ou modifié depuis le navigateur : ce verrouillage est un outil de **discipline personnelle**, pas une mesure de sécurité.

---

## 💻 L'éditeur et la console

Le code est exécuté dans un `<iframe>` isolé (`sandbox="allow-scripts"`) :

- **Jours HTML / CSS / DOM** : le code est interprété comme une page HTML, avec aperçu visuel.
- **Autres jours** : le code est exécuté comme du JavaScript ; les résultats de `console.log` et les erreurs s'affichent dans la console.
- Les erreurs (syntaxe, exécution, promesses rejetées) sont affichées en rouge.

> ℹ️ Node.js, React, MongoDB et Git ne s'exécutent pas dans le navigateur. Pour ces jours, l'éditeur sert de bac à sable JavaScript et la pratique réelle se fait en local, dans un terminal.

---

## ▶️ Utilisation

### En local (sans internet)

1. Télécharge ou clone le dossier.
2. Double-clique sur `index.html`.
3. C'est tout. 🎉

Garde toujours le **même navigateur** et le **même emplacement** de dossier : la progression y est liée.

### Via GitHub Pages (accessible partout)

1. Crée un dépôt GitHub (par ex. `ProjetBigDev`) et pousse-y tous les fichiers.
2. Va dans **Settings → Pages**.
3. Dans *Build and deployment*, choisis **Deploy from a branch**, puis la branche `main` et le dossier `/ (root)`.
4. Après une minute environ, le site est en ligne à l'adresse `https://<ton-pseudo>.github.io/ProjetBigDev/`.

---

## ✍️ Ajouter ou enrichir une leçon

Toutes les leçons se trouvent dans l'objet `LESSONS` de [`data.js`](data.js). Pour écrire la leçon du jour *N* :

```js
LESSONS[4] = {
  t: `<h3>Liens et images</h3>
      <p>La balise <code>&lt;a&gt;</code> crée un lien...</p>`,   // cours (HTML)
  s: `<a href="https://exemple.com">Mon lien</a>`,                // code de départ
  x: [                                                            // travaux pratiques
    'Créer un lien vers un autre site',
    'Ajouter une image avec un texte alternatif'
  ]
};
```

| Clé | Rôle |
|---|---|
| `t` | Contenu du cours (HTML) |
| `s` | Code affiché au départ dans l'éditeur |
| `x` | Liste des travaux pratiques à cocher |

Un jour sans entrée dans `LESSONS` affiche automatiquement un **cours générique** : lien vers la documentation MDN, méthode de travail et trois tâches types.

---

## 📍 État d'avancement du contenu

- [x] Moteur du site (tableau de bord, verrouillage, éditeur, console)
- [x] Plan complet des 180 jours
- [x] Leçons détaillées : **jours 1 à 3**
- [ ] Leçons détaillées : jours 4 à 180 *(cours générique en attendant)*
- [ ] Export / import de la progression
- [ ] Mode installable (PWA) pour un usage hors ligne depuis GitHub Pages

---

## 🛠️ Technologies

- **HTML5** : structure des pages
- **CSS3** : thème sombre, grille responsive
- **JavaScript (ES6+)** : logique, `localStorage`, exécution de code via `iframe` et `postMessage`

---

## 👤 Auteur

**Emmanuel BILOMBO-SILAHO**, développeur congolais, étudiant en génie logiciel.

> *« Un jour, une leçon. 180 jours pour devenir développeur Fullstack. »*

---

<div align="center">

**ProjetBigDev** · Créé par Emmanuel BILOMBO-SILAHO, développeur congolais

</div>
