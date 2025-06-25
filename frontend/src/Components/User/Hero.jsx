import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = memo(() => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const isMobile = window.innerWidth < 768; // No hydration mismatch

  useEffect(() => {
    const img = new Image();
    img.src = isMobile ? "/back_mobile.webp" : "/background.avif";
    img.fetchpriority = "high";
    img.onload = () => setBgLoaded(true);
  }, [isMobile]);

  return (
    <>
      {/* Preload hidden image for faster LCP */}
      <img
        src={isMobile ? "/back_mobile.webp" : "/background.avif"}
        alt="Preloading Hero Background"
        fetchpriority="high"
        decoding="async"
        loading="eager"
        style={{ display: "none" }}
      />

      <div
        className={`bg-cover bg-center bg-no-repeat flex items-center w-full h-[500px] transition-opacity duration-500 ${
          bgLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${isMobile ? "/back_mobile.webp" : "/background.avif"})`,
        }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-6 w-full">
          {/* Text Content */}
          <div className="text-white w-full lg:ml-[10%] lg:w-[50%] text-center lg:px-10 lg:text-left">
            <h2 className="text-lg lg:text-2xl font-bold leading-tight">
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

            {/* Button below content */}
            <div className="flex lg:flex-row flex-col gap-4 justify-center lg:justify-start mt-6">
              <Link to="/fast-financial-help">
                <button className="bg-white text-orange-500 font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300">
                  Fast Financial Help
                </button>
              </Link>
              <Link to="/urgent-financial-needs">
                <button className="bg-white text-orange-500 font-semibold py-2 px-6 rounded-xl shadow-md transition duration-300">
                  Urgent Financial Needs
                </button>
              </Link>
            </div>
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
