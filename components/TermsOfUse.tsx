import React from 'react';
import { ArrowLeft, FileText, AlertTriangle, CreditCard, UserX, Scale, Clock, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { Footer } from './Footer';

interface TermsOfUseProps {
    onBack: () => void;
}

export const TermsOfUse: React.FC<TermsOfUseProps> = ({ onBack }) => {
    return (
        <div className="font-sans text-slate-900 antialiased bg-slate-50 min-h-screen flex flex-col">
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100 h-20 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
                    <button onClick={onBack} className="flex items-center gap-2 text-mh-blue font-bold text-xs uppercase tracking-widest hover:text-mh-gold transition-colors">
                        <ArrowLeft size={16} /> Volver
                    </button>
                    <Logo variant="dark" size="sm" />
                    <div className="w-20"></div>
                </div>
            </nav>

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="w-16 h-16 bg-mh-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <FileText className="text-mh-gold" size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-4">Términos y Condiciones</h1>
                        <p className="text-slate-500">Última actualización: Febrero 2025</p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 space-y-10">
                        {/* Aceptación */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <Scale className="text-mh-blue" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">1. Aceptación de los Términos</h2>
                            </div>
                            <div className="pl-13 space-y-3 text-slate-600 leading-relaxed">
                                <p>Al acceder y utilizar el sitio web y servicios de <strong>MedHause S.A.S.</strong> ("MedHause", "nosotros", "nuestro"), usted acepta estar legalmente vinculado por estos Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, le solicitamos abstenerse de usar nuestros servicios.</p>
                                <p>Estos términos constituyen un acuerdo legal vinculante entre usted y MedHause.</p>
                            </div>
                        </section>

                        {/* Descripción del Servicio */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <Globe className="text-mh-blue" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">2. Descripción del Servicio</h2>
                            </div>
                            <div className="pl-13 space-y-3 text-slate-600 leading-relaxed">
                                <p>MedHause es una plataforma de espacios médicos premium que ofrece:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Alquiler de Consultorios:</strong> Espacios equipados para consulta médica por horas, disponibles bajo modalidad de membresía o pago por uso.</li>
                                    <li><strong>Membresía:</strong> Programa que otorga tarifas preferenciales, horas incluidas y beneficios adicionales por un pago único de entrada.</li>
                                    <li><strong>Servicios Complementarios:</strong> Asesoría de marketing, convenios con quirófanos, parqueadero y otros beneficios.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Requisitos de Uso */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Requisitos de Uso</h2>
                            <div className="text-slate-600 leading-relaxed space-y-3">
                                <p>Para utilizar nuestros servicios, usted debe:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Ser mayor de 18 años y tener capacidad legal para celebrar contratos.</li>
                                    <li>Ser profesional de la salud debidamente registrado ante las autoridades competentes colombianas.</li>
                                    <li>Proporcionar información veraz, completa y actualizada.</li>
                                    <li>Mantener la confidencialidad de sus credenciales de acceso.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Reservas y Pagos */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <CreditCard className="text-mh-blue" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">4. Reservas, Pagos y Cancelaciones</h2>
                            </div>
                            <div className="pl-13 space-y-4 text-slate-600 leading-relaxed">
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">4.1 Reservas</h3>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Las reservas están sujetas a disponibilidad.</li>
                                        <li>Los miembros pueden reservar con hasta 1 mes de anticipación.</li>
                                        <li>Los visitantes reservan bajo disponibilidad estándar.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">4.2 Pagos</h3>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Los paquetes de horas deben pagarse por anticipado.</li>
                                        <li>La membresía requiere un ticket único de entrada de $2.000.000 COP.</li>
                                        <li>Aceptamos transferencias bancarias y pagos electrónicos.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">4.3 Cancelaciones</h3>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Cancelaciones con más de 24 horas: sin penalidad.</li>
                                        <li>Cancelaciones con menos de 24 horas: se descuenta la hora reservada.</li>
                                        <li>No presentarse (no-show): se descuenta la hora reservada.</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 mb-2">4.4 Validez de Horas</h3>
                                    <ul className="list-disc list-inside space-y-1 ml-4">
                                        <li>Visitantes: Las horas adquiridas tienen validez de 1 mes.</li>
                                        <li>Miembros: Las horas de membresía tienen validez de 3 meses.</li>
                                        <li>Las horas no utilizadas dentro del período de validez no son reembolsables ni transferibles.</li>
                                    </ul>
                                </div>
                            </div>
                        </section>

                        {/* Obligaciones del Usuario */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <UserX className="text-mh-blue" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">5. Obligaciones del Usuario</h2>
                            </div>
                            <div className="pl-13 space-y-3 text-slate-600 leading-relaxed">
                                <p>Al utilizar nuestros servicios, usted se compromete a:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Usar los consultorios exclusivamente para actividades médicas lícitas.</li>
                                    <li>Respetar los horarios de reserva y desalojar el espacio puntualmente.</li>
                                    <li>Mantener los espacios en condiciones de limpieza y orden.</li>
                                    <li>No realizar procedimientos quirúrgicos en consultorios no habilitados para tal fin.</li>
                                    <li>Cumplir con todas las normativas sanitarias y de bioseguridad aplicables.</li>
                                    <li>No subarrendar ni ceder el uso del espacio a terceros.</li>
                                    <li>Responder por cualquier daño causado a las instalaciones o equipos.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Propiedad Intelectual */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Propiedad Intelectual</h2>
                            <div className="text-slate-600 leading-relaxed space-y-3">
                                <p>Todo el contenido del sitio web de MedHause, incluyendo pero no limitado a textos, gráficos, logotipos, imágenes, videos, software y diseño, es propiedad exclusiva de MedHause S.A.S. o de sus licenciantes y está protegido por las leyes de propiedad intelectual.</p>
                                <p>Queda prohibida la reproducción, distribución, modificación o uso comercial de cualquier contenido sin autorización previa y por escrito.</p>
                            </div>
                        </section>

                        {/* Limitación de Responsabilidad */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                                    <AlertTriangle className="text-orange-600" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">7. Limitación de Responsabilidad</h2>
                            </div>
                            <div className="pl-13 space-y-3 text-slate-600 leading-relaxed">
                                <p>MedHause:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>No es responsable por el ejercicio profesional de los usuarios que utilizan los consultorios.</li>
                                    <li>No garantiza la disponibilidad ininterrumpida del sitio web o servicios.</li>
                                    <li>No responde por daños indirectos, incidentales o consecuentes derivados del uso de nuestros servicios.</li>
                                    <li>Se reserva el derecho de suspender o terminar el acceso a usuarios que incumplan estos términos.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Modificaciones */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <Clock className="text-mh-blue" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">8. Modificaciones</h2>
                            </div>
                            <div className="pl-13 space-y-3 text-slate-600 leading-relaxed">
                                <p>MedHause se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Los cambios serán publicados en esta página y entrarán en vigencia inmediatamente después de su publicación.</p>
                                <p>El uso continuado de nuestros servicios después de cualquier modificación constituye su aceptación de los nuevos términos.</p>
                            </div>
                        </section>

                        {/* Ley Aplicable */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Ley Aplicable y Jurisdicción</h2>
                            <div className="text-slate-600 leading-relaxed space-y-3">
                                <p>Estos Términos y Condiciones se rigen por las leyes de la República de Colombia. Cualquier controversia derivada de estos términos será sometida a la jurisdicción de los tribunales de la ciudad de Medellín, Colombia.</p>
                            </div>
                        </section>

                        {/* Contacto */}
                        <section className="bg-mh-gold/5 rounded-2xl p-6 border border-mh-gold/10">
                            <h2 className="text-xl font-bold text-slate-900 mb-3">Contacto</h2>
                            <p className="text-slate-600 text-sm mb-4">Para consultas sobre estos términos, contáctenos:</p>
                            <div className="flex flex-wrap gap-4">
                                <a href="mailto:hola@medhause.co" className="inline-flex items-center gap-2 bg-mh-blue text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-mh-gold transition-colors">
                                    hola@medhause.co
                                </a>
                                <a href="https://wa.me/573206055134" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-700 transition-colors">
                                    WhatsApp
                                </a>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
