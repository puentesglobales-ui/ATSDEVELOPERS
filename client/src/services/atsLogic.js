/**
 * ATS Logic Simulator v2.0
 * Enhanced with weighted scoring, synonym mapping, and regex-based filtering.
 */

// Diccionario de Sinónimos y Variantes
const SYNONYMS = {
    'javascript': ['js', 'es6', 'ecmascript'],
    'react': ['reactjs', 'react.js'],
    'node': ['nodejs', 'node.js'],
    'aws': ['amazon web services', 'cloud'],
    'english': ['ingles', 'inglés', 'idioma'],
    'python': ['py'],
    'sql': ['mysql', 'postgresql', 'postgres']
};

export const analyzeATS = (cvText, jobDescription) => {
    const findings = {
        score: 0,
        missing_keywords: [],
        critical_errors: [],
        found_keywords: [],
        feedback_summary: "",
        status: "pending",
        details: {
            hard_skills_match: 0,
            soft_skills_match: 0
        }
    };

    // 1. NORMALIZATION cleaning
    const cleanCV = cvText.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ");
    const cleanJD = jobDescription.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, " ");

    // Helper to check presence with synonyms
    const hasTerm = (text, term) => {
        if (text.includes(term)) return true;
        const variants = SYNONYMS[term] || [];
        return variants.some(v => text.includes(v));
    };

    // 2. EXTRACTION & WEIGHTING
    // Definimos pesos para dar más valor a lo crítico
    const CORE_TECH_STACK = ['react', 'node', 'javascript', 'python', 'java', 'sql', 'aws', 'docker', 'kubernetes', 'typescript'];
    const SOFT_SKILLS = ['liderazgo', 'leadership', 'comunicacion', 'communication', 'teamwork', 'agile', 'scrum'];

    // Extraemos keywords del JD
    const uniqueKeywords = [...new Set(cleanJD.match(/\b[a-z]{3,}\b/g) || [])];

    // Clasificamos las keywords objetivo
    const targetKeywords = uniqueKeywords.filter(w =>
        CORE_TECH_STACK.some(core => hasTerm(w, core)) ||
        SOFT_SKILLS.some(soft => hasTerm(w, soft))
    ).slice(0, 20); // Top 20 relevantes

    // 3. HARD FILTERS (KNOCK-OUT v2)
    let knockOutHit = false;

    // A. Filtro Visa/Permiso (Más inteligente: busca patrones de autorización)
    const visaRequired = cleanJD.includes('visa') || cleanJD.includes('sponsorship') || cleanJD.includes('work permit');
    const hasVisaInfo = cleanCV.includes('visa') || cleanCV.includes('permit') || cleanCV.includes('citizen') || cleanCV.includes('ciudadan') || cleanCV.includes('autoriza') || cleanCV.includes('passport') || cleanCV.includes('blue card');

    if (visaRequired && !hasVisaInfo) {
        findings.critical_errors.push("ALERTA CRÍTICA: La oferta menciona requisitos de visado/permiso y tu CV no detecta estatus migratorio claro (Ciudadanía, Permiso, etc.).");
        // No bajamos score automáticamente a 0, pero avisamos fuerte.
    }

    // B. Filtro Idioma (Regex avanzado)
    const englishRequired = cleanJD.includes('english') || cleanJD.includes('ingles') || cleanJD.includes('inglés');
    // Busca: b2, c1, advanced, fluent, native, bilingual, proficiency
    const englishRegex = /\b(b2|c1|c2|advanced|fluent|native|nativo|avanzado|bilingual|bilingue|proficient|proficiency)\b/;

    if (englishRequired && !englishRegex.test(cleanCV)) {
        findings.critical_errors.push("Filtro Idioma: Se requiere Inglés pero no detectamos nivel explícito (ej: 'Advanced', 'C1', 'Fluent') en tu CV.");
        knockOutHit = true;
    }

    // 4. SCORING (Weighted)
    let totalPossibleWeight = 0;
    let earnedWeight = 0;

    targetKeywords.forEach(keyword => {
        // Determinar peso
        let weight = 10; // Base
        if (CORE_TECH_STACK.some(core => hasTerm(keyword, core))) weight = 25; // Core tech vale mucho
        if (SOFT_SKILLS.some(soft => hasTerm(keyword, soft))) weight = 10; // Soft skills valen normal

        totalPossibleWeight += weight;

        if (hasTerm(cleanCV, keyword)) {
            earnedWeight += weight;
            findings.found_keywords.push(keyword);
        } else {
            findings.missing_keywords.push(keyword);
        }
    });

    // 5. PENALTIES
    if (cleanCV.length < 600) {
        findings.critical_errors.push("Longitud: CV demasiado breve. Los ATS modernos prefieren detalle sobre responsabilidades.");
        earnedWeight -= 20;
    }

    // 6. FINAL CALCULATION
    if (totalPossibleWeight === 0) totalPossibleWeight = 1;
    let finalPercentage = Math.round((earnedWeight / totalPossibleWeight) * 100);

    // Caps
    finalPercentage = Math.min(100, Math.max(0, finalPercentage));

    if (knockOutHit) {
        finalPercentage = Math.min(finalPercentage, 45); // Hard cap si falla idioma
        findings.feedback_summary = "Descarte probable por requisitos excluyentes (Idioma/Skills críticos).";
    } else if (finalPercentage >= 85) {
        findings.feedback_summary = "Excelente Match. Tu perfil técnico y contexto están alineados con la oferta.";
    } else if (finalPercentage >= 60) {
        findings.feedback_summary = "Buen potencial. Agrega las palabras clave faltantes para asegurar pasar el filtro.";
    } else {
        findings.feedback_summary = "Baja compatibilidad. Ajusta tu CV usando la terminología exacta de la oferta.";
    }

    findings.score = finalPercentage;
    return findings;
};
