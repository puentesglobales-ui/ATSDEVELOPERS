import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Globe,
    Flag, // Used for country selection logic icon
    Briefcase,
    FileText,
    ArrowRight,
    ArrowLeft,
    CheckCircle,
    MapPin,
    AlertTriangle,
    Sparkles
} from 'lucide-react';

// STAGES OF THE WIZARD
const STAGES = {
    MARKET: 'MARKET',
    ROLE: 'ROLE',
    INPUT: 'INPUT'
};

const CVWizard = () => {
    // STATE
    const [currentStage, setCurrentStage] = useState(STAGES.MARKET);
    const [formData, setFormData] = useState({
        // Stage 1: Market
        market: '', // 'USA', 'EUROPE', 'LATAM'
        country: '', // If Europe (e.g., 'UK', 'DE', 'ES')
        // Stage 2: Profile
        role: '',
        industry: '',
        years_exp: 0,
        // Stage 3: Extra
        visa_status: '',
        target_lang: 'English'
    });

    const handleNext = (nextStage) => {
        setCurrentStage(nextStage);
    };

    const handleBack = (prevStage) => {
        setCurrentStage(prevStage);
    };

    const updateForm = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    // RENDERERS FOR EACH STAGE

    // --- STAGE 1: MARKET SELECTION ---
    const renderMarketStage = () => (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white text-center mb-2">
                ¿Dónde quieres trabajar?
            </h2>
            <p className="text-slate-400 text-center mb-8">
                El formato y reglas de tu CV cambiarán radicalmente según el mercado.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* OPTION A: USA */}
                <button
                    onClick={() => updateForm('market', 'USA')}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 text-center group
                    ${formData.market === 'USA'
                            ? 'border-cyan-500 bg-cyan-900/20'
                            : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'}`}
                >
                    <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-3xl">
                        🇺🇸
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">EE. UU. / Anglo</h3>
                        <p className="text-sm text-slate-400 mt-2">
                            Estilo "Resume". Breve, sin foto, enfocado en logros (Action + Impact).
                        </p>
                    </div>
                    {formData.market === 'USA' && <CheckCircle className="text-cyan-500" />}
                </button>

                {/* OPTION B: EUROPE */}
                <button
                    onClick={() => updateForm('market', 'EUROPE')}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 text-center group
                    ${formData.market === 'EUROPE'
                            ? 'border-cyan-500 bg-cyan-900/20'
                            : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'}`}
                >
                    <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-3xl">
                        🇪🇺
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Europa</h3>
                        <p className="text-sm text-slate-400 mt-2">
                            Estilo "CV". Detallado, estructura formal, idiomas y ubicación explícitos.
                        </p>
                    </div>
                    {formData.market === 'EUROPE' && <CheckCircle className="text-cyan-500" />}
                </button>

                {/* OPTION C: LATAM */}
                <button
                    onClick={() => updateForm('market', 'LATAM')}
                    className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 text-center group
                    ${formData.market === 'LATAM'
                            ? 'border-cyan-500 bg-cyan-900/20'
                            : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'}`}
                >
                    <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center text-3xl">
                        🌎
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white">Global / LATAM</h3>
                        <p className="text-sm text-slate-400 mt-2">
                            Formato estándar híbrido. Visible, claro y completo.
                        </p>
                    </div>
                    {formData.market === 'LATAM' && <CheckCircle className="text-cyan-500" />}
                </button>
            </div>

            {/* SUB-SELECTION FOR EUROPE */}
            <AnimatePresence>
                {formData.market === 'EUROPE' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 bg-slate-800/50 p-6 rounded-xl border border-slate-700"
                    >
                        <label className="text-slate-300 font-semibold mb-3 block">
                            País Principal (Define reglas de foto y datos)
                        </label>
                        <div className="flex gap-3 flex-wrap">
                            {['UK', 'Germany', 'France', 'Spain', 'Other'].map((country) => (
                                <button
                                    key={country}
                                    onClick={() => updateForm('country', country)}
                                    className={`px-4 py-2 rounded-lg border transition-all
                                    ${formData.country === country
                                            ? 'bg-cyan-600 border-cyan-500 text-white'
                                            : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-white'}`}
                                >
                                    {country}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* NEXT BUTTON */}
            <div className="flex justify-end mt-8">
                <button
                    disabled={!formData.market}
                    onClick={() => handleNext(STAGES.ROLE)}
                    className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all"
                >
                    Siguiente: Perfil <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );

    // --- STAGE 2: ROLE & PROFILE ---
    const renderRoleStage = () => (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white text-center mb-2">
                Define tu Perfil
            </h2>
            <p className="text-slate-400 text-center mb-8">
                Esto ayuda a la IA a priorizar keywords relevantes para tu industria.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-slate-300 mb-2 font-medium">Cargo Objetivo (Target Role)</label>
                    <input
                        type="text"
                        placeholder="Ej: Full Stack Developer, Marketing Manager..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                        value={formData.role}
                        onChange={(e) => updateForm('role', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-slate-300 mb-2 font-medium">Industria</label>
                    <input
                        type="text"
                        placeholder="Ej: Fintech, SaaS, Retail, Healthcare..."
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                        value={formData.industry}
                        onChange={(e) => updateForm('industry', e.target.value)}
                    />
                </div>
            </div>

            {/* VISA & LANGUAGE WARNINGS */}
            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mt-6">
                <div className="flex items-start gap-3">
                    <AlertTriangle className="text-yellow-500 shrink-0 mt-1" />
                    <div>
                        <h4 className="text-white font-bold text-lg">Reglas de Oro</h4>
                        <p className="text-slate-400 text-sm mt-1">
                            {formData.market === 'USA'
                                ? "En USA, la honestidad sobre la VISA es crucial. Si requieres 'Sponsorship', el sistema resaltará tus méritos técnicos para compensar esa barrera."
                                : "En Europa, el nivel de idioma es el filtro #1. Sé honesto: pondremos tu nivel real (B2, C1) visible al inicio."}
                        </p>
                    </div>
                </div>
            </div>

            {/* NAVIGATION */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={() => handleBack(STAGES.MARKET)}
                    className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-white transition-all"
                >
                    <ArrowLeft size={20} /> Volver
                </button>
                <button
                    disabled={!formData.role}
                    onClick={() => handleNext(STAGES.INPUT)}
                    className="flex items-center gap-2 px-8 py-3 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all"
                >
                    Siguiente: Cargar Datos <ArrowRight size={20} />
                </button>
            </div>
        </div>
    );

    // --- STAGE 3: INPUT DATA ---
    const renderInputStage = () => (
        <div className="max-w-xl mx-auto text-center space-y-8">
            <h2 className="text-3xl font-bold text-white mb-2">
                ¡Todo listo para construir!
            </h2>
            <div className="inline-block p-4 bg-cyan-900/30 rounded-full mb-4 animate-pulse">
                <Sparkles className="text-cyan-400 w-12 h-12" />
            </div>

            <p className="text-slate-300 text-lg">
                Has configurado el motor para: <br />
                <span className="text-cyan-400 font-bold">{formData.market} {formData.country ? `(${formData.country})` : ''}</span>
                {' '}como <span className="text-cyan-400 font-bold">{formData.role}</span>.
            </p>

            <p className="text-slate-400">
                En el siguiente paso, la IA tomará el control para redactar tu CV con el sistema
                <span className="text-white font-mono bg-slate-800 px-2 py-1 rounded mx-1">
                    {formData.market === 'USA' ? 'Action+Impact' : 'Competencia+Review'}
                </span>.
            </p>

            <div className="flex flex-col gap-4 mt-8">
                <Link
                    to="/cv-builder"
                    state={formData}
                    className="block w-full py-4 text-center bg-white text-slate-900 rounded-xl font-bold text-xl hover:bg-cyan-50 transition-all shadow-lg transform hover:-translate-y-1"
                >
                    🚀 Abrir Editor Inteligente
                </Link>
                <button
                    onClick={() => handleBack(STAGES.ROLE)}
                    className="text-slate-500 hover:text-white underline text-sm"
                >
                    Atrás / Corregir datos
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-black/40 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">

                {/* BACKGROUND GLOW */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/10 blur-[100px] rounded-full pointer-events-none" />

                {/* CONTENT */}
                <div className="relative z-10">
                    {currentStage === STAGES.MARKET && renderMarketStage()}
                    {currentStage === STAGES.ROLE && renderRoleStage()}
                    {currentStage === STAGES.INPUT && renderInputStage()}
                </div>
            </div>
        </div>
    );
};

export default CVWizard;
