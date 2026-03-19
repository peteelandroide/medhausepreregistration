import React, { useState, useEffect } from 'react';
import { BrochurePhysicians } from './components/BrochurePhysicians';
import { BrochureCollaborators } from './components/BrochureCollaborators';
import { BookingView } from './components/BookingView';
import { LandingPage } from './components/LandingPage';
import { ReservasLanding } from './components/ReservasLanding';
import { QuoteLanding } from './components/QuoteLanding';
import { PendonBanner } from './components/PendonBanner';
import { PitchDeck } from './components/PitchDeck';
import { DoctorPitch } from './components/DoctorPitch';
import { MafePitch } from './components/MafePitch';
import { DoctorLandingCaro } from './components/DoctorLandingCaro';
import { DoctorLandingAfro } from './components/DoctorLandingAfro';
import { DoctorLandingAfroEn } from './components/DoctorLandingAfroEn';
import { TVShowcase } from './components/TVShowcase';
import { TVShowcaseOmar } from './components/TVShowcaseOmar';
import { TVShowcaseJohn } from './components/TVShowcaseJohn';
import { TVShowcaseDaniela } from './components/TVShowcaseDaniela';
import { TVShowcaseSergio } from './components/TVShowcaseSergio';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfUse } from './components/TermsOfUse';
import { ProposalGenerator } from './components/ProposalGenerator';
import { ProposalTemplate } from './components/ProposalTemplate';
import { Footer } from './components/Footer';
import { CheckCircle } from 'lucide-react';
import { MetaPixel, trackPageView } from './components/MetaPixel';
import { KoluConsulting } from './components/KoluConsulting';
import { AdminSchedule } from './components/AdminSchedule';
import { DoctorKanban } from './components/DoctorKanban';
import { PatientKanban } from './components/PatientKanban';
import { PaymentCaroPotes } from './components/PaymentCaroPotes';


export default function App() {
  const [view, setView] = useState<'landing' | 'medicos' | 'colaboradores' | 'booking' | 'promo' | 'reservas' | 'pendon' | 'pitch' | 'doctor-pitch' | 'mafe-pitch' | 'doctor-caro' | 'doctor-afro' | 'doctor-afro-en' | 'tv' | 'tv-showcase' | 'tv-omar' | 'tv-john' | 'tv-daniela' | 'tv-sergio' | 'privacy' | 'terms' | 'generate' | 'proposal-preview' | 'kolu' | 'admin-schedule' | 'doctor-kanban' | 'patient-kanban' | 'payment-caro'>('landing');

  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('view');
      if (v === 'medicos') setView('medicos');
      else if (v === 'colaboradores') setView('colaboradores');
      else if (v === 'promo') setView('promo');
      else if (v === 'reservas') setView('reservas');
      else if (v === 'pendon') setView('pendon');
      else if (v === 'pitch') setView('pitch');
      else if (v === 'doctor-pitch') setView('doctor-pitch');
      else if (v === 'mafe-pitch') setView('mafe-pitch');
      else if (v === 'doctor-caro') setView('doctor-caro');
      else if (v === 'doctor-afro') setView('doctor-afro');
      else if (v === 'doctor-afro-en') setView('doctor-afro-en');
      else if (v === 'tv') setView('tv');
      else if (v === 'tv-showcase') setView('tv-showcase');
      else if (v === 'tv-omar') setView('tv-omar');
      else if (v === 'tv-john') setView('tv-john');
      else if (v === 'tv-daniela') setView('tv-daniela');
      else if (v === 'tv-sergio') setView('tv-sergio');
      else if (v === 'privacy') setView('privacy');
      else if (v === 'terms') setView('terms');
      else if (v === 'generate') setView('generate');
      else if (v === 'proposal-preview') setView('proposal-preview');
      else if (v === 'kolu') setView('kolu');
      else if (v === 'admin-schedule') setView('admin-schedule');
      else if (v === 'doctor-kanban') setView('doctor-kanban');
      else if (v === 'patient-kanban') setView('patient-kanban');
      else if (v === 'payment-caro') setView('payment-caro');
      else setView('landing');


      // Track PageView whenever view changes matching URL
      trackPageView();
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleBack = () => {
    setView('landing');
    window.history.pushState({}, '', window.location.pathname);
  };

  const renderContent = () => {
    // Vista de éxito post-registro
    if (isRegistered) {
      return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center p-6 text-white font-sans relative overflow-x-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="max-w-lg w-full text-center relative z-10 my-auto py-20">
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
          <div className="w-full mt-auto">
            <Footer />
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

    if (view === 'reservas') {
      return <ReservasLanding onHomeClick={() => setView('landing')} />;
    }

    if (view === 'promo') {
      return <QuoteLanding onHomeClick={() => setView('landing')} />;
    }

    if (view === 'pendon') {
      return <PendonBanner />;
    }

    if (view === 'pitch') {
      return <PitchDeck onBack={handleBack} />;
    }

    if (view === 'doctor-pitch') {
      return <DoctorPitch onBack={handleBack} />;
    }

    if (view === 'mafe-pitch') {
      return <MafePitch onBack={handleBack} />;
    }

    if (view === 'doctor-caro') {
      return <DoctorLandingCaro onBack={handleBack} />;
    }

    if (view === 'doctor-afro') {
      return <DoctorLandingAfro onBack={handleBack} />;
    }

    if (view === 'doctor-afro-en') {
      return <DoctorLandingAfroEn onBack={handleBack} />;
    }

    if (view === 'tv') {
      return <TVShowcase />;
    }

    if (view === 'tv-showcase') {
      return <TVShowcase />;
    }

    if (view === 'tv-omar') {
      return <TVShowcaseOmar />;
    }

    if (view === 'tv-john') {
      return <TVShowcaseJohn />;
    }

    if (view === 'tv-daniela') {
      return <TVShowcaseDaniela />;
    }

    if (view === 'tv-sergio') {
      return <TVShowcaseSergio />;
    }

    if (view === 'privacy') {
      return <PrivacyPolicy onBack={handleBack} />;
    }

    if (view === 'terms') {
      return <TermsOfUse onBack={handleBack} />;
    }

    if (view === 'generate') {
      return <ProposalGenerator />;
    }

    if (view === 'proposal-preview') {
      const proposalData = window.history.state;
      return <ProposalTemplate data={proposalData} onBack={() => {
        const url = new URL(window.location.href);
        url.searchParams.set('view', 'generate');
        window.history.pushState(proposalData, '', url.toString());
        window.dispatchEvent(new PopStateEvent('popstate'));
      }} />;
    }

    if (view === 'kolu') {
      return <KoluConsulting onBack={handleBack} />;
    }

    if (view === 'admin-schedule') {
      return <AdminSchedule />;
    }

    if (view === 'doctor-kanban') {
      return <DoctorKanban onBack={handleBack} />;
    }

    if (view === 'patient-kanban') {
      return <PatientKanban onBack={handleBack} />;
    }

    if (view === 'payment-caro') {
      return <PaymentCaroPotes onBack={handleBack} />;
    }


    return (
      <LandingPage
        onBookClick={() => setView('booking')}
        onRegisterClick={() => document.getElementById('registration-form')?.scrollIntoView({ behavior: 'smooth' })}
        onRegisterSuccess={() => setIsRegistered(true)}
      />
    );
  };

  return (
    <>
      <MetaPixel />
      {renderContent()}
    </>
  );
}