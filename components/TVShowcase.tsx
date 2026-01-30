import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './Logo';

export const TVShowcase: React.FC = () => {
    // Static Hero Slide simplified for slow TV processors
    const heroSlideContent = (
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
    );

    return (
        <div className="fixed inset-0 bg-slate-950 overflow-hidden font-sans flex items-center justify-center">
            <div
                className="relative overflow-hidden bg-slate-950 shadow-2xl"
                style={{
                    // Width is 100vh and Height 100vw because it's a vertical box filling a horizontal signal
                    // Scale 0.8 ensures visibility within the TV frame (overscan safety)
                    width: '100vh',
                    height: '100vw',
                    transform: 'rotate(90deg) scale(0.8)',
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
