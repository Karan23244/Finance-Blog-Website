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
                        loading="lazy"
                        className="lg:h-[350px] h-[200px] rounded-xl w-full object-cover"
                      />
                    </Link>
                    <div className="py-4 flex flex-col justify-between flex-grow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FaUserCircle size={24} />
                          <p className="text-sm font-semibold text-gray-700">
                            {blog.author_name}
                          </p>
                        </div>
                        <time
                          dateTime={blog.scheduleDate || blog.created_at}
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
                      <h2 className="text-xl font-bold mt-4 text-gray-800 line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-sm line-clamp-2">
                        {blog.seoDescription}
                      </p>
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
                        loading="lazy"
                        className="h-[100px] w-full rounded-xl object-cover"
                      />
                    </Link>
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FaUserCircle size={20} />
                        <p className="text-sm font-semibold text-gray-700">
                          {blog.author_name}
                        </p>
                      </div>
                      <time
                        dateTime={blog.scheduleDate || blog.created_at}
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
                    <h2 className="text-lg font-bold text-gray-800 mt-2 line-clamp-2">
                      {blog.title}
                    </h2>
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

export default TopStrategies;
