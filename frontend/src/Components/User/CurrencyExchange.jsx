import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverterAndChart = () => {
  const [currencies, setCurrencies] = useState([]);
  const [exchangeRates, setExchangeRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);

  // Fetch currency rates once and store them
  useEffect(() => {
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        setCurrencies(Object.keys(response.data.rates));
        setExchangeRates(response.data.rates); // Store all exchange rates
      })
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  // Convert currency using cached exchange rates
  useEffect(() => {
    if (amount && exchangeRates) {
      const rate = exchangeRates[targetCurrency]; // Use stored rates
      setConvertedAmount((amount * rate).toFixed(2));
    }
  }, [amount, baseCurrency, targetCurrency, exchangeRates]);

  // Lazy load the chart after 1.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsIframeLoaded(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const iframeSrc = `https://wise.com/gb/currency-converter/fx-widget/chart?sourceCurrency=${baseCurrency}&targetCurrency=${targetCurrency}`;

  // Get flag URL
  const getFlag = (currencyCode) => {
    return `https://flagcdn.com/w40/${currencyCode
      .slice(0, 2)
      .toLowerCase()}.png`;
  };

  return (
    <>
      <div id="currency" className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          {/* Currency Converter Section */}
          <div className="w-full flex flex-col justify-between">
            <h2 className="text-[#FF822E] text-3xl font-semibold pb-4">
              Currency Converter
            </h2>
            <p>
              Simplify your currency exchange process with instant rate updates
              and accurate conversions, making global transactions easier,
              smarter, and more efficient.
            </p>
            <div className="p-8 pt-12 rounded-lg shadow-lg w-full mb-8">
              <div className="flex flex-col gap-8 lg:gap-6">
                <div className="flex flex-col lg:flex-row gap-6 items-center">
                  {/* Amount Input */}
                  <div className="w-full">
                    <label className="block text-sm font-semibold mb-2">
                      Amount:
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF822E] text-black"
                    />
                  </div>

                  {/* Base Currency Selector */}
                  <div className="lg:w-1/2 w-full">
                    <label className="block text-sm font-semibold mb-2">
                      From:
                    </label>
                    <div className="relative flex items-center">
                      <img
                        src={getFlag(baseCurrency)}
                        alt={baseCurrency}
                        className="w-8 h-8 mr-2 rounded-full"
                        loading="lazy"
                      />
                      <select
                        value={baseCurrency}
                        onChange={(e) => setBaseCurrency(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF822E] text-black">
                        {currencies.map((currency) => (
                          <option key={currency} value={currency}>
                            {currency}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Swap Icon */}
                  <div>
                    <img
                      src="/swap.webp"
                      alt="swap"
                      height={100}
                      width={100}
                      loading="lazy"
                    />
                  </div>

                  {/* Target Currency Selector */}
                  <div className="lg:w-1/2 w-full">
                    <label className="block text-sm font-semibold mb-2">
                      To:
                    </label>
                    <div className="relative flex items-center">
                      <img
                        src={getFlag(targetCurrency)}
                        alt={targetCurrency}
                        className="w-8 h-8 mr-2 rounded-full"
                        loading="lazy"
                      />
                      <select
                        value={targetCurrency}
                        onChange={(e) => setTargetCurrency(e.target.value)}
                        className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF822E] text-black">
                        {currencies.map((currency) => (
                          <option key={currency} value={currency}>
                            {currency}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Converted Amount */}
              {convertedAmount !== null && (
                <div className="mt-6 text-right text-lg font-semibold">
                  <p>
                    {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Currency Chart Section (Lazy Loaded) */}
          <div className="w-full lg:w-2/5 flex flex-col justify-between">
            {isIframeLoaded ? (
              <iframe
                title="fx-chart"
                src={iframeSrc}
                width="100%"
                frameBorder="0"
                allowtransparency="false"
                className="lg:h-[400px] h-[600px]"
              />
            ) : (
              <p className="text-center">Loading Chart...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CurrencyConverterAndChart;
