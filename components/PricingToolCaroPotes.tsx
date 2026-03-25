import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    MessageCircle,
    ChevronRight,
    ChevronLeft,
    Stethoscope,
    ShieldCheck,
    Smartphone
} from 'lucide-react';
import { Footer } from './Footer';

// Use same Pixel ID if applicable, or generic
const DRA_POTES_PIXEL_ID = '908119245544966';

interface PricingToolCaroProps {
    onBack: () => void;
}

const procedures = [
  { name: 'Rinoplastia (Nariz)', minUSD: 4000, maxUSD: 15000 },
  { name: 'Blefaroplastia (Párpados)', minUSD: 3000, maxUSD: 8000 },
  { name: 'Otoplastia (Orejas)', minUSD: 3000, maxUSD: 8000 },
  { name: 'Lifting Facial / Ritidoplastia', minUSD: 7000, maxUSD: 15000 },
  { name: 'Mentoplastia', minUSD: 4000, maxUSD: 10000 },
  { name: 'Cervicoplastia (Cuello)', minUSD: 4000, maxUSD: 10000 },
  { name: 'Bichectomía', minUSD: 1500, maxUSD: 4000 },
];

const currencies = [
  { code: 'COP', name: 'Peso colombiano', rate: 4000 },
  { code: 'USD', name: 'Dólar estadounidense', rate: 1 },
  { code: 'MXN', name: 'Peso mexicano', rate: 17.5 },
  { code: 'EUR', name: 'Euro', rate: 0.92 },
];

const formatCurrency = (value: number, currency: string) => {
  try {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  } catch (error) {
    return `${currency} ${Math.round(value).toLocaleString('es-CO')}`;
  }
};

