import React from 'react';
import { Calendar, Clock, MapPin, Users, Star, CheckCircle, ChevronRight, Phone, MessageSquare, Briefcase, Zap, ArrowLeft } from 'lucide-react';
import { Logo } from './Logo';
import { LocationCard } from './LocationCard';

interface BrochureProps {
    onBack: () => void;
}

const WhatsAppButton: React.FC<{ text?: string; light?: boolean }> = ({ text = 'Conversar con Mafe Sabat', light }) => (
    <button
        onClick={() => window.open('https://wa.me/573053412292', '_blank')}
        className={`group mt-8 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 duration-300 flex items-center justify-center gap-3 ${light
            ? 'bg-white text-mh-blue hover:bg-mh-gold hover:text-mh-blue'
            : 'bg-slate-950 text-white hover:bg-mh-blue'
            }`}
    >
        {text} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
    </button>
);

export const BrochureCollaborators: React.FC<BrochureProps> = ({ onBack }) => {
    const speakers = [
        { name: "Dr. Jan Frank Lio", role: "INVITADO ESPECIAL - ESTRATEGA EN NEUROVENTAS", desc: "Hackea la psicología del paciente para potenciar tu prestigio y cerrar valoraciones premium.", img: "/jan_lio.png", isFounder: false, isSpecial: true },
        { name: "Mafe Sabat", role: "SOCIO FUNDADOR - FINANZAS MÉDICAS", desc: "Cómo transformar un consultorio en un activo rentable eliminando la tiranía de los costos fijos.", img: "/mafe_sabat.jpg", isFounder: true, isSpecial: false },
        { name: "Dr. Pedro Vergara", role: "SOCIO FUNDADOR - MARKETING DIGITAL", desc: "El 'Efecto Halo' y cómo la automatización digital escala tu marca personal al siguiente nivel.", img: "/pedro_vergara.png", isFounder: true, isSpecial: false }
    ];

    return (
        <div className="font-sans text-slate-800 antialiased bg-white selection:bg-mh-gold selection:text-mh-blue min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100 h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
                    <button onClick={onBack} className="flex items-center gap-2 text-mh-blue font-bold text-xs uppercase tracking-widest hover:text-mh-gold transition-colors">
                        <ArrowLeft size={16} /> Volver
                    </button>
                    <div style={{ transform: 'scale(0.75)' }}><Logo variant="dark" size="md" /></div>
                    <div className="w-20"></div> {/* Spacer */}
                </div>
            </nav>

            {/* Hero Section */}
            <header className="relative pt-32 pb-20 bg-slate-950 overflow-hidden min-h-[85vh] flex items-center">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img src="/hero_colaboradores.png" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-20 text-center">
                    <div className="inline-flex items-center gap-2 bg-mh-gold/10 border border-mh-gold/20 text-mh-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 animate-fade-in">
                        Alianza Estratégica
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-tight mb-8 tracking-tight animate-fade-in-up">
                        Construyamos Juntos el <br /><span className="text-mh-gold">Nuevo Estándar Médico.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 mb-12 font-light leading-relaxed max-w-3xl mx-auto animate-fade-in-up">
                        Buscamos aliados visionarios para co-crear la experiencia de lanzamiento de MedHause. No buscamos patrocinadores, buscamos socios del ecosistema.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] animate-fade-in-up">
                        <div className="flex flex-col items-center gap-2">
                            <Calendar className="text-mh-gold" size={24} />
                            <span className="text-white font-bold">Miércoles 28 de enero, 2026</span>
                            <span className="text-xs text-slate-400 uppercase tracking-widest">Fecha</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0">
                            <Clock className="text-mh-gold" size={24} />
                            <span className="text-white font-bold">6:00 PM - 8:30 PM</span>
                            <span className="text-xs text-slate-400 uppercase tracking-widest">Hora</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <Users className="text-mh-gold" size={24} />
                            <span className="text-white font-bold text-center">Solo 60 Especialistas</span>
                            <span className="text-xs text-slate-400 uppercase tracking-widest">Audiencia</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Speakers Section */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.03)_0%,transparent_70%)]"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {speakers.map((speaker, i) => (
                        <div key={i} className={`group relative p-12 rounded-[4rem] border transition-all duration-500 flex flex-col items-center text-center ${speaker.isSpecial
                            ? 'bg-gradient-to-b from-mh-blue to-slate-900 border-mh-gold/30 shadow-[0_20px_50px_-10px_rgba(212,175,55,0.2)]'
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
            </section>

            {/* Why Collab with Images */}
            <section className="py-24 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-mh-gold/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    <div className="mb-16 rounded-[3rem] overflow-hidden shadow-2xl">
                        <img src="/ASISTENTES.png" className="w-full max-h-[500px] object-cover" />
                        <div className="bg-mh-blue p-8 text-center">
                            <p className="text-white text-xl font-light">"El evento que reúne a la <span className="font-bold text-mh-gold">élite médica</span> de Medellín."</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4">Valor del Ecosistema</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-8 leading-tight">
                                Más que visibilidad, <br /><span className="text-mh-blue">Sinergia Estratégica.</span>
                            </h2>
                            <div className="space-y-6">
                                {[
                                    { title: "Acceso a Leads Calificados", desc: "Interactúe con una base de datos de más de 100 especialistas interesados y 60 asistentes confirmados." },
                                    { title: "Estatus por Asociación", desc: "Vincule su marca al Cross Business Center, el epicentro del lujo médico en Medellín." },
                                    { title: "Nichos de Alta Rentabilidad", desc: "Foco en medicina estética, dermatología y terapias alternativas — sectores con mayor demanda." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 items-start">
                                        <div className="shrink-0 w-8 h-8 rounded-full bg-mh-blue text-white flex items-center justify-center">
                                            <CheckCircle size={16} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed font-light">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="bg-mh-blue p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8">
                                <Users size={80} className="text-white/5" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-6">Perfil del Asistente</h3>
                            <ul className="space-y-4 text-slate-300">
                                <li className="flex gap-3 text-sm border-b border-white/10 pb-4">
                                    <Star size={18} className="text-mh-gold shrink-0" />
                                    Especialistas en Medicina Estética, Dermatología y Terapias Alternativas.
                                </li>
                                <li className="flex gap-3 text-sm border-b border-white/10 pb-4">
                                    <Star size={18} className="text-mh-gold shrink-0" />
                                    Profesionales de Psicología, Neuropsicología y Fonoaudiología.
                                </li>
                                <li className="flex gap-3 text-sm">
                                    <Star size={18} className="text-mh-gold shrink-0" />
                                    Enfermeras y especialistas en Tricología buscando independencia.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section >

            {/* Collaboration Tiers */}
            < section className="py-24 bg-white" >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 mb-4">Modalidades de Alianza</h2>
                        <p className="text-slate-500 max-w-2xl mx-auto font-light">Buscamos partners que aporten valor real a la experiencia del médico.</p>
                    </div>

                    {/* Featured Image */}
                    <div className="mb-16 rounded-[3rem] overflow-hidden shadow-xl max-w-4xl mx-auto">
                        <img src="/COLABORADORES.png" className="w-full max-h-[400px] object-cover" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        {/* Premium */}
                        <div className="relative p-10 rounded-[3rem] border border-mh-gold bg-white shadow-2xl shadow-mh-gold/10 overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-mh-gold text-mh-blue px-6 py-2 rounded-bl-3xl font-black text-[10px] uppercase tracking-widest">
                                Cupos Limitados
                            </div>
                            <div className="mb-8">
                                <div className="w-16 h-16 bg-mh-gold/10 rounded-2xl flex items-center justify-center text-mh-gold mb-6">
                                    <Star size={32} className="fill-mh-gold" />
                                </div>
                                <h3 className="text-2xl font-bold text-mh-blue mb-2">Nivel Premium</h3>
                                <span className="text-sm font-black text-mh-gold uppercase tracking-widest">"Socio Estratégico"</span>
                            </div>
                            <ul className="space-y-4 mb-10">
                                {[
                                    "Espacio de Booth Privilegiado",
                                    "Mesa de Muestras y Demostraciones",
                                    "Dos (2) Pendones en sala principal",
                                    "Mención especial durante charlas",
                                    "Acceso a base de datos de asistentes"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-center text-sm font-medium text-slate-600">
                                        <CheckCircle size={16} className="text-mh-gold" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Standard */}
                        <div className="p-10 rounded-[3rem] border border-slate-100 bg-slate-50 hover:bg-white transition-all duration-300">
                            <div className="mb-8">
                                <div className="w-16 h-16 bg-slate-200 rounded-2xl flex items-center justify-center text-slate-400 mb-6">
                                    <Briefcase size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Nivel Estándar</h3>
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">"Presencia de Marca"</span>
                            </div>
                            <ul className="space-y-4 mb-10">
                                {[
                                    "Espacio para un (1) Pendón general",
                                    "Mesa Compartida para brochures",
                                    "Logotipo en pantalla principal",
                                    "Logotipo en Landing Page de registro",
                                    "Posicionamiento en comunidad digital"
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-center text-sm font-medium text-slate-500">
                                        <CheckCircle size={16} className="text-slate-300" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section >

            {/* CTA Section */}
            < section className="py-24 bg-mh-blue relative overflow-hidden" >
                <div className="absolute inset-0 bg-gradient-to-r from-mh-blue via-mh-blue/95 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-30 z-0">
                    <img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/medium.jpg" className="w-full h-full object-cover" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-20">
                    <div className="max-w-3xl">
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-white mb-8 leading-tight">
                            Sea parte del futuro de la <br /><span className="text-mh-gold">medicina independiente.</span>
                        </h2>
                        <p className="text-xl text-slate-300 mb-12 font-light leading-relaxed">
                            Inicie su colaboración hoy y acompañe la evolución del primer Medical Workspace premium de Colombia.
                        </p>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[3rem]">
                            <div className="flex flex-col md:flex-row items-center gap-8">
                                <div className="shrink-0 w-24 h-24 rounded-full border-4 border-mh-gold overflow-hidden">
                                    <img src="/mafe_sabat.jpg" className="w-full h-full object-cover" />
                                </div>
                                <div className="text-center md:text-left flex-grow">
                                    <h4 className="text-2xl font-bold text-white mb-1">Mafe Sabat</h4>
                                    <p className="text-mh-gold font-bold text-sm uppercase tracking-widest mb-4">Socio Fundador - MedHause</p>
                                    <button
                                        onClick={() => window.open('https://wa.me/573053412292', '_blank')}
                                        className="bg-white text-mh-blue px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-mh-gold hover:scale-105 transition-all shadow-xl flex items-center justify-center gap-3 w-full md:w-fit"
                                    >
                                        <Phone size={18} /> Conversar con Mafe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            {/* Location Section */}
            < section className="py-20 bg-slate-100" >
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
            </section >

            {/* Footer Minimal */}
            < footer className="bg-white border-t border-slate-100 py-12" >
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">© 2026 MedHause™ — Medellín, Colombia</p>
                </div>
            </footer >
        </div >
    );
};
