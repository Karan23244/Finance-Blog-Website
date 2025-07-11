import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Subscribe from "../Common/Subscribe";
import Footer from "../Common/Footer";
import { Helmet } from "react-helmet-async";

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
const BASE_URL = "https://cms.trustfinancialadvisory.com/wp-json/wp/v2";

export default function News() {
  const [groupedPosts, setGroupedPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch the "Personal Finance" main category
        const mainCatRes = await axios.get(
          `${BASE_URL}/categories?slug=news` // Changed slug to "risk-management"
        );
        const mainCategory = mainCatRes.data[0];

        if (!mainCategory) return;

        // Step 2: Fetch subcategories of "Personal Finance"
        const subCatRes = await axios.get(
          `${BASE_URL}/categories?parent=${mainCategory.id}`
        );
        const subCategories = subCatRes.data;

        // Step 3: Fetch posts under each subcategory
        const grouped = await Promise.all(
          subCategories.map(async (subCat) => {
            const postsRes = await axios.get(
              `${BASE_URL}/posts?categories=${subCat.id}&_embed`
            );
            return {
              category: {
                name: subCat.name,
                link: `/news/${subCat.slug}`,
              },
              posts: postsRes.data,
            };
          })
        );

        setGroupedPosts(grouped);
      } catch (error) {
        console.error("Error fetching WordPress data:", error);
      }
    };

    fetchData();
  }, []);
  const currentUrl = window.location.href;

  return (
    <>
      <Helmet>
        <title> The Future of News: Trends to Watch</title>
        <meta
          name="description"
          content="Stay informed with the latest news updates from around the world. Our comprehensive coverage keeps you connected to current events and trending stories."
        />
        <meta
          property="og:title"
          content="The Future of News: Trends to Watch"
        />
        <meta
          property="og:description"
          content="Stay informed with the latest news updates from around the world. Our comprehensive coverage keeps you connected to current events and trending stories."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${currentUrl}`} />
        <link rel="canonical" href={`${currentUrl}`} />
      </Helmet>
      <div className="relative w-full h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src="/news.webp"
          alt="News Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-10 flex flex-col justify-center gap-3 py-5 px-[2%] lg:px-[10%] h-full text-white bg-black/40">
          <h1 className="lg:text-5xl text-xl font-semibold">News</h1>
          <p className="lg:text-base text-xs leading-relaxed">
            Get the latest updates from Trust Finance Advisory. Discover our
            latest news, expert insights, company announcements, and how we
            empower your financial journey
          </p>
        </div>
      </div>
      <div className="lg:space-y-10 lg:px-8 my-4 mx-4">
        {groupedPosts.map(({ category, posts }, index) => (
          <div
            key={category.name}
            className={`flex flex-col ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-6`}>
            <div className="mt-6 w-full">
              <div className="text-3xl md:text-5xl font-bold text-center">
                <h2>{category.name}</h2>
              </div>
              {index % 2 === 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-6 mt-8 mb-8">
                  {posts.slice(0, 8).map((post) => (
                    <LatestBlogs key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-6 mt-8 mb-8">
                  {posts.slice(0, 6).map((post) => (
                    <HorizontalBlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              <div className="flex justify-center mt-3 mb-6">
                <button className="bg-[#E0E0E0] text-sm md:text-lg px-6 py-2 text-black border-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-[#FF822E] hover:text-white">
                  <a href={category.link} className="block">
                    See More
                  </a>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Subscribe />
      <Footer />
    </>
  );
}

const HorizontalBlogCard = ({ post }) => {
  return (
    <Link
      to={generateBlogUrl(post)}
      className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="w-full lg:w-1/2 h-48 lg:h-auto">
        <img
          src={
            post._embedded["wp:featuredmedia"]?.[0]?.source_url ||
            "https://via.placeholder.com/300x200.png?text=No+Image"
          }
          alt={
            post._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
            post.title.rendered
          }
          width={300}
          height={200}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col items-start justify-start gap-2 w-full lg:w-1/2">
        <h2
          className="text-lg font-bold text-gray-800 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <p
          className="text-sm text-gray-700 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: post.excerpt.rendered,
          }}
        />
        <span className="inline-block w-fit px-5 py-2 mt-2 border border-[#DEDEFF] hover:bg-[#FF822E] text-black hover:text-white rounded-full font-medium transition duration-300">
          Read More...
        </span>
      </div>
    </Link>
  );
};

const LatestBlogs = ({ post }) => {
  return (
    <Link
      to={generateBlogUrl(post)}
      className="bg-white overflow-hidden block transition-shadow duration-300">
      <img
        src={
          post._embedded["wp:featuredmedia"]?.[0]?.source_url ||
          "https://via.placeholder.com/300x200.png?text=No+Image"
        }
        alt={
          post._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
          post.title.rendered
        }
        width={300}
        height={200}
        className="object-cover rounded-lg w-full h-48"
        loading="lazy"
      />
      <div className="p-4">
        <h2
          className="text-lg font-bold text-gray-800 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <p
          className="text-sm text-gray-700 line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: post.excerpt.rendered,
          }}
        />
      </div>
    </Link>
  );
};
