import React from "react";
import { FaWallet } from "react-icons/fa";

const WalletCard = ({ currency, amount, color }) => {
  const colorMap = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <div
      className={`flex items-center justify-between p-4 rounded-xl text-white bg-gradient-to-r ${colorMap[color] || colorMap.blue} shadow-md hover:scale-[1.02] transition-transform duration-200`}
    >
      <div>
        <h3 className="text-sm font-medium opacity-90">{currency} Balance</h3>
        <p className="text-xl font-semibold">{amount}</p>
      </div>
      <div className="text-3xl opacity-90">
        <FaWallet />
      </div>
    </div>
  );
};

export default WalletCard;
