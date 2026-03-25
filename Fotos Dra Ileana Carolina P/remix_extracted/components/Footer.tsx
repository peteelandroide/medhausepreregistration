import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#484E57] text-[#E2E2D8] py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="mb-6">
          <h3 className="font-domine text-2xl font-bold uppercase tracking-wider">
            Dr. Rafael Donado
          </h3>
          <p className="font-montserrat text-sm tracking-widest text-[#C3C6C8]">
            Cirujano Plástico Estético y Reconstructivo
          </p>
        </div>
        <p className="font-montserrat text-sm text-[#C3C6C8]">
          &copy; {currentYear} Dr. Rafael Donado. Todos los derechos reservados.
        </p>
        <p className="font-montserrat text-xs text-gray-500 mt-4">
          Barranquilla, Colombia.
        </p>
      </div>
    </footer>
  );
};

export default Footer;