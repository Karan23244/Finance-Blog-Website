import React, { useState, useEffect } from "react";
import { calculateResult } from "./calculatorLogic";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import "../../Admin/New_Post/styles.css";
import { useLocation } from "react-router-dom";
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const CalculatorPage = ({ calculator, goBack }) => {
  const { pathname } = useLocation();
  const defaultInputs = calculator.inputs.reduce((acc, input) => {
    acc[input.key] = input.default || 0;
    return acc;
  }, {});

  const [inputs, setInputs] = useState(defaultInputs);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  const calculateAndUpdate = (currentInputs) => {
    const res = calculateResult(calculator.id, currentInputs);
    const investedAmount =
      calculator.id === "sip"
        ? currentInputs.investment * currentInputs.time * 12
        : currentInputs.investment;
    const returnAmount = res - investedAmount;

    const data = {
      labels: ["Invested Amount", "Return Amount"],
      datasets: [
        {
          data: [investedAmount, returnAmount],
          backgroundColor: ["#FF6F1F", "#8C8C8C"],
          hoverBackgroundColor: ["#FF6F1F", "#8C8C8C"],
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    };

    setResult(res);
    setChartData(data);
  };

  useEffect(() => {
    calculateAndUpdate(inputs);
  }, [inputs]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const handleInputChange = (key, value) => {
    const inputConfig = calculator.inputs.find((input) => input.key === key);
    const maxValue = inputConfig?.max || 100;
    value = Math.max(0, Math.min(maxValue, value));
    setInputs((prev) => ({ ...prev, [key]: value }));
  };
  console.log(calculator.form);
  return (
    <>
      <div className="mx-auto max-w-screen-xl py-10 px-2">
        <button
          onClick={goBack}
          className="mb-6 px-4 py-2 bg-[#FF822E] text-white rounded-lg hover:shadow-md transition-all">
          Back
        </button>
        <div className="border-l-4 border-[#FF822E] px-5">
          <h2 className="lg:text-2xl text-lg font-semibold mb-2 text-gray-800">
            {calculator.name}
          </h2>
          <p className="text-gray-600 mb-6 text-sm lg:text-base">
            {calculator.description}
          </p>
        </div>

        <div className="p-6 my-12 bg-[#E8E8E8] rounded-lg shadow-lg flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 w-full">
            <div className="grid gap-6 mb-4">
              {calculator.inputs.map((input) => (
                <div key={input.key} className="flex flex-col">
                  <div className="flex flex-row justify-between sm:gap-2 items-center">
                    <label className="lg:text-md text-sm font-medium mb-1">
                      {input.label}
                    </label>
                    <input
                      type="number"
                      value={inputs[input.key]}
                      onChange={(e) =>
                        handleInputChange(input.key, Number(e.target.value))
                      }
                      className="mb-2 lg:w-42 p-2 border border-[#FF822E] rounded-md shadow-sm focus:outline-none focus:ring-0"
                      placeholder="Enter value"
                    />
                  </div>
                  <div>
                    <input
                      type="range"
                      min={0}
                      max={input.max}
                      value={inputs[input.key]}
                      onChange={(e) =>
                        handleInputChange(input.key, Number(e.target.value))
                      }
                      className="w-full cursor-pointer appearance-[#FF822E] h-1 border-none rounded-lg focus:outline-none focus:ring-0 accent-[#FF822E]"
                    />
                  </div>
                </div>
              ))}
            </div>

            {result !== null && (
              <div className="flex lg:flex-row flex-col justify-between lg:items-center mt-6 py-2 px-8 bg-[#FFBA8C] rounded-lg">
                <div>
                  <h4 className="text-xl font-semibold text-black">
                    Calculation Result
                  </h4>
                </div>
                <div>
                  <p className="text-xl text-white">
                    {calculator.output}: ₹{result.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
          {calculator.showGraph && chartData && (
            <div className="flex-1 w-full max-w-sm bg-white border p-4 rounded-xl">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Breakdown
              </h4>
              <div className="h-64">
                <Doughnut
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          font: { size: 12 },
                          color: "#4B5563",
                        },
                      },
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) => {
                            const value = tooltipItem.raw;
                            const total = tooltipItem.dataset.data.reduce(
                              (a, b) => a + b,
                              0
                            );
                            const percentage = ((value / total) * 100).toFixed(
                              2
                            );
                            return `${
                              tooltipItem.label
                            }: ₹${value.toLocaleString()} (${percentage}%)`;
                          },
                        },
                      },
                      title: {
                        display: true,
                        text: "Invested Amount vs Return Amount",
                        font: { size: 14 },
                        color: "#1F2937",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
        </div>
        <div id="#form">{calculator.form && <calculator.form />}</div>
        <div>
          <div
            className="custom-html my-8"
            dangerouslySetInnerHTML={{ __html: calculator.html }}
          />
        </div>
      </div>
    </>
  );
};

export default CalculatorPage;
