import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const MoneyInsights = memo(({ data }) => {
  // const topBlogs = data.slice(0, 3);
  const [posts, setPosts] = useState([]);

  const BASE_URL = "https://cms.trustfinancialadvisory.com/wp-json/wp/v2";
  const fetchData = async () => {
    try {
      // Step 1: Fetch the main category by slug
      const mainCatRes = await axios.get(
        `${BASE_URL}/categories?slug=personal-finance`
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
  return (
    <>
      <div className="max-w-7xl mx-auto p-6 overflow-hidden h-auto min-h-[500px]">
        <h2 className="text-[#FF822E] text-3xl font-bold mb-6">
          Money Insights
        </h2>
        {posts?.length === 0 ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <p className="text-gray-500 text-center">Loading...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side */}
            <div className="flex flex-col">
              <Link to={generateBlogUrl(posts[0])}>
                <img
                  src={posts[0]._embedded["wp:featuredmedia"]?.[0]?.source_url}
                  alt={
                    posts[0]._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                    posts[0].title.rendered
                  }
                  className="lg:h-[300px] h-[200px] w-full object-cover rounded-xl aspect-[4/3]"
                  width="400"
                  height="300"
                  loading="lazy"
                />
              </Link>
              <div className="py-4 flex flex-col justify-between flex-grow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={posts[0]._embedded.author?.[0]?.avatar_urls?.["48"]}
                      alt={posts[0]._embedded.author?.[0]?.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <p className="text-sm font-semibold text-gray-700">
                      {posts[0]._embedded.author?.[0]?.name}
                    </p>
                  </div>
                  <div>
                    <time
                      dateTime={posts[0].date}
                      className="text-xs text-gray-400 font-semibold">
                      {new Date(posts[0].date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                </div>
                <div className="min-h-[50px]">
                  <h2
                    className="text-lg font-bold my-2 line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: posts[0].title.rendered,
                    }}
                  />
                  <p
                    className="text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: posts[0].excerpt.rendered,
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Right Side */}
            <div className="flex flex-col gap-6">
              {posts.slice(1, 3).map((blog) => (
                <div
                  key={blog.id}
                  className="overflow-hidden flex flex-row gap-4">
                  <div className="flex-1">
                    <Link to={generateBlogUrl(blog)}>
                      <img
                        src={
                          blog._embedded["wp:featuredmedia"]?.[0]?.source_url ||
                          "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={
                          blog._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                          blog.title.rendered
                        }
                        className="lg:h-[200px] h-[150px] w-full rounded-xl object-cover aspect-[4/3]"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="lg:p-4 flex-1 flex flex-col justify-between flex-grow">
                    <h2
                      className="text-lg font-bold text-gray-800 line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: blog.title.rendered }}
                    />
                    <p
                      className="text-sm text-gray-700 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: blog.excerpt.rendered,
                      }}
                    />
                    <div className="flex flex-col lg:flex-row items-start gap-2 justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            blog._embedded.author?.[0]?.avatar_urls?.["48"] ||
                            "https://via.placeholder.com/48"
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
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

export default MoneyInsights;
