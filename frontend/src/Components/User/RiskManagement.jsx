import React, { useState, useEffect, memo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RiskManagement = memo(() => {
  const [posts, setPosts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const BASE_URL = "https://cms.trustfinancialadvisory.com/wp-json/wp/v2";
  const fetchData = async () => {
    try {
      // Step 1: Fetch the main category by slug
      const mainCatRes = await axios.get(
        `${BASE_URL}/categories?slug=risk-management`
      );
      const mainCategory = mainCatRes.data[0];
      if (!mainCategory) return [];

      // Step 2: Fetch subcategories of the main category
      const subCatRes = await axios.get(
        `${BASE_URL}/categories?parent=${mainCategory.id}`
      );
      const subCategories = subCatRes.data;

      // Step 3: Combine main category + subcategory IDs
      const allCategoryIds = [
        mainCategory.id,
        ...subCategories.map((cat) => cat.id),
      ];

      // Step 4: Fetch posts from all these categories
      const postsRes = await axios.get(
        `${BASE_URL}/posts?categories=${allCategoryIds.join(
          ","
        )}&_embed&orderby=date&order=desc&per_page=7`
      );

      // Final: Set or return latest 7 posts
      const latestPosts = postsRes.data;
      return latestPosts;
    } catch (error) {
      console.error("Error fetching posts with subcategories:", error);
      return [];
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const result = await fetchData();
      setPosts(result);
    };

    getPosts();
  }, []);

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
            {posts?.length === 0 ? (
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
                    {posts.slice(0, 7).map((blog) => (
                      <div
                        key={blog.id}
                        className="w-full md:w-1/4 flex-shrink-0 px-6 lg:px-4">
                        <Link to={generateBlogUrl(blog)}>
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
                              <Link
                                to={generateBlogUrl(blog)}
                                className="text-black font-semibold
                              hover:text-[#FF822E]">
                                {" "}
                                Discover More
                              </Link>
                            </div>
                          </div>
                        </Link>
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
                currentIndex >= posts.length - visibleCards &&
                "opacity-50 cursor-not-allowed"
              }`}
              disabled={currentIndex >= posts.length - visibleCards}
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

export default RiskManagement;
