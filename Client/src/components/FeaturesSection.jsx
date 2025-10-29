import React from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { BiCoinStack } from "react-icons/bi";
import { FaUsers } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { TbTransactionDollar } from "react-icons/tb";
import Card from "./Card";
import UserDataCard from "./UsersDataCard";

const FeaturesSection = () => {
  return (
    <section id="features" className="bg-white py-20 px-6 sm:px-10 md:px-20 flex flex-col items-center">
      {/* Feature Cards */}
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

      {/* User Data Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-12 w-full max-w-7xl">
        <UserDataCard 
          icon={<FaUsers className="text-6xl text-[#0D6EFD]" />}
          title="Members"
          usersData="200+"
        />
        <UserDataCard 
          icon={<GiWallet className="text-6xl text-[#0D6EFD]" />}
          title="Transactions"
          usersData="1650+"
        />
        <UserDataCard 
          icon={<FaMoneyBillTransfer className="text-6xl text-[#0D6EFD]" />}
          title="Money Raised"
          usersData="$4500+"
        />
        <UserDataCard 
          icon={<TbTransactionDollar  className="text-6xl text-[#0D6EFD]" />}
          title="Total Transactions"
          usersData="$19250+"
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
