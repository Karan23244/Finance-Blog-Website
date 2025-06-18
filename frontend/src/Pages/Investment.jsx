import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Footer from "../Common/Footer";
import Subscribe from "../Common/Subscribe";
import { Helmet } from "react-helmet-async";

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
const BASE_URL = "https://cms.trustfinancialadvisory.com/wp-json/wp/v2";
const currentUrl = window.location.href;

export default function Investment() {
  const [groupedPosts, setGroupedPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Step 1: Fetch the "Personal Finance" main category
        const mainCatRes = await axios.get(
          `${BASE_URL}/categories?slug=investment-and-wealth-growth` // Changed slug to "risk-management"
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
                link: `/investment-and-wealth-growth/${subCat.slug}`,
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

  return (
    <>
      <Helmet>
        <title>Grow Your Wealth: Investment Strategies & Guidance</title>
        <meta
          name="description"
          content="Discover expert strategies for investment and wealth growth. Unlock your financial potential with our insights and tools tailored for success."
        />
        <meta
          name="keywords"
          content="investment strategies, wealth creation, personal finance, how to invest, start investing, make money investing, secure financial future, achieve financial goals, grow your money, investment opportunities"/>
        <meta
          property="og:title"
          content="Grow Your Wealth: Investment Strategies & Guidance"
        />
        <meta
          property="og:description"
          content="Discover expert strategies for investment and wealth growth. Unlock your financial potential with our insights and tools tailored for success."
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${currentUrl}`} />
        <link rel="canonical" href={`${currentUrl}`} />
      </Helmet>
      <div className="relative w-full h-[350px] lg:h-[400px] overflow-hidden">
        <img
          src="/Investment.webp"
          alt="Investment Background"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="relative z-10 flex flex-col justify-center gap-3 py-5 px-[2%] lg:px-[10%] h-full text-white bg-black/40">
          <h1 className="lg:text-5xl text-xl font-semibold">
            Investment and Wealth Growth
          </h1>
          <p className="lg:text-base text-xs leading-relaxed">
            Building your wealth is a matter of good choices. At Trust Finance
            Advisory, the Investment and Wealth Growth page is your path to
            becoming a success story. Find proven Investment Strategies to grow
            your portfolio. Grow Your Long-Term Returns With Wealth Management
            Advice From the Experts. Discover highly profitable ventures with
            Real Estate Investment. And if you have a business and would like to
            start one, our Small Business Advisory services help your business
            the right financial decisions.
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
                <button className="bg-[#E0E0E0] text-sm md:text-lg px-6 py-2 text-black border-black rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-[#00008B] hover:text-white">
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
      <div className="w-full lg:w-1/3 h-48 lg:h-auto">
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
      <div className="p-4 flex flex-col items-start justify-start gap-2 w-full lg:w-2/3">
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
        <span className="inline-block w-fit px-5 py-2 mt-2 border border-[#DEDEFF] hover:bg-indigo-700 text-black hover:text-white rounded-full font-medium transition duration-300">
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
