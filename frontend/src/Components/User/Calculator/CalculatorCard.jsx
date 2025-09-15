import React from "react";
import { useNavigate } from "react-router-dom";

const CalculatorCard = ({ name, description, id, svgSrc }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() =>
        navigate(
          `/financial-calculators/${name.toLowerCase().replace(/\s+/g, "-")}`
        )
      }
      className="relative cursor-pointer p-6 shadow-md border border-gray-200 rounded-2xl bg-white hover:shadow-xl transition group flex flex-col justify-between overflow-hidden">
      {/* Background SVG */}
      <img
        src={svgSrc}
        alt={`${name} icon`}
        className="absolute bottom-4 right-4 w-16 h-16 pointer-events-none 
           transition-all duration-300 
           brightness-5 group-hover:brightness-125 group-hover:scale-105"
      />

      {/* Top Section: Title + Description */}
      <div>
        <h2 className="text-[#FF822E] text-xl font-bold group-hover:text-[#E67322] transition">
          {name}
        </h2>
        <p className="text-sm text-gray-700 mt-2 line-clamp-3">{description}</p>
      </div>

      {/* Bottom Section: Button (Fixed height, fades in) */}
      <div className="mt-6">
        <button
          className="bg-white text-black border-2 border-[#E67322] font-medium py-1 px-4 rounded-lg 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Calculate Now
        </button>
      </div>
    </div>
  );
};

export default CalculatorCard;
