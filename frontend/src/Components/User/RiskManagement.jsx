import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
                              loading="lazy"
                              defer
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

export default RiskManagement;
