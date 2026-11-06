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
  grados: [6, 7, 8, 9, 10, 11],   // grados que se muestran en la portada
  gradoPiloto: 9,                  // grado seleccionado al abrir la página
  historiaRetos: "Cada unidad termina con una misión. Si la superas, ganas una insignia y subes de nivel.",

  // ---- ESPACIO LIBRE: introducción general a las temáticas ----
  // Escribe entre las comillas. Para varios párrafos usa una lista:
  //   introGeneral: ["Primer párrafo.", "Segundo párrafo."],
  tituloTematicas: "Temáticas del proyecto",
  introGeneral: "",

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
                    id "compuertas" o "binario" = simulación propia de la web.
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
    introduccion: "",
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
    introduccion: "",
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
      id: "externa",
      nombre: "Circuitos en Tinkercad",
      descripcion: "Arma y simula un circuito con Arduino, un LDR y un LED.",
      tiempo: "~10 min",
      externa: { texto: "Abrir Tinkercad", url: "https://www.tinkercad.com/" },
      instrucciones: ["Abre Tinkercad y entra a la sección de circuitos.", "Arma un circuito con un LDR y un LED, y pulsa Iniciar simulación.", "Cambia la luz sobre el LDR y observa cómo responde el circuito.", "Vuelve aquí y marca el paso como completado."],
      pista: "El LDR necesita una resistencia en serie para formar un divisor de voltaje.",
      observar: "¿Qué pasa con la resistencia del LDR cuando aumenta la luz?"
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
    introduccion: "",
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
      id: "externa",
      nombre: "Actuadores con Arduino en Tinkercad",
      descripcion: "Simula un servomotor controlado por Arduino y cambia su movimiento desde el código.",
      tiempo: "~10 min",
      externa: { texto: "Abrir Tinkercad", url: "https://www.tinkercad.com/" },
      instrucciones: ["Abre Tinkercad y entra a la sección de circuitos.", "Conecta un servomotor a un Arduino y cambia el ángulo en el código.", "Vuelve aquí y marca el paso como completado."],
      pista: "Prueba distintos ángulos y tiempos para ver cómo cambia el movimiento.",
      observar: "¿Qué cambia en el movimiento si modificas el tiempo de activación?"
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
    introduccion: "",
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
      id: "externa",
      nombre: "Control de tiempos en Tinkercad",
      descripcion: "Programa un LED que parpadee con delay() y luego con millis().",
      tiempo: "~10 min",
      externa: { texto: "Abrir Tinkercad", url: "https://www.tinkercad.com/" },
      instrucciones: ["Abre Tinkercad y entra a la sección de circuitos.", "Programa un LED que parpadee usando delay().", "Cámbialo para que use millis() y compara.", "Vuelve aquí y marca el paso como completado."],
      pista: "Con millis() guardas el instante de la última acción y lo comparas con el tiempo actual.",
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
    introduccion: "",
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
    introduccion: "",
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
  },

  /* ============ EJEMPLO ADICIONAL: SISTEMAS DE NUMERACIÓN ============
     Unidad de ejemplo sobre el sistema binario. Puedes conservarla,
     editarla o borrarla completa (desde esta llave hasta su cierre). */
  {
    id: "binario-8",
    grados: [8],
    tema: "Sistemas de numeración",
    titulo: "Números binarios",
    objetivo: "Convertir números binarios de 4 bits a decimal usando el valor posicional.",
    introduccion: "",
    subtemas: [
      "Sistema binario: bits y valor posicional",
      "Conversión de binario a decimal"
    ],
    vocabulario: [
      { t: "Bit", d: "Cada dígito de un número binario (0 o 1)." },
      { t: "Valor posicional", d: "Lo que vale un dígito según el lugar que ocupa." },
      { t: "Decimal", d: "El sistema de 10 dígitos que usamos a diario." }
    ],
    explora: {
      tiempo: "~3 min",
      texto: [
        "El sistema binario usa solo dos dígitos: 0 y 1. Cada posición vale el doble que la de su derecha: 1, 2, 4, 8.",
        "Para pasar a decimal se suman los valores de las posiciones que están en 1. Por ejemplo, 1010 es 8 + 2 = 10."
      ],
      instrucciones: ["Lee las dos ideas.", "Prueba mentalmente con 0011."]
    },
    simulacion: {
      id: "binario",
      nombre: "Contador binario de 4 bits",
      descripcion: "Enciende y apaga bits y mira qué número decimal forman.",
      tiempo: "~10 min",
      instrucciones: ["Pulsa los bits para cambiarlos entre 0 y 1.", "Mira la suma que se forma debajo.", "Intenta formar el 9 y el 15."],
      pista: "Recuerda: cada bit vale 8, 4, 2 o 1 de izquierda a derecha.",
      observar: "¿Cuál es el número más grande que puedes formar con 4 bits?"
    },
    practica: {
      tiempo: "~10 min",
      instrucciones: ["Resuelve las dos actividades."],
      pista: "Apóyate en los valores 8, 4, 2, 1.",
      actividades: [
        {
          tipo: "relacionar",
          titulo: "Une cada binario con su decimal",
          pares: [["0101", "5"], ["0011", "3"], ["1000", "8"], ["1111", "15"]]
        },
        {
          tipo: "ordenar",
          titulo: "Ordena los pasos para convertir 0110 a decimal",
          pasos: [
            "Escribe el valor de cada posición: 8, 4, 2, 1",
            "Marca las posiciones que están en 1",
            "Suma los valores marcados (4 + 2)",
            "El resultado es 6"
          ]
        }
      ]
    },
    reta: {
      tiempo: "~5 min",
      titulo: "Reta: traduce el mensaje",
      historia: "Un robot te envía números en binario. Tradúcelos para entenderlo.",
      instrucciones: ["Responde las 3 preguntas.", "Necesitas al menos 2 aciertos."],
      pista: "Suma solo las posiciones que están en 1.",
      minimo: 2,
      insignia: "Traductor binario",
      preguntas: [
        { p: "¿Qué número decimal es 1001?", opciones: ["7", "9", "11"], correcta: 1, explicacion: "8 + 1 = 9." },
        { p: "¿Cuál es el mayor número que se puede escribir con 4 bits?", opciones: ["8", "15", "16"], correcta: 1, explicacion: "1111 = 8 + 4 + 2 + 1 = 15." },
        { p: "¿Cuánto vale 0111?", opciones: ["7", "6", "8"], correcta: 0, explicacion: "4 + 2 + 1 = 7." }
      ]
    }
  }
];
