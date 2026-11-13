"use strict";
/* Página de unidad: arma los 4 pasos a partir de los datos de la unidad.
   Si un paso no tiene contenido todavía, muestra un espacio reservado
   y deja marcarlo como visto, para que la unidad siga funcionando. */
(function () {
  aplicarProyecto();
  const q = new URLSearchParams(location.search);
  const u = UNIDADES.find(x => x.id === q.get("u")) || UNIDADES[0];
  const PASOS = [
    { id: "explora", nombre: "Explora", c: "p1", color: "var(--verde)" },
    { id: "simula", nombre: "Simula", c: "p2", color: "var(--violeta)" },
    { id: "practica", nombre: "Practica", c: "p3", color: "var(--ambar-o)" },
    { id: "reta", nombre: "Reta", c: "p4", color: "var(--coral)" }
  ];

  let actual = PASOS.findIndex(p => p.id === q.get("paso"));
  if (actual < 0) {
    actual = PASOS.findIndex(p => !Progreso.hecho(u.id, p.id));
    if (actual < 0) actual = 0;
  }

  const elPasos = document.getElementById("u-pasos");
  const elCentro = document.getElementById("u-centro");
  const elGuia = document.getElementById("u-guia");
  const btnAnt = document.getElementById("btn-ant");
  const btnSig = document.getElementById("btn-sig");

  document.title = u.titulo + " · " + PROYECTO.nombre;
  document.getElementById("titulo-u").textContent = u.titulo;
  document.getElementById("migas").replaceChildren(
    h("a", { href: "index.html" }, "Inicio"),
    " › " + etiquetaGrados(u) + " › " + u.titulo);

  function pintarPasos() {
    elPasos.replaceChildren(
      h("div", { class: "rotulo", text: "PASOS" }),
      ...PASOS.map((p, i) => h("button", {
        type: "button",
        class: "paso-btn " + p.c + (Progreso.hecho(u.id, p.id) ? " hecho" : ""),
        "aria-current": i === actual ? "step" : null,
        onclick: () => ir(i)
      }, h("span", { class: "num", text: String(i + 1) }), p.nombre)));
    const hechos = Progreso.pasosDe(u.id);
    const pct = Math.round((hechos / 4) * 100);
    document.getElementById("mp-fill").style.width = pct + "%";
    document.getElementById("mp-barra").setAttribute("aria-valuenow", String(pct));
  }

  function lista(items) {
    return h("ol", {}, items.map(t => h("li", { text: t })));
  }

  function pintarGuia() {
    const paso = u[PASOS[actual].id] || {};
    const cajas = [];
    const comp = u.competencias || [];
    cajas.push(h("details", { class: "panel subtemas" },
      h("summary", { text: "Objetivos y competencias" }),
      h("h3", { text: "Objetivo de aprendizaje", style: "margin-top:10px" }),
      h("p", { text: u.objetivo || "" }),
      h("h3", { text: "Competencias que se trabajan", style: "margin-top:12px" }),
      comp.length
        ? h("ul", {}, comp.map(c => h("li", { text: c })))
        : espacioLibre("Espacio para las competencias de esta guía (campo competencias en js/datos.js).")));
    if (paso.instrucciones && paso.instrucciones.length) {
      cajas.push(h("div", { class: "panel" }, h("h3", { text: "Instrucciones" }), lista(paso.instrucciones)));
    }
    if (paso.pista) {
      cajas.push(h("div", { class: "panel" }, h("h3", { text: "Pista" }), h("p", { text: paso.pista })));
    }
    if (u.vocabulario && u.vocabulario.length) {
      cajas.push(h("div", { class: "panel" }, h("h3", { text: "Vocabulario" }),
        h("dl", {}, u.vocabulario.map(v => [h("dt", { text: v.t }), h("dd", { text: v.d })]))));
    }
    elGuia.replaceChildren(...cajas);
  }

  /* Botón que marca un paso como completado (para pasos sin ejercicio automático). */
  function botonMarcar(pasoId, texto, aviso, mensaje) {
    return h("button", {
      type: "button", class: "btn btn-oscuro", style: "align-self:flex-start",
      onclick: () => {
        Progreso.marcar(u.id, pasoId);
        aviso.textContent = mensaje;
        pintarPasos();
      }
    }, texto);
  }

  /* Panel de "espacio reservado" cuando un paso aún no tiene contenido. */
  function panelVacio(paso, mensaje, textoBoton, mensajeListo) {
    const aviso = h("p", { class: "fb", "aria-live": "polite" });
    return h("div", { class: "panel" },
      h("div", { class: "panel-cabeza" }, h("h2", { text: paso.nombre })),
      espacioLibre(mensaje),
      botonMarcar(paso.id, textoBoton, aviso, mensajeListo),
      aviso);
  }

  /* ---- Contenido de cada paso ---- */
  function pasoExplora() {
    const e = u.explora || {};
    const terminos = (u.vocabulario || []).map(v => v.t);
    const intro = parrafos(u.introduccion, terminos);
    const texto = parrafos(e.texto, terminos);
    const subs = u.subtemas || [];
    const paneles = [];

    paneles.push(h("div", { class: "panel" },
      h("h2", { text: "Introducción" }),
      intro.length
        ? h("div", { class: "texto-largo" }, intro)
        : espacioLibre("Espacio para la introducción de esta temática: aquí se explican sus generalidades. Escríbela en js/datos.js, en el campo introduccion de la unidad.")));

    if (subs.length) {
      paneles.push(h("div", { class: "panel" },
        h("h2", { text: "Contenidos de esta temática" }),
        h("ul", {}, subs.map(s => h("li", { text: s })))));
    }

    paneles.push(h("div", { class: "panel" },
      h("div", { class: "panel-cabeza" },
        h("h2", { text: "Explora" }),
        h("span", { class: "tiempo", style: "color:var(--verde)", text: e.tiempo || "" })),
      texto.length
        ? h("div", { class: "texto-largo" }, texto,
            e.imagen ? h("img", { src: e.imagen.src, alt: e.imagen.alt || "", loading: "lazy" }) : null)
        : espacioLibre("Espacio para el contenido de Explora: la idea central de la temática en pocas líneas (campo explora.texto en js/datos.js)."),
      h("button", {
        type: "button", class: "btn btn-verde", style: "align-self:flex-start",
        onclick: () => { Progreso.marcar(u.id, "explora"); ir(1); }
      }, "Entendido, ir a Simula")));
    return paneles;
  }

  function pasoSimula() {
    const sm = u.simulacion;
    if (!sm) {
      return [panelVacio(PASOS[1],
        "Espacio reservado para la simulación de esta temática. Cuando la agregues en js/datos.js (campo simulacion), aparecerá aquí.",
        "Marcar paso como visto", "Paso marcado. Puedes continuar con Practica.")];
    }

    const area = h("div", { class: "sim-area" });
    const aviso = h("p", { class: "fb", "aria-live": "polite" });
    const motor = SIMULACIONES[sm.id];
    let veces = 0;
    const ctx = {
      interaccion() {
        veces++;
        if (veces === 3 && !Progreso.hecho(u.id, "simula")) {
          Progreso.marcar(u.id, "simula");
          aviso.textContent = "¡Paso completado! Ya puedes pasar a Practica.";
          pintarPasos();
        }
      }
    };

    if (motor) {
      motor.montar(area, ctx);
      if (sm.externa && sm.externa.url) {
        area.append(h("p", { class: "sim-nota" }, "Opcional: ",
          h("a", { href: sm.externa.url, target: "_blank", rel: "noopener noreferrer" }, sm.externa.texto || "Abrir otra herramienta")));
      }
    } else if (sm.externa && sm.externa.url) {
      area.classList.add("sim-externa");
      area.append(
        h("p", { text: sm.descripcion || "Esta simulación se abre en otra herramienta." }),
        h("a", {
          class: "btn btn-violeta", href: sm.externa.url, target: "_blank", rel: "noopener noreferrer"
        }, (sm.externa.texto || "Abrir simulación") + " ↗"),
        h("p", { class: "sim-nota", text: "Se abre en una pestaña nueva. Cuando termines, vuelve aquí y marca el paso." }),
        botonMarcar("simula", "Ya la usé: marcar paso como completado", aviso, "¡Paso completado! Ya puedes pasar a Practica."));
    } else {
      area.classList.add("sim-externa");
      area.append(espacioLibre("Espacio reservado para la simulación de esta temática."),
        botonMarcar("simula", "Marcar paso como visto", aviso, "Paso marcado. Puedes continuar con Practica."));
    }

    return [
      h("div", { class: "panel" },
        h("div", { class: "panel-cabeza" },
          h("h2", { text: "Simula · " + (sm.nombre || "") }),
          h("span", { class: "tiempo", style: "color:var(--violeta)", text: sm.tiempo || "" })),
        area, aviso),
      sm.observar ? h("div", { class: "observar" }, h("h3", { text: "Qué observar" }), h("p", { text: sm.observar })) : null
    ];
  }

  function pasoPractica() {
    const p = u.practica || {};
    const acts = p.actividades || [];
    if (!acts.length) {
      return [panelVacio(PASOS[2],
        "Espacio reservado para las actividades de esta temática (campo practica.actividades en js/datos.js).",
        "Marcar paso como visto", "Paso marcado. Sigue con el Reta.")];
    }

    const aviso = h("p", { class: "fb", "aria-live": "polite" });
    let hechas = 0;
    const paneles = acts.map(a => {
      let contada = false;
      const alTerminar = () => {
        if (contada) return;
        contada = true;
        hechas++;
        if (hechas === acts.length) {
          Progreso.marcar(u.id, "practica");
          aviso.textContent = "¡Practica completada! Sigue con el Reta.";
          pintarPasos();
        }
      };
      const motor = Actividades[a.tipo];
      return h("div", { class: "panel" },
        h("h2", { text: a.titulo || "Actividad" }),
        motor ? motor(a, alTerminar) : h("p", { text: "Tipo de actividad no reconocido: " + a.tipo }));
    });
    return [
      h("div", { class: "panel-cabeza", style: "padding:0 4px" },
        h("h2", { text: "Practica" }),
        h("span", { class: "tiempo", style: "color:var(--ambar-o)", text: p.tiempo || "" })),
      ...paneles, aviso
    ];
  }

  function pasoReta() {
    const r = u.reta || {};
    if (!r.preguntas || !r.preguntas.length) {
      return [panelVacio(PASOS[3],
        "Espacio reservado para el reto de esta temática (campo reta en js/datos.js).",
        "Marcar paso como visto", "Paso marcado.")];
    }

    const aviso = h("p", { class: "fb", "aria-live": "polite" });
    const juego = Actividades.quiz({ preguntas: r.preguntas, minimo: r.minimo }, (aciertos, total, aprobo) => {
      if (aprobo) {
        Progreso.marcar(u.id, "reta");
        Progreso.otorgar(u.id);
        aviso.textContent = r.insignia ? "¡Ganaste la insignia: " + r.insignia + "!" : "¡Reto superado!";
        pintarPasos();
      }
    });
    return [
      h("div", { class: "panel" },
        h("div", { class: "panel-cabeza" },
          h("h2", { text: r.titulo || "Reta" }),
          h("span", { class: "tiempo", style: "color:var(--coral)", text: r.tiempo || "" })),
        r.historia ? h("p", { text: r.historia }) : null,
        juego, aviso)
    ];
  }

  const CONSTRUCTORES = { explora: pasoExplora, simula: pasoSimula, practica: pasoPractica, reta: pasoReta };

  function pintar() {
    pintarPasos();
    pintarGuia();
    elCentro.replaceChildren(...CONSTRUCTORES[PASOS[actual].id]().filter(Boolean));
    btnAnt.disabled = actual === 0;
    btnAnt.textContent = actual === 0 ? "‹ Anterior" : "‹ Anterior: " + PASOS[actual - 1].nombre;
    btnSig.textContent = actual === PASOS.length - 1
      ? "Volver al inicio"
      : "Siguiente: " + PASOS[actual + 1].nombre + " ›";
  }

  function ir(i) {
    actual = Math.max(0, Math.min(PASOS.length - 1, i));
    pintar();
    window.scrollTo(0, 0);
  }

  btnAnt.addEventListener("click", () => ir(actual - 1));
  btnSig.addEventListener("click", () => {
    if (actual === PASOS.length - 1) location.href = "index.html";
    else ir(actual + 1);
  });

  pintar();
})();
