# 🏗️ ARQUITECTURA DE IA "TIER 1": ROUTER & BACKUPS
**Versión:** 1.0 (Developers)
**Estado:** En Desarrollo (Paralelo a Producción)

Este documento define la asignación de modelos de Inteligencia Artificial para cada producto de **Puentes Globales**, estableciendo titulares, suplentes (backups) y la lógica de activación.

---

## 1. 🧠 MATRIZ DE ASIGNACIÓN DE CEREBROS

### A. ALEX (Gestión de Negocio & Ventas)
Este agente requiere velocidad para consultas simples y profundidad para reportes.
*   **🏎️ TITULAR: Gemini 1.5 Flash**
    *   **Misión:** Consultas operativas rápidas ("¿Cuánto vendí hoy?", "¿Queda stock de X?").
    *   **Por qué:** Latencia mínima, costo casi nulo para alto volumen.
*   **🛡️ BACKUP / ESPECIALISTA: Gemini 1.5 Pro**
    *   **Activación:**
        1.  **Fallo:** Si Flash no responde en 3000ms.
        2.  **Complejidad:** Si el prompt contiene palabras clave: *estrategia, proyección, análisis, balance, inversión*.
    *   **Misión:** Razonamiento complejo sobre datos históricos.

### B. TALKME (Language Learning)
Este agente requiere fluidez conversacional humana y precisión gramatical académica.
*   **🏎️ TITULAR: Gemini 1.5 Flash (Optimizado para Chat)**
    *   **Misión:** Conversación fluida, corrección en tiempo real (Roleplay de mesero, taxi, cita).
    *   **Por qué:** La conversación no puede tener "lag" (retraso).
*   **🛡️ BACKUP / PROFESOR: DeepSeek-V3**
    *   **Activación:**
        1.  **Fallo:** API de Google caída.
        2.  **Solicitud Explícita:** Cuando el usuario pide "¿Por qué se usa el subjuntivo aquí?".
    *   **Misión:** Explicaciones gramaticales profundas y estructuradas.

### C. ROLEPLAY (Entrevistas Laborales)
Este agente requiere una ventana de contexto amplia (memoria) y un tono profesional/severo.
*   **🏎️ TITULAR: Gemini 1.5 Pro**
    *   **Misión:** Simular al reclutador. Recordar detalles del CV mencionado 10 turnos atrás.
    *   **Por qué:** Superior manejo de contexto (1M tokens) para recordar toda la entrevista.
*   **🛡️ BACKUP: GPT-4o (OpenAI)**
    *   **Activación:**
        1.  **Emergencia:** Si Google Cloud presenta latencia > 5000ms.
    *   **Misión:** Mantener la ilusión de la entrevista sin cortes.

---

## 2. ⚡ PATRÓN DE "CIRCUIT BREAKER" (EL ROUTER)

El código implementa una lógica de `try...catch` con timeout.

1.  **Intento Primario:** Se envía la solicitud al Modelo Titular con un `timeout` definido (ej. 4 segundos).
2.  **Detección de Fallo:**
    *   Error 500/503 del proveedor.
    *   Timeout (el modelo tardó demasiado).
3.  **Switch Automático:** El sistema captura el error y redirige *inmediatamente* la solicitud al Modelo Backup.
4.  **Log:** Se registra el evento para auditoría ("Alex usó Backup Pro por Timeout").

---

## 3. 👁️👂🗣️ SISTEMA SENSORIAL (MULTIMODAL)

| Función | Herramienta Principal | Herramienta Backup (Premium) |
| :--- | :--- | :--- |
| **Escuchar (STT)** | Google Speech-to-Text | OpenAI Whisper |
| **Hablar (TTS)** | Google Cloud Neural2 | ElevenLabs (Solo usuarios pagos) |
| **Ver (Vision)** | Gemini 1.5 Flash Vision | GPT-4o Vision |

---

## 4. RESPONSABLES TÉCNICOS

*   **Arquitecto:** Antigravity (IA).
*   **Supervisor Humano:** Gabriel.
*   **Infraestructura:** Supabase (Logs y Auth) + Servidor Node.js.

---
*Este documento es la fuente de la verdad para la implementación del archivo `UniversalRouter.js`.*
