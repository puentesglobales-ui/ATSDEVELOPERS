# 🛑 PROTOCOLO DE TRABAJO "SIN ROMPER NADA"

Este es el manual para que cualquier persona del equipo (técnica o no) pueda trabajar en el proyecto sin miedo a tumbar el servicio que usan los clientes.

---

## PASO 1: LA REGLA DE ORO 🥇
**NUNCA TRABAJES EN "PRODUCCIÓN" (La versión que ven los clientes).**

Imagina que "Producción" es el escenario de un teatro en plena función con público pagando. 
Tú no te subes al escenario a probar si el micrófono funciona mientras la obra está corriendo, ¿verdad? Lo pruebas en el **ensayo**.

Aquí es igual:
*   **ESCENARIO REAL**: `Rama Main` (Lo que ven los clientes). **PROHIBIDO TOCAR.**
*   **ENSAYO**: `Rama Develop` (Tu patio de juegos). **AQUÍ SE TRABAJA.**

---

## PASO 2: ¿CÓMO EMPIEZO A TRABAJAR? 🛠️

Cada vez que quieras agregar algo nuevo (ej: "Que Alex hable más formal"), sigue estos 3 pasos simples:

1.  **Crea tu propia copia del ensayo (Rama Nueva):**
    *   No trabajes directamente sobre el ensayo general (`develop`), haz tu propia copia temporal.
    *   Dale un nombre claro a tu copia: `mejora-alex-formal`, `nuevo-boton-pagos`.
    *   *En GitHub Desktop/Terminal:* "Create New Branch" desde `develop`.

2.  **Haz tus cambios y rompe todo lo que quieras:**
    *   En esta copia (`mejora-alex-formal`), puedes borrar archivos, probar códigos locos, instalar cosas.
    *   Si algo sale mal, no pasa nada. Nadie más lo ve. Solo tú.

3.  **Prueba que funcione EN TU MÁQUINA:**
    *   Antes de decirle a nadie que terminaste, abre la app en tu computadora (localhost) y asegúrate de que el cambio hace lo que querías.

---

## PASO 3: ¿CÓMO MUESTRO MI TRABAJO? (EL "PULL REQUEST") 📤

Ya terminaste tu cambio en tu copia. Ahora quieres llevarlo al "Ensayo General" (`develop`) para que Gabriel y el equipo lo vean.

1.  **Sube tus cambios:** Botón "Commit" y "Push" en GitHub.
2.  **Pide permiso para mezclar (Pull Request):**
    *   Vas a GitHub y creas un "Pull Request" (Solicitud de Fusión).
    *   Dices: *"Quiero pasar mis cambios de `mejora-alex-formal` hacia `develop`"*.
3.  **Gabriel/QA revisa:**
    *   Gabriel entra, ve el código y dice: "Ok, se ve bien" o "No, esto va a fallar".
    *   Si se aprueba, se presiona el botón verde **"Merge"**.
    *   ¡Listo! Ahora tu cambio es parte oficial del "Ensayo General" (`develop`).

---

## PASO 4: EL ESTRENO (VESTIRSE DE GALA) 🚀

Solo cuando Gabriel dice: *"El ensayo (`develop`) está perfecto, vamos a lanzarlo al público"*, se hace esto:

1.  Se crea un "Pull Request" desde `develop` hacia `main`.
2.  Gabriel presiona el botón **"Merge"** hacia `main`.
3.  **AUTOMÁTICAMENTE**, el sistema (Vercel/Render) detecta el cambio en `main`, construye la nueva versión y la pone en vivo para todos los clientes del mundo.

---

## RESUMEN PARA IMPRIMIR Y PEGAR EN LA PARED 📌

1.  ¿Vas a hacer algo nuevo? -> **Crea una rama desde `develop`.**
2.  ¿Terminaste? -> **Pide un Pull Request hacia `develop`.**
3.  ¿Gabriel aprobó? -> **Se mezcla en `develop`.**
4.  ¿Todo el equipo está listo para lanzar? -> **Gabriel mezcla `develop` en `main`.**

**SI ALGUIEN TOCA `MAIN` DIRECTAMENTE, INVITA EL ALMUERZO A TODOS.** 🍕
