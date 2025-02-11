import React, { useState } from "react";
import axios from "axios";

const Subscribe = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // success or error

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/subscribe`,
        { email }
      );
      setMessage(response.data.message);
      setStatus("success");
      setEmail(""); // Clear the input field
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#FFBA8C8F] text-black py-2">
      <div className="max-w-full flex flex-col lg:flex-row justify-between items-center lg:gap-16 gap-4">
        {/* Left section */}
        <div className="lg:w-1/2 flex justify-center">
          <img src="/subscribe.png" alt="subscribe" height={200} width={200} />
        </div>

        {/* Right section */}
        <div className="lg:w-1/2 flex flex-col gap-4 w-full px-6">
          <div className="">
            <h2 className="text-xl font-semibold leading-relaxed pb-2">
              Your Path to Smarter Financial Choices Starts Here
            </h2>
            <p className="lg:text-lg text-sm text-justify">
              Start building your financial future with expert guidance,
              personalized strategies, and smart decisions that set you on the
              path to lasting wealth and security
            </p>
          </div>
          <div className="">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row lg:gap-8 gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-grow w-full px-4 py-2 text-[#FF822E] rounded-md border focus:ring-1 focus:ring-orange-400"
                required
              />
              <button
                type="submit"
                className="bg-orange-400 text-white font-semibold px-10 py-2 rounded-md hover:bg-[#FF822E] transition duration-300">
                Subscribe
              </button>
            </form>
            {message && (
              <p
                className={`mt-4 text-center text-sm ${
                  status === "success" ? "text-green-500" : "text-red-500"
                }`}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
