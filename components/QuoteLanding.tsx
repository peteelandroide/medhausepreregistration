import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle, ChevronRight, Clock, Star, Zap, ShieldCheck, Stethoscope, Layout, X, Check, Minus, Plus } from 'lucide-react';
import { Logo } from './Logo';
import { Footer } from './Footer';
import { trackEvent } from './MetaPixel';

interface QuoteLandingProps {
    onHomeClick: () => void;
}

const ROOM_TYPES = [
    {
        id: 'basico',
        name: 'Básico',
        description: 'Funcionalidad pura para consulta general y psicología.',
        detailedDescription: 'Un espacio optimizado para la conversación y el diagnóstico inicial. Diseñado para brindar tranquilidad y confidencialidad.',
        priceMember: 50000,
        priceList: 65000,
        savings: '23%',
        features: ['Lavamanos', 'Escritorio', 'Sillas interlocutoras', 'Wi-Fi de Alta Velocidad', 'Aire Acondicionado'],
        specialties: ['Psicología', 'Nutrición', 'Medicina General', 'Psiquiatría', 'Coaching'],
        images: ['/BASICO_HORIZONTAL.jpg', '/BASICO_HORIZONTAL_2.jpg', '/BASICO_HORIZONTAL_3.jpg']
    },
    {
        id: 'estandar',
        name: 'Estándar',
        description: 'Perfecto para especialidades médicas y estética básica.',
        detailedDescription: 'Equilibrio ideal entre confort y funcionalidad clínica. Equipado para exámenes físicos completos y procedimientos ambulatorios simples.',
        priceMember: 75000,
        priceList: 100000,
        savings: '26%',
        features: ['Lavamanos', 'Camilla de Examen', 'Escritorio Médico', 'Mobiliario Premium', 'Iluminación Ajustable'],
        specialties: ['Dermatología', 'Estética Facial', 'Fisioterapia', 'Medicina Interna', 'Pediatría'],
        images: ['/ESTANDAR_3_2.jpg', '/ESTANDAR_3_4.jpg']
    },
    {
        id: 'premium',
        name: 'Premium',
        description: 'La máxima expresión de lujo para especialistas de alto nivel.',
        detailedDescription: 'Diseñado para procedimientos que requieren lo mejor. Incluye infraestructura especializada para lograr resultados superiores y una experiencia de paciente inigualable.',
        priceMember: 100000,
        priceList: 120000,
        savings: '17%',
        features: ['Telón de Antes y Después', 'Silla Especializada para Procedimientos', 'Vista Panorámica', 'Acabados de Lujo', 'Iluminación de Estudio'],
        specialties: ['Cirugía Plástica', 'Medicina Estética Avanzada', 'Harmonización Orofacial', 'Urología'],
        images: ['/PREMIUM.jpg', '/PREMIUM_2.jpg']
    }
];

