import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
    Layout,
    Palette,
    Type,
    Download,
    Save,
    Search,
    Sparkles,
    User,
    Briefcase,
    GraduationCap,
    Loader
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- MOCK TEMPLATES DATA ---
const TEMPLATES = [
    {
        id: 'ats-classic',
        name: 'Harvard ATS Standard',
        category: 'USA',
        description: 'Blanco y negro. Sin columnas. 100% Parsable.',
        tags: ['ats', 'clean', 'strict']
    },
    {
        id: 'modern-tech',
        name: 'Silicon Valley Blue',
        category: 'Tech',
        description: 'Acentos azules, fuente sans-serif moderna.',
        tags: ['modern', 'dev', 'startups']
    },
    {
        id: 'euro-corp',
        name: 'Berlin Professional',
        category: 'Europe',
        description: 'Estructura formal con espacio para foto.',
        tags: ['photo', 'sidebar', 'corp']
    },
    {
        id: 'creative-bold',
        name: 'Amsterdam Creative',
        category: 'Creative',
        description: 'Diseño atrevido para roles de marketing/diseño.',
        tags: ['visual', 'color', 'marketing']
    }
];

const CVBuilder = () => {
    const location = useLocation();
    const wizardData = location.state || {}; // { market, role, industry, etc. }

    const [activeTab, setActiveTab] = useState('templates'); // 'content', 'templates', 'style'
    const [selectedTemplate, setSelectedTemplate] = useState('ats-classic');
    const [searchQuery, setSearchQuery] = useState('');

    // CV DATA STATE
    const [cvData, setCvData] = useState({
        personal: { name: 'Tu Nombre', email: 'email@ejemplo.com', phone: '+123456789', location: wizardData.country || 'Ciudad, País', summary: '' },
        experience: [],
        education: []
    });

    const [isGenerating, setIsGenerating] = useState(false);

    // SIMULATE AI GENERATION ON MOUNT
    useEffect(() => {
        if (wizardData.role) {
            setIsGenerating(true);
            setTimeout(() => {
                // Mock AI response building on wizard data
                setCvData(prev => ({
                    ...prev,
                    personal: {
                        ...prev.personal,
                        summary: `Profesional en ${wizardData.industry || 'Tech'} enfocado en ${wizardData.role}. Perfil optimizado por IA para mercado ${wizardData.market || 'Global'} siguiendo reglas de ${wizardData.market === 'USA' ? 'Action+Impact' : 'Competencia+Review'}.`
                    },
                    experience: [
                        { id: 1, role: wizardData.role, company: 'Empresa Anterior', date: '2021 - Presente', description: '• Lideré la implementación de nuevas estrategias aumentado el rendimiento un 20%.\n• Coordiné equipos multidisciplinarios para asegurar entregas a tiempo.\n• Optimicé procesos internos reduciendo costos operativos.' }
                    ],
                    education: [
                        { id: 1, degree: 'Grado en ' + (wizardData.industry || 'Ingeniería'), school: 'Universidad Principal', date: '2016 - 2020' }
                    ]
                }));
                setIsGenerating(false);
                setActiveTab('content'); // Switch to content after gen
            }, 2500);
        }
    }, [wizardData]);

    const filteredTemplates = TEMPLATES.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tags.some(tag => tag.includes(searchQuery.toLowerCase()))
    );

    const addExperience = () => {
        setCvData(prev => ({
            ...prev,
            experience: [...prev.experience, { id: Date.now(), role: 'Nuevo Rol', company: 'Empresa', date: '2023', description: '' }]
        }));
    };

    return (
        <div className="h-screen overflow-hidden bg-slate-900 flex flex-col md:flex-row text-slate-100">
            {/* SIDEBAR */}
            <div className="w-full md:w-80 border-r border-slate-800 bg-slate-900 flex flex-col h-full z-20 shadow-xl">
                <div className="p-4 border-b border-slate-800 flex items-center gap-2 bg-slate-950">
                    <Sparkles className="text-cyan-400" />
                    <h1 className="font-bold text-lg">CV Architect AI</h1>
                </div>

                {/* TABS */}
                <div className="flex p-2 gap-1 bg-slate-950 border-b border-slate-800">
                    <button onClick={() => setActiveTab('templates')} className={`flex-1 py-2 text-sm rounded-lg transition-all ${activeTab === 'templates' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'}`}><Layout size={14} className="mx-auto mb-1" />Plantillas</button>
                    <button onClick={() => setActiveTab('content')} className={`flex-1 py-2 text-sm rounded-lg transition-all ${activeTab === 'content' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'}`}><Type size={14} className="mx-auto mb-1" />Editor</button>
                    <button onClick={() => setActiveTab('style')} className={`flex-1 py-2 text-sm rounded-lg transition-all ${activeTab === 'style' ? 'bg-slate-800 text-white shadow' : 'text-slate-400 hover:text-white'}`}><Palette size={14} className="mx-auto mb-1" />Estilo</button>
                </div>

                {/* CONTENT AREA OF SIDEBAR */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-slate-900">

                    {/* TEMPLATES TAB */}
                    {activeTab === 'templates' && (
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-2.5 text-slate-500" size={16} />
                                <input
                                    type="text"
                                    placeholder="Buscar plantillas..."
                                    className="w-full bg-slate-800 rounded-lg py-2 pl-9 pr-3 text-sm focus:ring-1 focus:ring-cyan-500 outline-none placeholder-slate-500 text-white"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-3">
                                {filteredTemplates.map(t => (
                                    <div
                                        key={t.id}
                                        onClick={() => setSelectedTemplate(t.id)}
                                        className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedTemplate === t.id ? 'border-cyan-500 bg-cyan-900/20' : 'border-slate-700 hover:border-slate-600 bg-slate-800'}`}
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-sm text-white">{t.name}</h3>
                                            {selectedTemplate === t.id && <div className="w-2 h-2 bg-cyan-500 rounded-full mt-1" />}
                                        </div>
                                        <p className="text-xs text-slate-400 mb-2 leading-snug">{t.description}</p>
                                        <div className="flex gap-1 flex-wrap">
                                            {t.tags.map(tag => (
                                                <span key={tag} className="px-1.5 py-0.5 bg-slate-950 rounded text-[10px] text-slate-400 uppercase tracking-wide">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CONTENT EDITOR TAB */}
                    {activeTab === 'content' && (
                        <div className="space-y-6 pb-20">
                            {/* Personal */}
                            <div className="space-y-3">
                                <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><User size={12} /> Personal</h3>
                                <input className="w-full bg-slate-800 border border-slate-700 p-2 rounded text-sm focus:border-cyan-500 outline-none" value={cvData.personal.name} onChange={(e) => setCvData({ ...cvData, personal: { ...cvData.personal, name: e.target.value } })} placeholder="Nombre" />
                                <input className="w-full bg-slate-800 border border-slate-700 p-2 rounded text-sm focus:border-cyan-500 outline-none" value={cvData.personal.location} onChange={(e) => setCvData({ ...cvData, personal: { ...cvData.personal, location: e.target.value } })} placeholder="Ubicación" />
                                <textarea className="w-full bg-slate-800 border border-slate-700 p-2 rounded text-sm h-32 focus:border-cyan-500 outline-none resize-none" value={cvData.personal.summary} onChange={(e) => setCvData({ ...cvData, personal: { ...cvData.personal, summary: e.target.value } })} placeholder="Perfil Profesional" />
                            </div>

                            {/* Experience */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><Briefcase size={12} /> Experiencia</h3>
                                    <button onClick={addExperience} className="text-xs text-cyan-400 hover:text-cyan-300 font-bold bg-cyan-900/30 px-2 py-1 rounded">+ Añadir</button>
                                </div>
                                {cvData.experience.map((exp, i) => (
                                    <div key={exp.id} className="bg-slate-800 p-3 rounded-lg border border-slate-700 space-y-2">
                                        <input className="w-full bg-transparent font-bold text-sm border-b border-slate-700 pb-1 focus:border-cyan-500 outline-none" value={exp.role} onChange={e => {
                                            const newExp = [...cvData.experience]; newExp[i].role = e.target.value; setCvData({ ...cvData, experience: newExp });
                                        }} placeholder="Cargo / Rol" />
                                        <input className="w-full bg-transparent text-xs text-slate-400 focus:text-white outline-none" value={exp.company} onChange={e => {
                                            const newExp = [...cvData.experience]; newExp[i].company = e.target.value; setCvData({ ...cvData, experience: newExp });
                                        }} placeholder="Empresa" />
                                        <textarea className="w-full bg-black/20 p-2 rounded text-xs text-slate-300 h-24 focus:ring-1 focus:ring-cyan-500 outline-none resize-none" value={exp.description} onChange={e => {
                                            const newExp = [...cvData.experience]; newExp[i].description = e.target.value; setCvData({ ...cvData, experience: newExp });
                                        }} placeholder="• Logros..." />
                                    </div>
                                ))}
                            </div>

                            {/* Education */}
                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><GraduationCap size={12} /> Educación</h3>
                                </div>
                                {cvData.education.map((edu, i) => (
                                    <div key={edu.id} className="bg-slate-800 p-3 rounded-lg border border-slate-700 space-y-1">
                                        <input className="w-full bg-transparent font-bold text-sm outline-none" value={edu.degree} onChange={e => {
                                            const newEdu = [...cvData.education]; newEdu[i].degree = e.target.value; setCvData({ ...cvData, education: newEdu });
                                        }} />
                                        <input className="w-full bg-transparent text-xs text-slate-400 outline-none" value={edu.school} onChange={e => {
                                            const newEdu = [...cvData.education]; newEdu[i].school = e.target.value; setCvData({ ...cvData, education: newEdu });
                                        }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* STYLE TAB PLACEHOLDER */}
                    {activeTab === 'style' && (
                        <div className="flex flex-col items-center justify-center h-40 text-center p-4">
                            <Palette className="text-slate-600 mb-2" />
                            <p className="text-sm text-slate-500">Próximamente: Personalización avanzada de fuentes y acentos de color.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* MAIN PREVIEW AREA */}
            <div className="flex-1 bg-slate-950 p-4 md:p-8 flex flex-col items-center justify-start overflow-y-auto relative custom-scrollbar">

                {/* TOOLBAR */}
                <div className="absolute top-4 right-4 md:right-8 flex gap-2 z-30">
                    <button onClick={() => alert("Guardado en tu perfil (Simulación)")} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors shadow-lg border border-slate-700">
                        <Save size={16} /> <span className="hidden md:inline">Guardar</span>
                    </button>
                    <button onClick={() => alert("Generando PDF (Simulación)")} className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg text-white font-bold text-sm transition-all shadow-lg shadow-cyan-500/20">
                        <Download size={16} /> <span className="hidden md:inline">Exportar PDF</span>
                    </button>
                </div>

                {/* AI LOADING OVERLAY */}
                <AnimatePresence>
                    {isGenerating && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-40 bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-4"
                        >
                            <Loader className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
                            <h2 className="text-2xl font-bold text-white mb-2">Redactando tu CV con IA...</h2>
                            <p className="text-slate-400">Aplicando reglas del mercado <span className="text-cyan-400 font-bold">{wizardData.market || 'Global'}</span> para el rol de <span className="text-cyan-400 font-bold">{wizardData.role}</span></p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* A4 PAPER PREVIEW */}
                <motion.div
                    layout
                    className="w-[210mm] min-h-[297mm] bg-white text-black shadow-2xl origin-top transform scale-[0.5] md:scale-[0.65] lg:scale-[0.85] xl:scale-100 transition-all rounded-sm overflow-hidden mt-12 md:mt-0"
                >
                    {/* --- TEMPLATE RENDERER --- */}

                    {/* CLASSIC ATS */}
                    {selectedTemplate === 'ats-classic' && (
                        <div className="p-12 font-serif max-w-full h-full text-slate-900">
                            <div className="text-center border-b-2 border-black pb-6 mb-6">
                                <h1 className="text-4xl font-bold uppercase tracking-widest mb-2">{cvData.personal.name}</h1>
                                <p className="text-base text-slate-700">{cvData.personal.location} | {cvData.personal.email} | {cvData.personal.phone}</p>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-3 pb-1 tracking-wider">Professional Profile</h2>
                                <p className="text-sm leading-relaxed text-justify">{cvData.personal.summary || 'Tu perfil profesional aparecerá aquí...'}</p>
                            </div>

                            <div className="mb-8">
                                <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wider">Experience</h2>
                                {cvData.experience.map(exp => (
                                    <div key={exp.id} className="mb-4">
                                        <div className="flex justify-between items-baseline mb-1">
                                            <h3 className="font-bold text-lg">{exp.role}</h3>
                                            <span className="text-sm italic font-medium">{exp.date}</span>
                                        </div>
                                        <div className="text-base font-semibold text-slate-800 mb-2">{exp.company}</div>
                                        <p className="text-sm whitespace-pre-line leading-relaxed">{exp.description}</p>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h2 className="text-sm font-bold uppercase border-b border-gray-300 mb-4 pb-1 tracking-wider">Education</h2>
                                {cvData.education.map(edu => (
                                    <div key={edu.id} className="mb-2">
                                        <div className="flex justify-between">
                                            <span className="font-bold">{edu.degree}</span>
                                            <span className="text-sm italic">{edu.date}</span>
                                        </div>
                                        <div className="text-sm">{edu.school}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* MODERN TECH */}
                    {selectedTemplate === 'modern-tech' && (
                        <div className="h-full flex font-sans min-h-[297mm]">
                            <div className="w-1/3 bg-slate-100 p-8 border-r border-slate-200 pt-16">
                                <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-6 mx-auto shadow-lg">
                                    {cvData.personal.name.charAt(0)}
                                </div>
                                <h2 className="font-bold text-blue-900 border-b-2 border-blue-200 pb-2 mb-4 uppercase text-xs tracking-wider">Contacto</h2>
                                <p className="text-sm mb-2 break-words font-medium text-slate-700">{cvData.personal.email}</p>
                                <p className="text-sm mb-2 text-slate-700">{cvData.personal.phone}</p>
                                <p className="text-sm mb-8 text-slate-700">{cvData.personal.location}</p>

                                <h2 className="font-bold text-blue-900 border-b-2 border-blue-200 pb-2 mb-4 uppercase text-xs tracking-wider">Educación</h2>
                                {cvData.education.map(edu => (
                                    <div key={edu.id} className="mb-4">
                                        <p className="text-sm font-bold text-slate-800">{edu.degree}</p>
                                        <p className="text-xs text-slate-600">{edu.school}</p>
                                        <p className="text-xs text-blue-500">{edu.date}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="w-2/3 p-10 pt-16">
                                <h1 className="text-5xl font-bold text-blue-900 mb-2">{cvData.personal.name}</h1>
                                <p className="text-xl text-blue-600 mb-8 font-medium">{wizardData.role || 'Senior Professional'}</p>

                                <div className="bg-blue-50/50 p-6 rounded-xl border-l-4 border-blue-500 mb-10">
                                    <p className="text-sm text-slate-700 leading-relaxed">{cvData.personal.summary}</p>
                                </div>

                                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                    <span className="w-2 h-8 bg-blue-600 rounded-full block"></span> Experiencia Profesional
                                </h2>
                                {cvData.experience.map(exp => (
                                    <div key={exp.id} className="mb-8 relative pl-6 border-l-2 border-blue-100 ml-1">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow"></div>
                                        <h3 className="font-bold text-lg text-slate-800">{exp.role}</h3>
                                        <div className="text-blue-600 font-bold text-xs uppercase tracking-wide mb-3">{exp.company} • {exp.date}</div>
                                        <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Fallback for others */}
                    {['euro-corp', 'creative-bold'].includes(selectedTemplate) && (
                        <div className="h-[297mm] flex items-center justify-center p-12 bg-gray-50 text-center">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-300 mb-4">Plantilla "{TEMPLATES.find(t => t.id === selectedTemplate)?.name}"</h2>
                                <p className="text-slate-400">Vista previa simplificada para esta demo técnica.</p>
                                <div className="mt-8 p-8 border border-slate-200 bg-white shadow-xl text-left max-w-lg mx-auto transform rotate-1">
                                    <h1 className="text-2xl font-bold text-slate-800">{cvData.personal.name}</h1>
                                    <p className="text-sm text-gray-500 mt-2">{cvData.personal.summary}</p>
                                </div>
                            </div>
                        </div>
                    )}

                </motion.div>
            </div>
        </div>
    );
};

export default CVBuilder;
