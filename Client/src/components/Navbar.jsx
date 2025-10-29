import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#1E3A8A] text-white px-8 py-3 flex items-center justify-between shadow-md font-bricolage">
      <h1 className="font-bold text-2xl tracking-wide">ExchangerPk</h1>

      <ul className="flex gap-8 text-lg font-medium">
        <li className="cursor-pointer hover:text-[#3B82F6] transition">Home</li>
        <li className="cursor-pointer hover:text-[#3B82F6] transition">Features</li>
        <li className="cursor-pointer hover:text-[#3B82F6] transition">How We Work</li>
        <li className="cursor-pointer hover:text-[#3B82F6] transition">Contacts</li>
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
