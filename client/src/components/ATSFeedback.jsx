import React from 'react';
import { Target, AlertCircle, Lightbulb, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * ATSFeedback: Displays the results of the ATS optimization process.
 */
const ATSFeedback = ({ atsData }) => {
    if (!atsData) return null;

    const getScoreColor = (score) => {
        if (score >= 80) return 'text-emerald-400';
        if (score >= 60) return 'text-yellow-400';
        return 'text-rose-400';
    };

    const getScoreBg = (score) => {
        if (score >= 80) return 'bg-emerald-500/10 border-emerald-500/20';
        if (score >= 60) return 'bg-yellow-500/10 border-yellow-500/20';
        return 'bg-rose-500/10 border-rose-500/20';
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-5 rounded-2xl border ${getScoreBg(atsData.match_score)} mb-6 backdrop-blur-sm shadow-xl`}
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${atsData.match_score >= 80 ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                        <Target className="text-white" size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">Afinidad con la Vacante</h3>
                        <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mt-0.5">ATS Scanner v5.1</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className={`text-3xl font-black ${getScoreColor(atsData.match_score)}`}>
                        {atsData.match_score}%
                    </span>
                </div>
            </div>

            {/* Missing Keywords */}
            {atsData.missing_keywords && atsData.missing_keywords.length > 0 && (
                <div className="mb-6">
                    <div className="flex items-center gap-2 mb-3 text-rose-300">
                        <AlertCircle size={14} />
                        <p className="text-xs font-bold uppercase tracking-wide">Faltan palabras clave críticas:</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {atsData.missing_keywords.map((kw, i) => (
                            <span
                                key={i}
                                className="px-2.5 py-1 bg-rose-500/10 text-rose-200 text-[10px] font-bold rounded-md border border-rose-500/20 uppercase tracking-tighter"
                            >
                                + {kw}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* AI Advice */}
            <div className="p-4 bg-slate-950/50 rounded-xl border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400">
                    <Lightbulb size={16} />
                    <span className="text-xs font-bold uppercase tracking-wide">Consejo de Alex</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed italic">
                    "{atsData.ats_advice}"
                </p>
                <div className="flex items-center gap-2 pt-2 text-[10px] font-medium text-emerald-400/70 border-t border-white/5">
                    <CheckCircle2 size={12} />
                    <span>CV Optimizado con metodología STAR</span>
                </div>
            </div>
        </motion.div>
    );
};

export default ATSFeedback;
