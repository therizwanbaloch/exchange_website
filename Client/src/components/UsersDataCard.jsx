import React from "react";

const UserDataCard = ({ icon, title, usersData }) => {
  return (
    <div className="bg-[#F0F8FF]/90 backdrop-blur-md border border-white/30 shadow-md p-6 sm:p-8 rounded-xl text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center w-60 h-60 sm:w-64 sm:h-64">
      <div className="mb-3 flex justify-center items-center text-4xl sm:text-5xl">
        {icon}
      </div>
      <h3 className="text-gray-700 text-sm sm:text-base font-medium leading-snug max-w-xs mx-auto">
        {title}
      </h3>
      <p className="text-xl sm:text-2xl font-semibold text-[#1E3A8A] mt-2">
        {usersData}
      </p>
    </div>
  );
};

export default UserDataCard;
