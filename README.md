# Cajero automático

<!-- Completa cada sección. Borra los comentarios como este cuando termines. -->

## Por qué JavaScript

<!-- Justifica en un párrafo por qué este proyecto se hace en JavaScript y no en TypeScript o con
     WebAssembly. Usa al menos dos criterios del tema 1 y relaciónalos con este proyecto concreto.
     Añade en qué situación cambiarías de lenguaje. -->

## Cómo ejecutarlo

<!-- Comandos exactos para instalar, ejecutar en Node.js, revisar con ESLint y comprobar el formato,
     y cómo verlo en el navegador. -->

## Decisiones de diseño

<!-- Una fila por cada variable o constante importante (al menos seis, de cajero.js y de main.js).
     - Declaración: const o let.
     - Ámbito: módulo, función o bloque (di cuál: el for, el case 'retirar'…).
     - Por qué: por qué esa declaración y ese ámbito. -->

| Nombre | Fichero | Declaración | Ámbito | Por qué |
|--------|---------|-------------|--------|---------|
| | | | | |

## Conversiones y validación

<!-- Explica paso a paso qué hace validarImporte con cada una de estas entradas y qué devuelve:
     ' 100,50 ', '', 'cien', '-20', '  40 '. Explica por qué el texto vacío se comprueba aparte
     y por qué no usas parseFloat. -->

## Pruebas realizadas

<!-- 1. Pega la salida de `npm test` (los tests están en js/cajero.test.js).
     2. Completa la tabla: qué casos límite prueba cada función y por qué los elegiste.
     3. Describe la prueba de la sesión sin `salir` que alcanza MAX_OPERACIONES:
        qué datos usaste y qué mostró el programa. -->

| Función | Casos límite que pruebo | Por qué |
|---------|-------------------------|---------|
| `validarImporte` | | |
| `esRetirable` | | |
| `calcularComision` | | |
| `desglosarBilletes` | | |

## Herramientas

<!-- 1. Pega la salida de `npm run lint` y de `npm run format:check` al terminar.
     2. Cuenta un problema que encontraste mientras programabas y cómo lo resolviste con el depurador,
        la consola o ESLint (qué viste y qué cambiaste). -->

## Integración continua (opcional)

<!-- Solo si has hecho el apartado opcional de integración continua del enunciado; si no, borra esta sección.
     1. Enlace a una ejecución en verde de la pestaña Actions de tu repositorio.
     2. Captura de esa ejecución con sus pasos: guárdala en img/ y enlázala aquí.
     3. Captura de una ejecución en rojo provocada a propósito, y qué cambiaste para provocarla. -->
