import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const whatsappNumber = "923450394932"; // remove + and spaces for wa.me
  const whatsappMessage =
    "Hi admin, I found your number on pkrspot.com. Can you help me?";

  return (
    <footer className="bg-[#1E3A8A] text-white py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">ExchangerPk</h2>
          <p className="text-white/80">
            The easiest and fastest way to transfer money securely. Connect with
            us and stay updated!
          </p>
          <div className="flex gap-4 mt-2">
            <FaFacebookF className="hover:text-[#0D6EFD] cursor-pointer transition" />
            <FaTwitter className="hover:text-[#0D6EFD] cursor-pointer transition" />
            <FaLinkedinIn className="hover:text-[#0D6EFD] cursor-pointer transition" />
            <FaInstagram className="hover:text-[#0D6EFD] cursor-pointer transition" />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="flex flex-col gap-2">
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
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>

          {/* Email → opens mail app */}
          <a
            href="mailto:rizwanjanbaloch7@gmail.com"
            className="hover:text-[#3B82F6] transition underline"
          >
            Email: rizwanjanbaloch7@gmail.com
          </a>

          {/* WhatsApp → opens WhatsApp chat */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
              whatsappMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#3B82F6] transition underline"
          >
            Phone: +92 345 0394932
          </a>
        </div>
      </div>

      <div className="mt-8 border-t border-white/20 pt-4 text-center text-white/70 text-sm">
        &copy; 2020 ExchangerPk. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
