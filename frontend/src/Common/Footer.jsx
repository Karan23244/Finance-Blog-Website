import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
    <footer className="text-white bg-black border-t border-gray-700">
      <div className="w-full max-w-screen-xl mx-auto p-3">
        <div className="flex lg:flex-row flex-col gap-4 justify-between">
          {/* Logo Section */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-3 mb-4 cursor-pointer" onClick={handleLogoClick}>
              <img
                src="/logo.png"
                alt="Logo"
                width={120}
                height={120}
                loading="lazy"
              />
            </div>
            <h1 className="lg:text-xl text-base font-bold text-center">
            Trust <span className="text-[#FF822E]">Finance</span> Advisory
            </h1>
          </div>

          <div className="lg:w-9/12 flex flex-col">
            <div>
              <h1 className="lg:text-lg text-sm text-white text-center">
              Start building your financial future with expert guidance, personalized strategies, and smart decisions that set you on the path to lasting wealth and security
                 
              </h1>
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
              <h1>
                @ClickOrbitsPteLtd, 10 ANSON ROAD, #33-10, INTERNATIONAL PLAZA,
                SINGAPORE (079903)
              </h1>
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
          © 2024{" "}
          <a to="/" className="hover:underline text-white">
            Trust Finance Advisory
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;
