import React from "react";
import FeaturesSection from "../components/FeaturesSection";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import HowWeWork from "../components/HowWeWork";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <HowWeWork />
      <FeaturesSection/>
    </div>
  );
};

export default LandingPage;
