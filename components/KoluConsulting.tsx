import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight,
    ChevronLeft,
    Target,
    Zap,
    CheckCircle2,
    ArrowRight,
    Briefcase,
    TrendingUp,
    Users,
    LineChart,
    MessageSquare,
    ClipboardList,
    Calendar,
    Sparkles,
    Award
} from 'lucide-react';

interface KoluConsultingProps {
    onBack: () => void;
}

export const KoluConsulting: React.FC<KoluConsultingProps> = ({ onBack }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        // Slide 1: Hero / Intro
        {
            id: 'hero',
            render: () => (
                <div className="h-full flex flex-col justify-center items-center text-center px-6 relative overflow-hidden bg-[#FDFCFB]">
                    <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#E3D3C4]/20 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#8B735B]/10 rounded-full blur-[120px]"></div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 max-w-5xl"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E3D3C4]/30 border border-[#E3D3C4] mb-8">
                            <Sparkles size={16} className="text-[#8B735B]" />
                            <span className="text-xs font-bold uppercase tracking-widest text-[#8B735B]">Presentación de Consultoría</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-heading font-black leading-[1] mb-12 tracking-tighter text-[#1A1A1A]">
                            Estrategia y <br />
                            <span className="text-[#8B735B] italic">Posicionamiento.</span>
                        </h1>

                        <div className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-[#8B735B]/10 border border-[#E3D3C4]/30 max-w-3xl mx-auto mb-12">
                            <p className="text-3xl font-heading font-black mb-4 text-[#8B735B]">María Fernanda Ríos</p>
                            <h3 className="text-xl font-medium text-[#4A4A4A] leading-relaxed">
                                Propuesta de consultoría para <br />
                                <span className="text-[#1A1A1A] font-bold text-2xl">Lion Estore Partes</span>
                            </h3>
                        </div>
                    </motion.div>
                </div>
            )
        },
        // Slide 2: The Goal
        {
            id: 'overview',
            render: () => (
                <div className="h-full flex items-center justify-center bg-[#FDFCFB] px-6">
                    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <img
                                src="/Sesion-RetratoMariaFernandaby@MaflaPhoto0034.JPG"
                                alt="María Fernanda Ríos"
                                className="w-full h-[650px] object-cover rounded-[4rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 border-4 border-white"
                            />
                            <div className="absolute -bottom-8 -left-8 bg-[#1A1A1A] text-white p-10 rounded-[2.5rem] shadow-2xl">
                                <Award size={32} className="text-[#E3D3C4] mb-4" />
                                <h4 className="text-2xl font-bold font-heading leading-tight italic">"Diseñamos modelos de crecimiento, no solo marcas."</h4>
                            </div>
                        </div>
                        <div className="space-y-10">
                            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B735B]">Propósito del Proyecto</h2>
                            <h3 className="text-5xl md:text-6xl font-heading font-black text-[#1A1A1A] leading-tight tracking-tighter">
                                Una Visión <br /><span className="text-[#8B735B]">Empresarial Clara.</span>
                            </h3>
                            <p className="text-2xl text-[#6B5E4C] font-light leading-relaxed">
                                Acompañamiento estratégico para consolidar un <strong>posicionamiento diferencial</strong> y fortalecer la presencia en el mercado objetivo.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-6">
                                <div className="p-6 bg-white rounded-3xl border border-[#E3D3C4]/30">
                                    <h5 className="font-bold text-[#1A1A1A] mb-2 uppercase text-xs tracking-widest">Foco</h5>
                                    <p className="text-sm text-[#8B735B]">Crecimiento Comercial</p>
                                </div>
                                <div className="p-6 bg-white rounded-3xl border border-[#E3D3C4]/30">
                                    <h5 className="font-bold text-[#1A1A1A] mb-2 uppercase text-xs tracking-widest">Alcance</h5>
                                    <p className="text-sm text-[#8B735B]">Estrategia 360°</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 3: Perfil Profesional
        {
            id: 'profile',
            render: () => (
                <div className="h-full bg-[#1A1A1A] text-white flex items-center justify-center px-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#8B735B]/10 rounded-full blur-[150px]"></div>
                    <div className="max-w-6xl w-full">
                        <div className="text-center mb-20">
                            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B735B] mb-6">01 — Perfil Profesional</h2>
                            <h3 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase leading-[0.9]">
                                ESTRATEGIA <span className="text-[#8B735B]">&</span> POSICIONAMIENTO.
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                { icon: <TrendingUp size={32} />, title: "Plan de Ejecución", desc: "Traducir la estrategia en KPIs e indicadores de desempeño medibles." },
                                { icon: <Users size={32} />, title: "Cliente Ideal", desc: "Precisar segmentos de mayor potencial y criterios de compra." },
                                { icon: <Target size={32} />, title: "Posicionamiento", desc: "Construir una marca consistente y defendible frente a la competencia." },
                                { icon: <Zap size={32} />, title: "Marco Estratégico", desc: "Definir un norte claro y prioridades para el crecimiento escalable." }
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white/5 border border-white/20 p-10 rounded-[3rem] hover:bg-white/10 transition-all hover:-translate-y-2">
                                    <div className="text-[#BAA38B] mb-8">{item.icon}</div>
                                    <h4 className="font-bold mb-4 uppercase text-lg tracking-widest text-[#E3D3C4]">{item.title}</h4>
                                    <p className="text-sm text-slate-200 leading-relaxed font-light">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 4: Entendimiento Lion Estore
        {
            id: 'lion-estore',
            render: () => (
                <div className="h-full bg-white flex items-center justify-center px-6">
                    <div className="max-w-7xl w-full">
                        <div className="flex flex-col lg:flex-row gap-20 items-center">
                            <div className="flex-1 space-y-8">
                                <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B735B]">02 — Diagnóstico</h2>
                                <h3 className="text-5xl font-heading font-black text-[#1A1A1A] leading-tight tracking-tighter">
                                    Levantamiento Ágil y <br /><span className="text-[#8B735B]">Orientado a Decisiones.</span>
                                </h3>
                                <p className="text-xl text-[#6B5E4C] font-light leading-relaxed">
                                    Iniciamos con una inmersión profunda para comprender los pilares críticos de <strong>Lion Estore Partes</strong>.
                                </p>
                                <div className="space-y-4">
                                    {["Portafolio (Líneas y Márgenes)", "Canales de Venta (WhatsApp, Web, Marketplace)", "Perfil del Cliente y Decisiones de Compra"].map((txt, i) => (
                                        <div key={i} className="flex items-center gap-4 text-lg font-bold text-[#1A1A1A]">
                                            <div className="w-6 h-6 rounded-full bg-[#E3D3C4] flex items-center justify-center text-[#8B735B]">
                                                <CheckCircle2 size={16} />
                                            </div>
                                            {txt}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <div className="bg-[#FDFCFB] p-8 rounded-[2.5rem] border border-[#E3D3C4]/30 space-y-4">
                                    <Target className="text-[#8B735B]" size={32} />
                                    <h4 className="font-bold text-[#1A1A1A]">Competencia</h4>
                                    <p className="text-sm text-[#6B5E4C]">Propuesta de valor y narrativa competitiva.</p>
                                </div>
                                <div className="bg-[#1A1A1A] p-8 rounded-[2.5rem] text-white space-y-4 translate-y-8">
                                    <MessageSquare className="text-[#8B735B]" size={32} />
                                    <h4 className="font-bold">Marca</h4>
                                    <p className="text-sm text-slate-400">Consistencia y percepción actual.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 5: Methodology
        {
            id: 'methodology',
            render: () => (
                <div className="h-full bg-[#F9F7F5] flex items-center justify-center px-6 relative overflow-hidden">
                    <div className="max-w-7xl w-full">
                        <div className="text-center mb-16">
                            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B735B] mb-6">03 — Metodología (4 Fases)</h2>
                            <h3 className="text-5xl font-heading font-black text-[#1A1A1A] tracking-tighter">RUTA DE TRABAJO SEMANAL</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { phase: "Fase 1", title: "Diagnóstico", week: "Semana 1", color: "bg-white" },
                                { phase: "Fase 2", title: "Visión & Foco", week: "Semana 2", color: "bg-white" },
                                { phase: "Fase 3", title: "Propuesta de Valor", week: "Semana 3", color: "bg-[#1A1A1A] text-white" },
                                { phase: "Fase 4", title: "Ejecución", week: "Semana 4", color: "bg-white" }
                            ].map((p, i) => (
                                <div key={i} className={`${p.color} p-10 rounded-[3rem] border border-[#E3D3C4]/30 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all`}>
                                    <span className="text-4xl font-black opacity-10 absolute top-6 right-6 italic">{i + 1}</span>
                                    <p className="text-[#8B735B] font-bold text-xs uppercase tracking-widest mb-4">{p.week}</p>
                                    <h4 className="text-2xl font-heading font-black mb-6 leading-tight">{p.title}</h4>
                                    <div className="w-8 h-8 rounded-full bg-[#E3D3C4]/30 flex items-center justify-center group-hover:bg-[#8B735B] group-hover:text-white transition-colors">
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 bg-white p-8 rounded-3xl border border-[#E3D3C4]/30 flex items-center justify-center gap-6">
                            <span className="text-sm font-bold uppercase tracking-widest text-[#8B735B]">Entregables</span>
                            <div className="h-10 w-[1px] bg-[#E3D3C4]"></div>
                            <p className="text-lg text-[#1A1A1A] font-medium leading-relaxed italic">
                                Informe de diagnóstico, Documento de Norte Estratégico, Guía de Posicionamiento, Hoja de Ruta 30-60-90.
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 6: Results
        {
            id: 'results',
            render: () => (
                <div className="h-full bg-white flex items-center justify-center px-6">
                    <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-10">
                            <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#8B735B]">04 — Resultados Esperados</h2>
                            <h3 className="text-5xl font-heading font-black text-[#1A1A1A] tracking-tighter uppercase leading-[0.9]">
                                CLARIDAD <br /><span className="text-[#8B735B]">OPERATIVA.</span>
                            </h3>
                            <div className="space-y-6">
                                {[
                                    "Visión y objetivos claros a 6–12 meses.",
                                    "Propuesta de valor relevante para el mercado.",
                                    "Alineación entre portafolio, canales y comunicación.",
                                    "Plan accionable con responsables e indicadores."
                                ].map((txt, idx) => (
                                    <div key={idx} className="flex items-start gap-4 p-6 bg-[#FDFCFB] rounded-[2rem] border border-[#E3D3C4]/20">
                                        <CheckCircle2 className="text-[#8B735B] shrink-0" size={24} />
                                        <p className="text-lg font-medium text-[#1A1A1A]">{txt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-[#1A1A1A] p-12 rounded-[4rem] text-white relative">
                            <div className="absolute top-10 right-10 text-[#8B735B] opacity-20"><Users size={80} /></div>
                            <h4 className="text-3xl font-heading font-black mb-10 uppercase italic">Modalidad</h4>
                            <ul className="space-y-10">
                                <li className="flex gap-6">
                                    <div className="w-14 h-14 bg-[#BAA38B]/30 rounded-2xl flex items-center justify-center text-[#E3D3C4] shrink-0">
                                        <Zap size={28} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl uppercase tracking-widest text-[#E3D3C4]">Inicio</p>
                                        <p className="text-slate-200 font-light mt-1">Sesión de alineación profunda de 90 min.</p>
                                    </div>
                                </li>
                                <li className="flex gap-6">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white shrink-0">
                                        <Calendar size={28} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl uppercase tracking-widest text-white">Ritmo</p>
                                        <p className="text-slate-200 font-light mt-1">2 sesiones semanales de seguimiento.</p>
                                    </div>
                                </li>
                                <li className="flex gap-6">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-white shrink-0">
                                        <MessageSquare size={28} />
                                    </div>
                                    <div>
                                        <p className="font-bold text-xl uppercase tracking-widest text-white">Soporte</p>
                                        <p className="text-slate-200 font-light mt-1">WhatsApp/Correo para dudas puntuales.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 7: CTA
        {
            id: 'cta',
            render: () => (
                <div className="h-full bg-[#1A1A1A] text-white flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/Sesion-RetratoMariaFernandaby@MaflaPhoto0034.JPG"
                            className="w-full h-full object-cover opacity-10 grayscale"
                            alt="BG"
                        />
                        <div className="absolute inset-0 bg-black/60"></div>
                    </div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="relative z-10 max-w-4xl"
                    >
                        <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-[#E3D3C4] mb-12">Próximo Paso</h2>
                        <h1 className="text-6xl md:text-8xl font-heading font-black text-white leading-[0.9] mb-12 tracking-tighter uppercase italic">
                            ACOMPAÑEMOS TU <br />
                            <span className="text-[#E3D3C4]">CRECIMIENTO.</span>
                        </h1>
                        <p className="text-2xl text-slate-100 font-light mb-16 max-w-2xl mx-auto">
                            Propongo una llamada inicial de 30 minutos para confirmar alcance y cronograma.
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center">
                            <button className="px-12 py-6 bg-[#E3D3C4] text-[#1A1A1A] rounded-full font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-2xl shadow-[#E3D3C4]/20 hover:scale-105 active:scale-95 flex items-center gap-3">
                                Agendar Llamada Inicial <ArrowRight size={20} />
                            </button>
                        </div>

                        <div className="mt-24 grid grid-cols-2 gap-12 text-left">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#E3D3C4] mb-2">Contacto</p>
                                <p className="text-xl font-heading font-bold text-white">María Fernanda Ríos</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#E3D3C4] mb-2">Empresa</p>
                                <p className="text-xl font-heading font-bold text-white">kolü expirence S.A.S</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )
        }
    ];

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(prev => prev + 1);
        }
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(prev => prev - 1);
        }
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
            if (e.key === 'ArrowLeft') prevSlide();
            if (e.key === 'Escape') onBack();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSlide]);

    return (
        <div className="relative h-screen w-full bg-[#1A1A1A] font-sans overflow-hidden">
            {/* Top Nav */}
            <nav className="fixed top-0 w-full z-50 px-8 py-8 flex justify-between items-center pointer-events-none">
                <button
                    onClick={onBack}
                    className="pointer-events-auto bg-black/20 backdrop-blur-md px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors border border-white/10"
                >
                    <ChevronLeft className="inline mr-2" size={14} /> Salir
                </button>
                <div className="font-heading font-bold tracking-tighter text-2xl text-[#8B735B]">
                    kolü<span className="text-white italic opacity-50 font-light">.</span>
                </div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
                    Slide {currentSlide + 1} / {slides.length}
                </div>
            </nav>

            {/* Content */}
            <div className="h-full w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="h-full w-full"
                    >
                        {slides[currentSlide].render()}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="fixed bottom-0 left-0 w-full h-1 bg-white/5 z-50">
                <motion.div
                    className="h-full bg-[#8B735B]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Navigation Controls */}
            <div className="fixed bottom-12 right-12 z-50 flex gap-4">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="w-16 h-16 rounded-full border border-white/10 bg-black/40 backdrop-blur-xl text-white flex items-center justify-center hover:bg-[#8B735B] disabled:opacity-0 disabled:cursor-not-allowed transition-all shadow-2xl scale-100 active:scale-95 group"
                >
                    <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="w-16 h-16 rounded-full bg-[#8B735B] text-white flex items-center justify-center hover:bg-white hover:text-[#1A1A1A] disabled:opacity-20 disabled:cursor-not-allowed transition-all shadow-2xl shadow-[#8B735B]/40 scale-100 active:scale-95 group"
                >
                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};
