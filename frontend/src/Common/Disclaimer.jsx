import React from "react";
import Footer from "./Footer";
import Subscribe from "./Subscribe";
const Disclaimer = () => {
  return (
    <>
      <div className="lg:mx-[13%] lg:my-[7%] mx-[2%] my-[1%]">
        <h1 className="lg:text-8xl text-xl font-bold text-[#FF822E] lg:mt-10 lg:mb-14 my-5">
          Disclaimer
        </h1>
        <p className="lg:mb-10 mb-5 text-justify">
          All information presented on this website is general and intended to
          be used only for informational purposes and should not be regarded as
          any form of financial advice. You acknowledge and agree to the
          following by using this website:
        </p>

        <h2 className="lg:text-xl text-lg font-semibold text-gray-800 lg:mb-4 lg:mt-7 my-3">
          1. No Professional Financial Advice
        </h2>
        <p className="lg:mb-10 mb-5 text-justify">
          This website is not an independent source of professional financial,
          tax, or investment advice. Though we strive to update our information
          and data as current and accurate as possible, this should not
          substitute for consultation with a qualified financial advisor
          familiar with your circumstances.
        </p>

        <h2 className="lg:text-xl text-lg font-semibold text-gray-800 lg:mb-4 lg:mt-7 my-3">
          2. Accuracy of Information
        </h2>
        <p className="lg:mb-10 mb-5 text-justify">
          To the best of our knowledge, all the information we have shared here
          about Trust Financial Advisory is true and to the point. We do not
          however guarantee that information provided on this page is up to
          date, accurate, or comprehensive. All liability for misstatements or
          misrepresentations are hereby disclaimed as the information is either
          incorrect or outdated.
        </p>
        <h2 className="lg:text-xl text-lg font-semibold text-gray-800 lg:mb-4 lg:mt-7 my-3">
          3. No Endorsement of Third-Party Websites
        </h2>
        <p className="lg:mb-10 mb-5 text-justify">
          We give links from our site to sites we think you'd find useful or of
          interest. Because we neither own nor control the products, services,
          or content found on third-party sites, we make no warranties as to the
          validity of any goods or services purchased from a third party site
          nor do we recommend any third party site.
        </p>
        <h2 className="lg:text-xl text-lg font-semibold text-gray-800 lg:mb-4 lg:mt-7 my-3">
          4. Financial Risks
        </h2>
        <p className="lg:mb-10 mb-5 text-justify">
          With any financial plan and investment, risk is involved. Nothing on
          this website should ever be considered or interpreted to suggest that
          you will achieve financial gain relating to your use of this
          information. Past results are not an assurance of future
          profitability. No financial plan or investment will guarantee a
          profit.
        </p>
        <h2 className="lg:text-xl text-lg font-semibold text-gray-800 lg:mb-4 lg:mt-7 my-3">
          5. Limitation of Liability
        </h2>
        <p className="lg:mb-10 mb-5 text-justify">
          Trust Financial Advisory shall not be responsible for any cost,
          damage, or loss incurred as a consequence of any usage of this website
          or reliance on any of the information or materials available on it.
          This includes incidental, punitive, consequential, direct, and
          indirect damages.
        </p>
        <h2 className="lg:text-xl text-lg font-semibold text-[#FF822E] lg:mb-4 lg:mt-7 my-3">
          6. Changes to Content
        </h2>
        <p className="lg:mb-10 mb-5 text-justify">
          All features, services, and content available on this website are
          subject to change at any time without notice. Periodically check here
          for any changes to be certain you are viewing the most recent
          information available.
        </p>
        <h2 className="lg:text-xl text-lg font-semibold text-gray-800 lg:mb-4 lg:mt-7 my-3">
          7. Governing Law
        </h2>
        <p className="lg:mb-10 mb-5 text-justify">
          This disclaimer is governed by and construed in accordance with the
          laws of [Your State or Country], and any disputes will be subject to
          the jurisdiction of the courts in [Your State or Country].
        </p>
        <h2 className="lg:text-xl text-lg font-semibold text-gray-800 lg:mb-4 lg:mt-7 my-3">
          8. Contact Information
        </h2>
        <p className="lg:mb-10 mb-5 text-justify">
          If you have any query about this disclaimer, please contact us at:
        </p>
        <p className="lg:mb-10 mb-5 text-justify">
          <strong>Email:</strong> info@trustfinancialadvisory.com
        </p>
      </div>
      <Subscribe />
      <Footer />
    </>
  );
};

export default Disclaimer;
