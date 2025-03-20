import React, { useState, useEffect } from "react";
import axios from "axios";

const SubscribePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/subscribe`,
        { email }
      );
      setMessage(response.data.message);
      setStatus("success");
      setEmail("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      setStatus("error");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
      setTimeout(() => setIsVisible(true), 10);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Handle body scroll lock
  useEffect(() => {
    if (showPopup) {
      document.body.classList.add("overflow-hidden"); // Disable scroll
    } else {
      document.body.classList.remove("overflow-hidden"); // Enable scroll
    }

    // Cleanup on component unmount
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showPopup]);
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setShowPopup(false), 300);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300 ${
        showPopup
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}>
      <div
        className={`bg-white rounded-lg shadow-lg p-6 max-w-sm sm:max-w-md lg:max-w-3xl w-full transition-transform duration-300 transform flex flex-col lg:flex-row justify-center items-center mx-auto gap-6 px-4 sm:px-8 ${
          isVisible ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}>
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-4 text-3xl text-gray-700 hover:text-gray-900 focus:outline-none">
          &times;
        </button>

        {/* Logo Image */}
        <div className="flex-shrink-0">
          <img
            src="/logo.webp"
            alt="Logo"
            width="300"
            height="230"
            class="w-[120px] h-auto aspect-[300/230]"
            fetchpriority="high"
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-4 sm:gap-8 items-start text-left">
          <h2 className="text-lg lg:text-xl pt-3 font-semibold min-h-0">
            Your Path to Smarter Financial Choices Starts Here
          </h2>

          <p className="text-gray-600 lg:text-lg text-base min-h-0">
            Start building your financial future with expert guidance,
            personalized strategies, and smart decisions that set you on the
            path to lasting wealth and security.
          </p>

          {/* Subscription Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-white bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF822E]"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#E65100] text-white font-semibold px-6 py-2 rounded-md transition-all duration-300">
              Subscribe
            </button>
          </form>

          {/* Success/Error Message */}
          {/* {message && (
            <p
              className={`mt-4 text-center ${
                status === "success" ? "text-green-500" : "text-red-500"
              }`}>
              {message}
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default SubscribePopup;
