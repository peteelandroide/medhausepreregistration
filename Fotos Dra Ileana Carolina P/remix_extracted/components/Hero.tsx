import React from 'react';

interface HeroProps {
  onCTAClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCTAClick }) => {
  return (
    <section 
      className="relative bg-cover bg-center flex items-center justify-center text-white py-20 sm:py-28" 
      style={{ backgroundImage: "url('https://picsum.photos/1600/900?grayscale&blur=2')" }}
    >
      <div className="absolute inset-0 bg-[#484E57] opacity-70"></div>
      <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
        <h1 className="font-domine text-3xl sm:text-4xl font-bold mb-6">
          ¿Cuánto cuesta una cirugía plástica?
        </h1>
        <div className="font-montserrat text-lg text-gray-200 space-y-4">
          <p>
            Como cirujano plástico, esta es una de las primeras preguntas que escucho, y es completamente natural. Tomar la decisión de realzar tu belleza es un paso importante, y entender la inversión es clave en tu proceso.
          </p>
          <p>
            He creado esta guía de precios para darte una referencia clara y honesta. Pero más allá de los números, mi pasión es esculpir resultados que honren tu anatomía. Mi filosofía "Natural Bodies" no se trata de transformar, sino de revelar la mejor versión de ti con armonía y proporción.
          </p>
        </div>
        
        <div className="mt-10 text-left max-w-2xl mx-auto bg-black bg-opacity-20 p-6 rounded-lg">
          <h2 className="font-domine text-2xl font-bold mb-4 text-center">Un camino claro hacia tu transformación:</h2>
          <ul className="font-montserrat text-lg text-gray-200 space-y-3 list-inside">
            <li className="flex items-start">
              <span className="text-white mr-3 mt-1">✓</span>
              <span><strong className="font-semibold">Guía de Precios Estimados:</strong> Para que puedas planificar tu inversión con confianza.</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-3 mt-1">✓</span>
              <span><strong className="font-semibold">Resultados que Celebran tu Esencia:</strong> La promesa de un enfoque que respeta y realza tu belleza única.</span>
            </li>
            <li className="flex items-start">
              <span className="text-white mr-3 mt-1">✓</span>
              <span><strong className="font-semibold">Valoración Personalizada:</strong> El primer paso para que juntos diseñemos el plan perfecto para ti.</span>
            </li>
          </ul>
        </div>

        <div className="mt-12">
           <h2 className="font-domine text-2xl font-bold mb-4">
            ¿Lista para Descubrir tu Potencial?
          </h2>
          <p className="font-montserrat text-lg text-gray-200 mb-6">
            Permíteme conocer tu caso para ofrecerte una valoración honesta y un presupuesto detallado.
          </p>
          <button
            onClick={onCTAClick}
            className="inline-block bg-white text-[#484E57] font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-300 uppercase tracking-wider"
          >
            Iniciar mi Valoración
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;