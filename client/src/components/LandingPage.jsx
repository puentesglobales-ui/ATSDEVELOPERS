import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Globe, MessageCircle, FileText, Brain, Search,
    Sparkles, CheckCircle, Shield, TrendingUp, Menu, X, Bot, Zap, Star, Users
} from 'lucide-react';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const stats = [
        { label: "Profesionales Contratados", value: "2,847+", icon: <Users size={20} /> },
        { label: "Match Rate Promedio", value: "94%", icon: <Star size={20} /> },
        { label: "CVs Optimizados", value: "45K+", icon: <FileText size={20} /> },
        { label: "Success Rate ATS", value: "92%", icon: <TrendingUp size={20} /> }
    ];

    const tools = [
        {
            title: "Constructor de CV Pro",
            desc: "IA entrenada con CVs de candidatos en Microsoft y Amazon. Optimización total.",
            badge: "GRATIS",
            icon: <Sparkles className="text-cyan-400" />,
            color: "cyan",
            link: "/cv-wizard"
        },
        {
            title: "Escáner ATS",
            desc: "Descubre tu Match Score real frente a cualquier vacante antes de postular.",
            badge: "SCORE GRATIS",
            icon: <FileText className="text-blue-400" />,
            color: "blue",
            link: "/login"
        },
        {
            title: "Test Psicométrico",
            desc: "IA adaptativa que evalúa tu personalidad vs el puesto. Veredicto profesional.",
            badge: "RESULTADO GRATIS",
            icon: <Brain className="text-purple-400" />,
            color: "purple",
            link: "/login"
        },
        {
            title: "Búsqueda Laboral",
            desc: "Acceso a vacantes internacionales curadas por IA para tu perfil específico.",
            badge: "ILIMITADO",
            icon: <Search className="text-emerald-400" />,
            color: "emerald",
            link: "/login"
        }
    ];

    return (
        <div className="min-h-screen bg-[#0A0E17] text-white font-sans selection:bg-cyan-500/30 overflow-x-hidden">

            {/* --- CYBER BACKGROUND --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            {/* --- NAVIGATION (GLASSMORPHISM) --- */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0A0E17]/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 transition-transform">
                            <Globe className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-black tracking-tighter uppercase">
                            Puentes<span className="text-cyan-400">Globales</span>
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="#tools" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Arsenal</a>
                        <a href="#impact" className="text-sm font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Impacto</a>
                        <Link to="/login" className="px-6 py-2 border border-white/10 hover:bg-white/5 rounded-full text-sm font-bold transition-all">Ingresar</Link>
                        <Link to="/login" className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-[#0A0E17] rounded-full text-sm font-black shadow-lg shadow-cyan-500/20 transition-all">Acceso Gratis →</Link>
                    </div>

                    <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* --- HERO SECTION (AIDA: ATENCIÓN) --- */}
            <section className="relative pt-40 pb-20 z-10">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                            <Zap size={12} fill="currentColor" /> IA Validada por Headhunters Top 1%
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
                            TU CARRERA NO ESTÁ <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ESTANCADA. TU CV SÍ.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
                            No es suerte. Es algoritmo. Usa la IA que los reclutadores <span className="text-white">ya están usando</span> para filtrarte, pero esta vez a tu favor.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-20">
                            <Link to="/cv-wizard" className="px-10 py-5 bg-white text-[#0A0E17] rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl flex items-center justify-center gap-3">
                                <Sparkles size={20} className="text-cyan-600" /> Crear mi CV con IA en 30s
                            </Link>
                            <Link to="/login" className="px-10 py-5 bg-slate-900 border border-slate-800 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-3">
                                Escanear mi CV Actual (Gratis)
                            </Link>
                        </div>

                        {/* Social Proof Mini */}
                        <div className="flex items-center justify-center gap-8 py-10 border-y border-white/5 opacity-50 grayscale hover:grayscale-0 transition-all">
                            <span className="font-black text-xs uppercase tracking-widest text-slate-500">Confiado por candidatos en:</span>
                            <div className="flex gap-10 flex-wrap justify-center font-black text-xl italic tracking-tighter">
                                <span>MICROSOFT</span>
                                <span>GLOBANT</span>
                                <span>AMAZON</span>
                                <span>STRIPE</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- STATS BAR (AIDA: INTERÉS) --- */}
            <section id="impact" className="py-20 relative z-10 bg-[#0A0E17]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-white/5 border border-white/10 rounded-[2rem] text-center group hover:border-cyan-500/30 transition-all"
                            >
                                <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-black mb-1">{stat.value}</div>
                                <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- THE ARSENAL (AIDA: DESEO) --- */}
            <section id="tools" className="py-32 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mb-20">
                        <h2 className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.4em] mb-4">Arsenal de Elite</h2>
                        <h3 className="text-5xl font-black mb-6">4 Herramientas. 1 Objetivo: <br />Que te contraten.</h3>
                        <p className="text-slate-400 text-lg">Herramientas Enterprise que headhunters pagan por usar. Para ti, el acceso básico es <span className="text-white">100% gratuito.</span></p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tools.map((tool, i) => (
                            <Link
                                to={tool.link}
                                key={i}
                                className="group p-8 bg-slate-900/40 border border-slate-800 rounded-[2.5rem] hover:border-cyan-500/50 transition-all relative overflow-hidden flex flex-col h-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                            >
                                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-cyan-500/10 transition-colors">
                                    {tool.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-xl font-black mb-3 group-hover:text-cyan-400 transition-colors">{tool.title}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-6">{tool.desc}</p>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black tracking-widest uppercase rounded-lg">
                                        {tool.badge}
                                    </span>
                                    <ArrowRight size={16} className="text-slate-700 group-hover:text-cyan-400 transition-all translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- ALEX AI COACH SECTION --- */}
            <section className="py-32 bg-[#0A0E17] border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="bg-gradient-to-br from-slate-900 to-black border border-white/10 rounded-[3rem] p-12 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/5 blur-[100px]"></div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                            <div className="space-y-8">
                                <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400">
                                    <Bot size={32} />
                                </div>
                                <h3 className="text-5xl font-black leading-tight">Habla con Alex: <br />Tu Coach IA 24/7.</h3>
                                <p className="text-xl text-slate-400 leading-relaxed">
                                    "Soy Alex. Mi trabajo es leer entre líneas en tu CV y decirte exactamente qué te falta para ganar más. Sin rodeos, con datos reales de reclutamiento."
                                </p>
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-4 text-slate-300">
                                        <CheckCircle size={20} className="text-emerald-500" /> <span>Simulacro de entrevistas técnicas</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-300">
                                        <CheckCircle size={20} className="text-emerald-500" /> <span>Tips de negociación salarial</span>
                                    </div>
                                    <div className="flex items-center gap-4 text-slate-300">
                                        <CheckCircle size={20} className="text-emerald-500" /> <span>Consultas 24/7 vía WhatsApp</span>
                                    </div>
                                </div>
                                <a href="https://wa.me/your-number-here" className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[1.5rem] font-black text-lg transition-all shadow-xl shadow-emerald-500/20 group">
                                    Hablar con Alex ahora <MessageCircle className="group-hover:rotate-12 transition-transform" />
                                </a>
                            </div>
                            <div className="relative group lg:block hidden">
                                <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl transform rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white font-black">A</div>
                                        <div>
                                            <div className="font-black">Alex AI</div>
                                            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest">En línea</div>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-slate-300 italic">
                                            "Vi tu perfil. Tienes potencial para roles Senior. Déjame mostrarte cómo desbloquear +30% de salario hoy."
                                        </div>
                                        <div className="bg-cyan-500/20 p-4 rounded-2xl rounded-tr-none ml-auto max-w-[80%] text-sm text-cyan-100 font-bold">
                                            ¿Me ayudas con mi CV? →
                                        </div>
                                        <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[80%] text-sm text-slate-300 italic">
                                            "Claro. El 83% subestima la competencia X. Vamos a destacarla ahora..."
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FAQ SECTION (OBJECIONES) --- */}
            <section className="py-32 relative z-10">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h3 className="text-4xl font-black mb-12 text-center underline decoration-cyan-500 underline-offset-8">Preguntas para mentes inteligentes</h3>
                    <div className="space-y-4">
                        {[
                            { q: "¿Realmente es gratis?", a: "Sí. Las herramientas básicas son gratuitas porque nuestro modelo se basa en candidatos premium y empresas que pagan por talento filtrado." },
                            { q: "¿Cómo sé que la IA no inventa cosas?", a: "Nuestra IA está entrenada con datasets de headhunters expertos y bases de datos reales de ATS como Greenhouse y Lever." },
                            { q: "¿Qué pasa con mis datos?", a: "Tus datos están encriptados y cumplimos con GDPR. Tú controlas quién ve tu perfil y cuándo." },
                            { q: "¿Puedo usarlo si no hablo inglés?", a: "¡Claro! Alex te ayudará a optimizar tu perfil bilingüe para que puedas acceder a las mejores ofertas aunque estés aprendiendo." }
                        ].map((item, i) => (
                            <details key={i} className="group bg-white/5 border border-white/10 rounded-3xl p-6 cursor-pointer hover:border-cyan-500/30 transition-all">
                                <summary className="flex items-center justify-between font-black text-lg list-none">
                                    {item.q}
                                    <span className="text-cyan-500 group-open:rotate-180 transition-transform inline-block">▼</span>
                                </summary>
                                <div className="mt-4 text-slate-400 font-medium leading-relaxed">
                                    {item.a}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA (AIDA: ACCIÓN) --- */}
            <section className="py-40 relative overflow-hidden border-t border-white/5 bg-black">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.1),transparent_50%)]"></div>
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-6xl md:text-8xl font-black mb-10 tracking-[ -0.05em]">EMPIEZA TU <br />REVOLUCIÓN PROFESIONAL.</h2>
                    <p className="text-xl text-slate-500 mb-12 font-bold max-w-2xl mx-auto uppercase tracking-widest">El mercado no espera. Tu competencia tampoco.</p>
                    <div className="flex flex-col items-center gap-6">
                        <Link to="/login" className="px-16 py-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-[2rem] font-black text-2xl hover:shadow-[0_0_60px_rgba(34,211,238,0.4)] transition-all transform hover:-translate-y-2">
                            Crear cuenta gratis ahora
                        </Link>
                        <p className="text-sm font-bold text-slate-700">Sin tarjeta de crédito • 3 minutos • Acceso inmediato</p>
                    </div>
                </div>
            </section>

            {/* --- FOOTER --- */}
            <footer className="py-20 bg-black border-t border-white/5 text-slate-600">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-2 space-y-6">
                            <span className="text-2xl font-black text-white/50 tracking-tighter uppercase">Puentes<span className="text-cyan-950">Globales</span></span>
                            <p className="max-w-sm font-medium">Arquitectura de carrera diseñada para el profesional del siglo XXI. Rompiendo las barreras del reclutamiento tradicional con tecnología y honestidad.</p>
                        </div>
                        <div>
                            <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6">Herramientas</h4>
                            <ul className="space-y-4 text-sm font-bold">
                                <li><Link to="/cv-wizard" className="hover:text-cyan-500">Editor de CV</Link></li>
                                <li><Link to="/login" className="hover:text-cyan-500">Escáner ATS</Link></li>
                                <li><Link to="/login" className="hover:text-cyan-500">Test Psicométrico</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6">Conecta</h4>
                            <ul className="space-y-4 text-sm font-bold">
                                <li><a href="#" className="hover:text-cyan-500 text-slate-500">WhatsApp Coach</a></li>
                                <li><a href="#" className="hover:text-cyan-500 text-slate-500">LinkedIn</a></li>
                                <li><a href="#" className="hover:text-cyan-500 text-slate-500">Soporte</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black uppercase tracking-widest">
                        <p>© 2026 Puentes Globales. Todos los derechos reservados.</p>
                        <div className="flex gap-8">
                            <a href="#" className="hover:text-white">Privacidad</a>
                            <a href="#" className="hover:text-white">Términos</a>
                        </div>
                    </div>
                </div>
            </footer>

            {/* --- WHATSAPP STICKY (ALEX AI) --- */}
            <div className="fixed bottom-8 right-8 z-[100]">
                <a
                    href="https://wa.me/your-number-here"
                    className="flex items-center gap-4 bg-[#0A0E17] border border-emerald-500/20 p-2 pr-6 rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.5)] hover:scale-105 transition-all group"
                >
                    <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white relative">
                        <MessageCircle size={24} fill="currentColor" />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-[#0A0E17] rounded-full animate-bounce"></span>
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase text-emerald-500 tracking-widest">Habla con Alex</div>
                        <div className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">¿Atascado? Te ayudo →</div>
                    </div>
                </a>
            </div>

        </div>
    );
};

export default LandingPage;
