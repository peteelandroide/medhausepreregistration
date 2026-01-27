import React from 'react';
import {
    TrendingUp,
    BarChart3,
    Target,
    ShieldCheck,
    Expand,
    DollarSign,
    ArrowLeft,
    ChevronRight,
    Building2,
    Clock,
    Users,
    CheckCircle,
    AlertCircle,
    Gem,
    Calculator,
    GanttChartSquare,
    Network
} from 'lucide-react';
import { Logo } from './Logo';

interface PitchDeckProps {
    onBack: () => void;
}

export const PitchDeck: React.FC<PitchDeckProps> = ({ onBack }) => {
    return (
        <div className="font-sans text-slate-900 antialiased bg-white selection:bg-mh-gold selection:text-mh-blue min-h-screen">
            {/* Navigation */}
            <nav className="fixed top-0 w-full bg-slate-950/90 backdrop-blur-xl z-50 border-b border-white/5 h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
                    <button onClick={onBack} className="flex items-center gap-2 text-mh-gold font-bold text-xs uppercase tracking-widest hover:text-white transition-colors">
                        <ArrowLeft size={16} /> Volver
                    </button>
                    <div style={{ transform: 'scale(0.75)' }}><Logo variant="light" size="md" /></div>
                    <div className="hidden md:block">
                        <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em]">Confidencial - Memorando de Inversión 2026</span>
                    </div>
                </div>
            </nav>

            {/* 1. Hero Section - Tesis de Inversión */}
            <header className="relative pt-32 pb-20 bg-slate-950 overflow-hidden min-h-[90vh] flex items-center">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img src="/hero_colaboradores.png" className="w-full h-full object-cover" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent z-10"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-3 bg-mh-gold/10 border border-mh-gold/20 text-mh-gold px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10 shadow-lg">
                            <TrendingUp size={14} /> Fecha: Enero 2026 | Objetivo: Formalización de Alianza
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-white leading-[0.95] mb-8 tracking-tight uppercase">
                            Memorando de Inversión: <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-gold via-yellow-200 to-white">PROYECTO MEDHAUSE.</span>
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                            <div className="space-y-6">
                                <h3 className="text-mh-gold font-bold uppercase tracking-widest text-sm border-b border-mh-gold/20 pb-2">1. Tesis de Inversión</h3>
                                <p className="text-xl text-slate-300 font-light leading-relaxed">
                                    MedHause propone un modelo de <strong>optimización de activos inmobiliarios</strong> en el sector salud.
                                </p>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-[2.5rem]">
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    A diferencia del arrendamiento tradicional, con techo de ingresos fijo (<strong>$12.5M COP/mes</strong>), nuestro modelo de gestión por demanda + membresías permite romper ese techo mediante la rotación de especialistas, generando <strong>flujos de caja superiores</strong> y valorización de marca.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 2. Análisis Técnico - Capacidad Instalada */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <span className="text-mh-blue font-black uppercase tracking-[0.2em] text-xs block mb-4">2. Análisis Técnico</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6 uppercase">Capacidad Instalada <br /><span className="text-mh-blue font-light">(El Inventario)</span></h2>
                        <p className="text-slate-500 max-w-2xl font-light">Para entender el potencial de ingresos, desglosamos matemáticamente el inventario vendible de la <strong>Oficina 1102, Cross Medical Center</strong>.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <h3 className="text-xl font-bold flex items-center gap-3 bg-slate-100 p-4 rounded-2xl"><Building2 className="text-mh-blue" /> Unidades Productivas</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { name: 'Unidad 1 (Basic)', size: '8-10m²', use: 'Psicología / Nutrición / Entrevista', color: 'border-l-4 border-mh-blue bg-slate-50' },
                                    { name: 'Unidad 2 (Medium)', size: '~11m²', use: 'Examen físico / Procedimientos menores', color: 'border-l-4 border-mh-turquoise bg-slate-50' },
                                    { name: 'Unidad 3 (Premium)', size: '~12m²+', use: 'Procedimientos estéticos', color: 'border-l-4 border-mh-gold bg-slate-50' }
                                ].map((unit, i) => (
                                    <div key={i} className={`p-6 rounded-r-3xl ${unit.color}`}>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="font-black text-sm uppercase tracking-widest text-slate-900">{unit.name}</span>
                                            <span className="text-xs font-bold px-3 py-1 bg-white rounded-full shadow-sm">{unit.size}</span>
                                        </div>
                                        <p className="text-slate-600 text-sm font-light">{unit.use}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-xl font-bold flex items-center gap-3 bg-slate-900 text-white p-4 rounded-2xl"><Calculator className="text-mh-gold" /> Cálculo de Horas Vendibles</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Escenario A */}
                                <div className="p-8 border border-slate-200 rounded-[2.5rem] bg-white shadow-lg">
                                    <h4 className="font-black text-xs uppercase tracking-widest text-slate-400 mb-4">A. Escenario Estándar</h4>
                                    <p className="text-[10px] text-slate-500 mb-4 font-bold uppercase tracking-tighter">Operación con recepción de edificio activa</p>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-xs"><span>L-V (7 AM - 6 PM)</span><span className="font-bold">11h</span></div>
                                        <div className="flex justify-between text-xs"><span>Sábados (7 AM - 1 PM)</span><span className="font-bold">6h</span></div>
                                        <div className="h-px bg-slate-100"></div>
                                        <div className="flex justify-between text-sm font-bold"><span>Total Semanal</span><span>61h / cons.</span></div>
                                    </div>
                                    <div className="bg-slate-900 text-mh-gold p-4 rounded-2xl text-center">
                                        <p className="text-[10px] uppercase font-bold text-white/50 mb-1">Capacidad Mensual (3 Cons.)</p>
                                        <p className="text-2xl font-black">~787 Horas</p>
                                    </div>
                                </div>

                                {/* Escenario B */}
                                <div className="p-8 border-2 border-mh-blue rounded-[2.5rem] bg-slate-950 text-white shadow-2xl relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={60} /></div>
                                    <h4 className="font-black text-xs uppercase tracking-widest text-mh-gold mb-4">B. Escenario Maximizado</h4>
                                    <p className="text-[10px] text-slate-400 mb-4 font-bold uppercase tracking-tighter">Turismo médico + agenda nocturna</p>
                                    <div className="space-y-3 mb-6">
                                        <div className="flex justify-between text-xs"><span>L-V (7 AM - 8 PM)</span><span className="font-bold">13h</span></div>
                                        <div className="flex justify-between text-xs"><span>Sábados y Domingos</span><span className="font-bold">9h/día</span></div>
                                        <div className="h-px bg-white/10"></div>
                                        <div className="flex justify-between text-sm font-bold text-mh-gold"><span>Total Semanal</span><span>83h / cons.</span></div>
                                    </div>
                                    <div className="bg-mh-blue text-white p-4 rounded-2xl text-center">
                                        <p className="text-[10px] uppercase font-bold text-white/50 mb-1">Capacidad Mensual (3 Cons.)</p>
                                        <p className="text-2xl font-black">~996 Horas</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] text-slate-500 leading-relaxed uppercase tracking-widest">
                                <strong>Nota Técnica:</strong> El cálculo financiero se basa en el <strong>Escenario B</strong>, ya que el costo marginal de operar horas extra es inferior al ingreso generado.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Modelo de Ingresos y Estructura de Precios */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <span className="text-mh-blue font-black uppercase tracking-[0.2em] text-xs block mb-4">3. Modelo de Ingresos</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6 uppercase italic">Estrategia de Precios <br /><span className="text-mh-blue">Dinámicos.</span></h2>
                        <p className="text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                            El precio varía según la demanda horaria y el tipo de contrato para maximizar la ocupación técnica.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-xl bg-white">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-widest">
                                        <tr>
                                            <th className="px-8 py-6">Categoría</th>
                                            <th className="px-8 py-6 text-center">Tarifa Base</th>
                                            <th className="px-8 py-6 text-center text-mh-gold">Tarifa Miembro (-15%)</th>
                                            <th className="px-8 py-6 hidden md:table-cell">Justificación Técnica</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm divide-y divide-slate-100">
                                        <tr>
                                            <td className="px-8 py-6 font-black text-slate-900">Basic</td>
                                            <td className="px-8 py-6 text-center font-bold text-slate-400">$50,000</td>
                                            <td className="px-8 py-6 text-center font-black text-mh-blue text-base">$42,500</td>
                                            <td className="px-8 py-6 hidden md:table-cell text-xs text-slate-500 italic">CAC bajo. Entrada de mercado.</td>
                                        </tr>
                                        <tr>
                                            <td className="px-8 py-6 font-black text-slate-900">Medium</td>
                                            <td className="px-8 py-6 text-center font-bold text-slate-400">$75,000</td>
                                            <td className="px-8 py-6 text-center font-black text-mh-blue text-base">$63,750</td>
                                            <td className="px-8 py-6 hidden md:table-cell text-xs text-slate-500 italic">Punto medio de rentabilidad.</td>
                                        </tr>
                                        <tr className="bg-mh-gold/5">
                                            <td className="px-8 py-6 font-black text-slate-900">Premium</td>
                                            <td className="px-8 py-6 text-center font-bold text-slate-400">$100k-$120k</td>
                                            <td className="px-8 py-6 text-center font-black text-mh-blue text-base">$85,000</td>
                                            <td className="px-8 py-6 hidden md:table-cell text-xs text-slate-500 italic">Alto margen. Odontología y Estética.</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="bg-slate-950 text-white p-12 rounded-[3.5rem] shadow-2xl relative flex flex-col justify-between border-t-8 border-mh-gold">
                            <div>
                                <span className="text-mh-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 block">Producto Financiero</span>
                                <h3 className="text-3xl font-heading font-black mb-6">Membresía <br />Trimestral</h3>
                                <div className="text-4xl font-bold mb-6 text-white">$2,000,000 <span className="text-sm text-slate-500 uppercase tracking-widest">COP</span></div>
                                <ul className="space-y-4 text-sm text-slate-400 font-light border-t border-white/10 pt-6">
                                    <li className="flex gap-3"><CheckCircle size={16} className="text-mh-gold shrink-0 mt-0.5" /> 30 horas premium (limitado a 10h/mes)</li>
                                    <li className="flex gap-3"><CheckCircle size={16} className="text-mh-gold shrink-0 mt-0.5" /> Evita saturación de agenda por un solo usuario</li>
                                </ul>
                            </div>
                            <div className="mt-10 p-6 bg-mh-gold/10 rounded-3xl border border-mh-gold/20">
                                <p className="text-[10px] font-black uppercase tracking-widest text-mh-gold mb-2">Objetivo Financiero</p>
                                <p className="text-xs text-slate-300 leading-relaxed italic">Asegurar flujo de caja operativo (<strong>$20M con 10 ventas</strong>) y fidelizar LTV.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Proyecciones Financieras - P&L */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-center md:text-left">
                        <div>
                            <span className="text-mh-blue font-black uppercase tracking-[0.2em] text-xs block mb-4">4. P&L Proyectado</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase">Proyecciones <br /><span className="text-mh-blue italic">de Rendimiento.</span></h2>
                        </div>
                        <div className="bg-slate-100 p-8 rounded-[2rem] text-left max-w-sm border border-slate-200">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Supuestos de Costos Operativos</p>
                            <p className="text-lg font-bold text-slate-900">$3.5M - $4.0M</p>
                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight mt-1">Servicios, Aseo, Software, Personal (Sin Canon)</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Escenario 1 */}
                        <div className="group p-10 rounded-[3.5rem] bg-slate-50 border border-slate-200 flex flex-col h-full hover:bg-white hover:shadow-2xl transition-all duration-500">
                            <div className="inline-flex bg-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full mb-8 w-fit">Escenario 1: Validación</div>
                            <h4 className="text-xl font-black mb-6">Punto de Equilibrio</h4>
                            <ul className="space-y-4 mb-8 text-sm flex-grow">
                                <li className="flex justify-between border-b border-slate-200 pb-2"><span>Ocupación (30%)</span><span className="font-bold">~298h</span></li>
                                <li className="flex justify-between border-b border-slate-200 pb-2"><span>Ingresos Brutos</span><span className="font-bold text-mh-blue">~$11,800,000</span></li>
                                <li className="flex justify-between"><span>Utilidad Operativa</span><span className="font-bold">~$7,800,000</span></li>
                            </ul>
                            <div className="bg-red-50 p-6 rounded-3xl border border-red-100">
                                <p className="text-xs font-bold text-red-800 mb-2 uppercase tracking-widest flex items-center gap-2"><AlertCircle size={14} /> Conclusión Técnica</p>
                                <p className="text-xs text-red-600/80 leading-relaxed italic">
                                    Cubre OpEx, pero no el canon completo ($12.5M). Requiere estructura de <strong>canon variable</strong>.
                                </p>
                            </div>
                        </div>

                        {/* Escenario 2 */}
                        <div className="group p-10 rounded-[3.5rem] bg-slate-950 text-white flex flex-col h-full transform scale-105 shadow-2xl relative z-10 border-t-8 border-mh-blue">
                            <div className="inline-flex bg-mh-blue text-white text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full mb-8 w-fit">Escenario 2: Estabilización</div>
                            <h4 className="text-xl font-black mb-6 text-mh-gold">Meta Mes 4-6</h4>
                            <ul className="space-y-4 mb-8 text-sm flex-grow text-slate-300">
                                <li className="flex justify-between border-b border-white/10 pb-2"><span>Ocupación (50%)</span><span className="font-bold text-white">~498h</span></li>
                                <li className="flex justify-between border-b border-white/10 pb-2"><span>Mix de Ventas</span><span className="font-bold text-white">4 Membresías + Paquetes</span></li>
                                <li className="flex justify-between border-b border-white/10 pb-2"><span>Ingresos Brutos</span><span className="font-bold text-mh-gold">~$38,000,000</span></li>
                                <li className="flex justify-between"><span>Utilidad Operativa</span><span className="font-bold text-white">~$34,000,000</span></li>
                            </ul>
                            <div className="bg-white/10 p-6 rounded-3xl border border-white/10">
                                <p className="text-xs font-bold text-mh-gold mb-2 uppercase tracking-widest flex items-center gap-2"><TrendingUp size={14} /> Retorno Inmobiliario</p>
                                <p className="text-xs text-slate-300 leading-relaxed italic">
                                    Cubre <strong>canon base</strong> + Participación en utilidades significativa para el inversionista.
                                </p>
                            </div>
                        </div>

                        {/* Escenario 3 */}
                        <div className="group p-10 rounded-[3.5rem] border-2 border-slate-100 bg-white flex flex-col h-full hover:shadow-2xl transition-all duration-500">
                            <div className="inline-flex bg-mh-gold/20 text-mh-blue text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full mb-8 w-fit">Escenario 3: Optimista</div>
                            <h4 className="text-xl font-black mb-6">Consolidación</h4>
                            <ul className="space-y-4 mb-8 text-sm flex-grow">
                                <li className="flex justify-between border-b border-slate-200 pb-2"><span>Ocupación (80%)</span><span className="font-bold">Saturación Pico</span></li>
                                <li className="flex justify-between border-b border-slate-200 pb-2"><span>Servicios Extra</span><span className="font-bold">Marketing + OD</span></li>
                                <li className="flex justify-between"><span>Ingresos Brutos</span><span className="font-bold text-mh-blue text-lg">$60M - $70M</span></li>
                            </ul>
                            <div className="bg-mh-gold text-mh-blue p-6 rounded-3xl text-center">
                                <p className="text-xs font-black uppercase tracking-tighter">EL MODELO GENERA</p>
                                <p className="text-3xl font-heading font-black">5X</p>
                                <p className="text-[10px] font-bold">VALOR ARRENDAMIENTO TRADICIONAL</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Estructura de la Sociedad Propuesta */}
            <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                        <div className="flex-1">
                            <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4">5. Estructura Legal</span>
                            <h2 className="text-4xl md:text-6xl font-heading font-black mb-6">
                                Propuesta de <br /><span className="text-mh-gold">Sociedad.</span>
                            </h2>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] max-w-md">
                            <p className="text-sm text-slate-400 leading-relaxed font-light italic">
                                "Estructura híbrida que mitiga el riesgo del propietario y premia la gestión operativa, basada en la sesión del 22 de enero."
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                        <div className="bg-slate-800/50 border border-white/10 rounded-[3rem] p-12 hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-16 h-16 bg-mh-turquoise/20 rounded-2xl flex items-center justify-center text-mh-turquoise"><Users size={24} /></div>
                                <div>
                                    <h4 className="text-mh-turquoise font-black uppercase tracking-[0.3em] text-[10px]">A. Socio Gestor</h4>
                                    <p className="text-xl font-bold">Pedro & Mafe</p>
                                </div>
                            </div>
                            <ul className="space-y-6 text-sm text-slate-300">
                                <li className="flex gap-4">
                                    <span className="w-6 h-6 rounded-full bg-mh-turquoise/10 flex items-center justify-center text-mh-turquoise text-[10px] font-black shrink-0">1</span>
                                    <div><strong>Capital Intelectual:</strong> Know-how en marketing médico y gestión financiera.</div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-6 h-6 rounded-full bg-mh-turquoise/10 flex items-center justify-center text-mh-turquoise text-[10px] font-black shrink-0">2</span>
                                    <div><strong>Ejecución:</strong> Ventas, marketing digital, software de agenda y gestión de clientes.</div>
                                </li>
                                <li className="flex gap-4">
                                    <span className="w-6 h-6 rounded-full bg-mh-turquoise/10 flex items-center justify-center text-mh-turquoise text-[10px] font-black shrink-0">3</span>
                                    <div><strong>Responsabilidad:</strong> Operación diaria y administración del negocio.</div>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-slate-800/50 border border-white/10 rounded-[3rem] p-12 hover:bg-slate-800 transition-colors">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-16 h-16 bg-mh-gold/20 rounded-2xl flex items-center justify-center text-mh-gold"><Gem size={24} /></div>
                                <div>
                                    <h4 className="text-mh-gold font-black uppercase tracking-[0.3em] text-[10px]">B. Socio Inversionista</h4>
                                    <p className="text-xl font-bold">Andrés</p>
                                </div>
                            </div>
                            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-6 border-b border-white/5 pb-2">Estructura del Retorno (Hybrid Rent)</h5>
                            <div className="space-y-6">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                    <h6 className="font-bold text-white mb-2 text-sm flex items-center gap-2"><CheckCircle size={14} className="text-mh-gold" /> 1. Canon Base Garantizado (Piso)</h6>
                                    <p className="text-xs text-slate-400 leading-relaxed">Cubre costos de tenencia y ofrece retorno base seguro. <strong className="text-mh-gold italic">Nota: Periodo de gracia inicial solicitado hasta Punto de Equilibrio.</strong></p>
                                </div>
                                <div className="bg-mh-gold/10 p-6 rounded-2xl border border-mh-gold/20">
                                    <h6 className="font-bold text-mh-gold mb-2 text-sm flex items-center gap-2"><TrendingUp size={14} /> 2. Participación Variable (Upside)</h6>
                                    <p className="text-xs text-slate-300 leading-relaxed">Porcentaje sobre Utilidad Neta después de canon base y OpEx. Captura el valor del éxito comercial más allá del mercado tradicional.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Riesgos y Mitigantes */}
            <section className="py-24 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-16">
                        <span className="text-mh-blue font-black uppercase tracking-[0.2em] text-xs block mb-4">6. Gestión de Riesgos</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase italic">Mitigación Estratégica.</h2>
                    </div>

                    <div className="overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-slate-100 text-slate-500 text-[10px] uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-6">Riesgo Identificado</th>
                                    <th className="px-8 py-6">Estrategia de Mitigación</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6 font-bold text-slate-900">Baja Ocupación Inicial</td>
                                    <td className="px-8 py-6 text-sm text-slate-500">Venta agresiva de Membresías (Cash Flow anticipado) y precios de lanzamiento ($50k) para reducir barrera de entrada.</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6 font-bold text-slate-900">Logística Horarios Extendidos</td>
                                    <td className="px-8 py-6 text-sm text-slate-500">Implementación de acceso vía parqueadero y contratación de auxiliar por horas bajo demanda confirmada, eliminando costos fijos de nómina inactiva.</td>
                                </tr>
                                <tr className="hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-6 font-bold text-slate-900">Riesgo Normativo (Habilitación)</td>
                                    <td className="px-8 py-6 text-sm text-slate-500">Alianza con firma externa (ATICE) para gestión de "novedad" ($100k) y cumplimiento estricto de Resolución 3100.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 7. Estrategia de Expansión */}
            <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-mh-gold font-black uppercase tracking-[0.2em] text-xs block mb-4 underline decoration-mh-gold underline-offset-8 decoration-2">Estrategia de Expansión</span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black mb-8 uppercase">El <span className="text-transparent bg-clip-text bg-gradient-to-r from-mh-turquoise to-white italic">Efecto Red.</span></h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left items-start">
                        <div className="group space-y-6 p-8 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500">
                            <div className="text-4xl font-black text-mh-turquoise group-hover:scale-110 transition-transform inline-block italic">Phase 01</div>
                            <h4 className="text-xl font-bold uppercase tracking-widest text-white">Medellín (Cross)</h4>
                            <p className="text-sm text-slate-400 font-light leading-relaxed">
                                Validación operativa y financiera. Rentabilidad vía ocupación crítica y consolidación de las primeras 20 membresías.
                            </p>
                        </div>
                        <div className="group space-y-6 p-8 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500">
                            <div className="text-4xl font-black text-white/20 group-hover:scale-110 transition-transform inline-block italic">Phase 02</div>
                            <h4 className="text-xl font-bold uppercase tracking-widest text-white">Escalabilidad</h4>
                            <p className="text-sm text-slate-400 font-light leading-relaxed">
                                Una vez validado el modelo <strong>"Plug & Play"</strong> (Marketing + Software + Espacio), abrimos sedes en Bogotá (Usaquén) y Barranquilla.
                            </p>
                        </div>
                        <div className="bg-mh-turquoise/20 p-10 rounded-[3.5rem] border border-mh-turquoise/30 flex flex-col justify-center h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-6 opacity-10 rotate-12"><Network size={120} /></div>
                            <p className="text-lg leading-relaxed italic text-white font-light text-center relative z-10">
                                "Un médico estético de Bogotá que tiene pacientes en Medellín ya no tiene que buscar dónde atender. Usa su <span className="text-mh-gold font-bold">Membresía MedHause</span> para operar en ambas ciudades sin costos fijos."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROPUESTA DE INVERSIÓN: OPCIÓN C */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-heading font-black mb-16 uppercase italic">
                        Propuesta de <span className="text-mh-blue">Inversión.</span>
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        <p className="text-lg text-slate-500 leading-relaxed font-light italic">
                            "Un modelo de arrendamiento limita el retorno al IPC inmobiliario. Esta propuesta capitaliza la infraestructura convirtiéndola en participación accionaria de una empresa con potencial de expansión nacional."
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer Confidential */}
            <footer className="py-12 bg-slate-950 border-t border-white/5 text-center px-6">
                <p className="text-[10px] text-white/30 font-bold uppercase tracking-[0.5em] leading-relaxed">
                    CONFIDENCIAL — PROPIEDAD INTELECTUAL DE MEDHAUSE™ <br className="md:hidden" />© 2026 TODOS LOS DERECHOS RESERVADOS
                </p>
            </footer>
        </div>
    );
};
