import React from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import Card from "./Card";

const FeaturesSection = () => {
  return (
    <section className="bg-white py-20 px-6 sm:px-10 md:px-20 flex flex-col items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 w-full max-w-7xl">
        <Card
          icon={<BsBagCheckFill className="text-6xl text-[#0D6EFD]" />}
          title="Easy to Use"
          description="We’ve got everything in place to make your payments and life super easy."
        />

        <Card
          icon={<MdVerifiedUser className="text-6xl text-[#0D6EFD]" />}
          title="Pay Debts"
          description="We know you love to rest and chill, so we made it easy for you to pay all your debts."
        />

        <Card
          icon={<BiCoinStack className="text-6xl text-[#0D6EFD]" />}
          title="Transfer Money"
          description="Transfer money anywhere and to anyone internationally, with low fees."
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
