import React, { memo } from "react";
import { Link } from "react-router-dom";

const Content = memo(() => {
  return (
    <>
      <div className="w-full flex flex-col items-center pt-6">
        <div className="relative w-full max-w-7xl">
          <div className="flex flex-col gap-8 px-4 lg:px-0 py-8">
            {/* Section 1 */}
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="lg:w-3/5">
                <h3 className="text-2xl font-semibold text-black text-center lg:text-left mb-4">
                  Navigating Tax Season
                </h3>
                <p className="text-black leading-relaxed text-justify">
                  Tax season does not necessarily have to be daunting, though.
                  Our articles are here to guide you through the maze of tax
                  regulations and policies. We provide advice on{" "}
                  <Link
                    to={`https://trustfinancialadvisory.com/personal-finance/tax-advisory`}
                    className="font-medium text-blue-600 cursor-pointer hover:underline">
                    tax planning
                  </Link>
                  , optimizing deductions, and understanding tax credit. Our
                  posts simplify the tax process so that you'll be adequately
                  organized when it is time to file your taxes. Through our
                  expert analysis, you may reduce your tax burden and keep more
                  of your hard-earned cash. Trust Financial Advisory also offers
                  comprehensive financial accounting advisory services to help
                  you navigate tax season with ease.
                </p>
              </div>
              <div className="lg:w-2/5">
                <img
                  src="content1.webp"
                  alt="Navigating Tax Season"
                  loading="lazy"
                  className="lg:w-full lg:h-[200px] object-cover rounded-lg shadow-lg transition-transform duration-300"
                />
              </div>
            </div>

            {/* Section 2 */}
            <div className="flex lg:flex-row flex-col-reverse items-center gap-6">
              <div className="lg:w-2/5">
                <img
                  src="content2.webp"
                  alt="Smart Investment Strategies"
                  loading="lazy"
                  className="lg:w-full lg:h-[200px] object-cover rounded-lg shadow-lg transition-transform duration-300"
                />
              </div>
              <div className="lg:w-3/5 text-center lg:text-left">
                <h3 className="text-2xl font-semibold text-black mb-4">
                  Smart Investment Strategies
                </h3>
                <p className="text-black leading-relaxed text-justify">
                  Investing is a major element of wealth production, and on our
                  blog we have an awesome amount of detail on specific sorts of
                  investments. We discuss items like the nature of the stock
                  market, mutual funds,{" "}
                  <Link
                    to={`https://trustfinancialadvisory.com/investment-and-wealth-growth/real-estate-investment`}
                    className="font-medium text-blue-600 cursor-pointer hover:underline">
                    how to invest in real estate
                  </Link>
                  , and retirement investing. Our vision is to aid you in
                  investing wisely based totally for your financial situation
                  and risk exposure. Whether it's your first time investing or
                  you're experienced, our pages include useful content to assist
                  improve your{" "}
                  <Link
                    to={`https://trustfinancialadvisory.com/investment-and-wealth-growth/investment-strategies`}
                    className="font-medium text-blue-600 cursor-pointer hover:underline">
                    investment strategy
                  </Link>
                  . Discover our range of investment solutions tailored to your
                  needs.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#F3F3F3] py-10 px-4 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="border border-orange-500 bg-white p-6 rounded-lg shadow-md">
              <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
                Empowering Financial Literacy
              </h3>
              <p className="text-black leading-relaxed text-justify">
                Financial literacy is the name of the game for smart financial
                choices. Our blog has de-mystify complicated financial facts so
                you can get it in plain English. From getting an education on
                credit ratings to cracking the code on{" "}
                <Link
                  to={`https://trustfinancialadvisory.com/risk-management/insurance-solutions`}
                  className="font-medium text-blue-600 cursor-pointer hover:underline">
                  investment solutions
                </Link>
                , we aim to give you the knowledge to take command of your
                financial life. We believe informed readers are empowered
                readers, and our goal is to make{" "}
                <Link
                  to={`https://trustfinancialadvisory.com/personal-finance/financial-planning`}
                  className="font-medium text-blue-600 cursor-pointer hover:underline">
                  financial education{" "}
                </Link>
                a vital right. Subscribe to our finance newsletter for regular
                updates and global investment solutions insights.
              </p>
            </div>
            <div className="border border-orange-500 bg-white p-6 rounded-lg shadow-md ">
              <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
                Practical Tips for Debt Management
              </h3>
              <p className="text-black leading-relaxed text-justify">
                <Link
                  to={`https://trustfinancialadvisory.com/personal-finance/debt-management`}
                  className="font-medium text-blue-600 cursor-pointer hover:underline">
                  Debt management
                </Link>{" "}
                can be a hard experience, however our blog affords useful tips
                and advice to assist you in taking back control of your
                finances. We discuss budgeting techniques, debt repayment
                options, and the need for credit score control. Our articles
                include useful advice that you could use right away, assisting
                you in paying off your debt and achieving better financial
                health. For expert financial accounting advisory services,
                consider reaching out to Trust Financial Advisory.
              </p>
            </div>
            <div className="border border-orange-500 bg-white p-6 rounded-lg shadow-md">
              <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
                Planning for Education Expenses
              </h3>
              <p className="text-black leading-relaxed text-justify">
                Investing in education is among the most important choices you
                can make for yourself or your children. Our blog contains
                information on{" "}
                <Link
                  to={`https://trustfinancialadvisory.com/personal-finance/education-planning`}
                  className="font-medium text-blue-600 cursor-pointer hover:underline">
                  education planning
                </Link>
                , such as college savings and understanding financial aid
                possibilities. We discuss different savings strategies and offer
                information on how to make education affordable. With our
                advice, you can make education a reachable objective for your
                family. Explore our global investment solutions for securing
                your child's future.
              </p>
            </div>
          </div>
        </div>
        <div className="relative w-full max-w-7xl py-6">
          <div className="relative flex flex-col p-5 bg-white rounded-lg shadow-lg">
            {/* Decorative Borders */}
            <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-orange-400 rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-orange-400 rounded-bl-lg"></div>

            {/* Content */}
            <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
              Join Our Community
            </h3>
            <p className="text-gray-700 leading-relaxed text-justify">
              We invite you to become part of our readers' community that is
              dedicated to enhancing its financial literacy and success. Join
              our blog to get the most recent articles, advice, and tools
              straight to your inbox. Comment and discuss with us because we
              believe that the sharing of information and experience will
              contribute to increased financial empowerment. Benefit from our
              global investment solutions and connect with like-minded
              individuals.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-8 py-8">
            <div className="relative flex flex-col p-5 bg-white rounded-lg shadow-lg">
              {/* Decorative Borders */}
              <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-orange-400 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-orange-400 rounded-bl-lg"></div>

              {/* Content */}
              <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
                Retirement Planning Insights
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                <Link
                  to={`https://trustfinancialadvisory.com/risk-management/retirement-planning`}
                  className="font-medium text-blue-600 cursor-pointer hover:underline">
                  Retirement planning
                </Link>{" "}
                is vital for securing a comfortable future. Our articles take
                you through the retirement planning process, from evaluating
                your savings today to projecting your costs tomorrow. We cover
                different kinds of retirement accounts, including 401(k)s and
                IRAs, and offer advice on how to develop a withdrawing strategy
                in an effort to work for you. With our guides, you can take
                action now to ensure financial security in retirement. Plan your
                retirement with our expert investment solutions and secure your
                financial future.
              </p>
            </div>
            <div className="relative flex flex-col p-5 bg-white rounded-lg shadow-lg">
              {/* Decorative Borders */}
              <div className="absolute top-0 right-0 w-28 h-28 border-t-4 border-r-4 border-orange-400 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-28 h-28 border-b-4 border-l-4 border-orange-400 rounded-bl-lg"></div>

              {/* Content */}
              <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
                Building Wealth Through Financial Education
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                At Trust Financial Advisory, we feel that building wealth in
                finances is the stepping stone to prosperity. Our blog is
                committed to giving you the resources and tools you require to
                make smart financial decisions. We update our material regularly
                to keep you posted on cutting-edge trends and emerging
                information in personal finance, so that you can remain relevant
                and informed. Sign up for our finance newsletter to stay ahead
                of the curve.
              </p>
            </div>
          </div>
          <div className="flex flex-col py-5 p-5 lg:p-0">
            <h3 className="lg:text-2xl text-lg font-semibold text-black mb-4 text-center">
              Final Words
            </h3>
            <p className="text-black leading-relaxed text-justify">
              Trust Financial Advisory is your one-stop for personal finance
              education and insights. Our blog addresses a vast spectrum of
              subjects, including financial literacy, debt control, education
              planning, tax planning, investment information, and retirement
              planning. We are here to guide you through your financial journey,
              providing the information and tools you need to make informed
              choices. Visit our blog today and begin taking the first step
              closer to achieving your financial targets! Don't forget to
              subscribe to our finance newsletter for valuable financial
              insights delivered straight to your inbox.
            </p>
          </div>
        </div>
      </div>
    </>
  );
});

export default Content;
