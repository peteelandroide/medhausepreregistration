import React, { useState, useEffect } from 'react';
import { ProposalData } from '../types';
import {
    FileText, Save, Sparkles, Brain, CreditCard,
    DollarSign, List, ChevronRight, User, Stethoscope,
    Target, Zap, AlertCircle
} from 'lucide-react';
import { analyzeTranscript } from '../utils/gemini';

export const ProposalGenerator: React.FC = () => {
    const [apiKey, setApiKey] = useState((import.meta as any).env.VITE_GEMINI_API_KEY || '');
    const [transcript, setTranscript] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState<ProposalData>({
        doctorName: '',
        specialty: '',
        currentSituation: '',
        goals: '',
        recommendedPlan: 'Membership',
        hoursPerMonth: 20,
        priceEstimate: '$2.000.000 COP',
        keyBenefits: [''],
        nextSteps: '',
        customNotes: '',
        meetingNotes: '',
        paymentReceiver: 'MedHause',
        mafeNotes: '',
        discountApplied: '',
        paymentTerms: ''
    });

    useEffect(() => {
        const stateData = window.history.state as ProposalData;
        if (stateData && stateData.doctorName) {
            setFormData(stateData);
        }
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBenefitChange = (index: number, value: string) => {
        const newBenefits = [...formData.keyBenefits];
        newBenefits[index] = value;
        setFormData(prev => ({ ...prev, keyBenefits: newBenefits }));
    };

    const addBenefit = () => {
        setFormData(prev => ({ ...prev, keyBenefits: [...prev.keyBenefits, ''] }));
    };

    const removeBenefit = (index: number) => {
        const newBenefits = [...formData.keyBenefits];
        newBenefits.splice(index, 1);
        setFormData(prev => ({ ...prev, keyBenefits: newBenefits }));
    };

    const handleAnalyze = async () => {
        if (!apiKey) {
            setError('Por favor ingresa tu API Key de Google Gemini');
            return;
        }
        if (!transcript) {
            setError('Por favor ingresa el texto de la reunión para analizar');
            return;
        }

        setIsAnalyzing(true);
        setError('');

        try {
            const result = await analyzeTranscript(transcript, apiKey);
            setFormData(prev => ({
                ...prev,
                ...result,
                keyBenefits: result.keyBenefits || prev.keyBenefits,
                recommendedPlan: (result.recommendedPlan as 'Membership' | 'Visitante') || prev.recommendedPlan,
                paymentReceiver: prev.paymentReceiver
            }));
        } catch (err: any) {
            setError(err.message || 'Error al analizar el transcript');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        url.searchParams.set('view', 'proposal-preview');
        window.history.pushState(formData, '', url.toString());
        window.dispatchEvent(new PopStateEvent('popstate'));
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-mh-gold selection:text-mh-blue">
            {/* Background Decor */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-mh-blue/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-mh-gold/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20">
                {/* Header Section */}
                <header className="mb-12 text-center animate-fade-in">
                    <div className="inline-flex items-center gap-2 text-mh-blue border border-mh-blue/10 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 bg-white/50 backdrop-blur-sm shadow-sm">
                        <Zap size={14} className="text-mh-gold" /> Sales Intelligence Tool
                    </div>
                    <h1 className="text-4xl md:text-6xl font-heading font-black text-mh-blue leading-none mb-4 tracking-tighter">
                        PROPOSAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold to-yellow-600">GENERATOR</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-light max-w-2xl mx-auto italic">
                        "Donde la estrategia médica se encuentra con la excelencia comercial."
                    </p>
                </header>

                {/* AI Analysis Block */}
                <section className="mb-8 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl shadow-mh-blue/20 overflow-hidden relative group border border-white/5">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="absolute top-0 right-0 p-40 bg-mh-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10 p-8 md:p-12">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                            <div>
                                <h2 className="text-2xl font-heading font-black flex items-center gap-3 uppercase tracking-wider">
                                    <Brain className="text-mh-gold" size={28} />
                                    Análisis Inteligente
                                </h2>
                                <p className="text-slate-400 text-sm mt-1">Sincroniza el transcript de la sesión para autocompletar la propuesta.</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="relative">
                                <label className="text-[10px] font-black uppercase tracking-widest text-mh-gold mb-2 block ml-1">Gemini API Key</label>
                                <input
                                    type="password"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    placeholder="Google Gemini Key (Pre-configurada)"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all placeholder:text-slate-600 hover:bg-white/10"
                                />
                            </div>

                            <div className="relative">
                                <label className="text-[10px] font-black uppercase tracking-widest text-mh-gold mb-2 block ml-1">Transcripción de la Reunión</label>
                                <textarea
                                    value={transcript}
                                    onChange={(e) => setTranscript(e.target.value)}
                                    placeholder="Pega aquí el texto de la conversación con el doctor..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all h-32 placeholder:text-slate-600 custom-scrollbar hover:bg-white/10"
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20">
                                    <AlertCircle size={16} />
                                    {error}
                                </div>
                            )}

                            <button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className={`w-full relative py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all overflow-hidden flex items-center justify-center gap-3 active:scale-[0.98] ${isAnalyzing
                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-mh-gold to-yellow-600 text-mh-blue shadow-[0_0_30px_rgba(242,214,162,0.2)] hover:shadow-[0_0_40px_rgba(242,214,162,0.4)] hover:brightness-110'
                                    }`}
                            >
                                {isAnalyzing ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 border-2 border-slate-500 border-t-white rounded-full animate-spin"></div>
                                        Procesando con Red Neuronal...
                                    </div>
                                ) : (
                                    <>
                                        <Sparkles size={20} />
                                        Generar Inteligencia de Venta
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </section>

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-mh-gold/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>

                        <h3 className="text-xl font-heading font-black text-mh-blue uppercase tracking-widest mb-8 flex items-center gap-3">
                            <User size={20} className="text-mh-gold" />
                            Perfil del Especialista
                        </h3>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nombre Completo</label>
                                <div className="relative group">
                                    <input type="text" name="doctorName" value={formData.doctorName} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-mh-blue font-medium focus:ring-2 focus:ring-mh-gold outline-none transition-all" required />
                                    <User className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-mh-gold transition-colors" size={18} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Especialidad Principal</label>
                                <div className="relative group">
                                    <input type="text" name="specialty" value={formData.specialty} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-mh-blue font-medium focus:ring-2 focus:ring-mh-gold outline-none transition-all" required />
                                    <Stethoscope className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-mh-gold transition-colors" size={18} />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 grid md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Diagnóstico (Situación Actual)</label>
                                <textarea name="currentSituation" value={formData.currentSituation} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-mh-blue text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all h-32 leading-relaxed" placeholder="Describe los retos actuales..." required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Metas a Corto Plazo (6 meses)</label>
                                <textarea name="goals" value={formData.goals} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-mh-blue text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all h-32 leading-relaxed" placeholder="Qué desea lograr en MedHause..." required />
                            </div>
                        </div>
                    </div>

                    {/* Social Proof Section (Meeting Notes) */}
                    <div className="bg-mh-blue rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 translate-x-1/2"></div>

                        <h3 className="text-xl font-heading font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                            <Target size={20} className="text-mh-gold" />
                            Diferencial Personalizado
                        </h3>
                        <p className="text-slate-300 text-sm mb-6 max-w-xl font-light">
                            Este texto aparecerá como una cita directa en la propuesta para demostrar que escuchamos sus necesidades específicas.
                        </p>

                        <textarea
                            name="meetingNotes"
                            value={formData.meetingNotes}
                            onChange={handleInputChange}
                            className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-5 text-slate-100 text-lg italic focus:ring-2 focus:ring-mh-gold outline-none transition-all h-40 leading-relaxed placeholder:text-slate-500 shadow-inner"
                            placeholder="Ej: 'Pedro, me interesa mucho el espacio premium porque mis pacientes son de alto perfil...'"
                        />
                    </div>

                    {/* Solution & Financials */}
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100">
                            <h3 className="text-lg font-heading font-black text-mh-blue uppercase tracking-widest mb-8 flex items-center gap-3">
                                <Zap size={18} className="text-mh-gold" />
                                Configuración de Solución
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6 mb-8 text-sm">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Modelo de Membrecía</label>
                                    <select name="recommendedPlan" value={formData.recommendedPlan} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-mh-blue font-bold focus:ring-2 focus:ring-mh-gold outline-none appearance-none cursor-pointer">
                                        <option value="Membership">Membresía Premium</option>
                                        <option value="Visitante">Plan Visitante</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Horas Mensuales</label>
                                    <input type="number" name="hoursPerMonth" value={formData.hoursPerMonth} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-mh-blue font-bold focus:ring-2 focus:ring-mh-gold outline-none transition-all" required />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Propuesta de Valor (Bullets)</label>
                                <div className="space-y-3">
                                    {formData.keyBenefits.map((benefit, index) => (
                                        <div key={index} className="flex gap-3 items-center group">
                                            <div className="w-8 h-8 rounded-full bg-mh-gold/10 flex items-center justify-center shrink-0">
                                                <span className="text-mh-gold text-xs font-black">{index + 1}</span>
                                            </div>
                                            <input
                                                type="text"
                                                value={benefit}
                                                onChange={(e) => handleBenefitChange(index, e.target.value)}
                                                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all"
                                                placeholder="Escribe un beneficio clave..."
                                            />
                                            <button type="button" onClick={() => removeBenefit(index)} className="w-8 h-8 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors flex items-center justify-center font-bold">×</button>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={addBenefit} className="text-[10px] font-black uppercase tracking-[0.2em] text-mh-gold hover:text-yellow-600 transition-colors flex items-center gap-1 mt-4">
                                    + Agregar Beneficio Personalizado
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-slate-100 flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-heading font-black text-mh-blue uppercase tracking-widest mb-8 flex items-center gap-3">
                                    <DollarSign size={18} className="text-mh-gold" />
                                    Inversión
                                </h3>

                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Estimado Mensual</label>
                                        <input type="text" name="priceEstimate" value={formData.priceEstimate} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-2xl font-black text-mh-blue focus:ring-2 focus:ring-mh-gold outline-none transition-all" required />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Siguientes Pasos</label>
                                        <textarea name="nextSteps" value={formData.nextSteps} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all h-24" placeholder="Ej: Agendar visita..." required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mafe's Section - Admin Style */}
                    <div className="bg-[#FAF5FF] border border-purple-100 rounded-[2.5rem] p-8 md:p-12 shadow-inner relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 bg-purple-600/5 rounded-full blur-2xl"></div>

                        <h3 className="text-xl font-heading font-black text-purple-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                            <List size={22} className="text-purple-600" />
                            Administrative Intelligence
                            <span className="text-[10px] font-medium lowercase bg-purple-600 text-white px-2 py-0.5 rounded-full opacity-50 ml-2">Internal Panel</span>
                        </h3>

                        <div className="grid md:grid-cols-2 gap-8 mb-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-purple-400 ml-1">Promoción / Bonificación Especial</label>
                                <input
                                    type="text"
                                    name="discountApplied"
                                    value={formData.discountApplied}
                                    onChange={handleInputChange}
                                    className="w-full bg-white border border-purple-200 rounded-2xl px-5 py-4 text-purple-900 font-medium focus:ring-2 focus:ring-purple-400 outline-none shadow-sm transition-all"
                                    placeholder="Ej: 50% dscto en matrícula..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-purple-400 ml-1">Términos de Liquidación</label>
                                <input
                                    type="text"
                                    name="paymentTerms"
                                    value={formData.paymentTerms}
                                    onChange={handleInputChange}
                                    className="w-full bg-white border border-purple-200 rounded-2xl px-5 py-4 text-purple-900 font-medium focus:ring-2 focus:ring-purple-400 outline-none shadow-sm transition-all"
                                    placeholder="Ej: Mensualidad anticipada..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-purple-400 ml-1">Observaciones Estratégicas</label>
                            <textarea
                                name="mafeNotes"
                                value={formData.mafeNotes}
                                onChange={handleInputChange}
                                className="w-full bg-white border border-purple-200 rounded-2xl px-6 py-5 text-purple-900 text-sm focus:ring-2 focus:ring-purple-400 outline-none transition-all h-28 italic shadow-sm"
                                placeholder="Notas clave para Mafe o Pedro sobre este cierre..."
                            />
                        </div>
                    </div>

                    {/* Payment Account Selection */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
                        <h3 className="text-lg font-heading font-black text-mh-blue uppercase tracking-widest mb-8 flex items-center gap-3">
                            <CreditCard size={18} className="text-mh-gold" />
                            Canal de Recaudo
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                                { id: 'MedHause', label: 'Cuenta Corporativa', sub: 'MedHause SAS', detail: 'Principal' },
                                { id: 'Pedro', label: 'Dr. Pedro Vergara', sub: 'CEO / Estrategia', detail: 'Personal' },
                                { id: 'Mafe', label: 'Ing. María Fernanda', sub: 'Admin / Operaciones', detail: 'Personal' }
                            ].map((option) => (
                                <label key={option.id} className={`relative flex flex-col p-6 rounded-3xl border-2 transition-all cursor-pointer group hover:scale-[1.02] ${formData.paymentReceiver === option.id ? 'border-mh-gold bg-mh-gold/5 shadow-lg shadow-mh-gold/5' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
                                    <input
                                        type="radio"
                                        name="paymentReceiver"
                                        value={option.id}
                                        checked={formData.paymentReceiver === option.id}
                                        onChange={handleInputChange}
                                        className="absolute top-4 right-4 w-5 h-5 text-mh-gold focus:ring-mh-gold border-slate-300"
                                    />
                                    <span className="text-sm font-black text-mh-blue uppercase mb-1">{option.label}</span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">{option.sub}</span>
                                    <div className="mt-auto inline-flex items-center gap-1 text-[10px] font-black text-mh-gold uppercase tracking-tighter">
                                        <Zap size={10} /> {option.detail}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Bottom CTA Area */}
                    <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-slate-200">
                        <div className="text-center md:text-left">
                            <p className="text-mh-blue font-heading font-black text-lg uppercase tracking-tight">¿Todo listo para el cierre?</p>
                            <p className="text-slate-400 text-sm">Revisa bien los beneficios personalizados antes de imprimir.</p>
                        </div>
                        <button type="submit" className="group relative bg-mh-blue text-white px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-mh-blue/30 hover:shadow-mh-blue/50 hover:scale-105 active:scale-95 transition-all overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-mh-gold/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <span className="flex items-center gap-3 relative z-10">
                                Construir Propuesta <ChevronRight size={18} className="text-mh-gold" />
                            </span>
                        </button>
                    </div>
                </form>
            </div>

            <footer className="py-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
                MedHause Prestige System • MD Management Dashboard v2.0
            </footer>
        </div>
    );
};
