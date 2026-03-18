import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, 
    CreditCard, 
    Copy, 
    Check, 
    Smartphone, 
    Send, 
    Camera, 
    Info,
    Calendar,
    ArrowRight,
    ShieldCheck
} from 'lucide-react';

interface PaymentCaroPotesProps {
    onBack: () => void;
}

export const PaymentCaroPotes: React.FC<PaymentCaroPotesProps> = ({ onBack }) => {
    const [copied, setCopied] = useState(false);
    const accountDetails = {
        number: "44231959502",
        type: "Ahorros",
        bank: "Bancolombia",
        owner: "Dra. Caro Potes"
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(accountDetails.number);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleWhatsAppClick = () => {
        const message = `Hola Dra. Caro Potes, acabo de realizar el pago para mi cita. Aquí envío el comprobante.`;
        const encodedMessage = encodeURIComponent(message);
        window.location.href = `https://wa.me/573122104560?text=${encodedMessage}`;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { 
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-mh-gold/30 overflow-x-hidden">
            {/* Background elements */}
            <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-mh-gold/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            <div className="fixed bottom-0 left-0 w-[400px] h-[400px] bg-mh-blue/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>

            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-mh-gold/10 px-6 py-4 flex justify-between items-center">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-slate-400 hover:text-mh-blue transition-colors group"
                >
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Volver
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-xs font-heading font-black tracking-tighter text-slate-900 uppercase">Dra. Caro Potes</span>
                    <span className="text-[7px] uppercase tracking-[0.2em] text-mh-gold font-bold">Otorrino & Cirugía Facial</span>
                </div>
                <div className="w-10"></div>
            </header>

            <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-12"
                >
                    {/* Hero & Card Grid for 16:9 Desktop prominence */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Column 1: Portrait & Welcome */}
                        <motion.div variants={itemVariants} className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="relative group"
                            >
                                <div className="absolute -inset-4 bg-mh-gold/10 rounded-full blur-2xl group-hover:bg-mh-gold/20 transition-colors"></div>
                                <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-mh-gold p-1.5 shadow-2xl relative overflow-hidden bg-white">
                                    <img
                                        src="/dra-caro/dr-caro-1.jpg"
                                        alt="Dra. Caro Potes"
                                        className="w-full h-full object-cover rounded-full scale-125 object-[center_25%] transition-transform duration-700 group-hover:scale-150"
                                    />
                                </div>
                            </motion.div>

                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 bg-mh-gold/10 text-mh-gold px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-mh-gold/20">
                                    Paso Final de Reserva
                                </div>
                                <h1 className="text-4xl md:text-6xl font-heading font-black leading-[0.9] tracking-tighter text-slate-950 uppercase">
                                    Información de <br />
                                    <span className="text-mh-gold italic text-3xl md:text-5xl">Transferencia.</span>
                                </h1>
                                <p className="text-slate-500 font-light max-w-md lg:mx-0">
                                    Para asegurar tu espacio en nuestra agenda de hospitalidad médica boutique, por favor realiza el pago y envía el comprobante.
                                </p>
                            </div>
                        </motion.div>

                        {/* Column 2: Bank Card */}
                        <motion.div variants={itemVariants} className="relative group w-full max-w-lg mx-auto lg:mr-0">
                            <div className="absolute -inset-1 bg-gradient-to-r from-mh-gold via-mh-blue to-mh-turquoise rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative bg-white/80 backdrop-blur-2xl rounded-[2.5rem] p-8 md:p-12 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] border border-white">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Banco</p>
                                        <p className="text-xl font-heading font-black text-slate-900 uppercase tracking-tighter">{accountDetails.bank}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-mh-gold/10 rounded-2xl flex items-center justify-center text-mh-gold">
                                        <CreditCard size={24} />
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">Número de Cuenta</p>
                                        <div className="flex items-center justify-between group/number">
                                            <p className="text-3xl md:text-4xl font-mono text-slate-900 tracking-wider">
                                                {accountDetails.number}
                                            </p>
                                            <button 
                                                onClick={copyToClipboard}
                                                className="p-3 bg-slate-50 hover:bg-mh-gold hover:text-white rounded-xl transition-all active:scale-90"
                                                title="Copiar número"
                                            >
                                                {copied ? <Check size={18} /> : <Copy size={18} />}
                                            </button>
                                        </div>
                                        <AnimatePresence>
                                            {copied && (
                                                <motion.p 
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0 }}
                                                    className="text-[10px] font-bold text-mh-gold uppercase tracking-widest"
                                                >
                                                    ¡Copiado con éxito!
                                                </motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-100">
                                        <div>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Tipo</p>
                                            <p className="text-sm font-bold text-slate-800 uppercase">{accountDetails.type}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-1">Titular</p>
                                            <p className="text-sm font-bold text-slate-800 uppercase">{accountDetails.owner}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>


                    {/* Instructions */}
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
                            <div className="w-10 h-10 bg-mh-blue/10 rounded-xl flex items-center justify-center text-mh-blue">
                                <Camera size={20} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">1. Captura</h4>
                            <p className="text-xs text-slate-500 font-light leading-relaxed">
                                Una vez realizada la transferencia, toma una captura de pantalla o foto del comprobante de pago con el número de transacción visible.
                            </p>
                        </div>

                        <div className="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 space-y-4">
                            <div className="w-10 h-10 bg-mh-turquoise/10 rounded-xl flex items-center justify-center text-mh-turquoise">
                                <Send size={20} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">2. Envía</h4>
                            <p className="text-xs text-slate-500 font-light leading-relaxed">
                                Envía la imagen a nuestra Concierge a través del botón de WhatsApp a continuación para confirmar tu cita de inmediato.
                            </p>
                        </div>
                    </motion.div>

                    {/* Notification/CTA */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <div className="flex items-start gap-4 p-6 bg-mh-blue/5 rounded-[2rem] border border-mh-blue/10">
                            <div className="mt-1 text-mh-blue">
                                <Info size={18} />
                            </div>
                            <p className="text-xs text-slate-700 font-light leading-relaxed italic">
                                "La reserva de la cita virtual por $50,000 COP o presencial por $200,000 COP es necesaria para garantizar la exclusividad y el tiempo dedicado a tu valoración personalizada."
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-6">
                            <button 
                                onClick={handleWhatsAppClick}
                                className="group relative w-full inline-flex items-center justify-center gap-3 px-10 py-5 bg-mh-gold text-slate-950 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-950 hover:text-white transition-all shadow-[0_20px_40px_-15px_rgba(212,175,55,0.4)] active:scale-95 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 -translate-x-full animate-[shimmer_3s_infinite_ease-in-out]"></div>
                                <span className="relative z-10 flex items-center gap-3">
                                    <Smartphone size={18} />
                                    Enviar Comprobante por WhatsApp
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>

                            <div className="flex items-center gap-2 text-slate-400">
                                <ShieldCheck size={14} />
                                <span className="text-[9px] uppercase font-bold tracking-[0.2em]">Pago Seguro & Confidencial</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </main>

            <footer className="py-10 border-t border-slate-100 text-center px-6">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.2em] mb-4">Dra. Caro Potes | Hospitalidad Médica Boutique</p>
                <div className="flex justify-center gap-6 opacity-30 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                    <img src="/cross-logo.png" alt="Cross Logo" className="h-6 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                    <img src="/whatsapp-logo.png" alt="WhatsApp" className="h-6 object-contain" onError={(e) => e.currentTarget.style.display = 'none'} />
                </div>
            </footer>
        </div>
    );
};
