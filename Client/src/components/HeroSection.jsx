import React from 'react'
import { SlWallet } from "react-icons/sl";
import { BiCoinStack } from "react-icons/bi";

const HeroSection = () => {
  return (
    <section id='home'>
    <div className="bg-gradient-to-b from-[#1E3A8A] to-[#0D6EFD] px-6 sm:px-10 py-16 flex flex-col items-center justify-center gap-8 font-bricolage text-white text-center">

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug sm:leading-tight">
        Settle up Fast & Easily <br className="hidden sm:block" />
        Transfer Money To <br className="hidden sm:block" />
        Other Users
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-[#E0F2FE]/90 max-w-3xl leading-relaxed px-2">
        It’s easy to get paid back, send money straight globally. <br className="hidden sm:block" />
        Manage your money anytime, anywhere take control of your <br className="hidden sm:block" />
        finances effortlessly and securely. Get faster access to payments, <br className="hidden sm:block" />
        pay contactless in-store, and more.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-8 mt-4 w-full sm:w-auto">
        <button className="px-8 py-3 rounded-lg flex items-center justify-center gap-3 text-base sm:text-lg md:text-xl font-semibold text-white bg-[#0D6EFD] hover:bg-[#3B82F6] transition-all transform hover:scale-105 shadow-md hover:shadow-lg w-full sm:w-auto">
          <span className="bg-white/10 p-2 rounded-full">
            <SlWallet className="text-white text-lg sm:text-xl" />
          </span>
          Send Money
        </button>

        <button className="px-8 py-3 rounded-lg flex items-center justify-center gap-3 text-base sm:text-lg md:text-xl font-semibold text-white bg-[#0D6EFD] hover:bg-[#3B82F6] transition-all transform hover:scale-105 shadow-md hover:shadow-lg w-full sm:w-auto">
          <span className="bg-white/10 p-2 rounded-full">
            <BiCoinStack className="text-white text-lg sm:text-xl" />
          </span>
          Receive Money
        </button>
      </div>
    </div>
    </section>
  )
}

export default HeroSection
