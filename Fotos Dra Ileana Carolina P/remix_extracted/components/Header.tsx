import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#484E57] sticky top-0 w-full z-20 shadow-md py-3 px-4 sm:px-8">
      <div className="container mx-auto flex items-center justify-center text-center">
        <div>
          <h1 className="font-domine text-lg md:text-xl font-bold text-white uppercase tracking-wider">
            Dr. Rafael Donado
          </h1>
          <p className="font-montserrat text-xs md:text-sm text-[#C3C6C8] tracking-widest">
            Cirujano Plástico Estético y Reconstructivo
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;