export const QuoteLanding: React.FC<QuoteLandingProps> = ({ onHomeClick }) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [hours, setHours] = useState<number>(10);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [pendingPlan, setPendingPlan] = useState<'member' | 'guest' | null>(null);
    const [leadData, setLeadData] = useState({
        name: '',
        profession: 'Médico',
        specialty: '',
        isFirstConsultation: 'Sí, necesito habilitarme'
    });

    // Scroll to top on step or selection change
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [step, selectedType]);

    const selectedRoom = ROOM_TYPES.find(r => r.id === selectedType);

    const handleTypeSelect = (id: string) => {
        const room = ROOM_TYPES.find(r => r.id === id);
        trackEvent('SelectContent', {
            content_type: 'product',
            content_id: id,
            content_name: room?.name,
            currency: 'COP',
            value: room?.priceMember
        });
        setSelectedType(id);
        setStep(2);
    };

    const handleNextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedRoom) {
            setCurrentImageIndex((prev) => (prev + 1) % selectedRoom.images.length);
        }
    };

    const handlePrevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedRoom) {
            setCurrentImageIndex((prev) => (prev - 1 + selectedRoom.images.length) % selectedRoom.images.length);
        }
    };

    const handleWhatsAppClick = (plan: 'member' | 'guest', userData?: typeof leadData) => {
        if (!selectedRoom) return;

        const membershipHoursMap: Record<string, number> = { basico: 40, estandar: 27, premium: 20 };
        const membershipHours = membershipHoursMap[selectedRoom.id] || 20;
        const isBelowThreshold = plan === 'member' && hours < membershipHours;
        const TICKET_PRICE = 2000000;

        const total = isBelowThreshold
            ? TICKET_PRICE
            : (plan === 'member' ? selectedRoom.priceMember * hours : selectedRoom.priceList * hours);

        const packageDetail = `${isBelowThreshold ? membershipHours : hours} Horas Mensuales`;

        let msg = `Hola, quiero finalizar mi cotización en MedHause.\n\n`;

        if (userData) {
            msg += `👤 *Nombre:* ${userData.name}\n` +
                `👨‍⚕️ *Profesión:* ${userData.profession}\n` +
                `🔬 *Especialidad:* ${userData.specialty}\n` +
                `🏠 *¿Este sería tu primer consultorio en Antioquia?:* ${userData.isFirstConsultation}\n\n`;
        }

        msg += `🔹 *Consultorio:* ${selectedRoom.name}\n` +
            `🔹 *Paquete:* ${packageDetail}\n` +
            `🔹 *Validez:* ${plan === 'member' ? '3 meses' : '1 mes'}\n` +
            `🔹 *Modalidad:* ${plan === 'member' ? 'Socio MedHause (Membresía)' : 'Visitante (Sin Membresía)'}\n` +
            `💰 *Valor Total:* ${new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(total)}\n\n` +
            `Me gustaría agendar una visita y confirmar disponibilidad.`;

        window.open(`https://wa.me/573206055134?text=${encodeURIComponent(msg)}`, '_blank');

        // Track Conversion
        trackEvent('Lead', {
            content_name: 'Quote WhatsApp',
            content_category: plan === 'member' ? 'Membership' : 'Guest',
            value: total,
            currency: 'COP',
            room_type: selectedRoom.name,
            hours: hours
        }, leadData ? {
            firstName: leadData.name.split(' ')[0],
            lastName: leadData.name.split(' ').slice(1).join(' '),
            city: 'Medellín', // Assumed from context of local business
            country: 'co'
        } : undefined);
    };

    const triggerLeadForm = (plan: 'member' | 'guest') => {
        trackEvent('InitiateCheckout', {
            content_name: plan === 'member' ? 'Membership Application' : 'Guest Quote',
            room_type: selectedRoom?.name,
            hours: hours
        }, leadData ? {
            firstName: leadData.name.split(' ')[0],
            lastName: leadData.name.split(' ').slice(1).join(' ')
        } : undefined);
        setPendingPlan(plan);
        setShowLeadForm(true);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (pendingPlan) {
            handleWhatsAppClick(pendingPlan, leadData);
            setShowLeadForm(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
    };

    return (
        <div className="font-sans text-slate-900 antialiased bg-slate-50 min-h-screen flex flex-col">
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100 h-20 flex items-center transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
                    <button onClick={() => step > 1 ? setStep(step - 1 as any) : onHomeClick()} className="flex items-center gap-2 text-mh-blue font-bold text-xs uppercase tracking-widest hover:text-mh-gold transition-colors">
                        <ArrowLeft size={16} /> {step > 1 ? 'Atrás' : 'Volver'}
                    </button>
                    <div style={{ transform: 'scale(0.75)' }}><Logo variant="dark" size="md" /></div>
                    <div className="w-20"></div>
                </div>
            </nav>

            <main className="flex-grow pt-24 md:pt-32 pb-20 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Progress Steps */}
                    <div className="flex justify-center mb-10 md:mb-16">
                        <div className="flex items-center gap-4 md:gap-8">
                            {[
                                { n: 1, label: 'Consultorio' },
                                { n: 2, label: 'Horas' },
                                { n: 3, label: 'Membresía' }
                            ].map((s, idx, arr) => (
                                <React.Fragment key={s.n}>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs md:text-sm font-black transition-all ${step >= s.n ? 'bg-mh-blue text-white shadow-xl scale-110' : 'bg-slate-200 text-slate-400'}`}>
                                            {s.n}
                                        </div>
                                        <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest ${step >= s.n ? 'text-mh-blue' : 'text-slate-300'}`}>
                                            {s.label}
                                        </span>
                                    </div>
                                    {idx < arr.length - 1 && <div className={`w-8 md:w-16 h-1 rounded-full -mt-6 ${step > s.n ? 'bg-mh-blue' : 'bg-slate-200'}`} />}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Header: Responsive Typography */}
                    <div className="text-center mb-8 md:mb-16 animate-fade-in-up px-4 md:px-0">
                        <h1 className="text-2xl md:text-5xl font-heading font-black text-slate-900 mb-3 md:mb-4 tracking-tight leading-tight">
                            {step === 1 && 'Paso 1: Selecciona tu Consultorio'}
                            {step === 2 && 'Paso 2: Personaliza tu Paquete'}
                            {step === 3 && 'Paso 3: Adquiere tu Membresía'}
                        </h1>
                        <p className="text-sm md:text-lg text-slate-500 font-light">
                            {step === 1 && 'Toca el consultorio que prefieras para ver precios y detalles.'}
                            {step === 2 && 'Define cuántas horas mensuales necesitas.'}
                            {step === 3 && 'Compara y elige la mejor opción para ti.'}
                        </p>
                    </div>

                    {/* STEP 1: ROOM SELECTION */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch animate-fade-in">
                            {ROOM_TYPES.map((room) => {
                                const isPremium = room.id === 'premium';
                                return (
                                    <div
                                        key={room.id}
                                        onClick={() => handleTypeSelect(room.id)}
                                        className={`cursor-pointer rounded-[2.5rem] p-6 border transition-all duration-500 relative overflow-hidden group flex flex-col h-full hover:scale-[1.02] hover:shadow-2xl ${isPremium
                                            ? 'border-slate-700 bg-slate-900 text-white shadow-xl hover:shadow-slate-900/50 hover:z-10 ring-1 ring-slate-700'
                                            : 'border-slate-100 bg-white shadow-lg hover:z-10'
                                            }`}
                                    >
                                        <div className={`absolute top-6 left-6 z-30 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${isPremium ? 'bg-mh-gold text-slate-900' : 'bg-green-100 text-green-700'}`}>
                                            Ahorra {room.savings}
                                        </div>

                                        <div className="h-64 rounded-[2rem] overflow-hidden mb-8 relative shadow-inner shrink-0 group-hover:shadow-lg transition-all">
                                            <img src={room.images[0]} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                                            {isPremium && <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply pointer-events-none"></div>}
                                        </div>

                                        <div className="mb-6 px-2">
                                            <h3 className={`text-3xl font-heading font-black mb-2 ${isPremium ? 'text-white' : 'text-slate-900'}`}>{room.name}</h3>
                                            <div className={`w-12 h-1 rounded-full mb-4 ${isPremium ? 'bg-mh-gold' : 'bg-slate-200'}`}></div>
                                            <p className={`text-sm leading-relaxed font-light ${isPremium ? 'text-slate-200' : 'text-slate-500'}`}>{room.description}</p>
                                        </div>

                                        <div className={`mt-auto p-5 rounded-2xl ${isPremium ? 'bg-white/10 border border-white/10' : 'bg-slate-50 border border-slate-100'}`}>
                                            <div className="flex justify-between items-end mb-4">
                                                <div className="flex flex-col">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isPremium ? 'text-mh-gold' : 'text-mh-blue'}`}>Desde</span>
                                                    <span className={`text-2xl font-black ${isPremium ? 'text-white' : 'text-slate-900'}`}>{formatPrice(room.priceMember)}<span className={`text-xs font-normal ${isPremium ? 'text-slate-300' : 'text-slate-400'}`}>/h</span></span>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`block text-[10px] uppercase tracking-wider ${isPremium ? 'text-slate-400' : 'text-slate-400'}`}>Precio Lista</span>
                                                    <span className={`text-xs font-medium line-through ${isPremium ? 'text-slate-500' : 'text-slate-400'}`}>{formatPrice(room.priceList)}</span>
                                                </div>
                                            </div>

                                            <button className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2 animate-pulse-subtle ${isPremium
                                                ? 'bg-mh-gold text-slate-900 hover:bg-white'
                                                : 'bg-mh-blue text-white hover:bg-slate-800'
                                                }`}>
                                                Seleccionar <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* STEP 2: DETAILS & HOURS */}
                    {step === 2 && selectedRoom && (
                        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Left: Gallery & Details */}
                            <div className="space-y-8">
                                <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative h-96 group">
                                    <img src={selectedRoom.images[currentImageIndex]} className="w-full h-full object-cover" />
                                    {selectedRoom.images.length > 1 && (
                                        <>
                                            <button onClick={(e) => handlePrevImage(e)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 border border-white/20"><ArrowLeft size={20} /></button>
                                            <button onClick={(e) => handleNextImage(e)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 border border-white/20"><ChevronRight size={20} /></button>
                                        </>
                                    )}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {selectedRoom.images.map((_, idx) => (
                                            <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'}`} />
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h2 className="text-3xl font-heading font-black text-slate-900 mb-4">{selectedRoom.name}</h2>
                                    <p className="text-slate-600 leading-relaxed mb-6">{selectedRoom.detailedDescription}</p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">
                                                <Layout size={16} className="text-mh-blue" /> Características
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedRoom.features.map((feature, i) => (
                                                    <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                                        <CheckCircle size={14} className="text-green-500 mt-0.5 shrink-0" /> {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="flex items-center gap-2 font-bold text-slate-900 mb-3 text-sm uppercase tracking-wider">
                                                <Stethoscope size={16} className="text-mh-gold" /> Ideal Para
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedRoom.specialties.map((spec, i) => (
                                                    <span key={i} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-medium border border-slate-200">{spec}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right: Hours Configuration - DARK THEME */}
                            <div className="bg-slate-900 rounded-[2.5rem] p-6 md:p-12 shadow-2xl ring-4 ring-mh-gold/20 sticky top-32">
                                <div className="text-center mb-10">
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Intensidad Horaria</h3>
                                    <p className="text-slate-400 text-sm">¿Cuántas horas necesitas al mes?</p>
                                </div>

                                <div className="mb-12">
                                    <div className="flex flex-col items-center gap-8">
                                        {/* Digital Display */}
                                        <div className="relative">
                                            <div className="text-center">
                                                <span className="text-7xl md:text-9xl font-black text-mh-gold tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(242,214,162,0.3)]">
                                                    {hours}
                                                </span>
                                                <span className="text-slate-500 font-bold ml-2 text-xl md:text-3xl uppercase tracking-widest">horas</span>
                                            </div>
                                        </div>

                                        {/* Interactive Buttons */}
                                        <div className="flex items-center justify-center gap-6 md:gap-10 w-full max-w-xs">
                                            <button
                                                onClick={() => setHours(Math.max(10, hours - 5))}
                                                disabled={hours <= 10}
                                                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-slate-700 flex items-center justify-center text-white hover:bg-mh-gold hover:text-mh-blue hover:border-mh-gold transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-white disabled:hover:border-slate-700"
                                            >
                                                <Minus size={28} md:size={32} />
                                            </button>
                                            <button
                                                onClick={() => setHours(Math.min(100, hours + 5))}
                                                disabled={hours >= 100}
                                                className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-slate-700 flex items-center justify-center text-white hover:bg-mh-gold hover:text-mh-blue hover:border-mh-gold transition-all duration-300 disabled:opacity-30"
                                            >
                                                <Plus size={28} md:size={32} />
                                            </button>
                                        </div>

                                        {/* Helper limits */}
                                        <div className="flex justify-between w-full text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] pt-4 border-t border-white/5">
                                            <span className={hours === 10 ? 'text-mh-gold' : ''}>Min 10h</span>
                                            <span className={hours === 100 ? 'text-mh-gold' : ''}>Máx 100h</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <button
                                        onClick={() => {
                                            trackEvent('CustomizeProduct', { hours: hours, room_type: selectedRoom?.name });
                                            setStep(3);
                                        }}
                                        className="w-full bg-mh-gold hover:bg-white text-slate-900 font-black py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 text-sm uppercase tracking-widest"
                                    >
                                        Ver Comparativo <ChevronRight size={20} />
                                    </button>
                                    <p className="text-center text-[10px] text-slate-500 uppercase tracking-widest opacity-60">Siguiente paso: Ventajas de Membresía</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: MEMBERSHIP MATRIX */}
                    {step === 3 && selectedRoom && (() => {
                        const membershipHoursMap: Record<string, number> = { basico: 40, estandar: 27, premium: 20 };
                        const membershipHours = membershipHoursMap[selectedRoom.id] || 20;
                        const isBelowThreshold = hours < membershipHours;
                        const totalGuest = selectedRoom.priceList * hours;
                        const totalMember = selectedRoom.priceMember * hours;
                        const hourlySavings = selectedRoom.priceList - selectedRoom.priceMember;
                        const totalSavings = hourlySavings * hours;
                        const TICKET_PRICE = 2000000;

                        return (
                            <div className="max-w-4xl mx-auto animate-fade-in px-2 md:px-0 pt-4 md:pt-0">
                                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
                                    {/* Table Header */}
                                    <div className="grid grid-cols-3 md:grid-cols-4 bg-slate-50 border-b border-slate-100">
                                        <div className="hidden md:block p-6"></div>
                                        <div className="p-4 md:p-8 text-center border-x border-slate-100 italic">
                                            <span className="block text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Plan Básico</span>
                                            <span className="text-lg md:text-2xl font-black text-slate-500">Visitante</span>
                                        </div>
                                        <div className="col-span-2 md:col-span-2 p-4 md:p-8 text-center bg-slate-900 relative">
                                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-mh-gold text-mh-blue text-[8px] md:text-[10px] font-black px-4 py-1.5 rounded-full shadow-xl z-20 whitespace-nowrap tracking-widest border border-white/20">
                                                ★ &nbsp; MEJOR COSTO-BENEFICIO
                                            </div>
                                            <div className="absolute top-0 inset-x-0 h-1.5 bg-mh-gold"></div>
                                            <span className="block text-[10px] md:text-xs font-black text-mh-gold/70 uppercase tracking-widest mb-1">Membresía All-Inclusive</span>
                                            <span className="text-xl md:text-3xl font-black text-white">Socio MedHause</span>
                                            <Star className="absolute top-4 right-4 text-mh-gold fill-mh-gold hidden md:block opacity-50" size={24} />
                                        </div>
                                    </div>

                                    {/* Table Rows */}
                                    <div className="divide-y divide-slate-100">
                                        {/* Row: Valor Hora */}
                                        <div className="grid grid-cols-3 md:grid-cols-4 items-center group">
                                            <div className="hidden md:flex p-6 items-center gap-3 text-sm font-bold text-slate-600">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400"><Clock size={16} /></div>
                                                Valor por Hora
                                            </div>
                                            <div className="p-4 md:p-8 text-center border-x border-slate-100">
                                                <span className="md:hidden block text-[10px] text-slate-400 font-bold uppercase mb-1">Valor Hora</span>
                                                <span className="text-sm md:text-xl font-bold text-slate-600">{formatPrice(selectedRoom.priceList)}</span>
                                            </div>
                                            <div className="col-span-2 md:col-span-2 p-4 md:p-8 text-center bg-slate-900/5 relative">
                                                <div className="absolute inset-0 border-x-2 border-mh-gold/20 pointer-events-none"></div>
                                                <span className="md:hidden block text-[10px] text-mh-blue font-bold uppercase mb-1">Valor Preferencial</span>
                                                <div className="flex flex-col items-center">
                                                    <span className="text-lg md:text-3xl font-black text-mh-blue scale-110 md:scale-100 origin-center">{formatPrice(selectedRoom.priceMember)}</span>
                                                    <span className="text-[10px] md:text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-black mt-1">Ahorras {formatPrice(selectedRoom.priceList - selectedRoom.priceMember)}/h</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Row: Horas */}
                                        <div className="grid grid-cols-3 md:grid-cols-4 items-center">
                                            <div className="hidden md:flex p-6 items-center gap-3 text-sm font-bold text-slate-600">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400"><Zap size={16} /></div>
                                                Horas Incluidas
                                            </div>
                                            <div className="p-4 md:p-8 text-center border-x border-slate-100 text-sm md:text-lg font-bold text-slate-600">
                                                <span className="md:hidden block text-[10px] text-slate-400 font-bold uppercase mb-1">Horas</span>
                                                {hours}h
                                            </div>
                                            <div className="col-span-2 md:col-span-2 p-4 md:p-8 text-center bg-slate-900/5">
                                                <span className="md:hidden block text-[10px] text-mh-blue font-bold uppercase mb-1">Horas Totales</span>
                                                <span className="text-sm md:text-xl font-black text-mh-blue">{isBelowThreshold ? membershipHours : hours}h</span>
                                            </div>
                                        </div>

                                        {/* Row: Inversión */}
                                        <div className="grid grid-cols-3 md:grid-cols-4 items-center">
                                            <div className="hidden md:flex p-6 items-center gap-3 text-sm font-bold text-slate-600">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400"><Star size={16} /></div>
                                                Inversión Total
                                            </div>
                                            <div className="p-4 md:p-8 text-center border-x border-slate-100">
                                                <span className="md:hidden block text-[10px] text-slate-400 font-bold uppercase mb-1">Inversión</span>
                                                <span className="text-sm md:text-xl font-black text-slate-900">{formatPrice(totalGuest)}</span>
                                            </div>
                                            <div className="col-span-2 md:col-span-2 p-4 md:p-8 text-center bg-mh-blue/5">
                                                <span className="md:hidden block text-[10px] text-mh-blue font-bold uppercase mb-1">Inversión Socio</span>
                                                <span className="text-base md:text-2xl font-black text-mh-blue">{formatPrice(isBelowThreshold ? TICKET_PRICE : totalMember)}</span>
                                            </div>
                                        </div>

                                        {/* Benefits list (Simplified for Mobile) */}
                                        {['Validez de Horas', 'Prioridad de Reserva', 'Parqueadero Privado', 'Asesoría Marketing', 'Convenios Quirófanos'].map((benefit, idx) => {
                                            const values = [
                                                { guest: '1 Mes', member: '3 Meses' },
                                                { guest: 'Estándar', member: 'VIP (1 Mes)' },
                                                { guest: false, member: true },
                                                { guest: false, member: true },
                                                { guest: 'Limitado', member: 'Acceso Total' }
                                            ][idx];

                                            return (
                                                <div key={benefit} className="grid grid-cols-3 md:grid-cols-4 items-center">
                                                    <div className="hidden md:flex p-6 text-sm font-medium text-slate-500">{benefit}</div>
                                                    <div className="p-4 md:p-8 text-center border-x border-slate-100 text-xs md:text-sm text-slate-500">
                                                        <span className="md:hidden block text-[9px] text-slate-400 font-bold uppercase mb-1">{benefit}</span>
                                                        {typeof values.guest === 'boolean' ? (values.guest ? <Check size={18} className="mx-auto text-emerald-500" /> : <X size={18} className="mx-auto text-slate-300" />) : values.guest}
                                                    </div>
                                                    <div className="col-span-2 md:col-span-2 p-4 md:p-8 text-center bg-slate-900/5 text-xs md:text-sm font-bold text-mh-blue">
                                                        <span className="md:hidden block text-[9px] text-mh-blue font-bold uppercase mb-1">{benefit}</span>
                                                        {typeof values.member === 'boolean' ? (values.member ? <Check size={20} className="mx-auto text-emerald-600" /> : <X size={20} className="mx-auto text-slate-300" />) : values.member}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Table Footer: CTAs */}
                                    <div className="grid grid-cols-3 md:grid-cols-4 bg-slate-50 border-t border-slate-100">
                                        <div className="hidden md:block"></div>
                                        <div className="p-4 md:p-8 border-x border-slate-100">
                                            <button onClick={() => triggerLeadForm('guest')} className="w-full py-3 md:py-4 px-2 bg-white border-2 border-slate-200 text-slate-500 font-bold rounded-xl text-[10px] md:text-xs uppercase tracking-wider hover:bg-slate-50 transition-all">
                                                Cotizar Visitante
                                            </button>
                                        </div>
                                        <div className="col-span-2 md:col-span-2 p-4 md:p-8 bg-slate-900 relative">
                                            <div className="absolute inset-0 border-x-2 border-mh-gold pointer-events-none"></div>
                                            <button onClick={() => triggerLeadForm('member')} className="w-full py-4 md:py-6 px-4 bg-mh-gold text-mh-blue font-black rounded-xl text-xs md:text-base uppercase tracking-widest hover:bg-white hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(242,214,162,0.3)] flex items-center justify-center gap-3 relative z-10 group">
                                                <Zap size={20} className="fill-mh-blue group-hover:scale-125 transition-transform" />
                                                <span>Aplicar Membresía</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-center text-[10px] md:text-xs text-slate-400 mt-8 italic px-6">
                                    *La membresía Socio MedHause requiere un proceso de validación de perfil profesional previo a la activación.
                                </p>
                            </div>
                        );
                    })()}
                </div>
            </main>
            {/* LEAD FORM MODAL */}
            {showLeadForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden animate-fade-in-up">
                        <div className="absolute top-0 inset-x-0 h-2 bg-mh-gold"></div>
                        <button
                            onClick={() => setShowLeadForm(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-mh-blue transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div className="mb-8">
                            <h3 className="text-2xl font-heading font-black text-slate-900 mb-2">Preséntate con MedHause</h3>
                            <p className="text-slate-500 text-sm">Queremos brindarte una asesoría personalizada según tu perfil profesional.</p>
                        </div>

                        <form onSubmit={handleFormSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Nombre Completo</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-mh-blue/20 transition-all"
                                    placeholder="Ej: Dr. Juan Pérez"
                                    value={leadData.name}
                                    onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Profesión</label>
                                    <select
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-mh-blue/20 transition-all appearance-none"
                                        value={leadData.profession}
                                        onChange={(e) => setLeadData({ ...leadData, profession: e.target.value })}
                                    >
                                        <option value="Médico">Médico</option>
                                        <option value="Otro Profesional de Salud">Otro Profesional</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">¿Este sería tu primer consultorio en Antioquia?</label>
                                    <div className="flex flex-col sm:flex-row bg-slate-50 rounded-xl p-1 border border-slate-100 gap-1">
                                        {[
                                            { label: 'Sí, necesito habilitarme', value: 'Sí, necesito habilitarme' },
                                            { label: 'No, ya estoy habilitado', value: 'No, ya estoy habilitado en Antioquia' }
                                        ].map((opt) => (
                                            <button
                                                key={opt.value}
                                                type="button"
                                                onClick={() => setLeadData({ ...leadData, isFirstConsultation: opt.value })}
                                                className={`flex-1 py-3 px-2 text-[10px] font-black rounded-lg transition-all leading-tight ${leadData.isFirstConsultation === opt.value ? 'bg-white text-mh-blue shadow-sm' : 'text-slate-400'}`}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Especialidad que Oferta</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-mh-blue/20 transition-all"
                                    placeholder="Ej: Cardiología, Fisioterapia..."
                                    value={leadData.specialty}
                                    onChange={(e) => setLeadData({ ...leadData, specialty: e.target.value })}
                                />
                            </div>

                            <div className="pt-4">
                                <button type="submit" className="w-full bg-mh-blue text-white font-black py-4 rounded-xl uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 group">
                                    Finalizar en WhatsApp <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <p className="text-[10px] text-slate-400 mt-4 text-center leading-relaxed italic">
                                    Al continuar, aceptas el inicio de tu proceso de vinculación y contacto comercial.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};
