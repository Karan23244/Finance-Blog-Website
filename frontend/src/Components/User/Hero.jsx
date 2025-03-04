import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
const Hero = memo(() => {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/background.webp";
    img.onload = () => setBackgroundLoaded(true);
  }, []);

  return (
    <>
      <div
        className={`bg-cover flex items-center w-full h-[520px] transition-opacity duration-500 ${
          backgroundLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url('/background.webp')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          willChange: "opacity, transform",
        }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-6 w-full">
          {/* Text Content */}
          <div className="text-white w-full lg:ml-[10%] lg:w-[50%] text-center lg:px-10 lg:text-left">
            <h2 className="text-xl lg:text-2xl font-bold leading-tight">
              Guiding you through every stage of life with strategic financial
              planning and investment solutions
            </h2>
            <p className="text-sm lg:text-base leading-relaxed">
              Trust Financial Advisory is here to guide you through the
              complexities of financial planning. We provide customized
              solutions focused on building wealth, protecting assets, and
              planning for the future. With personalized advice and strategic
              planning, we help you navigate your financial journey with
              confidence.
            </p>
          </div>

          {/* Icons Section */}
          <div className="flex flex-row lg:flex-col items-center gap-6 lg:items-start">
            <div className="bg-black bg-opacity-80 p-3 rounded-xl shadow-md">
              <a href="#Currency">
                <img
                  src="/currency.svg"
                  alt="Currency"
                  width={33}
                  height={33}
                  loading="lazy"
                  className="transition-transform duration-300 transform hover:scale-110"
                />
              </a>
            </div>
            <div className="bg-black bg-opacity-80 p-3 rounded-xl shadow-md">
              <Link to="/calculator">
                <img
                  src="/calculator.svg"
                  alt="Calculator"
                  width={33}
                  height={33}
                  loading="lazy"
                  className="transition-transform duration-300 transform hover:scale-110"
                />
              </Link>
            </div>
            <div className="bg-black bg-opacity-80 p-3 rounded-xl shadow-md">
              <a href="#Market">
                <img
                  src="/market.svg"
                  alt="Market"
                  width={33}
                  height={33}
                  loading="lazy"
                  className="transition-transform duration-300 transform hover:scale-110"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Hero;
