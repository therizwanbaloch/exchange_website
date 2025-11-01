import React from 'react';

const DataCard = ({ text, number, bgColor = "bg-gray-200", Icon }) => {
  return (
    <div
      className={`${bgColor} relative p-6 shadow-md hover:shadow-xl transition-all duration-300 w-50 h-30 rounded-md`}
    >
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-black text-3xl font-bold">{number}</h1>
          <p className="text-black text-sm mt-1">{text}</p>
        </div>

        <Icon className="text-5xl text-black opacity-70 hover:opacity-100 hover:scale-110 transition-transform duration-300" />
      </div>

      
      <button
        className="absolute bottom-0 left-0 w-full bg-black/10 hover:bg-black/50 text-white py-1 text-sm font-medium transition-all duration-300 rounded-b-md"
      >
        More Info
      </button>
    </div>
  );
};

export default DataCard;
