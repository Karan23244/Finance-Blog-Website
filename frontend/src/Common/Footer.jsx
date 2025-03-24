// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { FaFacebook, FaInstagram } from "react-icons/fa";
// import { RiTwitterXFill } from "react-icons/ri";

// function Footer() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleLogoClick = (e) => {
//     e.preventDefault();
//     if (location.pathname === "/") {
//       window.location.reload();
//     } else {
//       navigate("/");
//     }
//   };

//   return (
//     <div className="text-white bg-black min-h-[250px]">
//       <div className="w-full max-w-screen-xl mx-auto p-3 min-h-[250px] lg:min-h-[300px]">
//         <div className="flex lg:flex-row flex-col gap-4 justify-between">
//           {/* Logo Section */}
//           <div
//             className="flex flex-col items-center min-h-[150px] lg:min-h-[180px]"
//           >
//             <div
//               className="flex items-center space-x-3 mb-4 cursor-pointer"
//               onClick={handleLogoClick}
//             >
//               <img
//                 src="/logo.webp"
//                 alt="Logo"
//                 width="150"
//                 height="150"
//                 loading="lazy"
//                 className="w-[150px] h-[150px] object-cover aspect-[1/1]"
//               />
//             </div>
//             <h2
//               className="lg:text-2xl text-base font-bold text-center min-h-[50px]"
//             >
//               Trust <span className="text-[#FF822E]">Finance</span> Advisory
//             </h2>
//           </div>

//           {/* Text and Social Section */}
//           <div className="lg:w-9/12 flex flex-col">
//             <div
//               className="flex flex-col lg:flex-row items-center justify-between rounded-lg shadow-lg min-h-[120px]"
//             >
//               {/* Text Section */}
//               <div className="lg:w-4/5 text-center lg:text-left min-h-[60px]">
//                 <h2 className="lg:text-xl text-sm text-white text-center">
//                   Start building your financial future with expert guidance,
//                   personalized strategies, and smart decisions that set you on
//                   the path to lasting wealth and security.
//                 </h2>
//               </div>

//               {/* Social Media Icons Section */}
//               <div className="flex gap-8 mt-4 lg:mt-0 min-h-[40px]">
//                 <ul className="flex space-x-4">
//                   <li>
//                     <Link to={`https://www.facebook.com/trustfinancialadvisory`}>
//                       <FaFacebook className="text-white text-2xl hover:text-orange-500 transition-all duration-300 cursor-pointer" />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link to={`https://x.com/trustfinancial9`}>
//                       <RiTwitterXFill className="text-white text-2xl hover:text-orange-500 transition-all duration-300 cursor-pointer" />
//                     </Link>
//                   </li>
//                   <li>
//                     <Link
//                       to={`https://www.instagram.com/trustfinancialadvisory/`}
//                     >
//                       <FaInstagram className="text-white text-2xl hover:text-orange-500 transition-all duration-300 cursor-pointer" />
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             </div>

//             <hr className="my-2 border-gray-500" />

//             {/* Link Section */}
//             <div className="text-center min-h-[50px]">
//               <ul className="grid lg:grid-cols-4 grid-cols-2 gap-2 items-center text-sm font-medium justify-between lg:divide-x-2">
//                 <li>
//                   <Link
//                     to="/privacy_policy"
//                     className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/terms_and_condition"
//                     className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold"
//                   >
//                     Terms & Conditions
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/disclaimer"
//                     className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold"
//                   >
//                     Disclaimer
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/about_us"
//                     className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold"
//                   >
//                     About Us
//                   </Link>
//                 </li>
//               </ul>
//             </div>

//             <hr className="my-2 border-gray-500" />

//             {/* Address Section */}
//             <div className="lg:text-lg text-xs text-white text-center min-h-[50px]">
//               <h2>
//                 @ClickOrbitsPteLtd, 10 ANSON ROAD, #33-10, INTERNATIONAL PLAZA,
//                 SINGAPORE (079903)
//               </h2>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer Bottom Section */}
//       <div className="text-center min-h-[50px]">
//         <span className="block text-sm text-white py-2">
//           © 2025{" "}
//           <a href="/" className="hover:underline text-white">
//             Trust Finance Advisory
//           </a>
//           . All Rights Reserved.
//         </span>
//       </div>
//     </div>
//   );
// }

// export default Footer;

import React, { useState, useEffect, Suspense } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";

function Footer() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showFooter, setShowFooter] = useState(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.location.reload();
    } else {
      navigate("/");
    }
  };

  // Delay rendering the footer to prevent CLS
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFooter(true);
    }, 2000); // Delay of 2s

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="text-white bg-black flex flex-col min-h-[150px] items-center justify-center">
        {/* Placeholder while loading */}
        {!showFooter ? (
          <div className="w-full max-w-screen-xl mx-auto p-3">
            <div className="animate-pulse w-full min-h-[150px] rounded-lg"></div>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="w-full h-40 bg-gray-800 animate-pulse"></div>
            }>
            <div className="w-full max-w-screen-xl mx-auto p-3">
              <div className="flex lg:flex-row flex-col gap-4 justify-between">
                {/* Logo Section */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex items-center space-x-3 lg:mb-4 mb-2 cursor-pointer"
                    onClick={handleLogoClick}>
                    <img
                      src="/logo.webp"
                      alt="Logo"
                      width="300"
                      height="230"
                      className="w-[120px] h-auto lg:w-[120px] lg:h-auto aspect-[300/230]"
                    />
                  </div>
                  <h2 className="lg:text-xl text-sm font-bold text-center">
                    Trust <span className="text-[#FF822E]">Finance</span>{" "}
                    Advisory
                  </h2>
                </div>

                {/* Text and Social Section */}
                <div className="lg:w-9/12 flex flex-col">
                  <div className="flex flex-col lg:flex-row items-center justify-between rounded-lg shadow-lg">
                    {/* Text Section */}
                    <div className="lg:w-4/5 text-center lg:text-left">
                      <h2 className="lg:text-lg text-sm text-white lg:font-semibold font-medium leading-relaxed">
                        Start building your financial future with expert
                        guidance, personalized strategies, and smart decisions
                        that set you on the path to lasting wealth and security.
                      </h2>
                    </div>

                    {/* Social Media Icons Section */}
                    <div className="flex gap-8 mt-4 lg:mt-0 flex-shrink-0">
                      <ul className="flex space-x-4 flex-shrink-0">
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

                  {/* Link Section */}
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
                          className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold">
                          Terms & Conditions
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/disclaimer"
                          className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold">
                          Disclaimer
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/about_us"
                          className="hover:underline lg:text-lg text-sm text-white mx-4 py-2 lg:font-semibold">
                          About Us
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <hr className="my-2 border-gray-500" />

                  {/* Address Section */}
                  <div className="lg:text-lg text-xs text-white text-center">
                    <h2>
                      @ClickOrbitsPteLtd, 10 ANSON ROAD, #33-10, INTERNATIONAL
                      PLAZA, SINGAPORE (079903)
                    </h2>
                  </div>
                </div>
              </div>

              {/* Footer Bottom Section */}
              <div className="text-center w-full">
                <span className="block text-sm text-white py-2 mb-3">
                  © 2025{" "}
                  <a href="/" className="hover:underline text-white">
                    Trust Finance Advisory
                  </a>
                  . All Rights Reserved.
                </span>
              </div>
            </div>
          </Suspense>
        )}
      </div>
    </>
  );
}

export default Footer;