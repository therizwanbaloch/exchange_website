import React from "react";

const Card = ({ icon, title, description }) => {
  return (
    <div className="bg-[#F0F8FF] backdrop-blur-md border border-white/30 shadow-xl p-8 sm:p-10 rounded-2xl text-center hover:scale-105 transition-transform duration-300 flex flex-col items-center justify-center min-h-[300px]">
      <div className="mb-5 flex justify-center items-center text-5xl sm:text-6xl">
        {icon}
      </div>
      <h3 className="text-xl sm:text-2xl font-semibold text-[#1E3A8A] mb-3">{title}</h3>
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
};

export default Card;
