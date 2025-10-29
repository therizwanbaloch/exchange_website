import React from "react";

const HowWeWork = () => {
  return (
    <section id="how-we-work">
    <div className="flex flex-col md:flex-row justify-between mt-10 px-6 md:px-10 py-10 text-[#1E3A8A]">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-0">
        How We <br /> Work?
      </h1>

      <div className="flex flex-col md:flex-row gap-6 md:gap-10 text-gray-700">
        <p className="text-base leading-relaxed">
          Experience ease through innovative, simple & <br />
          seamless payments. Any payment you want to <br />
          make  few seconds is all it takes.
        </p>
        <p className="text-base leading-relaxed">
          You don't just easily pay, you get value right away. <br />
          Wherever you go, we've got you covered.s
        </p>
      </div>
    </div>
    </section>
  );
};

export default HowWeWork;
