// Like icoon
const likeIconen = document.querySelectorAll(".bottom-like i");
likeIconen.forEach((icoon) => {
  icoon.addEventListener("click", () => {
    icoon.classList.toggle("fa-regular");
    icoon.classList.toggle("fa-solid");
    icoon.classList.toggle("liked");
  });
});

// Navigatie tussen Home, Zoeken en Profiel
document.querySelectorAll(".bottom-nav .nav-icon").forEach((icoon, index) => {
  icoon.addEventListener("click", () => {
    document
      .querySelectorAll(".feed, .search-page, .profile-page")
      .forEach((pagina) => {
        pagina.style.display = "none";
      });

    if (index === 0) { // Home
      document.querySelector(".feed").style.display = "flex";
    } else if (index === 1) { // Zoeken
      document.querySelector(".search-page").style.display = "flex";
    } else if (index === 2) { // Profiel
      document.querySelector(".profile-page").style.display = "flex";
    }
  });
});

//Stories 2 foto's per persoon
const verhaalAfbeeldingen = {
  0: ["stories/Billie Sto 1.webp", "stories/Billie Sto 2.webp"],
  1: ["stories/Central Sto 1.jpg", "stories/Central Sto 2.jpg"],
  2: ["stories/Travis Sto 1.jpg", "stories/Travis Sto 2.png"],
  3: ["stories/Doja Sto 1.jpeg", "stories/Doja Sto 2.jpg"],
};

// Story openen, sluiten en navigeren
const kijker = document.getElementById("storyViewer");
const kijkerAfbeelding = document.getElementById("storyImage");
const sluitKnop = document.getElementById("closeStory");
const volgendeKnop = document.getElementById("nextStory");
const vorigeKnop = document.getElementById("prevStory");

let huidigeVerhaal = 0;
let huidigeFoto = 0;
let isEnkelVerhaalModus = false;

// Toon de eerste afbeelding van het verhaal
function toonVerhaalAfbeelding() {
  const verhalenMeta = [
    { naam: "Billie Eilish", pic: "Billie Eilish PFP.png" },
    { naam: "Central Cee", pic: "Central Cee PFP.jpg" },
    { naam: "Travis Scott", pic: "Travis Scott PFP.jpg" },
    { naam: "Doja Cat", pic: "Doja Cat PFP.png" },
  ];

  kijkerAfbeelding.src = verhaalAfbeeldingen[huidigeVerhaal][huidigeFoto];

  const { naam, pic } = verhalenMeta[huidigeVerhaal];
  document.getElementById("storyUsername").textContent = naam;
  document.getElementById("storyProfilePic").src = pic;
}

// Eerste foto geen vorige knop, laatste foto geen volgende knop
function updateKnoppen() {
  const isEerste = huidigeFoto === 0;
  const isLaatste = huidigeFoto === verhaalAfbeeldingen[huidigeVerhaal].length - 1;

  if (isEnkelVerhaalModus) {
    vorigeKnop.style.display = isEerste ? "none" : "block";
    volgendeKnop.style.display = isLaatste ? "none" : "block";
  } else {
    const isEersteGlobaal = huidigeVerhaal === 0 && isEerste;
    const isLaatsteGlobaal = !verhaalAfbeeldingen[huidigeVerhaal + 1] && isLaatste;

    vorigeKnop.style.display = isEersteGlobaal ? "none" : "block";
    volgendeKnop.style.display = isLaatsteGlobaal ? "none" : "block";
  }
}

// Als je op een verhaal klikt, open het verhaal van de persoon dat je hebt aangeklikt
document.querySelectorAll(".story").forEach((verhaal, index) => {
  verhaal.addEventListener("click", () => {
    huidigeVerhaal = index;
    huidigeFoto = 0;
    isEnkelVerhaalModus = false;
    toonVerhaalAfbeelding();
    kijker.classList.add("show");
    updateKnoppen();
  });
});

