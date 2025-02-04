import React from "react";

const CalculatorCard = ({ name, description, onClick }) => {
  return (
    <div className="cursor-pointer p-4 shadow-md border border-gray-500 rounded-xl hover:shadow-lg transition group h-48 flex flex-col">
      {/* Card Heading */}
      <h2 className="text-[#FF822E] text-xl font-bold">{name}</h2>

      {/* Card Description */}
      <p className="text-sm text-black mt-2">{description}</p>

      {/* Hover Button */}
      <div className="lg:hidden group-hover:flex mt-4">
        <button
          onClick={onClick}
          className="bg-[#FF822E] text-white font-semibold py-2 px-6 rounded transition hover:bg-[#E67322] focus:ring-2 focus:ring-[#FF822E] focus:outline-none">
          Calculate Now
        </button>
      </div>
    </div>
  );
};

export default CalculatorCard;
