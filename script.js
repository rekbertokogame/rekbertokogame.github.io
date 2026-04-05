// =======================================
// REKBER.TOKOGAME - GAMING CYBER SCRIPT
// Compatible with HERO HTML + CYBER CSS
// =======================================

// ====== GANTI PUNYA KAMU ======
const BIN_ID = "69d1f30236566621a87e15a8";
const API_KEY = "$2a$10$CLLq1Bg7g2u726GLpRCVUuKOBsg/roXfp2eyTLehLpC241DeevMoG";
// ==============================

// ELEMENTS (PASTI ADA DI HTML)
const elTitle   = document.getElementById("title");
const elSubtitle= document.getElementById("subtitle");
const elAvatar  = document.getElementById("avatar");
const elLinks   = document.getElementById("links");

// SAFETY CHECK
if (!elTitle || !elSubtitle || !elAvatar || !elLinks) {
  console.error("❌ Element HTML tidak lengkap");
}

// FETCH JSONBIN
fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
  headers: {
    "X-Master-Key": API_KEY
  }
})
.then(res => {
  if (!res.ok) throw new Error("Network response error");
  return res.json();
})
.then(res => {
  const d = res.record;


  const bg = document.getElementById("bgImage");
if (d.background && bg) {
  bg.style.backgroundImage = `url(${d.background})`;
}


  /* ===============================
     HERO CONTENT
  ================================= */

  // TITLE
  if (d.title) {
    elTitle.textContent = d.title;
  }

  // SUBTITLE / DESCRIPTION
  if (d.subtitle) {
    elSubtitle.textContent = d.subtitle;
  }

  // AVATAR / LOGO
  if (d.avatar) {
    elAvatar.src = d.avatar;
  }

  /* ===============================
     LINKS SECTION
  ================================= */

  elLinks.innerHTML = "";

  if (Array.isArray(d.links) && d.links.length > 0) {
    d.links.forEach((link, index) => {

      const a = document.createElement("a");
      a.href = link.url || "#";
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "link" + (index === 0 ? " primary" : "");

      a.innerHTML = `
        ${link.icon ? `<img src="${link.icon}" alt="">` : ""}
        <span>${link.label || "Link"}</span>
      `;

      // MICRO ANIMATION (STAGGER)
      a.style.opacity = "0";
      a.style.transform = "translateY(8px)";
      a.style.animation = `fadeUp .4s ease forwards`;
      a.style.animationDelay = `${index * 0.08}s`;

      elLinks.appendChild(a);
    });
  } else {
    elLinks.innerHTML = `
      <div style="
        text-align:center;
        opacity:.7;
        font-size:13px;
        padding:20px
      ">
        Tidak ada link tersedia
      </div>
    `;
  }
})
.catch(err => {
  console.error("❌ Gagal memuat data:", err);
  elLinks.innerHTML = `
    <div style="
      text-align:center;
      opacity:.7;
      font-size:13px;
      padding:20px
    ">
      ❌ Gagal memuat data
    </div>
  `;
});

/* ===============================
   ANIMATION SUPPORT
================================= */
const style = document.createElement("style");
style.innerHTML = `
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;
document.head.appendChild(style);