// Sluit de story viewer met de kruisje
sluitKnop.addEventListener("click", () => {
  kijker.classList.remove("show");
});

// Laat je in de story navigeren met de pijltjes
volgendeKnop.addEventListener("click", () => {
  huidigeFoto++;
  const afbeeldingen = verhaalAfbeeldingen[huidigeVerhaal];

  if (huidigeFoto >= afbeeldingen.length) {
    if (isEnkelVerhaalModus) {
      huidigeFoto = afbeeldingen.length - 1;
    } else {
      huidigeVerhaal++;
      huidigeFoto = 0;
      if (!verhaalAfbeeldingen[huidigeVerhaal]) {
        kijker.classList.remove("show");
        return;
      }
    }
  }

  toonVerhaalAfbeelding();
  updateKnoppen();
});

// Laat je terug navigeren in de story de pijltje
vorigeKnop.addEventListener("click", () => {
  if (huidigeFoto > 0) {
    huidigeFoto--;
  } else if (!isEnkelVerhaalModus && huidigeVerhaal > 0) {
    huidigeVerhaal--;
    huidigeFoto = verhaalAfbeeldingen[huidigeVerhaal].length - 1;
  }
  toonVerhaalAfbeelding();
  updateKnoppen();
});

// Navigatie tussen Home, Zoeken en Profiel in de sidebar
const zijbalkKnoppen = document.querySelectorAll(".sidebar-btn");

const profielKnoppen = Array.from(zijbalkKnoppen).filter((knop) =>
  knop.querySelector(".fa-user")
);
const homeKnoppen = Array.from(zijbalkKnoppen).filter((knop) =>
  knop.querySelector(".fa-house")
);
const zoekKnoppen = Array.from(zijbalkKnoppen).filter((knop) =>
  knop.querySelector(".fa-magnifying-glass")
);

//Wat gebeurt er als je op de knoppen klikt op de sidebar
const feed = document.querySelector(".feed");
const profielPagina = document.querySelector(".profile-page");
const zoekPagina = document.querySelector(".search-page");

// Wat gebeurt er als je op de profiel knoppen klikt
const aangepasteProfielen = {
  centralcee: document.getElementById("profile-centralcee"),
  travisscott: document.getElementById("profile-travisscott"),
  billieeilish: document.getElementById("profile-billieeilish"),
};

// Alle pagina's die we hebben
const allePagina = [
  feed,
  profielPagina,
  zoekPagina,
  ...Object.values(aangepasteProfielen),
];

// Functie om alle pagina's te verbergen
function verbergAllePagina() {
  allePagina.forEach((pagina) => {
    if (pagina) pagina.style.display = "none";
  });
}

// Verberg de pagina's en toon de profile
profielKnoppen.forEach((knop) => {
  knop.addEventListener("click", () => {
    verbergAllePagina();
    profielPagina.style.display = "flex";
  });
});

// Verberg de pagina's en toon de home
homeKnoppen.forEach((knop) => {
  knop.addEventListener("click", () => {
    verbergAllePagina();
    feed.style.display = "flex";
  });
});

// Verberg de pagina's en toon de zoek pagina
zoekKnoppen.forEach((knop) => {
  knop.addEventListener("click", () => {
    verbergAllePagina();
    zoekPagina.style.display = "flex";
  });
});

// Recent profil in zoekbalk kan bekijken
const recenteProfielen = document.querySelectorAll(".recent-profile");
recenteProfielen.forEach((profiel) => {
  profiel.addEventListener("click", () => {
    const id = profiel.getAttribute("data-profile");
    const doel = aangepasteProfielen[id];
    if (doel) {
      verbergAllePagina();
      doel.style.display = "flex";
    }
  });
});

// Story avatar en naam klikbaar maken
document.querySelectorAll(".post-header .avatar").forEach((avatar) => {
  avatar.style.cursor = "pointer";
  avatar.addEventListener("click", () => {
    const index = avatar.getAttribute("data-story");
    if (verhaalAfbeeldingen[index]) {
      huidigeVerhaal = parseInt(index);
      huidigeFoto = 0;
      isEnkelVerhaalModus = false;
      toonVerhaalAfbeelding();
      kijker.classList.add("show");
      updateKnoppen();
    }
  });
});

