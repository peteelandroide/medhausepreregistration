import React, { useState, useEffect } from 'react';
import {
    ChevronRight,
    ChevronLeft,
    TrendingUp,
    AlertCircle,
    Award,
    Users,
    ArrowRight,
    Play,
    BarChart3,
    Target,
    Zap,
    CheckCircle2,
    Briefcase,
    Stethoscope,
    Building2,
    Smartphone,
    BrainCircuit,
    ThumbsUp,
    Share2,
    MoreVertical
} from 'lucide-react';
import { Logo } from './Logo';

interface DoctorPitchProps {
    onBack: () => void;
}

export const DoctorPitch: React.FC<DoctorPitchProps> = ({ onBack }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        // Slide 0: Intro / Hook
        {
            id: 'hook',
            render: () => (
                <div className="h-full flex flex-col justify-center items-center text-center relative overflow-hidden bg-slate-950">
                    <div className="absolute inset-0 z-0">
                        <img src="/cross1.webp" alt="Consultorio Background" className="w-full h-full object-cover opacity-30 ps-[30%]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-slate-950/80"></div>
                    </div>

                    <div className="relative z-10 max-w-5xl px-6 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 text-mh-gold border border-mh-gold/30 px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-8 bg-black/40 backdrop-blur-md shadow-xl">
                            <TrendingUp size={14} /> La Inversión Real
                        </div>
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[0.9] mb-8 tracking-tighter drop-shadow-2xl">
                            LA INVERSIÓN <br />
                            MÁS IMPORTANTE <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold via-yellow-200 to-white">ERES TÚ.</span>
                        </h1>
                        <p className="text-lg md:text-2xl text-slate-300 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                            La adquisición de pacientes no empieza cuando entran a tu clínica.
                            <br /><span className="text-white font-medium">Empieza con tu Marca Personal.</span>
                        </p>
                    </div>
                </div>
            )
        },
        // Slide 1: The Gap
        {
            id: 'gap',
            render: () => (
                <div className="h-full flex flex-col md:flex-row relative bg-white">
                    <div className="flex-1 bg-white flex flex-col justify-center p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-slate-100"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1/2 opacity-10 pointer-events-none">
                            <img src="/pitch_gap.png" className="w-full h-full object-cover grayscale mix-blend-multiply" />
                        </div>
                        <h2 className="text-slate-900 text-3xl md:text-5xl font-heading font-black uppercase mb-6 leading-tight relative z-10">
                            Lo que la <br />Universidad <br /><span className="text-slate-300 line-through decoration-red-500 decoration-4">Olvido</span><span className="text-red-500">*</span>
                        </h2>
                        <ul className="space-y-6 text-slate-600 font-light text-lg relative z-10">
                            <li className="flex items-start gap-3">
                                <AlertCircle className="text-red-500 shrink-0 mt-1" />
                                <span>Nos enseñaron a salvar vidas.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <AlertCircle className="text-red-500 shrink-0 mt-1" />
                                <span>No a gestionar una empresa.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <AlertCircle className="text-red-500 shrink-0 mt-1" />
                                <span>No a competir en un mercado saturado.</span>
                            </li>
                        </ul>
                    </div>
                    <div className="flex-1 bg-slate-950 flex flex-col justify-center items-end text-right p-12 md:p-20 relative overflow-hidden">
                        <div className="absolute inset-0 z-0">
                            <img src="/cross2.webp" className="w-full h-full object-cover opacity-20 blur-sm mix-blend-overlay" />
                            <div className="absolute inset-0 bg-gradient-to-l from-slate-950/95 to-slate-950/50"></div>
                        </div>
                        <div className="absolute top-12 right-12 opacity-80">
                            <Logo variant="light" size="sm" />
                        </div>
                        <div className="relative z-10 max-w-lg">
                            <h3 className="text-mh-gold font-black uppercase tracking-[0.2em] text-sm mb-6 flex items-center justify-end gap-3">
                                <div className="h-px w-12 bg-mh-gold"></div>
                                La Realidad del Mercado
                            </h3>
                            <p className="text-white text-xl md:text-3xl font-light leading-relaxed mb-8">
                                Terminamos contratando agencias que prometen "videos".
                                <br /><br />
                                <span className="text-mh-blue font-bold">El video es una herramienta.</span>
                                <br />
                                <span className="opacity-50">No es la estrategia.</span>
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 2: Professional Bio - "De Médico a Empresario"
        {
            id: 'bio',
            render: () => (
                <div className="h-full bg-slate-950 text-white relative flex flex-col justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-slate-950">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-mh-blue/20 via-slate-950 to-slate-950"></div>
                    </div>

                    <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 text-mh-gold border border-mh-gold/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 bg-black/40 backdrop-blur-md">
                                <Briefcase size={14} /> Trayectoria
                            </div>
                            <h2 className="text-4xl md:text-6xl font-heading font-black leading-none mb-8">
                                DE MÉDICO <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold to-white">A EMPRESARIO.</span>
                            </h2>

                            <div className="grid grid-cols-1 gap-3 text-sm md:text-base mb-8">
                                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                                    <div className="bg-white/10 p-2 rounded-lg shrink-0"><Stethoscope size={20} className="text-white" /></div>
                                    <div>
                                        <h4 className="font-bold text-white">Médico Egresado Uninorte</h4>
                                        <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">Especialista Gerencia Servicios Salud</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                                    <div className="bg-mh-blue/20 p-2 rounded-lg shrink-0"><Building2 size={20} className="text-mh-blue" /></div>
                                    <div>
                                        <h4 className="font-bold text-white">CEO Doctor Flight</h4>
                                        <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">CMO Marcas Personales</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default">
                                    <div className="bg-mh-turquoise/20 p-2 rounded-lg shrink-0"><BrainCircuit size={20} className="text-mh-turquoise" /></div>
                                    <div>
                                        <h4 className="font-bold text-white">CTO Asistia</h4>
                                        <p className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wider">Automatización Sector Salud</p>
                                    </div>
                                </div>
                            </div>

                            <p className="text-slate-300 italic pl-6 border-l-2 border-mh-gold">
                                "Todo empezó haciendo <span className="text-mh-gold font-bold">un simple video para YouTube</span> durante mi año de internado..."
                            </p>
                        </div>

                        <div className="flex justify-center relative">
                            {/* Photo moved here as requested */}
                            <div className="relative w-80 h-96 md:w-96 md:h-[500px]">
                                <div className="absolute inset-0 bg-mh-gold rounded-[2rem] transform rotate-3 opacity-20"></div>
                                <div className="absolute inset-0 bg-mh-blue rounded-[2rem] transform -rotate-3 opacity-20"></div>
                                <img
                                    src="/pedro_vergara.png"
                                    className="relative w-full h-full object-cover rounded-[2rem] border-4 border-white/10 shadow-2xl z-10"
                                    alt="Pedro Vergara Bio"
                                />

                                {/* Floating Credential Badge */}
                                <div className="absolute bottom-8 -left-8 z-20 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-white/20 shadow-xl flex items-center gap-3 animate-fade-in-up">
                                    <div className="w-10 h-10 rounded-full bg-mh-gold flex items-center justify-center text-slate-900 font-bold">
                                        <Award size={20} />
                                    </div>
                                    <div>
                                        <div className="text-xs uppercase text-slate-400 font-bold">Especialista</div>
                                        <div className="text-sm font-bold text-white">Gerencia Salud</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 3: Creator Success - "Pete el Androide" with Phone Mockup
        {
            id: 'creator',
            render: () => (
                <div className="h-full relative bg-slate-950 text-white overflow-hidden flex flex-col justify-center">
                    <div className="absolute inset-0 bg-slate-950">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-mh-turquoise/10 rounded-full blur-[120px] opacity-40"></div>
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-30"></div>
                    </div>

                    <div className="h-full flex flex-col justify-center relative z-10 px-6 max-w-7xl mx-auto w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                            <div className="lg:col-span-7 space-y-8 z-20">
                                <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-white bg-red-600/90 backdrop-blur-md shadow-lg w-fit animate-pulse">
                                    <Play size={10} fill="currentColor" />
                                    EL HOBBY
                                </div>
                                <h2 className="text-6xl md:text-8xl font-heading font-black leading-none drop-shadow-2xl">
                                    PETE EL <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-turquoise via-cyan-400 to-white">ANDROIDE.</span>
                                </h2>
                                <p className="text-slate-200 text-xl leading-relaxed max-w-lg">
                                    Ese "simple video" se convirtió en la comunidad de tecnología más influyente.
                                </p>

                                <div className="grid grid-cols-2 gap-6 pt-6">
                                    <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-mh-turquoise/50 transition-all group">
                                        <Users className="text-mh-turquoise mb-4 group-hover:scale-110 transition-transform" size={32} />
                                        <div className="text-5xl font-black text-white mb-2">400K+</div>
                                        <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Seguidores Reales</div>
                                    </div>
                                    <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl hover:border-red-500/50 transition-all group">
                                        <Play className="text-red-500 mb-4 group-hover:scale-110 transition-transform" size={32} />
                                        <div className="text-5xl font-black text-white mb-2">100M+</div>
                                        <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">Vistas Orgánicas</div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-5 flex justify-center items-center relative perspective-1000">
                                {/* Phone Mockup */}
                                <div className="relative w-[300px] h-[600px] bg-black rounded-[3rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden transform rotate-y-12 hover:rotate-y-0 transition-transform duration-700">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-xl z-20"></div>

                                    {/* Screen Content */}
                                    <div className="w-full h-full bg-slate-900 flex flex-col relative">
                                        {/* Youtube App Header - Faked */}
                                        <div className="h-24 bg-slate-900 flex items-end pb-2 px-4 shadow-md z-10 sticky top-0">
                                            <div className="flex justify-between items-center w-full text-white">
                                                <div className="flex items-center gap-2">
                                                    <ChevronLeft size={20} />
                                                    <span className="font-bold">Pete el Androide</span>
                                                </div>
                                                <div className="flex gap-4">
                                                    <Share2 size={20} />
                                                    <MoreVertical size={20} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Video Feed Simulation */}
                                        <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
                                            {/* Channel Banner/Header */}
                                            <div className="h-32 bg-gradient-to-r from-cyan-600 to-blue-700 relative mb-12">
                                                <div className="absolute -bottom-8 left-4 w-20 h-20 rounded-full border-4 border-slate-900 bg-white overflow-hidden">
                                                    {/* Using Logo component as channel icon fallback or pedro if available */}
                                                    <img src="/pedro_vergara.png" className="w-full h-full object-cover" />
                                                </div>
                                            </div>

                                            <div className="px-4 mb-6 pt-2">
                                                <h3 className="text-white font-bold text-lg">Pete el Androide</h3>
                                                <p className="text-slate-400 text-xs">@PeteAndroide • 400K subscribers</p>
                                                <div className="mt-3 flex gap-2">
                                                    <button className="bg-white text-black text-xs font-bold py-1.5 px-4 rounded-full">Subscribe</button>
                                                    <button className="bg-white/10 text-white text-xs font-bold py-1.5 px-4 rounded-full border border-white/10">Videos</button>
                                                </div>
                                            </div>

                                            {/* Video Items */}
                                            {[1, 2, 3].map((_, i) => (
                                                <div key={i} className="mb-4">
                                                    <div className="aspect-video bg-slate-800 relative group overflow-hidden">
                                                        {/* Fake Thumbnail */}
                                                        <div className={`w-full h-full bg-gradient-to-br ${i === 0 ? 'from-purple-600 to-blue-600' : i === 1 ? 'from-red-600 to-orange-500' : 'from-green-600 to-emerald-500'} opacity-80 group-hover:scale-105 transition-transform duration-500`}></div>
                                                        <div className="absolute bottom-2 right-2 bg-black/80 px-1 rounded text-[10px] text-white">12:3{i}</div>
                                                        <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/50 w-12 h-12" fill="currentColor" />
                                                    </div>
                                                    <div className="flex gap-3 px-3 mt-2">
                                                        <div className="w-8 h-8 rounded-full bg-slate-700 shrink-0 overflow-hidden">
                                                            <img src="/pedro_vergara.png" className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-white text-xs font-bold leading-tight mb-1">
                                                                {i === 0 ? 'La MEJOR Tecnología Médica 2024' : i === 1 ? 'Review: iPhone vs Android para Médicos' : 'Setup Productivo para Estudiantes'}
                                                            </h4>
                                                            <p className="text-[10px] text-slate-500">Pete el Androide • {10 + i * 5}K views • {i + 1} days ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Phone Home Indicator */}
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 4: The Differentiation Question (Light)
        {
            id: 'differentiation',
            render: () => (
                <div className="h-full bg-slate-50 flex flex-col justify-center items-center px-6 relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src="/pitch_saturation.png" className="w-full h-full object-cover opacity-5 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-slate-50"></div>
                    </div>

                    <div className="max-w-4xl mx-auto text-center relative z-10">
                        <h2 className="text-slate-900 text-3xl md:text-6xl font-heading font-black uppercase mb-12 leading-tight">
                            "Doctor, ¿Por qué debería atenderme con usted..."
                        </h2>

                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                            <div className="bg-white border border-slate-200 p-6 rounded-2xl w-full md:w-auto transform -rotate-1 shadow-lg pointer-events-none">
                                <p className="text-slate-500 font-bold text-sm">...si el Dr. X tiene más experiencia?</p>
                            </div>
                            <div className="bg-white border border-slate-200 p-6 rounded-2xl w-full md:w-auto transform rotate-2 shadow-lg pointer-events-none">
                                <p className="text-slate-500 font-bold text-sm">...si la Clínica Y es más barata?</p>
                            </div>
                        </div>

                        <div className="bg-slate-900 text-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-mh-gold text-slate-900 px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs border-4 border-white shadow-xl z-20">
                                La Respuesta
                            </div>
                            <p className="text-xl md:text-3xl font-light italic leading-relaxed relative z-10">
                                "En un mercado de commodities, gana quien mejor cuenta su historia."
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 5: Competitive Advantage
        {
            id: 'advantage',
            render: () => (
                <div className="h-full bg-slate-950 flex flex-col justify-center items-center px-6 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-900/40 via-slate-950 to-mh-blue/40"></div>
                    </div>
                    <div className="absolute inset-0 z-0">
                        <img src="/cross3.webp" className="w-full h-full object-cover opacity-10 mix-blend-overlay" />
                    </div>

                    <div className="relative z-10 max-w-6xl mx-auto w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                            <div className="text-right border-r border-white/10 pr-12">
                                <h3 className="text-red-500 font-black uppercase tracking-widest text-sm mb-4">El Error Común</h3>
                                <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight opacity-50">
                                    Salir con <span className="text-red-400">1 empresa</span> <br />
                                    igual a otras <br />
                                    <span className="text-red-400 decoration-red-500 line-through">1,000</span>
                                </h2>
                                <p className="text-slate-400 text-lg">
                                    Intentar competir por precio o "calidad" en un mercado saturado es una carrera hacia el fondo.
                                </p>
                            </div>

                            <div className="pl-6">
                                <div className="inline-flex items-center gap-2 text-mh-turquoise border border-mh-turquoise/30 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 bg-mh-turquoise/10">
                                    <Zap size={14} /> La Ventaja Real
                                </div>
                                <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 leading-tight">
                                    LA DIFERENCIA ESTÁ EN LA <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold via-yellow-200 to-white">EXPERIENCIA DE SERVICIO.</span>
                                </h2>
                                <p className="text-slate-300 text-xl font-light border-l-2 border-mh-blue pl-6">
                                    No vendes consultas.<br />
                                    <span className="text-white font-bold">Vendes transformación y certeza.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        // Slide 6: The Team / Solution
        {
            id: 'team',
            render: () => (
                <div className="h-full bg-slate-950 flex flex-col relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img src="/cross2.webp" className="w-full h-full object-cover opacity-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/98 to-slate-950/20"></div>
                    </div>

                    <div className="absolute top-0 right-0 p-12 opacity-50 md:opacity-100">
                        <Logo variant="light" size="lg" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center px-6 max-w-7xl mx-auto w-full relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h5 className="text-mh-blue font-black uppercase tracking-[0.3em] text-xs mb-6">La Solución Integral</h5>
                                <h2 className="text-5xl md:text-7xl font-heading font-black text-white mb-8">
                                    EL EQUIPO <br />
                                    <span className="text-mh-gold">DETRÁS.</span>
                                </h2>
                                <p className="text-slate-300 text-lg leading-relaxed mb-10 max-w-md drop-shadow-md border-l-4 border-mh-gold pl-6">
                                    La infraestructura de lujo es solo el punto de partida.
                                    <strong className="text-white block mt-4 text-xl">
                                        MedHause es tu socio estratégico para escalar.
                                    </strong>
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl flex items-start gap-6 hover:bg-slate-800/60 transition-all cursor-default group hover:border-mh-blue/30">
                                    <div className="w-12 h-12 bg-mh-blue/10 rounded-2xl flex items-center justify-center text-mh-blue shrink-0 group-hover:scale-110 transition-transform">
                                        <BarChart3 size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-xl mb-2 group-hover:text-mh-blue transition-colors">Estrategia Financiera</h4>
                                        <p className="text-slate-400 text-sm">Modelos de negocio probados para rentabilizar tu práctica privada desde el día 1.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl flex items-start gap-6 hover:bg-slate-800/60 transition-all cursor-default group hover:border-mh-gold/30">
                                    <div className="w-12 h-12 bg-mh-gold/10 rounded-2xl flex items-center justify-center text-mh-gold shrink-0 group-hover:scale-110 transition-transform">
                                        <Target size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-xl mb-2 group-hover:text-mh-gold transition-colors">Marca Personal</h4>
                                        <p className="text-slate-400 text-sm">Producción audiovisual y estrategia de contenido que te posiciona como autoridad.</p>
                                    </div>
                                </div>
                                <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl flex items-start gap-6 hover:bg-slate-800/60 transition-all cursor-default group hover:border-mh-turquoise/30">
                                    <div className="w-12 h-12 bg-mh-turquoise/10 rounded-2xl flex items-center justify-center text-mh-turquoise shrink-0 group-hover:scale-110 transition-transform">
                                        <Users size={24} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-xl mb-2 group-hover:text-mh-turquoise transition-colors">Comunidad Elite</h4>
                                        <p className="text-slate-400 text-sm">Networking con los mejores especialistas de la región.</p>
                                    </div>
                                </div>
                            </div>
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
                        {/* Premium Key Image Background */}
                        <img src="/pitch_key.png" className="w-full h-full object-cover opacity-30" />
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/60 to-slate-950"></div>
                    </div>

                    <div className="relative z-10 max-w-4xl animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 text-white border border-white/30 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-12 bg-white/5 backdrop-blur-md">
                            <Briefcase size={14} className="text-mh-gold" /> Toma Acción Hoy
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-none mb-10 tracking-tighter drop-shadow-2xl">
                            LLEGASTE AL <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold via-yellow-200 to-mh-gold">LUGAR INDICADO.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 font-light mb-12 max-w-2xl mx-auto">
                            No solo adquieres un consultorio.
                            <br />
                            <span className="text-white font-medium">Inicias tu camino a ser el #1 de tu nicho.</span>
                        </p>

                        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                            <button className="group relative px-10 py-5 bg-mh-gold text-slate-900 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-[0_0_40px_rgba(255,215,0,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] hover:scale-105 active:scale-95">
                                <span className="flex items-center gap-3">
                                    Agendar Asesoría Estratégica <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                            <span className="text-xs text-slate-500 font-mono text-center md:text-left max-w-xs">
                                *Incluye Diagnóstico de Marca Personal & Plan Financiero
                            </span>
                        </div>

                        <div className="mt-20 flex gap-8 justify-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="flex flex-col items-center gap-2">
                                <CheckCircle2 size={24} className="text-mh-gold" />
                                <span className="text-[10px] uppercase tracking-widest text-slate-400">Sin Cláusulas Ocultas</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <CheckCircle2 size={24} className="text-mh-gold" />
                                <span className="text-[10px] uppercase tracking-widest text-slate-400">Flexibilidad Total</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <CheckCircle2 size={24} className="text-mh-gold" />
                                <span className="text-[10px] uppercase tracking-widest text-slate-400">Acompañamiento VIP</span>
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
                <div className="opacity-50 scale-75">
                    <Logo variant="light" size="sm" />
                </div>
                <div className="text-[10px] font-mono text-white/30">
                    SLIDE {currentSlide + 1} / {slides.length}
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
