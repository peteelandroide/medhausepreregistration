import React, { useState } from 'react';
import { Logo } from './Logo';
import { ChevronRight, Calendar, Star, X, CheckCircle, Zap, ShieldCheck, Loader2 } from 'lucide-react';
import { LocationCard } from './LocationCard';
import { CalculatorInput } from './CalculatorInput';
import { supabase } from '../supabaseClient';

const IMAGES = {
    hero: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/hero.jpg",
    basic: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/basic.jpg",
    medium: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/medium.jpg",
    premium: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/premium.jpg",
};

const SPACE_TYPES = [
    { id: 'PREMIUM', name: 'Premium', basePrice: 100000, desc: 'Consultorio premium con camilla y mobiliario moderno.', icon: <Star size={20} />, img: IMAGES.medium }
];

const FUTURE_SPACES = [
    { name: 'Basic', desc: 'Para consulta general y nutrición.', img: IMAGES.basic },
    { name: 'Standard', desc: 'Equilibrio perfecto entre funcionalidad y diseño.', img: IMAGES.premium }
];

interface LandingPageProps {
    onBookClick: () => void;
    onRegisterSuccess: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onBookClick, onRegisterSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [budget, setBudget] = useState(100000);
    const [formData, setFormData] = useState({
        name: '',
        specialty: '',
        city: 'Medellín',
        email: '',
        phone: '',
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const fullPhone = `57${formData.phone}`;
            const { error } = await supabase.from('leads').insert([{
                full_name: formData.name,
                specialty: formData.specialty,
                whatsapp: fullPhone,
                email: formData.email,
                interest: `Presupuesto: ${budget} - Ciudad: ${formData.city}`
            }]);

            if (error) throw error;
            onRegisterSuccess();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            alert('Hubo un error al registrar. Por favor intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const scrollToRegistration = () => {
        document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="font-sans text-slate-800 antialiased bg-white selection:bg-mh-gold selection:text-mh-blue">
            {/* Navbar con Blur */}
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100 h-20 flex items-center transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
                    <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer scale-[0.7] md:scale-[0.8] origin-left transition-transform hover:scale-90">
                        <Logo variant="dark" size="sm" />
                    </div>
                    <div className="flex items-center gap-4">
                        {/* Botón Agendar Horas */}
                        <button onClick={onBookClick} className="hidden md:flex text-xs font-bold text-mh-blue border border-slate-200 bg-slate-50 hover:bg-white hover:border-mh-blue hover:shadow-lg px-6 py-3 rounded-full transition-all items-center gap-2 group tracking-wide">
                            <Calendar size={16} className="text-slate-400 group-hover:text-mh-blue transition-colors" /> AGENDAR VISITA
                        </button>
                        {/* Botón Preregistro */}
                        <button onClick={scrollToRegistration} className="bg-mh-blue text-white px-8 py-3 rounded-full text-xs font-black hover:bg-mh-gold hover:text-mh-blue transition-all shadow-xl shadow-mh-blue/20 tracking-widest uppercase">
                            PREREGISTRO
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section - Luxury Dark */}
            <header className="relative pt-24 pb-20 md:pt-32 md:pb-40 bg-mh-blue overflow-hidden min-h-[95vh] flex items-center">
                <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
                    <img src={IMAGES.hero} className="w-full h-full object-cover scale-105" alt="Hero Background" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-mh-blue via-mh-blue/90 to-transparent z-10"></div>
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 text-mh-gold px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-lg animate-fade-in">
                            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Prelanzamiento Oficial 2025
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[0.95] mb-8 tracking-tight animate-fade-in-up">
                            El nuevo estándar <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">médico en Medellín.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                            MedHause™ es el primer Medical Workspace premium de Colombia. Independencia, prestigio y flexibilidad total para especialistas de alto nivel.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            <button onClick={scrollToRegistration} className="bg-mh-gold text-mh-blue px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_20px_40px_-10px_rgba(242,214,162,0.4)] hover:scale-105 transform duration-300 flex items-center justify-center gap-2 group">
                                Unirse a la Lista <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button onClick={onBookClick} className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3 group">
                                <Calendar size={18} className="text-mh-gold" /> Agendar Espacio
                            </button>
                        </div>

                        <div className="flex items-center gap-6 animate-fade-in border-t border-white/10 pt-8" style={{ animationDelay: '0.3s' }}>
                            <div className="flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-4 border-mh-blue bg-slate-800 flex items-center justify-center overflow-hidden">
                                        <img src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${30 + i}.jpg`} className="w-full h-full object-cover opacity-80" alt="Doctor" />
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-slate-300">
                                <span className="font-bold text-white block text-lg leading-none mb-1">+80 especialistas</span>
                                <span className="text-xs opacity-60 uppercase tracking-widest">Ya registrados en lista de espera</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Propuesta de Valor - Clean & Minimal */}
            <section className="py-32 bg-white">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <span className="text-mh-blue font-black uppercase tracking-[0.2em] text-xs block mb-4">Smart Business Model</span>
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900 mb-10 leading-tight">El consultorio que se paga solo.</h2>
                    <p className="text-xl text-slate-500 leading-relaxed mb-16 max-w-3xl mx-auto font-light">
                        MedHause™ combina coworking premium, automatización inteligente y diseño de alto nivel para ofrecer horas de consultorio listas para usar. Sin contratos forzosos.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                        <div className="bg-slate-50 p-10 rounded-[2.5rem] hover:shadow-xl transition-all duration-500 group">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm mb-6 group-hover:scale-110 transition-transform"><X size={32} /></div>
                            <h4 className="font-heading font-bold text-slate-900 text-2xl mb-4">No es un arriendo.</h4>
                            <p className="text-slate-500 leading-relaxed">Olvídate de pagar servicios, secretaria, internet o mantenimiento mensualmente. Elimina tus costos fijos al 100%.</p>
                        </div>
                        <div className="bg-slate-50 p-10 rounded-[2.5rem] hover:shadow-xl transition-all duration-500 group">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-500 shadow-sm mb-6 group-hover:scale-110 transition-transform"><CheckCircle size={32} /></div>
                            <h4 className="font-heading font-bold text-slate-900 text-2xl mb-4">Es pura rentabilidad.</h4>
                            <p className="text-slate-500 leading-relaxed">Un modelo flexible diseñado para 2025. Solo pagas por el tiempo exacto que estás facturando a tus pacientes.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* MedHause vs Consultorio Tradicional - Three Pillars */}
            <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-mh-gold rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-mh-turquoise rounded-full blur-[120px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4">¿Por Qué MedHause?</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black mb-6">Tres pilares que cambian todo.</h2>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">Prestigio, Libertad y Seguridad — los fundamentos que distinguen a MedHause de cualquier consultorio tradicional.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Pilar 1: Prestigio */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-mh-gold/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Star size={32} className="text-mh-gold" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Prestigio</h3>
                            <p className="text-slate-400 mb-6 leading-relaxed">Tu marca personal se eleva al nivel de las mejores clínicas de Medellín.</p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-mh-gold shrink-0 mt-0.5" />
                                    <span>Dirección en El Poblado — el sector más exclusivo de la ciudad</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-mh-gold shrink-0 mt-0.5" />
                                    <span>Diseño hospitalario 5 estrellas sin inversión inicial</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-mh-gold shrink-0 mt-0.5" />
                                    <span>Recepción profesional que potencia tu imagen de marca</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-500">
                                    <X size={18} className="text-red-400 shrink-0 mt-0.5" />
                                    <span><strong>Consultorio tradicional:</strong> Ubicaciones menos estratégicas, mobiliario genérico</span>
                                </li>
                            </ul>
                        </div>

                        {/* Pilar 2: Libertad */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-mh-turquoise/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <Zap size={32} className="text-mh-turquoise" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Libertad</h3>
                            <p className="text-slate-400 mb-6 leading-relaxed">Cero costos fijos. Cero contratos forzosos. 100% flexibilidad.</p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-mh-turquoise shrink-0 mt-0.5" />
                                    <span>Paga solo por las horas que realmente usas para consultar</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-mh-turquoise shrink-0 mt-0.5" />
                                    <span>Sin arriendo fijo, servicios públicos ni secretaria en nómina</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-mh-turquoise shrink-0 mt-0.5" />
                                    <span>Escala tu práctica cuando quieras, sin penalizaciones</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-500">
                                    <X size={18} className="text-red-400 shrink-0 mt-0.5" />
                                    <span><strong>Consultorio tradicional:</strong> Contratos de 1-3 años, costos fijos de $3-8M/mes</span>
                                </li>
                            </ul>
                        </div>

                        {/* Pilar 3: Seguridad */}
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group">
                            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                <ShieldCheck size={32} className="text-green-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Seguridad</h3>
                            <p className="text-slate-400 mb-6 leading-relaxed">Infraestructura que cumple todas las normas sin que tú te preocupes.</p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
                                    <span>Cumplimiento de estándares para habilitación</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
                                    <span>Esterilización, bioseguridad y RUPS siempre al día</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm">
                                    <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
                                    <span>Equipos certificados y mantenimiento preventivo garantizado</span>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-slate-500">
                                    <X size={18} className="text-red-400 shrink-0 mt-0.5" />
                                    <span><strong>Consultorio tradicional:</strong> Toda la carga normativa sobre tus hombros</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center mt-16">
                        <button onClick={scrollToRegistration} className="bg-mh-gold text-mh-blue px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-2xl hover:scale-105 transform duration-300">
                            Quiero esta ventaja competitiva
                        </button>
                    </div>
                </div>
            </section>

            {/* Tipos de Espacios - Gallery Style */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs mb-4 block">Espacios MedHause™</span>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900">Infraestructura de clase mundial.</h2>
                        </div>
                        <button onClick={onBookClick} className="text-mh-blue font-bold text-sm uppercase tracking-widest border-b-2 border-mh-blue pb-1 hover:text-mh-gold hover:border-mh-gold transition-colors">Ver disponibilidad real</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {SPACE_TYPES.map((space) => (
                            <div key={space.id} className="group relative rounded-[2.5rem] overflow-hidden bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-2">
                                <div className="h-80 overflow-hidden relative">
                                    <img src={space.img} alt={space.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                                    <div className="absolute top-6 left-6 bg-mh-gold text-mh-blue px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg">Disponible Ahora</div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <div className="text-mh-gold mb-2">{space.icon}</div>
                                        <h3 className="text-3xl font-heading font-bold">{space.name}</h3>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-slate-500 mb-8 text-sm leading-relaxed">{space.desc}</p>
                                    <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Desde</span>
                                        <span className="text-xl font-bold text-mh-blue">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(space.basePrice)}</span>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {FUTURE_SPACES.map((space, idx) => (
                            <div key={idx} className="group relative rounded-[2.5rem] overflow-hidden bg-slate-50 border border-slate-100 opacity-60 grayscale transition-all duration-500">
                                <div className="h-80 overflow-hidden relative">
                                    <img src={space.img} alt={space.name} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-slate-900/40"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="bg-white/20 backdrop-blur-md border border-white/30 px-6 py-3 rounded-full text-xs font-bold text-white uppercase tracking-[0.2em]">Próximamente</div>
                                    </div>
                                    <div className="absolute bottom-6 left-6 text-white">
                                        <h3 className="text-2xl font-heading font-bold">{space.name}</h3>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <p className="text-slate-400 text-xs leading-relaxed">{space.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Beneficios - Dark & Elegant */}
            <section className="py-32 bg-mh-blue text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-mh-turquoise/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-mh-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-5xl md:text-6xl font-heading font-black mb-8 leading-none">Beneficios <br /><span className="text-mh-gold">Fundador.</span></h2>
                            <p className="text-xl text-slate-300 mb-12 font-light leading-relaxed">Únete ahora y asegura ventajas exclusivas reservadas para los primeros 100 especialistas.</p>

                            <div className="space-y-8">
                                {[
                                    { title: "Descuento en Horas", desc: "Tarifas preferenciales vitalicias en todos los espacios." },
                                    { title: "Priority Booking", desc: "Ventana de reserva anticipada de 30 días." },
                                    { title: "Evento de Apertura", desc: "Acceso VIP al cocktail de inauguración y networking." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-6 items-start group">
                                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-mh-gold group-hover:bg-mh-gold group-hover:text-mh-blue transition-colors duration-300">
                                            <Star size={20} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-xl mb-1 group-hover:text-mh-gold transition-colors">{item.title}</h4>
                                            <p className="text-sm text-slate-400 font-light">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="absolute inset-0 bg-mh-gold blur-3xl opacity-20"></div>
                            <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-12 border border-white/10 relative shadow-2xl">
                                <div className="flex justify-between items-start mb-10">
                                    <div>
                                        <span className="text-mh-gold font-bold uppercase tracking-widest text-xs mb-2 block">Estado Actual</span>
                                        <h3 className="text-3xl font-bold text-white">Fase 1: Prelanzamiento</h3>
                                    </div>
                                    <div className="bg-red-500/20 text-red-300 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/30 animate-pulse">
                                        Cerrando
                                    </div>
                                </div>

                                <div className="bg-slate-900/50 rounded-2xl p-8 mb-8 border border-white/5">
                                    <p className="text-slate-300 italic text-lg leading-relaxed mb-6">"La calidad de los espacios y la flexibilidad de horarios es exactamente lo que necesitaba para dejar de pagar arriendo fijo."</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-700 overflow-hidden border-2 border-mh-gold/50"><img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Testimonial" /></div>
                                        <div>
                                            <div className="font-bold text-white">Dra. Camila R.</div>
                                            <div className="text-mh-gold text-xs uppercase tracking-widest">Dermatología</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-end justify-between border-t border-white/10 pt-6">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cupos disponibles</span>
                                    <span className="text-5xl font-mono text-mh-gold font-bold tracking-tighter">14</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Formulario de Registro - Floating Card */}
            <section id="registration-form" className="py-32 bg-slate-50 relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-6">Aplica a la membresía.</h2>
                        <p className="text-slate-500 text-lg">Completa tus datos profesionales. Aprobación en 24 horas.</p>
                    </div>

                    <div className="bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] p-10 md:p-16 border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-mh-blue via-mh-gold to-mh-blue"></div>

                        <form onSubmit={handleRegister} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-mh-blue/20 focus:border-mh-blue transition-all font-medium text-slate-700"
                                        placeholder="Dr. Juan Pérez"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Especialidad</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-mh-blue/20 focus:border-mh-blue transition-all font-medium text-slate-700"
                                        placeholder="Ej: Cirugía Plástica"
                                        value={formData.specialty}
                                        onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sede de Interés</label>
                                <select
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-mh-blue/20 focus:border-mh-blue transition-all appearance-none font-medium text-slate-700"
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                >
                                    <option value="Medellín">Medellín — Cross Medical Center (Apertura 2025)</option>
                                    <option value="Bogotá">Bogotá — Lista de Espera</option>
                                    <option value="Cali">Cali — Lista de Espera</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Profesional</label>
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-mh-blue/20 focus:border-mh-blue transition-all font-medium text-slate-700"
                                        placeholder="doctor@clinica.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp</label>
                                    <div className="flex">
                                        <span className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-2xl px-5 py-4 text-slate-500 font-bold flex items-center">+57</span>
                                        <input
                                            type="tel"
                                            required
                                            className="w-full bg-slate-50 border border-slate-200 rounded-r-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-mh-blue/20 focus:border-mh-blue transition-all font-medium text-slate-700"
                                            placeholder="300 123 4567"
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-8 pb-4">
                                <CalculatorInput
                                    label="Presupuesto estimado por hora"
                                    value={budget}
                                    onChange={setBudget}
                                    type="currency"
                                    max={200000}
                                    step={5000}
                                />
                                <div className="flex justify-between text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-2 px-2">
                                    <span>Básico</span>
                                    <span>Estándar</span>
                                    <span>Premium</span>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-mh-blue hover:scale-[1.02] transition-all shadow-2xl shadow-slate-900/20 text-lg flex items-center justify-center gap-3 uppercase tracking-wider"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : 'Enviar Solicitud VIP'} <ChevronRight size={20} />
                            </button>
                            <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-medium">Información confidencial sujeta a política de privacidad.</p>
                        </form>
                    </div>
                </div>
            </section>

            {/* Location Section */}
            <section className="py-20 bg-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4">Nuestra Ubicación</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">El Epicentro del <br /><span className="text-mh-blue">Lujo Médico.</span></h2>
                            <p className="text-slate-500 leading-relaxed">En el corazón de El Poblado, el sector más exclusivo de Medellín, Cross Business Center te espera para transformar tu práctica médica.</p>
                        </div>
                        <LocationCard variant="light" />
                    </div>
                </div>
            </section>

            {/* Footer Minimal */}
            <footer className="bg-white border-t border-slate-100 py-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="text-center md:text-left max-w-xs">
                        <Logo variant="dark" size="sm" />
                        <p className="text-xs text-slate-400 mt-6 font-medium leading-relaxed">Medical Workspaces on-demand diseñados para potenciar la marca personal del especialista moderno.</p>
                        <p className="text-[10px] text-slate-300 mt-4 uppercase tracking-widest">© 2025 MedHause™</p>
                    </div>
                    <div className="flex flex-col md:flex-row gap-16">
                        <div>
                            <p className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Contacto</p>
                            <p className="text-sm text-slate-600 mb-2">+57 314 876 2907</p>
                            <p className="text-sm text-slate-600">hola@medhause.co</p>
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Legal</p>
                            <a href="#" className="block text-sm text-slate-500 hover:text-mh-blue mb-2 transition-colors">Política de Datos</a>
                            <a href="#" className="block text-sm text-slate-500 hover:text-mh-blue transition-colors">Términos de Uso</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};
