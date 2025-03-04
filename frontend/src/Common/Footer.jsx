import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Refresh the page if the user is already on the home page
      window.location.reload();
    } else {
      // Navigate to the home page
      navigate("/");
    }
  };
  return (
    <>
      <footer class="text-white bg-black border-t border-gray-700 min-h-[100px]">
        <div className="w-full max-w-screen-xl mx-auto p-3">
          <div className="flex lg:flex-row flex-col gap-4 justify-between">
            {/* Logo Section */}
            <div className="flex flex-col items-center">
              <div
                className="flex items-center space-x-3 mb-4 cursor-pointer"
                onClick={handleLogoClick}>
                <img
                  src="/logo.webp"
                  alt="Logo"
                  width={120}
                  height={120}
                />
              </div>
              <h2 className="lg:text-xl text-base font-bold text-center">
                Trust <span className="text-[#FF822E]">Finance</span> Advisory
              </h2>
            </div>

            <div className="lg:w-9/12 flex flex-col">
              <div className="flex flex-col lg:flex-row items-center justify-between rounded-lg shadow-lg">
                {/* Text Section */}
                <div className="lg:w-4/5 text-center lg:text-left">
                  <h2 className="lg:text-lg text-xs text-white font-semibold leading-relaxed">
                    Start building your financial future with expert guidance,
                    personalized strategies, and smart decisions that set you on
                    the path to lasting wealth and security.
                  </h2>
                </div>

                {/* Social Media Icons Section */}
                <div className="flex gap-8 mt-4 lg:mt-0">
                  <ul className="flex space-x-4">
                    <li>
                      <Link
                        to={`https://www.facebook.com/trustfinancialadvisory`}>
                        <FaFacebook className="text-white text-2xl hover:text-blue-500 transition-all duration-300 cursor-pointer" />
                      </Link>
                    </li>
                    <li>
                      <Link to={`https://x.com/trustfinancial9`}>
                        <RiTwitterXFill className="text-white text-2xl hover:text-blue-500 transition-all duration-300 cursor-pointer" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`https://www.instagram.com/trustfinancialadvisory/`}>
                        <FaInstagram className="text-white text-2xl hover:text-blue-500 transition-all duration-300 cursor-pointer" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <hr className="my-2 border-gray-500" />
              <div className="text-center">
                <ul className="grid lg:grid-cols-4 grid-cols-2 gap-2 items-center text-sm font-medium justify-between lg:divide-x-2">
                  <li>
                    <Link
                      to="/privacy_policy"
                      className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms_and_condition"
                      className="hover:underline lg:text-lg text-sm text-white  mx-4 py-2 lg:font-semibold">
                      Terms & Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/disclaimer"
                      className="hover:underline lg:text-lg text-sm text-white  mx-4 py-2 lg:font-semibold">
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about_us"
                      className="hover:underline lg:text-lg text-sm text-white  mx-4 py-2 lg:font-semibold">
                      About Us
                    </Link>
                  </li>
                </ul>
              </div>
              <hr className="my-2 border-gray-500" />
              <div className="lg:text-lg text-xs text-white text-center">
                <h2>
                  @ClickOrbitsPteLtd, 10 ANSON ROAD, #33-10, INTERNATIONAL
                  PLAZA, SINGAPORE (079903)
                </h2>
              </div>
            </div>
            {/* Footer as Section */}
          </div>
        </div>
        {/* Divider Line */}
        <hr className="my-1 border-gray-700 lg:my-2" />

        {/* Footer Bottom Section */}
        <div className="text-center">
          <span className="block text-sm text-white py-2">
            © 2025{" "}
            <a to="/" className="hover:underline text-white">
              Trust Finance Advisory
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
}

export default Footer;
