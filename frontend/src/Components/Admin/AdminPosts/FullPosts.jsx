import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../New_Post/styles.css";
import usePageTracker from "../../../hooks/usePageTracker";
import Footer from "../../../Common/Footer";
import Subscribe from "../../../Common/Subscribe";
const FullPost = () => {
  // usePageTracker("blogs");
  const { param2 } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [toc, setToc] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [updatedContent, setUpdatedContent] = useState(null);
  const fetchedRef = useRef(false);
  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    setPost(null);
    setError(null);

    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/posts/${param2}`,
          { withCredentials: true }
        );
        setPost(response.data.data);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Unable to load the post. Please try again later.");
      }
    };

    fetchPost();
  }, [param2]);

  useEffect(() => {
    if (post) {
      // Generate TOC and add IDs to headings
      const parser = new DOMParser();
      const contentDocument = parser.parseFromString(
        decodeHtml(post.content || ""),
        "text/html"
      );
      const headings = Array.from(contentDocument.querySelectorAll("h2, h3"));
      const tocData = headings.map((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id; // Assign ID to each heading
        return {
          id,
          text: heading.textContent,
          level: heading.tagName.toLowerCase(),
        };
      });
      setToc(tocData);
      // Set the updated content only once
      const updatedContent = contentDocument.body.innerHTML;
      setUpdatedContent(updatedContent);
    }
  }, [post]);

  const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("h1, h2, h3");
    let currentSection = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection = section.id;
      }
    });
    setActiveSection(currentSection);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTOCClick = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for header or padding
        behavior: "smooth",
      });
    }
  };

if (!post) {
  return (
    <div className="mx-[2%] my-[20%] lg:my-[3%]">
      <div className="w-full md:p-8 flex flex-col justify-evenly">
        <div className="flex flex-col justify-center">
          <SkeletonText width="70%" height="2.5rem" className="mb-4" />
          <div className="flex items-center gap-4 mb-4">
            <SkeletonText width="20%" />
            <SkeletonText width="10%" />
            <SkeletonText width="30%" />
          </div>
          <SkeletonImage />
        </div>
      </div>

      <div className="mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row">
          <SkeletonTOC />
          <main className="w-full lg:w-3/4">
            <SkeletonContent />
          </main>
          <SkeletonAd />
        </div>
      </div>
    </div>
  );
}
  const createSlug = (title) => {
    if (typeof title !== "string") return "";
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
  };
  const imageUrl = post.featured_image
    ? `${import.meta.env.VITE_API_URL}/${post.featured_image}`
    : "";
  const adimageUrl = post.AdImage
    ? `${import.meta.env.VITE_API_URL}/${post.AdImage}`
    : "";
const currentUrl = window.location.href;

  return (
    <>
      <Helmet>
        <title>{post.seoTitle || "Blog Post"}</title>
        <meta name="description" content={post.seoDescription || ""} />
        <meta property="og:title" content={post.seoTitle || "Blog Post"} />
        <meta property="og:description" content={post.seoDescription || ""} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`${currentUrl}`}
        />
        <link
          rel="canonical"
          href={`${currentUrl}`}
        />
      </Helmet>
      <div className="mx-[2%] my-[20%] lg:my-[3%]">
        <div className="w-full md:p-8 flex flex-col justify-evenly">
          <div className="flex flex-col justify-center">
            <h1 className="lg:text-5xl text-xl font-semibold text-black mb-4">
              {post.title || "Untitled"}
            </h1>
            <div className="flex items-center text-gray-600 text-lg gap-4 mb-4">
              <p>By {post.author_name || "Unknown Author"}</p>
              <span>|</span>
              <p>
                {new Date(
                  post.scheduleDate || post.created_at
                ).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div>
              <img
                src={imageUrl}
                alt={post.title}
                className="rounded-lg shadow-lg w-full h-[400px] object-cover mb-8"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto px-4 lg:px-8">
          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar for Table of Contents */}
            <aside className="hidden lg:block w-1/4 pr-8 ">
              <div className="sticky top-16 p-4 overflow-auto border-r-2 border-black h-screen">
                <h2 className="text-3xl text-center font-semibold text-gray-900 mb-2">
                  Table of Contents
                </h2>
                <hr className="w-[60%] h-1 rounded-lg mx-auto bg-black mb-4" />
                <ul className="space-y-3">
                  {toc.map((item) => (
                    <li
                      key={item.id}
                      className={`padding-${
                        item.level === "h2"
                          ? "4"
                          : item.level === "h3"
                          ? "8"
                          : "0"
                      }
                      ${
                        activeSection === item.id
                          ? "font-bold text-blue-600"
                          : "text-gray-800"
                      }`}>
                      <a
                        href={`#${item.id}`}
                        className="hover:text-blue-800 hover:underline text-lg font-medium"
                        onClick={(e) => {
                          e.preventDefault();
                          handleTOCClick(item.id);
                        }}>
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Blog Content */}
            <main
              className={`w-full ${post.AdImage ? "lg:w-3/5" : "lg:w-3/4"}`}>
              <div
                className="custom-html text-gray-700 leading-relaxed mb-8 pt-4"
                dangerouslySetInnerHTML={{ __html: updatedContent }}
              />
            </main>
            {post.AdImage && (
              <aside className="lg:w-1/4">
                <div className="sticky top-16 p-4 border m-4 overflow-auto lg:h-screen">
                  <Link to={post.ad_url} target="_blank">
                    <img src={adimageUrl} alt="ad" />
                  </Link>
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
      <Subscribe/>
      <Footer />
    </>
  );
};

export default FullPost;


const SkeletonText = ({ width = "100%", height = "1.25rem", className = "" }) => (
  <div
    className={`bg-gray-300 animate-pulse rounded ${className}`}
    style={{ width, height }}
  ></div>
);

const SkeletonImage = ({ height = "400px" }) => (
  <div className="w-full rounded-lg bg-gray-300 animate-pulse mb-8" style={{ height }}></div>
);

const SkeletonTOC = () => (
  <div className="hidden lg:block w-1/4 pr-8">
    <div className="sticky top-16 p-4 border-r-2 border-black h-screen">
      <SkeletonText width="60%" height="2rem" className="mx-auto mb-4" />
      {[...Array(5)].map((_, i) => (
        <SkeletonText key={i} width="80%" className="mb-3" />
      ))}
    </div>
  </div>
);

const SkeletonContent = () => (
  <div className="space-y-4 pt-4">
    {[...Array(8)].map((_, i) => (
      <SkeletonText key={i} width={`${90 - i * 5}%`} />
    ))}
  </div>
);

const SkeletonAd = () => (
  <aside className="lg:w-1/4">
    <div className="sticky top-16 p-4 border m-4 overflow-auto lg:h-screen">
      <SkeletonImage height="300px" />
    </div>
  </aside>
);