export const PricingToolCaroPotes: React.FC<PricingToolCaroProps> = ({ onBack }) => {
    const [currency, setCurrency] = useState('COP');
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Funnel State
    const [funnelStep, setFunnelStep] = useState(1);
    const [funnelData, setFunnelData] = useState({
        procedure: '',
        timeline: '',
        budget: '',
        name: '',
        age: '',
        phone: '',
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const currentRate = currencies.find(c => c.code === currency)?.rate || 1;

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setFunnelStep(1);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const message = `Hola Dra. Caro Potes, me gustaría recibir una valoración sin costo.\n\n*Mis Datos:*\n- Nombre: ${funnelData.name}\n- Edad: ${funnelData.age}\n\n*Me interesa:*\n- Procedimiento: ${funnelData.procedure}\n- Tiempo planeado: ${funnelData.timeline}\n- Presupuesto estimado: ${funnelData.budget}\n\n¡Quedo a la espera de sus indicaciones para mi valoración gratuita!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/573122104560?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        handleCloseModal();
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-mh-gold/30">
            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-mh-gold/10 px-6 py-4 flex justify-between items-center shadow-sm">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-slate-500 hover:text-mh-blue transition-colors group"
                >
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Volver
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-sm font-heading font-black tracking-tighter text-slate-900 uppercase">Dra. Caro Potes</span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-mh-gold font-bold">Otorrino & Cirugía Facial</span>
                </div>
                <div className="w-10"></div> {/* Spacer */}
            </header>

            {/* HERO MODULE */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0">
                    <img 
                        src="/dra-caro-tool/DSC05136 copia.jpg" 
                        alt="Background" 
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-950/90"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={sectionVariants}
                    >
                        <div className="inline-flex items-center gap-2 bg-mh-gold/10 text-mh-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-mh-gold/20 mb-6">
                            Guía de Inversión 2026
                        </div>
                        <h1 className="text-4xl md:text-6xl font-heading font-black leading-[1.1] tracking-tight mb-6">
                            ¿Cuánto cuesta revelar <br className="hidden md:block"/>
                            <span className="text-mh-gold italic">tu mejor versión?</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-slate-300 font-light leading-relaxed mb-10">
                            Tomar la decisión de realizarte una cirugía facial es un paso importante. He creado esta guía transparente para ayudarte a planificar tu inversión con confianza. Solicita tu <strong>valoración sin costo</strong> y demos el primer paso juntos.
                        </p>
                        
                        <button
                            onClick={() => document.getElementById('precios')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-mh-gold text-mh-gold rounded-full font-black uppercase tracking-widest text-xs hover:bg-mh-gold hover:text-slate-950 transition-all active:scale-95"
                        >
                            Ver Precios Estimados <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* PRICING TABLE MODULE */}
            <section id="precios" className="py-24 px-6 bg-[#FDFCFB]">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionVariants}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 uppercase">
                            Guía de <span className="text-mh-gold italic">Precios Estimados</span>
                        </h2>
                        <p className="text-slate-500 mt-4 max-w-xl mx-auto">
                            Estos valores son referenciales. Cada rostro es único y el presupuesto exacto se define tras tu valoración gratuita personalizada.
                        </p>
                    </motion.div>

                    <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
                        <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <span className="font-bold text-slate-700 uppercase tracking-wider text-sm">Procedimientos Faciales</span>
                            <div className="flex items-center gap-3">
                                <label htmlFor="currency-select" className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                                    Moneda:
                                </label>
                                <select
                                    id="currency-select"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="bg-white border border-slate-200 text-slate-800 text-sm rounded-xl focus:ring-mh-gold focus:border-mh-gold p-2 font-medium outline-none shadow-sm cursor-pointer"
                                    aria-label="Seleccionar moneda"
                                >
                                    {currencies.map((c) => (
                                        <option key={c.code} value={c.code}>
                                            {c.code} - {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-900 text-white text-[10px] md:text-xs uppercase tracking-widest">
                                        <th className="p-4 md:p-5 font-bold">Procedimiento (Otorrino & Facial)</th>
                                        <th className="p-4 md:p-5 text-right font-bold w-1/3 md:w-1/4">Desde</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {procedures.map((proc, index) => (
                                        <tr key={proc.name} className="hover:bg-slate-50 transition-colors group">
                                            <td className="p-4 md:p-5 font-semibold text-slate-800 flex items-center gap-2 md:gap-3 text-sm md:text-base">
                                                <div className="w-1.5 h-1.5 rounded-full bg-mh-gold group-hover:scale-150 transition-transform flex-shrink-0"></div>
                                                <span>{proc.name}</span>
                                            </td>
                                            <td className="p-4 md:p-5 text-right text-slate-600 font-medium text-sm md:text-base">
                                                {formatCurrency(proc.minUSD * currentRate, currency)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUE PROPOSITION MODULE */}
            <section className="py-24 px-6 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative order-2 lg:order-1">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                            <img src="/dra-caro-tool/DSC05214 copia.jpg" alt="Dra. Caro Potes" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-mh-gold rounded-[2rem] -z-10"></div>
                    </div>

                    <div className="order-1 lg:order-2 space-y-10">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sectionVariants}
                            className="space-y-6"
                        >
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-950 uppercase leading-none">
                                Resultados que <br />
                                <span className="text-mh-blue italic">celebran tu esencia.</span>
                            </h2>
                            <p className="text-slate-600 text-lg font-light leading-relaxed">
                                Como especialista en cirugía plástica facial y otorrinolaringología, mi enfoque es garantizar resultados anatómicos, hermosos y, sobre todo, funcionales. Tu capacidad de respirar y tu salud siempre serán lo primero.
                            </p>

                            <ul className="space-y-4 pt-4">
                                {[
                                    { text: "Doble Especialidad: Estética y Funcionalidad", icon: Stethoscope },
                                    { text: "Tecnología Ultrasónica para menor inflamación", icon: Sparkles },
                                    { text: "Valoración Inicial Totalmente Gratuita", icon: Heart }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                        <div className="w-10 h-10 bg-mh-blue/10 rounded-xl flex items-center justify-center text-mh-blue shrink-0">
                                            <item.icon size={20} />
                                        </div>
                                        <span className="font-semibold text-slate-700">{item.text}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-6">
                                <button
                                    onClick={handleOpenModal}
                                    className="inline-flex items-center gap-2 px-8 py-4 bg-mh-blue text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-900 transition-all shadow-lg active:scale-95"
                                >
                                    Solicitar Valoración Sin Costo <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />

            {/* LEAD CAPTURE MODAL - SIMPLIFIED */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
                    >
                        <div className="absolute inset-0" onClick={handleCloseModal}></div>
                        
                        <motion.div 
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Header Gradient */}
                            <div className="h-2 w-full bg-gradient-to-r from-mh-blue via-mh-gold to-mh-turquoise"></div>
                            
                            {/* Close Button */}
                            <button 
                                onClick={handleCloseModal}
                                className="absolute top-6 right-6 w-10 h-10 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full flex items-center justify-center transition-colors z-10"
                            >
                                ✕
                            </button>

                            <div className="p-8 md:p-10 overflow-y-auto">
                                {/* Progress Indicator */}
                                <div className="flex gap-2 mb-8">
                                    {[1, 2, 3, 4].map((step) => (
                                        <div key={step} className={`h-1.5 flex-1 rounded-full ${step <= funnelStep ? 'bg-mh-gold' : 'bg-slate-100'}`}></div>
                                    ))}
                                </div>

                                {/* Step 1: Procedure */}
                                {funnelStep === 1 && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-slate-900">¿Qué procedimiento te interesa evaluar?</h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {procedures.map((proc) => (
                                                <button
                                                    key={proc.name}
                                                    onClick={() => {
                                                        setFunnelData({ ...funnelData, procedure: proc.name });
                                                        setTimeout(() => setFunnelStep(2), 300);
                                                    }}
                                                    className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${funnelData.procedure === proc.name ? 'border-mh-gold bg-mh-gold/10 ring-1 ring-mh-gold' : 'border-slate-100 hover:border-mh-gold/30 hover:bg-slate-50'}`}
                                                >
                                                    <span className="font-bold text-slate-700">{proc.name}</span>
                                                    {funnelData.procedure === proc.name && <CheckCircle2 size={20} className="text-mh-gold" />}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Step 2: Timeline */}
                                {funnelStep === 2 && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-slate-900">¿Cuándo te gustaría operarte?</h3>
                                        <div className="grid grid-cols-1 gap-3">
                                            {['Lo antes posible', 'En el próximo mes', 'En los próximos 3-6 meses', 'Aún lo estoy planeando'].map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => {
                                                        setFunnelData({ ...funnelData, timeline: time });
                                                        setTimeout(() => setFunnelStep(3), 300);
                                                    }}
                                                    className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${funnelData.timeline === time ? 'border-mh-gold bg-mh-gold/10 ring-1 ring-mh-gold' : 'border-slate-100 hover:border-mh-gold/30 hover:bg-slate-50'}`}
                                                >
                                                    <span className="font-bold text-slate-700">{time}</span>
                                                    {funnelData.timeline === time && <CheckCircle2 size={20} className="text-mh-gold" />}
                                                </button>
                                            ))}
                                        </div>
                                        <button onClick={() => setFunnelStep(1)} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-4 hover:text-mh-gold flex items-center gap-1">
                                            <ChevronLeft size={12} /> Volver
                                        </button>
                                    </div>
                                )}

                                {/* Step 3: Budget */}
                                {funnelStep === 3 && (
                                    <div className="space-y-6">
                                        <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-slate-900">¿Cuál es tu presupuesto estimado?</h3>
                                        <p className="text-sm text-slate-500 font-light">Esto nos ayuda a brindarte mejores opciones de financiación bancaria si las requieres.</p>
                                        <div className="grid grid-cols-1 gap-3">
                                            {['Menos de 10 millones COP', 'De 10 a 15 millones COP', 'De 15 a 20 millones COP', 'Más de 20 millones COP o pago en USD'].map((budget) => (
                                                <button
                                                    key={budget}
                                                    onClick={() => {
                                                        setFunnelData({ ...funnelData, budget: budget });
                                                        setTimeout(() => setFunnelStep(4), 300);
                                                    }}
                                                    className={`p-4 rounded-2xl border text-left transition-all flex items-center justify-between ${funnelData.budget === budget ? 'border-mh-gold bg-mh-gold/10 ring-1 ring-mh-gold' : 'border-slate-100 hover:border-mh-gold/30 hover:bg-slate-50'}`}
                                                >
                                                    <span className="font-bold text-slate-700">{budget}</span>
                                                    {funnelData.budget === budget && <CheckCircle2 size={20} className="text-mh-gold" />}
                                                </button>
                                            ))}
                                        </div>
                                        <button onClick={() => setFunnelStep(2)} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-4 hover:text-mh-gold flex items-center gap-1">
                                            <ChevronLeft size={12} /> Volver
                                        </button>
                                    </div>
                                )}

                                {/* Step 4: Contact Info */}
                                {funnelStep === 4 && (
                                    <div className="space-y-6">
                                        <div className="text-center mb-6">
                                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <MessageCircle size={32} />
                                            </div>
                                            <h3 className="text-2xl font-heading font-black uppercase tracking-tight text-slate-900">¡Casi listos!</h3>
                                            <p className="text-sm text-slate-500 font-light mt-2">Danos tus datos para iniciar la conversación por WhatsApp y agendar tu <strong>valoración sin costo</strong>.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Nombre Completo</label>
                                                <input 
                                                    type="text" 
                                                    required 
                                                    value={funnelData.name}
                                                    onChange={(e) => setFunnelData({...funnelData, name: e.target.value})}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-mh-gold focus:border-mh-gold outline-none"
                                                    placeholder="Ej: Laura Pérez"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Edad</label>
                                                <input 
                                                    type="number" 
                                                    required 
                                                    min="18"
                                                    value={funnelData.age}
                                                    onChange={(e) => setFunnelData({...funnelData, age: e.target.value})}
                                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-mh-gold focus:border-mh-gold outline-none"
                                                    placeholder="Ej: 32"
                                                />
                                            </div>

                                            <button 
                                                type="submit"
                                                className="w-full mt-6 flex items-center justify-center gap-2 bg-[#25D366] text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-[#128C7E] transition-colors shadow-lg active:scale-95"
                                            >
                                                Agendar Vía WhatsApp <ArrowRight size={18} />
                                            </button>
                                        </form>
                                        <button onClick={() => setFunnelStep(3)} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-4 hover:text-mh-gold flex items-center justify-center mx-auto gap-1">
                                            <ChevronLeft size={12} /> Volver
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* FLOATING ACTION DOCK */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-full max-w-[calc(100%-3rem)] md:max-w-sm pointer-events-none">
                <button
                    onClick={handleOpenModal}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-mh-gold text-slate-950 rounded-full font-black uppercase tracking-widest text-[11px] shadow-[0_10px_40px_-5px_rgba(212,175,55,0.5)] md:hover:bg-white transition-all active:scale-95 pointer-events-auto"
                >
                    <Sparkles size={16} /> Obtener Valoración Sin Costo
                </button>
            </div>
        </div>
    );
};
