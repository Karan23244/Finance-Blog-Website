import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaUserCircle } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const TopStrategies = memo(({ data }) => {
  const topBlogs = data.slice(0, 6);
  return (
    <>
      <div className="max-w-7xl mx-auto p-6">
        <h2 className="text-[#FF822E] text-3xl font-bold mb-6">
          Top Strategies
        </h2>
        {topBlogs?.length === 0 ? (
          <p className="text-gray-500 text-center h-screen">
            No matching blog posts found.
          </p>
        ) : (
          <div className="grid lg:grid-cols-[70%_30%] gap-8">
            {/* Left Side */}
            <div className="flex flex-col lg:flex-row gap-6">
              {topBlogs.slice(0, 2).map((blog) => (
                <div key={blog.id} className="flex-1 flex flex-col">
                  <div className="overflow-hidden h-full flex flex-col">
                    <Link to={generateBlogUrl(blog)}>
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
                    </Link>
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
                        className="text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: blog.excerpt.rendered,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Right Side */}
            <div className="flex flex-col gap-6">
              {topBlogs.slice(2).map((blog) => (
                <div
                  key={blog.id}
                  className="overflow-hidden flex flex-row gap-4 pb-4 border-b border-gray-300">
                  <div className="flex-shrink-0 w-1/3">
                    <Link to={generateBlogUrl(blog)}>
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
                    </Link>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
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

//code for creating slug

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

export default TopStrategies;
