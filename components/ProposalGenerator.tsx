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

    const [generatorMode, setGeneratorMode] = useState<'ai' | 'manual'>('ai');
    const [activeStep, setActiveStep] = useState(1);

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

    const renderManualStep = () => {
        switch (activeStep) {
            case 1:
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
                            <h3 className="text-xl font-heading font-black text-mh-blue uppercase tracking-widest mb-8 flex items-center gap-3">
                                <User size={20} className="text-mh-gold" />
                                Paso 1: Perfil del Especialista
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
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
                            <h3 className="text-xl font-heading font-black text-mh-blue uppercase tracking-widest mb-8 flex items-center gap-3">
                                <Target size={20} className="text-mh-gold" />
                                Paso 2: Análisis de Situación
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Diagnóstico (Situación Actual)</label>
                                    <textarea name="currentSituation" value={formData.currentSituation} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-mh-blue text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all h-32 leading-relaxed" placeholder="Describe los retos actuales..." required />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Metas a Corto Plazo</label>
                                    <textarea name="goals" value={formData.goals} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-mh-blue text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all h-32 leading-relaxed" placeholder="Qué desea lograr..." required />
                                </div>
                            </div>
                            <div className="mt-8">
                                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Cita Directa de la Sesión</label>
                                <textarea name="meetingNotes" value={formData.meetingNotes} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-mh-blue text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all h-24 leading-relaxed italic" placeholder="Ej: 'Me interesa el espacio porque mis pacientes...'" />
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
                            <h3 className="text-xl font-heading font-black text-mh-blue uppercase tracking-widest mb-8 flex items-center gap-3">
                                <Zap size={20} className="text-mh-gold" />
                                Paso 3: Configuración de la Solución
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8 mb-8 text-sm">
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
                                            <input type="text" value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all" placeholder="Beneficio clave..." />
                                            <button type="button" onClick={() => removeBenefit(index)} className="w-8 h-8 rounded-full hover:bg-red-50 text-slate-300 hover:text-red-500 transition-colors flex items-center justify-center font-bold">×</button>
                                        </div>
                                    ))}
                                </div>
                                <button type="button" onClick={addBenefit} className="text-[10px] font-black uppercase tracking-[0.2em] text-mh-gold hover:text-yellow-600 transition-colors">+ Agregar Beneficio</button>
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="space-y-8 animate-fade-in">
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100 relative overflow-hidden">
                            <h3 className="text-xl font-heading font-black text-mh-blue uppercase tracking-widest mb-8 flex items-center gap-3">
                                <DollarSign size={20} className="text-mh-gold" />
                                Paso 4: Inversión y Cierre
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Estimado Mensual</label>
                                        <input type="text" name="priceEstimate" value={formData.priceEstimate} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-2xl font-black text-mh-blue focus:ring-2 focus:ring-mh-gold outline-none transition-all" required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-purple-400 ml-1">Bonificación Especial</label>
                                        <input type="text" name="discountApplied" value={formData.discountApplied} onChange={handleInputChange} className="w-full bg-purple-50/50 border border-purple-100 rounded-2xl px-5 py-4 text-purple-900 font-medium focus:ring-2 focus:ring-purple-400 outline-none transition-all" placeholder="Ej: 50% dscto en matrícula..." />
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Siguientes Pasos</label>
                                        <textarea name="nextSteps" value={formData.nextSteps} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all h-20" placeholder="Ej: Agendar visita..." required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Términos de Pago</label>
                                        <input type="text" name="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all" placeholder="Ej: Mensualidad anticipada..." />
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h3 className="text-lg font-heading font-black text-mh-blue uppercase tracking-widest mb-6 flex items-center gap-3">
                                    <CreditCard size={18} className="text-mh-gold" />
                                    Canal de Recaudo
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { id: 'MedHause', label: 'Cuenta Corporativa', sub: 'MedHause SAS' },
                                        { id: 'Pedro', label: 'Dr. Pedro Vergara', sub: 'CEO / Estrategia' },
                                        { id: 'Mafe', label: 'Ing. María Fernanda', sub: 'Admin / Operaciones' }
                                    ].map((option) => (
                                        <label key={option.id} className={`relative flex flex-col p-6 rounded-3xl border-2 transition-all cursor-pointer group hover:scale-[1.02] ${formData.paymentReceiver === option.id ? 'border-mh-gold bg-mh-gold/5 shadow-lg shadow-mh-gold/5' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
                                            <input type="radio" name="paymentReceiver" value={option.id} checked={formData.paymentReceiver === option.id} onChange={handleInputChange} className="absolute top-4 right-4 w-5 h-5 text-mh-gold focus:ring-mh-gold border-slate-300" />
                                            <span className="text-sm font-black text-mh-blue uppercase mb-1">{option.label}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{option.sub}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-mh-gold selection:text-mh-blue">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-mh-blue/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-mh-gold/5 rounded-full blur-[120px]"></div>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 md:py-20">
                <header className="mb-12 text-center animate-fade-in">
                    <div className="flex justify-center gap-4 mb-8">
                        <button
                            onClick={() => setGeneratorMode('ai')}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${generatorMode === 'ai' ? 'bg-slate-900 text-mh-gold shadow-lg ring-2 ring-mh-gold/20' : 'bg-white text-slate-400 hover:text-mh-blue'}`}
                        >
                            <Brain size={14} className="inline mr-2" /> Análisis IA
                        </button>
                        <button
                            onClick={() => setGeneratorMode('manual')}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${generatorMode === 'manual' ? 'bg-slate-900 text-mh-gold shadow-lg ring-2 ring-mh-gold/20' : 'bg-white text-slate-400 hover:text-mh-blue'}`}
                        >
                            <User size={14} className="inline mr-2" /> Modo Presencial
                        </button>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-heading font-black text-mh-blue leading-none mb-4 tracking-tighter">
                        PROPOSAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold to-yellow-600">GENERATOR</span>
                    </h1>
                    <p className="text-slate-500 text-lg md:text-xl font-light max-w-2xl mx-auto italic">
                        {generatorMode === 'ai' ? '"Estrategia guiada por datos y transcripciones."' : '"Construcción personalizada paso a paso."'}
                    </p>
                </header>

                {generatorMode === 'ai' ? (
                    <div className="space-y-8">
                        {/* AI Analysis Block */}
                        <section className="bg-slate-900 text-white rounded-[2.5rem] shadow-2xl shadow-mh-blue/20 overflow-hidden relative border border-white/5">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <div className="relative z-10 p-8 md:p-12">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                    <h2 className="text-2xl font-heading font-black flex items-center gap-3 uppercase tracking-wider">
                                        <Brain className="text-mh-gold" size={28} /> Inteligencia de Ventas
                                    </h2>
                                </div>
                                <div className="space-y-6">
                                    <div className="relative">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-mh-gold mb-2 block ml-1">Gemini API Key</label>
                                        <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all placeholder:text-slate-600" />
                                    </div>
                                    <div className="relative">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-mh-gold mb-2 block ml-1">Transcripción de la Reunión</label>
                                        <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="Pega aquí el texto..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-mh-gold outline-none transition-all h-32 placeholder:text-slate-600" />
                                    </div>
                                    {error && <div className="text-red-400 text-sm bg-red-400/10 p-4 rounded-xl border border-red-400/20">{error}</div>}
                                    <button onClick={handleAnalyze} disabled={isAnalyzing} className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all bg-gradient-to-r from-mh-gold to-yellow-600 text-mh-blue shadow-lg">
                                        {isAnalyzing ? 'Procesando...' : 'Generar Inteligencia de Venta'}
                                    </button>
                                </div>
                            </div>
                        </section>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
                                <h3 className="text-xl font-heading font-black text-mh-blue uppercase tracking-widest mb-8 flex items-center gap-3"><User size={20} className="text-mh-gold" /> Perfil del Especialista</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <input type="text" name="doctorName" value={formData.doctorName} onChange={handleInputChange} placeholder="Nombre" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4" required />
                                    <input type="text" name="specialty" value={formData.specialty} onChange={handleInputChange} placeholder="Especialidad" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4" required />
                                </div>
                                <div className="grid md:grid-cols-2 gap-8 mt-8">
                                    <textarea name="currentSituation" value={formData.currentSituation} onChange={handleInputChange} placeholder="Situación actual..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 h-32" required />
                                    <textarea name="goals" value={formData.goals} onChange={handleInputChange} placeholder="Metas..." className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 h-32" required />
                                </div>
                            </div>

                            <div className="bg-mh-blue rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative">
                                <h3 className="text-xl font-heading font-black text-white uppercase tracking-widest mb-6"><Target size={20} className="inline text-mh-gold mr-3" /> Diferencial Personalizado</h3>
                                <textarea name="meetingNotes" value={formData.meetingNotes} onChange={handleInputChange} className="w-full bg-white/10 border border-white/20 rounded-2xl px-6 py-5 text-white text-lg italic h-32" />
                            </div>

                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl">
                                    <h3 className="text-lg font-heading font-black text-mh-blue uppercase tracking-widest mb-8"><Zap size={18} className="inline text-mh-gold mr-3" /> Configuración</h3>
                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        <select name="recommendedPlan" value={formData.recommendedPlan} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4">
                                            <option value="Membership">Membresía</option>
                                            <option value="Visitante">Visitante</option>
                                        </select>
                                        <input type="number" name="hoursPerMonth" value={formData.hoursPerMonth} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4" />
                                    </div>
                                    <div className="space-y-3">
                                        {formData.keyBenefits.map((b, i) => (
                                            <div key={i} className="flex gap-2">
                                                <input type="text" value={b} onChange={(e) => handleBenefitChange(i, e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2" />
                                                <button type="button" onClick={() => removeBenefit(i)}>×</button>
                                            </div>
                                        ))}
                                        <button type="button" onClick={addBenefit} className="text-xs text-mh-gold font-bold">+ Agregar Beneficio</button>
                                    </div>
                                </div>
                                <div className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl">
                                    <h3 className="text-lg font-heading font-black text-mh-blue uppercase tracking-widest mb-8">Inversión</h3>
                                    <input type="text" name="priceEstimate" value={formData.priceEstimate} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-xl font-black mb-4" />
                                    <textarea name="nextSteps" value={formData.nextSteps} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 h-24" />
                                </div>
                            </div>

                            <div className="bg-[#FAF5FF] border border-purple-100 rounded-[2.5rem] p-8 md:p-12 shadow-inner relative overflow-hidden">
                                <h3 className="text-xl font-heading font-black text-purple-900 uppercase tracking-widest mb-8 flex items-center gap-3">
                                    <List size={22} className="text-purple-600" />
                                    Administrative Details
                                </h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-purple-400 ml-1">Bonificación Especial</label>
                                        <input type="text" name="discountApplied" value={formData.discountApplied} onChange={handleInputChange} className="w-full bg-white border border-purple-200 rounded-2xl px-5 py-4 text-purple-900 font-medium focus:ring-2 focus:ring-purple-400 outline-none transition-all" placeholder="Ej: 50% dscto en matrícula..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-purple-400 ml-1">Términos de Pago</label>
                                        <input type="text" name="paymentTerms" value={formData.paymentTerms} onChange={handleInputChange} className="w-full bg-white border border-purple-200 rounded-2xl px-5 py-4 text-purple-900 font-medium focus:ring-2 focus:ring-purple-400 outline-none transition-all" placeholder="Ej: Mensualidad anticipada..." />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border border-slate-100">
                                <h3 className="text-lg font-heading font-black text-mh-blue uppercase tracking-widest mb-8 flex items-center gap-3">
                                    <CreditCard size={18} className="text-mh-gold" />
                                    Canal de Recaudo
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {[
                                        { id: 'MedHause', label: 'Cuenta Corporativa', sub: 'MedHause SAS' },
                                        { id: 'Pedro', label: 'Dr. Pedro Vergara', sub: 'CEO / Estrategia' },
                                        { id: 'Mafe', label: 'Ing. María Fernanda', sub: 'Admin / Operaciones' }
                                    ].map((option) => (
                                        <label key={option.id} className={`relative flex flex-col p-6 rounded-3xl border-2 transition-all cursor-pointer group hover:scale-[1.02] ${formData.paymentReceiver === option.id ? 'border-mh-gold bg-mh-gold/5 shadow-lg shadow-mh-gold/5' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
                                            <input type="radio" name="paymentReceiver" value={option.id} checked={formData.paymentReceiver === option.id} onChange={handleInputChange} className="absolute top-4 right-4 w-5 h-5 text-mh-gold focus:ring-mh-gold border-slate-300" />
                                            <span className="text-sm font-black text-mh-blue uppercase mb-1">{option.label}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{option.sub}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-12 flex justify-end">
                                <button type="submit" className="bg-mh-blue text-white px-12 py-5 rounded-full font-black uppercase tracking-widest shadow-2xl transition-all hover:scale-105 active:scale-95">
                                    Construir Propuesta <ChevronRight size={18} className="inline ml-2 text-mh-gold" />
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="space-y-12">
                        {/* Manual Steps Indicator */}
                        <div className="flex justify-center mb-16">
                            <div className="flex items-center gap-4 md:gap-8">
                                {[1, 2, 3, 4].map((s) => (
                                    <React.Fragment key={s}>
                                        <div className="flex flex-col items-center gap-2">
                                            <button
                                                onClick={() => setActiveStep(s)}
                                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black transition-all ${activeStep >= s ? 'bg-mh-blue text-white shadow-xl scale-110' : 'bg-slate-200 text-slate-400'}`}
                                            >
                                                {s}
                                            </button>
                                        </div>
                                        {s < 4 && <div className={`w-8 md:w-16 h-1 rounded-full ${activeStep > s ? 'bg-mh-blue' : 'bg-slate-200'}`} />}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            {renderManualStep()}

                            <div className="mt-12 flex items-center justify-between border-t border-slate-200 pt-8">
                                <button
                                    type="button"
                                    onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
                                    disabled={activeStep === 1}
                                    className="text-slate-400 hover:text-mh-blue font-black uppercase tracking-widest text-xs disabled:opacity-30"
                                >
                                    Anterior
                                </button>

                                {activeStep < 4 ? (
                                    <button
                                        type="button"
                                        onClick={() => setActiveStep(activeStep + 1)}
                                        className="bg-slate-900 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
                                    >
                                        Siguiente Paso
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-mh-blue text-white px-12 py-5 rounded-full font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
                                    >
                                        Construir Propuesta <ChevronRight size={18} className="text-mh-gold" />
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                )}
            </div>

            <footer className="py-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">
                MedHause Prestige System • MD Management Dashboard v2.1
            </footer>
        </div>
    );
};
