import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    Clock,
    MapPin,
    ShieldCheck,
    Sparkles,
    Zap,
    CheckCircle,
    Building2,
    Users,
    Award,
    Target,
    BarChart3
} from 'lucide-react';
import { Logo } from './Logo';

export const TVShowcase: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 'hero',
            content: (
                <div className="flex flex-col items-center justify-center h-full text-center px-12">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="mb-16"
                    >
                        <Logo variant="light" size="xl" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="text-7xl md:text-9xl font-heading font-black text-white italic leading-tight uppercase tracking-tighter"
                    >
                        Tu Consultorio <br />
                        <span className="text-mh-gold not-italic">Premium por horas.</span>
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="mt-12 bg-mh-gold/10 backdrop-blur-xl px-12 py-4 rounded-full border-2 border-mh-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
                    >
                        <p className="text-3xl text-mh-gold font-black uppercase tracking-[0.4em]">Cross Medical Center • El Poblado</p>
                    </motion.div>
                </div>
            ),
            duration: 10000
        },
        {
            id: 'partners',
            content: (
                <div className="grid grid-rows-2 gap-0 h-full">
                    {/* Pedro Vergara */}
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="relative h-full overflow-hidden border-b border-white/10"
                    >
                        <img src="/pedro_vergara.png" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Pedro Vergara" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                        <div className="absolute bottom-12 left-12 right-12">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <span className="text-mh-blue font-black uppercase tracking-[0.3em] text-xl mb-2 block">Estratega Digital</span>
                                <h2 className="text-7xl font-heading font-black text-white uppercase italic leading-none">Pedro Vergara.</h2>
                                <p className="text-2xl text-slate-300 font-light mt-4">Experto en Marca Personal y captación de pacientes.</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Mafe Sabat */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="relative h-full overflow-hidden"
                    >
                        <img src="/mafe_sabat.jpg" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Mafe Sabat" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                        <div className="absolute bottom-12 left-12 right-12">
                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                            >
                                <span className="text-mh-gold font-black uppercase tracking-[0.3em] text-xl mb-2 block">Estratega de Negocios</span>
                                <h2 className="text-7xl font-heading font-black text-white uppercase italic leading-none">Mafe Sabat.</h2>
                                <p className="text-2xl text-slate-300 font-light mt-4">Especialista en Diseño de Experiencias y Rentabilidad.</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            ),
            duration: 10000
        },
        {
            id: 'spaces',
            content: (
                <div className="flex flex-col h-full px-12 py-16 justify-center">
                    <div className="mb-12">
                        <h2 className="text-3xl text-mh-gold font-black uppercase tracking-[0.5em] mb-4">Infraestructura Boutique</h2>
                        <h3 className="text-7xl font-heading font-black text-white uppercase italic leading-tight">Diseño <br />que impacta.</h3>
                        <div className="flex gap-4 mt-8">
                            {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={40} className="fill-mh-gold text-mh-gold" />)}
                        </div>
                    </div>

                    <div className="grid grid-rows-2 gap-8 h-[60vh]">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="rounded-[3rem] overflow-hidden border-2 border-mh-gold/30 relative shadow-2xl"
                        >
                            <img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/hero.jpg" className="w-full h-full object-cover" alt="Premium Consultation" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8">
                                <p className="text-4xl font-black text-white uppercase tracking-widest italic">Consultorios Premium</p>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { icon: <Building2 size={40} />, title: "Milla de Oro" },
                                { icon: <Zap size={40} />, title: "Plug & Play" },
                                { icon: <Sparkles size={40} />, title: "Exclusividad" },
                                { icon: <Award size={40} />, title: "Norma 3100" }
                            ].map((item, i) => (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 + (i * 0.1) }}
                                    key={i}
                                    className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center"
                                >
                                    <div className="text-mh-gold mb-3">{item.icon}</div>
                                    <h4 className="text-xl font-black text-white uppercase">{item.title}</h4>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            ),
            duration: 10000
        },
        {
            id: 'advisory',
            content: (
                <div className="flex flex-col h-full px-12 py-16 justify-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12"><Target size={200} /></div>

                    <div className="flex flex-col gap-12">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            <span className="text-mh-blue font-black uppercase tracking-[0.4em] text-2xl mb-4 block">Asesoría Estratégica</span>
                            <h2 className="text-7xl font-heading font-black text-white mb-8 uppercase leading-[0.9]">Transformamos <br /><span className="text-mh-gold">Tu Práctica.</span></h2>
                            <p className="text-2xl text-slate-300 font-light leading-relaxed border-l-8 border-mh-blue pl-8 italic">
                                "Construimos activos financieros."
                            </p>
                        </motion.div>

                        <div className="grid grid-rows-3 gap-6">
                            {[
                                { icon: <Users size={32} />, title: "Marca Personal Elite", desc: "Potencia tu visibilidad." },
                                { icon: <BarChart3 size={32} />, title: "Rentabilidad Real", desc: "Optimiza tus flujos." },
                                { icon: <Target size={32} />, title: "Posicionamiento", desc: "Sé el referente #1." }
                            ].map((item, i) => (
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 + (i * 0.2) }}
                                    key={i}
                                    className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 rounded-[3rem] flex items-center gap-8"
                                >
                                    <div className="w-16 h-16 bg-mh-gold/10 rounded-2xl flex items-center justify-center text-mh-gold shrink-0">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black text-white uppercase mb-1">{item.title}</h4>
                                        <p className="text-xl text-slate-400 font-light">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            ),
            duration: 10000
        },
        {
            id: 'contact',
            content: (
                <div className="flex flex-col items-center justify-center h-full text-center px-12">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="bg-slate-900/50 backdrop-blur-3xl border-2 border-white/10 rounded-[5rem] p-24 max-w-7xl w-full shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                    >
                        <Logo variant="light" size="lg" className="mb-12 mx-auto" />
                        <h2 className="text-3xl text-mh-gold font-black uppercase tracking-[0.5em] mb-8">Inicia tu práctica hoy</h2>
                        <h3 className="text-9xl font-heading font-black text-white mb-16 uppercase italic leading-none">Únete a la élite médica.</h3>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-16">
                            <div className="text-left bg-white/5 p-12 rounded-[3.5rem] border border-white/10 flex-1 w-full">
                                <p className="text-2xl text-slate-400 font-bold uppercase tracking-widest mb-4 italic">Ubicación</p>
                                <p className="text-6xl font-black text-white mb-2">Cross Medical Center</p>
                                <p className="text-3xl text-mh-gold font-light">Calle 2 Sur #46-55, Medellín</p>
                            </div>

                            <div className="bg-green-500 text-white p-12 rounded-[3.5rem] border-4 border-green-400/30 flex-1 w-full shadow-[0_20px_60px_rgba(34,197,94,0.3)]">
                                <p className="text-2xl font-black uppercase tracking-[0.3em] mb-4">Agenda tu visita</p>
                                <p className="text-7xl font-mono font-black italic">+57 305 341 2292</p>
                                <div className="mt-8 flex items-center justify-center gap-6">
                                    <span className="w-6 h-6 bg-white rounded-full animate-ping"></span>
                                    <span className="text-3xl font-bold uppercase tracking-widest">Mafe Sabat • Founder</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 2 }}
                        className="mt-16 text-2xl text-white font-black uppercase tracking-[0.8em]"
                    >
                        MedHause™ — El futuro de la salud consultada
                    </motion.p>
                </div>
            ),
            duration: 12000
        }
    ];


    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, slides[currentSlide].duration);

        return () => clearTimeout(timer);
    }, [currentSlide, slides.length]);

    return (
        <div className="fixed inset-0 bg-slate-950 overflow-hidden font-sans flex items-center justify-center">
            <div
                className="relative overflow-hidden bg-slate-950 shadow-2xl"
                style={{
                    // To fill a vertical TV (Portrait) with a horizontal computer output (Landscape):
                    // 1. We design in Portrait dimensions (Width: 1080, Height: 1920)
                    // 2. We rotate -90deg to produce a Landscape output (Width: 1920, Height: 1080)
                    // 3. This matches the computer's output and is then rotated upright by the physical TV.
                    width: '100vh',
                    height: '100vw',
                    transform: 'rotate(-90deg)',
                    transformOrigin: 'center'
                }}
            >
                {/* Background Ambience */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(18,24,38,1)_0%,rgba(2,6,23,1)_100%)]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

                {/* Animated Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.1, 0.2, 0.1],
                        x: [0, 50, 0],
                        y: [0, -30, 0]
                    }}
                    transition={{ duration: 15, repeat: Infinity }}
                    className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] bg-mh-gold/10 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.05, 0.15, 0.05],
                        x: [0, -40, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -bottom-1/4 -left-1/4 w-[60vw] h-[60vw] bg-mh-blue/10 rounded-full blur-[120px]"
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key={slides[currentSlide].id}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="relative z-10 h-full w-full"
                    >
                        {slides[currentSlide].content}
                    </motion.div>
                </AnimatePresence>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-white/5 z-50">
                    <motion.div
                        key={`bar-${currentSlide}`}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: slides[currentSlide].duration / 1000, ease: "linear" }}
                        className="h-full bg-mh-gold shadow-[0_0_20px_rgba(212,175,55,0.8)]"
                    />
                </div>

                {/* Slide Indicators */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50">
                    {slides.map((_, idx) => (
                        <div
                            key={idx}
                            className={`w-3 h-12 rounded-full transition-all duration-1000 ${idx === currentSlide ? 'bg-mh-gold shadow-[0_0_15px_rgba(212,175,55,0.5)] h-24' : 'bg-white/10'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
