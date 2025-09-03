import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaUserCircle } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopStrategies = memo(() => {
  const BASE_URL = "https://cms.trustfinancialadvisory.com/wp-json/wp/v2";
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // Step 1: Fetch the main category by slug
      const mainCatRes = await axios.get(
        `${BASE_URL}/categories?slug=investment-and-wealth-growth`
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
      setData(result);
    };

    getPosts();
  }, []);
  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-[#FF822E] text-3xl font-bold mb-6">
          Top Strategies
        </h2>
        {data?.length === 0 ? (
          <p className="text-gray-500 text-center h-screen">
            No matching blog posts found.
          </p>
        ) : (
          <div className="grid lg:grid-cols-[70%_30%] gap-8">
            {/* Left Side */}
            <div className="flex flex-col lg:flex-row gap-6">
              {data.slice(0, 2).map((blog) => (
                <div key={blog.id} className="flex-1 flex flex-col">
                  <Link to={generateBlogUrl(blog)}>
                    <div className="overflow-hidden h-full flex flex-col">
                      <img
                        src={
                          blog._embedded["wp:featuredmedia"]?.[0]?.source_url
                        }
                        alt={
                          blog._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                          blog.title.rendered
                        }
                        className="w-full rounded-xl object-cover aspect-[16/9] lg:h-[350px] h-[200px]"
                        width="450"
                        height="200"
                        loading="lazy"
                      />

                      <div className="py-4 flex flex-col justify-between flex-grow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                blog._embedded.author?.[0]?.avatar_urls?.["48"]
                              }
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
                          dangerouslySetInnerHTML={{
                            __html: blog.title.rendered,
                          }}
                        />
                        <p
                          className="text-sm line-clamp-3"
                          dangerouslySetInnerHTML={{
                            __html: blog.excerpt.rendered,
                          }}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {/* Right Side */}
            <div className="flex flex-col gap-6">
              {data.slice(2, 6).map((blog) => (
                <Link to={generateBlogUrl(blog)} key={blog.id}>
                  <div className="overflow-hidden flex flex-row gap-4 pb-4 border-b border-gray-300">
                    <div className="flex-shrink-0 w-1/3">
                      <img
                        src={
                          blog._embedded["wp:featuredmedia"]?.[0]?.source_url
                        }
                        alt={
                          blog._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                          blog.title.rendered
                        }
                        loading="lazy"
                        className="h-[100px] w-full rounded-xl object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={
                              blog._embedded.author?.[0]?.avatar_urls?.["48"]
                            }
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
                        dangerouslySetInnerHTML={{
                          __html: blog.title.rendered,
                        }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
});

//code for creating slug

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

export default TopStrategies;
