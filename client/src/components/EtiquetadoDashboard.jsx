import React, { useState } from 'react';
import { Mic, Send, Bot, Code, Cpu, Activity, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EXPERTS = {
    ARCHITECT: { name: 'GPT-o3 (Architect)', icon: <Cpu className="text-purple-400" />, color: 'purple' },
    CODER: { name: 'Claude 3.5 (Dev)', icon: <Code className="text-blue-400" />, color: 'blue' },
    LOGIC: { name: 'DeepSeek (Logic)', icon: <Activity className="text-green-400" />, color: 'green' },
    INTERFACE: { name: 'Gemini Flash (Voice)', icon: <Zap className="text-yellow-400" />, color: 'yellow' }
};

const EtiquetadoDashboard = () => {
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState([]);
    const [activeExpert, setActiveExpert] = useState(null);
    const [isListening, setIsListening] = useState(false);

    // Simulador de Procesamiento del Router
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // 1. User Voice/Text Input
        addLog('USER', input);
        setInput('');

        // 2. Gemini Flash Analysis (Simulated Delay)
        setActiveExpert('INTERFACE');
        await wait(600);

        // 3. Routing Decision based on keywords
        let expert = 'INTERFACE';
        if (input.toLowerCase().includes('plan') || input.toLowerCase().includes('estructura')) expert = 'ARCHITECT';
        else if (input.toLowerCase().includes('codigo') || input.toLowerCase().includes('funcion')) expert = 'CODER';
        else if (input.toLowerCase().includes('calculo') || input.toLowerCase().includes('logica')) expert = 'LOGIC';

        // 4. Expert Processing
        setActiveExpert(expert);
        addLog('SYSTEM', `Router: Asignando tarea a ${EXPERTS[expert].name}...`);
        await wait(1500);

        // 5. Response
        const responses = {
            ARCHITECT: "He diseñado la arquitectura de microservicios solicitada. Aquí está el diagrama en Mermaid...",
            CODER: "Aquí tienes el código refactorizado en Node.js con manejo de errores robusto.",
            LOGIC: "El algoritmo ha sido optimizado. La complejidad se redujo de O(n^2) a O(n log n).",
            INTERFACE: "Entendido. ¿Necesitas algo más?"
        };

        addLog(expert, responses[expert]);
        setActiveExpert(null);
    };

    const addLog = (role, text) => {
        setLogs(prev => [...prev, { role, text, timestamp: new Date().toLocaleTimeString() }]);
    };

    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    return (
        <div className="min-h-screen bg-black text-slate-200 font-mono flex flex-col">
            {/* Header */}
            <header className="border-b border-slate-800 p-4 flex items-center justify-between bg-slate-900/50 backdrop-blur">
                <div className="flex items-center gap-3">
                    <Bot className="text-cyan-400 w-8 h-8" />
                    <div>
                        <h1 className="font-bold text-white text-lg">CEREBRO MAESTRO</h1>
                        <p className="text-xs text-slate-500">Etiquetado de IA v1.0</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    {Object.entries(EXPERTS).map(([key, data]) => (
                        <div key={key} className={`flex items-center gap-2 text-xs ${activeExpert === key ? 'opacity-100 scale-110' : 'opacity-40'} transition-all duration-300`}>
                            {data.icon}
                            <span className={`text-${data.color}-400 font-bold`}>{data.name}</span>
                        </div>
                    ))}
                </div>
            </header>

            {/* Main Chat/Console Area */}
            <main className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence>
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-4 ${log.role === 'USER' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className={`max-w-3xl p-4 rounded-xl border ${log.role === 'USER' ? 'bg-slate-800 border-slate-700' :
                                    log.role === 'SYSTEM' ? 'bg-slate-900/50 border-dashed border-slate-800 text-xs font-mono text-cyan-500' :
                                        'bg-slate-900 border-slate-700'
                                }`}>
                                <div className="flex items-center gap-2 mb-2 border-b border-slate-700/50 pb-2">
                                    {EXPERTS[log.role]?.icon || <Bot size={14} />}
                                    <span className={`text-xs font-bold uppercase text-${EXPERTS[log.role]?.color || 'slate'}-400`}>
                                        {EXPERTS[log.role]?.name || log.role}
                                    </span>
                                    <span className="text-[10px] text-slate-600 ml-auto">{log.timestamp}</span>
                                </div>
                                <p className="whitespace-pre-wrap">{log.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {activeExpert && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center py-8">
                        <div className="flex items-center gap-3 text-cyan-400 animate-pulse">
                            {EXPERTS[activeExpert]?.icon}
                            <span className="text-sm">Procesando con {EXPERTS[activeExpert]?.name}...</span>
                        </div>
                    </motion.div>
                )}
            </main>

            {/* Input Area */}
            <footer className="p-4 border-t border-slate-800 bg-slate-900/50">
                <form onSubmit={handleSubmit} className="max-w-4xl mx-auto relative flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => setIsListening(!isListening)}
                        className={`p-3 rounded-full transition-all ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                    >
                        <Mic />
                    </button>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Habla con el Cerebro Maestro (Ej: 'Diseña una base de datos para...')"
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-600"
                    />

                    <button
                        type="submit"
                        disabled={!input.trim()}
                        className="p-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <Send size={20} />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default EtiquetadoDashboard;
