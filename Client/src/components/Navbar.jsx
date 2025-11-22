import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#1E3A8A] text-white px-8 py-3 flex items-center justify-between font-bricolage">
      <h1 className="font-bold text-2xl tracking-wide">PKRSPOT.com</h1>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-8 text-lg font-medium">
        <li className="cursor-pointer hover:text-[#3B82F6] transition">
          <a href="#home">Home</a>
        </li>
        <li className="cursor-pointer hover:text-[#3B82F6] transition">
          <a href="#features">Features</a>
        </li>
        <li className="cursor-pointer hover:text-[#3B82F6] transition">
          <a href="#how-we-work">How We Work</a>
        </li>
        <li className="cursor-pointer hover:text-[#3B82F6] transition">
          <a href="#contact">Contact</a>
        </li>
      </ul>

      {/* Desktop Auth Buttons */}
      <div className="hidden md:flex gap-4">
        <Link
          to="/login"
          className="px-8 py-2 rounded-md border border-white hover:bg-white hover:text-[#1E3A8A] transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-8 py-2 rounded-md bg-[#0D6EFD] hover:bg-[#3B82F6] transition"
        >
          Register
        </Link>
      </div>

      {/* Hamburger Button */}
      <button
        className="md:hidden text-3xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#1E3A8A] px-8 py-6 flex flex-col gap-6 text-lg font-medium md:hidden shadow-lg">
          <a
            href="#home"
            className="hover:text-[#3B82F6] transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </a>
          <a
            href="#features"
            className="hover:text-[#3B82F6] transition"
            onClick={() => setIsOpen(false)}
          >
            Features
          </a>
          <a
            href="#how-we-work"
            className="hover:text-[#3B82F6] transition"
            onClick={() => setIsOpen(false)}
          >
            How We Work
          </a>
          <a
            href="#contact"
            className="hover:text-[#3B82F6] transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </a>

          <Link
            to="/login"
            className="px-8 py-2 rounded-md border border-white hover:bg-white hover:text-[#1E3A8A] transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-8 py-2 rounded-md bg-[#0D6EFD] hover:bg-[#3B82F6] transition"
            onClick={() => setIsOpen(false)}
          >
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
