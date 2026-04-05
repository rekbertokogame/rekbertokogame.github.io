// ===============================
// ADMIN PANEL REKBER.TOKOGAME
// ===============================

// ====== GANTI PUNYA KAMU ======
const BIN_ID = "ISI_BIN_ID_KAMU";
const API_KEY = "ISI_API_KEY_KAMU";
// ==============================

let data = null;

function escapeAttr(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function toast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

function loadMain() {
  document.getElementById("title").value = data.title || "";
  document.getElementById("subtitle").value = data.subtitle || "";
  document.getElementById("avatar").value = data.avatar || "";
  document.getElementById("background").value = data.background || "";
}

function saveAll() {
  data.title = document.getElementById("title").value.trim();
  data.subtitle = document.getElementById("subtitle").value.trim();
  data.avatar = document.getElementById("avatar").value.trim();
  data.background = document.getElementById("background").value.trim();
  updateBin("Perubahan brand disimpan ✔");
}

function renderLinks() {
  const box = document.getElementById("links");
  box.innerHTML = "";

  if (!Array.isArray(data.links)) data.links = [];

  data.links.forEach((l, i) => {
    const div = document.createElement("div");
    div.className = "link-item";

    div.innerHTML = `
      <small>Nama Link</small>
      <input value="${escapeAttr(l.label || "")}">

      <small>URL</small>
      <input value="${escapeAttr(l.url || "")}">

      <small>Icon URL</small>
      <input value="${escapeAttr(l.icon || "")}">

      <div class="actions">
        <button class="edit" onclick="saveLink(${i})">Simpan</button>
        <button class="delete" onclick="deleteLink(${i})">Hapus</button>
      </div>
    `;

    box.appendChild(div);
  });
}

function saveLink(i) {
  const card = document.getElementsByClassName("link-item")[i];
  const inputs = card.querySelectorAll("input");

  data.links[i] = {
    label: inputs[0].value.trim(),
    url: inputs[1].value.trim(),
    icon: inputs[2].value.trim()
  };

  updateBin("Link disimpan ✔");
}

function deleteLink(i) {
  if (!confirm("Yakin hapus link ini?")) return;
  data.links.splice(i, 1);
  updateBin("Link dihapus 🗑");
}

function addLink() {
  if (!Array.isArray(data.links)) data.links = [];
  data.links.push({
    label: "Link Baru",
    url: "#",
    icon: ""
  });
  renderLinks();
  toast("Link baru ditambahkan");
}

function updateBin(msg) {
  fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify(data)
  })
    .then((res) => {
      if (!res.ok) throw new Error("Gagal update");
      renderLinks();
      toast(msg);
    })
    .catch((err) => {
      console.error(err);
      toast("Gagal menyimpan ❌");
    });
}

fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
  headers: { "X-Master-Key": API_KEY }
})
  .then((res) => {
    if (!res.ok) throw new Error("Gagal load data");
    return res.json();
  })
  .then((res) => {
    data = res.record || {};
    if (!Array.isArray(data.links)) data.links = [];
    loadMain();
    renderLinks();
  })
  .catch((err) => {
    console.error(err);
    toast("Gagal load data ❌");
  });
