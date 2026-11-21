const formations = [
  {
    id: "base",
    title: "Informatique de Base",
    short: "B",
    level: "Débutant",
    iconClass: "base",
    description: "Les fondamentaux indispensables pour prendre confiance avec l'ordinateur.",
    chapters: [
      "Découverte de l'ordinateur",
      "Gestion des fichiers",
      "Internet et sécurité",
      "Messagerie professionnelle"
    ]
  },
  {
    id: "word",
    title: "Microsoft Word",
    short: "W",
    level: "Débutant",
    iconClass: "office",
    description: "Créer des documents clairs, structurés et professionnels.",
    chapters: [
      "Premiers pas avec Word",
      "Mise en forme du texte",
      "Pages, sections et styles",
      "Tableaux et illustrations",
      "Publipostage"
    ]
  },
  {
    id: "excel",
    title: "Microsoft Excel",
    short: "X",
    level: "Débutant",
    iconClass: "office",
    description: "Organiser, analyser et présenter vos données efficacement.",
    chapters: [
      "Découvrir l'interface",
      "Saisie et mise en forme",
      "Formules essentielles",
      "Graphiques et tableaux",
      "Impression et partage"
    ]
  },
  {
    id: "powerpoint",
    title: "Microsoft PowerPoint",
    short: "P",
    level: "Intermédiaire",
    iconClass: "office",
    description: "Concevoir des présentations impactantes pour vos projets.",
    chapters: [
      "Créer une présentation",
      "Les principes du design",
      "Textes et illustrations",
      "Animations et transitions",
      "Présenter avec assurance"
    ]
  },
  {
    id: "excel-avance",
    title: "Excel Avancé",
    short: "X",
    level: "Avancé",
    iconClass: "office",
    description: "Automatiser vos analyses avec des fonctions et outils avancés.",
    chapters: [
      "Fonctions avancées",
      "Tableaux croisés dynamiques",
      "Validation des données",
      "Macros et automatisation",
      "Modélisation financière"
    ]
  },
  {
    id: "premiere",
    title: "Adobe Premiere Pro",
    short: "Pr",
    level: "Créatif",
    iconClass: "media",
    description: "Monter et produire des vidéos professionnelles étape par étape.",
    chapters: [
      "Découverte de Premiere",
      "Importer et organiser",
      "Montage et transitions",
      "Effets sonores et musique",
      "Export et diffusion"
    ]
  },
  {
    id: "capcut",
    title: "CapCut",
    short: "C",
    level: "Créatif",
    iconClass: "media",
    description: "Créer rapidement des vidéos dynamiques pour les réseaux sociaux.",
    chapters: [
      "Première vidéo avec CapCut",
      "Découper et assembler",
      "Texte et sous-titres",
      "Effets tendance",
      "Export pour les réseaux"
    ]
  }
];

const grid = document.getElementById("formationGrid");
const overlay = document.getElementById("courseOverlay");
const chapterList = document.getElementById("chapterList");
const lessonContent = document.getElementById("lessonContent");
let activeFormation = null;
let activeChapter = 0;

function renderFormationCards() {
  grid.innerHTML = formations.map((formation) => `
    <article class="formation-card" tabindex="0" role="button" data-id="${formation.id}" aria-label="Ouvrir ${formation.title}">
      <div class="card-top">
        <div class="course-icon ${formation.iconClass}">${formation.short}</div>
        <span class="card-level">${formation.level}</span>
      </div>
      <h3>${formation.title}</h3>
      <p>${formation.description}</p>
      <div class="card-footer">
        <span class="card-meta">${formation.chapters.length} chapitres · Vidéo</span>
        <span class="card-arrow">→</span>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".formation-card").forEach((card) => {
    const open = () => openCourse(card.dataset.id);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open();
      }
    });
  });
}

function openCourse(id) {
  activeFormation = formations.find((formation) => formation.id === id);
  activeChapter = 0;
  document.getElementById("courseTitle").textContent = activeFormation.title;
  document.getElementById("courseIcon").textContent = activeFormation.short;
  renderChapters();
  selectChapter(0);
  overlay.classList.add("open");
  overlay.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("courseClose").focus();
}

function closeCourse() {
  overlay.classList.remove("open");
  overlay.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function renderChapters() {
  chapterList.innerHTML = activeFormation.chapters.map((chapter, index) => `
    <button class="chapter-item ${index === activeChapter ? "active" : ""}" type="button" data-index="${index}">
      <span class="chapter-number">${index + 1}</span>
      <span><strong>${chapter}</strong><small>Leçon · Exercices · Correction</small></span>
      <span class="chapter-status">${index < activeChapter ? "✓" : "›"}</span>
    </button>
  `).join("");

  chapterList.querySelectorAll(".chapter-item").forEach((item) => {
    item.addEventListener("click", () => selectChapter(Number(item.dataset.index)));
  });
}

function selectChapter(index) {
  activeChapter = index;
  renderChapters();
  document.getElementById("chapterLabel").textContent = `CHAPITRE ${index + 1}`;
  document.getElementById("lessonTitle").textContent = activeFormation.chapters[index];
  document.querySelectorAll(".tab").forEach((tab, tabIndex) => tab.classList.toggle("active", tabIndex === 0));
  renderLesson("lesson");
}

function renderLesson(tabName) {
  const chapter = activeFormation.chapters[activeChapter];
  if (tabName === "lesson") {
    lessonContent.innerHTML = `
      <div class="player-card lesson-theme">
        <div class="player-main-icon">▶</div>
        <button class="player-play" type="button" aria-label="Lire la leçon">▶</button>
      </div>
    `;
  } else if (tabName === "exercise") {
    lessonContent.innerHTML = `
      <div class="player-card exercise-theme">
        <div class="player-main-icon">✎</div>
        <button class="player-play" type="button" aria-label="Voir l'exercice">▶</button>
      </div>
    `;
  } else if (tabName === "correction") {
    lessonContent.innerHTML = `
      <div class="player-card correction-theme">
        <div class="player-main-icon">✓</div>
        <button class="player-play" type="button" aria-label="Voir la correction">▶</button>
      </div>
    `;
  } else {
    lessonContent.innerHTML = `
      <div class="resource-grid">
        <div class="resource-card">
          <div class="resource-icon">PDF</div>
          <div><strong>Fiche de cours</strong><small>${chapter} · PDF</small></div>
        </div>
        <div class="resource-card">
          <div class="resource-icon">DOC</div>
          <div><strong>Fichier d'exercice</strong><small>Ressource pratique · DOC</small></div>
        </div>
      </div>
    `;
  }
}

document.getElementById("courseClose").addEventListener("click", closeCourse);
overlay.addEventListener("click", (event) => {
  if (event.target === overlay) closeCourse();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && overlay.classList.contains("open")) closeCourse();
});

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    renderLesson(tab.dataset.tab);
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

renderFormationCards();
