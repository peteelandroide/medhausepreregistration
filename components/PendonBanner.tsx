import React from 'react';
import { Star, CheckCircle, Clock, MapPin, Zap, X, Users, Navigation, ShieldCheck, Sparkles } from 'lucide-react';

/**
 * PendonBanner - Página optimizada para impresión de pendón/banner
 * Dimensiones: 100cm x 200cm (ratio 1:2)
 * Diseño "Pixel Perfect" unificado en fondo oscuro con detalles ampliados y sección de ubicación
 */
export const PendonBanner: React.FC = () => {
    return (
        <div
            className="font-sans text-white antialiased bg-slate-950 overflow-hidden relative"
            style={{
                width: '100vw',
                maxWidth: '500px',
                aspectRatio: '1 / 2',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {/* 1. HERO - Máximo Impacto (22%) */}
            <header className="relative w-full overflow-hidden shrink-0 flex flex-col justify-center border-b border-white/5 pt-8" style={{ height: '22%' }}>
                <div className="absolute inset-0 z-0">
                    <img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/hero.jpg" className="w-full h-full object-cover opacity-40 contrast-125 scale-110" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/80 to-slate-950 z-10"></div>

                <div className="relative z-20 px-6 text-center h-full flex flex-col justify-center items-center">
                    <div className="mb-2">
                        <div className="flex flex-col items-center">
                            <span className="text-3xl font-black tracking-[0.25em] text-white leading-none">MEDHAUSE</span>
                            <span className="text-[9px] font-bold tracking-[0.35em] text-mh-gold/90 uppercase mt-1">Cross Medical Center</span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-heading font-black text-white leading-[1.1] mb-2 drop-shadow-2xl italic">
                        Tu Consultorio <br />
                        <span className="text-mh-gold not-italic">Premium por horas.</span>
                    </h1>

                    <div className="bg-mh-gold/10 backdrop-blur-md px-6 py-2 rounded-full border border-mh-gold/20 shadow-xl">
                        <p className="text-xs text-mh-gold font-bold uppercase tracking-[0.2em]">Cross Medical Center • El Poblado</p>
                    </div>
                </div>
            </header>

            {/* 2. COMPARATIVA DETALLADA (28%) */}
            <section className="bg-slate-950 px-4 py-4 shrink-0 border-b border-white/5" style={{ height: '28%' }}>
                <div className="grid grid-cols-2 gap-4 h-full">
                    {/* Columna Izquierda: Problema */}
                    <div className="flex flex-col h-full bg-white/[0.03] rounded-2xl p-3 border border-red-500/20 shadow-inner">
                        <div className="text-center mb-4">
                            <p className="text-[9px] text-red-100 font-extrabold uppercase tracking-[0.15em] bg-red-500/20 inline-block px-3 py-1 rounded-full border border-red-500/30">Realidad Actual</p>
                        </div>
                        <div className="space-y-4 flex-1">
                            {[
                                { title: "Costos Fijos Asfixiantes", desc: "Arriendo, servicios y administración que superan los $5M cada mes, consultes o no." },
                                { title: "Inversión Millonaria", desc: "Adecuar un espacio bajo norma de salud requiere un capital inicial masivo." },
                                { title: "Contratos de Permanencia", desc: "Cláusulas rígidas que te atan financieramente y limitan tu libertad." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-2 items-start opacity-90">
                                    <X size={14} className="text-red-500 shrink-0 mt-0.5 stroke-[3]" />
                                    <div>
                                        <p className="text-[10px] font-bold text-white leading-tight mb-1">{item.title}</p>
                                        <p className="text-[8px] text-slate-400 leading-normal">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Columna Derecha: Solución */}
                    <div className="flex flex-col h-full bg-mh-blue/10 rounded-2xl p-3 border border-mh-blue/20 shadow-inner">
                        <div className="text-center mb-4">
                            <p className="text-[9px] text-mh-gold font-extrabold uppercase tracking-[0.15em] bg-mh-gold/10 inline-block px-3 py-1 rounded-full border border-mh-gold/30">Solución MedHause</p>
                        </div>
                        <div className="space-y-4 flex-1">
                            {[
                                { icon: <Clock size={14} />, title: "Pago por Uso Real", desc: "Elimina contratos fijos. Reserva espacios diseñados solo cuando los necesites." },
                                { icon: <MapPin size={14} />, title: "Prestigio Inmediato", desc: "Tu marca personal en el epicentro de la salud sin preocuparte por la administración." },
                                { icon: <CheckCircle size={14} />, title: "Operación Plug & Play", desc: "Recepción, café premium e internet de alta velocidad bajo norma 3100." }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-2 items-start">
                                    <div className="text-mh-gold shrink-0 mt-0.5">{item.icon}</div>
                                    <div>
                                        <p className="text-[10px] font-bold text-white leading-tight mb-1">{item.title}</p>
                                        <p className="text-[8px] text-slate-300 leading-normal">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. INFRAESTRUCTURA VIP (25%) */}
            <section className="relative shrink-0 flex flex-col px-4 py-3 bg-slate-900 border-b border-white/5 overflow-hidden" style={{ height: '25%' }}>
                <div className="absolute inset-0 z-0">
                    <img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/premium.jpg" className="w-full h-full object-cover opacity-20" />
                </div>

                <div className="relative z-20 h-full flex flex-col justify-between py-1">
                    <div className="flex justify-between items-center mb-2 px-2">
                        <p className="text-[10px] text-mh-gold font-black uppercase tracking-widest shadow-black drop-shadow-md">Infraestructura VIP</p>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => <Star key={i} size={10} className="fill-mh-gold text-mh-gold" />)}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-3">
                        {[
                            { icon: <Star size={12} />, text: "Mobiliario Boutique" },
                            { icon: <ShieldCheck size={12} />, text: "Cumple Norma 3100" },
                            { icon: <Users size={12} />, text: "Recepción Profesional" },
                            { icon: <Sparkles size={12} />, text: "Adaptado a tu Presupuesto" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 backdrop-blur-sm">
                                <span className="text-mh-gold shrink-0">{item.icon}</span>
                                <span className="text-[8px] font-bold text-white">{item.text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-auto h-24">
                        <div className="rounded-xl overflow-hidden border border-mh-gold/30 shadow-2xl relative">
                            <img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/premium.jpg" className="w-full h-full object-cover" />
                        </div>
                        <div className="rounded-xl overflow-hidden border border-white/10 opacity-80 relative">
                            <img src="https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/medium.jpg" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. CONSOLIDATED CTA & LOCATION (25%) */}
            <section className="bg-slate-900 px-4 py-3 shrink-0 flex flex-col justify-center overflow-hidden" style={{ height: '25%' }}>
                <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="h-px bg-white/10 flex-1"></div>
                    <h2 className="text-[9px] font-heading font-black text-mh-gold uppercase tracking-[0.2em] whitespace-nowrap">
                        Inicia tu práctica hoy
                    </h2>
                    <div className="h-px bg-white/10 flex-1"></div>
                </div>

                <div className="grid grid-cols-3 gap-3 h-full pb-0.5">
                    {/* 1. Price Column */}
                    <div className="bg-slate-950 rounded-2xl shadow-xl border border-white/5 flex flex-col justify-center items-center p-2 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-1.5 opacity-5 text-mh-gold transform translate-x-2 -translate-y-2"><Zap size={40} /></div>
                        <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mb-1 text-center">Inicia Desde</p>
                        <div className="flex flex-col items-center text-mh-gold">
                            <div className="flex items-baseline gap-0.5">
                                <span className="text-sm font-black font-mono">$</span>
                                <span className="text-3xl font-heading font-black">50</span>
                                <span className="text-sm font-black">mil</span>
                            </div>
                            <p className="text-[8px] font-bold text-slate-300">/ HORA</p>
                        </div>
                        <div className="mt-2 bg-mh-gold/10 px-2 py-0.5 rounded-full border border-mh-gold/20">
                            <p className="text-[7px] text-mh-gold font-bold uppercase tracking-widest">Sin Permanencia</p>
                        </div>
                    </div>

                    {/* 2. Location Column */}
                    <div className="bg-white/[0.02] rounded-2xl border border-white/5 flex flex-col p-2 relative group overflow-hidden">
                        <div className="flex items-center gap-1.5 mb-2 px-1">
                            <MapPin size={12} className="text-mh-gold shrink-0" />
                            <p className="text-[8px] text-white font-black uppercase tracking-tight">UBICACIÓN</p>
                        </div>

                        <div className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10 mb-1 shadow-lg">
                            <img src="/cross1.webp" className="w-full h-full object-cover" />
                        </div>

                        <div className="px-1 mt-auto pb-0.5 text-center">
                            <p className="text-[8px] text-white leading-tight font-black uppercase tracking-tight">Cross Business Center</p>
                            <p className="text-[7px] text-slate-300">Sector El Poblado • Medellín</p>
                        </div>
                    </div>

                    {/* 3. Contact Column */}
                    <div className="bg-white/[0.04] backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex flex-col items-center p-2 relative overflow-hidden text-center justify-between">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mh-gold/0 via-mh-gold/40 to-mh-gold/0"></div>

                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-mh-gold/30 shadow-lg mb-1 mt-0.5">
                            <img src="/mafe_sabat.jpg" className="w-full h-full object-cover" />
                        </div>

                        <div className="mb-0.5">
                            <p className="text-[7px] text-mh-gold font-black uppercase tracking-widest leading-none mb-0.5">Mafe Sabat</p>
                            <p className="text-[10px] font-bold text-white leading-tight">Founder</p>
                        </div>

                        <div className="w-full">
                            <div className="bg-green-500/20 text-white rounded-xl py-1.5 flex flex-col items-center justify-center border border-green-500/30">
                                <p className="text-[7px] font-heading font-black tracking-[0.10em] uppercase text-green-400">¡HABLEMOS!</p>
                                <p className="text-[8px] font-mono font-black">+57 305 341 2292</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};
