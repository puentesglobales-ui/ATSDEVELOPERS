import React from 'react';

/**
 * CVRenderer: A deterministic renderer that uses design tokens and AI-generated content.
 * This component is "stateless" and focuses on visual representation.
 */
const CVRenderer = ({ data, tokens }) => {
    if (!data || !tokens) return <div className="p-8 text-slate-500 uppercase tracking-widest text-xs animate-pulse">Cargando Renderizador...</div>;

    // Dynamic styles based on Gemini Tokens
    const styles = {
        container: {
            fontFamily: tokens.font === 'Serif' ? 'Georgia, "Times New Roman", serif' : 'Inter, system-ui, sans-serif',
            color: '#1e293b', // slate-800
            lineHeight: tokens.spacing === 'compact' ? '1.3' : '1.6',
            padding: '40mm 20mm', // standard margin
            backgroundColor: '#ffffff',
            minHeight: '297mm',
            width: '210mm',
            margin: '0 auto',
            boxSizing: 'border-box'
        },
        header: {
            borderBottom: `2px solid ${tokens.color || '#2563eb'}`,
            marginBottom: '20px',
            paddingBottom: '10px'
        },
        sectionTitle: {
            color: tokens.color || '#3b82f6',
            fontSize: '12pt',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            borderBottom: '1px solid #e2e8f0',
            marginBottom: '10px',
            marginTop: '20px'
        },
        roleTitle: {
            fontSize: '11pt',
            fontWeight: 'bold',
            marginBottom: '2px'
        },
        companyInfo: {
            fontSize: '10.5pt',
            fontWeight: '600',
            color: '#475569', // slate-600
            marginBottom: '5px'
        },
        achievementsList: {
            paddingLeft: '20px',
            marginBottom: '15px'
        }
    };

    return (
        <div style={styles.container} id="cv-document-renderer">
            {/* Header */}
            <header style={styles.header}>
                <h1 style={{ fontSize: '28pt', fontWeight: '800', marginBottom: '5px', color: '#0f172a' }}>
                    {data.personal.name}
                </h1>
                <div style={{ fontSize: '10pt', color: '#64748b', display: 'flex', gap: '15px' }}>
                    <span>{data.personal.email}</span>
                    {data.personal.phone && <span>{data.personal.phone}</span>}
                    {data.personal.location && <span>{data.personal.location}</span>}
                </div>
                <div style={{ marginTop: '15px', fontSize: '10.5pt', fontStyle: 'italic', color: '#334155' }}>
                    {data.personal.summary}
                </div>
            </header>

            {/* Experience */}
            <section>
                <h2 style={styles.sectionTitle}>Experiencia Profesional</h2>
                {data.experience.map((exp, i) => (
                    <div key={i} style={{ marginBottom: '20px' }}>
                        <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'baseline' }}>
                            <div style={styles.roleTitle}>{exp.role}</div>
                            <div style={{ marginLeft: 'auto', fontSize: '9pt', color: '#94a3b8', fontStyle: 'italic' }}>{exp.date}</div>
                        </div>
                        <div style={styles.companyInfo}>{exp.company}</div>
                        <ul style={styles.achievementsList}>
                            {(exp.achievements || []).map((ach, j) => (
                                <li key={j} style={{ fontSize: '10pt', marginBottom: '4px', listStyleType: 'square' }}>
                                    {ach}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>

            {/* Education */}
            {data.education && data.education.length > 0 && (
                <section>
                    <h2 style={styles.sectionTitle}>Formación Académica</h2>
                    {data.education.map((edu, i) => (
                        <div key={i} style={{ marginBottom: '10px' }}>
                            <div style={{ display: 'flex', justifyBetween: 'space-between', alignItems: 'baseline' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '10.5pt' }}>{edu.degree}</div>
                                <div style={{ marginLeft: 'auto', fontSize: '9pt', color: '#94a3b8' }}>{edu.date}</div>
                            </div>
                            <div style={{ fontSize: '10pt', color: '#475569' }}>{edu.school}</div>
                        </div>
                    ))}
                </section>
            )}

            {/* Skills */}
            {data.skills && data.skills.length > 0 && (
                <section>
                    <h2 style={styles.sectionTitle}>Competencias Técnicas</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {data.skills.map((skill, i) => (
                            <span key={i} style={{
                                fontSize: '9pt',
                                padding: '3px 8px',
                                backgroundColor: '#f1f5f9',
                                borderRadius: '4px',
                                border: '1px solid #e2e8f0',
                                color: '#475569'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default CVRenderer;
