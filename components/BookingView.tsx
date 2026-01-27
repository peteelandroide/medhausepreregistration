import React, { useState, useMemo } from 'react';
import { Star, Clock, ArrowLeft, ChevronRight, Zap, Info, Calendar, FileText, CheckCircle, AlertTriangle } from 'lucide-react';

// Reusing constants or defining them if they were local. 
// Assuming IMAGES and SPACE_TYPES are needed here or passed as props. 
// Ideally they should be shared or defined in a common file, but for now I will duplicate the relevant parts or assume I can copy them.
// Looking at App.tsx, they are constants. I will include them here for self-containment or I should move them to a config file.
// For this refactor, I'll copy the necessary constants to make it work standalone.

const IMAGES = {
    hero: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/hero.jpg",
    basic: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/basic.jpg",
    medium: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/medium.jpg",
    premium: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/premium.jpg",
};

const SPACE_TYPES = [
    { id: 'PREMIUM', name: 'Premium', basePrice: 100000, desc: 'Consultorio premium con camilla y mobiliario moderno.', icon: <Star size={20} />, img: IMAGES.medium }
];

export const BookingView = ({ onClose, onBook }: { onClose: () => void; onBook?: (data: any) => void }) => {
    const [isPremium, setIsPremium] = useState(false);
    const [selectedSpace, setSelectedSpace] = useState(SPACE_TYPES[0]);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Rango de reserva
    const [startHour, setStartHour] = useState<number | null>(null);
    const [endHour, setEndHour] = useState<number | null>(null);

    const maxDays = isPremium ? 30 : 15;
    const days = useMemo(() => Array.from({ length: maxDays }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return d;
    }), [isPremium]);

    const getTimeSlots = (date: Date) => {
        const day = date.getDay(); // 0: Domingo, 6: Sábado
        const isWeekend = day === 0 || day === 6;
        const start = 7;
        const end = isWeekend ? 16 : 20;
        const slots = [];
        for (let i = start; i < end; i++) slots.push(i);
        return slots;
    };

    const isPrimeTime = (hour: number, date: Date) => {
        const day = date.getDay();
        if (hour >= 12 && hour < 14) return false;
        if (day === 0) return false;
        if (day === 6) return true;
        return hour < 17;
    };

    const calculateSlotPrice = (hour: number, date: Date) => {
        let price = selectedSpace.basePrice;
        if (isPrimeTime(hour, date)) price *= 1.15;
        if (isPremium) price *= 0.85;
        return Math.round(price);
    };

    const handleHourClick = (hour: number) => {
        if (startHour === null || (startHour !== null && endHour !== null)) {
            setStartHour(hour);
            setEndHour(null);
        } else {
            if (hour < startHour) {
                setStartHour(hour);
                setEndHour(null);
            } else if (hour === startHour) {
                setStartHour(null);
                setEndHour(null);
            } else {
                setEndHour(hour);
            }
        }
    };

    const selectedRange = useMemo(() => {
        if (startHour === null) return [];
        if (endHour === null) return [startHour];
        const range = [];
        for (let i = startHour; i <= endHour; i++) range.push(i);
        return range;
    }, [startHour, endHour]);

    const selectionMetrics = useMemo(() => {
        let total = 0;
        let primeHours = 0;
        let baseHours = 0;
        selectedRange.forEach(h => {
            total += calculateSlotPrice(h, selectedDate);
            if (isPrimeTime(h, selectedDate)) primeHours++;
            else baseHours++;
        });
        return { total, primeHours, baseHours, count: selectedRange.length };
    }, [selectedRange, selectedDate, selectedSpace, isPremium]);

    const isValidDuration = selectedRange.length >= 2;
    const lastHourInSelection = endHour || startHour;

    const formatHour = (h: number) => {
        const ampm = h >= 12 ? 'PM' : 'AM';
        const hour12 = h % 12 || 12;
        return `${hour12}:00 ${ampm}`;
    };

    const formatPrice = (p: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(p);

    return (
        <div className="fixed inset-0 z-50 bg-[#F8FAFC] flex flex-col font-sans animate-fade-in overflow-hidden">
            {/* Header Glassmorphism */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 sticky top-0 z-40 transition-all duration-300">
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <button onClick={onClose} className="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 transition-colors"><ArrowLeft size={20} /></button>
                    <div className="flex flex-col">
                        <h1 className="text-base font-heading font-extrabold text-mh-blue leading-none">Nueva Reserva</h1>
                        <span className="text-[10px] text-slate-400 font-bold tracking-[0.2em] uppercase mt-1">Cross Medical Center</span>
                    </div>
                </div>

                {/* Toggle Premium Elegante */}
                <div className="flex items-center gap-4 bg-slate-100 p-1.5 rounded-full border border-slate-200 shadow-inner">
                    <div className={`px-3 transition-opacity duration-300 ${!isPremium ? 'opacity-100' : 'opacity-40'}`}>
                        <span className="text-[10px] font-bold text-slate-600 tracking-widest">SIN MEMBRESÍA</span>
                    </div>
                    <button
                        onClick={() => { setIsPremium(!isPremium); setStartHour(null); setEndHour(null); }}
                        className={`w-14 h-8 rounded-full relative transition-all duration-500 shadow-sm ${isPremium ? 'bg-gradient-to-r from-mh-gold to-yellow-300' : 'bg-slate-300'}`}
                    >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-md ${isPremium ? 'left-7' : 'left-1'}`}></div>
                    </button>
                    <div className={`px-3 transition-opacity duration-300 ${isPremium ? 'opacity-100' : 'opacity-40'}`}>
                        <span className="text-[10px] font-black text-mh-blue tracking-widest flex items-center gap-1">CON MEMBRESÍA <Star size={10} className="fill-mh-gold text-mh-gold" /></span>
                    </div>
                </div>
            </header>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-y-auto lg:overflow-hidden">
                {/* Panel Principal (Scroll) */}
                <div className="lg:col-span-8 p-6 md:p-10 overflow-visible lg:overflow-y-auto custom-scrollbar bg-[#F8FAFC]">

                    {/* 1. Selector de Espacio - Hid if only one */}
                    {SPACE_TYPES.length > 1 && (
                        <section className="mb-12">
                            <h2 className="text-lg font-heading font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-black">01</span>
                                Selecciona tu Espacio
                            </h2>
                            <div className="flex gap-6 overflow-x-auto pb-8 no-scrollbar px-2 snap-x">
                                {SPACE_TYPES.map(space => (
                                    <button
                                        key={space.id}
                                        onClick={() => { setSelectedSpace(space); setStartHour(null); setEndHour(null); }}
                                        className={`flex-shrink-0 w-80 group relative flex flex-col rounded-[2rem] overflow-hidden transition-all duration-500 snap-center text-left ${selectedSpace.id === space.id ? 'ring-4 ring-mh-blue/10 shadow-2xl scale-[1.01]' : 'shadow-lg hover:shadow-xl opacity-80 hover:opacity-100 scale-100'}`}
                                    >
                                        <div className="h-40 relative overflow-hidden">
                                            <img src={space.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                                            <div className="absolute bottom-4 left-5 right-5 flex justify-between items-end text-white">
                                                <div>
                                                    <div className="bg-white/20 backdrop-blur-md w-fit p-2 rounded-xl mb-2 text-white">{space.icon}</div>
                                                    <span className="font-heading font-bold text-lg leading-none">{space.name}</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-xl font-bold text-mh-gold">{formatPrice(space.basePrice)}</span>
                                                    <span className="text-[10px] opacity-70 uppercase tracking-widest">/ Hora</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`p-6 flex-grow transition-colors duration-300 ${selectedSpace.id === space.id ? 'bg-white' : 'bg-slate-50'}`}>
                                            <p className="text-xs text-slate-500 leading-relaxed font-medium">{space.desc}</p>
                                        </div>
                                        {selectedSpace.id === space.id && (
                                            <div className="absolute top-4 right-4 bg-white text-mh-blue p-1.5 rounded-full shadow-lg animate-fade-in">
                                                <CheckCircle size={18} className="fill-mh-blue text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* 2. Calendario y Horas */}
                    <section className="mb-24">
                        <h2 className="text-lg font-heading font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-black">02</span>
                            Agenda tu Tiempo
                        </h2>

                        {/* Selector de Días - Estilo Cápsula */}
                        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar snap-x px-1 mb-6">
                            {days.map((d, i) => {
                                const isActive = d.toDateString() === selectedDate.toDateString();
                                const isWeekend = d.getDay() === 0 || d.getDay() === 6;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => { setSelectedDate(d); setStartHour(null); setEndHour(null); }}
                                        className={`flex-shrink-0 w-[4.5rem] h-[5.5rem] rounded-2xl flex flex-col items-center justify-center transition-all duration-300 snap-start border ${isActive ? 'bg-mh-blue border-mh-blue text-white shadow-lg shadow-mh-blue/30 -translate-y-1' : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'}`}
                                    >
                                        <span className={`text-[9px] uppercase font-bold tracking-wider mb-1 ${isActive ? 'text-mh-gold' : isWeekend ? 'text-red-400' : 'opacity-60'}`}>
                                            {d.toLocaleDateString('es-CO', { weekday: 'short' }).replace('.', '')}
                                        </span>
                                        <span className="text-xl font-heading font-black">{d.getDate()}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Grid de Horas - Diseño Lista Moderna */}
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden p-6 relative">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-100 to-transparent"></div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 pb-32 lg:pb-0">
                                {getTimeSlots(selectedDate).map((h, idx) => {
                                    const isSelected = selectedRange.includes(h);
                                    const isStart = h === startHour;
                                    const isEnd = h === endHour;
                                    const isPrime = isPrimeTime(h, selectedDate);

                                    // Calcular precios
                                    let base = selectedSpace.basePrice;
                                    if (isPrime) base *= 1.15;

                                    const standardPrice = Math.round(base);
                                    const memberPrice = Math.round(base * 0.85);

                                    // FIX: Remove restriction for Saturdays
                                    const isRestricted = false;
                                    const showCleaning = isSelected && h === lastHourInSelection;

                                    return (
                                        <div key={h} className="relative group">
                                            <button
                                                disabled={isRestricted}
                                                onClick={() => handleHourClick(h)}
                                                className={`w-full relative overflow-hidden flex items-center justify-between p-3 md:p-4 rounded-xl transition-all duration-300 border ${isRestricted
                                                    ? 'bg-slate-50 border-transparent opacity-40 cursor-not-allowed grayscale'
                                                    : isSelected
                                                        ? 'bg-mh-blue border-mh-blue text-white shadow-md'
                                                        : 'bg-white border-slate-100 hover:border-mh-blue/30 hover:bg-slate-50'
                                                    }`}
                                            >
                                                {/* Indicador de Selección */}
                                                {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-mh-gold"></div>}

                                                <div className="flex items-center gap-3 md:gap-4 pl-2">
                                                    <div className={`flex flex-col items-start min-w-[3.5rem]`}>
                                                        <span className={`text-sm font-heading font-bold ${isSelected ? 'text-white' : 'text-slate-800'}`}>{formatHour(h)}</span>
                                                        {isStart && <span className="text-[9px] font-bold text-mh-gold mt-0.5 tracking-wider">INICIO</span>}
                                                        {isEnd && <span className="text-[9px] font-bold text-mh-gold mt-0.5 tracking-wider">FIN</span>}
                                                    </div>
                                                    <div className={`h-8 w-[1px] ${isSelected ? 'bg-white/20' : 'bg-slate-100'}`}></div>
                                                    <div className="flex flex-col items-start">
                                                        <span className={`text-[10px] uppercase font-bold tracking-widest ${isSelected ? 'text-blue-200' : isPrime ? 'text-mh-turquoise' : 'text-slate-400'}`}>
                                                            {isPrime ? 'Prime' : 'Base'}
                                                        </span>
                                                        <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>60 min</span>
                                                    </div>
                                                </div>

                                                <div className="flex flex-col items-end gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-[9px] uppercase font-bold tracking-wider ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>Sin Membresía</span>
                                                        <span className={`font-mono text-xs font-bold ${isSelected ? 'text-white' : 'text-slate-500 line-through decoration-slate-300'}`}>
                                                            {formatPrice(standardPrice)}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-[9px] uppercase font-bold tracking-wider ${isSelected ? 'text-mh-gold' : 'text-mh-blue'}`}>Con Membresía</span>
                                                        <span className={`font-mono text-sm font-bold tracking-tight ${isSelected ? 'text-mh-gold' : 'text-mh-blue'}`}>
                                                            {formatPrice(memberPrice)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </button>

                                            {/* Bloque Limpieza Animado */}
                                            {showCleaning && (
                                                <div className="absolute -bottom-4 left-0 w-full z-20 flex justify-center pointer-events-none">
                                                    <div className="bg-slate-800 text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-lg border border-slate-700 flex items-center gap-2 animate-bounce">
                                                        <Clock size={10} className="text-mh-gold" /> +15m Limpieza
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="mt-8 flex items-start gap-3 px-4 opacity-70">
                            <Info size={16} className="text-mh-blue shrink-0 mt-0.5" />
                            <p className="text-[10px] text-slate-500 leading-relaxed">
                                El protocolo de desinfección (15 min) se aplica automáticamente al finalizar tu bloque reservado.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Panel Lateral: Resumen (Checkout Style) */}
                <div className="lg:col-span-4 bg-white border-l border-slate-100 shadow-2xl shadow-slate-200 z-30 flex flex-col h-auto lg:h-full">
                    <div className="p-8 flex-grow overflow-y-auto custom-scrollbar">
                        <h3 className="text-xl font-heading font-bold text-slate-800 mb-8 flex items-center gap-2">
                            <FileText size={20} className="text-mh-gold" /> Resumen de Agenda
                        </h3>

                        {selectionMetrics.count > 0 ? (
                            <div className="space-y-6 animate-fade-in-up">

                                {/* Ticket Card */}
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-mh-blue/5 rounded-full -mr-10 -mt-10 group-hover:bg-mh-blue/10 transition-colors"></div>

                                    <div className="mb-4 pb-4 border-b border-slate-200 border-dashed">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Fecha</span>
                                        <span className="text-sm font-bold text-slate-800 capitalize">{selectedDate.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Horario</span>
                                            <div className="flex items-center gap-2 text-mh-blue">
                                                <span className="text-lg font-heading font-black">{formatHour(startHour!)}</span>
                                                <ChevronRight size={14} className="text-slate-300" />
                                                <span className="text-lg font-heading font-black">{formatHour(lastHourInSelection! + 1)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Desglose */}
                                <div className="space-y-3 px-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-500">Tarifa Base ({selectionMetrics.baseHours}h)</span>
                                        <span className="font-bold text-slate-700">{formatPrice(selectionMetrics.baseHours * (isPremium ? selectedSpace.basePrice * 0.85 : selectedSpace.basePrice))}</span>
                                    </div>
                                    {selectionMetrics.primeHours > 0 && (
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-slate-500 flex items-center gap-1"><Zap size={10} className="text-mh-gold" /> Tarifa Prime ({selectionMetrics.primeHours}h)</span>
                                            <span className="font-bold text-slate-700">{formatPrice(selectionMetrics.primeHours * (isPremium ? selectedSpace.basePrice * 1.15 * 0.85 : selectedSpace.basePrice * 1.15))}</span>
                                        </div>
                                    )}
                                    {isPremium && (
                                        <div className="flex justify-between items-center text-[10px] text-green-600 font-bold bg-green-50 px-2 py-1 rounded">
                                            <span>Ahorro Membresía VIP</span>
                                            <span>-15%</span>
                                        </div>
                                    )}
                                </div>

                                {!isValidDuration && (
                                    <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-[10px] text-red-600 font-medium flex gap-2 items-center">
                                        <AlertTriangle size={14} /> Mínimo 2 horas requeridas.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="h-64 flex flex-col items-center justify-center text-slate-300 gap-4 border-2 border-dashed border-slate-100 rounded-3xl bg-slate-50/50">
                                <Calendar size={40} className="opacity-50" />
                                <p className="text-xs font-bold uppercase tracking-widest text-center max-w-[150px]">Selecciona bloques en la agenda</p>
                            </div>
                        )}
                    </div>

                    {/* Footer del Sidebar */}
                    <div className="p-8 border-t border-slate-100 bg-white">
                        <div className="flex justify-between items-end mb-6">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Estimado</span>
                            <div className="text-3xl font-heading font-black text-mh-blue tracking-tight">
                                {formatPrice(selectionMetrics.total)}
                            </div>
                        </div>

                        <button
                            disabled={!isValidDuration}
                            onClick={() => {
                                const bookingDetails = {
                                    space: selectedSpace,
                                    date: selectedDate,
                                    startHour,
                                    endHour,
                                    lastHour: lastHourInSelection,
                                    total: selectionMetrics.total,
                                    isPremium,
                                    startHourFormatted: formatHour(startHour!),
                                    endHourFormatted: formatHour(lastHourInSelection! + 1),
                                };

                                if (onBook) {
                                    onBook(bookingDetails);
                                } else {
                                    const msg = `MedHause! Quiero pre-reservar el espacio ${selectedSpace.name} el ${selectedDate.toDateString()} desde las ${formatHour(startHour!)} hasta las ${formatHour(lastHourInSelection! + 1)}. Inversión estimada: ${formatPrice(selectionMetrics.total)}`;
                                    window.open(`https://wa.me/573148762907?text=${encodeURIComponent(msg)}`, '_blank');
                                }
                            }}
                            className="w-full bg-mh-blue text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-2xl hover:bg-mh-gold hover:text-mh-blue transition-all duration-300 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-3 text-sm tracking-wide uppercase"
                        >
                            Confirmar por WhatsApp <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
