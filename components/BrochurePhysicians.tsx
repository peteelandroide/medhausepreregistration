import React from 'react';
import { Calendar, Clock, MapPin, Star, CheckCircle, ChevronRight, Zap, ArrowLeft, Trophy, Sparkles, Wine, ShieldCheck, Users, X } from 'lucide-react';
import { Logo } from './Logo';
import { LocationCard } from './LocationCard';

interface BrochureProps {
    onBack: () => void;
}

// Reusable WhatsApp Button Component with custom text
const WhatsAppButton: React.FC<{ text?: string; light?: boolean }> = ({ text = 'Unirme al Grupo de Lanzamiento', light }) => (
    <button
        onClick={() => window.open('https://chat.whatsapp.com/E8VD7ivqgqXEjijFpNZL44', '_blank')}
        className={`group mt-8 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 duration-300 flex items-center justify-center gap-3 ${light
            ? 'bg-white text-mh-blue hover:bg-mh-gold hover:text-mh-blue'
            : 'bg-slate-950 text-white hover:bg-mh-blue'
            }`}
    >
        {text} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </button>
);

export const BrochurePhysicians: React.FC<BrochureProps> = ({ onBack }) => {
    const speakers = [
        { name: "Dr. Jan Frank Lio", role: "INVITADO ESPECIAL - ESTRATEGA EN NEUROVENTAS", desc: "Hackea la psicología del paciente para potenciar tu prestigio y cerrar valoraciones premium.", img: "/jan_lio.png", isFounder: false, isSpecial: true },
        { name: "Mafe Sabat", role: "SOCIO FUNDADOR - FINANZAS MÉDICAS", desc: "Cómo transformar un consultorio en un activo rentable eliminando la tiranía de los costos fijos.", img: "/mafe_sabat.jpg", isFounder: true, isSpecial: false },
        { name: "Dr. Pedro Vergara", role: "SOCIO FUNDADOR - MARKETING DIGITAL", desc: "El 'Efecto Halo' y cómo la automatización digital escala tu marca personal al siguiente nivel.", img: "/pedro_vergara.png", isFounder: true, isSpecial: false }
    ];

    return (
        <div className="font-sans text-slate-900 antialiased bg-white selection:bg-mh-gold selection:text-mh-blue min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-slate-100 h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
                    <button onClick={onBack} className="flex items-center gap-2 text-mh-blue font-bold text-xs uppercase tracking-widest hover:text-mh-gold transition-colors">
                        <ArrowLeft size={16} /> Volver
                    </button>
                    <div style={{ transform: 'scale(0.75)' }}><Logo variant="dark" size="md" /></div>
                    <div className="w-20"></div> {/* Spacer */}
                </div>
            </nav>

            {/* 1. Hero Section */}
            <header className="relative pt-32 pb-20 bg-slate-950 overflow-hidden min-h-[90vh] flex items-center">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img src="/hero_colaboradores.png" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-20">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 bg-mh-gold/10 border border-mh-gold/20 text-mh-gold px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-lg animate-fade-in">
                            <Sparkles size={14} /> Lanzamiento Exclusivo Medellín 2026
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[0.95] mb-8 tracking-tight animate-fade-in-up">
                            Médico, duplica tu rentabilidad <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold via-yellow-200 to-white">Sin Costos Fijos.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 mb-12 font-light leading-relaxed max-w-2xl animate-fade-in-up">
                            Asiste al lanzamiento de MedHause y aprende cómo lograr un consultorio rentable desde el momento 1, cupos limitados.
                        </p>

                        {/* Event Quick Details Bar */}
                        <div className="inline-flex flex-wrap items-center gap-y-4 gap-x-8 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] animate-fade-in-up delay-300">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-mh-gold" size={20} />
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Fecha</p>
                                    <p className="text-sm font-bold text-white">28 de Enero, 2026</p>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-white/10"></div>
                            <div className="flex items-center gap-3">
                                <Clock className="text-mh-gold" size={20} />
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Hora</p>
                                    <p className="text-sm font-bold text-white">6:00 PM – 8:30 PM</p>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-white/10"></div>
                            <div className="flex items-center gap-3">
                                <Users className="text-mh-gold" size={20} />
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Cupos</p>
                                    <p className="text-sm font-bold text-white">Solo 60 Cupos</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. La Cruda Realidad */}
            <section className="py-24 bg-slate-50 relative overflow-hidden text-slate-900 border-b border-slate-100">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.03)_0%,transparent_70%)]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-red-500 font-black uppercase tracking-[0.2em] text-xs block mb-4">La Cruda Realidad</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-8 leading-tight">
                                El 90% de los especialistas <span className="text-red-500">ven estancado su crecimiento</span> por falta de estrategia.
                            </h2>
                            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                                No es falta de pacientes, es falta de eficiencia. En nuestro evento de apertura, te revelaremos cómo el modelo tradicional de consultorio drena tu rentabilidad. Es hora de dejar de ser un administrador de inmuebles y volver a ser un <strong className="text-slate-900">estratega médico</strong>.
                            </p>
                            <WhatsAppButton text="Quiero una consulta rentable" />
                        </div>
                        <div className="space-y-6">
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                        <X size={20} className="text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Altos Costos Fijos</h4>
                                        <p className="text-sm text-slate-500">Un consultorio tradicional puede costar entre $6 y $12 millones COP/mes.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                        <X size={20} className="text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Carga Administrativa</h4>
                                        <p className="text-sm text-slate-500">Tiempo que podrías dedicar a tus pacientes o formación continua.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                        <X size={20} className="text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Complejidad Normativa</h4>
                                        <p className="text-sm text-slate-500">Navegar la Resolución 3100 de 2019 es un riesgo constante.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Aprende de los Expertos (Program) */}
            <section className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.03)_0%,transparent_70%)]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-mh-blue font-black uppercase tracking-[0.2em] text-xs block mb-4">Aprende de los Expertos</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 italic">Neuroventas, Marketing y Finanzas Médicas.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {speakers.map((speaker, i) => (
                            <div key={i} className={`group relative p-12 rounded-[4rem] border transition-all duration-500 flex flex-col items-center text-center ${speaker.isSpecial
                                ? 'bg-gradient-to-b from-slate-900 to-mh-blue border-mh-gold/30 shadow-[0_20px_50px_-10px_rgba(212,175,55,0.2)]'
                                : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-2xl'
                                }`}>
                                {speaker.isSpecial && (
                                    <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mh-gold text-mh-blue text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl z-30">
                                        Invitado Especial
                                    </div>
                                )}
                                {speaker.isFounder && (
                                    <div className="absolute top-8 right-8 bg-mh-blue text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg z-20">
                                        Socio Fundador
                                    </div>
                                )}
                                <div className={`w-48 h-48 rounded-[3rem] overflow-hidden mb-10 border-8 shadow-xl group-hover:scale-105 transition-transform duration-500 ${speaker.isSpecial ? 'border-mh-gold/20' : 'border-white'}`}>
                                    <img src={speaker.img} className="w-full h-full object-cover" />
                                </div>
                                <h4 className={`text-2xl font-bold mb-2 ${speaker.isSpecial ? 'text-white' : 'text-mh-blue'}`}>{speaker.name}</h4>
                                <p className={`text-sm font-black uppercase tracking-[0.3em] mb-6 ${speaker.isSpecial ? 'text-mh-gold' : 'text-mh-gold'}`}>{speaker.role}</p>
                                <p className={`text-lg leading-relaxed font-light ${speaker.isSpecial ? 'text-slate-300' : 'text-slate-500'}`}>{speaker.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 flex justify-center">
                        <WhatsAppButton text="Reservar mi cupo con los expertos" />
                    </div>
                </div>
            </section>

            {/* 4. Privilegios de Asistente VIP (VIP Benefits) */}
            <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/premium.jpg" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-heading font-black mb-10 leading-tight">
                                Privilegios de <br /><span className="text-mh-gold">Asistente VIP.</span>
                            </h2>
                            <div className="space-y-8">
                                {[
                                    { title: "Experiencia Completa", icon: <Wine />, desc: "Recepción exclusiva y networking élite con líderes del sector." },
                                    { title: "Tarifas de Lanzamiento", icon: <Zap />, desc: "Acceso exclusivo a reservas desde $75,000 COP solo para asistentes." },
                                    { title: "Prioridad Membresía", icon: <Trophy />, desc: "Primeros en la fila para las Membresías Premium con parking privado." },
                                    { title: "Apoyo en Habilitación", icon: <ShieldCheck />, desc: "Asesoría inicial para el trámite ante la Secretaría de Salud." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-mh-gold group-hover:bg-mh-gold group-hover:text-mh-blue transition-all duration-300">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1 group-hover:text-mh-gold transition-colors">{item.title}</h4>
                                            <p className="text-sm text-slate-400 font-light">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                                <WhatsAppButton text="Obtener mis beneficios VIP" light />
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-12 border border-white/10 relative self-start">
                            <div className="mb-8">
                                <span className="text-mh-gold font-bold uppercase tracking-widest text-[10px] mb-2 block">Tour Guiado</span>
                                <h3 className="text-3xl font-bold text-white mb-4">Ready-to-Operate</h3>
                                <p className="text-slate-400 text-sm font-light">Conoce de cerca los consultorios habilitados bajo la Resolución 3100 de 2019.</p>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mb-10">
                                <div className="h-20 rounded-2xl overflow-hidden border border-white/10"><img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/basic.jpg" className="w-full h-full object-cover" /></div>
                                <div className="h-20 rounded-2xl overflow-hidden border border-white/10"><img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/medium.jpg" className="w-full h-full object-cover" /></div>
                                <div className="h-20 rounded-2xl overflow-hidden border border-white/10"><img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/premium.jpg" className="w-full h-full object-cover" /></div>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-mh-gold bg-mh-gold/10 px-4 py-2 rounded-full w-fit">
                                Habilitados & Listos
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. ¿Qué percibe tu paciente? (Percepción de Valor) */}
            <section className="py-24 bg-white relative overflow-hidden border-y border-slate-100">
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.05)_0%,transparent_60%)]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <div className="bg-white rounded-[2rem] p-10 shadow-xl border border-slate-100">
                                <h3 className="text-2xl font-bold text-mh-blue mb-6">¿Qué percibe tu paciente?</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <CheckCircle size={24} className="text-mh-gold shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">Estatus por Asociación</h4>
                                            <p className="text-sm text-slate-500">Apalanca el prestigio de una ubicación VIP en El Poblado.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <CheckCircle size={24} className="text-mh-gold shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">Experiencia VIP</h4>
                                            <p className="text-sm text-slate-500">Recepción profesional con hospitalidad premium.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <CheckCircle size={24} className="text-mh-gold shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">Confianza y Posicionamiento</h4>
                                            <p className="text-sm text-slate-500">Un entorno que justifica tarifas premium.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4">La Percepción de Valor</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6 leading-tight">
                                Aumenta tus tarifas <span className="text-mh-blue">sin perder pacientes.</span>
                            </h2>
                            <p className="text-lg text-slate-500 leading-relaxed">
                                Te mostraremos cómo el entorno MedHause permite que tus pacientes perciban un valor 5x mayor, facilitando el cierre de tratamientos de alto costo.
                            </p>
                            <WhatsAppButton text="Aumentar mi propuesta de valor" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. El Salto Cuántico (MedHause Matrix) */}
            <section className="py-32 bg-mh-blue text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="/hero_colaboradores.png" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-mh-blue via-mh-blue/90 to-mh-blue"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4">El Salto Cuántico</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-black mb-6">La Solución Inteligente (MedHause).</h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light">
                            Te entregaremos las llaves de un modelo financiero, operativo y de marketing diseñado para que tu consulta sea, por fin, un negocio altamente rentable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Pilar 1: Prestigio */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-mh-gold/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Star size={32} className="text-mh-gold" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Prestigio</h3>
                            <p className="text-slate-300 mb-8 leading-relaxed">Tu marca personal se eleva al nivel de las mejores clínicas.</p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-mh-gold shrink-0 mt-0.5" />
                                    <span>Dirección en El Poblado — el sector más exclusivo</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-mh-gold shrink-0 mt-0.5" />
                                    <span>Diseño hospitalario 5 estrellas</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-400/60 pt-4 mt-4 border-t border-white/10">
                                    <X size={18} className="text-red-400/80 shrink-0 mt-0.5" />
                                    <span><strong>Tradicional:</strong> Mobiliario genérico</span>
                                </li>
                            </ul>
                        </div>

                        {/* Pilar 2: Libertad */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-mh-turquoise/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Zap size={32} className="text-mh-turquoise" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Libertad</h3>
                            <p className="text-slate-300 mb-8 leading-relaxed">Cero costos fijos. Cero contratos forzosos.</p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-mh-turquoise shrink-0 mt-0.5" />
                                    <span>Paga solo por las horas de consulta real</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-mh-turquoise shrink-0 mt-0.5" />
                                    <span>Sin nómina de secretaria</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-400/60 pt-4 mt-4 border-t border-white/10">
                                    <X size={18} className="text-red-400/80 shrink-0 mt-0.5" />
                                    <span><strong>Tradicional:</strong> Costos fijos de $8M-12M</span>
                                </li>
                            </ul>
                        </div>

                        {/* Pilar 3: Seguridad */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={32} className="text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Seguridad</h3>
                            <p className="text-slate-300 mb-8 leading-relaxed">Infraestructura que cumple todas las normas.</p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
                                    <span>Asesoría inicial y convenios para tu habilitación</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
                                    <span>Soporte normativo RESOLUCIÓN 3100</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-400/60 pt-4 mt-4 border-t border-white/10">
                                    <X size={18} className="text-red-400/80 shrink-0 mt-0.5" />
                                    <span><strong>Tradicional:</strong> Tú asumes toda la carga legal</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-16 flex justify-center">
                        <WhatsAppButton text="Descubrir el modelo MedHause" light />
                    </div>
                </div>
            </section>

            {/* 7. Networking de Alto Nivel */}
            <section className="py-24 bg-slate-50 overflow-hidden relative border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6">
                                Networking de <br /><span className="text-mh-gold">Alto Nivel.</span>
                            </h2>
                            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                                Conecta con los líderes de la industria médica en un ambiente diseñado para generar alianzas estratégicas.
                            </p>
                            <WhatsAppButton text="Conectar con líderes médicos" />
                        </div>
                        <div className="w-full md:w-1/2 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img src="/ASISTENTES.png" className="w-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. Final CTA + Location (Combined) */}
            <section className="py-32 bg-slate-100 relative border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="text-center lg:text-left">
                            <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900 mb-8 leading-tight">
                                Todo empieza con <br /><span className="text-mh-blue italic">asistir.</span>
                            </h2>
                            <p className="text-xl text-slate-500 mb-12 font-light max-w-2xl mx-auto lg:mx-0">
                                MedHause es la mejor decisión para tu futuro profesional. <strong className="text-slate-900">Cupos estrictamente limitados (60 asistentes).</strong>
                            </p>

                            <div className="flex flex-col gap-6 mb-12">
                                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 w-fit mx-auto lg:mx-0">
                                    <Calendar className="text-mh-gold" size={24} />
                                    <span className="text-lg font-bold text-slate-900">Miércoles 28 de Enero, 2026</span>
                                </div>
                                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 w-fit mx-auto lg:mx-0">
                                    <Clock className="text-mh-gold" size={24} />
                                    <span className="text-lg font-bold text-slate-900">6:00 PM – 8:30 PM</span>
                                </div>
                            </div>

                            <WhatsAppButton text="Reserva tu entrada VIP ahora" />

                            <p className="mt-20 text-[10px] text-slate-400 font-black uppercase tracking-widest letter-spacing-[0.5em]">
                                EL ÉXITO DE TU CONSULTA EN 2026 COMIENZA EN CROSS MEDICAL CENTER BY MEDHAUSE
                            </p>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-mh-gold/20 rounded-[3rem] blur-2xl z-0"></div>
                            <div className="relative z-10">
                                <LocationCard variant="light" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Minimal */}
            <footer className="py-12 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Logo variant="dark" size="md" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 MedHause™</p>
                </div>
            </footer>
        </div>
    );
};
