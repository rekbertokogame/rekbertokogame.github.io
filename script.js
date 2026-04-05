// =======================================
// REKBER.TOKOGAME - LANDING PAGE SCRIPT
// =======================================

// ====== GANTI PUNYA KAMU ======
const BIN_ID = "69d1f30236566621a87e15a8";
const API_KEY = "$2a$10$CLLq1Bg7g2u726GLpRCVUuKOBsg/roXfp2eyTLehLpC241DeevMoG";
// ==============================

const elTitle = document.getElementById("title");
const elSubtitle = document.getElementById("subtitle");
const elAvatar = document.getElementById("avatar");
const elLinks = document.getElementById("links");
const elBgImage = document.getElementById("bgImage");
const elNoticeBrand = document.getElementById("noticeBrand");
const elFooterBrand = document.getElementById("footerBrand");

if (!elTitle || !elSubtitle || !elAvatar || !elLinks) {
  console.error("❌ Element HTML tidak lengkap");
}

function escapeHtml(str) {
  return String(str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderLinks(links) {
  elLinks.innerHTML = "";

  if (!Array.isArray(links) || links.length === 0) {
    elLinks.innerHTML = `
      <div class="empty-links">
        Tidak ada link tersedia
      </div>
    `;
    return;
  }

  links.forEach((link, index) => {
    const a = document.createElement("a");
    a.href = link.url || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.className = "link" + (index === 0 ? " primary" : "");

    const iconHtml = link.icon
      ? `<img src="${escapeHtml(link.icon)}" alt="">`
      : "";

    a.innerHTML = `
      ${iconHtml}
      <span>${escapeHtml(link.label || link.title || "Link")}</span>
    `;

    a.style.opacity = "0";
    a.style.transform = "translateY(8px)";
    a.style.animation = "fadeUp .4s ease forwards";
    a.style.animationDelay = `${index * 0.08}s`;

    elLinks.appendChild(a);
  });
}

function applyData(d) {
  if (!d) return;

  if (d.title) {
    elTitle.textContent = d.title;
    document.title = `${d.title} | Trusted Gaming Rekber`;

    if (elNoticeBrand) elNoticeBrand.textContent = d.title;
    if (elFooterBrand) elFooterBrand.textContent = d.title;
  }

  if (d.subtitle) {
    elSubtitle.textContent = d.subtitle;
  }

  if (d.avatar) {
    elAvatar.src = d.avatar;
  }

  if (d.background && elBgImage) {
    elBgImage.style.backgroundImage = `url("${d.background}")`;
  }

  renderLinks(d.links);
}

async function loadData() {
  try {
    const res = await fetch("./links.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    applyData(data);
  } catch (err) {
    console.error("❌ Gagal memuat links.json:", err);
    elLinks.innerHTML = `
      <div class="empty-links">
        ❌ Gagal memuat data
      </div>
    `;
  }
}

loadData();

    elLinks.innerHTML = `
      <div class="empty-links">
        ❌ Gagal memuat data
      </div>
    `;
  }
}

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

loadData();
