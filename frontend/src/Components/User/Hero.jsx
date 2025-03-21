import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hero = memo(() => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const img = new Image();
    img.src = isMobile ? "/background_mobile.webp" : "/background.webp";
    img.onload = () => setBgLoaded(true);

    // Listen for window resize to handle dynamic background switching
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);
  return (
    <>
      <div
        className={`bg-cover bg-center bg-no-repeat flex items-center w-full lg:h-[500px] h-[350px] transition-opacity duration-500 ${
          bgLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${
            isMobile ? "/background_plain.webp" : "/background.webp"
          })`,
        }}>
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
