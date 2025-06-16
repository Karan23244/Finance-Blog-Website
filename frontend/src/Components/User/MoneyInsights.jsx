import React, { memo } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const MoneyInsights = memo(({ data }) => {
  const topBlogs = data.slice(0, 3);

  return (
    <>
      <div className="max-w-7xl mx-auto p-6 overflow-hidden h-auto min-h-[500px]">
        <h2 className="text-[#FF822E] text-3xl font-bold mb-6">
          Money Insights
        </h2>
        {topBlogs?.length === 0 ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <p className="text-gray-500 text-center">Loading...</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side */}
            <div className="flex flex-col">
              <Link to={generateBlogUrl(topBlogs[0])}>
                <img
                  src={
                    topBlogs[0]._embedded["wp:featuredmedia"]?.[0]?.source_url
                  }
                  alt={
                    topBlogs[0]._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                    topBlogs[0].title.rendered
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
                      src={
                        topBlogs[0]._embedded.author?.[0]?.avatar_urls?.["48"]
                      }
                      alt={topBlogs[0]._embedded.author?.[0]?.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <p className="text-sm font-semibold text-gray-700">
                      {topBlogs[0]._embedded.author?.[0]?.name}
                    </p>
                  </div>
                  <div>
                    <time
                      dateTime={topBlogs[0].date}
                      className="text-xs text-gray-400 font-semibold">
                      {new Date(topBlogs[0].date).toLocaleDateString("en-US", {
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
                      __html: topBlogs[0].title.rendered,
                    }}
                  />
                  <p
                    className="text-sm line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: topBlogs[0].excerpt.rendered,
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Right Side */}
            <div className="flex flex-col gap-6">
              {topBlogs.slice(1).map((blog) => (
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
  const term = blog?._embedded?.["wp:term"]?.[0]?.[0];
  const fullLink = term?.link || "";
  const pathParts = fullLink.split("/").filter(Boolean);

  const mainCategorySlug =
    pathParts.length >= 2 ? pathParts[pathParts.length - 2] : "uncategorized";
  const assignedCategorySlug = term?.slug || "uncategorized";
  const postSlug = blog?.slug || "post";

  return `/${mainCategorySlug}/${assignedCategorySlug}/${postSlug}`;
}

export default MoneyInsights;
