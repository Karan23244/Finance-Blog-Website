import React, { useState } from 'react';
import Calculator from '../Components/User/Calculator/Calculator';
import CalculatorPage from '../Components/User/Calculator/CalculatorPage';
import Footer from "../Common/Footer";
import Subscribe from "../Common/Subscribe";

function CalculatorHome() {
  // Define the state and setter for the selected calculator
  const [selectedCalculator, setSelectedCalculator] = useState(null);

  return (
    <>
    <div className="min-h-screen">
      {/* Pass the setSelectedCalculator function as a prop */}
      {!selectedCalculator ? (
        <Calculator setSelectedCalculator={setSelectedCalculator} />
      ) : (
        <CalculatorPage
          calculator={selectedCalculator}
          goBack={() => setSelectedCalculator(null)}
        />
      )}
    </div>
    <Subscribe />
    <Footer/>
    </>
  );
}

export default CalculatorHome;
