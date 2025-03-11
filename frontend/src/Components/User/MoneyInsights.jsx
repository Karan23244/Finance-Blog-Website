import React, { memo } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const MoneyInsights = memo(({ data }) => {
  const topBlogs = data.slice(0, 3);

  return (
    <>
      <div class="max-w-7xl mx-auto p-6 overflow-hidden">
        <h2 className="text-[#FF822E] text-3xl font-bold mb-6">
          Money Insights
        </h2>
        {topBlogs?.length === 0 ? (
          <p className="text-gray-500 text-center h-screen">
            No matching blog posts found.
          </p>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side */}
            <div className="flex flex-col">
              <div className="overflow-hidden h-full flex flex-col">
                <Link
                  to={`/${createSlug(
                    topBlogs[0]?.categories[0].category_name
                  )}/${createSlug(topBlogs[0]?.Custom_url)}`}>
                  <img
                    src={
                      topBlogs[0]?.featured_image
                        ? `${import.meta.env.VITE_API_URL}/${
                            topBlogs[0]?.featured_image
                          }`
                        : "https://via.placeholder.com/300x200.png?text=No+Image"
                    }
                    alt={topBlogs[0].title}
                    className="lg:h-[300px] h-[200px] rounded-xl w-full object-cover"
                    loading="lazy"
                    defer
                  />
                </Link>
                <div className="py-4 flex flex-col justify-between flex-grow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FaUserCircle size={24} />
                      <p className="text-sm font-semibold text-gray-700">
                        {topBlogs[0].author_name}
                      </p>
                    </div>
                    <time
                      dateTime={topBlogs[0].date}
                      className="text-xs uppercase text-gray-400 font-semibold">
                      {new Date(
                        topBlogs[0].scheduleDate || topBlogs[0].created_at
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <div className="min-h-[50px]">
                    <h2 className="text-xl font-bold mt-4 text-gray-800 line-clamp-2">
                      {topBlogs[0].title}
                    </h2>
                  </div>
                  <h2 className="text-base text-gray-800 line-clamp-2">
                    {topBlogs[0].seoDescription}
                  </h2>
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
                    <Link
                      to={`/${createSlug(
                        blog?.categories[0].category_name
                      )}/${createSlug(blog?.Custom_url)}`}>
                      <img
                        src={
                          blog?.featured_image
                            ? `${import.meta.env.VITE_API_URL}/${
                                blog?.featured_image
                              }`
                            : "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={blog.title}
                        className="lg:h-[200px] h-[150px] w-full rounded-xl object-cover"
                        loading="lazy"
                        defer
                      />
                    </Link>
                  </div>
                  <div className="lg:p-4 flex-1 flex flex-col justify-between flex-grow">
                    <h2 className="text-lg font-bold text-gray-800 line-clamp-2">
                      {blog.title}
                    </h2>
                    <h2 className="text-base text-gray-800 line-clamp-2">
                      {blog.seoDescription}
                    </h2>
                    <div className="flex flex-col lg:flex-row items-start gap-2 justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <FaUserCircle size={20} />
                        <p className="text-sm font-semibold text-gray-700">
                          {blog.author_name}
                        </p>
                      </div>
                      <time
                        dateTime={blog.date}
                        className="text-xs uppercase text-gray-400 font-semibold">
                        {new Date(
                          blog.scheduleDate || blog.created_at
                        ).toLocaleDateString("en-US", {
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
//code for creating slug

const createSlug = (title) => {
  // Check if the title is not null and is a string before processing
  if (typeof title !== "string") {
    return ""; // Return an empty string or handle the case as needed
  }

  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};
export default MoneyInsights;
