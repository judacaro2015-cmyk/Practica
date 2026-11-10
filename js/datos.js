"use strict";
/* ==========================================================
   AQUÍ SE LLENA TODO EL CONTENIDO.
   No necesitas tocar el resto del código: copia una unidad,
   cámbiale los textos y la web la muestra sola.

   ESPACIOS LIBRES PARA REDACTAR (aparecen como recuadros punteados
   hasta que escribas algo):
     - PROYECTO.introGeneral : introducción general a las temáticas (inicio)
     - unidad.introduccion   : introducción de cada temática
     - unidad.explora.texto  : contenido del paso Explora
   ========================================================== */

const PROYECTO = {
  nombre: "[NOMBRE DEL PROYECTO]",
  frase: "Aprende tecnología simulando, jugando y resolviendo retos.",
  colegio: "Colegio OEA IED",
  area: "Tecnología e Informática",
  autor: "[Tu nombre]",
  universidad: "[Universidad]",
  anio: 2026,
  grados: [9],                    // grados que se muestran en la portada (ej.: [8, 9, 10])
  gradoPiloto: 9,                  // grado seleccionado al abrir la página
  historiaRetos: "Cada unidad termina con una misión. Si la superas, ganas una insignia y subes de nivel.",

  // ---- ESPACIO LIBRE: introducción general a las temáticas ----
  // Escribe entre las comillas. Para varios párrafos usa una lista:
  //   introGeneral: ["Primer párrafo.", "Segundo párrafo."],
  tituloTematicas: "Temáticas del proyecto",
  introGeneral: [
    "En este proyecto vas a recorrer, paso a paso, cómo se diseña un dispensador automático de comida para mascotas: un aparato que sirve la porción justa, a la hora correcta, sin que nadie tenga que estar pendiente. Para lograrlo se juntan varias ideas de tecnología que seguramente has visto por separado: piezas que se mueven, circuitos, motores, relojes y la lógica que decide cuándo actuar.",
    "Verás seis temáticas: el diseño mecánico, el diseño electrónico, los actuadores y mecanismos, el control de tiempos, los principios de computación y las compuertas lógicas. En cada una sigues los mismos cuatro pasos: Explora, Simula, Practica y Reta. No necesitas materiales ni herramientas: todo lo pruebas aquí, en simulaciones, y cada reto superado te da una insignia."
  ],

  // Enlaces: pega aquí las direcciones de tus formularios (Google Forms, etc.)
  // (Los enlaces de las encuestas están escritos directamente en index.html.)
  encuestaEstudiantes: "https://forms.gle/7653KoqGijDFwjg96",
  encuestaDocentes: "https://forms.gle/LhzL1hiG9Kx3n8Hq7",
  guiaDocente: "#docentes"
};

/* ----------------------------------------------------------
   UNIDADES (una por temática)
   Campos de cada unidad:
     id, grados:[...], tema, titulo, objetivo
     introduccion : ESPACIO LIBRE para tu texto de introducción
     subtemas     : lista de contenidos de la temática
     vocabulario  : [{t, d}]
     explora      : { tiempo, texto:[...], instrucciones:[...] }
     simulacion   : { id, nombre, descripcion, tiempo, instrucciones, pista, observar, externa:{texto,url} }
                    id "compuertas", "binario", "circuito", "actuadores" o "tiempos" = simulación propia de la web.
                    externa = botón que abre otra herramienta (por ejemplo Tinkercad).
                    Si no pones simulacion, el paso muestra un espacio reservado.
     practica     : { tiempo, instrucciones, pista, actividades:[...] }
     reta         : { tiempo, titulo, historia, instrucciones, pista, minimo, insignia, preguntas:[...] }
   Tipos de actividad en practica.actividades:
     relacionar : { tipo, titulo, pares:[[izquierda, derecha], ...] }
     ordenar    : { tipo, titulo, pasos:[paso1, paso2, ...] }  (en el orden CORRECTO)
     clasificar : { tipo, titulo, categorias:[...], items:[{t:"texto", c:indiceDeCategoria}, ...] }
     quiz       : { tipo, titulo, preguntas:[{p, opciones:[...], correcta:indice, explicacion}] }
   Los grados de cada unidad (grados:[9]) son provisionales: ajústalos.
   ---------------------------------------------------------- */
