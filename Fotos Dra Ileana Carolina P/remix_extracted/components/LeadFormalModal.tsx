import React, { useState, useEffect } from 'react';

interface LeadFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialFormData = {
    fullName: '',
    age: '',
    country: 'Colombia',
    bodyParts: {
        Senos: false,
        Abdomen: false,
        Nariz: false,
        Glúteos: false,
        'Rostro / Cuello': false,
        Párpados: false,
        Otra: false,
    },
    stage: '',
};

const countryOptions = [
    'Colombia', 'Estados Unidos', 'México', 'Panamá', 'Canadá', 'España',
    'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Costa Rica', 'Cuba',
    'Ecuador', 'El Salvador', 'Guatemala', 'Honduras', 'Nicaragua', 'Paraguay',
    'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela', 'Otro'
];
const bodyPartOptions = Object.keys(initialFormData.bodyParts);
const stageOptions = {
    'A': { bold: 'Ya estoy en la fase final', regular: ', comparando cotizaciones de otros doctores para tomar una decisión pronto.' },
    'B': { bold: 'Estoy lista para dar el siguiente paso', regular: ' y quiero una valoración formal con el Dr. Donado, ya sea virtual o presencial.'},
    'C': { bold: 'Me gustaría recibir una opinión profesional del doctor sobre mi caso', regular: ' y una cotización estimada, pero sin el compromiso de una consulta paga por ahora.'}
};


const LeadFormModal: React.FC<LeadFormModalProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setFormData(initialFormData); // Reset form on open
            setErrors({});
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            bodyParts: { ...formData.bodyParts, [name]: checked },
        });
    };
    
    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'El nombre es obligatorio.';
        if (!formData.age) {
            newErrors.age = 'La edad es obligatoria.';
        } else if (Number(formData.age) < 18 || Number(formData.age) > 99) {
            newErrors.age = 'La edad debe estar entre 18 y 99 años.';
        }
        if (Object.values(formData.bodyParts).every(v => !v)) {
            newErrors.bodyParts = 'Selecciona al menos una opción.';
        }
        if (!formData.stage) newErrors.stage = 'Selecciona una opción.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) return;

        const selectedBodyParts = Object.entries(formData.bodyParts)
            .filter(([, isSelected]) => isSelected)
            .map(([part]) => part)
            .join(', ');

        const message = `Hola, soy ${formData.fullName}, tengo ${formData.age} años y escribo desde ${formData.country}. Me interesa mejorar mis ${selectedBodyParts}. Mi situación es la opción ${formData.stage}.`;

        const whatsappNumber = '+573043353352';
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="form-title"
        >
            <div 
                className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                style={{ colorScheme: 'light' }}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 id="form-title" className="font-domine text-2xl font-bold text-[#484E57]">Cuéntanos sobre ti</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl" aria-label="Cerrar formulario">&times;</button>
                </div>
                
                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-6">
                        {/* Section 1 */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">¿Cuál es tu nombre completo?</label>
                            <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Ej: Ana María Pérez" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#484E57] focus:border-[#484E57]" />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">¿Cuántos años tienes?</label>
                                <input type="number" name="age" id="age" value={formData.age} onChange={handleInputChange} min="18" max="99" required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#484E57] focus:border-[#484E57]" />
                                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                            </div>
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">¿Desde qué país nos escribes?</label>
                                <select name="country" id="country" value={formData.country} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#484E57] focus:border-[#484E57]">
                                    {countryOptions.map(country => <option key={country} value={country}>{country}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <fieldset>
                                <legend className="block text-sm font-medium text-gray-700 mb-2">¿Qué parte(s) de tu cuerpo te gustaría mejorar?</legend>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {bodyPartOptions.map(part => {
                                        const sanitizedId = part.replace(/[\s/]/g, '-');
                                        return (
                                            <div key={part} className="flex items-center">
                                                <input type="checkbox" name={part} id={sanitizedId} checked={formData.bodyParts[part as keyof typeof formData.bodyParts]} onChange={handleCheckboxChange} className="h-4 w-4 text-[#484E57] border-gray-300 rounded focus:ring-[#484E57]" />
                                                <label htmlFor={sanitizedId} className="ml-2 text-sm text-gray-600">{part}</label>
                                            </div>
                                        )
                                    })}
                                </div>
                                {errors.bodyParts && <p className="text-red-500 text-xs mt-1">{errors.bodyParts}</p>}
                            </fieldset>
                        </div>

                        {/* Section 2 */}
                        <div className="border-t pt-6">
                           <fieldset>
                                <legend className="font-domine text-xl font-bold text-[#484E57] mb-3">¿En qué punto te encuentras?</legend>
                                <p className="text-sm text-gray-600 mb-4">Para poder darte la ayuda más precisa, por favor, selecciona la opción que mejor te describa:</p>
                                <div className="space-y-3">
                                    {Object.entries(stageOptions).map(([key, {bold, regular}]) => (
                                        <div key={key} className="flex items-start p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition">
                                            <input type="radio" name="stage" id={`stage-${key}`} value={key} checked={formData.stage === key} onChange={handleInputChange} required className="mt-1 h-4 w-4 text-[#484E57] border-gray-300 focus:ring-[#484E57]" />
                                            <label htmlFor={`stage-${key}`} className="ml-3 text-sm text-gray-700">
                                                <span className="font-bold">{key}) {bold}</span>{regular}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                {errors.stage && <p className="text-red-500 text-xs mt-1">{errors.stage}</p>}
                            </fieldset>
                        </div>
                    </div>

                    {/* Section 3 */}
                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-500 mb-4">Al hacer clic en 'Iniciar Conversación', aceptas que el equipo del Dr. Rafael Donado te contacte al número proporcionado para dar seguimiento a tu solicitud.</p>
                        <button type="submit" className="w-full sm:w-auto inline-block bg-[#25D366] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#128C7E] transition-colors duration-300 uppercase tracking-wider">
                            Iniciar Conversación en WhatsApp
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LeadFormModal;