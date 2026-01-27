import React, { useState, useEffect } from 'react';
import { BrochurePhysicians } from './components/BrochurePhysicians';
import { BrochureCollaborators } from './components/BrochureCollaborators';
import { BookingView } from './components/BookingView';
import { LandingPage } from './components/LandingPage';
import { AdsLanding } from './components/AdsLanding';
import { PendonBanner } from './components/PendonBanner';
import { PitchDeck } from './components/PitchDeck';
import { CheckCircle } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'landing' | 'medicos' | 'colaboradores' | 'booking' | 'promo' | 'pendon' | 'pitch'>('landing');
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get('view');
    if (v === 'medicos') setView('medicos');
    if (v === 'colaboradores') setView('colaboradores');
    if (v === 'promo') setView('promo');
    if (v === 'pendon') setView('pendon');
    if (v === 'pitch') setView('pitch');
  }, []);

  const handleBack = () => {
    setView('landing');
    window.history.pushState({}, '', window.location.pathname);
  };

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

  if (view === 'booking') {
    return <BookingView onClose={() => setView('landing')} />;
  }

  if (view === 'medicos') {
    return <BrochurePhysicians onBack={handleBack} />;
  }

  if (view === 'colaboradores') {
    return <BrochureCollaborators onBack={handleBack} />;
  }

  if (view === 'promo') {
    return <AdsLanding onHomeClick={() => setView('landing')} />;
  }

  if (view === 'pendon') {
    return <PendonBanner />;
  }

  if (view === 'pitch') {
    return <PitchDeck onBack={handleBack} />;
  }

  return (
    <LandingPage
      onBookClick={() => setView('booking')}
      onRegisterClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
      onRegisterSuccess={() => setIsRegistered(true)}
    />
  );
}