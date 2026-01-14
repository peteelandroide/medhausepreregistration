import React, { useState, useEffect, useMemo } from 'react';
import { Star, CheckCircle, Clock, MapPin, ChevronRight, Phone, ShieldCheck, Gift, Zap, X, Mail, Loader2, Minus, Plus, Lock, FileText, ArrowLeft, Edit, Trash, Save, LogOut, Eye, ChevronLeft, BarChart3, Calculator, Play, Calendar, Coffee, Car, Info, AlertTriangle, Users } from 'lucide-react';
import { Logo } from './components/Logo';
import { supabase } from './supabaseClient';
import { CalculatorInput } from './components/CalculatorInput';
import { BrochurePhysicians } from './components/BrochurePhysicians';
import { BrochureCollaborators } from './components/BrochureCollaborators';
import { LocationCard } from './components/LocationCard';

// --------------------------------------------------------------------------
// CONFIGURACIÓN Y CONSTANTES
// --------------------------------------------------------------------------
const IMAGES = {
  hero: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/hero.jpg",
  basic: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/basic.jpg",
  medium: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/medium.jpg",
  premium: "https://pxpptalixswgbajiyubz.supabase.co/storage/v1/object/public/medhause-assets/premium.jpg",
};

const SPACE_TYPES = [
  { id: 'BASIC', name: 'Basic', basePrice: 50000, desc: 'Para consulta general, psicología y nutrición.', icon: <Coffee size={20} />, img: IMAGES.basic },
  { id: 'MEDIUM', name: 'Medium', basePrice: 75000, desc: 'Consultorio premium con camilla y mobiliario moderno.', icon: <ShieldCheck size={20} />, img: IMAGES.medium },
  { id: 'PREMIUM', name: 'Premium', basePrice: 100000, desc: 'Diseño de alto nivel con experiencia hospitality 5 estrellas.', icon: <Star size={20} />, img: IMAGES.premium }
];

