import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-[#1E3A8A] text-white px-8 py-3 flex items-center justify-between shadow-md font-bricolage">
      <h1 className="font-bold text-2xl tracking-wide">ExchangerPk</h1>

      <ul className="flex gap-8 text-lg font-medium">
        <li className="cursor-pointer hover:text-[#3B82F6] transition"><a href="#home">Home</a></li>
        <li className="cursor-pointer hover:text-[#3B82F6] transition"><a href="#features">Features</a></li>
        <li className="cursor-pointer hover:text-[#3B82F6] transition"><a href="#how-we-work">How We Work</a></li>
        <li className="cursor-pointer hover:text-[#3B82F6] transition"><a href="#contact">Contact</a></li>
      </ul>

      <div className="flex gap-4">
        <button className="px-8 py-2 rounded-md border border-white hover:bg-white hover:text-[#1E3A8A] transition">
          Login
        </button>
        <button className="px-8 py-2 rounded-md bg-[#0D6EFD] hover:bg-[#3B82F6] transition">
          Register
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
