'use client';

import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
import { useState } from 'react';
import UnsubscribeModal from './UnsubscribeModal';

const AppBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const scrollToTop = () => scroll.scrollToTop();

  return (
    <header className="bg-black sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center cursor-pointer" onClick={scrollToTop}>
          <img src="/logo.png" alt="App Logo" className="h-8 w-8 mr-2" />
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r to-yellow-500 from-white">bullsEye</span>
        </div>
        <nav className="space-x-6">
          <ScrollLink
            to="home"
            smooth={true}
            duration={500}
            className="text-gray-300 hover:text-yellow-500 cursor-pointer"
            activeClass="text-yellow-500"
          >
            Home
          </ScrollLink>
          <ScrollLink
            to="why-btst"
            smooth={true}
            duration={500}
            className="text-gray-300 hover:text-yellow-500 cursor-pointer"
            activeClass="text-yellow-500"
          >
            Why BTST?
          </ScrollLink>
          <ScrollLink
            to="about"
            smooth={true}
            duration={500}
            className="text-gray-300 hover:text-yellow-500 cursor-pointer"
            activeClass="text-yellow-500"
          >
            About This Project
          </ScrollLink>
          <ScrollLink
            to="technology"
            smooth={true}
            duration={500}
            className="text-gray-300 hover:text-yellow-500 cursor-pointer"
            activeClass="text-yellow-500"
          >
            Technology
          </ScrollLink>
          <button
            onClick={openModal}
            className="text-gray-300 hover:text-yellow-500 border border-yellow-500 rounded-full px-3 py-1"
          >
            Unsubscribe
          </button>
        </nav>
      </div>
      {isModalOpen && <UnsubscribeModal closeModal={closeModal} />}
    </header>
  );
};

export default AppBar;
