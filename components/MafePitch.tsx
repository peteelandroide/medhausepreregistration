import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    TrendingUp,
    AlertCircle,
    Award,
    Users,
    ArrowRight,
    LineChart,
    BarChart3,
    Target,
    Zap,
    CheckCircle2,
    Briefcase,
    Building2,
    Calculator,
    Clock,
    Scale,
    ShieldCheck,
    Gem,
    Euro,
    Banknote,
    Microscope
} from 'lucide-react';
import { Logo } from './Logo';

interface MafePitchProps {
    onBack: () => void;
}

export const MafePitch: React.FC<MafePitchProps> = ({ onBack }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        // Slide 0: Hook
        {
            id: 'hook',
            render: () => (
                <div className="h-full flex flex-col justify-center items-center text-center relative overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 z-0 opacity-30">
                        <img src="/cross3.webp" alt="Background" className="w-full h-full object-cover grayscale" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl px-6 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 text-mh-gold border border-mh-gold/30 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-8 bg-black/40 backdrop-blur-md">
                            <Banknote size={14} /> El Negocio de la Salud
                        </div>
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[0.9] mb-8 tracking-tighter">
                            LA RENTABILIDAD <br />
                            A TRAVÉS DE LA <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold via-yellow-200 to-white italic">EXPERIENCIA.</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed">
                            No solo diseñamos espacios.
                            <br /><span className="text-white font-medium">Diseñamos modelos de crecimiento rentable.</span>
                        </p>
                    </div>
                </div>
            )
        },
        // Slide 1: Bio - Mafe Sabat
        {
            id: 'bio',
            render: () => (
                <div className="h-full bg-slate-950 text-white relative flex flex-col justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-slate-950">
                        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-mh-blue/10 via-slate-950 to-slate-950"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                            <div className="relative w-80 h-96 md:w-[450px] md:h-[550px]">
                                <div className="absolute inset-0 border-2 border-mh-gold rounded-[3rem] transform translate-x-4 translate-y-4 opacity-30"></div>
                                <img
                                    src="/mafe_sabat.jpg"
                                    className="relative w-full h-full object-cover rounded-[3rem] border-4 border-white/10 shadow-2xl z-10 grayscale hover:grayscale-0 transition-all duration-700"
                                    alt="Mafe Sabat"
                                />
                                <div className="absolute -bottom-6 -right-6 z-20 bg-mh-gold text-slate-950 px-8 py-4 rounded-2xl shadow-xl font-heading font-black text-xl italic animate-bounce-slow">
                                    ESTRATEGA
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="inline-flex items-center gap-2 text-mh-gold border border-mh-gold/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] bg-black/40 backdrop-blur-md">
                                <Gem size={14} /> Founder & CEO
                            </div>
                            <h2 className="text-5xl md:text-7xl font-heading font-black leading-tight">
                                MARÍA FERNANDA <br />
                                <span className="text-mh-gold">SABAT.</span>
                            </h2>
                            <p className="text-slate-300 text-xl font-light leading-relaxed border-l-4 border-mh-blue pl-6">
                                Diseñadora de Experiencias y Estratega de Negocios para el sector salud.
                                <br /><br />
                                <span className="text-white font-medium italic">"Mi rol real es transformar la práctica médica tradicional en modelos altamente rentables, digitales y escalables."</span>
                            </p>
                            <div className="flex gap-4">
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex-1">
                                    <h4 className="text-mh-gold font-bold text-xs uppercase tracking-widest mb-1">Especialidad</h4>
                                    <p className="text-sm">Diseño de Experiencias de Lujo</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex-1">
                                    <h4 className="text-mh-gold font-bold text-xs uppercase tracking-widest mb-1">Enfoque</h4>
                                    <p className="text-sm">Rentabilidad & Escalamiento</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 2: The Pain - Financial Autopsy
        {
            id: 'autopsy',
            render: () => (
                <div className="h-full bg-white flex flex-col md:flex-row relative">
                    <div className="flex-1 p-12 md:p-24 flex flex-col justify-center">
                        <span className="text-red-600 font-black uppercase tracking-[0.2em] text-xs mb-4">El Dolor Financiero</span>
                        <h2 className="text-slate-900 text-4xl md:text-6xl font-heading font-black uppercase mb-8 leading-[0.9]">
                            LA AUTOPSIA DE UN <br /><span className="text-red-600">ERROR COMÚN.</span>
                        </h2>
                        <p className="text-slate-500 text-xl font-light mb-10 max-w-lg leading-relaxed">
                            Tenemos a los mejores especialistas técnicos, pero operando bajo modelos ineficientes que desangran la utilidad.
                        </p>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-red-100">
                                <AlertCircle className="text-red-600" size={24} />
                                <span className="text-slate-900 font-bold uppercase text-sm">Gasto en Ladrillos (Commodity)</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-red-100">
                                <AlertCircle className="text-red-600" size={24} />
                                <span className="text-slate-900 font-bold uppercase text-sm">Altos Costos Fijos (OPEX Sin Ocupación)</span>
                            </div>
                            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-red-100">
                                <AlertCircle className="text-red-600" size={24} />
                                <span className="text-slate-900 font-bold uppercase text-sm">Desgaste Administrativo Invisible</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-slate-950 p-12 md:p-24 relative flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-40">
                            <img src="/financial_anatomy.png" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/40 to-transparent"></div>
                        <div className="relative z-10 text-right w-full">
                            <h3 className="text-mh-gold text-2xl font-black uppercase tracking-widest mb-6">Inversión vs Gasto</h3>
                            <p className="text-white text-3xl md:text-5xl font-light leading-snug">
                                "El desangre no es el arriendo, son <span className="text-mh-blue font-bold">los costos ocultos</span> y la gestión administrativa."
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 3: Reality - Bricks vs Brand
        {
            id: 'reality',
            render: () => (
                <div className="h-full bg-slate-50 flex flex-col justify-center px-6 py-12">
                    <div className="max-w-7xl mx-auto w-full">
                        <div className="text-center mb-16">
                            <h2 className="text-slate-900 text-4xl md:text-6xl font-heading font-black uppercase italic mb-4">¿Gerente o Especialista?</h2>
                            <p className="text-slate-500 text-xl font-light">Al montar tu propio consultorio, tu cargo cambia automáticamente.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                            <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-xl group hover:border-red-500 transition-colors">
                                <div className="text-red-500 font-black uppercase tracking-widest text-xs mb-6 px-4 py-1 bg-red-50 w-fit rounded-full">Consultorio Tradicional</div>
                                <h4 className="text-2xl font-bold text-slate-900 mb-8">Usted se convierte en:</h4>
                                <ul className="space-y-6">
                                    <li className="flex items-center gap-4 text-slate-500">
                                        <Users size={20} className="text-slate-300" /> Gerente de Recursos Humanos (Nómina, Prestaciones)
                                    </li>
                                    <li className="flex items-center gap-4 text-slate-500">
                                        <Briefcase size={20} className="text-slate-300" /> Jefe de Mantenimiento & Limpieza
                                    </li>
                                    <li className="flex items-center gap-4 text-slate-500">
                                        <Target size={20} className="text-slate-300" /> Supervisor de Marketing (Sin entender ética médica)
                                    </li>
                                    <li className="flex items-center gap-4 text-slate-500">
                                        <Banknote size={20} className="text-slate-300" /> Pagador de Servicios e Internet Corporativo
                                    </li>
                                </ul>
                                <div className="mt-12 pt-8 border-t border-slate-100 text-center">
                                    <p className="text-slate-400 uppercase font-black text-[10px]">Resultado</p>
                                    <p className="text-2xl font-black text-red-600">RIESGO FINANCIERO ALTO</p>
                                </div>
                            </div>

                            <div className="bg-slate-900 p-10 rounded-[3rem] border-t-8 border-mh-gold shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                                    <Logo variant="light" size="lg" />
                                </div>
                                <div className="text-mh-gold font-black uppercase tracking-widest text-xs mb-6 px-4 py-1 bg-mh-gold/10 w-fit rounded-full">Modelo MedHause</div>
                                <h4 className="text-2xl font-bold text-white mb-8">Usted se enfoca en:</h4>
                                <ul className="space-y-6">
                                    <li className="flex items-center gap-4 text-slate-300">
                                        <CheckCircle2 size={24} className="text-mh-gold" /> Excelencia Clínica & Atención al Paciente
                                    </li>
                                    <li className="flex items-center gap-4 text-slate-300">
                                        <CheckCircle2 size={24} className="text-mh-gold" /> Escalamiento de Marca Personal
                                    </li>
                                    <li className="flex items-center gap-4 text-slate-300">
                                        <CheckCircle2 size={24} className="text-mh-gold" /> Análisis de Rentabilidad de Procedimientos
                                    </li>
                                    <li className="flex items-center gap-4 text-slate-300">
                                        <CheckCircle2 size={24} className="text-mh-gold" /> Estrategia de Crecimiento Patrimonial
                                    </li>
                                </ul>
                                <div className="mt-12 pt-8 border-t border-white/10 text-center">
                                    <p className="text-mh-gold/50 uppercase font-black text-[10px]">Resultado</p>
                                    <p className="text-2xl font-black text-white">INVERSIÓN ESTRATÉGICA META</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 4: Core - 3 Pillars of Growth
        {
            id: 'pillars',
            render: () => (
                <div className="h-full bg-slate-950 flex flex-col justify-center relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-mh-blue/10 rounded-full blur-[150px] opacity-30"></div>
                        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-mh-gold/5 rounded-full blur-[150px] opacity-20"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10 text-center">
                        <span className="text-mh-blue font-black uppercase tracking-[0.4em] text-xs mb-6 block">Nuestro Diferencial</span>
                        <h2 className="text-5xl md:text-7xl font-heading font-black text-white mb-20 leading-tight uppercase">
                            LOS 3 PILARES DEL <br /><span className="text-mh-gold italic">CRECIMIENTO.</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div className="group space-y-8 p-10 rounded-[3.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-mh-blue transition-all duration-500">
                                <div className="w-20 h-20 bg-mh-blue/20 rounded-3xl mx-auto flex items-center justify-center text-mh-blue group-hover:scale-110 transition-transform">
                                    <LineChart size={40} />
                                </div>
                                <h4 className="text-xl font-black text-white uppercase tracking-widest">Estrategia Financiera</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    Para que cada consulta y procedimiento maximice su margen de retorno. No es cuánto facturas, es cuánto conservas.
                                </p>
                            </div>
                            <div className="group space-y-8 p-10 rounded-[3.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-mh-gold transition-all duration-500">
                                <div className="w-20 h-20 bg-mh-gold/20 rounded-3xl mx-auto flex items-center justify-center text-mh-gold group-hover:scale-110 transition-transform">
                                    <Zap size={40} />
                                </div>
                                <h4 className="text-xl font-black text-white uppercase tracking-widest">Diseño de Experiencia</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    El paciente no solo compra salud, compra servicio, atención y estatus. Creamos entornos que justifican tus tarifas premium.
                                </p>
                            </div>
                            <div className="group space-y-8 p-10 rounded-[3.5rem] bg-white/5 border border-white/10 hover:bg-white/10 hover:border-mh-turquoise transition-all duration-500">
                                <div className="w-20 h-20 bg-mh-turquoise/20 rounded-3xl mx-auto flex items-center justify-center text-mh-turquoise group-hover:scale-110 transition-transform">
                                    <Target size={40} />
                                </div>
                                <h4 className="text-xl font-black text-white uppercase tracking-widest">Inteligencia Digital</h4>
                                <p className="text-slate-400 text-sm font-light leading-relaxed">
                                    Te posicionamos como líder de opinión en tu especialidad, utilizando el ecosistema digital para atraer pacientes calificados.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 5: Value - Economy of Scale
        {
            id: 'value',
            render: () => (
                <div className="h-full bg-slate-950 flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src="/cross2.webp" className="w-full h-full object-cover opacity-10" />
                        <div className="absolute inset-0 bg-gradient-to-l from-slate-950/80 via-slate-950 to-slate-950"></div>
                    </div>

                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 w-full">
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2 text-mh-gold border border-mh-gold/30 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest">
                                <TrendingUp size={16} /> El Efecto Escala
                            </div>
                            <h2 className="text-5xl md:text-8xl font-heading font-black text-white leading-[0.9] uppercase">
                                NO ES UN <span className="text-mh-blue italic">ALQUILER.</span>
                            </h2>
                            <h3 className="text-4xl md:text-5xl font-heading font-light text-slate-400 italic">Es una economía <br />de escala.</h3>
                            <p className="text-slate-300 text-xl border-l-4 border-mh-gold pl-6 py-2">
                                En MedHause, eliminamos la carga administrativa. Pero mi valor real no es el espacio, <span className="text-white font-bold">es el crecimiento estratégico que usted deja de intentar hacer solo.</span>
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-12 rounded-[4rem] shadow-2xl space-y-10">
                            <div className="flex gap-8 group">
                                <div className="w-14 h-14 bg-mh-gold/20 rounded-2xl flex items-center justify-center text-mh-gold shrink-0 group-hover:rotate-12 transition-transform">
                                    <Users size={28} />
                                </div>
                                <p className="text-slate-300 text-lg leading-relaxed">Mi equipo ejecuta estrategias de marketing especializadas para traerle <span className="text-white font-bold">pacientes calificados</span>, no solo "likes".</p>
                            </div>
                            <div className="flex gap-8 group">
                                <div className="w-14 h-14 bg-mh-blue/20 rounded-2xl flex items-center justify-center text-mh-blue shrink-0 group-hover:rotate-12 transition-transform">
                                    <Calculator size={28} />
                                </div>
                                <p className="text-slate-300 text-lg leading-relaxed">Mientras usted opera, nosotros analizamos la <span className="text-white font-bold">rentabilidad de su práctica</span> para optimizar márgenes.</p>
                            </div>
                            <div className="flex gap-8 group">
                                <div className="w-14 h-14 bg-mh-turquoise/20 rounded-2xl flex items-center justify-center text-mh-turquoise shrink-0 group-hover:rotate-12 transition-transform">
                                    <Building2 size={28} />
                                </div>
                                <p className="text-slate-300 text-lg leading-relaxed">Usted accede a la <span className="text-white font-bold">Milla de Oro</span> sin la fricción de un montaje tradicional costoso.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 6: Cost - Opportunity Cost
        {
            id: 'cost',
            render: () => (
                <div className="h-full bg-slate-50 flex flex-col justify-center items-center px-6 relative overflow-hidden">
                    <div className="max-w-5xl mx-auto text-center relative z-10">
                        <div className="flex justify-center mb-10">
                            <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                                <Clock size={40} />
                            </div>
                        </div>
                        <h2 className="text-slate-900 text-4xl md:text-7xl font-heading font-black uppercase mb-12 leading-none">
                            EL CIERRE DEL <br />
                            <span className="text-red-600 italic">COSTO DE OPORTUNIDAD.</span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 text-left">
                            <div className="bg-white p-8 rounded-3xl shadow-lg border-l-8 border-red-500">
                                <p className="text-slate-500 font-bold text-sm mb-4 uppercase tracking-widest">Escenario Tradicional</p>
                                <p className="text-lg text-slate-800 leading-relaxed italic italic">"Usted pasa horas preocupándose por si la recepcionista llegó o si el internet funciona."</p>
                            </div>
                            <div className="bg-slate-900 p-8 rounded-3xl shadow-2xl border-l-8 border-mh-gold">
                                <p className="text-mh-gold font-bold text-sm mb-4 uppercase tracking-widest">Escenario MedHause</p>
                                <p className="text-lg text-white leading-relaxed font-light italic">"Usted recupera esas horas para <span className="text-mh-gold font-bold">facturar en consulta</span> o disfrutar de su tiempo libre."</p>
                            </div>
                        </div>

                        <div className="bg-white border-2 border-slate-200 p-10 rounded-[3.5rem] relative">
                            <p className="text-2xl md:text-3xl text-slate-900 font-light leading-relaxed">
                                "¿Usted quiere gastar su dinero manteniendo una oficina, o quiere <span className="text-mh-blue font-bold">invertir</span> en un equipo que posiciona su marca y llena su agenda?"
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 7: FINAL CTA
        {
            id: 'final-cta',
            render: () => (
                <div className="h-full bg-slate-950 flex flex-col justify-center items-center text-center px-6 relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src="/financial_anatomy.png" className="w-full h-full object-cover opacity-20 blur-sm" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/70 to-slate-950"></div>
                    </div>

                    <div className="relative z-10 max-w-4xl animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 text-mh-gold border border-mh-gold/30 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-12 bg-black/40 backdrop-blur-md">
                            <Scale size={14} /> Tu Práctica como Activo
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-none mb-10 tracking-tighter">
                            SU PRÁCTICA ES UN <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold via-yellow-200 to-mh-gold">ACTIVO FINANCIERO.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 font-light mb-12 max-w-2xl mx-auto">
                            Usted no deja que un médico general haga una cirugía de corazón.
                            <br />
                            <span className="text-white font-medium italic">¿Por qué dejaría que una inmobiliaria maneje el futuro de su negocio médico?</span>
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                            <button className="group relative px-10 py-5 bg-mh-gold text-slate-900 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-[0_0_40px_rgba(255,215,0,0.3)] hover:scale-105 active:scale-95">
                                <span className="flex items-center gap-3">
                                    Agendar Asesoría con Mafe Sabat <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </div>

                        <div className="mt-20 flex gap-8 justify-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex flex-col items-center gap-2">
                                <ShieldCheck size={24} className="text-mh-gold" />
                                <span className="text-[10px] uppercase tracking-widest text-slate-400">Diseño de Experiencia Elite</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <LineChart size={24} className="text-mh-gold" />
                                <span className="text-[10px] uppercase tracking-widest text-slate-400">Maximización de ROE</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <Building2 size={24} className="text-mh-gold" />
                                <span className="text-[10px] uppercase tracking-widest text-slate-400">Infraestructura de Escala</span>
                            </div>
                        </div>
                    </div>
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
        <div className="fixed inset-0 z-50 bg-slate-950 font-sans h-screen w-screen overflow-hidden">
            {/* Top Navigation / Controls */}
            <div className="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center pointer-events-none">
                <button
                    onClick={onBack}
                    className="pointer-events-auto flex items-center gap-2 text-white/50 hover:text-white transition-colors text-[10px] uppercase font-bold tracking-widest bg-black/20 backdrop-blur-md px-4 py-2 rounded-full"
                >
                    <ChevronLeft size={14} /> Salir
                </button>
                <div className="opacity-5 scale-75">
                    <Logo variant="light" size="sm" />
                </div>
                <div className="text-[10px] font-mono text-white/30">
                    MAFE PITCH | {currentSlide + 1} / {slides.length}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="h-full w-full">
                {slides[currentSlide].render()}
            </div>

            {/* Bottom Navigation Controls */}
            <div className="absolute bottom-8 right-8 z-50 flex gap-4">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="w-12 h-12 rounded-full bg-mh-gold text-slate-900 flex items-center justify-center hover:bg-white hover:scale-105 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all shadow-lg shadow-mh-gold/20"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
                <div
                    className="h-full bg-mh-gold transition-all duration-500 ease-out"
                    style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};
