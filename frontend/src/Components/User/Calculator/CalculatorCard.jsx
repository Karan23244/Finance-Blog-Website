import React from "react";
import { useNavigate } from "react-router-dom";

const CalculatorCard = ({ name, description, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() =>
        navigate(
          `/financial-calculators/${name.toLowerCase().replace(/\s+/g, "-")}`
        )
      }
      className="cursor-pointer p-4 shadow-md border border-gray-500 rounded-xl hover:shadow-lg transition group lg:h-48 flex flex-col">
      {/* Card Heading */}
      <h2 className="text-[#FF822E] lg:text-xl text-lg font-bold">{name}</h2>

      <p className="lg:text-sm text-xs text-black mt-2 line-clamp-3">
        {description}
      </p>

      {/* Hover Button */}
      <div className="lg:hidden group-hover:flex mt-4">
        <button className="bg-[#FF822E] text-white lg:font-semibold lg:py-2 lg:px-6 py-1 px-4 font-medium rounded transition hover:bg-[#E67322] focus:ring-2 focus:ring-[#FF822E] focus:outline-none">
          Calculate Now
        </button>
      </div>
    </div>
  );
};

export default CalculatorCard;
