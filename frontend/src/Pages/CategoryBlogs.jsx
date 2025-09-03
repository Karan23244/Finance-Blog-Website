import usePostsByCategory from "../hooks/usePostsByCategory";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Footer from "../Common/Footer";
import Subscribe from "../Common/Subscribe";
const CategoryPosts = () => {
  const {
    posts,
    loading,
    error,
    categoryName,
    categoryType,
    totalPages,
    currentPage,
    fetchPosts,
  } = usePostsByCategory();
  // usePageTracker("category");
  // Function to fetch SEO data based on category name
  const getSeoDetails = (category) => {
    const seoData = {
      "Financial Planning": {
        title:
          "Strategic Financial Planning & Analysis | Trust Financial Advisory",
        description:
          "Take control of your finances with strategic financial planning. Get a financial needs analysis to build wealth, manage risks, and achieve long-term success.",
        keywords:
          "strategic financial planning, comprehensive financial planning, financial needs analysis",
        shortDescription:
          "We are Trusted Financial Advisory with expertise in Financial Planning and we can help you achieve your Financial Goals. Crafting a comprehensive financial planning is essential to securing your finances, preferably, a strategy crafted by an analysis of your income, your expenses, your debts and your financial goals. So we think a key part of moving along your financial journey is knowing how to assess your financial needs. Allow us to work with you to carve out a customized plan that meets your lifestyle and goals.",
      },
      "Debt Management": {
        title:
          "Debt Management & Consolidation Loan | Trust Financial Advisory",
        description:
          "Struggling with debt? Compare Debt management plans & consolidation loans with our calculator to see savings. Take control & start your journey to financial freedom!",
        keywords:
          "debt consolidation loan, debt management program, debt management plan calculator",
        shortDescription:
          "Trust Finance Advisory, Debt Management department We also have useful tips and guides to assist you in content friends your debt and become financially free. Debt can be scary, but with the right knowledge and plan, you can get back in control of your budget and pave the way to a more secure financial future. You are the jumping off point for us to give you the tools you need to attack debt.",
      },
      "Education Planning": {
        title:
          "Education Planning & Savings Strategies | Trust Financial Advisory",
        description:
          "Plan for your child's education with our education planning strategies help you build a well-structured student education plan. Start planning today!",
        keywords:
          "Education planning, student education plan, children's education plan, personal education plan",
        shortDescription:
          "Welcome to Trust Financial Advisory, Education Planning Category We offer you the critical tools needed to tackle the education funding maze. Whether it's planning for your own education or saving for your kid's, there should be a comprehensive education plan in place so you're able to meet your goals without undue financial burden. We aim to provide you with the knowledge and resources to make informed decisions about financing education.",
      },
      "Tax Advisory": {
        title: "Chartered Tax Advisor | Trusted Tax & Financial Advisory",
        description:
          "Optimize taxes with a certified chartered tax advisor. Get expert tax & financial advisory for compliance, savings & a secure future.",
        keywords:
          "chartered tax advisor, tax and financial advisor, business tax advisory",
        shortDescription:
          "Welcome to the Tax Advisory category of Trust Financial Advisory. These days, staying up to date with your taxes is very important. Tax laws can be tricky to navigate, but your tax burden could be lowered if you have good advice and the facts of the laws at your disposal. We want you to have the knowledge and tools to make informed tax decisions that can improve your financial security. So if you require a chartered tax advisor, we can help you.",
      },
      "Investment Strategies": {
        title: "Smart Investment Strategies |  Best Investment Company",
        description:
          "Looking for the best investment company? Trust Financial Advisory offers expert investment strategies to grow and secure your wealth with customized plans.",
        keywords:
          "best investment company, investment strategies, factor investing",
        shortDescription:
          "Calling all finance enthusiasts, you have landed on our page at Trust Financial Advisory – Investment Strategies. As we try to navigate this landscape, we provide the resources to help you break into the world of investing. The best investment practices can help with wealth management and achieving it as a long-term goal be it an expert investor, or new to it. We aim to help you understand investment decisions you may want to consider in the context of your goals. All investors need a solid understanding of the different types of investment strategies.",
      },
      "Wealth Management": {
        title: "Find Top Wealth Management Firms | Smart Investing",
        description:
          "Partner with top wealth management firms for expert financial planning and growth strategies. Trust Financial Advisory provides top-tier investment solutions.",
        keywords:
          "best wealth management firms, financial planning and wealth management, wealth management strategies",
        shortDescription:
          "Trust Financial Advisory is another category of which talks about Wealth Management. Riches administration is a sort of all encompassing monetary preparation which includes speculation administration a well as legacy arranging and duty arranging. Our goal is to help make it easy for you to make the best decisions for you from a financial standpoint. There are many things here to unpack and most find they need professional help to do so successfully.",
      },
      "Real Estate Investment": {
        title:
          "Digital Real Estate & Investing for Beginners | Trust Advisory Finance",
        description:
          "New to real estate investing? Learn the basics of property and digital real estate to start building long-term wealth with smart investment strategies.",
        keywords:
          "real estate investing for beginners, digital real estate, commercial real estate investing",
        shortDescription:
          "This is the Real Estate Investing category of Trust Financial Advisory, covering everything beginners need to know about it. Real estate, when you leverage it properly, is one of the most powerful wealth-building tools available — granting the opportunity for income, appreciation and portfolio diversification. We aim to empower you to make informed decisions towards achieving your investment objective and deliver success in this market.",
      },
      "Small Business Advisory": {
        title: "Small Business Financial Advisor | Trust Financial Advisory",
        description:
          "Grow your small business with expert financial planning. Our trusted advisors help with  wealth management, tax strategies, and investment growth. Learn more now.",
        keywords:
          "small business financial advisor, small business consulting services, business strategy for small business",
        shortDescription:
          "You can find the Small Business Advisory category of Trust Financial Advisory, which has provided a lot of helpful resources for marketers and small business owners. New to business or looking to grow your company? We know the value of expert guidance, which is why we provide end-to-end small business consulting services.",
      },
      "Insurance Solutions": {
        title: "Business Insurance Solutions | Trust Financial Advisory",
        description:
          "Find the right insurance solutions for your personal and business needs. Trust Financial Advisory offers risk management strategies to safeguard your future.",
        keywords:
          "insurance solutions, affordable insurance solutions, business insurance solutions",
        shortDescription:
          "Here you are, in the Insurance Solutions section of Trust Financial Advisory, to secure valuable information. Insurance is an integral part of financial planning that acts as a shield against uncertainties & protects you and your family from financial burdens. We aim to make sure you have sufficient information and tools in hand to make well-informed choices regarding your insurance requirements. We provide hundreds of coverage options ranging from high net worth to low-cost business insurance that is custom built to fit your needs.",
      },
      "Retirement Planning": {
        title: "The Retirement Plan Strategies for a Comfortable Future",
        description:
          "Looking for the retirement plan? Trust Financial Advisory helps you plan a stress-free retirement. A life insurance retirement plan ensures security & peace of mind.",
        keywords:
          "the retirement plan, life insurance retirement plan, preparing for retirement",
        shortDescription:
          "Trust resources, financial advice resources for your retirement prep So it brings us back to understanding retirement preparation, and our mission is to help you. Retirement planning — a pivotal part of financial planning — means having money to live the way you wish. The reason we’re trying to give you this information and tools to make informed decisions about your retirement savings and income streams — but we should first warn you that there’s no right answer to those questions.",
      },
      "Market Insights & Economic Outlook": {
        title: "Navigating Market News: Expert Analysis for Investors",
        description:
          "Stay informed with Trust Finance Advisory's daily market updates and expert analysis. Discover how global trends can enhance your investments and wealth growth.",
        keywords: "",
        shortDescription:
          "Stay ahead with Trust Finance Advisory's daily market updates, expert economic analysis, and global financial insights. Understand how key trends impact your investments and wealth growth.",
      },
      "Investment & Wealth Growth": {
        title: "Elevate Your Wealth with Proven Strategies",
        description:
          "Elevate your investment game with Trust Finance Advisory. Get the latest news, effective strategies for wealth growth, and updates on real estate and small business finance.",
        keywords: "",
        shortDescription:
          "Discover the latest investment news, strategic approaches to wealth growth, and key updates on real estate and small business finance from Trust Finance Advisory. Grow your portfolio smarter.",
      },
      "Personal Finance & Financial Planning": {
        title: "Mastering Personal Finance: Your Path to Wealth",
        description:
          "Master your financial future with Trust Finance Advisory. Access vital personal finance news, practical debt management tips, education planning, and tax advisory updates.",
        keywords: "",
        shortDescription:
          "Get essential personal finance news, practical tips for debt management, education planning, and critical tax advisory updates from Trust Finance Advisory. Master your financial future.",
      },
      "Risk Management & Protection": {
        title:
          "Unlocking Financial Security: The Importance of Estate Planning",
        description:
          "Get the latest news on insurance, retirement planning, and cybersecurity to navigate financial risks effectively.",
        keywords: "",
        shortDescription:
          "Navigate financial risks confidently with Trust Finance Advisory's news on comprehensive insurance solutions, strategic retirement planning, and vital cybersecurity alerts. Protect your assets and secure your future.",
      },
    };

    return (
      seoData[category] || {
        title:
          "Finance Newsletter for Smart Investors | Trust financial advisory",
        description:
          "Get exclusive insights from our finance newsletter! Discover global investment solutions, expert analysis, and proven wealth management strategies.",
        keywords:
          "finance newsletter, global investment solutions, investment solutions, financial accounting advisory services",
      }
    );
  };
  const { title, description, keywords, shortDescription, html } =
    getSeoDetails(categoryName);

  const currentUrl = window.location.href;

  if (loading)
    return (
      <div className="text-gray-500 text-center h-screen lg:mt-[7%]">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-gray-500 text-center h-screen lg:mt-[7%]">
        Error: {error.message}
      </div>
    );
  // Sort posts by view_count in descending order
  // Ensure posts is an array before sorting
  const sortedPosts = Array.isArray(posts)
    ? [...posts].sort((a, b) => b.view_count - a.view_count)
    : [];

  const mostViewedPost = sortedPosts.length > 0 ? sortedPosts[0] : null;
  const remainingPosts = sortedPosts.slice(1);

  // UI for Upgrade Yourself category
  const PersonalFinanceUI = () => (
    <>
      <div
        className="w-full lg:h-[250px] h-[250px] flex flex-col items-center justify-center lg:gap-5 gap-3 py-5 lg:px-[10%] px-[2%]"
        style={{
          backgroundImage: ` url('/financial.webp')`,
          backgroundSize: "contain",
          backgroundAttachment: "fixed",
        }}>
        <h1 className="lg:text-5xl text-lg font-semibold text-center text-[#FF822E]">
          {categoryName}
        </h1>
        <p className="lg:text-lg text-xs text-white text-justify space-y-4 leading-relaxed">
          {shortDescription}
        </p>
      </div>
      <div className="lg:px-[15%] lg:py-[2%] px-[2%] py-[2%] bg-opacity-30">
        {mostViewedPost && (
          <div className="mb-6">
            <h2
              className="text-lg font-bold my-2 line-clamp-2"
              dangerouslySetInnerHTML={{
                __html: mostViewedPost.title.rendered,
              }}
            />
            <Link to={generateBlogUrl(mostViewedPost)} className="block">
              <img
                src={
                  mostViewedPost._embedded["wp:featuredmedia"]?.[0]?.source_url
                }
                alt={
                  mostViewedPost._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                  mostViewedPost.title.rendered
                }
                className="w-full h-[300px] object-cover mb-4"
                loading="lazy"
              />
              <p
                className="text-sm text-gray-700 line-clamp-2"
                dangerouslySetInnerHTML={{
                  __html: mostViewedPost.excerpt.rendered,
                }}
              />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {remainingPosts.map((post) => (
            <Link to={generateBlogUrl(post)} key={post.id}>
              <div className="bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <img
                  src={
                    post._embedded["wp:featuredmedia"]?.[0]?.source_url ||
                    "https://via.placeholder.com/300x200.png?text=No+Image"
                  }
                  alt={
                    post._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                    post.title.rendered
                  }
                  className="w-full h-40 object-cover mb-2"
                  loading="lazy"
                />
                <div className="p-2">
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
                  <Link
                    to={generateBlogUrl(post)}
                    className="text-[#00008B] hover:underline inline-block">
                    Read More...
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-3">
            <button
              disabled={currentPage === 1}
              onClick={() => fetchPosts(currentPage - 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#FF822E] hover:bg-[#ff6b00] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              <FaChevronLeft className="text-lg" />
              Prev
            </button>

            <span className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-100 rounded-lg shadow-md">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => fetchPosts(currentPage + 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#FF822E] hover:bg-[#ff6b00] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              Next
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        )}

        {/* <div className="leading-relaxed py-5">
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div> */}
      </div>
    </>
  );

  const InvestmentUI = () => (
    <>
      {/* Category Title Section */}
      <div className="w-full lg:h-[200px] h-[150px] bg-cover bg-center flex flex-col items-center justify-center lg:gap-5 gap-3 py-[7%] lg:px-[10%] px-[2%]">
        <h1 className="lg:text-5xl text-lg font-semibold text-center text-[#FF822E]">
          {categoryName}
        </h1>
        <p className="lg:text-lg text-xs text-black text-justify space-y-4 leading-relaxed">
          {shortDescription}
        </p>
      </div>

      {/* Posts Section */}
      <div className="lg:mx-[10%] mx-[3%] my-[5%] lg:my-[2%]">
        {posts && posts.length > 0 && (
          <>
            {/* Top Section: Featured Post and Smaller Cards */}
            <div className="grid lg:gap-4 gap-2 lg:grid-cols-3">
              {/* Featured Post (Big Card) */}
              <div className="relative lg:col-span-2 order-1 lg:order-none">
                <Link
                  to={generateBlogUrl(posts[0])}
                  className="block relative h-full">
                  <img
                    src={
                      posts[0]._embedded["wp:featuredmedia"]?.[0]?.source_url ||
                      "https://via.placeholder.com/300x200.png?text=No+Image"
                    }
                    alt={
                      posts[0]._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                      posts[0].title.rendered
                    }
                    className="w-full lg:h-[450px] h-[250px] object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3
                      className="lg:text-2xl text-lg line-clamp-2 font-semibold"
                      dangerouslySetInnerHTML={{
                        __html: posts[0].title.rendered,
                      }}
                    />

                    <p
                      className="lg:text-lg text-base mt-2 lg:line-clamp-3 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: posts[0].excerpt.rendered,
                      }}
                    />
                  </div>
                </Link>
              </div>

              {/* Smaller Cards */}
              <div className="flex flex-col lg:gap-4 gap-2 order-2 lg:order-none lg:h-[450px]">
                {posts.slice(1, 3).map((post) => (
                  <div
                    key={post.id}
                    className="relative flex flex-col flex-1 overflow-hidden bg-white">
                    <Link
                      to={generateBlogUrl(post)}
                      className="block relative h-full">
                      <img
                        src={
                          post._embedded["wp:featuredmedia"]?.[0]?.source_url ||
                          "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={
                          post._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                          post.title.rendered
                        }
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3
                          className="lg:text-lg text-base font-semibold"
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />
                        <p
                          className="lg:text-base text-sm mt-1 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered,
                          }}
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <hr className=" border-gray-300 my-5" />
            {/* Remaining Posts Section */}
            <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-6 gap-2 lg:mt-8 pb-8">
              {posts.slice(3).map((post) => (
                <>
                  <Link to={generateBlogUrl(post)} key={post.id}>
                    <div className="flex flex-row items-start lg:gap-10 gap-2">
                      <div className="w-5/12">
                        <img
                          src={
                            post._embedded["wp:featuredmedia"]?.[0]
                              ?.source_url ||
                            "https://via.placeholder.com/300x200.png?text=No+Image"
                          }
                          alt={
                            post._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                            post.title.rendered
                          }
                          className="w-full lg:h-[150px] h-[130px] object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="w-2/3">
                        <h3
                          className="lg:text-lg text-base font-semibold line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />
                        <p
                          className="lg:text-base text-sm text-gray-600 mt-2 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered,
                          }}
                        />
                        <Link
                          to={generateBlogUrl(post)}
                          className="text-blue-600 hover:underline mt-2 inline-block">
                          Read More...
                        </Link>
                      </div>
                    </div>
                  </Link>
                </>
              ))}
            </div>
          </>
        )}
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-3">
            <button
              disabled={currentPage === 1}
              onClick={() => fetchPosts(currentPage - 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#FF822E] hover:bg-[#ff6b00] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              <FaChevronLeft className="text-lg" />
              Prev
            </button>

            <span className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-100 rounded-lg shadow-md">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => fetchPosts(currentPage + 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#FF822E] hover:bg-[#ff6b00] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              Next
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </>
  );
  const RiskManagmentUI = () => (
    <>
      {/* Category Title Section */}
      <div
        className="w-full lg:h-[200px] h-[150px] flex items-center flex-col justify-center lg:gap-5 gap-3 py-[7%] lg:px-[10%] px-[2%]"
        style={{
          backgroundImage: ` url('/risk.webp')`,
          backgroundSize: "contain",
          backgroundAttachment: "fixed",
        }}>
        <h1 className="lg:text-5xl text-lg: font-semibold text-center text-[#FF822E]">
          {categoryName}
        </h1>
        <p className="lg:text-lg text-xs text-white text-justify space-y-4 leading-relaxed">
          {shortDescription}
        </p>
      </div>

      {/* Posts Section */}
      <div className="lg:mx-[10%] mx-[3%] my-[5%] lg:my-[2%]">
        {posts && posts.length > 0 && (
          <>
            {/* Remaining Posts Section */}
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-6 gap-2 lg:mt-8 pb-8">
              {posts.map((post) => (
                <>
                  <Link to={generateBlogUrl(post)}>
                    <div className="bg-white border rounded-xl shadow-md hover:shadow-lg overflow-hidden">
                      <img
                        src={
                          post._embedded["wp:featuredmedia"]?.[0]?.source_url ||
                          "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={
                          post._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                          post.title.rendered
                        }
                        className="h-[250px] w-full object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                post._embedded.author?.[0]?.avatar_urls?.[
                                  "48"
                                ] || "https://via.placeholder.com/48"
                              }
                              alt={post._embedded.author?.[0]?.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <p className="text-sm font-semibold text-gray-700">
                              {post._embedded.author?.[0]?.name}
                            </p>
                          </div>
                          <time
                            dateTime={post.date}
                            className="text-xs text-gray-400 font-semibold">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <h2
                          className="text-lg font-bold text-gray-800 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />
                        <p
                          className="text-sm text-gray-700 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered,
                          }}
                        />
                        <Link
                          to={generateBlogUrl(post)}
                          className="text-white border border-white py-2
                        rounded-lg lg:px-8 px-4 bg-[#FF822E] mt-2 inline-block">
                          Read More...
                        </Link>
                      </div>
                    </div>
                  </Link>
                </>
              ))}
            </div>
          </>
        )}
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-3">
            <button
              disabled={currentPage === 1}
              onClick={() => fetchPosts(currentPage - 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#FF822E] hover:bg-[#ff6b00] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              <FaChevronLeft className="text-lg" />
              Prev
            </button>

            <span className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-100 rounded-lg shadow-md">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => fetchPosts(currentPage + 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#FF822E] hover:bg-[#ff6b00] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              Next
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </>
  );
  const News = () => (
    <>
      {/* Category Title Section */}
      <div
        className="w-full lg:h-[200px] h-[150px] flex items-center flex-col justify-center lg:gap-5 gap-3 py-[7%] lg:px-[10%] px-[2%]"
        style={{
          backgroundImage: ` url('/risk.webp')`,
          backgroundSize: "contain",
          backgroundAttachment: "fixed",
        }}>
        <h1 className="lg:text-5xl text-lg: font-semibold text-center text-[#FF822E]">
          {categoryName}
        </h1>
        <p className="lg:text-lg text-xs text-white text-justify space-y-4 leading-relaxed">
          {shortDescription}
        </p>
      </div>

      {/* Posts Section */}
      <div className="lg:mx-[10%] mx-[3%] my-[5%] lg:my-[2%]">
        {posts && posts.length > 0 && (
          <>
            {/* Remaining Posts Section */}
            <div className="grid lg:grid-cols-3 grid-cols-1 lg:gap-6 gap-2 lg:mt-8 pb-8">
              {posts.map((post) => (
                <>
                  <Link to={generateBlogUrl(post)}>
                    <div className="bg-white border rounded-xl shadow-md hover:shadow-lg overflow-hidden">
                      <img
                        src={
                          post._embedded["wp:featuredmedia"]?.[0]?.source_url ||
                          "https://via.placeholder.com/300x200.png?text=No+Image"
                        }
                        alt={
                          post._embedded["wp:featuredmedia"]?.[0]?.alt_text ||
                          post.title.rendered
                        }
                        className="h-[250px] w-full object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                post._embedded.author?.[0]?.avatar_urls?.[
                                  "48"
                                ] || "https://via.placeholder.com/48"
                              }
                              alt={post._embedded.author?.[0]?.name}
                              className="w-6 h-6 rounded-full"
                            />
                            <p className="text-sm font-semibold text-gray-700">
                              {post._embedded.author?.[0]?.name}
                            </p>
                          </div>
                          <time
                            dateTime={post.date}
                            className="text-xs text-gray-400 font-semibold">
                            {new Date(post.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </time>
                        </div>
                        <h2
                          className="text-lg font-bold text-gray-800 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: post.title.rendered,
                          }}
                        />
                        <p
                          className="text-sm text-gray-700 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered,
                          }}
                        />
                        <Link
                          to={generateBlogUrl(post)}
                          className="text-white border border-white py-2
                        rounded-lg lg:px-8 px-4 bg-[#FF822E] mt-2 inline-block">
                          Read More...
                        </Link>
                      </div>
                    </div>
                  </Link>
                </>
              ))}
            </div>
          </>
        )}
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-6 space-x-3">
            <button
              disabled={currentPage === 1}
              onClick={() => fetchPosts(currentPage - 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#FF822E] hover:bg-[#ff6b00] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              <FaChevronLeft className="text-lg" />
              Prev
            </button>

            <span className="px-4 py-2 text-lg font-semibold text-gray-800 bg-gray-100 rounded-lg shadow-md">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => fetchPosts(currentPage + 1)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-[#FF822E] hover:bg-[#ff6b00] rounded-full shadow-md transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
              Next
              <FaChevronRight className="text-lg" />
            </button>
          </div>
        )}
      </div>
    </>
  );
  return (
    <>
      {/* React Helmet for SEO */}
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="Category Blogs" />
        <meta property="og:url" content={currentUrl} />
        <link rel="canonical" href={currentUrl} />
      </Helmet>
      {categoryType === "Personal Finance" && <PersonalFinanceUI />}
      {categoryType === "Investment And Wealth Growth" && <InvestmentUI />}
      {categoryType === "Risk Management" && <RiskManagmentUI />}
      {categoryType === "News" && <News />}
      <Subscribe />
      <Footer />
    </>
  );
};

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

export default CategoryPosts;
