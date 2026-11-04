# Plataforma de simulaciones y actividades didácticas

Web estática (HTML + CSS + JavaScript, sin librerías) pensada para equipos y conexiones lentas.

## Cómo probarla
Abre `index.html` con doble clic. Funciona sin servidor. El progreso se guarda en el navegador de cada estudiante.

## Dónde se llena el contenido
**Todo el contenido está en `js/datos.js`.**

- `PROYECTO`: nombre, frase, colegio, tu nombre, enlaces a las encuestas.
- `UNIDADES`: una por tema. Copia una unidad completa, cambia el `id` (debe ser único), el `grado`, los textos y listo.

Cada unidad tiene los 4 pasos: `explora`, `simulacion`, `practica` y `reta`.

### Actividades disponibles en `practica.actividades`
| tipo | Qué es |
|---|---|
| `relacionar` | Pares concepto ↔ definición |
| `ordenar` | Pasos que el estudiante acomoda (escríbelos en el orden correcto) |
| `clasificar` | Elementos que se llevan a categorías |
| `quiz` | Preguntas de opción múltiple con explicación |

### Simulaciones
Las simulaciones están en `js/simulaciones.js`. Incluye `compuertas` y `binario`.
Para crear otra, agrega `SIMULACIONES.miSim = { montar(contenedor, ctx) { ... } }` y llama `ctx.interaccion()` cada vez que el estudiante haga algo. Luego úsala en `datos.js` con `simulacion: { id: "miSim", ... }`.

## Cómo publicarla gratis
1. Crea un repositorio en GitHub y sube todos estos archivos.
2. En el repositorio: Settings → Pages → rama `main`, carpeta raíz.
3. GitHub te da una dirección (https). Esa es la web.

Con https la web también queda guardada en el dispositivo y funciona sin conexión después de la primera carga. Si cambias archivos, sube el número de `CACHE` en `sw.js` (por ejemplo `proyecto-v2`) para que los estudiantes reciban la versión nueva.

## Estructura
```
index.html        Inicio
unidad.html       Plantilla de unidad (se llena con datos.js)
css/styles.css    Colores y estilos (variables al inicio)
js/datos.js       ← AQUÍ SE LLENA EL CONTENIDO
js/comun.js       Utilidades y progreso
js/app.js         Lógica del inicio
js/unidad.js      Lógica de la unidad
js/actividades.js Relacionar, ordenar, clasificar, quiz
js/simulaciones.js Simulaciones
sw.js             Uso sin conexión
```
