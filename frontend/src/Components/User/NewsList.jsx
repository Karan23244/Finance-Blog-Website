// src/NewsList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function NewsList() {
  const navigate = useNavigate();
  const BASE_URL = "https://cms.trustfinancialadvisory.com/wp-json/wp/v2";
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      // Step 1: Fetch the main category by slug
      const mainCatRes = await axios.get(`${BASE_URL}/categories?slug=news`);
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
    <div className="w-full flex flex-col items-center p-6">
      <div className="relative w-full max-w-7xl">
        <h1 className="text-[#E65100] text-3xl font-bold p-4">News</h1>
        <div className="grid lg:grid-cols-4 grid-cols-1  gap-6 p-4">
          {data.slice(0, 4).map((blog, idx) => (
            <div
              key={idx}
              onClick={() =>
                navigate(generateBlogUrl(blog))
              }
              className="cursor-pointer bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img
                src={blog._embedded["wp:featuredmedia"]?.[0]?.source_url}
                alt={
                  blog._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                  blog.title.rendered
                }
                className="w-full rounded-xl object-cover aspect-[16/9] lg:h-[250px] h-[200px]"
                width="450"
                height="200"
                loading="lazy"
              />
              <div className="p-4">
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
                <p className="text-[#E65100] mt-2 text-sm">
                  Click to read more →
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
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
export default NewsList;
