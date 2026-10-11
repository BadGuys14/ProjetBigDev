// Données de la roadmap
const ROADMAP = [
    { day: 1, title: "Qu'est-ce que le web ?", topic: "HTML", content: "Le Web est un système de documents interconnectés par HTTP. Le client (navigateur) fait une requête au serveur qui renvoie la page." },
    { day: 2, title: "Structure HTML et balises", topic: "HTML", content: "Une page HTML commence par <!DOCTYPE html>, <html>, <head> et <body>. Les balises s'ouvrent et se ferment." },
    { day: 3, title: "Titres, paragraphes, listes", topic: "HTML", content: "Utilisez <h1> à <h6> pour la hiérarchie des titres, <p> pour le texte, et <ul>/<ol> avec <li> pour les listes." },
    { day: 4, title: "Liens, images, attributs", topic: "HTML", content: "<a href='...'> permet de créer des hyperliens. <img src='...' alt='...'> insère des images." },
    { day: 5, title: "Tableaux et formulaires", topic: "HTML", content: "Les formulaires utilisent <form>, <input>, <label> et <button> pour récolter les informations des utilisateurs." }
];

const UNLOCKED_KEY = "fullstack_unlocked_day";
const LAST_DATE_KEY = "fullstack_last_completed_date";

function getUnlockedDay() {
    return parseInt(localStorage.getItem(UNLOCKED_KEY)) || 1;
}

function getLastDate() {
    return localStorage.getItem(LAST_DATE_KEY);
}

function getTodayStr() {
    return new Date().toISOString().split('T')[0];
}

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("roadmap-grid")) {
        renderRoadmap();
    }
    if (document.getElementById("course-content")) {
        loadLesson();
    }
});

// Afficher les cartes dans le tableau de bord
function renderRoadmap() {
    const grid = document.getElementById("roadmap-grid");
    const unlockedDay = getUnlockedDay();
    const lastDate = getLastDate();
    const today = getTodayStr();

    grid.innerHTML = "";

    // Génère 180 jours
    for (let i = 1; i <= 180; i++) {
        const item = ROADMAP.find(r => r.day === i) || { day: i, title: `Leçon du Jour ${i}`, topic: "Fullstack" };
        const card = document.createElement("div");
        card.className = "card";

        let statusText = "";
        if (i < unlockedDay) {
            card.classList.add("completed");
            statusText = "<span class='status-badge' style='color:#4ade80;'>✅ Terminé</span>";
        } else if (i === unlockedDay) {
            if (lastDate === today && i > 1) {
                card.classList.add("waiting");
                statusText = "<span class='status-badge' style='color:#f59e0b;'>⏳ Disponible demain</span>";
            } else {
                card.classList.add("active");
                statusText = "<span class='status-badge' style='color:#38bdf8;'>🔓 Disponible</span>";
            }
        } else {
            card.classList.add("locked");
            statusText = "<span class='status-badge' style='color:#94a3b8;'>🔒 Verrouillé</span>";
        }

        card.innerHTML = `
            <h3>Jour ${item.day}</h3>
            <p>${item.title}</p>
            ${statusText}
        `;

        card.onclick = () => openDay(i);
        grid.appendChild(card);
    }

    // Mise à jour de la barre de progression
    const completed = unlockedDay - 1;
    document.getElementById("completed-count").innerText = completed;
    document.getElementById("progress-fill").style.width = `${(completed / 180) * 100}%`;
}

// Tenter d'ouvrir une leçon
function openDay(day) {
    const unlockedDay = getUnlockedDay();
    const lastDate = getLastDate();
    const today = getTodayStr();

    if (day > unlockedDay) {
        alert(`🔒 Le jour ${day} est verrouillé. Terminez d'abord les leçons précédentes.`);
        return;
    }

    if (day === unlockedDay && lastDate === today && day > 1) {
        alert("🛑 Vous avez déjà validé votre leçon pour aujourd'hui ! Prenez le temps d'assimiler la notion. La suite sera débloquée demain à minuit.");
        return;
    }

    window.location.href = `day.html?day=${day}`;
}

// Charger le contenu de la leçon dans day.html
function loadLesson() {
    const urlParams = new URLSearchParams(window.location.search);
    const day = parseInt(urlParams.get("day")) || 1;
    const item = ROADMAP.find(r => r.day === day) || { day: day, title: `Leçon ${day}`, content: "Contenu de la leçon à venir..." };

    document.getElementById("day-title").innerText = `Jour ${item.day} : ${item.title}`;
    document.getElementById("course-content").innerHTML = `<p>${item.content}</p>`;
}

// Exécuter le code dans l'éditeur
function runCode() {
    const code = document.getElementById("code-editor").value;
    const consoleBox = document.getElementById("console-output");
    consoleBox.innerHTML = "";

    try {
        let logs = [];
        const originalLog = console.log;
        console.log = (...args) => {
            logs.push(args.join(" "));
            originalLog(...args);
        };

        let result = eval(code);
        console.log = originalLog;

        if (logs.length > 0) {
            consoleBox.innerHTML += `<div>> ${logs.join("<br>> ")}</div>`;
        }
        if (result !== undefined) {
            consoleBox.innerHTML += `<div>Résultat : ${result}</div>`;
        }
        if (logs.length === 0 && result === undefined) {
            consoleBox.innerHTML += `<div style="color: #38bdf8;">Code exécuté sans erreur.</div>`;
        }
    } catch (err) {
        consoleBox.innerHTML = `<div style="color: #f87171;">Erreur : ${err.message}</div>`;
    }
}

// Valider la journée
function validateCurrentDay() {
    const urlParams = new URLSearchParams(window.location.search);
    const day = parseInt(urlParams.get("day")) || 1;
    const today = getTodayStr();

    localStorage.setItem(LAST_DATE_KEY, today);
    localStorage.setItem(UNLOCKED_KEY, day + 1);

    alert(`🎉 Félicitations ! Le jour ${day} est validé.\n\nRendez-vous demain pour le jour ${day + 1} !`);
    window.location.href = "index.html";
}
