import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import PricingTable from './components/PricingTable';
import SpecialOffer from './components/SpecialOffer';
import Footer from './components/Footer';
import LeadFormModal from './components/LeadFormModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="bg-[#E2E2D8] text-[#484E57] min-h-screen">
      <Header />
      <main>
        <Hero onCTAClick={handleOpenModal} />
        <PricingTable />
        <SpecialOffer onCTAClick={handleOpenModal} />
      </main>
      <Footer />
      <LeadFormModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default App;
