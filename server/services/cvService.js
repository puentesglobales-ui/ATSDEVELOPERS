const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

// Ensure the API Key is correctly sanitized
const cleanKey = (k) => (k || "").trim().replace(/[\r\n\t]/g, '').replace(/\s/g, '').replace(/["']/g, '');
const GENAI_API_KEY = cleanKey(process.env.GEMINI_API_KEY);

const genAI = new GoogleGenerativeAI(GENAI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
});

const cvService = {
    // PASO 1: Generar el contenido redactado profesionalmente
    async generateContent(userData) {
        const prompt = `
            Identidad: Experto en Recruiting para mercado ${userData.market || 'Global'}.
            Tarea: Transforma la experiencia bruta en logros con métricas (Metodología STAR).
            Input: ${JSON.stringify(userData.rawData || userData)}
            Restricciones: Output JSON puro con campos: 
            personal: {name, email, summary}, 
            experience: [ {role, company, date, achievements: []} ], 
            education: [ {degree, school, date} ],
            skills: [] (array de strings).
        `;
        const result = await model.generateContent(prompt);
        return JSON.parse(result.response.text());
    },

    // PASO 2: Generar los Design Tokens (El "look & feel")
    async generateDesignTokens(market, industry) {
        const prompt = `
            Genera tokens de diseño para un CV profesional de la industria ${industry} en el mercado ${market}.
            Define: 
            - primaryColor (hex), 
            - fontPairing (Serif o Sans), 
            - spacing (compact o relaxed), 
            - layout (single-column o two-column).
            Output JSON: { "color": "#hex", "font": "string", "spacing": "string", "layout": "string" }
        `;
        const result = await model.generateContent(prompt);
        return JSON.parse(result.response.text());
    }
};

module.exports = cvService;
