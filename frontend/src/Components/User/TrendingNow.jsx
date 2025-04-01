import React, { useState, memo } from "react";
import { FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// Memoize slider buttons to prevent re-renders
const LeftButton = memo(({ slideLeft }) => (
  <button
    onClick={slideLeft}
    className="absolute left-[-20px] lg:left-[-50px] top-1/2 transform -translate-y-1/2 bg-[#FF822E] text-white p-3 rounded-xl shadow-md hover:scale-105 transition-all z-10"
    aria-label="Slide Left">
    <FaChevronLeft />
  </button>
));

const RightButton = memo(({ slideRight }) => (
  <button
    onClick={slideRight}
    className="absolute right-[-20px] lg:right-[-50px] top-1/2 transform -translate-y-1/2 bg-[#FF822E] text-white p-3 rounded-xl shadow-md hover:scale-105 transition-all z-10"
    aria-label="Slide Right">
    <FaChevronRight />
  </button>
));
// Function to create slugs
const createSlug = (title) => {
  if (typeof title !== "string") return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};
// Memoize individual blog cards
const MemoizedBlogCard = memo(({ blog, index }) => (
  <div
    key={blog.id}
    className={`w-full md:w-1/4 flex-shrink-0 px-6 lg:px-4`}>
    <div className="bg-white border rounded-xl shadow-md hover:shadow-lg overflow-hidden">
      <Link
        to={`/${createSlug(
          blog?.categories[0]?.category_name
        )}/${createSlug(blog?.Custom_url)}`}>
        <img
          src={
            blog.featured_image
              ? `${import.meta.env.VITE_API_URL}/${blog.featured_image}`
              : "/placeholder.webp"
          }
          alt={blog.title}
          className="h-48 w-full object-cover aspect-[16/9]"
         defer
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
        <p className="text-sm line-clamp-3">{blog.seoDescription}</p>
      </div>
    </div>
  </div>
));

// Main Component
const TrendingNow = memo(({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = window.innerWidth <= 640 ? 1 : 4;

  // Throttle slider transitions to reduce JS execution time
  const slideLeft = () => {
    requestAnimationFrame(() => {
      if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
    });
  };

  const slideRight = () => {
    requestAnimationFrame(() => {
      if (currentIndex < Math.min(posts.length, 7) - visibleCards) {
        setCurrentIndex((prev) => prev + 1);
      }
    });
  };

  return (
    <>
      <div className="w-full flex flex-col items-center p-6">
        <div className="relative w-full max-w-7xl">
          <h1 className="text-[#E65100] text-3xl font-bold p-4">
            Trending Now
          </h1>

          {/* Left Button */}
          <LeftButton slideLeft={slideLeft} />

          {/* Slider Container */}
          <div className="overflow-hidden min-h-[350px]">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleCards)
                }%)`,
              }}>
              {posts.slice(0, 7).map((blog, index) => (
                <MemoizedBlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </div>
          </div>

          {/* Right Button */}
          <RightButton slideRight={slideRight} />
        </div>
      </div>
    </>
  );
});



export default TrendingNow;
