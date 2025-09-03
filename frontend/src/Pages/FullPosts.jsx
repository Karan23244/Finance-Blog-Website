import React, { useEffect, useState, Suspense } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "../Components/Admin/New_Post/styles.css";
import usePageTracker from "../hooks/usePageTracker";
const Subscribe = React.lazy(() => import("../Common/Subscribe"));
const Footer = React.lazy(() => import("../Common/Footer"));
const FullPost = () => {
  // usePageTracker("blogs");
  const { param3 } = useParams();
  const [post, setPost] = useState(null);
  const [toc, setToc] = useState([]);
  const [activeSection, setActiveSection] = useState("");
  const [updatedContent, setUpdatedContent] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://cms.trustfinancialadvisory.com/wp-json/wp/v2/posts?slug=${param3}&_embed`
        );
        const data = await response.json();
        setPost(data[0]);
        // setLoading(false);
      } catch (error) {
        console.error("Error fetching post:", error);
        // setLoading(false);
      }
    };

    fetchPost();
  }, [param3]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -60% 0px", // triggers when heading is in view
        threshold: 0.1,
      }
    );

    const sections = document.querySelectorAll("h2, h3");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [updatedContent]);

  useEffect(() => {
    if (post) {
      // Generate TOC and add IDs to headings
      const parser = new DOMParser();
      const contentDocument = parser.parseFromString(
        decodeHtml(post.content.rendered || ""),
        "text/html"
      );
      const headings = Array.from(contentDocument.querySelectorAll("h2"));
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
      const yOffset = -80; // height of sticky navbar
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
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
  // const createSlug = (title) => {
  //   if (typeof title !== "string") return "";
  //   return title
  //     .toLowerCase()
  //     .trim()
  //     .replace(/[^\w\s-]/g, "")
  //     .replace(/\s+/g, "-");
  // };
  // const imageUrl = post.featured_image
  //   ? `${import.meta.env.VITE_API_URL}/${post.featured_image}`
  //   : "";
  // const adimageUrl = post.AdImage
  //   ? `${import.meta.env.VITE_API_URL}/${post.AdImage}`
  //   : "";
  const currentUrl = window.location.href;

  return (
    <>
      <Helmet>
        <title>{post.title.rendered || "Blog Post"}</title>
        <meta
          name="description"
          content={
            post.excerpt.rendered
              ? post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 120)
              : ""
          }
        />
        <meta
          property="og:title"
          content={post.title.rendered || "Blog Post"}
        />
        <meta
          property="og:description"
          content={
            post.excerpt.rendered
              ? post.excerpt.rendered.replace(/<[^>]+>/g, "").slice(0, 120)
              : ""
          }
        />
        <meta
          property="og:image"
          content={post._embedded["wp:featuredmedia"]?.[0]?.source_url}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`${currentUrl}`} />
        <link rel="canonical" href={`${currentUrl}`} />
        {post._embedded["wp:featuredmedia"]?.[0]?.source_url && (
          <link
            rel="preload"
            as="image"
            href={post._embedded["wp:featuredmedia"][0].source_url}
            fetchpriority="high"
          />
        )}
      </Helmet>
      <div className="mx-auto px-4 lg:px-8 ">
        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row">
          {/* Sidebar for Table of Contents */}
          <aside className="hidden lg:block w-1/4 pr-8">
            <div className="sticky top-20 flex flex-col h-[calc(100vh-5rem)] border-r-2 border-black">
              <h2 className="text-2xl text-center font-semibold text-gray-900 mb-2 mt-10">
                Table of Contents
              </h2>
              <hr className="w-[60%] h-1 rounded-lg mx-auto bg-black mb-4" />
              {/* scrollable list */}
              <ul className="space-y-3 overflow-y-auto pr-2">
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className={`ml-${
                      item.level === "h2"
                        ? "2"
                        : item.level === "h3"
                        ? "6"
                        : "0"
                    } ${
                      activeSection === item.id
                        ? "font-bold text-blue-600"
                        : "text-gray-800"
                    }`}>
                    <a
                      href={`#${item.id}`}
                      className="hover:text-blue-800 hover:underline text-lg font-medium block"
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
          <main className="lg:w-3/5">
            <div className="mb-6">
              <h1
                className="text-3xl font-bold mb-4 mt-10"
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              />
            </div>

            <div className="flex items-center gap-6 mb-8 text-gray-600">
              <p className="font-semibold text-lg hover:text-indigo-600 transition-colors cursor-default">
                By {post._embedded.author?.[0]?.name}
              </p>
              <div className="border-l-2 border-gray-300 pl-4">
                <p className="font-medium text-lg">
                  <time
                    dateTime={post.date}
                    className="text-sm text-black font-semibold">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </p>
              </div>
            </div>

            <div className="mb-8 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src={post._embedded["wp:featuredmedia"]?.[0]?.source_url}
                alt={post.title.rendered}
                width={600}
                height={400}
                className="object-cover w-full h-auto"
              />
            </div>

            <div
              className="custom-html text-gray-700 leading-relaxed mb-8 pt-4"
              dangerouslySetInnerHTML={{
                __html: updatedContent || post.content.rendered,
              }}
            />
          </main>

          {/* {post.AdImage && (
              <aside className="lg:w-1/4">
                <div className="sticky top-16 p-4 border m-4 overflow-auto lg:h-screen">
                  <Link to={post.ad_url} target="_blank">
                    <img src={adimageUrl} alt="ad" />
                  </Link>
                </div>
              </aside>
            )} */}
        </div>
      </div>
      <Suspense fallback={<div />}>
        <Subscribe />
        <Footer />
      </Suspense>
    </>
  );
};

export default FullPost;

const SkeletonText = ({
  width = "100%",
  height = "1.25rem",
  className = "",
}) => (
  <div
    className={`bg-gray-300 animate-pulse rounded ${className}`}
    style={{ width, height }}></div>
);

const SkeletonImage = ({ height = "400px" }) => (
  <div
    className="w-full rounded-lg bg-gray-300 animate-pulse mb-8"
    style={{ height }}></div>
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
