import React from "react";
import Footer from "./Footer";
import Subscribe from "./Subscribe";
const AboutUs = () => {
  return (
    <>
      <div className="lg:mx-[13%] lg:my-[7%] mx-[2%] my-[1%]">
        <h1 className="lg:text-8xl text-xl font-bold text-[#FF822E] lg:mt-10 lg:mb-14 my-5">
          About Us
        </h1>
        <p className="lg:mb-10 mb-5 text-justify">
          Hello from Trust Financial Advisory, your dedicated companion in the
          labyrinth of finance. Our team of experienced financial experts is
          ready to help not only individuals but also companies make the best
          financial decisions, which will lead to security and prosperity.
        </p>
        <p className="lg:mb-10 mb-5 text-justify">
          We believe that at Trust Financial Advisory, everyone should have
          access to informed financial advice guided by the personal goals and
          situations of that individual. We guide our mission through empowering
          clients with financial advice responsive to values and aspirations.
          Whether it is managing day-to-day finances, providing for a future, or
          saving for retirement, we're here for you to help you reach your goals
          and succeed.
        </p>
        <p className="lg:mb-10 mb-5 text-justify">
          We know how hard financial decision making is and understand how an
          ever-changing economy only adds complexity. We provide a variety of
          services such as wealth management, tax advice, investment strategies,
          and financial planning to help guide you through the complexities. At
          our core is an open approach of trust with an interest in seeing you
          succeed for the long-term.
        </p>
        <p className="lg:mb-10 mb-5 text-justify">
          We are different from the rest because of our client-centric approach.
          We learn the details about your financial goals, your risk tolerance,
          and your priorities so we may adapt our advice to meet your needs. Our
          experts are here to help you as life evolves so does the market. We
          are your financial advisors but also partners to achieve financial
          peace of mind.
        </p>
        <p className="lg:mb-10 mb-5 text-justify">
          Integrity is the first principle that defines us at Trust Financial
          Advisory, and we stand committed to forging long-lasting relationships
          founded on responsibility, openness, and trust. Your needs always come
          first; we're dedicated to helping you make the right decisions.
        </p>
        <p className="lg:mb-10 mb-5 text-justify">
          Thanks for choosing Trust Financial Advisory. It is with absolute
          confidence that we look forward to helping you with your financial
          objectives.
        </p>
      </div>
      <Subscribe />
      <Footer />
    </>
  );
};

export default AboutUs;
