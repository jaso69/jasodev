// Menú de la cabecera en móvil. El estado vive en aria-expanded del botón: lo
// lee el lector de pantalla y de él cuelga el CSS que despliega el panel, así
// que no hay dos verdades que sincronizar.
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");

if (toggle && links) {
  const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
  const setOpen = (open) => toggle.setAttribute("aria-expanded", String(open));

  toggle.addEventListener("click", () => setOpen(!isOpen()));

  // Al seguir un ancla el panel tapaba la sección a la que acababas de saltar.
  links.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen()) {
      setOpen(false);
      toggle.focus(); // el foco vuelve al botón, no al principio del documento
    }
  });

  document.addEventListener("click", (e) => {
    if (isOpen() && !e.target.closest(".nav")) setOpen(false);
  });

  // En escritorio los enlaces se muestran siempre por CSS; si el menú se queda
  // "abierto", al volver a estrechar reaparecería desplegado sin tocarlo.
  matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
    if (e.matches) setOpen(false);
  });
}
