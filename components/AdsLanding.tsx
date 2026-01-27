import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Star, CheckCircle, ChevronRight, Zap, ArrowLeft, Trophy, Sparkles, Wine, ShieldCheck, Users, X, Activity, DollarSign, TrendingUp, Loader2 } from 'lucide-react';
import { Logo } from './Logo';
import { LocationCard } from './LocationCard';
import { BookingView } from './BookingView';

interface AdsLandingProps {
    onHomeClick: () => void;
}

export const AdsLanding: React.FC<AdsLandingProps> = ({ onHomeClick }) => {
    // --- Booking Logic State ---
    const [showBooking, setShowBooking] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [tempBooking, setTempBooking] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        profession: '',
        specialty: '',
        habilitated: false,
        callbackTime: ''
    });
    const [loading, setLoading] = useState(false);

    const handleOpenBooking = () => {
        setShowBooking(true);
    };

    const handleBooking = (bookingDetails: any) => {
        setTempBooking(bookingDetails);
        setShowBooking(false);
        setShowRegister(true);
    };

    const finalizeBooking = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            const { space, date, startHourFormatted, endHourFormatted, total } = tempBooking;

            // Intro natural solicitada
            let msg = `Hola soy *${formData.name}* ${formData.profession} especialista en *${formData.specialty}* y me interesa reservar horas en MedHause.\n\n`;

            // Detalles estructurados
            msg += `--------------------------------\n`;
            msg += `*DETALLES DE RESERVA:*\n`;
            msg += `--------------------------------\n`;
            msg += `*Espacio:* ${space.name}\n`;
            msg += `*Fecha:* ${date.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}\n`;
            msg += `*Hora:* ${startHourFormatted} - ${endHourFormatted}\n`;
            msg += `*Valor Estimado:* ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(total)}\n\n`;

            // Datos adicionales
            msg += `*Habilitado SSSA:* ${formData.habilitated ? 'SI' : 'NO'}\n`;
            msg += `*Hora contacto:* ${formData.callbackTime}`;

            window.open(`https://wa.me/573053412292?text=${encodeURIComponent(msg)}`, '_blank');
            setLoading(false);
            setShowRegister(false);
            setShowBooking(false);
        }, 1000);
    };

    // Reusable CTA Button (Triggers Booking)
    const BookingBtn: React.FC<{ text?: string; light?: boolean }> = ({ text = 'Agendar mi Espacio Ahora', light }) => (
        <button
            onClick={handleOpenBooking}
            className={`group mt-8 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 duration-300 flex items-center justify-center gap-3 ${light
                ? 'bg-white text-mh-blue hover:bg-mh-gold hover:text-mh-blue'
                : 'bg-slate-950 text-white hover:bg-mh-blue'
                }`}
        >
            {text} <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
    );

    return (
        <div className="font-sans text-slate-900 antialiased bg-white selection:bg-mh-gold selection:text-mh-blue min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-xl z-50 border-b border-slate-100 h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
                    <button onClick={onHomeClick} className="flex items-center gap-2 text-mh-blue font-bold text-xs uppercase tracking-widest hover:text-mh-gold transition-colors">
                        <ArrowLeft size={16} /> Volver
                    </button>
                    <div style={{ transform: 'scale(0.75)' }}><Logo variant="dark" size="md" /></div>
                    <div className="w-20"></div>
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
                            <Sparkles size={14} /> Flexibilidad Total • El Poblado
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[0.95] mb-8 tracking-tight animate-fade-in-up">
                            Tu Consultorio Premium. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold via-yellow-200 to-white">Solo cuando lo necesitas.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-400 mb-12 font-light leading-relaxed max-w-2xl animate-fade-in-up">
                            Olvídate de los contratos de arriendo y los costos fijos. Paga solo por las horas de consulta que realmente tienes agendadas.
                        </p>

                        {/* Quick Stats Bar */}
                        <div className="inline-flex flex-wrap items-center gap-y-4 gap-x-8 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] animate-fade-in-up delay-300">
                            <div className="flex items-center gap-3">
                                <DollarSign className="text-mh-gold" size={20} />
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Desde</p>
                                    <p className="text-sm font-bold text-white">$55.000 / Hora</p>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-white/10"></div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="text-mh-gold" size={20} />
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Normativa</p>
                                    <p className="text-sm font-bold text-white">Res. 3100 Cumplida</p>
                                </div>
                            </div>
                            <div className="hidden md:block w-px h-8 bg-white/10"></div>
                            <div className="flex items-center gap-3">
                                <Clock className="text-mh-gold" size={20} />
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Disponibilidad</p>
                                    <p className="text-sm font-bold text-white">Agenda Inmediata</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. El Dolor: Costos Fijos */}
            <section className="py-24 bg-slate-50 relative overflow-hidden text-slate-900 border-b border-slate-100">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.03)_0%,transparent_70%)]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-red-500 font-black uppercase tracking-[0.2em] text-xs block mb-4">El Problema del Arriendo</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-8 leading-tight">
                                ¿Por qué pagar un mes entero <span className="text-red-500">si solo consultas 10 horas?</span>
                            </h2>
                            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                                El modelo tradicional está roto. Pagar arriendo, administración, servicios y secretaria mes a mes, tengas o no pacientes, drena tu rentabilidad. Cada hora que tu consultorio está vacío, es dinero que pierdes.
                            </p>
                            <BookingBtn text="Quiero pagar solo por uso" />
                        </div>
                        <div className="space-y-6">
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                        <X size={20} className="text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Costos Fijos Asfixiantes</h4>
                                        <p className="text-sm text-slate-500">Arriendo, servicios y administración superan los $5M mensuales fijos.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                        <X size={20} className="text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Inversión Inicial Alta</h4>
                                        <p className="text-sm text-slate-500">Adecuar y dotar un consultorio nuevo requiere millones en capital.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                        <X size={20} className="text-red-500" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-900 mb-2">Rigidez Contractual</h4>
                                        <p className="text-sm text-slate-500">Contratos a largo plazo que no te permiten crecer según tu flujo.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. La Solución: MedHause Benefits */}
            <section className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_30%,rgba(212,175,55,0.03)_0%,transparent_70%)]"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-mh-blue font-black uppercase tracking-[0.2em] text-xs block mb-4">La Evolución de la Consulta</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 italic">Libertad, Prestigio y Rentabilidad.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: "Flexibilidad Total", subtitle: "TU TIEMPO, TUS REGLAS", desc: "Reserva desde 1 hora. Aumenta o disminuye según tu agenda de pacientes. Sin ataduras.", icon: <Clock size={48} className="text-mh-blue" /> },
                            { title: "Ubicación Élite", subtitle: "MILLA DE ORO", desc: "Cross Medical Center, el corazón médico de El Poblado. Prestigio instantáneo.", img: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/premium.jpg", special: true },
                            { title: "Todo Incluido", subtitle: "PLUG & PLAY", desc: "Mobiliario de lujo, internet, recepción, servicios y limpieza incluidos.", icon: <CheckCircle size={48} className="text-mh-blue" /> }
                        ].map((item, i) => (
                            <div key={i} className={`group relative p-12 rounded-[4rem] border transition-all duration-500 flex flex-col items-center text-center ${item.special
                                ? 'bg-gradient-to-b from-slate-900 to-mh-blue border-mh-gold/30 shadow-[0_20px_50px_-10px_rgba(212,175,55,0.2)]'
                                : 'bg-slate-50 border-slate-100 hover:bg-white hover:shadow-2xl'
                                }`}>
                                {item.special && (
                                    <div className="absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-mh-gold text-mh-blue text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl z-30">
                                        Lo más valorado
                                    </div>
                                )}
                                <div className={`w-32 h-32 rounded-3xl flex items-center justify-center mb-10 border-4 shadow-xl group-hover:scale-105 transition-transform duration-500 overflow-hidden ${item.special ? 'bg-mh-blue/50 border-mh-gold/20' : 'bg-white border-white'}`}>
                                    {'img' in item && item.img ? <img src={item.img} className="w-full h-full object-cover" /> : item.icon}
                                </div>
                                <h4 className={`text-2xl font-bold mb-2 ${item.special ? 'text-white' : 'text-mh-blue'}`}>{item.title}</h4>
                                <p className={`text-sm font-black uppercase tracking-[0.3em] mb-6 ${item.special ? 'text-mh-gold' : 'text-slate-400'}`}>{item.subtitle}</p>
                                <p className={`text-lg leading-relaxed font-light ${item.special ? 'text-slate-300' : 'text-slate-500'}`}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 flex justify-center">
                        <BookingBtn text="Ver Espacios Disponibles" />
                    </div>
                </div>
            </section>

            {/* 4. Infrastructure Showcase */}
            <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-full opacity-10 pointer-events-none">
                    <img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/premium.jpg" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-heading font-black mb-10 leading-tight">
                                Infraestructura que <br /><span className="text-mh-gold">Vende por Ti.</span>
                            </h2>
                            <p className="text-lg text-slate-400 mb-10 font-light leading-relaxed">
                                El entorno donde atiendes comunica tu nivel profesional. MedHause está diseñado para generar confianza y justificar tus honorarios desde que el paciente cruza la puerta.
                            </p>
                            <div className="space-y-8">
                                {[
                                    { title: "Consultorios Premium", icon: <Star />, desc: "Espacios con baño privado y acabados de lujo." },
                                    { title: "Salas de Procedimientos", icon: <Activity />, desc: "Cumplimiento total normativa 3100 para procedimientos menores." },
                                    { title: "Recepción Corporativa", icon: <Users />, desc: "Tu paciente es recibido por nuestro personal profesional." },
                                    { title: "Wi-Fi Alta Velocidad", icon: <Zap />, desc: "Fibra óptica dedicada para telemedicina sin interrupciones." }
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
                                <BookingBtn text="Reservar mi Consultorio" light />
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-12 border border-white/10 relative self-start">
                            <div className="mb-8">
                                <span className="text-mh-gold font-bold uppercase tracking-widest text-[10px] mb-2 block">Standard de Calidad</span>
                                <h3 className="text-3xl font-bold text-white mb-4">Listo para Operar</h3>
                                <p className="text-slate-400 text-sm font-light">Llega, conecta tu laptop y empieza a atender. Nosotros nos ocupamos de la limpieza, mantenimiento y servicios.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3 mb-10">
                                <div className="h-32 rounded-2xl overflow-hidden border border-white/10 relative group">
                                    <img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/basic.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                        <span className="text-xs font-bold text-white">Consultorio</span>
                                    </div>
                                </div>
                                <div className="h-32 rounded-2xl overflow-hidden border border-white/10 relative group">
                                    <img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/premium.jpg" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                                        <span className="text-xs font-bold text-white">Sala Pro</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-[10px] font-black uppercase tracking-[0.3em] text-mh-gold bg-mh-gold/10 px-4 py-2 rounded-full w-fit">
                                Habilitación Garantizada
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. CTA Final */}
            <section className="py-32 bg-slate-100 relative border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="text-center lg:text-left">
                            <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900 mb-8 leading-tight">
                                Tu próximo paciente <br /><span className="text-mh-blue italic">te espera.</span>
                            </h2>
                            <p className="text-xl text-slate-500 mb-12 font-light max-w-2xl mx-auto lg:mx-0">
                                Únete a los especialistas que ya optimizan su práctica médica en El Poblado. Agenda tu primer espacio en menos de 2 minutos.
                            </p>
                            <div className="flex flex-col gap-6 mb-12">
                                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 w-fit mx-auto lg:mx-0">
                                    <CheckCircle className="text-mh-gold" size={24} />
                                    <span className="text-lg font-bold text-slate-900">Sin Cláusulas de Permanencia</span>
                                </div>
                                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-200 w-fit mx-auto lg:mx-0">
                                    <CheckCircle className="text-mh-gold" size={24} />
                                    <span className="text-lg font-bold text-slate-900">Reserva 100% Digital</span>
                                </div>
                            </div>
                            <BookingBtn text="Agendar mi Consultorio Ahora" />
                            <p className="mt-20 text-[10px] text-slate-400 font-black uppercase tracking-widest">
                                CROSS MEDICAL CENTER — EL POBLADO, MEDELLÍN
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

            {/* Footer */}
            <footer className="py-12 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <Logo variant="dark" size="md" />
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">© 2026 MedHause™</p>
                </div>
            </footer>

            {/* --- OVERLAYS AND MODALS --- */}

            {/* Booking Integration Overlay */}
            {showBooking && (
                <div className="fixed inset-0 z-[60] bg-white animate-fade-in overflow-y-auto">
                    <BookingView
                        onClose={() => setShowBooking(false)}
                        onBook={handleBooking}
                    />
                </div>
            )}

            {/* Registration Modal */}
            {showRegister && (
                <div className="fixed inset-0 z-[70] bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
                        <button
                            onClick={() => setShowRegister(false)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-900"
                        >
                            <X size={24} />
                        </button>
                        <div className="mb-6">
                            <span className="text-[10px] font-black uppercase tracking-widest text-mh-blue bg-mh-blue/10 px-3 py-1 rounded-full">
                                Casi listo
                            </span>
                            <h3 className="text-2xl font-heading font-black text-slate-900 mt-4">Tus Datos de Contacto</h3>
                            <p className="text-sm text-slate-500 mt-2">
                                Para confirmar tu reserva de <strong>{tempBooking?.space?.name || 'Consultorio'}</strong>.
                            </p>
                        </div>
                        <form onSubmit={finalizeBooking} className="space-y-4">
                            <div>
                                <input
                                    required
                                    placeholder="Tu Nombre Completo"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-mh-blue outline-none"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input
                                    required
                                    placeholder="Profesión"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-mh-blue outline-none"
                                    value={formData.profession}
                                    onChange={e => setFormData({ ...formData, profession: e.target.value })}
                                />
                                <input
                                    required
                                    placeholder="Especialidad"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-mh-blue outline-none"
                                    value={formData.specialty}
                                    onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                                />
                            </div>
                            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 text-mh-blue rounded focus:ring-mh-blue border-gray-300"
                                        checked={formData.habilitated}
                                        onChange={e => setFormData({ ...formData, habilitated: e.target.checked })}
                                    />
                                    <span className="text-xs font-bold text-slate-600">¿Estás habilitado ante Seccional de Salud?</span>
                                </label>
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-1 block">¿A qué hora podemos contactarte?</label>
                                <input
                                    required
                                    type="text"
                                    placeholder="Ej: Mañanas 8am - 12pm"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-mh-blue outline-none"
                                    value={formData.callbackTime}
                                    onChange={e => setFormData({ ...formData, callbackTime: e.target.value })}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl shadow-lg hover:shadow-green-600/30 transition-all flex items-center justify-center gap-2 mt-4"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Enviar por WhatsApp'} <ChevronRight size={18} />
                            </button>
                            <p className="text-center text-[10px] text-slate-400 mt-2">Serás redirigido a WhatsApp (+57 305 341 2292)</p>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
