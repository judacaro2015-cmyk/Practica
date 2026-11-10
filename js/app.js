"use strict";
/* Página de inicio: arma temáticas, grados, unidades, simulaciones, retos y progreso. */
(function () {
  aplicarProyecto();
  document.title = PROYECTO.nombre;

  let gradoActivo = PROYECTO.gradoPiloto;
  const unidadesDe = g => UNIDADES.filter(u => gradosDe(u).includes(g));
  const enlaceUnidad = (u, paso) =>
    "unidad.html?u=" + encodeURIComponent(u.id) + (paso ? "&paso=" + paso : "");

  function pctGrado(g) {
    const us = unidadesDe(g);
    if (!us.length) return 0;
    const hechos = us.reduce((s, u) => s + Progreso.pasosDe(u.id), 0);
    return Math.round((100 * hechos) / (us.length * 4));
  }

  /* ---- Progreso (portada) ---- */
  function pintarProgreso() {
    const n = Progreso.total();
    const nivel = 1 + Math.floor(n / 4);
    const pct = ((n % 4) / 4) * 100;
    document.getElementById("tp-nivel").textContent = "Nivel " + nivel;
    document.getElementById("tp-fill").style.width = pct + "%";
    document.getElementById("tp-barra").setAttribute("aria-valuenow", String(Math.round(pct)));
    document.getElementById("tp-texto").textContent = n + (n === 1 ? " paso completado" : " pasos completados");
    const ganadas = Progreso.insignias()
      .map(id => UNIDADES.find(u => u.id === id))
      .filter(u => u && u.reta && u.reta.insignia);
    const slots = [];
    for (let i = 0; i < 3; i++) {
      const u = ganadas[i];
      slots.push(u
        ? h("div", { class: "slot ganada", text: u.reta.insignia })
        : h("div", { class: "slot", text: "insignia" }));
    }
    document.getElementById("tp-slots").replaceChildren(...slots);
  }

  /* ---- Temáticas (con espacios de introducción libres) ---- */
  function pintarTematicas() {
    document.getElementById("tem-titulo").textContent = PROYECTO.tituloTematicas || "Temáticas del proyecto";

    const intro = parrafos(PROYECTO.introGeneral);
    document.getElementById("tem-intro").replaceChildren(
      ...(intro.length
        ? intro
        : [espacioLibre("Espacio para tu introducción general: aquí se explican las generalidades de las temáticas. Escríbela en js/datos.js, en PROYECTO.introGeneral.")]));

    document.getElementById("tem-lista").replaceChildren(...UNIDADES.map(u => {
      const introU = parrafos(u.resumen);
      const subs = u.subtemas || [];
      return h("article", { class: "tema-card" },
        h("div", { class: "tags" },
          h("span", { class: "tag tag-verde", text: u.tema || "Temática" }),
          h("span", { class: "tag", text: etiquetaGrados(u) })),
        h("h3", { text: u.titulo }),
        introU.length
          ? introU
          : espacioLibre("Espacio para un resumen corto de esta temática (campo resumen en js/datos.js)."),
        subs.length
          ? h("details", { class: "subtemas" },
              h("summary", { text: "Contenidos (" + subs.length + ")" }),
              h("ul", {}, subs.map(s => h("li", { text: s }))))
          : null,
        h("a", { class: "btn btn-verde", href: enlaceUnidad(u) }, "Entrar a la unidad"));
    }));
  }

  /* ---- Grados ---- */
  function pintarGrados() {
    const cont = document.getElementById("grados-lista");
    if (PROYECTO.grados.length === 1) {
      /* Un solo grado: no hay nada que elegir, se muestran sus unidades directamente. */
      gradoActivo = PROYECTO.grados[0];
      cont.style.display = "none";
      document.getElementById("panel-unidades").style.marginTop = "0";
      document.getElementById("grados-titulo").textContent = "Unidades de grado " + gradoActivo + "°";
      document.getElementById("grados-sub").textContent = "Elige una unidad y completa sus 4 pasos.";
      return;
    }
    cont.replaceChildren(...PROYECTO.grados.map(g => {
      const n = unidadesDe(g).length;
      return h("button", {
        class: "grado" + (g === gradoActivo ? " activo" : ""),
        type: "button",
        "aria-pressed": String(g === gradoActivo),
        onclick: () => { gradoActivo = g; pintarGrados(); pintarUnidades(true); }
      },
        h("span", { class: "grado-num", text: g + "°" }),
        h("span", { class: "grado-info", text: n ? n + (n === 1 ? " unidad" : " unidades") : "Próximamente" }),
        h("span", { class: "barra" }, h("span", { class: "barra-fill", style: "width:" + pctGrado(g) + "%" }))
      );
    }));
  }

  function pintarUnidades(desplazar) {
    const panel = document.getElementById("panel-unidades");
    const us = unidadesDe(gradoActivo);
    const titulo = PROYECTO.grados.length === 1 ? null : h("h3", { text: "Unidades de grado " + gradoActivo + "°" });
    if (!us.length) {
      panel.replaceChildren(...[titulo, h("p", { class: "suave", text: "Aún no hay unidades para este grado." })].filter(Boolean));
    } else {
      panel.replaceChildren(...[titulo, h("div", { class: "rejilla-3" }, us.map(u => {
        const hechos = Progreso.pasosDe(u.id);
        return h("a", { class: "u-tarjeta", href: enlaceUnidad(u) },
          h("div", { class: "tags" }, h("span", { class: "tag", text: u.tema || "Temática" })),
          h("h4", { text: u.titulo }),
          h("p", { class: "suave", text: u.objetivo || "" }),
          h("span", { class: "estado", text: hechos === 4 ? "Unidad completada" : hechos + " de 4 pasos" })
        );
      }))].filter(Boolean));
    }
    if (desplazar) panel.scrollIntoView({ block: "nearest" });
  }

  /* ---- Simulaciones ---- */
  function pintarSims() {
    const conSim = UNIDADES.filter(u => u.simulacion && u.simulacion.nombre);
    document.getElementById("sims-lista").replaceChildren(...conSim.map(u =>
      h("div", { class: "sim-card" },
        h("div", { class: "vista" },
          u.simulacion.imagen
            ? h("img", { src: u.simulacion.imagen, alt: "Vista previa de " + u.simulacion.nombre, loading: "lazy" })
            : u.simulacion.nombre),
        h("div", { class: "tags" },
          h("span", { class: "tag", text: etiquetaGrados(u) }),
          h("span", { class: "tag", text: u.tema || "Temática" })),
        h("h3", { text: u.simulacion.nombre }),
        h("p", { text: u.simulacion.descripcion || "" }),
        h("a", { class: "btn btn-violeta", href: enlaceUnidad(u, "simula"), style: "align-self:flex-start" }, "Abrir")
      )));
  }

  /* ---- Retos ---- */
  function pintarRetos() {
    const ganadas = Progreso.insignias();
    const conReto = UNIDADES.filter(u => u.reta && u.reta.titulo);
    document.getElementById("insignias-lista").replaceChildren(...conReto.map(u =>
      h("div", {
        class: "insignia" + (ganadas.includes(u.id) ? " ganada" : ""),
        title: u.reta.insignia || ""
      }, ganadas.includes(u.id) ? (u.reta.insignia || "¡Logrado!") : "?")));
    document.getElementById("misiones-lista").replaceChildren(...conReto.map((u, i) =>
      h("a", { class: "mision", href: enlaceUnidad(u, "reta") },
        h("span", { class: "num", text: String(i + 1) }),
        h("span", {}, h("strong", { text: u.reta.titulo }), h("small", { text: etiquetaGrados(u) + " · " + u.titulo })))));
  }

  /* Cada sección se pinta por separado: si una falla, las demás siguen funcionando. */
  const faltan = ["h", "parrafos", "espacioLibre", "gradosDe", "etiquetaGrados", "Progreso"]
    .filter(n => { try { return typeof eval(n) === "undefined"; } catch (e) { return true; } });
  if (faltan.length) {
    console.error("Falta actualizar js/comun.js (no define: " + faltan.join(", ") + ")");
  }
  [pintarProgreso, pintarGrados, () => pintarUnidades(false), pintarTematicas, pintarSims, pintarRetos]
    .forEach(f => { try { f(); } catch (e) { console.error(e); } });
})();
