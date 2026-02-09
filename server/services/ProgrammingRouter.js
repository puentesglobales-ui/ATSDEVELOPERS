/**
 * -------------------------------------------------------------------------------------
 * 🧠 CEREBRO MAESTRO DE PROGRAMACIÓN & GESTIÓN DE TAREAS
 * 
 * PROPÓSITO: 
 * Este Router, en el proyecto de "Etiquetado de IA", utiliza los modelos más potentes 
 * del mercado (GPT-5 Simulated, Claude 3.5 Opus, DeepSeek V3) para tomar decisiones de 
 * alto nivel, asignar tareas complejas y optimizar código.
 * 
 * FLUJO DE TRABAJO:
 * 1. Gabriel habla con Gemini Flash 1.5 (Interfaz Rápida).
 * 2. Este Router recibe la intención.
 * 3. Asigna la tarea al experto ideal:
 *    - Arquitectura/Decisiones -> GPT-O3 (Simulando GPT-5).
 *    - Código Complejo/Refactor -> Claude 3.5 Opus.
 *    - Lógica Matemática/Algoritmos -> DeepSeek V3.
 * 4. Devuelve el plan de acción detallado para Gabriel y Antigravity.
 * -------------------------------------------------------------------------------------
 */

require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const OpenAI = require("openai");
const Anthropic = require("@anthropic-ai/sdk");

// --- CONFIGURACIÓN DE MODELOS DE ALTO RENDIMIENTO ("Los Jefes") ---
const STRATEGIC_MODELS = {
    ARCHITECT: { provider: 'OPENAI', model: 'gpt-o3-mini', role: 'Decision Maker' }, // "GPT-5" Level Reasoning
    CODER: { provider: 'ANTHROPIC', model: 'claude-3-5-sonnet-20240620', role: 'Senior Dev' }, // Best coding model
    LOGIC: { provider: 'DEEPSEEK', model: 'deepseek-chat', role: 'Algorithm Expert' }, // Cost/Performance King
    INTERFACE: { provider: 'GOOGLE', model: 'gemini-1.5-flash', role: 'Fast Interface' } // Gabriel's Voice
};

class ProgrammingRouter {
    constructor() {
        if (process.env.GEMINI_API_KEY) this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        if (process.env.OPENAI_API_KEY) this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        if (process.env.ANTHROPIC_API_KEY) this.anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
        // DeepSeek uses OpenAI SDK with custom baseURL
        if (process.env.DEEPSEEK_API_KEY) {
            this.deepseek = new OpenAI({
                baseURL: 'https://api.deepseek.com',
                apiKey: process.env.DEEPSEEK_API_KEY
            });
        }
    }

    /**
     * MÉTODOS CORE
     */

    // 1. GABRIEL HABLA (Entrada Rápida)
    async interfaceWithGabriel(userPrompt) {
        console.log("⚡ Gabriel dice:", userPrompt);
        // Gemini Flash analiza qué experto se necesita
        const analysisPrompt = `
        Analiza esta solicitud de Gabriel: "${userPrompt}".
        Decide quién es el mejor experto para resolverlo:
        - "ARCHITECT" (Si es planear, estructurar o decidir estrategia).
        - "CODER" (Si es escribir código, refactorizar o debuggear).
        - "LOGIC" (Si es matemática, optimización o lógica pura).
        Responde SOLO con la palabra clave.
        `;

        try {
            const model = this.genAI.getGenerativeModel({ model: STRATEGIC_MODELS.INTERFACE.model });
            const result = await model.generateContent(analysisPrompt);
            const expertType = result.response.text().trim().toUpperCase();

            console.log(`🤖 Gemini asignó la tarea a: ${expertType}`);
            return await this.delegateTask(expertType, userPrompt);

        } catch (error) {
            console.error("Error en Interfaz:", error);
            return "Error conectando con el cerebro central.";
        }
    }

    // 2. EL EXPERTO EJECUTA
    async delegateTask(expertType, prompt) {
        switch (expertType) {
            case 'ARCHITECT':
                return await this._callOpenAI(STRATEGIC_MODELS.ARCHITECT.model, prompt, "Eres un Arquitecto de Software Senior (GPT-5 Level). Diseña la solución.");
            case 'CODER':
                return await this._callClaude(STRATEGIC_MODELS.CODER.model, prompt, "Eres un Desarrollador Senior Experto (Claude). Escribe código limpio y robusto.");
            case 'LOGIC':
                return await this._callDeepSeek(STRATEGIC_MODELS.LOGIC.model, prompt, "Eres un Experto en Lógica y Algoritmos. Optimiza al máximo.");
            default:
                // Fallback a Flash si no está claro
                return await this._callGemini(STRATEGIC_MODELS.INTERFACE.model, prompt, "Ayuda general.");
        }
    }

    // --- ADAPTADORES DE PROVEEDORES ---

    async _callOpenAI(model, prompt, system) {
        const response = await this.openai.chat.completions.create({
            model: model,
            messages: [{ role: "system", content: system }, { role: "user", content: prompt }]
        });
        return response.choices[0].message.content;
    }

    async _callClaude(model, prompt, system) {
        const response = await this.anthropic.messages.create({
            model: model,
            max_tokens: 4096,
            system: system,
            messages: [{ role: "user", content: prompt }]
        });
        return response.content[0].text;
    }

    async _callDeepSeek(model, prompt, system) {
        const response = await this.deepseek.chat.completions.create({
            model: model,
            messages: [{ role: "system", content: system }, { role: "user", content: prompt }]
        });
        return response.choices[0].message.content;
    }

    async _callGemini(model, prompt, system) {
        const aiModel = this.genAI.getGenerativeModel({ model: model, systemInstruction: system });
        const result = await aiModel.generateContent(prompt);
        return result.response.text();
    }
}

module.exports = new ProgrammingRouter();
