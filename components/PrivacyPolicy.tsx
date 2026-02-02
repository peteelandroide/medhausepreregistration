import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from './Logo';
import { Footer } from './Footer';

interface PrivacyPolicyProps {
    onBack: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
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
                        <div className="w-16 h-16 bg-mh-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Shield className="text-mh-blue" size={32} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-heading font-black text-slate-900 mb-4">Política de Tratamiento de Datos</h1>
                        <p className="text-slate-500">Última actualización: Febrero 2025</p>
                    </div>

                    <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 space-y-10">
                        {/* Responsable */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <UserCheck className="text-mh-blue" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">1. Responsable del Tratamiento</h2>
                            </div>
                            <div className="pl-13 space-y-3 text-slate-600 leading-relaxed">
                                <p><strong>MedHause S.A.S.</strong> (en adelante "MedHause") es la entidad responsable del tratamiento de los datos personales recopilados a través de este sitio web y sus servicios asociados.</p>
                                <div className="bg-slate-50 rounded-xl p-4 space-y-2 text-sm">
                                    <p className="flex items-center gap-2"><MapPin size={16} className="text-mh-gold" /> Cross Business Center, Carrera 43A #5A-113, Oficina 901, Medellín, Colombia</p>
                                    <p className="flex items-center gap-2"><Mail size={16} className="text-mh-gold" /> hola@medhause.co</p>
                                    <p className="flex items-center gap-2"><Phone size={16} className="text-mh-gold" /> +57 320 605 5134</p>
                                </div>
                            </div>
                        </section>

                        {/* Datos Recopilados */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <Database className="text-mh-blue" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">2. Datos Personales Recopilados</h2>
                            </div>
                            <div className="pl-13 space-y-3 text-slate-600 leading-relaxed">
                                <p>Recopilamos los siguientes tipos de datos personales con su consentimiento previo, expreso e informado:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Datos de Identificación:</strong> Nombre completo, número de documento de identidad, fecha de nacimiento.</li>
                                    <li><strong>Datos de Contacto:</strong> Correo electrónico, número de teléfono, dirección postal.</li>
                                    <li><strong>Datos Profesionales:</strong> Especialidad médica, número de registro médico, institución de formación.</li>
                                    <li><strong>Datos de Uso:</strong> Información sobre el uso de nuestros servicios, historial de reservas, preferencias.</li>
                                    <li><strong>Datos Técnicos:</strong> Dirección IP, tipo de navegador, dispositivo utilizado, cookies.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Finalidades */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <Eye className="text-mh-blue" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">3. Finalidades del Tratamiento</h2>
                            </div>
                            <div className="pl-13 space-y-3 text-slate-600 leading-relaxed">
                                <p>Sus datos personales serán utilizados para las siguientes finalidades:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Gestionar su registro y membresía en la plataforma MedHause.</li>
                                    <li>Procesar reservas de consultorios y servicios asociados.</li>
                                    <li>Enviar comunicaciones comerciales sobre promociones, eventos y novedades (con su autorización).</li>
                                    <li>Mejorar la experiencia del usuario y personalizar nuestros servicios.</li>
                                    <li>Cumplir con obligaciones legales, contables y fiscales.</li>
                                    <li>Prevenir fraudes y garantizar la seguridad de nuestros sistemas.</li>
                                    <li>Realizar análisis estadísticos y estudios de mercado.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Derechos */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <Lock className="text-mh-blue" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">4. Derechos del Titular</h2>
                            </div>
                            <div className="pl-13 space-y-3 text-slate-600 leading-relaxed">
                                <p>De conformidad con la Ley 1581 de 2012 y el Decreto 1377 de 2013, usted tiene derecho a:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li><strong>Acceso:</strong> Conocer los datos personales que tenemos sobre usted.</li>
                                    <li><strong>Actualización:</strong> Solicitar la corrección de datos inexactos o incompletos.</li>
                                    <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos cuando no sean necesarios.</li>
                                    <li><strong>Revocación:</strong> Revocar en cualquier momento la autorización otorgada.</li>
                                    <li><strong>Oposición:</strong> Oponerse al tratamiento de sus datos para ciertas finalidades.</li>
                                </ul>
                                <p className="mt-4">Para ejercer estos derechos, puede contactarnos a través del correo electrónico <strong>hola@medhause.co</strong> indicando en el asunto "Derechos ARCO".</p>
                            </div>
                        </section>

                        {/* Seguridad */}
                        <section>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                                    <Shield className="text-mh-blue" size={20} />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">5. Medidas de Seguridad</h2>
                            </div>
                            <div className="pl-13 space-y-3 text-slate-600 leading-relaxed">
                                <p>MedHause implementa medidas técnicas, administrativas y físicas para proteger sus datos personales contra acceso no autorizado, pérdida, alteración o divulgación, incluyendo:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Cifrado de datos sensibles en tránsito y en reposo.</li>
                                    <li>Acceso restringido solo a personal autorizado.</li>
                                    <li>Monitoreo continuo de nuestros sistemas.</li>
                                    <li>Políticas internas de protección de datos.</li>
                                </ul>
                            </div>
                        </section>

                        {/* Transferencia */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Transferencia de Datos</h2>
                            <div className="text-slate-600 leading-relaxed space-y-3">
                                <p>Sus datos personales podrán ser transferidos a:</p>
                                <ul className="list-disc list-inside space-y-2 ml-4">
                                    <li>Proveedores de servicios tecnológicos (hosting, email, analytics).</li>
                                    <li>Entidades financieras para el procesamiento de pagos.</li>
                                    <li>Autoridades competentes cuando sea requerido por ley.</li>
                                </ul>
                                <p>En todos los casos, garantizamos que los terceros cumplan con estándares adecuados de protección de datos.</p>
                            </div>
                        </section>

                        {/* Vigencia */}
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Vigencia</h2>
                            <div className="text-slate-600 leading-relaxed">
                                <p>Esta política está vigente desde febrero de 2025. MedHause se reserva el derecho de modificarla en cualquier momento, notificando los cambios a través de nuestro sitio web.</p>
                            </div>
                        </section>

                        {/* Contacto */}
                        <section className="bg-mh-blue/5 rounded-2xl p-6 border border-mh-blue/10">
                            <h2 className="text-xl font-bold text-slate-900 mb-3">¿Preguntas?</h2>
                            <p className="text-slate-600 text-sm mb-4">Para cualquier consulta relacionada con el tratamiento de sus datos personales, contáctenos:</p>
                            <a href="mailto:hola@medhause.co" className="inline-flex items-center gap-2 bg-mh-blue text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-mh-gold transition-colors">
                                <Mail size={16} /> hola@medhause.co
                            </a>
                        </section>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};
