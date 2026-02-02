import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-slate-100 py-20">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start gap-12">
                <div className="text-center md:text-left max-w-xs">
                    <Logo variant="dark" size="sm" />
                    <p className="text-xs text-slate-400 mt-6 font-medium leading-relaxed">
                        Medical Workspaces on-demand diseñados para potenciar la marca personal del especialista moderno.
                    </p>
                    <p className="text-[10px] text-slate-300 mt-4 uppercase tracking-widest">© 2025 MedHause™</p>
                </div>

                <div className="flex flex-col md:flex-row gap-16 w-full md:w-auto">
                    <div>
                        <p className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Contacto</p>
                        <p className="text-sm text-slate-600 mb-2">+57 320 605 5134</p>
                        <p className="text-sm text-slate-600">hola@medhause.co</p>
                    </div>

                    <div>
                        <p className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Siguenos</p>
                        <div className="flex gap-4">
                            <a
                                href="https://wa.me/573206055134"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-mh-blue hover:border-mh-blue transition-all"
                                aria-label="WhatsApp"
                            >
                                <MessageCircle size={20} />
                            </a>
                            <a
                                href="https://www.instagram.com/medhause_studio/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 hover:text-mh-blue hover:border-mh-blue transition-all"
                                aria-label="Instagram"
                            >
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <p className="font-bold text-slate-900 mb-4 uppercase text-xs tracking-widest">Legal</p>
                        <a href="?view=privacy" className="block text-sm text-slate-500 hover:text-mh-blue mb-2 transition-colors">Política de Datos</a>
                        <a href="?view=terms" className="block text-sm text-slate-500 hover:text-mh-blue transition-colors">Términos de Uso</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
