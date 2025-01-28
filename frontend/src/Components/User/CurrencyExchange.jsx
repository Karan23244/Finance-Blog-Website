import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaExchangeAlt } from "react-icons/fa";

const CurrencyConverterAndChart = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("INR");
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    // Fetch the list of currencies
    axios
      .get("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => {
        const currencyList = Object.keys(response.data.rates);
        setCurrencies(currencyList);
      })
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);

  useEffect(() => {
    if (amount) {
      axios
        .get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`)
        .then((response) => {
          const rate = response.data.rates[targetCurrency];
          setConvertedAmount((amount * rate).toFixed(2));
        })
        .catch((error) => console.error("Error converting currency:", error));
    }
  }, [amount, baseCurrency, targetCurrency]);

  const iframeSrc = `https://wise.com/gb/currency-converter/fx-widget/chart?sourceCurrency=${baseCurrency}&targetCurrency=${targetCurrency}`;

  const getFlag = (currencyCode) => {
    return `https://flagcdn.com/w40/${currencyCode
      .slice(0, 2)
      .toLowerCase()}.png`;
  };
  return (
    <div id="currency" className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
        {/* Currency Converter Section */}
        <div className="w-full  flex flex-col justify-between">
          <h1 className="text-[#FF822E] text-3xl font-semibold pb-4">
            Currency Convertor
          </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
            minim. Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod
            tempor minim.
          </p>
          <div className="p-8 pt-12 rounded-lg shadow-lg w-full mb-8">
            <div className="flex flex-col gap-8 lg:gap-6">
              <div className="flex gap-6">
                <div className="w-full">
                  <label className="block text-sm font-semibold mb-2">
                    Amount:
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-2">
                    From:
                  </label>
                  <div className="relative flex items-center">
                    <img
                      src={getFlag(baseCurrency)}
                      alt={baseCurrency}
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <select
                      value={baseCurrency}
                      onChange={(e) => setBaseCurrency(e.target.value)}
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black">
                      {currencies.map((currency) => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <FaExchangeAlt className="text-2xl text-gray-500" />

                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-2">
                    To:
                  </label>
                  <div className="relative flex items-center">
                    <img
                      src={getFlag(targetCurrency)}
                      alt={targetCurrency}
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                    <select
                      value={targetCurrency}
                      onChange={(e) => setTargetCurrency(e.target.value)}
                      className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black">
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

            {convertedAmount !== null && (
              <div className="mt-6 text-right text-lg font-semibold">
                <p>
                  {amount} {baseCurrency} = {convertedAmount} {targetCurrency}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Chart Section */}
        <div className="w-full lg:w-1/3 flex flex-col justify-between">
          <iframe
            title="fx-chart"
            src={iframeSrc}
            width="100%"
            height="400px"
            frameBorder="0"
            allowtransparency="false"
            className="rounded-md shadow-lg"></iframe>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterAndChart;
