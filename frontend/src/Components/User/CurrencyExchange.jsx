import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";

const CurrencyConverterAndChart = () => {
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Fetch currency rates once
  useEffect(() => {
    axios.get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        setCurrencies(Object.keys(response.data.rates));
        setExchangeRates(response.data.rates);
      })
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  // Convert currency using cached exchange rates
  useEffect(() => {
    if (amount && exchangeRates[targetCurrency]) {
      setConvertedAmount((amount * exchangeRates[targetCurrency]).toFixed(2));
    }
  }, [amount, baseCurrency, targetCurrency, exchangeRates]);

  // Lazy load chart
  useEffect(() => {
    const timer = setTimeout(() => setIsIframeLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Get flag URL
  const getFlag = (currencyCode) => `https://flagcdn.com/w40/${currencyCode.slice(0, 2).toLowerCase()}.png`;

  // Convert currencies array to react-select format
  const currencyOptions = currencies.map((currency) => ({
    value: currency,
    label: currency,
  }));

  // Currency Dropdown with Virtualized List
  const CurrencyDropdown = ({ value, onChange }) => (
    <Select
      options={currencyOptions}
      value={{ value, label: value }}
      onChange={(selected) => onChange(selected.value)}
      className="w-full"
    />
  );

  return (
    <div id="currency" className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        
        {/* Currency Converter Section */}
        <div className="w-full">
          <h2 className="text-[#FF822E] text-3xl font-semibold pb-4">Currency Converter</h2>
          <p>
            Simplify your currency exchange process with instant rate updates and accurate conversions.
          </p>

          <div className="p-8 pt-12 rounded-lg shadow-lg w-full">
            <div className="flex flex-col gap-6 lg:gap-6">
              
              {/* Amount Input */}
              <div>
                <label className="block text-sm font-semibold mb-2">Amount:</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF822E]"
                />
              </div>

              {/* Currency Selection */}
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                
                {/* Base Currency */}
                <div className="lg:w-1/2 w-full">
                  <label className="block text-sm font-semibold mb-2">From:</label>
                  <div className="relative flex items-center">
                    <img src={getFlag(baseCurrency)} alt={baseCurrency} className="w-8 h-8 mr-2 rounded-full" />
                    <CurrencyDropdown value={baseCurrency} onChange={setBaseCurrency} />
                  </div>
                </div>

                {/* Swap Icon */}
                <div>
                  <img src="/swap.webp" alt="swap" height={40} width={40} />
                </div>

                {/* Target Currency */}
                <div className="lg:w-1/2 w-full">
                  <label className="block text-sm font-semibold mb-2">To:</label>
                  <div className="relative flex items-center">
                    <img src={getFlag(targetCurrency)} alt={targetCurrency} className="w-8 h-8 mr-2 rounded-full" />
                    <CurrencyDropdown value={targetCurrency} onChange={setTargetCurrency} />
                  </div>
                </div>

              </div>
            </div>

            {/* Converted Amount */}
            {convertedAmount !== null && (
              <div className="mt-6 text-right text-lg font-semibold">
                <p>{amount} {baseCurrency} = {convertedAmount} {targetCurrency}</p>
              </div>
            )}
          </div>
        </div>

        {/* Currency Chart Section (Lazy Loaded) */}
        <div className="w-full lg:w-2/5">
          {isIframeLoaded ? (
            <iframe
              title="fx-chart"
              src={`https://wise.com/gb/currency-converter/fx-widget/chart?sourceCurrency=${baseCurrency}&targetCurrency=${targetCurrency}`}
              width="100%"
              className="lg:h-[400px] h-[600px]"
            />
          ) : (
            <p className="text-center">Loading Chart...</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default CurrencyConverterAndChart;
