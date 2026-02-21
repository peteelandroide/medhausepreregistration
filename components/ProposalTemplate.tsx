import React from 'react';
import { ProposalData } from '../types';
import { CheckCircle2, Star, CreditCard, Building2, User, Mail, Smartphone, Globe, ShieldCheck } from 'lucide-react';

interface ProposalTemplateProps {
    data: ProposalData;
    onBack: () => void;
}

export const ProposalTemplate: React.FC<ProposalTemplateProps> = ({ data, onBack }) => {
    if (!data) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100 p-6 text-center">
                <h2 className="text-2xl font-heading font-black text-mh-blue mb-4 uppercase tracking-tighter">No se encontraron datos</h2>
                <p className="text-slate-500 mb-8">Parece que la sesión expiró o no se han generado datos aún.</p>
                <button onClick={onBack} className="bg-mh-blue text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs">
                    Volver al Generador
                </button>
            </div>
        );
    }

    const getBankDetails = () => {
        switch (data.paymentReceiver) {
            case 'Pedro':
                return (
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                        <h4 className="font-heading font-black text-mh-blue uppercase tracking-widest text-xs mb-4">Detalles de Transferencia</h4>
                        <div className="space-y-2 text-sm">
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Titular:</span>
                                <span className="text-mh-blue font-bold">Pedro Vergara</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Cédula:</span>
                                <span className="text-mh-blue font-bold">1045750095</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Banco:</span>
                                <span className="text-mh-blue font-bold">Bancolombia</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Tipo:</span>
                                <span className="text-mh-blue font-bold">Ahorros</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Número:</span>
                                <span className="text-mh-blue font-bold">777-616944-83</span>
                            </p>
                        </div>
                    </div>
                );
            case 'Mafe':
                return (
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                        <h4 className="font-heading font-black text-mh-blue uppercase tracking-widest text-xs mb-4">Detalles de Transferencia</h4>
                        <div className="space-y-2 text-sm">
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Titular:</span>
                                <span className="text-mh-blue font-bold">Maria Fernanda</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Banco:</span>
                                <span className="text-mh-blue font-bold">Nequi / Bancolombia</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Número:</span>
                                <span className="text-mh-blue font-bold">300-XXXX-XXX</span>
                            </p>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl">
                        <h4 className="font-heading font-black text-mh-blue uppercase tracking-widest text-xs mb-4">Detalles de Transferencia Corporativa</h4>
                        <div className="space-y-2 text-sm">
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Empresa:</span>
                                <span className="text-mh-blue font-bold">MedHause SAS</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">NIT:</span>
                                <span className="text-mh-blue font-bold">901.XXX.XXX-X</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Banco:</span>
                                <span className="text-mh-blue font-bold">Bancolombia</span>
                            </p>
                            <p className="flex justify-between">
                                <span className="text-slate-400 font-bold uppercase text-[10px]">Cuenta:</span>
                                <span className="text-mh-blue font-bold">Corriente 031-XXXXXX-XX</span>
                            </p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4 md:px-0">
            {/* Controls - Non Printed */}
            <div className="max-w-[850px] mx-auto mb-8 flex justify-between items-center print:hidden">
                <button onClick={onBack} className="text-slate-500 hover:text-mh-blue flex items-center gap-2 font-bold uppercase text-xs tracking-widest transition-colors">
                    ← Editar Datos
                </button>
                <button onClick={() => window.print()} className="bg-mh-blue text-white px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                    Imprimir Propuesta (PDF) 📄
                </button>
            </div>

            {/* Main Document Body */}
            <div id="proposal-content" className="max-w-[850px] mx-auto bg-white shadow-2xl rounded-sm overflow-hidden min-h-[1050px] border border-slate-200 print:shadow-none print:border-none print:w-[216mm] print:h-[356mm] print:max-w-none flex flex-col">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @media print {
                        @page {
                            size: legal;
                            margin: 0;
                        }
                        body {
                            background: white;
                            margin: 0;
                            padding: 0;
                        }
                        #proposal-content {
                            height: 356mm !important;
                            width: 216mm !important;
                            overflow: hidden;
                        }
                    }
                `}} />

                {/* Header Hook */}
                <div className="bg-mh-blue text-white p-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-mh-gold opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="flex justify-between items-start relative z-10">
                        <div className="space-y-4">
                            <div className="inline-block bg-mh-gold text-mh-blue px-3 py-1 rounded-sm text-[10px] font-black uppercase tracking-[0.3em]">
                                Propuesta Estratégica
                            </div>
                            <h1 className="text-5xl font-heading font-black leading-none tracking-tighter uppercase">
                                MEDHAUSE™ <br />
                                <span className="text-mh-gold">CROSS CENTER</span>
                            </h1>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fecha de Emisión</p>
                            <p className="text-sm font-bold">{new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                    </div>
                </div>

                {/* Introduction Section */}
                <div className="p-8 space-y-8">
                    <section className="animate-fade-in text-slate-800">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="h-px w-10 bg-mh-gold"></div>
                            <h2 className="text-mh-blue font-heading font-black uppercase tracking-[0.2em] text-[10px]">Preparado para:</h2>
                        </div>
                        <div className="pl-12">
                            <h3 className="text-2xl font-heading font-black text-mh-blue">Dr. {data.doctorName}</h3>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] mt-1">{data.specialty}</p>
                        </div>
                    </section>

                    {/* Situation Analytics */}
                    <div className="grid md:grid-cols-2 gap-8 pt-2">
                        <section className="space-y-3">
                            <h4 className="text-mh-blue font-heading font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-mh-gold" />
                                Diagnóstico Actual
                            </h4>
                            <p className="text-slate-600 text-xs leading-relaxed italic border-l-2 border-slate-100 pl-4">
                                "{data.currentSituation}"
                            </p>
                        </section>
                        <section className="space-y-3">
                            <h4 className="text-mh-blue font-heading font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                                <Star size={14} className="text-mh-gold" />
                                Metas Estratégicas
                            </h4>
                            <p className="text-slate-600 text-xs leading-relaxed border-l-2 border-slate-100 pl-4 font-medium">
                                {data.goals}
                            </p>
                        </section>
                    </div>

                    {/* Personal Quote - Listening Proof */}
                    {data.meetingNotes && (
                        <div className="bg-slate-50 border-l-4 border-mh-gold p-6 rounded-r-2xl">
                            <p className="text-mh-blue font-serif italic text-base leading-relaxed mb-2">
                                "{data.meetingNotes}"
                            </p>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                                — Apunte estratégico de la sesión de hoy
                            </p>
                        </div>
                    )}

                    {/* The Solution */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-mh-blue font-heading font-black uppercase tracking-[0.2em] text-[10px]">Propuesta de Solución</h2>
                            <div className="bg-mh-blue text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
                                {data.recommendedPlan} Elite
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="space-y-5">
                                <div className="bg-mh-blue/5 p-5 rounded-xl border border-mh-blue/10">
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-mh-blue mb-3">Alcance Operativo</h4>
                                    <div className="flex items-end gap-2">
                                        <span className="text-3xl font-heading font-black text-mh-blue leading-none">{data.hoursPerMonth}</span>
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pb-1">Horas / Mes</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Beneficios Incluidos</h4>
                                    <ul className="space-y-2">
                                        {data.keyBenefits.map((benefit, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                                                <div className="w-1.5 h-1.5 rounded-full bg-mh-gold mt-1 shrink-0"></div>
                                                <span className="leading-tight">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="bg-mh-gold/10 p-5 rounded-xl border border-mh-gold/30">
                                    <h4 className="text-[9px] font-black uppercase tracking-widest text-mh-gold mb-3">Inversión Mensual</h4>
                                    <div className="text-3xl font-heading font-black text-mh-blue leading-none">
                                        {data.priceEstimate}
                                    </div>
                                    {data.discountApplied && (
                                        <p className="text-[8px] font-black text-white bg-mh-blue inline-block px-2 py-0.5 rounded mt-2 uppercase tracking-widest">
                                            Promoción: {data.discountApplied}
                                        </p>
                                    )}
                                </div>

                                {data.paymentTerms && (
                                    <div className="space-y-1">
                                        <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400">Condiciones de Pago</h4>
                                        <p className="text-xs font-medium text-slate-700">{data.paymentTerms}</p>
                                    </div>
                                )}

                                <div className="pt-3 border-t border-slate-100">
                                    <p className="text-xs font-black text-mh-blue bg-white border-2 border-mh-blue/10 p-3 rounded-lg flex items-center gap-2">
                                        <ShieldCheck className="text-mh-gold" size={16} />
                                        {data.nextSteps}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mafe's Notes (Only if present, internal or final) */}
                    {data.mafeNotes && (
                        <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Comentarios Adicionales</h4>
                            <p className="text-xs text-slate-600 leading-relaxed italic line-clamp-3">"{data.mafeNotes}"</p>
                        </section>
                    )}

                    {/* Financial Details */}
                    <section className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                        {getBankDetails()}
                        <div className="flex flex-col justify-center space-y-2">
                            <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400">Información de Seguridad</h4>
                            <p className="text-[8px] text-slate-400 leading-relaxed uppercase">
                                Esta propuesta es confidencial y ha sido diseñada exclusivamente para el Dr. {data.doctorName}. Válida por los próximos 15 días calendario de acuerdo a la disponibilidad de consultorios.
                            </p>
                        </div>
                    </section>
                </div>

                {/* Footer Branding */}
                <div className="bg-slate-50 border-t border-slate-100 p-8 mt-auto">
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-mh-blue font-black uppercase text-[8px] tracking-widest">
                                <Building2 size={12} className="text-mh-gold" /> Ubicación
                            </div>
                            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">
                                Cross Business Center <br />
                                El Poblado, Medellín <br />
                                Consultorio 1102
                            </p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-mh-blue font-black uppercase text-[8px] tracking-widest">
                                <Mail size={12} className="text-mh-gold" /> Email
                            </div>
                            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">
                                mariafsabat@medhause.com
                            </p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-mh-blue font-black uppercase text-[8px] tracking-widest">
                                <Smartphone size={12} className="text-mh-gold" /> Contactos
                            </div>
                            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">
                                P. Vergara: 314 876 2907 <br />
                                M. Sabat: 305 341 2292
                            </p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-1.5 text-mh-blue font-black uppercase text-[8px] tracking-widest">
                                <Globe size={12} className="text-mh-gold" /> Web
                            </div>
                            <p className="text-[8px] text-slate-500 font-bold uppercase tracking-tighter">
                                medhause.drasistia.com
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-[7px] font-black uppercase tracking-[0.5em] text-slate-300">
                        <span>MedHause Ecosystem © 2026</span>
                        <span>Powered by MedHause Sales Intelligence</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
