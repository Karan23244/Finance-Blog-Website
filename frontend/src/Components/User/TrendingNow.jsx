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
// Memoize individual blog cards

const MemoizedBlogCard = memo(({ blog, index }) => {
  return (
    <div key={blog.id} className="w-full md:w-1/4 flex-shrink-0 px-6 lg:px-4">
      <div className="bg-white border rounded-xl shadow-md hover:shadow-lg overflow-hidden">
        <Link to={generateBlogUrl(blog)}>
          <img
            src={blog._embedded["wp:featuredmedia"]?.[0]?.source_url}
            alt={
              blog._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
              blog.title.rendered
            }
            className="h-48 w-full object-cover aspect-[16/9]"
            loading="lazy"
          />
        </Link>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={blog._embedded.author?.[0]?.avatar_urls?.["48"]}
                alt={blog._embedded.author?.[0]?.name}
                className="w-6 h-6 rounded-full"
              />
              <p className="text-sm font-semibold text-gray-700">
                {blog._embedded.author?.[0]?.name}
              </p>
            </div>
            <time
              dateTime={blog.date}
              className="text-xs text-gray-400 font-semibold">
              {new Date(blog.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h2
            className="text-lg font-bold my-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: blog.title.rendered }}
          />
          <p
            className="text-sm line-clamp-3"
            dangerouslySetInnerHTML={{ __html: blog.excerpt.rendered }}
          />
        </div>
      </div>
    </div>
  );
});

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
function generateBlogUrl(blog) {
  const terms = blog?._embedded?.["wp:term"]?.[0] || [];
  const postSlug = blog?.slug || "post";

  if (terms.length < 2) {
    // Fallback if only one or zero categories exist
    const fallbackSlug = terms[0]?.slug || "uncategorized";
    return `/${fallbackSlug}/${postSlug}`;
  }

  // Sort categories so that the parent (shorter link) comes first
  const sortedTerms = [...terms].sort((a, b) => {
    const aDepth = (a.link.match(/\//g) || []).length;
    const bDepth = (b.link.match(/\//g) || []).length;
    return aDepth - bDepth;
  });

  const mainCategorySlug = sortedTerms[0]?.slug || "uncategorized";
  const assignedCategorySlug = sortedTerms[1]?.slug || "uncategorized";

  return `/${mainCategorySlug}/${assignedCategorySlug}/${postSlug}`;
}

export default TrendingNow;
