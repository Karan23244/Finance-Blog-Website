import React from "react";
import CalculatorCard from "./CalculatorCard";
import { calculators } from "./calculatorConfig";

function Calculator({ setSelectedCalculator }) {
  // Ensure that the setSelectedCalculator function is used correctly
  return (
    <div className="mx-[10%] my-[2%]">
      <h1 className="text-3xl font-bold mb-6">Finance Calculators</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculators.map((calculator) => (
          <CalculatorCard
            key={calculator.id}
            name={calculator.name}
            description={calculator.description}
            onClick={() => setSelectedCalculator(calculator)} // Set the selected calculator
          />
        ))}
      </div>
    </div>
  );
}

export default Calculator;
