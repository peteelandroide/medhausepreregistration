import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

export const TVShowcase: React.FC = () => {
    // Static Hero Slide simplified for slow TV processors
    const heroSlideContent = (
        <div className="flex flex-col items-center justify-center h-full text-center px-24 py-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1 }}
                className="mb-2"
            >
                <Logo variant="light" size="lg" />
            </motion.div>

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="mb-4"
            >
                <h1 className="text-3xl font-heading font-black text-white leading-tight uppercase tracking-tighter italic">
                    <span className="text-mh-gold not-italic">La casa de los especialistas</span>
                </h1>
                <p className="text-lg text-slate-400 font-bold uppercase tracking-[0.3em] mt-1">
                    COWORKING MÉDICO PREMIUM EN MEDELLÍN
                </p>
            </motion.div>

            {/* Feature Section: Dra. Caro Potes */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="relative w-full max-w-2xl bg-white/5 backdrop-blur-2xl border-2 border-mh-gold/20 rounded-[3rem] p-8 flex items-center gap-8 text-left shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
            >
                <div className="flex flex-col gap-3 shrink-0">
                    <div className="w-40 h-40 rounded-[2rem] overflow-hidden border-2 border-mh-gold/30">
                        <img
                            src="/dra-caro/dr-caro-1.jpg"
                            alt="Dra. Caro Potes 1"
                            className="w-full h-full object-cover scale-110"
                        />
                    </div>
                    <div className="w-40 h-24 rounded-[1.5rem] overflow-hidden border-2 border-mh-gold/30 opacity-80">
                        <img
                            src="/dra-caro/dr-caro-3.jpg"
                            alt="Dra. Caro Potes 2"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
                <div>
                    <span className="inline-block bg-mh-gold/20 text-mh-gold px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3">
                        Especialista Destacada
                    </span>
                    <h2 className="text-4xl font-heading font-black text-white uppercase italic leading-none mb-1">
                        Dra. Caro Potes
                    </h2>
                    <p className="text-lg text-mh-gold font-bold uppercase tracking-widest mb-3">
                        Otorrino & Cirugía Facial
                    </p>
                    <p className="text-base text-slate-300 font-light leading-relaxed italic border-l-4 border-mh-gold/50 pl-4">
                        "Resultados naturales y funcionales para planear tu mejor versión."
                    </p>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-4 bg-mh-gold/10 backdrop-blur-xl px-10 py-3 rounded-full border-2 border-mh-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]"
            >
                <p className="text-xl text-mh-gold font-black uppercase tracking-[0.4em]">Cross Medical Center • El Poblado</p>
            </motion.div>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-slate-950 overflow-hidden font-sans flex items-center justify-center">
            <div
                className="relative overflow-hidden bg-slate-950 shadow-2xl"
                style={{
                    // Width is 100vh and Height 100vw because it's a vertical box filling a horizontal signal
                    // Scale 0.6 ensures visibility within the TV frame (more aggressive margins)
                    width: '100vh',
                    height: '100vw',
                    transform: 'rotate(90deg) scale(0.6)',
                    transformOrigin: 'center'
                }}
            >
                {/* Background Ambience */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(18,24,38,1)_0%,rgba(2,6,23,1)_100%)]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

                {/* Animated Gradient Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.1, 0.15, 0.1]
                    }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute -top-1/4 -right-1/4 w-[80vw] h-[80vw] bg-mh-gold/10 rounded-full blur-[120px]"
                />

                <AnimatePresence mode="wait">
                    <motion.div
                        key="static-tv-slide"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="relative z-10 h-full w-full"
                    >
                        {heroSlideContent}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