// Als je op de naam van de gebruiker klikt, ga je naar zijn profiel
document.querySelectorAll(".post-header .username").forEach((naamEl) => {
  naamEl.style.cursor = "pointer";
  naamEl.addEventListener("click", () => {
    const id = naamEl.getAttribute("data-profile");
    const doel = aangepasteProfielen[id];
    if (doel) {
      verbergAllePagina();
      doel.style.display = "flex";
    }
  });
});

// Als je op de grote avatar klikt, ga je naar de storie van die persoon
document.querySelectorAll(".avatar-large").forEach((avatar) => {
  avatar.style.cursor = "pointer";
  avatar.addEventListener("click", () => {
    const src = avatar.getAttribute("src");

    let index = -1;
    if (src.includes("Billie")) index = 0;
    else if (src.includes("Central")) index = 1;
    else if (src.includes("Travis")) index = 2;
    else if (src.includes("Doja")) index = 3;

    if (index >= 0) {
      huidigeVerhaal = index;
      huidigeFoto = 0;
      isEnkelVerhaalModus = true;
      toonVerhaalAfbeelding();
      kijker.classList.add("show");
      updateKnoppen();
    }
  });
});

// Als je een afbeelding in een profiel klikt, zien we de foto in het midden (lightbox)
let huidigeIndex = 0;
let huidigeGalerij = [];
let huidigeProfielNaam = "";

document.querySelectorAll(".profile-posts").forEach((galerij) => {
  const afbeeldingen = Array.from(galerij.querySelectorAll("img"));
  const profielNaam =
    galerij.closest(".profile-page").querySelector("h2")?.textContent || "";

  afbeeldingen.forEach((img, index) => {
    img.addEventListener("click", () => {
      huidigeIndex = index;
      huidigeGalerij = afbeeldingen;
      huidigeProfielNaam = profielNaam;
      openLightbox(img.src);
    });
  });
});

// Als je op de eerste foto kllikt is er geen vorige knop, en als je op de laatste foto klikt is er geen volgende knop
function openLightbox(src) {
  document.getElementById("lightbox-img").src = src;
  document.getElementById("lightbox").style.display = "flex";

  const vorigePijl = document.getElementById("lightbox-prev");
  const volgendePijl = document.getElementById("lightbox-next");

  vorigePijl.style.display = huidigeIndex === 0 ? "none" : "block";
  volgendePijl.style.display =
    huidigeIndex === huidigeGalerij.length - 1 ? "none" : "block";
}

// Om te foto te sluiten
function sluitLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Om te kunnen navigeren tussen afbeeldingen
function toonVorigeAfbeelding() {
  if (huidigeIndex > 0) {
    huidigeIndex--;
    const img = huidigeGalerij[huidigeIndex];
    openLightbox(img.src);
  }
}

// Om te kunnen navigeren tussen afbeeldingen
function toonVolgendeAfbeelding() {
  if (huidigeIndex < huidigeGalerij.length - 1) {
    huidigeIndex++;
    const img = huidigeGalerij[huidigeIndex];
    openLightbox(img.src);
  }
}

// Als je op  de kruisje klikt, sluit de photo
document
  .getElementById("lightbox-close")
  .addEventListener("click", sluitLightbox);
// Âls je op de vorige pijltje klikt, ga je naar de vorige afbeelding
document
  .getElementById("lightbox-prev")
  .addEventListener("click", toonVorigeAfbeelding);
// Als je op de volgende pijltje klikt, ga je naar de volgende afbeelding
document
  .getElementById("lightbox-next")
  .addEventListener("click", toonVolgendeAfbeelding);

// Sluit de foto als je op de Escape-toets drukt
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    kijker.classList.remove("show");
    sluitLightbox();
  }
});