const normalizeCV = (aiData) => {
    return {
        personal: {
            name: aiData.personal?.name || "Nombre no proporcionado",
            email: aiData.personal?.email || "",
            location: aiData.personal?.location || "",
            phone: aiData.personal?.phone || "",
            summary: aiData.personal?.summary || ""
        },
        experience: Array.isArray(aiData.experience) ? aiData.experience.map(exp => ({
            id: exp.id || Math.random().toString(36).substr(2, 9),
            role: exp.role || "Cargo",
            company: exp.company || "Empresa",
            date: exp.date || "",
            description: Array.isArray(exp.achievements) ? exp.achievements.join('\n') : (exp.description || ""),
            achievements: Array.isArray(exp.achievements) ? exp.achievements : []
        })) : [],
        education: Array.isArray(aiData.education) ? aiData.education.map(edu => ({
            id: edu.id || Math.random().toString(36).substr(2, 9),
            degree: edu.degree || "Título",
            school: edu.school || "Institución",
            date: edu.date || ""
        })) : [],
        skills: Array.isArray(aiData.skills) ? aiData.skills : []
    };
};

module.exports = { normalizeCV };
