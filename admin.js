// ===============================
// ADMIN PANEL REKBERSAFE.ID
// ===============================

// ====== GANTI PUNYA KAMU ======
const BIN_ID = "6991b633d0ea881f40bc22eb";
const API_KEY = "$2a$10$CRpUuQhcfh0vNYFxICLlwO7LrdzbWhCKwXJKD44is4DkVq8SjXv8G";
// ==============================

let data = null;

// TOAST
function toast(msg) {
  const t = document.getElementById("toast");
  t.innerText = msg;
  t.style.opacity = 1;
  setTimeout(() => t.style.opacity = 0, 2500);
}

// LOAD DATA
fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
  headers: { "X-Master-Key": API_KEY }
})
.then(res => res.json())
.then(res => {
  data = res.record;
  loadMain();
  renderLinks();
});

// LOAD MAIN
function loadMain() {
  document.getElementById("title").value = data.title || "";
  document.getElementById("subtitle").value = data.subtitle || "";
  document.getElementById("avatar").value = data.avatar || "";
  document.getElementById("background").value = data.background || "";
}

// SAVE ALL
function saveAll() {
  data.title = document.getElementById("title").value;
  data.subtitle = document.getElementById("subtitle").value;
  data.avatar = document.getElementById("avatar").value;
  data.background = document.getElementById("background").value;
  updateBin("Perubahan disimpan ✔");
}

// RENDER LINKS
function renderLinks() {
  const box = document.getElementById("links");
  box.innerHTML = "";

  data.links.forEach((l, i) => {
    const div = document.createElement("div");
    div.className = "link-item";

    div.innerHTML = `
      <small>Nama Link</small>
      <input value="${l.label || ""}">

      <small>URL</small>
      <input value="${l.url || ""}">

      <small>Icon URL</small>
      <input value="${l.icon || ""}">

      <div class="actions">
        <button class="edit" onclick="saveLink(${i})">Simpan</button>
        <button class="delete" onclick="deleteLink(${i})">Hapus</button>
      </div>
    `;

    box.appendChild(div);
  });
}

// SAVE LINK
function saveLink(i) {
  const card = document.getElementsByClassName("link-item")[i];
  const inputs = card.querySelectorAll("input");

  data.links[i] = {
    label: inputs[0].value,
    url: inputs[1].value,
    icon: inputs[2].value
  };

  updateBin("Link disimpan ✔");
}

// DELETE LINK
function deleteLink(i) {
  if (!confirm("Yakin hapus link ini?")) return;
  data.links.splice(i, 1);
  updateBin("Link dihapus 🗑");
}

// ADD LINK
function addLink() {
  data.links.push({
    label: "Link Baru",
    url: "#",
    icon: ""
  });
  renderLinks();
}

// UPDATE JSONBIN
function updateBin(msg) {
  fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY
    },
    body: JSON.stringify(data)
  })
  .then(() => {
    renderLinks();
    toast(msg);
  })
  .catch(() => toast("Gagal menyimpan ❌"));
}
