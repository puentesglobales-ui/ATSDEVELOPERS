import { createClient } from '@supabase/supabase-js'

// Intentar cargar variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Helper global para depuración en consola del navegador
if (typeof window !== 'undefined') {
    window.checkEnv = () => {
        console.log('--- ESTADO DE VARIABLES DE ENTORNO ---');
        console.log('VITE_SUPABASE_URL:', supabaseUrl ? 'DEFINIDO (OK)' : 'FALTANTE (ERROR)');
        console.log('VITE_SUPABASE_ANON_KEY:', supabaseKey ? 'DEFINIDO (OK)' : 'FALTANTE (ERROR)');
        console.log('---------------------------------------');
        if (!supabaseUrl || !supabaseKey) {
            return "ERROR: Faltan variables. Revisa la configuración en Vercel.";
        }
        return "OK: Variables detectadas.";
    };
}

let supabase = null;

if (supabaseUrl && supabaseKey) {
    try {
        supabase = createClient(supabaseUrl, supabaseKey);
    } catch (e) {
        console.error("Error inicializando Supabase Client:", e);
    }
} else {
    console.error('CRITICAL: Faltan las llaves de Supabase. La aplicación no funcionará correctamente.');
    // No usamos alert() bloqueante, pero logueamos fuerte
}

export { supabase };