const UNIDADES = [

  /* ============ 1. DISPENSADOR: DISEÑO MECÁNICO ============ */
  {
    id: "dispensador-mecanico",
    grados: [9],
    tema: "Dispensador automático",
    titulo: "Dispensador automático (diseño mecánico)",
    objetivo: "Comprender el diseño mecánico y el diseño asistido por computadora (CAD) para modelar los elementos de un dispensador automático de alimento para mascotas.",
    introduccion: [
    "Antes de fabricar cualquier aparato hay que pensarlo: qué forma tendrá, de qué piezas se compone y cómo se moverán. Eso es el diseño mecánico. Detrás hay física y matemáticas que ya conoces: fuerzas, palancas, engranajes y el torque, que es la fuerza con que algo gira (se calcula multiplicando la fuerza por la distancia al punto de giro).",
    "Hoy no hace falta construir para probar una idea. Con el diseño asistido por computadora (CAD) dibujas las piezas en 3D, las armas en pantalla y detectas errores sin gastar material. Usaremos Tinkercad, una herramienta gratuita que funciona en el navegador. Verás qué puede hacer y qué no, y la aplicarás a las piezas del dispensador: la tolva donde se guarda la comida, el mecanismo que la deja caer, el plato y la carcasa que lo sostiene todo."
  ],
    subtemas: [
      "Diseño mecánico: concepto, campo de aplicación y relación con física y matemáticas",
      "Diseño asistido por computadora (CAD) y prototipos virtuales",
      "Tinkercad: diseño 3D, ventajas y limitaciones",
      "Elementos mecánicos del dispensador automático de alimentos para mascotas"
    ],
    vocabulario: [
      { t: "CAD", d: "Diseño asistido por computadora: modelar piezas en el computador antes de fabricarlas." },
      { t: "Prototipo virtual", d: "Modelo digital que se prueba sin construir la pieza real." },
      { t: "Tolva", d: "Depósito que almacena el alimento y lo deja caer hacia el mecanismo." }
    ],
    explora: {
      tiempo: "~5 min",
      texto: [],
      instrucciones: ["Lee la introducción y los contenidos de la temática.", "Cuando estés listo, pasa a Simula."]
    },
    simulacion: {
      id: "externa",
      nombre: "Diseño 3D en Tinkercad",
      descripcion: "Modela en 3D una pieza del dispensador, como la tolva o la compuerta.",
      tiempo: "~10 min",
      externa: { texto: "Abrir Tinkercad", url: "https://www.tinkercad.com/" },
      instrucciones: ["Abre Tinkercad con el botón (inicia sesión si te lo pide).", "Crea un diseño 3D sencillo, por ejemplo la tolva del dispensador.", "Vuelve aquí y marca el paso como completado."],
      pista: "Empieza con formas básicas y combínalas: un cilindro hueco puede ser una tolva.",
      observar: "¿Qué ventaja tiene probar el diseño en el computador antes de fabricarlo?"
    },
    practica: {
      tiempo: "~5 min",
      instrucciones: ["Relaciona cada concepto con su descripción."],
      pista: "Piensa en qué momento del diseño se usa cada concepto.",
      actividades: [
        {
          tipo: "relacionar",
          titulo: "Relaciona cada concepto con su descripción",
          pares: [
            ["CAD", "Diseño asistido por computadora para modelar piezas antes de fabricarlas"],
            ["Prototipo virtual", "Modelo digital que permite probar el diseño sin construirlo"],
            ["Tinkercad", "Herramienta en línea para modelar en 3D y simular circuitos"],
            ["Tolva", "Depósito que almacena el alimento del dispensador"]
          ]
        }
      ]
    },
    reta: {
      tiempo: "~5 min",
      titulo: "Reta: diseña sin desperdiciar material",
      historia: "Tu equipo debe entregar el diseño de un dispensador para mascotas. Antes de fabricarlo, comprueba que dominas lo básico.",
      instrucciones: ["Responde las 3 preguntas.", "Necesitas al menos 2 aciertos para ganar la insignia."],
      pista: "Recuerda para qué sirve un prototipo virtual.",
      minimo: 2,
      insignia: "Diseñador mecánico",
      preguntas: [
        { p: "¿Para qué sirve un prototipo virtual?", opciones: ["Para probar y corregir el diseño antes de fabricarlo", "Para reemplazar siempre al producto final", "Para decorar el producto"], correcta: 0, explicacion: "Permite detectar errores sin gastar material." },
        { p: "En un dispensador de alimento, ¿qué elemento almacena el concentrado?", opciones: ["La tolva", "El relé", "El sensor de luz"], correcta: 0, explicacion: "La tolva es el depósito del que cae el alimento." },
        { p: "¿Cuál es una limitación de Tinkercad?", opciones: ["Tiene menos herramientas que un CAD profesional para piezas complejas", "No permite diseñar en 3D", "Solo funciona con una impresora conectada"], correcta: 0, explicacion: "Es sencillo y gratuito, pero se queda corto en diseños complejos o de alta precisión." }
      ]
    }
  },

  /* ============ 2. DISPENSADOR: DISEÑO ELECTRÓNICO ============ */
  {
    id: "dispensador-electronico",
    grados: [9],
    tema: "Dispensador automático",
    titulo: "Dispensador automático (diseño electrónico)",
    objetivo: "Reconocer los componentes electrónicos básicos de un dispensador y simular su circuito de control con Arduino en Tinkercad.",
    introduccion: [
    "Si la parte mecánica es el cuerpo del dispensador, la electrónica es su sistema nervioso: lleva la energía y las señales a cada parte. Para entenderla necesitas tres ideas: el voltaje (el empuje de la electricidad), la corriente (cuánta electricidad circula) y la resistencia (lo que la frena). La ley de Ohm las relaciona, y por eso un LED necesita una resistencia en serie: sin ella pasaría demasiada corriente y se dañaría.",
    "También conocerás componentes muy útiles. La fotorresistencia (LDR) cambia su resistencia según la luz que recibe, así que sirve de sensor. El Arduino entrega muy poca corriente, por eso, para encender motores o cargas más grandes, se usan un transistor o un relé, que funcionan como interruptores controlados por una señal pequeña. Todo lo armarás y probarás en la simulación, sin riesgo de quemar nada."
  ],
    subtemas: [
      "Tinkercad para circuitos electrónicos: simulación en tiempo real y programación con Arduino (bloques y texto)",
      "Control automático con LDR (fotorresistencia): variación de resistencia según la luz",
      "Relé electromecánico y transistor para controlar cargas de media o baja potencia",
      "Componentes de electrónica básica"
    ],
    vocabulario: [
      { t: "LDR", d: "Fotorresistencia: su resistencia cambia con la luz que recibe." },
      { t: "Relé", d: "Interruptor electromecánico que una señal pequeña activa para controlar una carga mayor." },
      { t: "Transistor", d: "Componente semiconductor que conmuta o amplifica una señal." }
    ],
    explora: {
      tiempo: "~5 min",
      texto: [],
      instrucciones: ["Lee la introducción y los contenidos de la temática.", "Cuando estés listo, pasa a Simula."]
    },
    simulacion: {
      id: "circuito",
      nombre: "Laboratorio de circuitos básicos",
      descripcion: "Cambia el voltaje y la resistencia (ley de Ohm) y controla un relé con un sensor de luz, sin Arduino.",
      tiempo: "~10 min",
      externa: { texto: "Probar también en Tinkercad", url: "https://www.tinkercad.com/" },
      instrucciones: ["En Ley de Ohm, cambia el voltaje y la resistencia y mira la corriente.", "Busca la combinación que haga brillar el LED sin quemarlo.", "En Sensor de luz y relé, cambia la luz y mira cuándo se activa el relé."],
      pista: "Más resistencia significa menos corriente. El LED se quema si pasa demasiada.",
      observar: "¿Qué pasa con la resistencia del LDR cuando aumenta la luz, y cuándo se activa el relé?"
    },
    practica: {
      tiempo: "~5 min",
      instrucciones: ["Relaciona cada componente con su función."],
      pista: "Piensa en qué hace cada componente dentro del dispensador.",
      actividades: [
        {
          tipo: "relacionar",
          titulo: "Relaciona cada componente con su función",
          pares: [
            ["LDR", "Su resistencia disminuye cuando recibe más luz"],
            ["Relé", "Permite que una señal pequeña controle una carga mayor"],
            ["Transistor", "Conmuta o amplifica una señal"],
            ["Resistencia", "Limita la corriente que pasa por el circuito"]
          ]
        }
      ]
    },
    reta: {
      tiempo: "~5 min",
      titulo: "Reta: el circuito que decide",
      historia: "El dispensador debe activarse solo cuando detecte que es de día. Demuestra que sabes cómo.",
      instrucciones: ["Responde las 3 preguntas.", "Necesitas al menos 2 aciertos."],
      pista: "Recuerda cómo cambia la resistencia del LDR con la luz.",
      minimo: 2,
      insignia: "Experto en circuitos",
      preguntas: [
        { p: "Si aumenta la luz sobre un LDR, su resistencia...", opciones: ["disminuye", "aumenta", "no cambia"], correcta: 0, explicacion: "La resistencia de un LDR baja cuando recibe más luz." },
        { p: "¿Para qué se usa un relé en el dispensador?", opciones: ["Para que una señal pequeña del Arduino controle una carga mayor", "Para medir la luz", "Para guardar la hora"], correcta: 0, explicacion: "El relé aísla y permite controlar cargas que el Arduino no puede manejar directamente." },
        { p: "Tinkercad Circuits permite...", opciones: ["Simular el circuito y programar Arduino en bloques o texto", "Fabricar el circuito impreso", "Medir la corriente de un circuito real"], correcta: 0, explicacion: "Simula en tiempo real y permite programar la placa en bloques o en texto." }
      ]
    }
  },

  /* ============ 3. ACTUADORES Y MECANISMOS ============ */
  {
    id: "actuadores-mecanismos",
    grados: [9],
    tema: "Dispensador automático",
    titulo: "Actuadores y mecanismos",
    objetivo: "Diferenciar los tipos de actuadores y los mecanismos de dispensación, y entender cómo se controla la porción de comida.",
    introduccion: [
    "Un sistema automático tiene sensores (sus sentidos), un microcontrolador (su cerebro) y actuadores (sus músculos). Los actuadores son los que convierten una señal eléctrica en movimiento. Conocerás cuatro: el servomotor, que se mueve hasta un ángulo exacto; el motor DC, que gira continuamente y cambia de velocidad con el voltaje; el motor paso a paso, que avanza en pasos muy pequeños (uno de 200 pasos da la vuelta completa en pasos de 1,8°); y el solenoide, un electroimán que empuja o jala un émbolo en línea recta.",
    "El actuador solo no sirve la comida: necesita un mecanismo que transforme su movimiento. Estudiaremos la compuerta giratoria, la compuerta deslizante, el tornillo sin fin, la rueda dosificadora y la cremallera y piñón. Y descubrirás cómo se controla la porción: depende del tiempo que el actuador esté activo, del mecanismo elegido y de la velocidad del motor."
  ],
    subtemas: [
      "Actuadores: definición y tipos (servomotor, motor DC, motor paso a paso, solenoide)",
      "Mecanismos de dispensación: compuerta giratoria, compuerta deslizante, tornillo sin fin, rueda dosificadora, cremallera y piñón",
      "Control de la porción de comida: tiempo de activación, tipo de mecanismo y velocidad del motor",
      "Simulación de circuitos con Arduino en Tinkercad"
    ],
    vocabulario: [
      { t: "Actuador", d: "Dispositivo que convierte una señal de control en movimiento o acción." },
      { t: "Mecanismo de dispensación", d: "Sistema que deja salir una cantidad controlada de alimento." },
      { t: "Porción", d: "Cantidad de alimento que entrega el dispensador en cada activación." }
    ],
    explora: {
      tiempo: "~5 min",
      texto: [],
      instrucciones: ["Lee la introducción y los contenidos de la temática.", "Cuando estés listo, pasa a Simula."]
    },
    simulacion: {
      id: "actuadores",
      nombre: "Laboratorio de actuadores",
      descripcion: "Mueve un servomotor, un motor DC, un motor paso a paso y un solenoide, y calcula la porción de comida.",
      tiempo: "~10 min",
      externa: { texto: "Probar también en Tinkercad", url: "https://www.tinkercad.com/" },
      instrucciones: ["Recorre las pestañas y mueve cada actuador.", "En Porción de comida, elige un mecanismo y ajusta tiempo y velocidad hasta entregar 50 g."],
      pista: "La porción es el flujo del mecanismo multiplicado por el tiempo de activación.",
      observar: "¿Qué cambia en la porción si duplicas el tiempo? ¿Y si cambias de mecanismo?"
    },
    practica: {
      tiempo: "~5 min",
      instrucciones: ["Relaciona cada actuador con su característica."],
      pista: "Fíjate en el tipo de movimiento que produce cada uno.",
      actividades: [
        {
          tipo: "relacionar",
          titulo: "Relaciona cada actuador con su característica",
          pares: [
            ["Servomotor", "Gira hasta un ángulo controlado"],
            ["Motor DC", "Gira de forma continua según el voltaje que recibe"],
            ["Motor paso a paso", "Avanza en pasos de tamaño definido"],
            ["Solenoide", "Produce un movimiento lineal corto al energizarse"]
          ]
        }
      ]
    },
    reta: {
      tiempo: "~5 min",
      titulo: "Reta: la porción exacta",
      historia: "A tu mascota le toca la cena y el dispensador debe entregar la porción justa. Resuelve cómo lograrlo.",
      instrucciones: ["Responde las 3 preguntas.", "Necesitas al menos 2 aciertos."],
      pista: "La porción depende del tiempo, del mecanismo y de la velocidad.",
      minimo: 2,
      insignia: "Maestro de mecanismos",
      preguntas: [
        { p: "¿Qué actuador gira hasta un ángulo determinado?", opciones: ["Servomotor", "Solenoide", "Motor DC"], correcta: 0, explicacion: "El servomotor se posiciona en el ángulo que se le indica." },
        { p: "¿Qué mecanismo empuja el alimento con una espiral que gira?", opciones: ["Tornillo sin fin", "Compuerta deslizante", "Cremallera y piñón"], correcta: 0, explicacion: "El tornillo sin fin transporta el alimento al girar." },
        { p: "Para entregar más alimento con el mismo mecanismo puedes...", opciones: ["Aumentar el tiempo de activación", "Cambiar el color del alimento", "Apagar el motor"], correcta: 0, explicacion: "La porción depende del tiempo de activación, del tipo de mecanismo y de la velocidad del motor." }
      ]
    }
  },

  /* ============ 4. DISPENSADOR: CONTROL DE TIEMPOS ============ */
  {
    id: "dispensador-tiempos",
    grados: [9],
    tema: "Dispensador automático",
    titulo: "Dispensador automático (control de tiempos)",
    objetivo: "Programar el control de tiempos de un automatismo con Arduino usando millis(), delay() y un módulo RTC.",
    introduccion: [
    "Un automatismo es un sistema que realiza una tarea por sí solo siguiendo reglas, sin que una persona intervenga. Los hay eléctricos, electrónicos, hidráulicos y neumáticos. El nuestro será electrónico y lo controlará un Arduino, una placa de hardware libre con un microcontrolador, pines de entrada y salida, y la posibilidad de conectarle sensores y actuadores.",
    "Lo difícil de un dispensador es el tiempo: servir a la hora correcta y durante los segundos justos. Con delay() el Arduino se queda esperando y no hace nada más; con millis() va contando los milisegundos desde que arrancó y puede seguir atento al resto. Y si se va la luz, un reloj RTC como el DS3231, que tiene batería de respaldo, no pierde la hora y puede activar alarmas. Verás además las tres etapas de un programa: definir, configurar y ejecutar."
  ],
    subtemas: [
      "Diseño de automatismos: concepto y tipos (eléctricos, electrónicos, hidráulicos, neumáticos)",
      "Arduino: plataforma de hardware libre, microcontrolador, pines, sensores y actuadores",
      "Control de tiempos: millis(), delay() y timers internos",
      "Módulo RTC DS3231: protocolo I2C, TCXO, batería de respaldo y alarmas",
      "Etapas de programación: definición, configuración y ejecución"
    ],
    vocabulario: [
      { t: "Automatismo", d: "Sistema que realiza una tarea por sí solo, sin intervención constante de una persona." },
      { t: "RTC", d: "Reloj de tiempo real: módulo que mantiene la hora y la fecha." },
      { t: "I2C", d: "Protocolo de comunicación de dos hilos (SDA y SCL)." }
    ],
    explora: {
      tiempo: "~5 min",
      texto: [],
      instrucciones: ["Lee la introducción y los contenidos de la temática.", "Cuando estés listo, pasa a Simula."]
    },
    simulacion: {
      id: "tiempos",
      nombre: "Laboratorio de control de tiempos",
      descripcion: "Compara delay() con millis() y mira cómo un reloj RTC con batería dispara la hora de comida.",
      tiempo: "~10 min",
      externa: { texto: "Probar también en Tinkercad", url: "https://www.tinkercad.com/" },
      instrucciones: ["En delay() frente a millis(), pulsa el botón en cada modo y compara la respuesta.", "En Reloj RTC y alarma, corta la energía con y sin batería del RTC y observa qué pasa con la hora."],
      pista: "Con delay() el programa se detiene; con millis() sigue haciendo otras tareas.",
      observar: "¿Qué puede hacer el Arduino con millis() que no puede hacer con delay()?"
    },
    practica: {
      tiempo: "~5 min",
      instrucciones: ["Relaciona cada elemento con su función."],
      pista: "Piensa si el elemento pausa el programa o lo deja seguir.",
      actividades: [
        {
          tipo: "relacionar",
          titulo: "Relaciona cada elemento con su función",
          pares: [
            ["delay()", "Detiene el programa durante un tiempo"],
            ["millis()", "Cuenta los milisegundos desde que arrancó la placa sin detener el programa"],
            ["RTC DS3231", "Módulo de reloj de tiempo real con batería de respaldo"],
            ["I2C", "Protocolo de comunicación de dos hilos (SDA y SCL)"]
          ]
        }
      ]
    },
    reta: {
      tiempo: "~5 min",
      titulo: "Reta: la hora de comer",
      historia: "El dispensador debe servir comida todos los días a la misma hora, incluso si se va la luz.",
      instrucciones: ["Responde las 3 preguntas.", "Necesitas al menos 2 aciertos."],
      pista: "Piensa en qué módulo guarda la hora aunque se apague el Arduino.",
      minimo: 2,
      insignia: "Relojero digital",
      preguntas: [
        { p: "¿Qué diferencia a millis() de delay()?", opciones: ["millis() cuenta el tiempo sin detener el programa; delay() lo pausa", "Son idénticas", "delay() mide fechas reales"], correcta: 0, explicacion: "Con millis() el programa puede seguir haciendo otras tareas mientras espera." },
        { p: "El módulo DS3231 se comunica con el Arduino mediante...", opciones: ["I2C", "Bluetooth", "Wi-Fi"], correcta: 0, explicacion: "Usa el protocolo I2C, con los pines SDA y SCL." },
        { p: "¿Para qué sirve la batería del módulo RTC?", opciones: ["Mantener la hora cuando se apaga el Arduino", "Mover el motor", "Aumentar la luz"], correcta: 0, explicacion: "Así el reloj no pierde la hora aunque se corte la alimentación." }
      ]
    }
  },

  /* ============ 5. PRINCIPIOS DE COMPUTACIÓN ============ */
  {
    id: "principios-computacion",
    grados: [9],
    tema: "Computación",
    titulo: "Principios de computación",
    objetivo: "Describir la función de la CPU, sus componentes y su evolución, y reconocer el lenguaje ensamblador y las hojas de cálculo como herramientas de la computación.",
    introduccion: [
    "La CPU es el cerebro de un computador: la unidad central de procesamiento que ejecuta las instrucciones de los programas. Tu celular, tu consola y el Arduino del dispensador tienen algo parecido. Recorreremos su historia: de los computadores gigantes con tubos de vacío (como el ENIAC) a los transistores, los circuitos integrados y los microprocesadores de hoy, con varios núcleos, tarjetas gráficas (GPU) y aceleradores para inteligencia artificial.",
    "Por dentro, una CPU tiene una unidad de control que dirige, registros que guardan datos al instante, una ALU que hace las operaciones aritméticas y lógicas, y un reloj que marca el ritmo, como un latido. Verás cómo se le habla en lenguaje ensamblador, con instrucciones muy cercanas a lo que entiende la máquina y distintas según el tipo de procesador. Además usarás hojas de cálculo, con celdas, tipos de datos y fórmulas, para entender cómo se organizan y procesan los datos."
  ],
    subtemas: [
      "La CPU: definición y función como unidad central de procesamiento",
      "Evolución histórica: tubos de vacío (ENIAC, UNIVAC), transistores, circuitos integrados, microprocesadores, CPU de 16/32/64 bits y multinúcleo",
      "Procesadores modernos: eficiencia energética, GPU, aceleradores de IA, nanotecnología y computación cuántica",
      "Componentes de la CPU: unidad de control, registros, ALU, unidad de gestión de memoria y reloj",
      "Lenguaje ensamblador: mnemónicos, bajo nivel de abstracción, especificidad por arquitectura y relación con el lenguaje de máquina",
      "Hojas de cálculo: definición, tipos de datos y aplicaciones (finanzas, análisis de datos, CRM)"
    ],
    vocabulario: [
      { t: "CPU", d: "Unidad central de procesamiento: ejecuta las instrucciones de un programa." },
      { t: "ALU", d: "Unidad aritmético-lógica: realiza las operaciones matemáticas y lógicas." },
      { t: "Mnemónico", d: "Abreviatura que representa una instrucción en lenguaje ensamblador." }
    ],
    explora: {
      tiempo: "~5 min",
      texto: [],
      instrucciones: ["Lee la introducción y los contenidos de la temática.", "Cuando estés listo, pasa a Simula."]
    },
    // Sin simulación por ahora: el paso muestra un espacio reservado.
    practica: {
      tiempo: "~5 min",
      instrucciones: ["Relaciona cada elemento con su función."],
      pista: "Piensa en el trabajo que hace cada parte de la CPU.",
      actividades: [
        {
          tipo: "relacionar",
          titulo: "Relaciona cada elemento con su función",
          pares: [
            ["ALU", "Realiza operaciones aritméticas y lógicas"],
            ["Unidad de control", "Dirige la ejecución de las instrucciones"],
            ["Registro", "Memoria muy rápida dentro de la CPU"],
            ["Ensamblador", "Lenguaje de bajo nivel con mnemónicos, propio de cada arquitectura"]
          ]
        }
      ]
    },
    reta: {
      tiempo: "~5 min",
      titulo: "Reta: explorador de la CPU",
      historia: "Viajas por la historia de los computadores. Demuestra que reconoces cada etapa y cada parte de la CPU.",
      instrucciones: ["Responde las 3 preguntas.", "Necesitas al menos 2 aciertos."],
      pista: "Piensa en el trabajo de cada componente y en la tecnología de cada época.",
      minimo: 2,
      insignia: "Explorador de la CPU",
      preguntas: [
        { p: "¿Qué componente de la CPU realiza las operaciones aritméticas y lógicas?", opciones: ["La ALU", "La unidad de control", "El reloj"], correcta: 0, explicacion: "La unidad aritmético-lógica (ALU) calcula; la unidad de control coordina." },
        { p: "¿Qué tecnología usaban los primeros computadores como el ENIAC y el UNIVAC?", opciones: ["Tubos de vacío", "Transistores", "Microprocesadores"], correcta: 0, explicacion: "Los transistores y los circuitos integrados llegaron después." },
        { p: "El lenguaje ensamblador se caracteriza por...", opciones: ["Usar mnemónicos y ser específico de cada arquitectura", "Ser igual en todos los procesadores", "Ser un lenguaje de alto nivel"], correcta: 0, explicacion: "Es de bajo nivel y está muy cerca del lenguaje de máquina." }
      ]
    }
  },

  /* ============ 6. COMPUERTAS LÓGICAS ============ */
  {
    id: "compuertas-logicas",
    grados: [9],
    tema: "Electrónica digital",
    titulo: "Compuertas lógicas",
    objetivo: "Identificar las siete compuertas lógicas, predecir su salida a partir de las entradas y reproducir su lógica con funciones de Excel.",
    introduccion: [
    "Los computadores y el Arduino toman decisiones con electricidad. Para eso usan compuertas lógicas: circuitos que reciben entradas de 1 (encendido, voltaje alto) o 0 (apagado, voltaje bajo) y entregan una salida que depende solo de esas entradas. A ese tipo de circuitos se les llama lógica combinacional, y su matemática es el álgebra booleana.",
    "Conocerás siete compuertas: AND, OR, NOT, NAND, NOR, XOR y XNOR. Cada una se describe con su símbolo y su tabla de verdad, que muestra qué salida da cada combinación de entradas. Un ejemplo de tu dispensador: sirve la comida SOLO SI es la hora Y hay comida en la tolva, y eso es una compuerta AND. Verás también que NAND y NOR son universales: con una sola de ellas se puede construir cualquier otra. Al final reproducirás esta lógica en Excel con las funciones Y, O y NO."
  ],
    subtemas: [
      "Lógica combinacional: definición y ejemplos",
      "Compuertas lógicas: concepto, estados binarios (0/1), álgebra booleana y aplicaciones",
      "Las 7 compuertas: AND, OR, NOT, NAND, NOR, XOR y XNOR (símbolo, tabla de verdad y funcionamiento)",
      "Compuertas universales (NAND y NOR)",
      "Programación en Excel: celdas como variables, operadores aritméticos, de comparación, funciones lógicas (Y, O, NO), jerarquía de operaciones y errores comunes"
    ],
    vocabulario: [
      { t: "Bit", d: "Unidad mínima de información: vale 0 o 1." },
      { t: "Compuerta lógica", d: "Circuito que decide una salida según sus entradas." },
      { t: "Tabla de verdad", d: "Lista de todas las entradas posibles y su salida." },
      { t: "Compuerta universal", d: "NAND o NOR: con una sola de ellas se puede construir cualquier otra compuerta." }
    ],
    explora: {
      tiempo: "~5 min",
      texto: [
        "La lógica combinacional estudia circuitos cuya salida depende solo de las entradas del momento, sin memoria. Un ejemplo es una alarma que suena según el estado de dos sensores.",
        "Una compuerta lógica recibe una o dos entradas con dos estados posibles, 1 (encendido) y 0 (apagado), y entrega una salida según una regla. El álgebra booleana es la matemática que describe esas reglas.",
        "Las siete compuertas son: AND (1 solo si todas las entradas son 1), OR (1 si al menos una es 1), NOT (invierte la entrada), NAND (el opuesto de AND), NOR (el opuesto de OR), XOR (1 si las entradas son diferentes) y XNOR (1 si son iguales).",
        "NAND y NOR son compuertas universales: con una sola de ellas se puede construir cualquier otra.",
        "En Excel puedes practicar esta lógica: las celdas funcionan como variables y las funciones Y, O y NO reproducen AND, OR y NOT."
      ],
      instrucciones: ["Lee las ideas.", "Fíjate en la regla de cada compuerta.", "Cuando estés listo, pasa a Simula."]
    },
    simulacion: {
      id: "compuertas",
      nombre: "Simulador de compuertas",
      descripcion: "Cambia las entradas y mira cómo responde cada una de las siete compuertas.",
      tiempo: "~10 min",
      instrucciones: [
        "Elige una compuerta.",
        "Activa o desactiva los interruptores A y B.",
        "Observa el LED y la fila resaltada de la tabla de verdad."
      ],
      pista: "Si la salida te sorprende, vuelve a Explora y revisa la regla de esa compuerta.",
      observar: "¿Con qué combinación de A y B se enciende el LED en AND? ¿Y en XNOR?"
    },
    practica: {
      tiempo: "~10 min",
      instrucciones: ["Resuelve las actividades en cualquier orden.", "Cuando todas estén correctas, el paso se completa."],
      pista: "Puedes volver a la simulación para comprobar una respuesta.",
      actividades: [
        {
          tipo: "relacionar",
          titulo: "Relaciona cada compuerta con su regla",
          pares: [
            ["AND", "Salida 1 solo si todas las entradas son 1"],
            ["OR", "Salida 1 si al menos una entrada es 1"],
            ["NOT", "Invierte el valor de la entrada"],
            ["NAND", "Es el opuesto de AND: solo da 0 si todas las entradas son 1"],
            ["NOR", "Es el opuesto de OR: solo da 1 si todas las entradas son 0"],
            ["XOR", "Salida 1 si las entradas son diferentes"],
            ["XNOR", "Salida 1 si las entradas son iguales"]
          ]
        },
        {
          tipo: "clasificar",
          titulo: "¿La salida es 1 o es 0?",
          categorias: ["Salida 1", "Salida 0"],
          items: [
            { t: "AND con A=1, B=1", c: 0 },
            { t: "AND con A=1, B=0", c: 1 },
            { t: "OR con A=0, B=1", c: 0 },
            { t: "NOT con A=1", c: 1 },
            { t: "XOR con A=1, B=1", c: 1 },
            { t: "NOR con A=0, B=0", c: 0 },
            { t: "NAND con A=1, B=1", c: 1 },
            { t: "XNOR con A=1, B=1", c: 0 }
          ]
        }
      ]
    },
    reta: {
      tiempo: "~5 min",
      titulo: "Reta: elige la compuerta correcta",
      historia: "Eres el ingeniero de un sistema de seguridad. Para cada situación, escoge la solución correcta.",
      instrucciones: ["Responde las 5 preguntas.", "Necesitas al menos 3 aciertos para ganar la insignia."],
      pista: "Piensa en la regla de cada compuerta y en cuántas entradas deben activarse.",
      minimo: 3,
      insignia: "Maestro de compuertas",
      preguntas: [
        { p: "La alarma debe sonar si el sensor de la puerta (A) O el de la ventana (B) detecta movimiento. ¿Qué compuerta usas?", opciones: ["AND", "OR", "NOT"], correcta: 1, explicacion: "OR da 1 cuando al menos una entrada vale 1." },
        { p: "Una máquina solo debe arrancar si el operario presiona los DOS botones a la vez. ¿Qué compuerta usas?", opciones: ["OR", "XOR", "AND"], correcta: 2, explicacion: "AND exige que todas las entradas sean 1." },
        { p: "¿Cuál es la salida de una compuerta NAND con A=1 y B=1?", opciones: ["0", "1", "Depende del voltaje"], correcta: 0, explicacion: "NAND es el opuesto de AND: AND da 1, entonces NAND da 0." },
        { p: "¿Qué compuertas se llaman universales?", opciones: ["AND y OR", "NAND y NOR", "XOR y XNOR"], correcta: 1, explicacion: "Con solo NAND, o solo NOR, se puede construir cualquier otra compuerta." },
        { p: "En Excel, ¿qué función devuelve VERDADERO solo si todas las condiciones son verdaderas?", opciones: ["Y", "O", "NO"], correcta: 0, explicacion: "La función Y equivale a la compuerta AND." }
      ]
    }
  }

];
