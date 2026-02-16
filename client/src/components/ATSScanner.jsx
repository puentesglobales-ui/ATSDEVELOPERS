import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Upload, FileText, AlertTriangle, CheckCircle, XCircle,
    Target, Sparkles, Loader, ShieldCheck, MessageCircle, ArrowRight
} from 'lucide-react';
import api from '../services/api';
import { Navigate } from 'react-router-dom';

const ATSScanner = ({ session }) => {
    // 1. STRICT GATE: Redirect to Login if no session
    if (!session) {
        return <Navigate to="/login" />;
    }

    const [file, setFile] = useState(null);
    const [cvText, setCvText] = useState('');
    const [inputMode, setInputMode] = useState('text');
    const [jobDescription, setJobDescription] = useState('');
    const [analyzing, setAnalyzing] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files[0]) setFile(e.target.files[0]);
    };

    const handleAnalyze = async () => {
        if (inputMode === 'pdf' && !file) return setError('Please upload a CV PDF.');
        if (inputMode === 'text' && !cvText.trim()) return setError('Por favor pega el texto de tu CV.');
        if (!jobDescription.trim()) return setError('Please provide a Job Description.');

        setAnalyzing(true);
        setError('');
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('jobDescription', jobDescription);

            if (session && session.user) {
                formData.append('userId', session.user.id);
            }

            if (inputMode === 'pdf') {
                formData.append('cv', file);
            } else {
                formData.append('cvText', cvText);
            }

            const response = await api.post('/analyze-cv', formData);
            setResult(response.data);

        } catch (err) {
            console.error(err);
            setError('Failed to analyze CV. Please try again.');
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0A0E17] text-slate-200 p-6 flex flex-col items-center font-sans selection:bg-cyan-500/30">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4">
                    <ShieldCheck size={12} /> Tecnología de Reclutamiento Enterprise
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-2">
                    Escáner <span className="text-cyan-500">ATS Pro</span>
                </h1>
                <p className="text-slate-500 font-medium">Auditoría de afinidad con vacantes internacionales mediante IA.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                {/* INPUT SECTION */}
                <div className="space-y-6">
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
                        {/* TABS */}
                        <div className="flex bg-black/40 p-1 rounded-2xl border border-white/5">
                            <button
                                onClick={() => setInputMode('text')}
                                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${inputMode === 'text' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'text-slate-500 hover:text-white'}`}
                            >
                                Pegar Texto
                            </button>
                            <button
                                onClick={() => setInputMode('pdf')}
                                className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${inputMode === 'pdf' ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/20' : 'text-slate-500 hover:text-white'}`}
                            >
                                Subir PDF
                            </button>
                        </div>

                        {/* CV Input Area */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">Tu Currículum</label>
                            {inputMode === 'pdf' ? (
                                <div className="border-2 border-dashed border-slate-800 rounded-3xl p-10 text-center hover:border-cyan-500/50 transition-colors cursor-pointer relative bg-black/20">
                                    <input type="file" accept=".pdf" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                    {file ? <div className="text-cyan-400 flex items-center justify-center gap-2 font-black"><FileText /> {file.name}</div> : <span className="text-slate-600 font-bold">Arrastra tu PDF aquí o haz clic</span>}
                                </div>
                            ) : (
                                <textarea
                                    className="w-full h-48 bg-black/20 border border-slate-800 rounded-3xl p-6 focus:border-cyan-500 outline-none transition-all text-sm leading-relaxed"
                                    placeholder="Pega el contenido de tu CV..."
                                    value={cvText}
                                    onChange={(e) => setCvText(e.target.value)}
                                />
                            )}
                        </div>

                        {/* Job Description */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 px-2">Descripción del Puesto</label>
                            <textarea
                                className="w-full h-48 bg-black/20 border border-slate-800 rounded-3xl p-6 focus:border-cyan-500 outline-none transition-all text-sm leading-relaxed"
                                placeholder="Pega los requisitos de la vacante..."
                                value={jobDescription}
                                onChange={(e) => setJobDescription(e.target.value)}
                            />
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={analyzing}
                            className="w-full py-5 bg-white text-black font-black rounded-2xl text-lg hover:scale-[1.02] transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                        >
                            {analyzing ? <Loader className="animate-spin" /> : <Sparkles size={20} />}
                            {analyzing ? 'Procesando Algoritmos...' : 'Analizar Afinidad ATS'}
                        </button>
                        {error && <p className="text-red-400 text-center text-xs font-bold uppercase tracking-widest">{error}</p>}
                    </div>
                </div>

                {/* RESULTS SECTION */}
                <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden min-h-[600px]">
                    {!result ? (
                        <div className="h-full flex items-center justify-center text-slate-700 flex-col gap-6 py-20">
                            <div className="w-24 h-24 rounded-full border-4 border-slate-800 flex items-center justify-center">
                                <Target size={40} className="text-slate-800" />
                            </div>
                            <div className="text-center space-y-2">
                                <p className="font-black uppercase tracking-[0.2em] text-xs">Esperando Datos</p>
                                <p className="text-sm text-slate-600 font-medium">Completa los campos para simular el filtro de IA.</p>
                            </div>
                        </div>
                    ) : (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                            {/* Score Display */}
                            <div className="text-center space-y-4">
                                <div className="inline-block relative">
                                    <svg className="w-40 h-40 transform -rotate-90">
                                        <circle cx="80" cy="80" r="70" fill="none" stroke="#1e293b" strokeWidth="10" />
                                        <circle cx="80" cy="80" r="70" fill="none" stroke="#22d3ee" strokeWidth="10" strokeDasharray="440" strokeDashoffset={440 - (440 * result.score / 100)} strokeLinecap="round" className="transition-all duration-1000" />
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-black text-white">{result.score}%</span>
                                        <span className="text-[8px] font-black uppercase text-cyan-500 tracking-widest">Match Score</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-black text-white">{result.match_level}</h3>
                            </div>

                            {/* Status Message */}
                            <div className={`p-6 rounded-[2rem] border ${result.score >= 80 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                                <div className="flex items-center gap-3 font-black uppercase tracking-widest text-xs mb-2">
                                    {result.score >= 80 ? <CheckCircle /> : <XCircle />}
                                    Veredicto del Algoritmo
                                </div>
                                <p className="text-sm font-medium leading-relaxed">
                                    {result.score >= 80
                                        ? "Tu perfil tiene una alta compatibilidad con el sistema de filtrado. Probabilidad de entrevista: ALTA."
                                        : "El sistema ATS detecta brechas críticas entre tu CV y los requisitos. Probabilidad de entrevista: BAJA."}
                                </p>
                            </div>

                            {/* THE GATE: Recommendations (LOCKED) */}
                            <div className="space-y-6 pt-8 border-t border-white/5 relative">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Plan de Optimización</h4>
                                    <span className="text-[8px] font-black bg-white/10 px-2 py-0.5 rounded text-slate-400">PREMIUM FEATURE</span>
                                </div>

                                {/* BLURRED CONTENT */}
                                <div className="space-y-4 opacity-10 blur-md pointer-events-none select-none">
                                    <div className="bg-slate-800 p-4 rounded-2xl h-12 w-full"></div>
                                    <div className="bg-slate-800 p-4 rounded-2xl h-24 w-full"></div>
                                    <div className="bg-slate-800 p-4 rounded-2xl h-12 w-full"></div>
                                </div>

                                {/* GATE OVERLAY */}
                                <div className="absolute inset-x-0 bottom-0 top-[3rem] flex flex-col items-center justify-center bg-gradient-to-t from-[#0A0E17] via-[#0A0E17]/80 to-transparent p-6 text-center">
                                    <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center text-cyan-400 mb-4">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <h5 className="text-lg font-black text-white mb-2">Consejos de Mejora Bloqueados</h5>
                                    <p className="text-xs text-slate-500 mb-6 max-w-[250px]">
                                        El algoritmo ha identificado <span className="text-white">keywords faltantes</span> y fallos de formato, pero las recomendaciones son exclusivas de Alex IA.
                                    </p>
                                    <a
                                        href="https://wa.me/your-number-here"
                                        className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20 flex items-center gap-3"
                                    >
                                        <MessageCircle size={14} /> Desbloquear con Alex
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ATSScanner;
