import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  lazy,
  memo,
} from "react";
import { FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { calculateResult } from "./Calculator/calculatorLogic";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Helmet } from "react-helmet-async";
ChartJS.register(ArcElement, Tooltip, Legend);
import { Doughnut } from "react-chartjs-2";
import usePageTracker from "../../hooks/usePageTracker";

// Lazy Load Components
const TradingWidget = lazy(() => import("./TradingWIdget"));
const CurrencyExchange = lazy(() => import("./CurrencyExchange"));

const UserHome = () => {
  usePageTracker("home");
  const [posts, setPosts] = useState([]);
  const [groupedData, setGroupedData] = useState({
    "Personal Finance": [],
    "Investment and Wealth Growth": [],
    "Risk Management": [],
  });

  const calculators = useMemo(
    () => [
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
    ],
    []
  );

  // Fetch posts only if they are empty
  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/posts`);
      const responseData = await response.json();
      const filteredPosts = responseData.data.filter(
        (post) => post.blog_type === "published"
      );

      setPosts(filteredPosts);

      // Categorize posts
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
      console.error("Error fetching posts:", error);
    }
  }, []);

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [fetchPosts, posts.length]);

  return (
    <>
      {/* React Helmet for SEO */}
      <Helmet>
        <title>
          Finance Newsletter for Smart Investors | Trust financial advisory
        </title>
        <meta
          name="description"
          content="Get exclusive insights from our finance newsletter! Discover global investment solutions, expert analysis, and proven wealth management strategies."
        />
        <meta
          name="keywords"
          content="finance newsletter, global investment solutions, investment solutions, financial accounting advisory services"
        />
        <meta
          property="og:title"
          content="Finance Newsletter for Smart Investors | Trust financial advisory"
        />
        <meta
          property="og:description"
          content="Get exclusive insights from our finance newsletter! Discover global investment solutions, expert analysis, and proven wealth management strategies."
        />
        <meta property="og:type" content="Category Blogs" />
        <meta property="og:url" content="https://trustfinancialadvisory.com" />
        <link rel="canonical" href="https://trustfinancialadvisory.com" />
      </Helmet>
      <Hero />
      <TrendingNow posts={posts} />

      <div id="Market" className="flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto p-6">
          <h2 className="text-3xl font-bold text-left mb-8 text-[#FF822E]">
            Market Highlights
          </h2>
          <TradingWidget />
        </div>
      </div>

      <MoneyInsights data={groupedData["Personal Finance"]} />

      <div className="flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto p-6">
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
      <Content />
    </>
  );
};
const Hero = memo(() => {
  return (
    <div
      className="bg-cover flex items-center h-[520px] bg-lazy"
      style={{
        backgroundImage: `url('/background.webp')`, // Use optimized image
      }}>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 px-6 w-full">
        <div className="text-white w-full lg:ml-[10%] lg:w-[50%] text-center lg:px-10 lg:text-left">
          <h2 className="text-xl lg:text-2xl font-bold leading-tight">
            Guiding you through every stage of life with strategic financial
            planning and investment solutions
          </h2>
          <p className="text-sm lg:text-base leading-relaxed">
            Trust Financial Advisory is here to guide you through the
            complexities of financial planning. We provide customized solutions
            focused on building wealth, protecting assets, and planning for the
            future. With personalized advice and strategic planning, we help you
            navigate your financial journey with confidence.
          </p>
        </div>

        {/* Icons */}
        <div className="flex flex-row lg:flex-col items-center gap-6 lg:items-start">
          <div className="bg-black bg-opacity-80 p-3 rounded-xl shadow-md">
            <a href="#Currency">
              <img
                src="/currency.svg"
                alt="Currency"
                width={33}
                height={33}
                className="transition-transform duration-300 transform hover:scale-110 text-white hover:text-[#FF822E]"
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
                className="transition-transform duration-300 transform hover:scale-110 text-white hover:text-[#FF822E]"
              />
            </Link>
          </div>
          <div className="bg-black bg-opacity-80 p-3 rounded-xl shadow-md">
            <a href="#Market">
              <img
                src="/market.svg"
                alt="Currency"
                width={33}
                height={33}
                className="transition-transform duration-300 transform hover:scale-110 text-white hover:text-[#FF822E]"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
});

// Trending Now Section
const TrendingNow = memo(({ posts }) => {
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
});

const MoneyInsights = memo(({ data }) => {
  const topBlogs = data.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-[#FF822E] text-3xl font-bold mb-6">Money Insights</h2>
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
});

const TopStrategies = memo(({ data }) => {
  const topBlogs = data.slice(0, 6);
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-[#FF822E] text-3xl font-bold mb-6">Top Strategies</h2>
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
});
const RiskManagement = memo(({ data }) => {
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
          <h2 className="text-[#FF822E] text-3xl font-bold p-4">
            Risk Management
          </h2>
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
});
const CalculatorSection = memo(({ calculator }) => {
  const defaultInputs = calculator.inputs.reduce((acc, input) => {
    acc[input.key] = input.default || 0;
    return acc;
  }, {});

  // Initialize default values
  const [inputs, setInputs] = useState(defaultInputs);
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);
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
                <label className="lg:text-lg text-xs font-medium mb-1">
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
});
const Content = memo(() => {
  return (
    <>
      <div className="w-full flex flex-col items-center pt-6">
        <div className="relative w-full max-w-7xl">
          <div className="flex flex-col gap-8 px-4 lg:px-0 py-8">
            {/* Section 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="lg:w-3/5">
                <h3 className="text-2xl font-semibold text-black text-center lg:text-left mb-4">
                  Navigating Tax Season
                </h3>
                <p className="text-black leading-relaxed text-justify">
                  Tax season does not necessarily have to be daunting, though.
                  Our articles are here to guide you through the maze of tax
                  regulations and policies. We provide advice on{" "}
                  <Link
                    to={`https://trustfinancialadvisory.com/personal-finance/tax-advisory`}
                    className="font-medium text-blue-600 cursor-pointer hover:underline">
                    tax planning
                  </Link>
                  , optimizing deductions, and understanding tax credit. Our
                  posts simplify the tax process so that you'll be adequately
                  organized when it is time to file your taxes. Through our
                  expert analysis, you may reduce your tax burden and keep more
                  of your hard-earned cash. Trust Financial Advisory also offers
                  comprehensive financial accounting advisory services to help
                  you navigate tax season with ease.
                </p>
              </div>
              <div className="lg:w-2/5">
                <img
                  src="content1.webp"
                  alt="Navigating Tax Season"
                  className="lg:w-full lg:h-[200px] object-cover rounded-lg shadow-lg transition-transform duration-300"
                />
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex lg:flex-row flex-col-reverse items-center gap-6">
              <div className="lg:w-2/5">
                <img
                  src="content2.webp"
                  alt="Smart Investment Strategies"
                  className="lg:w-full lg:h-[200px] object-cover rounded-lg shadow-lg transition-transform duration-300"
                />
              </div>
              <div className="lg:w-3/5 text-center lg:text-left">
                <h3 className="text-2xl font-semibold text-black mb-4">
                  Smart Investment Strategies
                </h3>
                <p className="text-black leading-relaxed text-justify">
                  Investing is a major element of wealth production, and on our
                  blog we have an awesome amount of detail on specific sorts of
                  investments. We discuss items like the nature of the stock
                  market, mutual funds,{" "}
                  <Link
                    to={`https://trustfinancialadvisory.com/investment-and-wealth-growth/real-estate-investment`}
                    className="font-medium text-blue-600 cursor-pointer hover:underline">
                    how to invest in real estate
                  </Link>
                  , and retirement investing. Our vision is to aid you in
                  investing wisely based totally for your financial situation
                  and risk exposure. Whether it's your first time investing or
                  you're experienced, our pages include useful content to assist
                  improve your{" "}
                  <Link
                    to={`https://trustfinancialadvisory.com/investment-and-wealth-growth/investment-strategies`}
                    className="font-medium text-blue-600 cursor-pointer hover:underline">
                    investment strategy
                  </Link>
                  . Discover our range of investment solutions tailored to your
                  needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F3F3F3] py-10 px-4 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="border border-orange-500 bg-white p-6 rounded-lg shadow-md">
              <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
                Empowering Financial Literacy
              </h3>
              <p className="text-black leading-relaxed text-justify">
                Financial literacy is the name of the game for smart financial
                choices. Our blog has de-mystify complicated financial facts so
                you can get it in plain English. From getting an education on
                credit ratings to cracking the code on{" "}
                <Link
                  to={`https://trustfinancialadvisory.com/risk-management/insurance-solutions`}
                  className="font-medium text-blue-600 cursor-pointer hover:underline">
                  investment solutions
                </Link>
                , we aim to give you the knowledge to take command of your
                financial life. We believe informed readers are empowered
                readers, and our goal is to make{" "}
                <Link
                  to={`https://trustfinancialadvisory.com/personal-finance/financial-planning`}
                  className="font-medium text-blue-600 cursor-pointer hover:underline">
                  financial education{" "}
                </Link>
                a vital right. Subscribe to our finance newsletter for regular
                updates and global investment solutions insights.
              </p>
            </div>
            <div className="border border-orange-500 bg-white p-6 rounded-lg shadow-md ">
              <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
                Practical Tips for Debt Management
              </h3>
              <p className="text-black leading-relaxed text-justify">
                <Link
                  to={`https://trustfinancialadvisory.com/personal-finance/debt-management`}
                  className="font-medium text-blue-600 cursor-pointer hover:underline">
                  Debt management
                </Link>{" "}
                can be a hard experience, however our blog affords useful tips
                and advice to assist you in taking back control of your
                finances. We discuss budgeting techniques, debt repayment
                options, and the need for credit score control. Our articles
                include useful advice that you could use right away, assisting
                you in paying off your debt and achieving better financial
                health. For expert financial accounting advisory services,
                consider reaching out to Trust Financial Advisory.
              </p>
            </div>
            <div className="border border-orange-500 bg-white p-6 rounded-lg shadow-md">
              <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
                Planning for Education Expenses
              </h3>
              <p className="text-black leading-relaxed text-justify">
                Investing in education is among the most important choices you
                can make for yourself or your children. Our blog contains
                information on{" "}
                <Link
                  to={`https://trustfinancialadvisory.com/personal-finance/education-planning`}
                  className="font-medium text-blue-600 cursor-pointer hover:underline">
                  education planning
                </Link>
                , such as college savings and understanding financial aid
                possibilities. We discuss different savings strategies and offer
                information on how to make education affordable. With our
                advice, you can make education a reachable objective for your
                family. Explore our global investment solutions for securing
                your child's future.
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-7xl py-6">
          <div className="relative flex flex-col p-5 bg-white rounded-lg shadow-lg">
            {/* Decorative Borders */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-orange-400 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-orange-400 rounded-bl-lg"></div>

            {/* Content */}
            <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
              Retirement Planning Insights
            </h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              We invite you to become part of our readers' community that is
              dedicated to enhancing its financial literacy and success. Join
              our blog to get the most recent articles, advice, and tools
              straight to your inbox. Comment and discuss with us because we
              believe that the sharing of information and experience will
              contribute to increased financial empowerment. Benefit from our
              global investment solutions and connect with like-minded
              individuals.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            <div className="relative flex flex-col p-5 bg-white rounded-lg shadow-lg">
              {/* Decorative Borders */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-orange-400 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-orange-400 rounded-bl-lg"></div>

              {/* Content */}
              <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
                Retirement Planning Insights
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                <Link
                  to={`https://trustfinancialadvisory.com/risk-management/retirement-planning`}
                  className="font-medium text-blue-600 cursor-pointer hover:underline">
                  Retirement planning
                </Link>{" "}
                is vital for securing a comfortable future. Our articles take
                you through the retirement planning process, from evaluating
                your savings today to projecting your costs tomorrow. We cover
                different kinds of retirement accounts, including 401(k)s and
                IRAs, and offer advice on how to develop a withdrawing strategy
                in an effort to work for you. With our guides, you can take
                action now to ensure financial security in retirement. Plan your
                retirement with our expert investment solutions and secure your
                financial future.
              </p>
            </div>
            <div className="relative flex flex-col p-5 bg-white rounded-lg shadow-lg">
              {/* Decorative Borders */}
              <div className="absolute top-0 right-0 w-28 h-28 border-t-4 border-r-4 border-orange-400 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-28 h-28 border-b-4 border-l-4 border-orange-400 rounded-bl-lg"></div>

              {/* Content */}
              <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
                Building Wealth Through Financial Education
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                At Trust Financial Advisory, we feel that building wealth in
                finances is the stepping stone to prosperity. Our blog is
                committed to giving you the resources and tools you require to
                make smart financial decisions. We update our material regularly
                to keep you posted on cutting-edge trends and emerging
                information in personal finance, so that you can remain relevant
                and informed. Sign up for our finance newsletter to stay ahead
                of the curve.
              </p>
            </div>
          </div>
          <div className="flex flex-col py-5 p-5 lg:p-0">
            <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
              Final Words
            </h3>
            <p className="text-black leading-relaxed text-justify">
              Trust Financial Advisory is your one-stop for personal finance
              education and insights. Our blog addresses a vast spectrum of
              subjects, including financial literacy, debt control, education
              planning, tax planning, investment information, and retirement
              planning. We are here to guide you through your financial journey,
              providing the information and tools you need to make informed
              choices. Visit our blog today and begin taking the first step
              closer to achieving your financial targets! Don't forget to
              subscribe to our finance newsletter for valuable financial
              insights delivered straight to your inbox.
            </p>
          </div>
        </div>
      </div>
    </>
  );
});
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
export default UserHome;
