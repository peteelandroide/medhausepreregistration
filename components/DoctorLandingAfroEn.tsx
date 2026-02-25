import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Stethoscope,
    ShieldCheck,
    Zap,
    Heart,
    MapPin,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Smartphone,
    Award,
    MessageCircle,
    Building2,
    Lock,
    ChevronLeft,
    ChevronRight,
    Droplets
} from 'lucide-react';
import { MetaPixel, trackEvent } from './MetaPixel';
import { Footer } from './Footer';

// Official Pixel ID for Dra. Caro Potes
const DRA_POTES_PIXEL_ID = '908119245544966';

interface DoctorLandingAfroEnProps {
    onBack: () => void;
}

export const DoctorLandingAfroEn: React.FC<DoctorLandingAfroEnProps> = ({ onBack }) => {
    const [funnelStep, setFunnelStep] = useState(1);
    const [funnelData, setFunnelData] = useState({
        procedure: '',
        otherProcedure: '',
        timeline: '',
        budget: '',
        preference: '',
        name: '',
        age: '',
        location: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOtherProcedures, setShowOtherProcedures] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const [firstName, ...lastNameParts] = funnelData.name.trim().split(/\s+/);
        const lastName = lastNameParts.join(' ');

        await trackEvent('Lead', {
            content_name: 'Lead Confidential Appointment Dr. Caro Afro EN',
            content_category: 'Medical Promo',
            value: 0,
            currency: 'COP',
            procedure: funnelData.procedure === 'Other' ? funnelData.otherProcedure : funnelData.procedure,
            timeline: funnelData.timeline,
            budget: funnelData.budget,
            preference: funnelData.preference
        }, {
            firstName: firstName,
            lastName: lastName || undefined,
        }, DRA_POTES_PIXEL_ID);

        const procedureText = funnelData.procedure === 'Other' ? funnelData.otherProcedure : funnelData.procedure;
        const message = `Hi Dr. Caro, I am interested in the exclusive promotion for Afro skin.\n\n*My Details:*\n- Name: ${funnelData.name}\n- Age: ${funnelData.age}\n- Lives in Medellín: ${funnelData.location}\n\n*I am interested in:*\n- Treatment: ${procedureText}\n- Timeline: ${funnelData.timeline}\n- Estimated budget: ${funnelData.budget}\n- Appointment preference: *${funnelData.preference}*\n\nLooking forward to your instructions!`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/573122104560?text=${encodedMessage}`;

        setTimeout(() => {
            window.location.href = whatsappUrl;
        }, 800);
    };

    const sectionVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-mh-gold/30 overflow-x-hidden">
            <MetaPixel pixelId={DRA_POTES_PIXEL_ID} />

            {/* Header */}
            <header className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-xl border-b border-mh-gold/10 px-6 py-4 flex justify-between items-center">
                <button
                    onClick={onBack}
                    className="flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-slate-400 hover:text-mh-blue transition-colors group"
                >
                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-xs font-heading font-black tracking-tighter text-slate-900 uppercase">Dr. Caro</span>
                    <span className="text-[7px] uppercase tracking-[0.2em] text-mh-gold font-bold">Afro Skin Specialist</span>
                </div>
                <div className="w-10"></div>
            </header>

            {/* SECTION 1: HERO */}
            <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-mh-gold/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>

                <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionVariants}
                        className="space-y-6"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="mb-4"
                        >
                            <div className="w-28 h-28 rounded-full border-2 border-mh-gold p-1 shadow-2xl mx-auto overflow-hidden bg-white">
                                <img
                                    src="/dra-caro/dr-caro-1.jpg"
                                    alt="Dr. Caro Smiling"
                                    className="w-full h-full object-cover rounded-full scale-125 object-[center_25%]"
                                />
                            </div>
                        </motion.div>

                        <div className="inline-flex items-center gap-2 bg-mh-blue/5 text-mh-blue px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-mh-blue/10">
                            Exclusive Promotion | Medellín
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-black leading-[0.9] tracking-tighter text-slate-950 uppercase">
                            Rejuvenate and <br />
                            <span className="text-mh-gold italic">even your skin tone.</span>
                        </h1>
                        <p className="max-w-xl mx-auto text-base md:text-lg text-slate-600 font-light leading-relaxed">
                            Hi, I'm <span className="text-slate-900 font-bold italic">Dr. Caro</span>. As a <strong className="text-mh-blue">medical specialist in ENT and Facial Surgery</strong>, and an expert in <strong>Afro skin</strong>, I designed this promotion to safely restore your skin's luminosity and youthfulness.
                        </p>

                        <div className="pt-8 flex flex-col items-center gap-12">
                            <a href="#leads-form" className="group relative inline-flex items-center gap-3 px-10 py-5 bg-mh-gold text-slate-950 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-950 hover:text-white transition-all shadow-[0_20px_40px_-15px_rgba(212,175,55,0.4)] active:scale-95 overflow-hidden">
                                <div className="absolute inset-0 bg-white/20 w-1/2 -skew-x-12 -translate-x-full animate-[shimmer_3s_infinite_ease-in-out]"></div>
                                <span className="relative z-10 flex items-center gap-3">Get the Promo <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
                            </a>

                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                className="flex flex-col items-center gap-2 opacity-40"
                            >
                                <span className="text-[8px] uppercase font-black tracking-[0.2em]">Scroll to see more</span>
                                <div className="w-0.5 h-8 bg-mh-gold/50 rounded-full"></div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mt-16 relative w-full max-w-lg aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white group"
                    >
                        <img
                            src="/dra-caro/hero-caro.jpg"
                            alt="Dr. Caro with Patient"
                            className="w-full h-full object-cover transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-mh-gold/20 to-transparent pointer-events-none"></div>
                        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white text-[10px] uppercase font-bold tracking-widest">
                            High-end treatments at Cross Business Center
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 2: Agitación del Dolor (Empatía) */}
            <section className="py-16 md:py-24 px-6 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-mh-gold via-slate-200 to-mh-blue opacity-30"></div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative order-2 md:order-1">
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                            <img src="/dra-caro/dr-caro-1.jpg" alt="Dr. Caro Empathetic" className="w-full h-full object-cover" />
                        </div>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-mh-gold rounded-[2rem] -z-10"></div>
                    </div>

                    <div className="order-1 md:order-2">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={sectionVariants}
                            className="space-y-12"
                        >
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-950 uppercase leading-none mb-6">
                                    I understand the challenges of <span className="text-mh-blue italic">Afro skin.</span>
                                </h2>
                            </div>

                            <div className="space-y-6">
                                <p className="text-slate-600 text-base font-light leading-relaxed">
                                    Afro skin requires expert care due to its tendency towards hyperpigmentation and hypertrophic scarring. I hear this every day:
                                </p>

                                <div className="grid grid-cols-1 gap-3">
                                    {[
                                        { text: "I'm terrified of ending up with worse dark spots.", icon: ShieldCheck },
                                        { text: "My skin feels dull and dry.", icon: Droplets },
                                        { text: "I don't want Botox to leave me with a frozen expression.", icon: Sparkles }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                                            <div className="w-8 h-8 flex items-center justify-center text-mh-gold shrink-0">
                                                <item.icon size={18} />
                                            </div>
                                            <p className="text-slate-700 text-sm italic font-light">"{item.text}"</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-6 border-t border-slate-200">
                                    <p className="text-base text-slate-900 font-light mb-6">
                                        As a specialist, my approach is safe. <span className="text-mh-gold font-bold">I use proven biostimulators and techniques without risk of dark spots.</span>
                                    </p>
                                    <a
                                        href="#leads-form"
                                        onClick={() => trackEvent('InitiateCheckout', { content_name: 'CTA_Empathy_Section' }, {}, DRA_POTES_PIXEL_ID)}
                                        className="inline-flex items-center gap-2 px-8 py-4 bg-mh-gold text-slate-950 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-slate-950 hover:text-white transition-all shadow-lg active:scale-95 group"
                                    >
                                        Claim Promotion <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: La Solución (Botox y PDRN) */}
            <section className="py-16 md:py-24 px-6 bg-white relative">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionVariants}
                        className="space-y-8"
                    >
                        <span className="text-mh-blue font-black uppercase tracking-[0.3em] text-[10px]">The perfect combo</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-950 uppercase leading-[0.9]">
                            Immediate glow, <br />
                            <span className="text-mh-gold">lasting youth.</span>
                        </h2>
                        <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">(The non-invasive gold standard)</p>
                        <p className="text-slate-600 font-light leading-relaxed">
                            I have designed this promotion by combining the preventive power of Botox with the deep cell regeneration of Salmon PDRN, achieving the ideal balance for Afro skin texture and tone.
                        </p>

                        <div className="space-y-4 pt-4 pb-8">
                            {[
                                { title: "Neuromodulators (Botox)", desc: "Relaxes dynamic wrinkles and prevents deep furrows subtly and elegantly.", color: "mh-turquoise" },
                                { title: "Salmon PDRN (Polynucleotides)", desc: "A Salmon DNA-based biostimulator highly compatible with your skin. It repairs tissue at a genetic level, evens out skin tone, treats dark spots, and provides an unbeatable 'glass skin' effect.", color: "mh-blue" },
                                { title: "Zero Downtime", desc: "Quick-recovery outpatient procedures, so you can return to your routine immediately.", color: "mh-gold" }
                            ].map((item, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className={`w-6 h-6 rounded-full bg-${item.color}/10 border border-${item.color}/20 flex items-center justify-center text-${item.color} shrink-0 mt-1`}>
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">{item.title}</h4>
                                        <p className="text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a
                            href="#leads-form"
                            onClick={() => trackEvent('InitiateCheckout', { content_name: 'CTA_Solution_Section' }, {}, DRA_POTES_PIXEL_ID)}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-mh-blue text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-slate-950 transition-all shadow-lg active:scale-95 group"
                        >
                            Book My Appointment <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>

                    <div className="relative">
                        <div className="aspect-square bg-slate-100 rounded-[3.5rem] overflow-hidden shadow-2xl relative rotate-3 group-hover:rotate-0 transition-transform duration-700">
                            <img src="/dra-caro/consultation-1.jpg" alt="Clinical Context" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-mh-blue/20 via-transparent to-mh-gold/20"></div>
                            <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                                <p className="text-2xl font-heading font-black text-white uppercase italic drop-shadow-md">Medical honesty as a standard.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: Autoridad y Diferenciación (Racional) */}
            <section className="py-16 md:py-24 px-6 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
                        <div className="lg:col-span-7">
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={sectionVariants}
                                className="text-left"
                            >
                                <h2 className="text-3xl md:text-5xl font-heading font-black uppercase mb-4 tracking-tighter italic">
                                    Why choose a <br /><span className="text-mh-gold">trained specialist?</span>
                                </h2>
                                <p className="text-slate-400 font-light max-w-xl">
                                    Afro skin requires the highest quality inputs and a specialist who understands deep melanin and its inflammatory reactions.
                                </p>
                            </motion.div>
                        </div>
                        <div className="lg:col-span-5">
                            <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10">
                                <img src="/dra-caro/dr-caro-3.jpg" className="w-full h-full object-cover" alt="Dr. Caro Authority" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-[3rem] hover:bg-white/10 transition-all group">
                            <div className="w-14 h-14 bg-mh-blue/20 rounded-2xl flex items-center justify-center text-mh-blue mb-6 group-hover:scale-110 transition-transform">
                                <Stethoscope size={28} />
                            </div>
                            <h4 className="text-lg md:text-xl font-black uppercase mb-3 tracking-tighter">Surgical <br />Specialist</h4>
                            <p className="text-sm text-slate-400 font-light leading-relaxed">
                                As a medical specialist in ENT and Facial Surgery, I guarantee deep anatomical knowledge for safe and natural results on your face.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-[3rem] hover:bg-white/10 transition-all group lg:scale-105 shadow-2xl border-mh-gold/30">
                            <div className="w-14 h-14 bg-mh-gold/20 rounded-2xl flex items-center justify-center text-mh-gold mb-6 group-hover:scale-110 transition-transform">
                                <Zap size={28} />
                            </div>
                            <h4 className="text-lg md:text-xl font-black uppercase mb-3 tracking-tighter">Premium <br />Inputs</h4>
                            <p className="text-sm text-slate-300 font-light leading-relaxed">
                                I use high-purity brands approved by INVIMA. This is vital for high phototypes, guaranteeing effectiveness without inflammatory risks.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 md:p-10 rounded-[3rem] hover:bg-white/10 transition-all group">
                            <div className="w-16 h-16 bg-mh-turquoise/20 rounded-2xl flex items-center justify-center text-mh-turquoise mb-8 group-hover:scale-110 transition-transform">
                                <Award size={32} />
                            </div>
                            <h4 className="text-xl font-black uppercase mb-4 tracking-tighter">Focused <br />Experience</h4>
                            <p className="text-sm text-slate-400 font-light leading-relaxed">
                                Years of experience dedicated to the skin care of my patients, ensuring stable treatment and maintenance protocols for flawless skin mapping.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION: FAQ */}
            <section className="py-24 px-6 bg-white relative overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionVariants}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-950 uppercase mb-4">
                            Rates and <span className="text-mh-gold italic">Promotion</span>
                        </h2>
                        <p className="text-slate-500 font-light">Clear your doubts about the exclusive prices we have prepared.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                q: "What does the current promotion consist of?",
                                a: "We have created an exclusive package with preferential pricing for Neuromodulators (Botox) and Salmon PDRN. Both treatments have proven extraordinary results in dark skin tones."
                            },
                            {
                                q: "What is the price of the Botox treatment?",
                                a: "The promotional rate starts at $15,000 COP per unit. An accessible investment to soften fine lines with the highest quality and subtlety."
                            },
                            {
                                q: "What is Salmon PDRN and what is its price?",
                                a: "PDRN (Salmon Polynucleotides) is a DNA regenerator that stimulates collagen, erases dark spots, and deeply hydrates. The promotional session is only $650,000 COP. We normally recommend 3 sessions."
                            },
                            {
                                q: "Where does Dr. Caro serve patients?",
                                a: "My main office is located in the prestigious Cross Business Center, in Medellín's Milla de Oro (El Poblado). A space designed for your comfort and absolute privacy."
                            },
                            {
                                q: "Do you offer any discounts for the complete package?",
                                a: "Yes! If you decide to get both the Botox treatment and the Salmon PDRN revitalizer in the same session, you get an additional 10% discount on the preferential value."
                            },
                            {
                                q: "How do I book my appointment?",
                                a: "It's very simple: complete the form below and my Concierge will contact you immediately via WhatsApp to coordinate the time that best suits you."
                            }
                        ].map((faq, idx) => (
                            <div key={idx} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:border-mh-gold/30 transition-all group">
                                <h4 className="text-sm font-black uppercase tracking-tight text-slate-900 mb-4 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-mh-gold"></div>
                                    {faq.q}
                                </h4>
                                <p className="text-sm text-slate-600 font-light leading-relaxed">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <p className="text-xs text-slate-400 font-medium uppercase tracking-[0.2em] mb-4 text-center">Do you have another question?</p>
                        <a
                            href="https://wa.me/573122104560?text=Hi Dr. Caro, I have a question about the Botox and PDRN promotion..."
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('Contact', { content_name: 'FAQ_WhatsApp_Contact' }, {}, DRA_POTES_PIXEL_ID)}
                            className="inline-flex items-center gap-2 text-mh-blue font-black uppercase tracking-widest text-[10px] border-b border-mh-blue/30 pb-1 hover:border-mh-blue transition-all"
                        >
                            Ask our Concierge <ArrowRight size={12} />
                        </a>
                    </div>
                </div>
            </section>

            {/* SECTION 6: Formulario (Bottom of the Funnel) */}
            <section id="leads-form" className="py-24 px-6 bg-[#FAF9F6] relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-full h-full bg-mh-gold/5 blur-[100px] -z-10"></div>

                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={sectionVariants}
                        className="space-y-12"
                    >
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-950 uppercase leading-none">
                                Take Advantage of the Promo <br /><span className="text-mh-gold italic">for Afro Skin</span>
                            </h2>
                            <p className="text-slate-500 font-light max-w-lg mx-auto">
                                Leave us your details. My confidential care team (<span className="text-slate-900 font-medium italic">our Concierge</span>) will text you via WhatsApp to secure your spot and schedule our first meeting.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="space-y-8 hidden lg:block">
                                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl rotate-2">
                                    <img src="/dra-caro/consultation-2.jpg" alt="Trust" className="w-full h-full object-cover" />
                                </div>
                                <div className="p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-mh-gold/10">
                                    <p className="text-slate-600 italic font-light">"Preventive care and DNA regeneration do not distinguish skin type; but my knowledge of high phototypes will make all the difference."</p>
                                    <p className="text-xs font-black uppercase text-mh-gold mt-4">— Dr. Caro</p>
                                </div>
                            </div>

                            <div className="bg-white/80 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-white max-w-xl mx-auto text-left relative overflow-hidden flex flex-col min-h-[500px]">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-mh-blue via-mh-gold to-mh-turquoise bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]"></div>

                                <div className="absolute top-0 right-0 p-8 opacity-5">
                                    <MessageCircle size={100} />
                                </div>

                                <div className="w-full bg-slate-100/50 h-2 rounded-full mb-8 overflow-hidden shadow-inner border border-slate-200/50">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-mh-gold to-yellow-500 shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                                        initial={{ width: '0%' }}
                                        animate={{ width: `${(funnelStep / 5) * 100}%` }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    />
                                </div>

                                <div className="flex-1 relative">
                                    <AnimatePresence mode="popLayout">
                                        {/* STEP 1: PROCEDURE */}
                                        {funnelStep === 1 && (
                                            <motion.div
                                                key="step1"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <h3 className="text-2xl font-black uppercase text-slate-900 mb-6 tracking-tighter">What promo treatment are you interested in?</h3>
                                                <div className="space-y-4">
                                                    {[
                                                        { id: 'Botox', name: 'Neuromodulators (Botox)' },
                                                        { id: 'PDRN', name: 'Salmon PDRN (Hydration/Spots)' },
                                                        { id: 'Both', name: 'Both treatments (Botox + PDRN)' }
                                                    ].map((proc) => (
                                                        <button
                                                            key={proc.id}
                                                            onClick={() => {
                                                                trackEvent('AddToCart', { content_name: `Selected_${proc.id}` }, {}, DRA_POTES_PIXEL_ID);
                                                                setFunnelData({ ...funnelData, procedure: proc.name });
                                                                setShowOtherProcedures(false);
                                                                setTimeout(() => setFunnelStep(2), 400);
                                                            }}
                                                            className={`w-full p-6 rounded-2xl border text-left flex items-center justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${funnelData.procedure === proc.name ? 'border-mh-gold bg-mh-gold/10 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)] ring-2 ring-mh-gold ring-offset-2' : 'border-slate-100 bg-white hover:border-mh-gold/30 shadow-sm'}`}
                                                        >
                                                            <div className="flex flex-col">
                                                                <span className="font-bold text-slate-800 text-lg">{proc.name}</span>
                                                                <span className="text-[9px] uppercase tracking-widest text-mh-gold font-black mt-1 opacity-60 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                                                                    Select and continue
                                                                </span>
                                                            </div>
                                                            {funnelData.procedure === proc.name ? (
                                                                <div className="w-8 h-8 rounded-full bg-mh-gold text-white flex items-center justify-center animate-bounce-in">
                                                                    <CheckCircle2 size={18} />
                                                                </div>
                                                            ) : (
                                                                <ArrowRight size={20} className="text-slate-300 group-hover:text-mh-gold group-hover:translate-x-2 transition-all" />
                                                            )}
                                                        </button>
                                                    ))}

                                                    <button
                                                        onClick={() => {
                                                            trackEvent('ViewContent', { content_name: 'Viewed_Other_Procedures' }, {}, DRA_POTES_PIXEL_ID);
                                                            setShowOtherProcedures(!showOtherProcedures);
                                                        }}
                                                        className={`w-full p-6 rounded-2xl border text-left flex items-center justify-between group transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${funnelData.procedure === 'Other' ? 'border-mh-gold bg-mh-gold/10 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)] ring-2 ring-mh-gold ring-offset-2' : 'border-slate-100 bg-white hover:border-mh-gold/30 shadow-sm'}`}
                                                    >
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-slate-800 text-lg">Other Aesthetic Treatment</span>
                                                            <span className="text-[9px] uppercase tracking-widest text-slate-400 font-black mt-1">View options</span>
                                                        </div>
                                                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 transition-transform group-hover:bg-mh-gold/10 group-hover:text-mh-gold">
                                                            <ChevronRight size={18} className={`transition-transform duration-300 ${showOtherProcedures ? 'rotate-90' : ''}`} />
                                                        </div>
                                                    </button>

                                                    <AnimatePresence>
                                                        {showOtherProcedures && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                className="pl-4 space-y-2 overflow-hidden"
                                                            >
                                                                {['Lip Fillers', 'Biostimulators', 'Deep Facial Cleansing'].map((proc) => (
                                                                    <button
                                                                        key={proc}
                                                                        onClick={() => {
                                                                            trackEvent('AddToCart', { content_name: 'Selected_Other_Procedure', procedure: proc }, {}, DRA_POTES_PIXEL_ID);
                                                                            setFunnelData({ ...funnelData, procedure: 'Other', otherProcedure: proc });
                                                                            setTimeout(() => setFunnelStep(2), 400);
                                                                        }} className={`w-full p-4 rounded-xl text-left font-medium transition-all flex justify-between items-center group ${funnelData.otherProcedure === proc ? 'bg-mh-gold text-slate-900 shadow-lg scale-[1.02]' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:scale-[1.01]'}`}
                                                                    >
                                                                        <span>{proc}</span>
                                                                        {funnelData.otherProcedure === proc && <CheckCircle2 size={16} className="text-slate-900" />}
                                                                    </button>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* STEP 2: TIMELINE */}
                                        {funnelStep === 2 && (
                                            <motion.div
                                                key="step2"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <h3 className="text-2xl font-black uppercase text-slate-900 mb-6 tracking-tighter">When would you like to schedule?</h3>
                                                <div className="grid grid-cols-1 gap-4">
                                                    {['As soon as possible', 'This fortnight', 'In a month', 'I do not know yet, just pricing'].map((time) => (
                                                        <button
                                                            key={time}
                                                            onClick={() => {
                                                                trackEvent('AddToCart', { content_name: 'Selected_Timeline', timeline: time }, {}, DRA_POTES_PIXEL_ID);
                                                                setFunnelData({ ...funnelData, timeline: time });
                                                                setTimeout(() => setFunnelStep(3), 400);
                                                            }}
                                                            className={`p-6 rounded-2xl border flex items-center justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg ${funnelData.timeline === time ? 'border-mh-gold bg-mh-gold/10 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)] ring-2 ring-mh-gold ring-offset-2' : 'border-slate-100 bg-white hover:border-mh-gold/30 shadow-sm'}`}
                                                        >
                                                            <div className="flex flex-col items-start text-left">
                                                                <span className="font-bold text-slate-800 text-lg">{time}</span>
                                                                <span className="text-[9px] uppercase tracking-widest font-black mt-1 opacity-40 group-hover:opacity-100 transition-opacity text-slate-400 group-hover:text-mh-gold">Select</span>
                                                            </div>
                                                            {funnelData.timeline === time ? (
                                                                <div className="w-8 h-8 rounded-full bg-mh-gold text-white flex items-center justify-center animate-bounce-in">
                                                                    <CheckCircle2 size={18} />
                                                                </div>
                                                            ) : (
                                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-mh-gold/10 group-hover:text-mh-gold transition-all">
                                                                    <ChevronRight size={18} />
                                                                </div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                                <button onClick={() => setFunnelStep(1)} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-6 flex items-center gap-1 hover:text-mh-gold">
                                                    <ChevronLeft size={12} /> Back
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* STEP 3: BUDGET */}
                                        {funnelStep === 3 && (
                                            <motion.div
                                                key="step3"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <h3 className="text-2xl font-black uppercase text-slate-900 mb-2 tracking-tighter">What is your estimated budget?</h3>
                                                <p className="text-xs text-slate-500 font-light mb-6">Depending on what you select, we validate how many areas or sessions we can cover.</p>
                                                <div className="grid grid-cols-1 gap-4">
                                                    {['Between 500k and 1m COP', 'Between 1m and 2m COP', 'Between 2m and 3m COP', 'More than 3m COP'].map((budget) => (
                                                        <button
                                                            key={budget}
                                                            onClick={() => {
                                                                trackEvent('AddToCart', { content_name: 'Selected_Budget', budget: budget }, {}, DRA_POTES_PIXEL_ID);
                                                                setFunnelData({ ...funnelData, budget: budget });
                                                                setTimeout(() => setFunnelStep(4), 400);
                                                            }}
                                                            className={`p-6 rounded-2xl border flex items-center justify-between transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg ${funnelData.budget === budget ? 'border-mh-gold bg-mh-gold/10 shadow-[0_10px_30px_-10px_rgba(212,175,55,0.3)] ring-2 ring-mh-gold ring-offset-2' : 'border-slate-100 bg-white hover:border-mh-gold/30 shadow-sm'}`}
                                                        >
                                                            <div className="flex flex-col items-start text-left">
                                                                <span className="font-bold text-slate-800 text-lg">{budget}</span>
                                                                <span className="text-[9px] uppercase tracking-widest font-black mt-1 opacity-40 group-hover:opacity-100 transition-opacity text-slate-400 group-hover:text-mh-gold">Select</span>
                                                            </div>
                                                            {funnelData.budget === budget ? (
                                                                <div className="w-8 h-8 rounded-full bg-mh-gold text-white flex items-center justify-center animate-bounce-in">
                                                                    <CheckCircle2 size={18} />
                                                                </div>
                                                            ) : (
                                                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-mh-gold/10 group-hover:text-mh-gold transition-all">
                                                                    <ChevronRight size={18} />
                                                                </div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                                <button onClick={() => setFunnelStep(2)} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-6 flex items-center gap-1 hover:text-mh-gold">
                                                    <ChevronLeft size={12} /> Back
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* STEP 4: PREFERENCE */}
                                        {funnelStep === 4 && (
                                            <motion.div
                                                key="step4"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <h3 className="text-2xl font-black uppercase text-slate-900 mb-4 tracking-tighter">Let's take the next step</h3>
                                                <div className="p-4 bg-mh-blue/5 rounded-2xl border border-mh-blue/10 mb-6">
                                                    <p className="text-sm text-slate-700 font-light leading-relaxed">
                                                        You can set up an <span className="font-bold">in-person appointment</span> for an assessment and have the procedure performed right away.
                                                    </p>
                                                </div>
                                                <div className="grid grid-cols-1 gap-4">
                                                    <button
                                                        onClick={() => {
                                                            trackEvent('Schedule', { content_name: 'Selected_Consultation', preference: 'Virtual Pre-Consultation' }, {}, DRA_POTES_PIXEL_ID);
                                                            setFunnelData({ ...funnelData, preference: 'Virtual Pre-Consultation' });
                                                            setTimeout(() => setFunnelStep(5), 400);
                                                        }}
                                                        className={`p-6 md:p-8 rounded-3xl border flex flex-col items-center justify-center gap-4 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl ${funnelData.preference === 'Virtual Pre-Consultation' ? 'border-mh-gold bg-mh-gold/10 shadow-[0_15px_40px_-10px_rgba(212,175,55,0.4)] ring-2 ring-mh-gold ring-offset-2' : 'border-slate-100 bg-white hover:border-mh-gold/30 shadow-md'}`}
                                                    >
                                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${funnelData.preference === 'Virtual Pre-Consultation' ? 'bg-mh-gold text-white' : 'bg-slate-50 text-slate-300 group-hover:bg-mh-gold/10 group-hover:text-mh-gold'}`}>
                                                            <Smartphone size={32} strokeWidth={1.5} />
                                                        </div>
                                                        <div className="text-center">
                                                            <span className="font-black text-slate-800 block text-lg mb-1">Virtual Pre-Consultation</span>
                                                            <span className="text-[9px] uppercase tracking-widest text-[#DBB353] font-black opacity-60 group-hover:opacity-100 transition-opacity">If you have doubts first</span>
                                                        </div>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            trackEvent('Schedule', { content_name: 'Selected_Consultation', preference: 'In-person Appointment' }, {}, DRA_POTES_PIXEL_ID);
                                                            setFunnelData({ ...funnelData, preference: 'In-person Appointment' });
                                                            setTimeout(() => setFunnelStep(5), 400);
                                                        }}
                                                        className={`p-6 md:p-8 rounded-3xl border flex flex-col items-center justify-center gap-4 transition-all duration-300 group hover:-translate-y-2 hover:shadow-xl ${funnelData.preference === 'In-person Appointment' ? 'border-mh-gold bg-mh-gold/10 shadow-[0_15px_40px_-10px_rgba(212,175,55,0.4)] ring-2 ring-mh-gold ring-offset-2' : 'border-slate-100 bg-white hover:border-mh-gold/30 shadow-md'}`}
                                                    >
                                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${funnelData.preference === 'In-person Appointment' ? 'bg-mh-gold text-white' : 'bg-slate-50 text-slate-300 group-hover:bg-mh-gold/10 group-hover:text-mh-gold'}`}>
                                                            <MapPin size={32} strokeWidth={1.5} />
                                                        </div>
                                                        <div className="text-center">
                                                            <span className="font-black text-slate-800 block text-lg mb-1">Appointment for Application</span>
                                                            <span className="text-[9px] uppercase tracking-widest text-[#4A8B95] font-black opacity-60 group-hover:opacity-100 transition-opacity">Tap to select</span>
                                                        </div>
                                                    </button>
                                                </div>
                                                <button onClick={() => setFunnelStep(3)} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-6 flex items-center gap-1 hover:text-mh-gold">
                                                    <ChevronLeft size={12} /> Back
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* STEP 5: FINAL FORM (No phone) */}
                                        {funnelStep === 5 && (
                                            <motion.div
                                                key="step5"
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="space-y-6"
                                            >
                                                <h3 className="text-2xl font-black uppercase text-slate-900 mb-2 tracking-tighter">One last step...</h3>
                                                <p className="text-sm text-slate-500 font-light mb-6">Fill in these final details, and we'll redirect you to WhatsApp with our Concierge to coordinate details.</p>

                                                <form onSubmit={handleSubmit} className="space-y-5">
                                                    <div className="relative group">
                                                        <input
                                                            required
                                                            type="text"
                                                            value={funnelData.name}
                                                            onChange={(e) => setFunnelData({ ...funnelData, name: e.target.value })}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-800 font-medium focus:ring-2 focus:ring-mh-gold outline-none transition-all placeholder:text-slate-400 group-hover:border-slate-300"
                                                            placeholder="What's your full name?"
                                                        />
                                                    </div>
                                                    <div className="relative group">
                                                        <input
                                                            required
                                                            type="number"
                                                            min="18"
                                                            max="99"
                                                            value={funnelData.age}
                                                            onChange={(e) => setFunnelData({ ...funnelData, age: e.target.value })}
                                                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-slate-800 font-medium focus:ring-2 focus:ring-mh-gold outline-none transition-all placeholder:text-slate-400 group-hover:border-slate-300"
                                                            placeholder="How old are you?"
                                                        />
                                                    </div>
                                                    <div className="relative group">
                                                        <select
                                                            required
                                                            value={funnelData.location}
                                                            onChange={(e) => setFunnelData({ ...funnelData, location: e.target.value })}
                                                            className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 font-medium focus:ring-2 focus:ring-mh-gold outline-none transition-all group-hover:border-slate-300 ${!funnelData.location ? 'text-slate-400' : 'text-slate-800'}`}
                                                        >
                                                            <option value="" disabled>Do you live in Medellín or nearby?</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </select>
                                                    </div>

                                                    <button
                                                        type="submit"
                                                        disabled={isSubmitting || !funnelData.name || !funnelData.age || !funnelData.location}
                                                        className="w-full group relative inline-flex justify-center items-center gap-3 px-8 py-5 mt-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-all overflow-hidden"
                                                    >
                                                        <div className="absolute inset-0 bg-gradient-to-r from-mh-gold/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                                        <span className="relative z-10 flex items-center gap-3">
                                                            {isSubmitting ? (
                                                                <>
                                                                    <div className="w-4 h-4 border-2 border-slate-500 border-t-white rounded-full animate-spin"></div>
                                                                    Processing...
                                                                </>
                                                            ) : (
                                                                <>
                                                                    Send & Talk with Concierge <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform text-mh-gold" />
                                                                </>
                                                            )}
                                                        </span>
                                                    </button>
                                                </form>

                                                <div className="flex items-center justify-between border-t border-slate-100 pt-6 mt-6">
                                                    <button onClick={() => setFunnelStep(4)} className="text-[10px] uppercase font-bold tracking-widest text-slate-400 flex items-center gap-1 hover:text-mh-gold">
                                                        <ChevronLeft size={12} /> Back
                                                    </button>
                                                    <div className="flex items-center gap-2 text-mh-turquoise">
                                                        <Lock size={12} />
                                                        <span className="text-[9px] uppercase font-black tracking-widest opacity-60">Encrypted privacy</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />

            {/* Float WhatsApp Indicator */}
            <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-center">
                <div className="mb-2 bg-white px-3 py-1 rounded-full shadow-lg border border-slate-100 text-[8px] font-black uppercase tracking-widest text-mh-gold">
                    Concierge Online
                </div>
                <a href="https://wa.me/573122104560?text=Hi%20Dr.%20Caro%2C%20I%20have%20a%20question%20about%20the%20Afro%20skin%20promotion..." target="_blank" rel="noreferrer" className="w-14 h-14 bg-mh-gold rounded-full flex items-center justify-center text-slate-950 shadow-2xl hover:scale-110 transition-transform active:scale-95">
                    <MessageCircle size={24} />
                </a>
            </div>
        </div>
    );
};
