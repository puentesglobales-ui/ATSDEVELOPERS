# 🛡️ ESTRATEGIA DE ENTORNOS: PRODUCCIÓN vs DESARROLLO

Para evitar que los experimentos rompan la experiencia de los clientes pagos, implementaremos una separación estricta de entornos.

---

## 1. CONTROL DE CÓDIGO (GIT) 🐙

Usaremos el modelo **Git Flow** simplificado:

1.  **🔴 Rama `main` (PRODUCCIÓN)**
    *   **Estado:** Sagrado. Código estable y probado.
    *   **Quién la toca:** Solo el Tech Lead o Gabriel (vía Pull Request).
    *   **Despliegue:** Automático a la URL pública oficial.

2.  **🟡 Rama `develop` (DESARROLLO)**
    *   **Estado:** Beta constante. Aquí viven las nuevas funciones (Router, Roleplay V2, etc.) mientras se prueban.
    *   **Quién la toca:** Todo el equipo de desarrollo.
    *   **Despliegue:** Automático a un servidor de pruebas (QA).

3.  **🟢 Ramas `feat/*` (FUNCIONALIDADES)**
    *   Ejemplo: `feat/universal-router`, `feat/mejora-ui-login`.
    *   Nacen de `develop` y mueren al fusionarse (merge) de vuelta a `develop`.

---

## 2. INFRAESTRUCTURA (SERVIDORES) ☁️

Configuraremos **Vercel** y **Render** para detectar qué rama se está actualizando y actuar acorde.

| Característica | 🏭 ENT. PRODUCCIÓN (PROD) | 🧪 ENT. DESARROLLO (DEV) |
| :--- | :--- | :--- |
| **Rama Git** | `main` | `develop` |
| **URL Frontend** | `ats-career-client.vercel.app` | `ats-client-dev.vercel.app` |
| **URL Backend** | `api-career.onrender.com` | `api-career-dev.onrender.com` |
| **Base de Datos** | **Supabase PROD** (Datos Reales) | **Supabase DEV** (Datos Falsos) |
| **Logs** | Solo Errores Críticos | Verbose (Todo el detalle) |

---

## 3. VARIABLES DE ENTORNO (.ENV) 🔑

El código "pregunta" dónde está y se comporta diferente. Esto se configura en el panel de Vercel/Render:

### Para Producción:
```env
NODE_ENV=production
VITE_API_URL=https://api-career.onrender.com
SUPABASE_URL=https://prod.supabase.co
# Claves reales de pago (Stripe Live)
```

### Para Desarrollo:
```env
NODE_ENV=development
VITE_API_URL=https://api-career-dev.onrender.com
SUPABASE_URL=https://dev.supabase.co
# Claves de prueba (Stripe Test)
```

---

## 4. RITUAL DE PASO A PRODUCCIÓN (DEPLOY) 🚀

1.  **Desarrollo:** El dev termina el `UniversalRouter`. Lo sube a la rama `develop`.
2.  **QA (Tú/Equipo):** Entran a la URL de Desarrollo (`ats-client-dev...`) y prueban que Alex responda bien y haga el cambio de cerebro.
3.  **Aprobación:** Si el test pasa, Gabriel da la orden: *"Merge to Main"*.
4.  **Release:** GitHub fusiona `develop` -> `main`. Vercel detecta el cambio en `main` y actualiza la web oficial automáticamente.

---

### ✅ TAREA INMEDIATA PARA EL EQUIPO:
1.  Crear la rama `develop` en GitHub.
2.  Clonar el proyecto de Supabase actual a uno nuevo llamado `ATS_DEV_DB`.
3.  Configurar las variables de entorno en Vercel para apuntar a la nueva rama y la nueva DB.
