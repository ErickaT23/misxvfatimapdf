# Base Invitacion PDF

Este proyecto puede usarse como plantilla para futuras invitaciones digitales con PDF por cantidad de pases.

## Archivos base

- `index.html`: pagina principal de la invitacion.
- `viewer.html`: visor web del PDF sin descarga directa por enlace.
- `_headers`: evita cache en Cloudflare Pages.
- `1.pdf` a `5.pdf`: PDFs por cantidad de pases.
- `fondoverde.jpg`: fondo general.
- `flordeloto.jpg`: imagen decorativa.

## Elementos que no se deben cambiar si se quiere conservar la logica

- ID `verInvitacion`
- ID `confirmarAsistencia`
- ID `textoPases`
- La logica de `?pases=`
- El mapeo de PDFs `1.pdf` a `5.pdf`
- La estructura de `viewer.html`
- El archivo `_headers`

## Que si se cambia en cada cliente

- Nombre de la quinceanera
- Fecha
- Texto principal
- Numero de WhatsApp
- PDFs `1.pdf` a `5.pdf`
- Imagen de fondo
- Imagen decorativa
- Colores y tipografias

## Como funciona

- `?pases=1` abre `1.pdf`
- `?pases=2` abre `2.pdf`
- `?pases=3` abre `3.pdf`
- `?pases=4` abre `4.pdf`
- `?pases=5` abre `5.pdf`

Tambien:

- cambia el texto de pases mostrado en pantalla
- cambia el mensaje dinamico de WhatsApp
- abre el PDF dentro de `viewer.html`

## Cache y Cloudflare Pages

Este proyecto ya incluye `_headers` para evitar cache en:

- `/index.html`
- `/viewer.html`
- `/*.pdf`

Si se reemplazan PDFs con el mismo nombre, debe hacerse nuevo deploy para que Cloudflare sirva la version actual.

## Recomendacion de uso

No trabajar este proyecto como pieza unica cada vez.
Usar esta carpeta como base maestra.
Para una nueva invitacion, duplicar toda la carpeta y luego adaptar el contenido.
