import React, { useState, memo } from "react";
import { FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

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
    <>
      <div className="w-full flex flex-col items-center p-6">
        <div className="relative w-full max-w-7xl">
          <h1 className="text-[#FF822E] text-3xl font-bold p-4">
            Trending Now
          </h1>

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
                transform: `translateX(-${
                  currentIndex * (100 / visibleCards)
                }%)`,
              }}>
              {posts.slice(0, 7).map((blog) => (
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
    </>
  );
});

//code for creating slug

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
export default TrendingNow;
