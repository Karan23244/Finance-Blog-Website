import React, { useState, useEffect, useMemo, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { calculateResult } from "../Components/User/Calculator/calculatorLogic";
import { Helmet } from "react-helmet-async";
import usePageTracker from "../hooks/usePageTracker";
import { Doughnut } from "react-chartjs-2";
import TrendingNow from "../Components/User/TrendingNow";
import TradingWidget from "../Components/User/TradingWIdget";
import TopStrategies from "../Components/User/TopStrategies";
import RiskManagement from "../Components/User/RiskManagement";
import Hero from "../Components/User/Hero";
import Content from "../Components/User/NewContent";
import CurrencyExchange from "../Components/User/CurrencyExchange";
import MoneyInsights from "../Components/User/MoneyInsights";
import Footer from "../Common/Footer";
import Subscribe from "../Common/Subscribe";
import NewsList from "../Components/User/NewsList";
import { fetchLatestPosts } from "../Apis/Wordpress";

const UserHome = () => {
  // usePageTracker("home");
  const [posts, setPosts] = useState([]);
  const [showMarket, setShowMarket] = useState(false);
  const [showCurrencyExchange, setShowCurrencyExchange] = useState(false);
  const calculators = useMemo(
    () => [
      {
        id: "sip",
        name: "SIP Calculator",
        description:
          "Plan your SIP investments carefully and learn how the power of intelligent compounding can transform modest monthly contributions into a sizable fortune over time.",
        inputs: [
          {
            label: "Monthly Investment (₹)",
            key: "investment",
            type: "number",
            default: 5000,
            max: 1000000,
          },
          {
            label: "Expected Return Rate (%)",
            key: "rate",
            type: "number",
            default: 12,
            max: 30,
          },
          {
            label: "Investment Duration (Years)",
            key: "time",
            type: "number",
            default: 10,
            max: 40,
          },
        ],
        output: "Future Value (₹)",
        showGraph: true,
      },
    ],
    []
  );
  useEffect(() => {
    const chartContainer = document.getElementById("chart-container");
    if (!chartContainer) return;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (entry.isIntersecting) {
          const { Chart, ArcElement, Tooltip, Legend } = await import(
            "chart.js"
          );
          Chart.register(ArcElement, Tooltip, Legend);
          observer.disconnect(); // load only once
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(chartContainer);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts
        const latest = await fetchLatestPosts();

        // Optionally store latest posts somewhere if needed
        setPosts(latest);
      } catch (err) {
        console.error("Error fetching WordPress data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const marketTimer = setTimeout(() => {
      setShowMarket(true);
    }, 5000);

    const currencyTimer = setTimeout(() => {
      setShowCurrencyExchange(true);
    }, 5000);

    return () => {
      clearTimeout(marketTimer);
      clearTimeout(currencyTimer);
    };
  }, []);
  return (
    <>
      {/* React Helmet for SEO */}
      <Helmet>
        <title>
          Finance Newsletter for Smart Investors | Trust financial advisory
        </title>
        <meta
          name="description"
          content="Get exclusive insights from our finance newsletter! Discover global investment solutions, expert analysis, and proven wealth management strategies."
        />
        <meta
          name="keywords"
          content="finance newsletter, global investment solutions, investment solutions, financial accounting advisory services"
        />
        <meta
          property="og:title"
          content="Finance Newsletter for Smart Investors | Trust financial advisory"
        />
        <meta
          property="og:description"
          content="Get exclusive insights from our finance newsletter! Discover global investment solutions, expert analysis, and proven wealth management strategies."
        />
        <meta property="og:type" content="Category Blogs" />
        <meta property="og:url" content="https://trustfinancialadvisory.com" />
        <link rel="canonical" href="https://trustfinancialadvisory.com" />
      </Helmet>
      <Hero />
      <TrendingNow posts={posts} />
      <NewsList/>
      <div className="lg:min-h-[800px] h-[600px]">
        {showMarket && (
          <div
            id="Market"
            className="flex items-center justify-center min-h-[300px]">
            <div className="w-full max-w-7xl mx-auto p-6">
              <h2 className="text-3xl font-bold text-left mb-8 text-[#FF822E]">
                Market Highlights
              </h2>
              <TradingWidget />
            </div>
          </div>
        )}
      </div>
      <MoneyInsights />
      <div id="chart-container" className="flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto p-6">
          <CalculatorSection calculator={calculators[0]} />
          <div className="flex justify-center mt-8">
            <Link to="/calculator">
              <button className="bg-gray-200 text-black text-lg border font-semibold py-3 px-8 rounded-full transition hover:bg-[#E67322] hover:text-white focus:ring-2 focus:ring-[#FF822E] focus:outline-none">
                Calculators
              </button>
            </Link>
          </div>
        </div>
      </div>
      <TopStrategies />
      {showCurrencyExchange && <CurrencyExchange />}
      <RiskManagement />
      {/* <Content /> */}
      <Subscribe />
      <Footer />
    </>
  );
};

const CalculatorSection = memo(({ calculator }) => {
  useEffect(() => {
    const registerChart = async () => {
      const { Chart, ArcElement, Tooltip, Legend } = await import("chart.js");
      Chart.register(ArcElement, Tooltip, Legend);
    };
    registerChart();
  }, []);

  const defaultInputs = useMemo(() => {
    return calculator.inputs.reduce((acc, input) => {
      acc[input.key] = input.default || 0;
      return acc;
    }, {});
  }, [calculator.inputs]);

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

  const handleInputChange = (key, value) => {
    const inputConfig = calculator.inputs.find((input) => input.key === key);
    const maxValue = inputConfig?.max || 100;
    value = Math.max(0, Math.min(maxValue, value));
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 bg-[#E8E8E8] mx-auto max-w-screen-xl rounded-lg shadow-lg flex flex-col lg:flex-row items-center gap-8">
      {/* Left Section */}
      <div className="flex-1 w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {calculator.name}
        </h2>
        <p className="text-gray-600 mb-6">{calculator.description}</p>

        {/* Input Fields */}
        <div className="grid gap-6 mb-4">
          {calculator.inputs.map((input) => (
            <div key={input.key} className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <label className="lg:text-lg text-xs font-medium mb-1">
                  {input.label}
                </label>
                <input
                  type="number"
                  value={inputs[input.key]}
                  onChange={(e) =>
                    handleInputChange(input.key, Number(e.target.value))
                  }
                  className="mb-2 w-42 p-2 border border-[#FF822E] rounded-md shadow-sm focus:outline-none"
                  placeholder="Enter value"
                />
              </div>
              <input
                type="range"
                min={0}
                max={input.max}
                value={inputs[input.key]}
                onChange={(e) =>
                  handleInputChange(input.key, Number(e.target.value))
                }
                className="w-full cursor-pointer h-1 border-none rounded-lg accent-[#FF822E]"
              />
            </div>
          ))}
        </div>

        {/* Calculation Result */}
        {result !== null && (
          <div className="flex lg:flex-row flex-col justify-between lg:items-center mt-6 py-2 px-8 bg-[#FFBA8C] rounded-lg transition-opacity duration-300 opacity-100">
            <h3 className="text-xl font-semibold mb-2 text-black">
              Calculation Result
            </h3>
            <p className="text-xl text-white">
              {calculator.output}: ₹{result.toLocaleString()}
            </p>
          </div>
        )}
      </div>

      {/* Right Section - Chart */}
      {calculator.showGraph && (
        <div className="flex-1 w-full max-w-sm bg-white border p-4 rounded-xl h-[400px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            Breakdown
          </h3>
          <div className="h-64">
            {chartData ? (
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: "bottom",
                      labels: { font: { size: 12 }, color: "#4B5563" },
                    },
                    tooltip: {
                      callbacks: {
                        label: (tooltipItem) => {
                          const value = tooltipItem.raw;
                          const total = tooltipItem.dataset.data.reduce(
                            (a, b) => a + b,
                            0
                          );
                          const percentage = ((value / total) * 100).toFixed(2);
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
            ) : (
              <div className="h-full flex items-center justify-center bg-gray-200 animate-pulse rounded-lg">
                Loading chart...
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
export default UserHome;
