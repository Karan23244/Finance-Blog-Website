import React, { useState, useEffect, memo, useMemo } from "react";
import { FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const TrendingNow = memo(({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate visible cards based on screen size
  const visibleCards = useMemo(() => (window.innerWidth <= 640 ? 1 : 4), []);

  // Get the first post's featured image (assuming it's the LCP image)
  const firstPostImage = posts[0]?.featured_image
    ? `${import.meta.env.VITE_API_URL}/${posts[0].featured_image}`
    : "";

  // Preload the LCP image dynamically
  useEffect(() => {
    if (firstPostImage) {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = firstPostImage;
      link.type = "image/webp";
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [firstPostImage]);

  const slideLeft = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const slideRight = () => {
    if (currentIndex < posts.length - visibleCards)
      setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="w-full flex flex-col items-center p-6">
      <div className="relative w-full max-w-7xl">
        <h1 className="text-[#E65100] text-3xl font-bold p-4">Trending Now</h1>

        {/* Left Button */}
        <button
          onClick={slideLeft}
          className={`absolute left-[-20px] lg:left-[-50px] top-1/2 transform -translate-y-1/2 bg-[#FF822E] text-white p-3 rounded-xl shadow-md hover:scale-105 transition-all z-10`}
          aria-label="Slide Left">
          <FaChevronLeft />
        </button>

        {/* Slider */}
        <div className="overflow-hidden min-h-[350px]">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
            }}>
            {posts.map((blog, index) => (
              <div
                key={blog.id}
                className={`w-full md:w-1/${visibleCards} flex-shrink-0 px-6 lg:px-4`}>
                <div className="bg-white border rounded-xl shadow-md hover:shadow-lg overflow-hidden">
                  <Link
                    to={`/${createSlug(
                      blog?.categories[0]?.category_name
                    )}/${createSlug(blog?.Custom_url)}`}>
                    <img
                      src={
                        blog.featured_image
                          ? `${import.meta.env.VITE_API_URL}/${
                              blog.featured_image
                            }`
                          : "https://via.placeholder.com/300x200.png?text=No+Image"
                      }
                      alt={blog.title}
                      className="h-48 w-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"} // LCP image should load eagerly
                      width="800"
                      height="450"
                      fetchpriority="high"
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
          className={`absolute right-[-20px] lg:right-[-50px] top-1/2 transform -translate-y-1/2 bg-[#FF822E] text-white p-3 rounded-xl shadow-md hover:scale-105 transition-all z-10`}
          aria-label="Slide Right">
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
});

// Function to create slugs
const createSlug = (title) => {
  if (typeof title !== "string") return "";
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

export default TrendingNow;
