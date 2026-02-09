# 🏛️ PLAN MAESTRO: CONSOLIDACIÓN Y REFORMA SaaS (Tier 1)

Este es el documento estratégico final para unificar **Alex, TalkMe y Roleplay** bajo una arquitectura empresarial robusta, rentable y escalable.

---

## 🏗️ PILAR 1: ARQUITECTURA "TIER 1" (La Reforma)

### A. El Cerebro Central (Universal Router)
Dejamos de usar scripts sueltos. Todo pasa por el **Router Universal** que ya está en `ATSDEVELOPERS`.
*   **Lógica:** Circuit Breaker (Si falla Flash -> Salta Pro -> Salta OpenAI).
*   **Beneficio:** 100% Uptime. Si Google se cae, tu negocio sigue operando con OpenAI automáticamente.

### B. Segregación de Entornos (Sanidad Mental)
*   **`main` (Producción):** Sagrado. Solo entra código probado. Los clientes nunca ven errores.
*   **`develop` (Laboratorio):** Donde el equipo rompe y arregla.
*   **Acción:** Tu equipo debe clonar `ATSDEVELOPERS` y usar la rama `develop` desde hoy.

---

## 🚀 PILAR 2: FINALIZACIÓN DE PRODUCTOS (La Conclusión)

### 1. TALKME (Idiomas)
*   **Estado:** Funcional pero básico.
*   **Reforma:** Integrar el Router para que:
    *   **Modo Chat:** Use **Gemini Flash** (rápido, corrige al vuelo).
    *   **Modo Profesor:** Si el usuario pregunta "¿Por qué?", use **DeepSeek/Pro** para explicar gramática.
*   **Meta:** Latencia < 500ms en voz.

### 2. ALEX (Asistente de Negocio)
*   **Estado:** Necesita conexión real a datos.
*   **Reforma:**
    *   Conectar a **Supabase** para leer stock/ventas reales.
    *   Usar **Gemini Pro** solo cuando se pidan reportes complejos.
*   **Meta:** Que responda preguntas de inventario en < 1 segundo.

### 3. ROLEPLAY (Entrevistas)
*   **Estado:** MVP Validado (Psychometric Test añadido).
*   **Reforma:**
    *   Activar el "Modo Hostil" con **Gemini Pro**.
    *   Implementar **Whisper (OpenAI)** como backup de escucha si Google falla.
*   **Meta:** Que el usuario sienta "miedo" real en la entrevista (inmersión total).

---

## 💰 PILAR 3: ESTRATEGIA DE NEGOCIO (El Dinero)

### Modelo Freemium Unificado
No más logins separados. Un solo "Passport" (Supabase Auth) para todo.

| Nivel | TalkMe | Alex | Roleplay | Precio |
| :--- | :--- | :--- | :--- | :--- |
| **FREE** | 5 mins/día | Chat Básico | 1 Entrevista/mes | **$0** |
| **PRO** | Ilimitado | Reportes PDF | Ilimitado + Feedback | **$9.99** |
| **CORP** | Dashboard HR | API Access | Marca Blanca | **Contactar** |

### 4. ETIQUETADO DE IA (El Cerebro Maestro)
*   **Estado:** En Construcción (Prioridad Alta).
*   **Reforma:**
    *   **Backend:** Implementar `ProgrammingRouter.js` (Gemini Flash <-> GPT-o3/Claude/DeepSeek).
    *   **Frontend (Cerebro Visual):** Dashboard profesional (React + Tailwind + ShadCN) donde Gabriel interactúa por voz/texto y ve qué IA resuelve la tarea.
    *   **Función:** Asignar tareas complejas de programación y arquitectura automáticamente.
*   **Meta:** Reducir tiempos de desarrollo usando 3 Cerebros Expertos en simultáneo.

---

## 📅 HOJA DE RUTA (EJECUCIÓN INMEDIATA)

### FASE 0: El Cerebro (HOY)
1.  [x] Definir `ProgrammingRouter.js`. (HECHO)
2.  [ ] **Construir el "Cerebro Visual" (Web de Control) para Etiquetado.** (EN PROCESO)
    *   Stack: Vite + React + Tailwind (Estilo Stitch/V0).
    *   Conexión: Voz (Gemini Flash) -> Texto -> Router.
3.  [ ] Desplegar en Render/Vercel.

### FASE 1: Infraestructura (El Equipo)
1.  [x] Crear Repositorio `ATSDEVELOPERS` y rama `develop`. (HECHO)
2.  [ ] Desplegar `ATSDEVELOPERS` en **Render (Backend)** y **Vercel (Frontend)** apuntando a `develop`.
3.  [ ] Probar el `UniversalRouter` endpoint `/test` para validar el cambio automático de IAs.

### SEMANA 2: Integración (Los Productos)
1.  [ ] Migrar el cerebro de **TalkMe** para usar el Router.
2.  [ ] Conectar **Alex** a la base de datos de demo de Supabase.
3.  [ ] Finalizar UI del **Roleplay** (Psychometric Test integrado).

### SEMANA 3: Lanzamiento (El Dinero)
1.  [ ] Activar Pasarela de Pagos (Stripe/MercadoPago).
2.  [ ] Fusionar `develop` -> `main` (Paso a Producción).
3.  [ ] **LANZAMIENTO OFICIAL.**

---

**Firma:** 
*Gabriel (CEO)* & *Antigravity (Lead Architect)*
