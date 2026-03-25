import React from 'react';

interface SpecialOfferProps {
  onCTAClick: () => void;
}

const SpecialOffer: React.FC<SpecialOfferProps> = ({ onCTAClick }) => {
  return (
    <section id="contacto" className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-domine text-3xl sm:text-4xl font-bold text-[#484E57] mb-6">
          Tu Transformación Comienza con una Conversación Honesta
        </h2>
        <div className="font-montserrat text-lg text-gray-700 space-y-4 mb-8">
            <p>
                Como tu cirujano, mi principal prioridad es tu bienestar y lograr un resultado que te haga feliz. Los precios que has visto en la tabla son una guía honesta y un estándar del sector para que puedas planificar.
            </p>
            <p>
                Sin embargo, el costo final de tu procedimiento es personalizado. Este se define después de que conversemos y yo entienda a fondo tus metas, pues puede variar según la clínica que elijamos juntos y la complejidad específica de tu caso. La cotización final siempre incluirá todo lo necesario para tu tranquilidad y seguridad: mis honorarios, costos de la clínica, anestesia y el acompañamiento postoperatorio que mereces.
            </p>
            <p className="font-semibold pt-4">
                ¿Te gustaría recibir una asesoría gratuita para obtener una cotización precisa y sin ningún compromiso?
            </p>
        </div>
        <button
          onClick={onCTAClick}
          className="inline-block bg-[#484E57] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#3a3f47] transition-colors duration-300 uppercase tracking-wider"
        >
          Iniciar Asesoría Gratuita
        </button>
      </div>
    </section>
  );
};

export default SpecialOffer;
