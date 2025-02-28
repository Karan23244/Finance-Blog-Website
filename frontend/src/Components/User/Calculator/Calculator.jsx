import React from "react";
import CalculatorCard from "./CalculatorCard";
import calculators from "./calculatorConfig";
import { Helmet } from "react-helmet-async";

function Calculator({ setSelectedCalculator }) {
  // Ensure that the setSelectedCalculator function is used correctly
  const currentUrl = window.location.href;

  return (
    <>
      {/* React Helmet for SEO */}
      <Helmet>
        <title>Comprehensive Financial Tools | Trust Financial Advisory</title>
        <meta name="description" content="Access financial calculators for budgeting, investments, retirement, and tax planning. Project future earnings and plan your financial future effectively by Trust Financial Advisory." />
        <meta name="keywords" content="" />
        <meta property="og:title" content="Comprehensive Financial Tools | Trust Financial Advisory" />
        <meta property="og:description" content="Access financial calculators for budgeting, investments, retirement, and tax planning. Project future earnings and plan your financial future effectively by Trust Financial Advisory." />
        <meta property="og:type" content="Calculator Page" />
        <meta property="og:url" content={currentUrl} />
        <link rel="canonical" href={currentUrl} />
      </Helmet>
      <div className="mx-[10%] my-[20%] lg:my-[7%]">
        <h1 className="lg:text-3xl text-xl font-bold mb-6">
          Finance Calculators
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calculator) => (
            <CalculatorCard
              key={calculator.id}
              name={calculator.name}
              description={calculator.description}
              id={calculator.id}
              onClick={() => setSelectedCalculator(calculator)} // Set the selected calculator
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Calculator;
