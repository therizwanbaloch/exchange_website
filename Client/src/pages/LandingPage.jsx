import React from "react";
import FeaturesSection from "../components/FeaturesSection";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowWeWork from "../components/HowWeWork";
import SponserArea from "../components/SponserArea";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <HowWeWork />
      <FeaturesSection/>
      <SponserArea/>
      <Contact/>
      <Footer/>
    </div>
  );
};

export default LandingPage;
