# Guia de Replicacion

## Flujo recomendado

1. Duplicar esta carpeta completa.
2. Renombrar la carpeta del nuevo proyecto.
3. Reemplazar `1.pdf` a `5.pdf`.
4. Reemplazar `fondoverde.jpg` si aplica.
5. Reemplazar `flordeloto.jpg` si aplica.
6. Editar en `index.html`:
   - subtitulo
   - nombre
   - fecha
   - texto principal
   - numero de WhatsApp
7. Mantener la logica de `?pases=`.
8. Probar:
   - `?pases=1`
   - `?pases=2`
   - `?pases=3`
   - `?pases=4`
   - `?pases=5`
9. Hacer deploy en Cloudflare Pages.

## Checklist rapido

- `1.pdf` existe
- `2.pdf` existe
- `3.pdf` existe
- `4.pdf` existe
- `5.pdf` existe
- los links dentro del PDF funcionan
- el boton `Ver invitacion PDF` abre el visor
- el boton de WhatsApp abre el mensaje correcto
- el texto de pases coincide con el parametro
- no hay cache viejo en deploy

## Prompt base para reutilizar con OpenCode

Usa esta carpeta como base para una nueva invitacion PDF.

No cambies la logica de `?pases=` ni los IDs `verInvitacion`, `confirmarAsistencia` y `textoPases`.
Manten `viewer.html` como visor del PDF y conserva `_headers` para Cloudflare Pages.

Quiero adaptar esta invitacion con estos datos:

- Nombre:
- Fecha:
- Texto principal:
- Numero de WhatsApp:
- Colores deseados:
- Fondo:
- Imagen decorativa:
- PDFs del 1 al 5:

Haz los cambios visuales y de contenido sin romper la logica actual.

## Recomendacion practica

Cada vez que quieras una nueva invitacion:

1. duplicas esta carpeta
2. pegas el prompt anterior
3. me das los nuevos datos
4. adapto esa copia

Asi esta carpeta puede quedar como base maestra.