// --------------------------------------------------------------------------
// COMPONENT: BOOKING VIEW (Lógica Intacta - UI Mejorada)
// --------------------------------------------------------------------------
const BookingView = ({ onClose }: { onClose: () => void }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [selectedSpace, setSelectedSpace] = useState(SPACE_TYPES[1]);
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
            <span className="text-[10px] font-bold text-slate-600 tracking-widest">ESTÁNDAR</span>
          </div>
          <button
            onClick={() => { setIsPremium(!isPremium); setStartHour(null); setEndHour(null); }}
            className={`w-14 h-8 rounded-full relative transition-all duration-500 shadow-sm ${isPremium ? 'bg-gradient-to-r from-mh-gold to-yellow-300' : 'bg-slate-300'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 shadow-md ${isPremium ? 'left-7' : 'left-1'}`}></div>
          </button>
          <div className={`px-3 transition-opacity duration-300 ${isPremium ? 'opacity-100' : 'opacity-40'}`}>
            <span className="text-[10px] font-black text-mh-blue tracking-widest flex items-center gap-1">PREMIUM <Star size={10} className="fill-mh-gold text-mh-gold" /></span>
          </div>
        </div>
      </header>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* Panel Principal (Scroll) */}
        <div className="lg:col-span-8 p-6 md:p-10 overflow-y-auto custom-scrollbar bg-[#F8FAFC]">

          {/* 1. Selector de Espacio - Tarjetas Grandes */}
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {getTimeSlots(selectedDate).map((h, idx) => {
                  const isSelected = selectedRange.includes(h);
                  const isStart = h === startHour;
                  const isEnd = h === endHour;
                  const isPrime = isPrimeTime(h, selectedDate);
                  const price = calculateSlotPrice(h, selectedDate);
                  const isRestricted = !isPremium && selectedDate.getDay() === 6;
                  const showCleaning = isSelected && h === lastHourInSelection;

                  return (
                    <div key={h} className="relative group">
                      <button
                        disabled={isRestricted}
                        onClick={() => handleHourClick(h)}
                        className={`w-full relative overflow-hidden flex items-center justify-between p-4 rounded-xl transition-all duration-300 border ${isRestricted
                          ? 'bg-slate-50 border-transparent opacity-40 cursor-not-allowed grayscale'
                          : isSelected
                            ? 'bg-mh-blue border-mh-blue text-white shadow-md'
                            : 'bg-white border-slate-100 hover:border-mh-blue/30 hover:bg-slate-50'
                          }`}
                      >
                        {/* Indicador de Selección */}
                        {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-mh-gold"></div>}

                        <div className="flex items-center gap-4 pl-2">
                          <div className={`flex flex-col items-start min-w-[4rem]`}>
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

                        <div className={`font-mono text-sm font-bold tracking-tight ${isSelected ? 'text-white' : 'text-mh-blue'}`}>
                          {formatPrice(price)}
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
        <div className="lg:col-span-4 bg-white border-l border-slate-100 shadow-2xl shadow-slate-200 z-30 flex flex-col h-full">
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
                const msg = `MedHause! Quiero pre-reservar el espacio ${selectedSpace.name} el ${selectedDate.toDateString()} desde las ${formatHour(startHour!)} hasta las ${formatHour(lastHourInSelection! + 1)}. Inversión estimada: ${formatPrice(selectionMetrics.total)}`;
                window.open(`https://wa.me/573148762907?text=${encodeURIComponent(msg)}`, '_blank');
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

// --------------------------------------------------------------------------
// MAIN APP COMPONENT
// --------------------------------------------------------------------------

export default function App() {
  const [view, setView] = useState<'landing' | 'medicos' | 'colaboradores'>('landing');
  const [showBooking, setShowBooking] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [budget, setBudget] = useState(50000);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('view');
    if (v === 'medicos') setView('medicos');
    if (v === 'colaboradores') setView('colaboradores');
  }, []);

  const handleBack = () => {
    setView('landing');
    window.history.pushState({}, '', window.location.pathname);
  };

  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    city: 'Medellín',
    email: '',
    phone: '',
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const fullPhone = `57${formData.phone}`;
      const { error } = await supabase.from('leads').insert([{
        full_name: formData.name,
        specialty: formData.specialty,
        whatsapp: fullPhone,
        email: formData.email,
        interest: `Presupuesto: ${budget} - Ciudad: ${formData.city}`
      }]);

      if (error) throw error;
      setIsRegistered(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      alert('Hubo un error al registrar. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (showBooking) {
    return <BookingView onClose={() => setShowBooking(false)} />;
  }

  // Vista de éxito post-registro
  if (isRegistered) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-lg w-full text-center relative z-10">
          <div className="w-24 h-24 bg-gradient-to-tr from-mh-gold to-yellow-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-mh-gold/30 animate-fade-in-up">
            <CheckCircle size={48} className="text-mh-blue" />
          </div>
          <h2 className="text-5xl font-heading font-black mb-6 tracking-tight">¡Estás dentro!</h2>
          <p className="text-lg text-slate-300 mb-10 font-light leading-relaxed">Tu lugar en el prelanzamiento de <span className="text-white font-bold">MedHause™</span> está asegurado. Te contactaremos pronto.</p>
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 mb-8 border border-white/10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-4 opacity-50">Código de Acceso Fundador</p>
            <p className="text-4xl font-mono text-mh-gold tracking-widest">MH-{Math.floor(Math.random() * 9000) + 1000}</p>
          </div>
          <button onClick={() => setIsRegistered(false)} className="text-sm text-slate-500 hover:text-white transition-colors uppercase tracking-widest font-bold">Volver al inicio</button>
        </div>
      </div>
    );
  }

  if (view === 'medicos') {
    return <BrochurePhysicians onBack={handleBack} />;
  }

  if (view === 'colaboradores') {
    return <BrochureCollaborators onBack={handleBack} />;
  }

  return (
    <div className="font-sans text-slate-800 antialiased bg-white selection:bg-mh-gold selection:text-mh-blue">
      {/* Navbar con Blur */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100 h-20 flex items-center transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer scale-[0.7] md:scale-[0.8] origin-left transition-transform hover:scale-90"><Logo variant="dark" size="sm" /></div>
          <div className="flex items-center gap-4">
            {/* Botón Agendar Horas */}
            <button onClick={() => setShowBooking(true)} className="hidden md:flex text-xs font-bold text-mh-blue border border-slate-200 bg-slate-50 hover:bg-white hover:border-mh-blue hover:shadow-lg px-6 py-3 rounded-full transition-all items-center gap-2 group tracking-wide">
              <Calendar size={16} className="text-slate-400 group-hover:text-mh-blue transition-colors" /> AGENDAR VISITA
            </button>
            {/* Botón Preregistro */}
            <button onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })} className="bg-mh-blue text-white px-8 py-3 rounded-full text-xs font-black hover:bg-mh-gold hover:text-mh-blue transition-all shadow-xl shadow-mh-blue/20 tracking-widest uppercase">PREREGISTRO</button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Luxury Dark */}
      <header className="relative pt-24 pb-20 md:pt-32 md:pb-40 bg-mh-blue overflow-hidden min-h-[95vh] flex items-center">
        <div className="absolute inset-0 z-0 opacity-30 mix-blend-overlay">
          <img src={IMAGES.hero} className="w-full h-full object-cover scale-105" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-mh-blue via-mh-blue/90 to-transparent z-10"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 text-mh-gold px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-lg animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span> Prelanzamiento Oficial 2025
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white leading-[0.95] mb-8 tracking-tight animate-fade-in-up">
              El nuevo estándar <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">médico en Medellín.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 font-light leading-relaxed max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              MedHause™ es el primer Medical Workspace premium de Colombia. Independencia, prestigio y flexibilidad total para especialistas de alto nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 mb-16 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <button onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })} className="bg-mh-gold text-mh-blue px-10 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-[0_20px_40px_-10px_rgba(242,214,162,0.4)] hover:scale-105 transform duration-300 flex items-center justify-center gap-2 group">
                Unirse a la Lista <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={() => setShowBooking(true)} className="bg-white/5 backdrop-blur-sm border border-white/20 text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3 group">
                <Calendar size={18} className="text-mh-gold" /> Agendar Espacio
              </button>
            </div>

            <div className="flex items-center gap-6 animate-fade-in border-t border-white/10 pt-8" style={{ animationDelay: '0.3s' }}>
              <div className="flex -space-x-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-mh-blue bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://randomuser.me/api/portraits/${i % 2 ? 'men' : 'women'}/${30 + i}.jpg`} className="w-full h-full object-cover opacity-80" />
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-300">
                <span className="font-bold text-white block text-lg leading-none mb-1">+80 especialistas</span>
                <span className="text-xs opacity-60 uppercase tracking-widest">Ya registrados en lista de espera</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Propuesta de Valor - Clean & Minimal */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-mh-blue font-black uppercase tracking-[0.2em] text-xs block mb-4">Smart Business Model</span>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900 mb-10 leading-tight">El consultorio que se paga solo.</h2>
          <p className="text-xl text-slate-500 leading-relaxed mb-16 max-w-3xl mx-auto font-light">
            MedHause™ combina coworking premium, automatización inteligente y diseño de alto nivel para ofrecer horas de consultorio listas para usar. Sin contratos forzosos.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div className="bg-slate-50 p-10 rounded-[2.5rem] hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-red-500 shadow-sm mb-6 group-hover:scale-110 transition-transform"><X size={32} /></div>
              <h4 className="font-heading font-bold text-slate-900 text-2xl mb-4">No es un arriendo.</h4>
              <p className="text-slate-500 leading-relaxed">Olvídate de pagar servicios, secretaria, internet o mantenimiento mensualmente. Elimina tus costos fijos al 100%.</p>
            </div>
            <div className="bg-slate-50 p-10 rounded-[2.5rem] hover:shadow-xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-green-500 shadow-sm mb-6 group-hover:scale-110 transition-transform"><CheckCircle size={32} /></div>
              <h4 className="font-heading font-bold text-slate-900 text-2xl mb-4">Es pura rentabilidad.</h4>
              <p className="text-slate-500 leading-relaxed">Un modelo flexible diseñado para 2025. Solo pagas por el tiempo exacto que estás facturando a tus pacientes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MedHause vs Consultorio Tradicional - Three Pillars */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-mh-gold rounded-full blur-[150px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-mh-turquoise rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4">¿Por Qué MedHause?</span>
            <h2 className="text-4xl md:text-6xl font-heading font-black mb-6">Tres pilares que cambian todo.</h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light">Prestigio, Libertad y Seguridad — los fundamentos que distinguen a MedHause de cualquier consultorio tradicional.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pilar 1: Prestigio */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group">
              <div className="w-16 h-16 bg-mh-gold/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Star size={32} className="text-mh-gold" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Prestigio</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Tu marca personal se eleva al nivel de las mejores clínicas de Medellín.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle size={18} className="text-mh-gold shrink-0 mt-0.5" />
                  <span>Dirección en El Poblado — el sector más exclusivo de la ciudad</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle size={18} className="text-mh-gold shrink-0 mt-0.5" />
                  <span>Diseño hospitalario 5 estrellas sin inversión inicial</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle size={18} className="text-mh-gold shrink-0 mt-0.5" />
                  <span>Recepción profesional que potencia tu imagen de marca</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-500">
                  <X size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Consultorio tradicional:</strong> Ubicaciones menos estratégicas, mobiliario genérico</span>
                </li>
              </ul>
            </div>

            {/* Pilar 2: Libertad */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group">
              <div className="w-16 h-16 bg-mh-turquoise/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap size={32} className="text-mh-turquoise" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Libertad</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Cero costos fijos. Cero contratos forzosos. 100% flexibilidad.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle size={18} className="text-mh-turquoise shrink-0 mt-0.5" />
                  <span>Paga solo por las horas que realmente usas para consultar</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle size={18} className="text-mh-turquoise shrink-0 mt-0.5" />
                  <span>Sin arriendo fijo, servicios públicos ni secretaria en nómina</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle size={18} className="text-mh-turquoise shrink-0 mt-0.5" />
                  <span>Escala tu práctica cuando quieras, sin penalizaciones</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-500">
                  <X size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Consultorio tradicional:</strong> Contratos de 1-3 años, costos fijos de $3-8M/mes</span>
                </li>
              </ul>
            </div>

            {/* Pilar 3: Seguridad */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-10 hover:bg-white/10 transition-all duration-500 group">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} className="text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Seguridad</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">Infraestructura que cumple todas las normas sin que tú te preocupes.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
                  <span>Habilitación Secretaría de Salud incluida en el servicio</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
                  <span>Esterilización, bioseguridad y RUPS siempre al día</span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <CheckCircle size={18} className="text-green-400 shrink-0 mt-0.5" />
                  <span>Equipos certificados y mantenimiento preventivo garantizado</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-500">
                  <X size={18} className="text-red-400 shrink-0 mt-0.5" />
                  <span><strong>Consultorio tradicional:</strong> Toda la carga normativa sobre tus hombros</span>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button onClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })} className="bg-mh-gold text-mh-blue px-12 py-5 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white transition-all shadow-2xl hover:scale-105 transform duration-300">
              Quiero esta ventaja competitiva
            </button>
          </div>
        </div>
      </section>

      {/* Tipos de Espacios - Gallery Style */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs mb-4 block">Espacios MedHause™</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900">Infraestructura de clase mundial.</h2>
            </div>
            <button onClick={() => setShowBooking(true)} className="text-mh-blue font-bold text-sm uppercase tracking-widest border-b-2 border-mh-blue pb-1 hover:text-mh-gold hover:border-mh-gold transition-colors">Ver disponibilidad real</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SPACE_TYPES.map((space) => (
              <div key={space.id} className="group relative rounded-[2.5rem] overflow-hidden bg-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/50 transition-all duration-500 hover:-translate-y-2">
                <div className="h-80 overflow-hidden relative">
                  <img src={space.img} alt={space.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                  <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-xs font-bold text-white uppercase tracking-wider">{space.name}</div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <div className="text-mh-gold mb-2">{space.icon}</div>
                    <h3 className="text-3xl font-heading font-bold">{space.name}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-slate-500 mb-8 text-sm leading-relaxed">{space.desc}</p>
                  <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Desde</span>
                    <span className="text-xl font-bold text-mh-blue">{new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(space.basePrice)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios - Dark & Elegant */}
      <section className="py-32 bg-mh-blue text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-mh-turquoise/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-mh-gold/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-heading font-black mb-8 leading-none">Beneficios <br /><span className="text-mh-gold">Fundador.</span></h2>
              <p className="text-xl text-slate-300 mb-12 font-light leading-relaxed">Únete ahora y asegura ventajas exclusivas reservadas para los primeros 100 especialistas.</p>

              <div className="space-y-8">
                {[
                  { title: "Descuento en Horas", desc: "Tarifas preferenciales vitalicias en todos los espacios." },
                  { title: "Priority Booking", desc: "Ventana de reserva anticipada de 30 días." },
                  { title: "Evento de Apertura", desc: "Acceso VIP al cocktail de inauguración y networking." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-mh-gold group-hover:bg-mh-gold group-hover:text-mh-blue transition-colors duration-300">
                      <Star size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1 group-hover:text-mh-gold transition-colors">{item.title}</h4>
                      <p className="text-sm text-slate-400 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-mh-gold blur-3xl opacity-20"></div>
              <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-12 border border-white/10 relative shadow-2xl">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="text-mh-gold font-bold uppercase tracking-widest text-xs mb-2 block">Estado Actual</span>
                    <h3 className="text-3xl font-bold text-white">Fase 1: Prelanzamiento</h3>
                  </div>
                  <div className="bg-red-500/20 text-red-300 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-500/30 animate-pulse">
                    Cerrando
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-2xl p-8 mb-8 border border-white/5">
                  <p className="text-slate-300 italic text-lg leading-relaxed mb-6">"La calidad de los espacios y la flexibilidad de horarios es exactamente lo que necesitaba para dejar de pagar arriendo fijo."</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-700 overflow-hidden border-2 border-mh-gold/50"><img src="https://randomuser.me/api/portraits/women/65.jpg" /></div>
                    <div>
                      <div className="font-bold text-white">Dra. Camila R.</div>
                      <div className="text-mh-gold text-xs uppercase tracking-widest">Dermatología</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between border-t border-white/10 pt-6">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cupos disponibles</span>
                  <span className="text-5xl font-mono text-mh-gold font-bold tracking-tighter">14</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formulario de Registro - Floating Card */}
      <section id="registration-form" className="py-32 bg-slate-50 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-6">Aplica a la membresía.</h2>
            <p className="text-slate-500 text-lg">Completa tus datos profesionales. Aprobación en 24 horas.</p>
          </div>

          <div className="bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] rounded-[3rem] p-10 md:p-16 border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-mh-blue via-mh-gold to-mh-blue"></div>

            <form onSubmit={handleRegister} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-mh-blue/20 focus:border-mh-blue transition-all font-medium text-slate-700"
                    placeholder="Dr. Juan Pérez"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Especialidad</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-mh-blue/20 focus:border-mh-blue transition-all font-medium text-slate-700"
                    placeholder="Ej: Cirugía Plástica"
                    value={formData.specialty}
                    onChange={e => setFormData({ ...formData, specialty: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Sede de Interés</label>
                <select
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-mh-blue/20 focus:border-mh-blue transition-all appearance-none font-medium text-slate-700"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                >
                  <option value="Medellín">Medellín — Cross Medical Center (Apertura 2025)</option>
                  <option value="Bogotá">Bogotá — Lista de Espera</option>
                  <option value="Cali">Cali — Lista de Espera</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Profesional</label>
                  <input
                    type="email"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-mh-blue/20 focus:border-mh-blue transition-all font-medium text-slate-700"
                    placeholder="doctor@clinica.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">WhatsApp</label>
                  <div className="flex">
                    <span className="bg-slate-100 border border-r-0 border-slate-200 rounded-l-2xl px-5 py-4 text-slate-500 font-bold flex items-center">+57</span>
                    <input
                      type="tel"
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-r-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-mh-blue/20 focus:border-mh-blue transition-all font-medium text-slate-700"
                      placeholder="300 123 4567"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 pb-4">
                <CalculatorInput
                  label="Presupuesto estimado por hora"
                  value={budget}
                  onChange={setBudget}
                  type="currency"
                  max={200000}
                  step={5000}
                />
                <div className="flex justify-between text-[9px] text-slate-300 font-bold uppercase tracking-widest mt-2 px-2">
                  <span>Básico</span>
                  <span>Estándar</span>
                  <span>Premium</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-900 text-white font-black py-6 rounded-2xl hover:bg-mh-blue hover:scale-[1.02] transition-all shadow-2xl shadow-slate-900/20 text-lg flex items-center justify-center gap-3 uppercase tracking-wider"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Enviar Solicitud VIP'} <ChevronRight size={20} />
              </button>
              <p className="text-center text-[10px] text-slate-400 uppercase tracking-widest font-medium">Información confidencial sujeta a política de privacidad.</p>
            </form>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4">Nuestra Ubicación</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">El Epicentro del <br /><span className="text-mh-blue">Lujo Médico.</span></h2>
              <p className="text-slate-500 leading-relaxed">En el corazón de El Poblado, el sector más exclusivo de Medellín, Cross Business Center te espera para transformar tu práctica médica.</p>
            </div>
            <LocationCard variant="light" />
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="bg-white border-t border-slate-100 py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="text-center md:text-left max-w-xs">
            <Logo variant="dark" size="sm" />
            <p className="text-xs text-slate-400 mt-6 font-medium leading-relaxed">Medical Workspaces on-demand diseñados para potenciar la marca personal del especialista moderno.</p>
            <p className="text-[10px] text-slate-300 mt-4 uppercase tracking-widest">© 2025 MedHause™</p>
          </div>
          <div className="flex flex-col md:flex-row gap-16">
            <div>
              <p className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Contacto</p>
              <p className="text-sm text-slate-600 mb-2">+57 314 876 2907</p>
              <p className="text-sm text-slate-600">hola@medhause.co</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Legal</p>
              <a href="#" className="block text-sm text-slate-500 hover:text-mh-blue mb-2 transition-colors">Política de Datos</a>
              <a href="#" className="block text-sm text-slate-500 hover:text-mh-blue transition-colors">Términos de Uso</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}