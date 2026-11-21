// Toledo Diagnosis · menú móvil, selector de capturas, visor y enlaces de descarga

// Menú en móvil
const menuBoton = document.querySelector(".menu-boton");
const menu = document.getElementById("menu");
menuBoton.addEventListener("click", () => {
  const abierto = menu.classList.toggle("abierto");
  menuBoton.setAttribute("aria-expanded", abierto);
});
menu.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    menu.classList.remove("abierto");
    menuBoton.setAttribute("aria-expanded", "false");
  }
});

// Selector KKL / OBD2 de las capturas
document.querySelectorAll(".selector").forEach((sel) => {
  const enlace = document.querySelector(`.ampliar[data-grupo="${sel.dataset.grupo}"]`);
  sel.querySelectorAll("button").forEach((b) => {
    b.addEventListener("click", () => {
      sel.querySelectorAll("button").forEach((x) => x.setAttribute("aria-selected", x === b));
      enlace.href = b.dataset.img;
      enlace.querySelector("img").src = b.dataset.img;
      enlace.querySelector("img").alt = b.dataset.alt;
    });
  });
});

// Visor de capturas a tamaño completo
const visor = document.getElementById("visor");
document.querySelectorAll(".ampliar").forEach((a) => {
  a.addEventListener("click", (e) => {
    if (!visor.showModal) return;          // navegador sin <dialog>: abre la imagen
    e.preventDefault();
    const img = visor.querySelector("img");
    img.src = a.href;
    img.alt = a.querySelector("img").alt;
    visor.showModal();
  });
});
visor.addEventListener("click", () => visor.close());

// Enlaces de descarga: la última versión publicada (también pre-releases).
// Sin JavaScript o si falla la API, los botones llevan a la página de releases.
fetch("https://api.github.com/repos/jaso69/obd2/releases?per_page=10")
  .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
  .then((releases) => {
    const publicadas = releases.filter((r) => !r.draft);
    const buscar = (patron) => {
      for (const r of publicadas) {
        const a = r.assets.find((x) => patron.test(x.name));
        if (a) return { url: a.browser_download_url, version: r.tag_name, mb: Math.round(a.size / 1048576) };
      }
      return null;
    };
    const archivos = { windows: buscar(/\.exe$/i), linux: buscar(/linux.*\.tar\.gz$/i) };
    document.querySelectorAll("[data-descarga]").forEach((b) => {
      const f = archivos[b.dataset.descarga];
      if (f) {
        b.href = f.url;
        b.title = `${f.version} · ${f.mb} MB`;
      } else {
        b.title = "Todavía no hay paquete publicado: abre la página de versiones";
      }
    });
    if (publicadas.length) {
      const v = publicadas[0];
      const fecha = new Date(v.published_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
      document.getElementById("version-actual").innerHTML =
        `Última versión: <strong>${v.tag_name}</strong> (${fecha}). Todas las versiones en ` +
        `<a href="https://github.com/jaso69/obd2/releases">GitHub Releases</a>.`;
    }
  })
  .catch(() => {});
