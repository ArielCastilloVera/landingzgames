# ZGames Handoff

## Estado actual

- Proyecto base Astro 7.3.3 con una sola página inicial.
- Primer bloque implementado con arquitectura modular.
- Portafolio integrado dentro de la landing.
- Formulario demo local sin persistencia.
- `gentle-ai` instalado globalmente para Codex y en el workspace.

## Fuentes

- Línea gráfica: `/Users/zgames/Downloads/ZGAMES LINEA (1) (1).pdf`.
- Ecosistema: `/Users/zgames/Downloads/Propuesta_2_Ecosistema_Conectado_Final-2.pdf`.
- Requisitos: `/Users/zgames/Downloads/Documento_Tecnico_Funcional_ZGames.pdf`.
- Referencia: `/Users/zgames/Downloads/ZGAMES_landing_propuesta.html`.

## Arquitectura

- `src/data/site.ts` concentra el contenido.
- `src/components/ui` contiene piezas transversales.
- `src/components/cards` contiene tarjetas reutilizables.
- `src/components/sections` contiene secciones.
- `src/components/layout` contiene header y footer.
- `src/styles/global.css` contiene tokens, estilos y responsive.

## Decisiones y límite

- Se evita duplicar contenido y SVG de iconos.
- Los visuales actuales son composiciones CSS provisionales; todavía falta exportar assets finales del PDF.
- Este bloque modifica 18 archivos de aplicación/documentación, por debajo del límite de 19.
- Los archivos `.codex` generados por `gentle-ai` son configuración administrada por la herramienta.

## Próximo bloque

- Ejecutar build y revisar errores Astro/TypeScript.
- Iniciar `astro dev --background` y revisar desktop/mobile.
- Añadir tipografías, logo e imágenes oficiales.
- Comparar visualmente contra el PDF y la propuesta HTML.

## Protocolo de errores

Si un patch falla, no se apila otro encima: se inspecciona el estado, se vuelve al estado previo al intento y se aplica una solución independiente.
