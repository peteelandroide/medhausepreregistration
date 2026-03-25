
import React from 'react';

const Intro: React.FC = () => {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-domine text-3xl sm:text-4xl font-bold text-[#484E57] mb-6">
          Precios Promedio Estimados en Latinoamérica
        </h2>
        <div className="font-montserrat text-lg text-gray-700 space-y-4">
          <p>
            ✅ La siguiente lista de precios es para darte una idea general de los costos promedio aproximados de las cirugías más populares y es producto de las referencias de nuestros pacientes y el conocimiento general que tenemos del mercado.
          </p>
          <p>
            👉🏼 Los costos de los procedimientos de cirugía plástica pueden variar significativamente según la ubicación geográfica, la experiencia del cirujano, el tipo de instalación médica utilizada y otros factores. Además, los precios pueden cambiar con el tiempo.
          </p>
        </div>
        <div className="mt-10">
           <h3 className="font-domine text-2xl font-bold text-[#484E57] mb-4">
            😃 ¿Quieres una cotización detallada?
          </h3>
          <p className="font-montserrat text-lg text-gray-700 mb-6">
            Si deseas enviarnos tus fotos y que evaluemos tu caso específico para tener una cotización detallada de manera rápida o programar una valoración virtual presencial:
          </p>
          <a
            href="#contacto"
            className="inline-block bg-[#484E57] text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-[#3a3f47] transition-colors duration-300 uppercase tracking-wider"
          >
            Haz Click Aquí
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
