import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";
import TradingWIdget from "./TradingWIdget";
import CurrencyExchange from "./CurrencyExchange";
import { Link } from "react-router-dom";
import { calculateResult } from "./Calculator/calculatorLogic";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const userHome = () => {
  const [posts, setPosts] = useState([]);
  const [groupedData, setGroupedData] = useState({
    "Personal Finance": [],
    "Investment and Wealth Growth": [],
    "Risk Management": [],
  });
  const calculators = [
    {
      id: "sip",
      name: "SIP Calculator",
      description:
        "Plan your SIP investments carefully and learn how the power of intelligent compounding can transform modest monthly contributions into a sizable fortune over time.",
      inputs: [
        {
          label: "Monthly Investment (₹)",
          key: "investment",
          type: "number",
          default: 5000,
          max: 1000000,
        },
        {
          label: "Expected Return Rate (%)",
          key: "rate",
          type: "number",
          default: 12,
          max: 30,
        },
        {
          label: "Investment Duration (Years)",
          key: "time",
          type: "number",
          default: 10,
          max: 40,
        },
      ],
      output: "Future Value (₹)",
      showGraph: true,
    },
  ];
  const [imagePreloaded, setImagePreloaded] = useState(false);
  console.log(posts);
  //preload Image
  const preloadLCPImage = (url) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = url;
    document.head.appendChild(link);
  };
  useEffect(() => {
    if (posts.length === 0) {
      // Prevent fetching if posts already exist
      const fetchPosts = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/posts`
          );
          const responseData = await response.json();
          console.log("API Response:", responseData);
          const filteredPosts = responseData.data.filter(
            (post) => post.blog_type === "published"
          );
          setPosts(filteredPosts);
          console.log(response);
          // Classify posts by category_type
          const categorized = filteredPosts.reduce(
            (acc, post) => {
              const categoryType =
                post.categories[0]?.category_type || "Uncategorized";
              if (!acc[categoryType]) acc[categoryType] = [];
              acc[categoryType].push(post);
              return acc;
            },
            {
              "Personal Finance": [],
              "Investment and Wealth Growth": [],
              "Risk Management": [],
            }
          );

          setGroupedData(categorized);
        } catch (error) {
          setError(error.message);
        } finally {
        }
      };

      fetchPosts();
    }
  }, [posts]); // Adding posts and topReads as dependencies

  useEffect(() => {
    if (posts && posts[0]?.featured_image && !imagePreloaded) {
      const imageUrl = `${import.meta.env.VITE_API_URL}/${
        posts[0]?.featured_image
      }`;
      preloadLCPImage(imageUrl);
      setImagePreloaded(true); // Mark the image as preloaded
    }
  }, [posts, imagePreloaded]);
  console.log(groupedData);
  return (
    <>
      <Hero />
      <TrendingNow posts={posts} />
      <div id="Market" className="flex items-center justify-center">
        {/* Default width updated to max-w-7xl */}
        <div className="w-full max-w-7xl mx-auto p-6">
          <h1 className="text-3xl font-bold text-left mb-8 text-[#FF822E]">
            Market Highlights
          </h1>
          {/* Default search symbol can be passed as a prop */}
          <TradingWIdget />
        </div>
      </div>
      <MoneyInsights data={groupedData["Personal Finance"]} />

      <div className="flex items-center justify-center">
        {/* Default width updated to max-w-7xl */}
        <div className="w-full max-w-7xl mx-auto p-6">
          {/* Default search symbol can be passed as a prop */}
          <CalculatorSection calculator={calculators[0]} />
          <div className="flex justify-center mt-8">
            <Link to="/calculator">
              <button className="bg-gray-200 text-black text-lg border font-semibold py-3 px-8 rounded-full transition hover:bg-[#E67322] hover:text-white focus:ring-2 focus:ring-[#FF822E] focus:outline-none">
                Calculators
              </button>
            </Link>
          </div>
        </div>
      </div>
      <TopStrategies data={groupedData["Investment and Wealth Growth"]} />
      <CurrencyExchange />
      <RiskManagement data={groupedData["Risk Management"]} />
    </>
  );
};

const Hero = () => {
  return (
    <div
      className="bg-cover flex items-center h-[520px]"
      style={{
        backgroundImage: `url('/background.jpg')`,
      }}>
      {/* Content */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-6 w-full">
        {/* Left Section: Text */}
        <div className="text-white w-full lg:ml-[10%] lg:w-[50%] text-center lg:px-10 lg:text-left">
          <h1 className="text-xl lg:text-2xl font-bold leading-tight">
            Guiding you through every stage of life with strategic financial
            planning and investment solutions
          </h1>
          <p className="text-sm lg:text-base leading-relaxed">
            Trust Financial Advisory is here to guide you through the
            complexities of financial planning. We provide customized solutions
            focused on building wealth, protecting assets, and planning for the
            future. With personalized advice and strategic planning, we help you
            navigate your financial journey with confidence.
          </p>
        </div>

        {/* Right Section: Icons */}
        <div className="flex flex-row lg:flex-col items-center gap-6 lg:items-start">
          <div className="bg-black bg-opacity-80 p-3 rounded-xl shadow-md">
            <a href="#currency">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 33 33"
                className="transition-transform duration-300 transform hover:scale-110 fill-white hover:fill-[#FF822E]">
                <path d="M32.71,9c-.27.77-.58,1.53-.8,2.32-.31,1.07-.8,1.33-1.86.92-.71-.28-1.45-.5-2.18-.75a1,1,0,1,1,.6-1.8l.51.17c-.06-.13-.1-.21-.14-.28A14.86,14.86,0,0,0,20.71,3a1,1,0,0,1-.77-1,.92.92,0,0,1,.83-.85,1.67,1.67,0,0,1,.62.09,16.26,16.26,0,0,1,7.48,5.15c.65.79,1.22,1.66,1.85,2.51l.11-.34a1,1,0,0,1,.89-.73.94.94,0,0,1,.94.63l.05.06Z" />
                <path d="M2.27,11.8a9.54,9.54,0,1,1,9.52,9.55A9.56,9.56,0,0,1,2.27,11.8ZM12.8,7.05l0-.09c-.06-.69-.4-1-1-1A1,1,0,0,0,10.85,7c0,.09-.11.24-.21.29a2.86,2.86,0,0,0,1.11,5.47,1,1,0,1,1,0,1.91H10a1,1,0,1,0,0,1.9h.86c0,.06,0,.08,0,.1,0,.67.41,1.06,1,1a1,1,0,0,0,.91-1.07c0-.21.11-.27.26-.34a2.85,2.85,0,0,0-1.13-5.44,1,1,0,0,1-1-1,.94.94,0,0,1,1-.94c.6,0,1.2,0,1.8,0a.95.95,0,1,0,0-1.89Z" />
                <path d="M22.47,16.08c.19-.7.41-1.37.55-2.06s.18-1.39.27-2.09A9.48,9.48,0,0,1,30.73,21a9.53,9.53,0,0,1-18.83,2.3c.71-.09,1.42-.14,2.12-.27s1.36-.36,2.07-.55c.06.19.13.41.21.62A5.25,5.25,0,0,0,25,24.74a1.41,1.41,0,0,0,.32-.54.9.9,0,0,0-.46-1,.92.92,0,0,0-1.16.2A3.5,3.5,0,0,1,22,24.44a3.34,3.34,0,0,1-3.89-2.05,2.06,2.06,0,0,1-.07-.25h3.56a1,1,0,1,0,0-1.9,16.89,16.89,0,0,1-2-.08,5.21,5.21,0,0,0,.59-.56,18.7,18.7,0,0,0,1.17-1.49.42.42,0,0,1,.52-.2A3.43,3.43,0,0,1,23.69,19a1,1,0,0,0,.89.37.9.9,0,0,0,.75-.61.91.91,0,0,0-.19-1,5.19,5.19,0,0,0-2.37-1.56l-.27-.09Z" />
                <path d="M2.3,24.11a4.94,4.94,0,0,1-.19.52.92.92,0,0,1-1.19.55A.93.93,0,0,1,.33,24c.3-.92.6-1.84.92-2.76a1,1,0,0,1,1.23-.59q1.34.43,2.67.9a.93.93,0,0,1,.64,1.22,1,1,0,0,1-1.26.57L4,23.18a15.44,15.44,0,0,0,2.14,2.9,14.54,14.54,0,0,0,6.18,4,1,1,0,0,1,.75,1,.93.93,0,0,1-.84.85,1.32,1.32,0,0,1-.55-.08A16.5,16.5,0,0,1,3.29,25.6C3,25.13,2.65,24.64,2.3,24.11Z" />
              </svg>
            </a>
          </div>
          <div className="bg-black bg-opacity-80 p-3 rounded-xl shadow-md ">
            <Link to="/calculator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="33"
                viewBox="0 0 35 33"
                className="transition-transform duration-300 transform hover:scale-110 fill-white hover:fill-[#FF822E]">
                <path d="M18.11,22.62v7.83a2.2,2.2,0,0,1-2.37,2.38H3.52a2.21,2.21,0,0,1-2.36-2.36V14.75A2.19,2.19,0,0,1,3.5,12.41H15.79a2.18,2.18,0,0,1,2.32,2.32ZM9.62,18.54H15c.49,0,.65-.16.66-.65V16.16c0-.43-.19-.61-.61-.61H4.19c-.42,0-.59.18-.6.61s0,1.13,0,1.7.15.68.69.68Zm4.15,4.07h.44c1,0,1-.1,1-1.05,0-.45-.18-.62-.62-.63H13.38c-1,0-1.11.11-1.05,1.12a.52.52,0,0,0,.56.55C13.18,22.62,13.47,22.61,13.77,22.61Zm0,3.54h.44c1,0,1.06-.1,1-1,0-.44-.19-.62-.62-.62H13.38c-1,0-1.11.12-1.05,1.12a.52.52,0,0,0,.56.56C13.18,26.16,13.48,26.15,13.77,26.15Zm0,3.54h.44c.93,0,1-.12,1-1.07,0-.42-.19-.6-.61-.6H13.37c-1,0-1.09.1-1,1.1a.53.53,0,0,0,.57.58Zm-8.3-7.08H5.9c1,0,1.07-.08,1-1.06,0-.43-.18-.61-.63-.62s-.81,0-1.22,0c-1.15-.06-1.06.29-1,1.12a.5.5,0,0,0,.56.55C4.9,22.62,5.2,22.61,5.49,22.61Zm0,3.54h.41C7.07,26.22,7,25.86,6.94,25a.5.5,0,0,0-.53-.54c-.62,0-1.23,0-1.84,0a.5.5,0,0,0-.52.52c-.08.7,0,1,.37,1.12a1.18,1.18,0,0,0,.27,0Zm0,1.86H5.07c-1,0-1.07.11-1,1.08,0,.41.2.59.62.6H5.88c1,0,1.12-.1,1.06-1.11A.52.52,0,0,0,6.36,28Zm4.13-5.39h.41c1,0,1.07-.1,1-1.07a.54.54,0,0,0-.61-.61c-.42,0-.84,0-1.25,0-1.14-.06-1.06.29-1,1.1a.51.51,0,0,0,.57.57Zm0,3.53h.44c.95,0,1-.08,1-1,0-.47-.19-.65-.67-.65s-.79,0-1.19,0c-1.18-.06-1.05.33-1,1.13a.51.51,0,0,0,.56.55C9.05,26.16,9.34,26.15,9.64,26.15Zm0,1.86H9.22c-1,0-1.07.1-1,1.07a.54.54,0,0,0,.61.61c.42,0,.84,0,1.25,0,1.16.06,1-.32,1-1.1v0a.52.52,0,0,0-.54-.53C10.25,28,10,28,9.66,28Z" />
                <path d="M19.21,15.94c-.05-1,.15-2-.45-3l.4,0h5.75a1.21,1.21,0,0,0,.43,0,.48.48,0,0,0,.34-.56.5.5,0,0,0-.46-.47H18a1.31,1.31,0,0,1-.54-.14,3.54,3.54,0,0,0-1.66-.4H6.47V1c0-.64.17-.81.8-.81H23.85c0,.13,0,.25,0,.37,0,.92,0,1.83,0,2.75a1.39,1.39,0,0,0,1.54,1.54H28.5c0,.08,0,.13,0,.17q0,2.56,0,5.13a.85.85,0,0,1-.12.38q-1.5,2.61-3,5.21A.51.51,0,0,1,25,16H19.39ZM12.6,10.6A4.32,4.32,0,1,0,8.27,6.28,4.3,4.3,0,0,0,12.6,10.6ZM22,7.76H18.63a.54.54,0,0,0,0,1.05,2,2,0,0,0,.34,0h6l.33,0a.51.51,0,0,0,.41-.55.5.5,0,0,0-.44-.49,1.83,1.83,0,0,0-.33,0Zm-1.81-3h1.32c.41,0,.65-.2.65-.53s-.24-.55-.63-.55H18.8c-.4,0-.63.22-.63.55a.54.54,0,0,0,.62.53Z" />
                <path d="M25.53,24.28c.48-.28.94-.56,1.41-.81a1.72,1.72,0,0,0,.77-.76c.23-.45.5-.87.78-1.35a1.43,1.43,0,0,1,0,.21v6.5c0,.43-.21.67-.6.68h-8.7V25.27H25C25.63,25.27,25.86,24.9,25.53,24.28Z" />
                <path d="M32.57,12.1l-5.66,9.81L24,20.26l5.66-9.82Z" />
                <path d="M19.23,17.06h5.36c-.05.1-.07.18-.11.25-.49.85-1,1.69-1.47,2.53a.44.44,0,0,1-.29.22H19.23Z" />
                <path d="M19.23,21.17h3.43v3H19.23Z" />
                <path d="M33.12,11.16,30.24,9.5A10.3,10.3,0,0,1,31,8.34c.5-.61,1.26-.58,2.2,0a1.35,1.35,0,0,1,.55,1.74C33.54,10.46,33.33,10.79,33.12,11.16Z" />
                <path d="M25,.32,28.4,3.74h-3c-.25,0-.42-.08-.41-.37v-3A.13.13,0,0,1,25,.32Z" />
                <path d="M23.76,21.35l2.32,1.34-.54.33-1.45.83c-.18.11-.33.13-.33-.15Z" />
                <path d="M12,8.88a1.81,1.81,0,0,1-1.31-1.17A.56.56,0,0,1,11,6.94c.3-.11.56,0,.72.38a1.06,1.06,0,0,0,1.57.34.35.35,0,0,0-.05-.58,2.36,2.36,0,0,0-.59-.24c-.28-.09-.58-.12-.85-.23a1.39,1.39,0,0,1-1-1.29,1.47,1.47,0,0,1,.88-1.48c.19-.1.36-.15.38-.43A.46.46,0,0,1,12.61,3a.48.48,0,0,1,.5.42c0,.22.14.29.32.36a1.74,1.74,0,0,1,.9.89.55.55,0,1,1-1,.5.82.82,0,0,0-1.14-.39.59.59,0,0,0-.29.4.5.5,0,0,0,.29.39,5.57,5.57,0,0,0,.85.23,1.84,1.84,0,0,1,1.27.88,1.45,1.45,0,0,1-.86,2.09c-.19.07-.35.11-.38.38a.47.47,0,0,1-.53.39.52.52,0,0,1-.51-.43A1.56,1.56,0,0,1,12,8.88Z" />
              </svg>
            </Link>
          </div>
          <div className="bg-black bg-opacity-80 p-3 rounded-xl shadow-md">
            <a href="#Market">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="33"
                viewBox="0 0 35 33"
                className="transition-transform duration-300 transform hover:scale-110 fill-white hover:fill-[#FF822E]">
                <path d="M.22,20.35l.32-.29,12.77-13c.1-.1.19-.22.3-.35l5,5.16,8.49-8.14L24.63,1.33H31v6.2L28.75,5.29,18.51,15.1,13.61,10,1.84,22,.22,20.41Z" />
                <path d="M27.17,31.66V10.42h7.61V31.66Z" />
                <path d="M16.52,31.67V17.52h7.62V31.67Z" />
                <path d="M13.5,31.67H5.87V20.92H13.5Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Trending Now Section
const TrendingNow = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the number of visible cards based on screen size
  const visibleCards = window.innerWidth <= 640 ? 1 : 4;

  const slideLeft = () => {
    // Prevent sliding beyond the first card
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const slideRight = () => {
    // Prevent sliding beyond the last visible card
    if (currentIndex < posts.length - visibleCards) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="relative w-full max-w-7xl">
        <h1 className="text-[#FF822E] text-3xl font-bold p-4">Trending Now</h1>

        {/* Left Button */}
        <button
          onClick={slideLeft}
          className={`absolute left-[-20px] lg:left-[-50px] top-1/2 transform -translate-y-1/2 bg-[#FF822E] text-white p-3 rounded-xl shadow-md hover:scale-105 transition z-10 ${
            currentIndex === 0 && "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentIndex === 0}
          aria-label="Slide Left">
          <FaChevronLeft />
        </button>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}>
            {posts.map((blog) => (
              <div
                key={blog.id}
                className={`w-full md:w-1/${visibleCards} flex-shrink-0 items-stretch px-6 lg:px-4`}>
                <div className="bg-white border rounded-xl shadow-md hover:shadow-lg overflow-hidden">
                  <Link
                    to={`/${createSlug(
                      blog?.categories[0]?.category_name
                    )}/${createSlug(blog?.Custom_url)}`}>
                    <img
                      src={
                        blog?.featured_image
                          ? `${import.meta.env.VITE_API_URL}/${
                              blog?.featured_image
                            }`
                          : "https://via.placeholder.com/300x200.png?text=No+Image"
                      }
                      alt={blog.title}
                      className="h-48 w-full object-cover"
                    />
                  </Link>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaUserCircle size={20} />
                        <p className="text-sm font-semibold text-gray-700">
                          {blog.author_name}
                        </p>
                      </div>
                      <time
                        dateTime={blog.date}
                        className="text-xs text-gray-400 font-semibold">
                        {new Date(
                          blog.scheduleDate || blog.created_at
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h2 className="text-lg font-bold my-2 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-sm line-clamp-3">
                      {blog.seoDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Button */}
        <button
          onClick={slideRight}
          className={`absolute right-[-20px] lg:right-[-50px] top-1/2 transform -translate-y-1/2 bg-[#FF822E] text-white p-3 rounded-xl shadow-md hover:scale-105 transition z-10 ${
            currentIndex >= posts.length - visibleCards &&
            "opacity-50 cursor-not-allowed"
          }`}
          disabled={currentIndex >= posts.length - visibleCards}
          aria-label="Slide Right">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

const MoneyInsights = ({ data }) => {
  const topBlogs = data.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-[#FF822E] text-3xl font-bold mb-6">Money Insights</h1>
      {topBlogs?.length === 0 ? (
        <p className="text-gray-500 text-center h-screen">
          No matching blog posts found.
        </p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="flex flex-col">
            <div className="overflow-hidden h-full flex flex-col">
              <Link
                to={`/${createSlug(
                  topBlogs[0]?.categories[0].category_name
                )}/${createSlug(topBlogs[0]?.Custom_url)}`}>
                <img
                  src={
                    topBlogs[0]?.featured_image
                      ? `${import.meta.env.VITE_API_URL}/${
                          topBlogs[0]?.featured_image
                        }`
                      : "https://via.placeholder.com/300x200.png?text=No+Image"
                  }
                  alt={topBlogs[0].title}
                  className="lg:h-[300px] h-[200px] rounded-xl w-full object-cover"
                />
              </Link>
              <div className="py-4 flex flex-col justify-between flex-grow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaUserCircle size={24} />
                    <p className="text-sm font-semibold text-gray-700">
                      {topBlogs[0].author_name}
                    </p>
                  </div>
                  <time
                    dateTime={topBlogs[0].date}
                    className="text-xs uppercase text-gray-400 font-semibold">
                    {new Date(
                      topBlogs[0].scheduleDate || topBlogs[0].created_at
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h2 className="text-xl font-bold mt-4 text-gray-800 line-clamp-2">
                  {topBlogs[0].title}
                </h2>
                <h2 className="text-base text-gray-800 line-clamp-2">
                  {topBlogs[0].seoDescription}
                </h2>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-6">
            {topBlogs.slice(1).map((blog) => (
              <div
                key={blog.id}
                className="overflow-hidden flex flex-row gap-4">
                <div className="flex-1">
                  <Link
                    to={`/${createSlug(
                      blog?.categories[0].category_name
                    )}/${createSlug(blog?.Custom_url)}`}>
                    <img
                      src={
                        blog?.featured_image
                          ? `${import.meta.env.VITE_API_URL}/${
                              blog?.featured_image
                            }`
                          : "https://via.placeholder.com/300x200.png?text=No+Image"
                      }
                      alt={blog.title}
                      className="lg:h-[200px] h-[150px] w-full rounded-xl object-cover"
                    />
                  </Link>
                </div>
                <div className="lg:p-4 flex-1 flex flex-col justify-between flex-grow">
                  <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                    {blog.title}
                  </h2>
                  <h2 className="text-base text-gray-800 line-clamp-2">
                    {blog.seoDescription}
                  </h2>
                  <div className="flex flex-col lg:flex-row items-start gap-2 justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <FaUserCircle size={20} />
                      <p className="text-sm font-semibold text-gray-700">
                        {blog.author_name}
                      </p>
                    </div>
                    <time
                      dateTime={blog.date}
                      className="text-xs uppercase text-gray-400 font-semibold">
                      {new Date(
                        blog.scheduleDate || blog.created_at
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const TopStrategies = ({ data }) => {
  const topBlogs = data.slice(0, 6);
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-[#FF822E] text-3xl font-bold mb-6">Top Strategies</h1>
      {topBlogs?.length === 0 ? (
        <p className="text-gray-500 text-center h-screen">
          No matching blog posts found.
        </p>
      ) : (
        <div className="grid lg:grid-cols-[70%_30%] gap-8">
          {/* Left Side */}
          <div className="flex flex-col lg:flex-row gap-6">
            {topBlogs.slice(0, 2).map((blog) => (
              <div key={blog.id} className="flex-1 flex flex-col">
                <div className="overflow-hidden h-full flex flex-col">
                  <Link
                    to={`/${createSlug(
                      blog?.categories[0].category_name
                    )}/${createSlug(blog?.Custom_url)}`}>
                    <img
                      src={
                        blog?.featured_image
                          ? `${import.meta.env.VITE_API_URL}/${
                              blog?.featured_image
                            }`
                          : "https://via.placeholder.com/300x200.png?text=No+Image"
                      }
                      alt={blog.title}
                      className="lg:h-[350px] h-[200px] rounded-xl w-full object-cover"
                    />
                  </Link>
                  <div className="py-4 flex flex-col justify-between flex-grow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaUserCircle size={24} />
                        <p className="text-sm font-semibold text-gray-700">
                          {blog.author_name}
                        </p>
                      </div>
                      <time
                        dateTime={blog.scheduleDate || blog.created_at}
                        className="text-xs uppercase text-gray-400 font-semibold">
                        {new Date(
                          blog.scheduleDate || blog.created_at
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <h2 className="text-xl font-bold mt-4 text-gray-800 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-sm line-clamp-2">
                      {blog.seoDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Right Side */}
          <div className="flex flex-col gap-6">
            {topBlogs.slice(2).map((blog) => (
              <div
                key={blog.id}
                className="overflow-hidden flex flex-row gap-4 pb-4 border-b border-gray-300">
                <div className="flex-shrink-0 w-1/3">
                  <Link
                    to={`/${createSlug(
                      blog?.categories[0].category_name
                    )}/${createSlug(blog?.Custom_url)}`}>
                    <img
                      src={
                        blog?.featured_image
                          ? `${import.meta.env.VITE_API_URL}/${
                              blog?.featured_image
                            }`
                          : "https://via.placeholder.com/300x200.png?text=No+Image"
                      }
                      alt={blog.title}
                      className="h-[100px] w-full rounded-xl object-cover"
                    />
                  </Link>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaUserCircle size={20} />
                      <p className="text-sm font-semibold text-gray-700">
                        {blog.author_name}
                      </p>
                    </div>
                    <time
                      dateTime={blog.scheduleDate || blog.created_at}
                      className="text-xs uppercase text-gray-400 font-semibold">
                      {new Date(
                        blog.scheduleDate || blog.created_at
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="text-lg font-bold text-gray-800 mt-2 line-clamp-2">
                    {blog.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
const RiskManagement = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the number of visible cards based on screen size
  const visibleCards = window.innerWidth <= 640 ? 1 : 4;

  const slideLeft = () => {
    // Prevent sliding beyond the first card
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const slideRight = () => {
    // Prevent sliding beyond the last visible card
    if (currentIndex < data.length - visibleCards) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center p-6">
        <div className="relative w-full max-w-7xl">
          <h1 className="text-[#FF822E] text-3xl font-bold p-4">
            Risk Management
          </h1>
          <div>
            {/* Left Button */}
            <button
              onClick={slideLeft}
              className={`absolute left-[-20px] lg:left-[-50px] top-1/2 transform -translate-y-1/2 bg-[#FF822E] text-white p-3 rounded-xl shadow-md hover:scale-105 transition z-10 ${
                currentIndex === 0 && "opacity-50 cursor-not-allowed"
              }`}
              disabled={currentIndex === 0}
              aria-label="Slide Left">
              <FaChevronLeft />
            </button>
            {data?.length === 0 ? (
              <p className="text-gray-500 text-center h-screen">
                No matching blog posts found.
              </p>
            ) : (
              <>
                {/* Slider */}
                <div className="overflow-hidden">
                  <div
                    className="flex gap-4 transition-transform duration-500"
                    style={{
                      transform: `translateX(-${
                        currentIndex * (window.innerWidth <= 640 ? 100 : 25)
                      }%)`,
                    }}>
                    {data.slice(0, 6).map((blog) => (
                      <div
                        key={blog.id}
                        className="w-full md:w-1/4 flex-shrink-0 px-6 lg:px-4">
                        <div className="flex flex-col items-stretch shadow-md rounded-lg hover:shadow-2xl hover:border-b-4 border-transparent hover:border-[#FF822E] p-4 h-full">
                          {/* Title & Description */}
                          <div className="flex-grow">
                            <h2 className="text-lg font-bold mb-2 text-gray-800 line-clamp-2">
                              {blog.title}
                            </h2>
                            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                              {blog.seoDescription}
                            </p>
                          </div>
                          {/* Image */}
                          <div className="mb-4">
                            <img
                              src={
                                blog?.featured_image
                                  ? `${import.meta.env.VITE_API_URL}/${
                                      blog?.featured_image
                                    }`
                                  : "https://via.placeholder.com/300x200.png?text=No+Image"
                              }
                              alt={blog.title}
                              className="h-36 w-full object-cover rounded-md"
                            />
                          </div>
                          {/* Discover More Link */}
                          <div>
                            <Link
                              to={`/${createSlug(
                                blog?.categories[0]?.category_name
                              )}/${createSlug(blog?.Custom_url)}`}
                              className="text-black font-semibold hover:text-[#FF822E]">
                              Discover More
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            {/* Right Button */}
            <button
              onClick={slideRight}
              className={`absolute right-[-20px] lg:right-[-50px] top-1/2 transform -translate-y-1/2 bg-[#FF822E] text-white p-3 rounded-xl shadow-md hover:scale-105 transition z-10 ${
                currentIndex >= data.length - visibleCards &&
                "opacity-50 cursor-not-allowed"
              }`}
              disabled={currentIndex >= data.length - visibleCards}
              aria-label="Slide Right">
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
const CalculatorSection = ({ calculator }) => {
  const defaultInputs = calculator.inputs.reduce((acc, input) => {
    acc[input.key] = input.default || 0;
    return acc;
  }, {});

  // Initialize default values
  const [inputs, setInputs] = useState(defaultInputs);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);
  console.log(chartData);
  const calculateAndUpdate = (currentInputs) => {
    const res = calculateResult(calculator.id, currentInputs);

    const investedAmount =
      calculator.id === "sip"
        ? currentInputs.investment * currentInputs.time * 12
        : currentInputs.investment;
    const returnAmount = res - investedAmount;

    const data = {
      labels: ["Invested Amount", "Return Amount"],
      datasets: [
        {
          data: [investedAmount, returnAmount],
          backgroundColor: ["#FF6F1F", "#8C8C8C"],
          hoverBackgroundColor: ["#FF6F1F", "#8C8C8C"],
          borderColor: "#ffffff",
          borderWidth: 2,
        },
      ],
    };

    setResult(res);
    setChartData(data);
  };

  useEffect(() => {
    calculateAndUpdate(inputs);
  }, [inputs]);

  const handleInputChange = (key, value) => {
    const inputConfig = calculator.inputs.find((input) => input.key === key);
    console.log(inputConfig);
    const maxValue = inputConfig?.max || 100;

    // Apply min/max limits dynamically
    value = Math.max(0, Math.min(maxValue, value));
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 bg-[#E8E8E8] mx-auto max-w-screen-xl rounded-lg shadow-lg flex flex-col lg:flex-row items-center gap-8">
      <div className="flex-1 w-full">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          {calculator.name}
        </h2>
        <p className="text-gray-600 mb-6">{calculator.description}</p>

        <div className="grid gap-6 mb-4">
          {calculator.inputs.map((input) => (
            <div key={input.key} className="flex flex-col">
              <div className="flex flex-row justify-between items-center">
                <label className="text-md font-medium mb-1">
                  {input.label}
                </label>
                <input
                  type="number"
                  value={inputs[input.key]}
                  onChange={(e) =>
                    handleInputChange(input.key, Number(e.target.value))
                  }
                  className="mb-2 w-42 p-2 border border-[#FF822E] rounded-md shadow-sm focus:outline-none focus:ring-0"
                  placeholder="Enter value"
                />
              </div>
              <div>
                <input
                  type="range"
                  min={0}
                  max={input.max}
                  value={inputs[input.key]}
                  onChange={(e) =>
                    handleInputChange(input.key, Number(e.target.value))
                  }
                  className="w-full cursor-pointer appearance-[#FF822E] h-1 border-none rounded-lg focus:outline-none focus:ring-0 accent-[#FF822E]"
                />
              </div>
            </div>
          ))}
        </div>

        {result !== null && (
          <div className="flex lg:flex-row flex-col justify-between lg:items-center mt-6 py-2 px-8 bg-[#FFBA8C] rounded-lg">
            <div>
              <h4 className="text-xl font-semibold mb-2 text-black">
                Calculation Result
              </h4>
            </div>
            <div>
              <p className="text-xl text-white">
                {calculator.output}: ₹{result.toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
      {calculator.showGraph && (
        <>
          {chartData && (
            <div className="flex-1 w-full max-w-sm bg-white border p-4 rounded-xl">
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Breakdown
              </h4>
              <div className="h-64">
                <Doughnut
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "bottom",
                        labels: {
                          font: { size: 12 },
                          color: "#4B5563",
                        },
                      },
                      tooltip: {
                        callbacks: {
                          label: (tooltipItem) => {
                            const value = tooltipItem.raw;
                            const total = tooltipItem.dataset.data.reduce(
                              (a, b) => a + b,
                              0
                            );
                            const percentage = ((value / total) * 100).toFixed(
                              2
                            );
                            return `${
                              tooltipItem.label
                            }: ₹${value.toLocaleString()} (${percentage}%)`;
                          },
                        },
                      },
                      title: {
                        display: true,
                        text: "Invested Amount vs Return Amount",
                        font: { size: 14 },
                        color: "#1F2937",
                      },
                    },
                  }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
// Helper function to create slug
const createSlug = (title) => {
  // Check if the title is not null and is a string before processing
  if (typeof title !== "string") {
    return ""; // Return an empty string or handle the case as needed
  }

  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};
export default userHome;
