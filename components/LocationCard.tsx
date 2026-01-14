import React from 'react';
import { MapPin, Phone, Star, ExternalLink, Navigation } from 'lucide-react';

interface LocationCardProps {
    variant?: 'light' | 'dark';
    compact?: boolean;
}

export const LocationCard: React.FC<LocationCardProps> = ({ variant = 'dark', compact = false }) => {
    const googleMapsUrl = 'https://maps.google.com/?q=CROSS+Business+Center,+Cra.+43A+%231Sur-50,+El+Poblado,+Medellín,+Antioquia';

    const bgColor = variant === 'light' ? 'bg-white' : 'bg-slate-900';
    const textColor = variant === 'light' ? 'text-slate-900' : 'text-white';
    const subtextColor = variant === 'light' ? 'text-slate-500' : 'text-slate-400';
    const borderColor = variant === 'light' ? 'border-slate-200' : 'border-white/10';

    if (compact) {
        return (
            <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${bgColor} ${textColor} border ${borderColor} hover:border-mh-gold hover:text-mh-gold transition-all group`}
            >
                <MapPin size={16} className="text-mh-gold" />
                <span className="text-sm font-medium">Cross Business Center, El Poblado</span>
                <ExternalLink size={14} className="opacity-50 group-hover:opacity-100" />
            </a>
        );
    }

    return (
        <div className={`${bgColor} ${textColor} rounded-[2rem] p-8 border ${borderColor} shadow-xl overflow-hidden relative group`}>
            {/* Decorative accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-mh-gold/10 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h3 className="text-xl font-bold mb-1">CROSS Business Center</h3>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <Star key={i} size={14} className="fill-mh-gold text-mh-gold" />
                                ))}
                                <Star size={14} className="fill-mh-gold/50 text-mh-gold" />
                            </div>
                            <span className={`text-xs ${subtextColor}`}>4.3 · 279 reseñas</span>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-mh-gold/10 flex items-center justify-center text-mh-gold">
                        <MapPin size={24} />
                    </div>
                </div>

                {/* Address */}
                <div className={`${subtextColor} text-sm mb-6 leading-relaxed`}>
                    <p className="font-medium">Cra. 43A #1Sur-50</p>
                    <p>El Poblado, Medellín, Antioquia</p>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 mb-6">
                    <Phone size={16} className="text-mh-gold" />
                    <a href="tel:+573006396298" className={`text-sm ${subtextColor} hover:text-mh-gold transition-colors`}>
                        +57 300 639 6298
                    </a>
                </div>

                {/* Photo Gallery */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="aspect-square rounded-xl overflow-hidden">
                        <img src="/cross1.webp" alt="Cross Business Center" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden">
                        <img src="/cross2.webp" alt="Cross Business Center Interior" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="aspect-square rounded-xl overflow-hidden">
                        <img src="/cross3.webp" alt="Cross Business Center View" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
                    </div>
                </div>

                {/* CTA Button */}
                <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-mh-gold text-mh-blue font-bold text-sm uppercase tracking-widest hover:bg-yellow-400 transition-all group-hover:scale-[1.02] duration-300"
                >
                    <Navigation size={18} />
                    Cómo Llegar
                </a>
            </div>
        </div>
    );
};
