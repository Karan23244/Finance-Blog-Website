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
      setEmail(""); // Clear input field
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
      setStatus("error");
    }
  };

  return (
    // <div className="bg-[#FFBA8C8F] text-black py-2 min-h-[150px] flex items-center justify-center overflow-hidden">
    //   <div className="flex flex-col lg:flex-row justify-between items-center lg:gap-16 gap-4 lg:px-0 px-6">
    //     {/* Left section */}
    //     <div className="lg:w-1/2 flex justify-center">
    //       {/* <img
    //         src="/subscribe.webp"
    //         alt="subscribe"
    //         width="200"
    //         height="200"
    //         className="w-[200px] h-[200px] object-cover"
    //         loading="lazy"
    //         decoding="async"
    //       /> */}
    //       <div>
    //         <div>
    //           <h2 className="lg:text-xl text-sm font-semibold leading-relaxed pb-2 ">
    //             Your Path to Smarter Financial Choices Starts Here
    //           </h2>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Right section */}
    //     <div className="lg:w-1/2 w-full">
    //       <div>
    //         <form
    //           onSubmit={handleSubmit}
    //           className="flex flex-col lg:flex-row lg:gap-8 gap-2">
    //           <input
    //             type="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             placeholder="Enter your email"
    //             className="flex-grow w-full px-4 py-2 text-[#FF822E] rounded-md border focus:ring-1 focus:ring-orange-400"
    //             required
    //           />
    //           <button
    //             type="submit"
    //             className="bg-orange-400 text-white font-semibold px-10 py-2 rounded-md hover:bg-[#FF822E] transition duration-300">
    //             Subscribe
    //           </button>
    //         </form>

    //         {/* Message with fixed height to prevent layout shifts */}
    //         <div className="h-6 flex items-center justify-center">
    //           {message && (
    //             <p
    //               className={`text-sm ${
    //                 status === "success" ? "text-green-500" : "text-red-500"
    //               }`}>
    //               {message}
    //             </p>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
      <div className="bg-[#FFBA8C8F] text-black py-10 min-h-[300px]">
        <div className="max-w-full px-4 flex flex-col lg:flex-row justify-between items-center lg:gap-16 gap-4">
          {/* Left section */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold leading-relaxed">
              Expert advice, actionable strategies, and personalized financial
              insights to help you make informed money decisions.
            </h2>
          </div>

          {/* Right section */}
          <div className="lg:w-1/2 w-full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row lg:items-end lg:justify-end lg:gap-8 gap-2">
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
            <div className="min-h-[40px]">
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
    </>
  );
};

export default Subscribe;
