# Plataforma web – Tecnología e Informática

Sitio estático (HTML, CSS y JavaScript sin librerías), pensado para equipos y conexiones lentas.
Todo el contenido se edita en **`js/datos.js`**; los demás archivos no hay que tocarlos.

## Dónde escribir tus textos (espacios libres)

Mientras un campo esté vacío (`""` o `[]`), la página muestra un recuadro punteado como recordatorio.

| Qué | Campo en `js/datos.js` | Dónde se ve |
|---|---|---|
| Introducción general de las temáticas | `PROYECTO.introGeneral` | Inicio, sección "Temáticas" |
| Resumen corto de cada temática | `resumen` de la unidad | Tarjetas de la portada |
| Introducción de cada temática | `introduccion` de la unidad | Paso Explora (panel "Introducción") |
| Contenido del paso Explora | `explora.texto` | Paso Explora |
| Competencias de cada guía | `competencias` de la unidad (lista de textos) | Botón desplegable "Objetivos y competencias" de la unidad |

Cada uno acepta un texto (`"..."`) o varios párrafos (`["párrafo 1", "párrafo 2"]`).

## Otros campos de cada unidad

- `grados: [9]` → grados en los que aparece (provisional; cámbialo, p. ej. `[8, 9]`).
- `subtemas` → lista de contenidos (los puntos de tu asesora).
- `simulacion` → motor propio (`id: "compuertas"`, `"binario"`) o herramienta externa (`id: "externa"` con `externa: {texto, url}`). Si no existe, se muestra un espacio reservado.
- `practica.actividades` → tipos: `relacionar`, `ordenar`, `clasificar`, `quiz`.
- `reta` → preguntas, `minimo` para aprobar e `insignia`.

## Publicar cambios

Reemplaza los archivos en GitHub (Add file → Upload files). Si los estudiantes siguen viendo la versión anterior, sube el número de `CACHE` en `sw.js` (ahora `proyecto-v2`).
