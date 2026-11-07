"use strict";
/* Simulaciones. Cada una tiene montar(contenedor, ctx).
   ctx.interaccion() se llama cada vez que el estudiante hace algo;
   con 3 interacciones el paso "Simula" se marca como completado.
   Para agregar una: SIMULACIONES.miSim = { montar(c, ctx){ ... } }
   y úsala en datos.js con simulacion: { id: "miSim", ... } */
const SIMULACIONES = {};

(function () {
  const NS = "http://www.w3.org/2000/svg";
  function s(tag, attrs, texto) {
    const el = document.createElementNS(NS, tag);
    for (const [k, v] of Object.entries(attrs || {})) el.setAttribute(k, v);
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  /* ---------- Compuertas lógicas ---------- */
  const COMPUERTAS = {
    AND:  (a, b) => a & b,
    OR:   (a, b) => a | b,
    NOT:  (a) => 1 - a,
    NAND: (a, b) => 1 - (a & b),
    NOR:  (a, b) => 1 - (a | b),
    XOR:  (a, b) => a ^ b,
    XNOR: (a, b) => 1 - (a ^ b)
  };

  SIMULACIONES.compuertas = {
    montar(cont, ctx) {
      const est = { g: "AND", a: 0, b: 0 };
      const ENC = "#F5A524", APAG = "#8A94A8";

      const grupo = h("div", { class: "sim-grupo", role: "group", "aria-label": "Compuerta" });
      Object.keys(COMPUERTAS).forEach(nombre => {
        grupo.append(h("button", {
          type: "button", "aria-pressed": String(nombre === est.g), "data-g": nombre,
          onclick: () => { est.g = nombre; ctx.interaccion(); pintar(); }
        }, nombre));
      });

      const btnA = h("button", { type: "button", class: "interruptor", "aria-pressed": "false", onclick: () => { est.a = 1 - est.a; ctx.interaccion(); pintar(); } });
      const btnB = h("button", { type: "button", class: "interruptor", "aria-pressed": "false", onclick: () => { est.b = 1 - est.b; ctx.interaccion(); pintar(); } });
      const controles = h("div", { class: "sim-controles" },
        h("span", { text: "Entrada A:" }), btnA, h("span", { text: "Entrada B:" }), btnB);

      const svg = s("svg", { viewBox: "0 0 600 260", class: "sim-svg", role: "img", "aria-label": "Circuito con la compuerta seleccionada" });
      const tabla = h("table", { class: "tabla-v" });
      const nota = h("p", { class: "sim-nota", "aria-live": "polite" });

      function pintar() {
        const unaEntrada = est.g === "NOT";
        const salida = unaEntrada ? COMPUERTAS.NOT(est.a) : COMPUERTAS[est.g](est.a, est.b);

        grupo.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.g === est.g)));
        btnA.textContent = String(est.a); btnA.setAttribute("aria-pressed", String(!!est.a));
        btnB.textContent = String(est.b); btnB.setAttribute("aria-pressed", String(!!est.b));
        btnB.disabled = unaEntrada;

        // Dibujo
        svg.replaceChildren();
        const col = v => (v ? ENC : APAG);
        if (unaEntrada) {
          svg.append(s("line", { x1: 40, y1: 130, x2: 220, y2: 130, stroke: col(est.a), "stroke-width": 8, "stroke-linecap": "round" }));
          svg.append(s("text", { x: 20, y: 136, "font-size": 22, "font-weight": 700, fill: "#1B2740" }, "A"));
        } else {
          svg.append(s("line", { x1: 40, y1: 90, x2: 220, y2: 90, stroke: col(est.a), "stroke-width": 8, "stroke-linecap": "round" }));
          svg.append(s("line", { x1: 40, y1: 170, x2: 220, y2: 170, stroke: col(est.b), "stroke-width": 8, "stroke-linecap": "round" }));
          svg.append(s("text", { x: 20, y: 96, "font-size": 22, "font-weight": 700, fill: "#1B2740" }, "A"));
          svg.append(s("text", { x: 20, y: 176, "font-size": 22, "font-weight": 700, fill: "#1B2740" }, "B"));
        }
        svg.append(s("rect", { x: 220, y: 50, width: 160, height: 160, rx: 16, fill: "#12203A" }));
        svg.append(s("text", { x: 300, y: 140, "text-anchor": "middle", "font-size": 34, "font-weight": 800, fill: "#FFFFFF" }, est.g));
        svg.append(s("line", { x1: 380, y1: 130, x2: 470, y2: 130, stroke: col(salida), "stroke-width": 8, "stroke-linecap": "round" }));
        svg.append(s("circle", { cx: 520, cy: 130, r: 34, fill: salida ? ENC : "#E3E7F0", stroke: "#12203A", "stroke-width": 4 }));
        svg.append(s("text", { x: 520, y: 138, "text-anchor": "middle", "font-size": 24, "font-weight": 800, fill: "#12203A" }, String(salida)));
        svg.append(s("text", { x: 520, y: 190, "text-anchor": "middle", "font-size": 16, fill: "#4A5873" }, "LED (salida)"));

        // Tabla de verdad
        const filas = unaEntrada ? [[0], [1]] : [[0, 0], [0, 1], [1, 0], [1, 1]];
        const enc = unaEntrada ? ["A", "Salida"] : ["A", "B", "Salida"];
        tabla.replaceChildren(
          h("thead", {}, h("tr", {}, enc.map(t => h("th", { scope: "col", text: t })))),
          h("tbody", {}, filas.map(f => {
            const sal = unaEntrada ? COMPUERTAS.NOT(f[0]) : COMPUERTAS[est.g](f[0], f[1]);
            const actual = unaEntrada ? f[0] === est.a : (f[0] === est.a && f[1] === est.b);
            return h("tr", { class: actual ? "actual" : "" }, f.concat([sal]).map(v => h("td", { text: String(v) })));
          })));

        nota.textContent = unaEntrada
          ? "NOT con A=" + est.a + " da " + salida + "."
          : est.g + " con A=" + est.a + " y B=" + est.b + " da " + salida + ".";
      }

      cont.append(grupo, controles, svg, tabla, nota);
      pintar();
    }
  };

  /* ---------- Contador binario de 4 bits ---------- */
  SIMULACIONES.binario = {
    montar(cont, ctx) {
      const valores = [8, 4, 2, 1];
      const bits = [0, 0, 0, 0];
      const grande = h("div", { class: "num-grande", "aria-live": "polite" });
      const suma = h("p", { class: "sim-nota" });
      const fila = h("div", { class: "bits" });

      const botones = valores.map((v, i) => {
        const b = h("button", {
          type: "button", class: "interruptor", "aria-pressed": "false",
          "aria-label": "Bit de valor " + v,
          onclick: () => { bits[i] = 1 - bits[i]; ctx.interaccion(); pintar(); }
        }, "0");
        fila.append(h("div", { class: "bit" }, b, h("span", { text: "vale " + v })));
        return b;
      });

      function pintar() {
        botones.forEach((b, i) => { b.textContent = String(bits[i]); b.setAttribute("aria-pressed", String(!!bits[i])); });
        const total = bits.reduce((t, b, i) => t + b * valores[i], 0);
        grande.textContent = String(total);
        const partes = bits.map((b, i) => (b ? String(valores[i]) : null)).filter(Boolean);
        suma.textContent = "Binario " + bits.join("") + " = " + (partes.length ? partes.join(" + ") + " = " + total : "0");
      }

      cont.append(fila, grande, suma);
      pintar();
    }
  };
  /* =====================================================================
     SIMULACIONES PROPIAS SIN ARDUINO (funcionan sin internet):
       circuito   : ley de Ohm y sensor de luz (LDR) con relé
       actuadores : servomotor, motor DC, paso a paso, solenoide y porción
       tiempos    : delay() frente a millis() y reloj RTC con alarma
     ===================================================================== */

  /* Deslizador con etiqueta y lectura. alCambiar(valor) se llama al mover;
     ctx.interaccion() se cuenta al soltar. */
  function deslizador(etiqueta, min, max, paso, valor, unidad, alCambiar, ctx) {
    const sal = h("output", { text: valor + " " + unidad });
    const inp = h("input", { type: "range", min, max, step: paso, value: valor, "aria-label": etiqueta });
    inp.addEventListener("input", () => { sal.textContent = inp.value + " " + unidad; alCambiar(Number(inp.value)); });
    inp.addEventListener("change", () => ctx.interaccion());
    return {
      el: h("label", { class: "ctl" }, h("span", { text: etiqueta }), inp, sal),
      set(v) { inp.value = String(v); sal.textContent = inp.value + " " + unidad; alCambiar(Number(inp.value)); }
    };
  }

  function lectura(items) {
    return h("div", { class: "lectura" }, items.map(([t, v]) => h("div", {}, t, h("strong", { text: String(v) }))));
  }

  function aviso(el, tipo, texto) {
    el.className = "aviso-sim" + (tipo ? " " + tipo : "");
    el.textContent = texto;
  }

  /* Varias simulaciones pequeñas dentro de una, con pestañas.
     montar(panel, ctx, cada): cada(fn, ms) crea un temporizador que se
     detiene solo al cambiar de pestaña o salir del paso. */
  function pestanas(cont, ctx, lista) {
    const grupo = h("div", { class: "sim-grupo", role: "group", "aria-label": "Elige una simulación" });
    const panel = h("div", { class: "sim-panel" });
    let timers = [];
    const cada = (fn, ms) => {
      const id = setInterval(() => { if (!panel.isConnected) { clearInterval(id); return; } fn(); }, ms);
      timers.push(id);
    };
    function abrir(k) {
      timers.forEach(id => clearInterval(id));
      timers = [];
      grupo.querySelectorAll("button").forEach((b, i) => b.setAttribute("aria-pressed", String(i === k)));
      panel.replaceChildren();
      lista[k].montar(panel, ctx, cada);
    }
    lista.forEach((it, k) => grupo.append(h("button", {
      type: "button", "aria-pressed": String(k === 0),
      onclick: () => { abrir(k); ctx.interaccion(); }
    }, it.nombre)));
    cont.append(grupo, panel);
    abrir(0);
  }

  const T = (x, y, texto, extra) => s("text", Object.assign({ x, y, "text-anchor": "middle", "font-size": 16, fill: "#1B2740" }, extra || {}), texto);

  /* ---------- 1. CIRCUITOS BÁSICOS ---------- */
  function tabOhm(p, ctx) {
    const est = { v: 5, r: 220 };
    const svg = s("svg", { viewBox: "0 0 600 260", class: "sim-svg", role: "img", "aria-label": "Circuito con batería, resistencia y LED" });
    const lect = h("div");
    const av = h("p", { class: "aviso-sim", "aria-live": "polite" });
    const fo = h("p", { class: "sim-nota" });
    const dv = deslizador("Voltaje de la batería", 1, 12, 1, est.v, "V", v => { est.v = v; pintar(); }, ctx);
    const dr = deslizador("Resistencia", 50, 1000, 10, est.r, "Ω", v => { est.r = v; pintar(); }, ctx);

    function pintar() {
      const i = (est.v / est.r) * 1000;          // mA
      const brillo = Math.min(i / 20, 1);
      const quemado = i > 30;
      svg.replaceChildren();
      svg.append(s("path", { d: "M 120 60 H 480 V 200 H 120 Z", fill: "none", stroke: "#F5A524", "stroke-width": 6, "stroke-linejoin": "round" }));
      // batería
      svg.append(s("rect", { x: 100, y: 100, width: 40, height: 60, fill: "#F6F5FE" }));
      svg.append(s("line", { x1: 100, y1: 115, x2: 140, y2: 115, stroke: "#12203A", "stroke-width": 6 }));
      svg.append(s("line", { x1: 110, y1: 140, x2: 130, y2: 140, stroke: "#12203A", "stroke-width": 6 }));
      svg.append(T(150, 120, "+", { "font-weight": 800 }));
      svg.append(T(60, 135, est.v + " V", { "font-weight": 800, "font-size": 20 }));
      svg.append(T(60, 160, "Batería", { "font-size": 14, fill: "#4A5873" }));
      // resistencia
      svg.append(s("rect", { x: 260, y: 44, width: 80, height: 32, rx: 6, fill: "#fff", stroke: "#12203A", "stroke-width": 4 }));
      svg.append(T(300, 66, est.r + " Ω", { "font-weight": 800 }));
      svg.append(T(300, 34, "Resistencia", { "font-size": 14, fill: "#4A5873" }));
      // LED
      if (!quemado) svg.append(s("circle", { cx: 480, cy: 130, r: 44, fill: "#F5A524", "fill-opacity": (0.35 * brillo).toFixed(2) }));
      svg.append(s("circle", { cx: 480, cy: 130, r: 26, fill: quemado ? "#C93B3B" : "#F5A524", "fill-opacity": quemado ? 1 : (0.12 + 0.88 * brillo).toFixed(2), stroke: "#12203A", "stroke-width": 4 }));
      svg.append(T(480, 137, quemado ? "✕" : "LED", { "font-weight": 800, fill: quemado ? "#fff" : "#12203A", "font-size": quemado ? 22 : 14 }));
      svg.append(T(480, 232, "LED", { "font-size": 14, fill: "#4A5873" }));

      lect.replaceChildren(lectura([
        ["Voltaje", est.v + " V"], ["Resistencia", est.r + " Ω"],
        ["Corriente", i.toFixed(1) + " mA"], ["Brillo del LED", quemado ? "quemado" : Math.round(brillo * 100) + " %"]
      ]));
      fo.textContent = "I = V ÷ R = " + est.v + " V ÷ " + est.r + " Ω = " + i.toFixed(1) + " mA  (modelo simplificado)";
      if (quemado) aviso(av, "mal", "¡Demasiada corriente (más de 30 mA)! El LED se quemaría. Sube la resistencia o baja el voltaje.");
      else if (i < 2) aviso(av, "ojo", "Casi no pasa corriente: el LED apenas se ve. Baja la resistencia o sube el voltaje.");
      else aviso(av, "", "Corriente segura: el LED brilla bien.");
    }
    p.append(dv.el, dr.el, svg, lect, fo, av);
    pintar();
  }

  function tabLdr(p, ctx) {
    const est = { luz: 70, umbral: 2.5 };
    const svg = s("svg", { viewBox: "0 0 600 200", class: "sim-svg", role: "img", "aria-label": "Luz, sensor LDR, relé y dispensador" });
    const lect = h("div");
    const av = h("p", { class: "aviso-sim", "aria-live": "polite" });
    const dl = deslizador("Luz del ambiente", 0, 100, 1, est.luz, "%", v => { est.luz = v; pintar(); }, ctx);
    const du = deslizador("Voltaje que activa el relé", 1, 4, 0.1, est.umbral, "V", v => { est.umbral = v; pintar(); }, ctx);

    function pintar() {
      const rl = Math.round(100000 * Math.pow(0.02, est.luz / 100));   // Ω: 100 kΩ a oscuras, 2 kΩ con mucha luz
      const vout = 5 * 10000 / (10000 + rl);
      const activo = vout >= est.umbral;
      svg.replaceChildren();
      const caja = (x, w, titulo, linea2, color) => {
        svg.append(s("rect", { x, y: 55, width: w, height: 90, rx: 12, fill: "#fff", stroke: color, "stroke-width": 4 }));
        svg.append(T(x + w / 2, 90, titulo, { "font-weight": 800 }));
        svg.append(T(x + w / 2, 118, linea2, { "font-size": 14, fill: "#4A5873" }));
      };
      const hilo = (x1, x2, on) => svg.append(s("line", { x1, y1: 100, x2, y2: 100, stroke: on ? "#19C3B1" : "#8A94A8", "stroke-width": 6, "stroke-linecap": "round" }));
      hilo(120, 170, est.luz > 5); hilo(280, 330, true); hilo(430, 480, activo);
      caja(20, 100, "Luz", est.luz + " %", "#F5A524");
      svg.append(s("circle", { cx: 70, cy: 30, r: 14, fill: "#F5A524", "fill-opacity": (0.15 + est.luz / 118).toFixed(2) }));
      caja(170, 110, "LDR", (rl / 1000).toFixed(1) + " kΩ", "#3A4FDB");
      caja(330, 100, "Relé", activo ? "ACTIVADO" : "reposo", activo ? "#0B7F72" : "#8A94A8");
      caja(480, 110, "Dispensador", activo ? "ABIERTO" : "cerrado", activo ? "#0B7F72" : "#C93B3B");
      svg.append(T(225, 175, vout.toFixed(2) + " V en el divisor", { "font-size": 14, fill: "#4A5873" }));

      lect.replaceChildren(lectura([
        ["Luz", est.luz + " %"], ["Resistencia del LDR", (rl / 1000).toFixed(1) + " kΩ"],
        ["Voltaje del divisor", vout.toFixed(2) + " V"], ["Relé", activo ? "ACTIVADO" : "reposo"]
      ]));
      if (activo) aviso(av, "", "El voltaje (" + vout.toFixed(2) + " V) alcanzó el umbral: el relé se activa y el dispensador funciona.");
      else aviso(av, "ojo", "Hay poca luz: el voltaje (" + vout.toFixed(2) + " V) no llega al umbral, el relé queda en reposo.");
    }
    p.append(dl.el, du.el, svg, lect, av,
      h("p", { class: "sim-nota", text: "Divisor de voltaje con una resistencia fija de 10 kΩ y alimentación de 5 V. Con más luz, el LDR baja su resistencia y sube el voltaje." }));
    pintar();
  }

  SIMULACIONES.circuito = { montar(cont, ctx) {
    pestanas(cont, ctx, [
      { nombre: "Ley de Ohm", montar: tabOhm },
      { nombre: "Sensor de luz y relé", montar: tabLdr }
    ]);
  } };

  /* ---------- 2. ACTUADORES Y PORCIÓN ---------- */
  function tabServo(p, ctx) {
    let ang = 0;
    const svg = s("svg", { viewBox: "0 0 600 260", class: "sim-svg", role: "img", "aria-label": "Servomotor con su brazo" });
    const lect = h("div");
    const av = h("p", { class: "aviso-sim", "aria-live": "polite" });
    const d = deslizador("Ángulo del servomotor", 0, 180, 5, ang, "°", v => { ang = v; pintar(); }, ctx);
    const rapidos = h("div", { class: "sim-grupo" }, [0, 90, 180].map(v =>
      h("button", { type: "button", onclick: () => { d.set(v); ctx.interaccion(); } }, v + "°")));

    svg.append(s("path", { d: "M 210 170 A 90 90 0 0 1 390 170", fill: "none", stroke: "#B9B2F0", "stroke-width": 3, "stroke-dasharray": "6 6" }));
    svg.append(T(196, 190, "0°", { "font-size": 14 })); svg.append(T(300, 62, "90°", { "font-size": 14 })); svg.append(T(404, 190, "180°", { "font-size": 14 }));
    svg.append(s("rect", { x: 210, y: 170, width: 180, height: 70, rx: 10, fill: "#12203A" }));
    svg.append(T(300, 212, "Servomotor", { fill: "#fff", "font-weight": 700 }));
    const brazo = s("line", { x1: 300, y1: 170, x2: 210, y2: 170, stroke: "#F5A524", "stroke-width": 12, "stroke-linecap": "round" });
    brazo.setAttribute("style", "transform-origin:300px 170px;transition:transform .5s ease");
    svg.append(brazo);
    svg.append(s("circle", { cx: 300, cy: 170, r: 12, fill: "#fff", stroke: "#12203A", "stroke-width": 4 }));

    function pintar() {
      brazo.style.transform = "rotate(" + ang + "deg)";
      const pulso = (1 + ang / 180).toFixed(2);
      const abierta = ang >= 80;
      lect.replaceChildren(lectura([["Ángulo", ang + "°"], ["Pulso de control", pulso + " ms"], ["Compuerta", abierta ? "abierta" : "cerrada"]]));
      aviso(av, abierta ? "" : "ojo", abierta ? "El brazo abre la compuerta: cae el alimento." : "La compuerta está cerrada: no cae alimento.");
    }
    p.append(d.el, rapidos, svg, lect, av,
      h("p", { class: "sim-nota", text: "Un servomotor se coloca en el ángulo que indica el ancho del pulso: 1 ms ≈ 0° y 2 ms ≈ 180°." }));
    pintar();
  }

  function tabDC(p, ctx) {
    const est = { v: 6, inv: false };
    const svg = s("svg", { viewBox: "0 0 600 260", class: "sim-svg", role: "img", "aria-label": "Motor DC con una hélice" });
    const lect = h("div");
    const av = h("p", { class: "aviso-sim", "aria-live": "polite" });
    const d = deslizador("Voltaje del motor", 0, 12, 1, est.v, "V", v => { est.v = v; pintar(); }, ctx);
    const inv = h("button", {
      type: "button", class: "interruptor", "aria-pressed": "false",
      onclick: () => { est.inv = !est.inv; ctx.interaccion(); pintar(); }
    }, "Invertir polaridad");

    svg.append(s("rect", { x: 150, y: 100, width: 140, height: 60, rx: 12, fill: "#12203A" }));
    svg.append(T(220, 137, "Motor DC", { fill: "#fff", "font-weight": 700 }));
    svg.append(s("line", { x1: 290, y1: 130, x2: 330, y2: 130, stroke: "#8A94A8", "stroke-width": 8 }));
    const helice = s("g", { class: "gira" });
    [0, 90].forEach(a => helice.append(s("ellipse", { cx: 400, cy: 130, rx: 70, ry: 14, fill: "#3A4FDB", "fill-opacity": 0.85, transform: "rotate(" + a + " 400 130)" })));
    svg.append(helice);
    svg.append(s("circle", { cx: 400, cy: 130, r: 10, fill: "#fff", stroke: "#12203A", "stroke-width": 4 }));

    function pintar() {
      const rpm = est.v * 25;
      inv.setAttribute("aria-pressed", String(est.inv));
      if (est.v === 0) { helice.removeAttribute("style"); helice.setAttribute("class", ""); }
      else {
        helice.setAttribute("class", "gira");
        helice.setAttribute("style", "animation-duration:" + (6 / est.v).toFixed(2) + "s;animation-direction:" + (est.inv ? "reverse" : "normal"));
      }
      lect.replaceChildren(lectura([["Voltaje", est.v + " V"], ["Velocidad aproximada", rpm + " rpm"], ["Sentido", est.inv ? "contrario" : "normal"]]));
      aviso(av, est.v === 0 ? "ojo" : "", est.v === 0 ? "Sin voltaje el motor está detenido." : "Más voltaje, más velocidad. Invertir la polaridad invierte el giro.");
    }
    p.append(d.el, h("div", { class: "sim-grupo" }, inv), svg, lect, av);
    pintar();
  }

  function tabPasos(p, ctx) {
    let n = 0;
    const svg = s("svg", { viewBox: "0 0 600 260", class: "sim-svg", role: "img", "aria-label": "Motor paso a paso con su indicador" });
    const lect = h("div");
    const av = h("p", { class: "aviso-sim", "aria-live": "polite" });
    svg.append(s("circle", { cx: 300, cy: 130, r: 100, fill: "#fff", stroke: "#12203A", "stroke-width": 6 }));
    for (let k = 0; k < 8; k++) {
      const a = (k * Math.PI) / 4;
      svg.append(s("line", { x1: 300 + 88 * Math.sin(a), y1: 130 - 88 * Math.cos(a), x2: 300 + 100 * Math.sin(a), y2: 130 - 100 * Math.cos(a), stroke: "#12203A", "stroke-width": 4 }));
    }
    svg.append(T(300, 22, "0°", { "font-size": 14 })); svg.append(T(420, 135, "90°", { "font-size": 14 }));
    svg.append(T(300, 252, "180°", { "font-size": 14 })); svg.append(T(180, 135, "270°", { "font-size": 14 }));
    const aguja = s("line", { x1: 300, y1: 130, x2: 300, y2: 50, stroke: "#C93B3B", "stroke-width": 10, "stroke-linecap": "round" });
    aguja.setAttribute("style", "transform-origin:300px 130px;transition:transform .25s ease");
    svg.append(aguja);
    svg.append(s("circle", { cx: 300, cy: 130, r: 10, fill: "#12203A" }));

    const mover = k => () => { n += k; ctx.interaccion(); pintar(); };
    const botones = h("div", { class: "sim-grupo" },
      h("button", { type: "button", onclick: mover(-10) }, "−10 pasos"),
      h("button", { type: "button", onclick: mover(-1) }, "−1 paso"),
      h("button", { type: "button", onclick: mover(1) }, "+1 paso"),
      h("button", { type: "button", onclick: mover(10) }, "+10 pasos"),
      h("button", { type: "button", onclick: () => { n = 0; ctx.interaccion(); pintar(); } }, "Volver a 0"));

    function pintar() {
      const grados = n * 1.8;
      aguja.style.transform = "rotate(" + grados + "deg)";
      const mod = ((grados % 360) + 360) % 360;
      lect.replaceChildren(lectura([["Pasos dados", n], ["Posición", mod.toFixed(1) + "°"], ["Vueltas", (grados / 360).toFixed(2)]]));
      aviso(av, "", "Cada paso gira exactamente 1,8°: por eso es muy preciso para posicionar.");
    }
    p.append(botones, svg, lect, av,
      h("p", { class: "sim-nota", text: "Un motor paso a paso típico da 200 pasos por vuelta (360° ÷ 200 = 1,8° por paso)." }));
    pintar();
  }

  function tabSolenoide(p, ctx) {
    const est = { on: false };
    const svg = s("svg", { viewBox: "0 0 600 260", class: "sim-svg", role: "img", "aria-label": "Solenoide con su émbolo" });
    const lect = h("div");
    const av = h("p", { class: "aviso-sim", "aria-live": "polite" });
    const btn = h("button", {
      type: "button", class: "interruptor", "aria-pressed": "false",
      onclick: () => { est.on = !est.on; ctx.interaccion(); pintar(); }
    }, "Energizar la bobina");

    svg.append(s("rect", { x: 130, y: 90, width: 170, height: 80, rx: 8, fill: "#12203A" }));
    for (let k = 0; k < 6; k++) svg.append(s("line", { x1: 150 + k * 26, y1: 96, x2: 164 + k * 26, y2: 164, stroke: "#F5A524", "stroke-width": 5 }));
    svg.append(T(215, 200, "Bobina", { "font-size": 14, fill: "#4A5873" }));
    const embolo = s("rect", { x: 250, y: 118, width: 150, height: 24, rx: 6, fill: "#8A94A8", stroke: "#12203A", "stroke-width": 3 });
    embolo.setAttribute("style", "transition:transform .25s ease");
    svg.append(embolo);
    const compuerta = s("rect", { x: 470, y: 90, width: 14, height: 80, fill: "#3A4FDB" });
    svg.append(compuerta);

    function pintar() {
      btn.setAttribute("aria-pressed", String(est.on));
      embolo.style.transform = est.on ? "translateX(60px)" : "translateX(0)";
      lect.replaceChildren(lectura([["Bobina", est.on ? "energizada" : "apagada"], ["Émbolo", est.on ? "extendido" : "retraído"], ["Movimiento", "lineal, corto"]]));
      aviso(av, est.on ? "" : "ojo", est.on ? "El campo magnético empuja el émbolo: puede empujar una compuerta pequeña." : "Sin corriente, un resorte regresa el émbolo a su posición.");
    }
    p.append(h("div", { class: "sim-grupo" }, btn), svg, lect, av);
    pintar();
  }

  function tabPorcion(p, ctx, cada) {
    const FLUJO = { "Tornillo sin fin": 5, "Compuerta giratoria": 8, "Rueda dosificadora": 3 };   // g/s al 100 %
    const est = { mec: "Tornillo sin fin", t: 5, vel: 60, dado: 0, meta: 50, corriendo: false, final: null };
    const svg = s("svg", { viewBox: "0 0 600 260", class: "sim-svg", role: "img", "aria-label": "Tolva y plato que se llena" });
    const lect = h("div");
    const av = h("p", { class: "aviso-sim", "aria-live": "polite" });
    const fo = h("p", { class: "sim-nota" });
    const grupo = h("div", { class: "sim-grupo", role: "group", "aria-label": "Mecanismo de dispensación" }, Object.keys(FLUJO).map(m =>
      h("button", { type: "button", "aria-pressed": String(m === est.mec), onclick: () => { est.mec = m; est.final = null; est.dado = 0; ctx.interaccion(); pintar(); } }, m)));
    const dt = deslizador("Tiempo de activación", 1, 20, 1, est.t, "s", v => { est.t = v; est.final = null; est.dado = 0; pintar(); }, ctx);
    const dv = deslizador("Velocidad del motor", 20, 100, 10, est.vel, "%", v => { est.vel = v; est.final = null; est.dado = 0; pintar(); }, ctx);
    const btn = h("button", { type: "button", class: "btn btn-violeta", style: "align-self:flex-start", onclick: dispensar }, "Dispensar");
    const flujo = () => (FLUJO[est.mec] * est.vel) / 100;
    const porcion = () => flujo() * est.t;

    function dispensar() {
      if (est.corriendo) return;
      est.corriendo = true; est.final = null; est.dado = 0; ctx.interaccion();
      const total = porcion(); let paso = 0;
      cada(() => {
        if (!est.corriendo) return;
        paso++;
        est.dado = total * Math.min(paso / 24, 1);
        if (paso >= 24) { est.corriendo = false; est.final = total; }
        pintar();
      }, 60);
      pintar();
    }

    function pintar() {
      svg.replaceChildren();
      svg.append(s("path", { d: "M 230 20 H 370 L 330 100 H 270 Z", fill: "#E3F5F2", stroke: "#0B7F72", "stroke-width": 4 }));
      svg.append(T(300, 62, "Tolva", { "font-size": 14 }));
      svg.append(s("rect", { x: 270, y: 100, width: 60, height: 30, fill: "#3A4FDB" }));
      svg.append(T(300, 120, est.mec.split(" ")[0], { fill: "#fff", "font-size": 12 }));
      if (est.corriendo) svg.append(s("line", { x1: 300, y1: 130, x2: 300, y2: 195, stroke: "#B77A00", "stroke-width": 6, "stroke-dasharray": "4 6" }));
      svg.append(s("rect", { x: 220, y: 195, width: 160, height: 55, rx: 10, fill: "#fff", stroke: "#12203A", "stroke-width": 5 }));
      const alto = Math.min(est.dado / 100, 1) * 45;
      svg.append(s("rect", { x: 225, y: 245 - alto, width: 150, height: alto, fill: "#B77A00", "fill-opacity": 0.85 }));
      svg.append(T(300, 190, Math.round(est.dado) + " g", { "font-weight": 800 }));
      lect.replaceChildren(lectura([["Flujo", flujo().toFixed(1) + " g/s"], ["Porción calculada", porcion().toFixed(0) + " g"], ["Meta", est.meta + " g (±5)"]]));
      fo.textContent = "Porción = flujo × tiempo = " + flujo().toFixed(1) + " g/s × " + est.t + " s = " + porcion().toFixed(0) + " g";
      btn.disabled = est.corriendo;
      if (est.final === null) aviso(av, "ojo", est.corriendo ? "Dispensando…" : "Ajusta el mecanismo, el tiempo y la velocidad para entregar " + est.meta + " g, y pulsa Dispensar.");
      else if (Math.abs(est.final - est.meta) <= 5) aviso(av, "", "¡Porción exacta! Entregaste " + Math.round(est.final) + " g.");
      else if (est.final < est.meta) aviso(av, "mal", "Faltaron " + Math.round(est.meta - est.final) + " g. Sube el tiempo o la velocidad.");
      else aviso(av, "mal", "Sobraron " + Math.round(est.final - est.meta) + " g. Baja el tiempo o la velocidad.");
    }
    p.append(grupo, dt.el, dv.el, btn, svg, lect, fo, av);
    pintar();
  }

  SIMULACIONES.actuadores = { montar(cont, ctx) {
    pestanas(cont, ctx, [
      { nombre: "Servomotor", montar: tabServo },
      { nombre: "Motor DC", montar: tabDC },
      { nombre: "Paso a paso", montar: tabPasos },
      { nombre: "Solenoide", montar: tabSolenoide },
      { nombre: "Porción de comida", montar: tabPorcion }
    ]);
  } };

  /* ---------- 3. CONTROL DE TIEMPOS ---------- */
  function tabDelayMillis(p, ctx, cada) {
    const est = { modo: "delay", led: 0, led2: 0, pend: null, msg: "", tipo: "ojo" };
    const svg = s("svg", { viewBox: "0 0 600 160", class: "sim-svg", role: "img", "aria-label": "Dos LED: uno parpadea y otro responde al botón" });
    const av = h("p", { class: "aviso-sim", "aria-live": "polite" });
    const codigo = h("pre", { class: "codigo" });
    const modos = h("div", { class: "sim-grupo", role: "group", "aria-label": "Método de espera" }, ["delay", "millis"].map(m =>
      h("button", { type: "button", "aria-pressed": String(m === est.modo), "data-m": m,
        onclick: () => { est.modo = m; est.pend = null; est.msg = ""; ctx.interaccion(); pintar(); } }, m + "()")));
    const boton = h("button", { type: "button", class: "btn btn-violeta", style: "align-self:flex-start", onclick: pulsar }, "Presionar el botón");

    function responder(seg) {
      est.led2 = 1; est.pend = null;
      if (seg < 0.05) { est.msg = "Respondió al instante: el programa sigue revisando el botón mientras cuenta el tiempo."; est.tipo = ""; }
      else { est.msg = "Tardó " + seg.toFixed(1) + " s en responder: el programa estaba detenido en delay()."; est.tipo = "mal"; }
      setTimeout(() => { est.led2 = 0; if (p.isConnected) pintar(); }, 700);
    }
    function pulsar() {
      ctx.interaccion();
      if (est.modo === "millis") responder(0);
      else if (est.pend === null) { est.pend = Date.now(); est.msg = "Presionaste el botón, pero el Arduino está esperando dentro de delay()…"; est.tipo = "ojo"; }
      pintar();
    }
    cada(() => {
      est.led = 1 - est.led;
      if (est.pend !== null) responder((Date.now() - est.pend) / 1000);
      pintar();
    }, 1000);

    function pintar() {
      modos.querySelectorAll("button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.m === est.modo)));
      svg.replaceChildren();
      const led = (cx, on, nombre) => {
        svg.append(s("circle", { cx, cy: 70, r: 34, fill: on ? "#F5A524" : "#E3E7F0", stroke: "#12203A", "stroke-width": 4 }));
        svg.append(T(cx, 140, nombre, { "font-size": 14, fill: "#4A5873" }));
      };
      led(180, est.led, "LED 1 (cambia cada 1 s)");
      led(420, est.led2, "LED 2 (responde al botón)");
      codigo.textContent = est.modo === "delay"
        ? "digitalWrite(LED1, HIGH);\ndelay(1000);   // el programa se detiene aquí\ndigitalWrite(LED1, LOW);\ndelay(1000);   // y aquí\n// el botón solo se revisa entre una espera y otra"
        : "if (millis() - ultimo >= 1000) {\n  ultimo = millis();\n  estadoLED = !estadoLED;\n}\nleerBoton();   // se revisa todo el tiempo";
      if (est.msg) aviso(av, est.tipo, est.msg);
      else aviso(av, "ojo", "Pulsa el botón y compara la respuesta en cada modo.");
    }
    p.append(modos, svg, codigo, boton, av);
    pintar();
  }

  function tabRtc(p, ctx, cada) {
    const est = { alarma: 8, min: 7 * 60 + 55, energia: true, bateria: true, sirviendo: 0, ultimo: "" };
    const reloj = h("div", { class: "reloj", role: "timer", "aria-label": "Reloj del dispensador" });
    const lect = h("div");
    const av = h("p", { class: "aviso-sim", "aria-live": "polite" });
    const hh = m => String(Math.floor(m / 60)).padStart(2, "0") + ":" + String(m % 60).padStart(2, "0");
    const reiniciar = () => { est.min = (est.alarma * 60 - 5 + 1440) % 1440; est.sirviendo = 0; est.ultimo = ""; };
    const d = deslizador("Hora de la comida", 0, 23, 1, est.alarma, "h", v => { est.alarma = v; reiniciar(); pintar(); }, ctx);
    const bEnergia = h("button", { type: "button", class: "interruptor", "aria-pressed": "true", onclick: () => {
      est.energia = !est.energia; ctx.interaccion();
      if (est.energia && est.min === null) { est.min = 0; est.ultimo = "Sin batería, el RTC perdió la hora y volvió a 00:00. La alarma ya no coincide."; }
      if (!est.energia && !est.bateria) est.min = null;
      pintar();
    } }, "Energía del Arduino");
    const bBat = h("button", { type: "button", class: "interruptor", "aria-pressed": "true", onclick: () => {
      est.bateria = !est.bateria; ctx.interaccion();
      if (!est.energia && !est.bateria) est.min = null;
      pintar();
    } }, "Batería del RTC");
    const bRei = h("button", { type: "button", onclick: () => { reiniciar(); if (est.min === null) est.min = 0; ctx.interaccion(); pintar(); } }, "Reiniciar 5 min antes");

    cada(() => {
      if (est.min === null) return;
      if (!est.energia && !est.bateria) return;
      est.min = (est.min + 1) % 1440;
      if (est.sirviendo > 0) est.sirviendo--;
      if (est.min === est.alarma * 60) {
        if (est.energia) { est.sirviendo = 3; est.ultimo = "A las " + hh(est.min) + " el RTC avisó y el dispensador sirvió la comida."; }
        else est.ultimo = "Era la hora de comer, pero el Arduino estaba sin energía: no se sirvió.";
      }
      pintar();
    }, 1000);

    function pintar() {
      bEnergia.setAttribute("aria-pressed", String(est.energia));
      bBat.setAttribute("aria-pressed", String(est.bateria));
      reloj.textContent = est.energia && est.min !== null ? hh(est.min) : "--:--";
      reloj.className = "reloj" + (est.energia ? "" : " apagado");
      lect.replaceChildren(lectura([
        ["Hora de comida", hh(est.alarma * 60)], ["Arduino", est.energia ? "encendido" : "sin energía"],
        ["Batería del RTC", est.bateria ? "puesta" : "retirada"], ["Dispensador", est.sirviendo > 0 ? "sirviendo" : "en espera"]
      ]));
      if (est.sirviendo > 0) aviso(av, "", "¡Hora de comer! El dispensador está sirviendo.");
      else if (est.ultimo) aviso(av, est.ultimo.startsWith("A las") ? "" : "mal", est.ultimo);
      else aviso(av, "ojo", "Espera la hora de comida. Prueba cortar la energía con y sin batería del RTC.");
    }
    p.append(d.el, reloj, h("div", { class: "sim-grupo" }, bEnergia, bBat, bRei), lect, av,
      h("p", { class: "sim-nota", text: "1 segundo real = 1 minuto simulado. El módulo RTC (por ejemplo DS3231) conserva la hora con su batería aunque se apague el Arduino." }));
    pintar();
  }

  SIMULACIONES.tiempos = { montar(cont, ctx) {
    pestanas(cont, ctx, [
      { nombre: "delay() frente a millis()", montar: tabDelayMillis },
      { nombre: "Reloj RTC y alarma", montar: tabRtc }
    ]);
  } };

})();
