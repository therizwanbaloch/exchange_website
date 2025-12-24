import React from 'react';
import bg from "../assets/SponserImage.jpg";
import sslLogo from '../assets/sslLogo.png';
import mcafee from '../assets/mcafee.png';
import norton from '../assets/norton.png';
import perfectMoney from '../assets/perfectMoney.png';
import payer from '../assets/payer.png';
import skrill from '../assets/skrill.png';
import pionner from '../assets/pionner.png';
import paypal from '../assets/paypal.png';

const SponserDiv = () => {
  const sponsors = [
    sslLogo,
    mcafee,
    norton,
    perfectMoney,
    payer,
    skrill,
    pionner,
    paypal,
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      
      {/* Background Image */}
      <div
        style={{ backgroundImage: `url(${bg})` }}
        className="absolute inset-0 w-full h-full bg-cover bg-center"
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 w-full h-full bg-white/80"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center">
        
        <h2 className="text-[#1E3A8A] text-2xl sm:text-3xl font-bold mb-12 tracking-widest text-center">
          Thanks to our Sponsors
        </h2>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-6 w-full">
          {sponsors.map((logo, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-md border border-white/30 shadow-lg
                         rounded-xl flex items-center justify-center p-4
                         hover:scale-105 transition-transform duration-300"
            >
              <img
                src={logo}
                alt={`Sponsor ${index + 1}`}
                className="max-h-10 sm:max-h-12 object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default SponserDiv;
