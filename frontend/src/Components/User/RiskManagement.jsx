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
    if (currentIndex < Math.min(data.length, 7) - visibleCards) {
      setCurrentIndex((prev) => prev + 1);
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
                    {data.slice(0, 7).map((blog) => (
                      <div
                        key={blog.id}
                        className="w-full md:w-1/4 flex-shrink-0 px-6 lg:px-4">
                        <div className="flex flex-col rounded-lg hover:border-b-4 border-transparent hover:border-[#FF822E] p-4 h-full">
                          {/* Title & Description */}
                          <div className="flex-grow">
                            <h2
                              className="text-lg font-bold my-2 line-clamp-2"
                              dangerouslySetInnerHTML={{
                                __html: blog.title.rendered,
                              }}
                            />
                            <p
                              className="text-sm line-clamp-2"
                              dangerouslySetInnerHTML={{
                                __html: blog.excerpt.rendered,
                              }}
                            />
                          </div>
                          {/* Image */}
                          <div className="mb-4">
                            <img
                              src={
                                blog._embedded["wp:featuredmedia"]?.[0]
                                  ?.source_url
                              }
                              alt={
                                blog._embedded["wp:featuredmedia"]?.[0]
                                  ?.alt_text || blog.title.rendered
                              }
                              className="h-36 w-full object-cover rounded-md"
                              loading="lazy"
                              defer
                            />
                          </div>
                          {/* Discover More Link */}
                          <div>
                            <Link to={generateBlogUrl(blog)}
                              className="text-black font-semibold
                              hover:text-[#FF822E]"> Discover More
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

function generateBlogUrl(blog) {
  const term = blog?._embedded?.["wp:term"]?.[0]?.[0];
  const fullLink = term?.link || "";
  const pathParts = fullLink.split("/").filter(Boolean);

  const mainCategorySlug =
    pathParts.length >= 2 ? pathParts[pathParts.length - 2] : "uncategorized";
  const assignedCategorySlug = term?.slug || "uncategorized";
  const postSlug = blog?.slug || "post";

  return `/${mainCategorySlug}/${assignedCategorySlug}/${postSlug}`;
}

export default RiskManagement;
