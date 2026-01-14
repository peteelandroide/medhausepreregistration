import React from 'react';
import { Calendar, Clock, MapPin, Star, CheckCircle, ChevronRight, Zap, ArrowLeft, Trophy, Sparkles, Coffee, Wine, Car, ShieldCheck, Users, X } from 'lucide-react';
import { Logo } from './Logo';
import { LocationCard } from './LocationCard';

interface BrochureProps {
    onBack: () => void;
}

export const BrochurePhysicians: React.FC<BrochureProps> = ({ onBack }) => {
    const speakers = [
        { name: "Mafe Sabat", role: "Socio Fundador & Estratega", desc: "Cómo transformar un consultorio en un activo rentable eliminando la tiranía de los costos fijos.", img: "https://randomuser.me/api/portraits/women/44.jpg", isFounder: true },
        { name: "Dr. Pedro Vergara", role: "Socio Fundador & Especialista", desc: "El 'Efecto Halo' y cómo la automatización digital escala tu marca personal al siguiente nivel.", img: "https://randomuser.me/api/portraits/men/45.jpg", isFounder: true },
        { name: "Dr. Jan Frank Lio", role: "Neuroventas Médicas", desc: "Hackea la psicología del paciente para potenciar tu prestigio y cerrar valoraciones premium.", img: "https://randomuser.me/api/portraits/men/32.jpg", isFounder: false }
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

            {/* Hero Section - High-Ticket Style */}
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
                            El Lanzamiento de tu <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold via-yellow-200 to-white">Próximo Nivel Profesional.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 mb-12 font-light leading-relaxed max-w-2xl animate-fade-in-up">
                            Te invitamos al evento de apertura de <strong className="text-white">MedHause™</strong>. Descubre cómo el prestigio, la libertad y la seguridad normativa se unen para potenciar tu carrera.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] text-white animate-fade-in-up">
                            <div className="flex items-center gap-3">
                                <Calendar className="text-mh-gold" size={20} />
                                <span className="text-sm font-bold">28 de Enero, 2026</span>
                            </div>
                            <div className="flex items-center gap-3 border-y md:border-y-0 md:border-x border-white/10 py-3 md:py-0 md:px-6">
                                <Clock className="text-mh-gold" size={20} />
                                <span className="text-sm font-bold">6:00 PM – 8:30 PM</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Users className="text-mh-gold" size={20} />
                                <span className="text-sm font-bold">Solo 60 Cupos</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* El Problema - The Reality */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-red-500 font-black uppercase tracking-[0.2em] text-xs block mb-4">El Problema</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-8 leading-tight">
                                Eres un profesional de la salud, <span className="text-red-500">no un administrador de inmuebles.</span>
                            </h2>
                            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                                La práctica médica independiente tradicional te obliga a dividir tu enfoque. En nuestro evento de apertura, descubrirás cómo la "tiranía de los costos fijos" y el "laberinto de la habilitación" dejarán de alejarte de tu verdadera vocación: <strong className="text-slate-900">sanar</strong>.
                            </p>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                        <X size={20} className="text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Altos Costos Fijos</h4>
                                        <p className="text-sm text-slate-500">Arriendo, servicios, personal y administración consumen tu rentabilidad. Un consultorio tradicional puede costar entre $6 y $12 millones COP/mes.</p>
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
                                        <p className="text-sm text-slate-500">Tiempo valioso que podrías dedicar a tus pacientes o a tu formación continua.</p>
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
                                        <p className="text-sm text-slate-500">Navegar la Resolución 3100 de 2019 es un riesgo y una distracción constante.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* La Solución - Three Pillars */}
            <section className="py-24 bg-mh-blue text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-mh-gold rounded-full blur-[120px]"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4">La Solución Inteligente</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-black mb-6">La mejor decisión para tu carrera.</h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto font-light">
                            Durante el evento, conocerás el ecosistema diseñado para que accedas a un consultorio de lujo solo cuando lo necesitas, fundamentado en tres pilares innegociables:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/10 transition-all">
                            <div className="w-16 h-16 bg-mh-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Star size={32} className="text-mh-gold" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Prestigio</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">Ubicación VIP en El Poblado. El ambiente de lujo se transfiere directamente a tu marca personal.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/10 transition-all">
                            <div className="w-16 h-16 bg-mh-turquoise/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Zap size={32} className="text-mh-turquoise" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Libertad</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">Cero costos fijos. Paga solo por las horas que utilizas. Sin contratos forzosos.</p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 text-center hover:bg-white/10 transition-all">
                            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck size={32} className="text-green-400" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Seguridad</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">Consultorios que cumplen con la Resolución 3100. Asesoría y convenios para tu habilitación.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Experiencia del Paciente */}
            <section className="py-24 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
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
                                            <p className="text-sm text-slate-500">Recepción profesional con hospitalidad premium que diferencia tu consulta.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <CheckCircle size={24} className="text-mh-gold shrink-0" />
                                        <div>
                                            <h4 className="font-bold text-slate-900 mb-1">Confianza y Posicionamiento</h4>
                                            <p className="text-sm text-slate-500">Un entorno que justifica tarifas premium y fideliza a los pacientes más exigentes.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4">Tu Marca Personal</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6 leading-tight">
                                La experiencia de tu paciente <span className="text-mh-blue">comienza en nuestra puerta.</span>
                            </h2>
                            <p className="text-lg text-slate-500 leading-relaxed">
                                Los pacientes perciben un mayor estatus y calidad desde que llegan, fortaleciendo su confianza en ti incluso antes de la consulta.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program - Transformation Workshop */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-mh-blue font-black uppercase tracking-[0.2em] text-xs block mb-4">Agenda del Evento</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 italic">Ponencias Confirmadas.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {speakers.map((speaker, i) => (
                            <div key={i} className="group relative p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-500">
                                {speaker.isFounder && (
                                    <div className="absolute top-6 right-6 bg-mh-blue text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                        Socio Fundador
                                    </div>
                                )}
                                <div className="w-24 h-24 rounded-full overflow-hidden mb-6 border-4 border-white shadow-lg">
                                    <img src={speaker.img} className="w-full h-full object-cover" />
                                </div>
                                <h4 className="text-xl font-bold text-mh-blue mb-1">{speaker.name}</h4>
                                <p className="text-xs font-black text-mh-gold uppercase tracking-widest mb-4">{speaker.role}</p>
                                <p className="text-sm text-slate-500 leading-relaxed font-light">{speaker.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Networking / Attendees Preview */}
            <section className="py-24 bg-slate-50 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="w-full md:w-1/2">
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6">
                                Networking de <br /><span className="text-mh-gold">Alto Nivel.</span>
                            </h2>
                            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                                Conecta con los líderes de la industria médica en un ambiente diseñado para generar alianzas estratégicas.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                            <img src="/ASISTENTES.png" className="w-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* VIP Benefits */}
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
                                    { title: "Tarifas de Lanzamiento", icon: <Zap />, desc: "Acceso exclusivo a reservas desde $50,000 COP solo para asistentes." },
                                    { title: "Prioridad Membresía", icon: <Trophy />, desc: "Primeros en la fila para las 5 Membresías Premium con parking privado." },
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
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-12 border border-white/10 relative self-start">
                            <div className="mb-8">
                                <span className="text-mh-gold font-bold uppercase tracking-widest text-[10px] mb-2 block">Tour Guiado</span>
                                <h3 className="text-3xl font-bold text-white mb-4">Ready-to-Operate</h3>
                                <p className="text-slate-400 text-sm font-light">Conoce de cerca los consultorios habilitados bajo la <span className="text-white font-bold">Resolución 3100 de 2019</span>.</p>
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

            {/* Final CTA */}
            <section className="py-32 bg-white relative">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900 mb-8 leading-tight">
                        Todo empieza con <br /><span className="text-mh-blue italic">asistir.</span>
                    </h2>
                    <p className="text-xl text-slate-500 mb-12 font-light max-w-2xl mx-auto">
                        MedHause es la mejor decisión para tu futuro profesional, y el primer paso es ser parte de este evento exclusivo. <strong className="text-slate-900">Cupos estrictamente limitados (60 asistentes).</strong>
                    </p>

                    <button
                        onClick={() => window.open('https://chat.whatsapp.com/your-group-link', '_blank')}
                        className="group bg-slate-950 text-white px-12 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-mh-blue transition-all shadow-2xl hover:scale-105 duration-300 flex items-center justify-center gap-4 mx-auto"
                    >
                        Reserva tu entrada VIP <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <p className="mt-20 text-[10px] text-slate-400 font-black uppercase tracking-widest letter-spacing-[0.5em]">
                        EL ÉXITO DE TU CONSULTA EN 2026 COMIENZA EN CROSS MEDICAL CENTER BY MEDHAUSE
                    </p>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-20 bg-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4">Ubicación del Evento</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">El Epicentro del <br /><span className="text-mh-blue">Lujo Médico.</span></h2>
                            <p className="text-slate-500 leading-relaxed">En el corazón de El Poblado, el sector más exclusivo de Medellín, Cross Business Center te espera para transformar tu práctica médica.</p>
                        </div>
                        <LocationCard variant="light" />
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
