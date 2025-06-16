// CampaignCards.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../../Common/Footer";
import Subscribe from "../../Common/Subscribe";
import { v4 as uuidv4 } from "uuid";
const campaigns = [
  {
    name: "FatakPay",
    id: "fatakpay",
    logo: "/Fatak.png", // Add your actual image path
    description:
      "FatakPay provides fast, frictionless online personal loans, giving users access to immediate financial assistance. Apply today!",
    points: [
      "Simple and quick approval in minutes.",
      "No hidden fees or charges.",
      "Repayment plans that suit you.",
      "100% online application.",
      "Built on a secure platform with data privacy.",
    ],
    highlight:
      "FatakPay is known for being the fastest way to get a personal loan anytime, anywhere!",
    url: "https://app.appsflyer.com/com.fatakpay?pid=clickorbits_int&c=Affiliates_ClickOrbits&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "mPokket",
    id: "mpokket",
    logo: "/Mpokket.png",
    description:
      "mPokket is a well-known instant loan app in India that will give you an easy access to instant loans for all your urgent requirements. If you need instant loan then it's an answer to your all financial needs.",
    points: [
      "Loans approved in mins instantly.",
      "Custom repayment that fits your pocket.",
      "100% online application process.",
      "No hidden fees or charges.",
      "Secure platform to protect your data.",
    ],
    highlight:
      "Change how people access personal loans in India with mPokket. It allows users to lock up funds quickly and easily. mPokket is a perfect solution for financial needs whether it's for emergencies or planned expenses. mPokket — Get the Benefits of Instant Loans Today!",
    url: "https://app.appsflyer.com/com.mpokket.app?pid=clickorbits_int&c=Affiliates_ClickOrbits&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "Bharat Loan",
    id: "bharat",
    logo: "/Bharat.png",
    description:
      "With BharatLoan, you can find a trusted source of quick online personal loans to help you get through your urgent financial needs in a hassle-free manner.",
    points: [
      "Quick loan disbursal with less paperworkFintechs.",
      "Low borrowing rates are attractive to investors because of the spread.",
      "Intuitive interface allowing easy search for systems.",
      "Helps, only the dedicated customer support.",
      "Tailor-made loan amount as per your requirement",
    ],
    highlight:
      "BharatLoan is on a mission to empower everyone with the ability to access funds in the blink of an eye, turbo charging you to go over any financial hurdles. BharatLoan, making borrowing hassle-free, be a part of it today!",
    url: "https://app.appsflyer.com/com.devmunifin.bharatloan?pid=clickorbits_int&c=Affiliates_ClickOrbits&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "Rupee112",
    id: "rupee112",
    logo: "/Rupee112.png",
    description:
      "Rupee112 provides up to ₹1 lakh quick personal loans to salaried individuals requiring instant cash.",
    points: [
      "Quick access thanks to an instant approval process",
      "Repay in a way that suits your budget.",
      "Decision in minutes, 100% online.",
      "Unsecured loans (no collateral needed).",
      "Crisp and clear fees, no hidden agenda.",
    ],
    highlight:
      "Loans documentation and paperwork can really be a pain in the neck, which is why Rupee112, your hassle-free loans partner is here to help you out. Apply Now for Fast, Easy, Hassle-Free Borrowing! Apply now at Rupee112.",
    url: "https://app.appsflyer.com/com.vrindafinlease.rupee112?pid=clickorbits_int&c=Affiliates_ClickOrbits&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "LendingPlate",
    id: "lendingplate",
    logo: "/LendingPlate.png",
    description:
      "LendingPlate, an instant personal loan platform, is meant to fulfil your urgent requirements seamlessly.",
    points: [
      "Loan Amount: ₹10,000 to ₹2,50,000.",
      "Money gets Disbursed Quickly: These loans get credited to your account in less than 30 minutes.",
      "Less Documentation: You can apply with very few documents (KYC and income proof)",
      "User -Friendly App: Their mobile app could let you to access the application process.",
      "Data Protection: Information is stored securely, shared only with necessary parties.",
    ],
    highlight:
      "LendingPlate is return on your goal to keep everything crystal clear so you could use their loan origination with peace of mind. So, take action, today, no, apply now!",
    url: "https://app.appsflyer.com/com.lendingplate?pid=clickorbits_int&c=Affiliates_ClickOrbits&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "Olyv",
    id: "olyv",
    logo: "/Olyv.png",
    description:
      "Olyv, your one-stop instant personal loan app that offers you fast, easy loans without any obligations — anytime, anywhere.",
    points: [
      "Fast Approval: Get instant cash loan approval in minutes with fast application approval process.",
      "Amount: Advance from ₹5,000 to ₹5,00,000 depending on your need.",
      "Competitive Rates: Enjoy attractive interest rates with no hidden fees.",
      "User -Friendly Interface: You can navigate your app with ease.",
      "Secure Transactions: Your information is secured with high inquiry security level.",
    ],
    highlight:
      "It even helps you manage your finances with Olyv. So get instant loans today and fulfill your monetary needs!",
    url: "https://app.appsflyer.com/in.rebase.app?pid=clickorbits_int&c=CLICK_ORBITS&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "Zype",
    id: "zype",
    logo: "/Zype.png",
    description:
      "Zype, the leading instant loan app in India Instant Personal loan on your condition at your point in time.",
    points: [
      "Quick Approval: Apply with ease and get approved in minutes.",
      "Flexible Loan Amount: Get a loan from ₹5,000 to ₹50,00,000 as per your need.",
      "Competitive Interest Rates: Enjoy attractive rates with no hidden charges.",
      "User -Optional Interface: Easy navigation without a hitch;",
      "Secure transactions: Your personal data is secured with the latest security measures.",
    ],
    highlight:
      "Zype was able to provide a seamless process of obtaining finance. So, get your big break with instant loans now!",
    url: "https://zype.sng.link/Ajygt/usit?_dl=com.zype.mobile&_smtype=3&idfa={idfa}&andi={android_id}&aifa={gaid}&psid={publisher_id}_{source}&ve={os}&cl={click_id}&ip={ip}&pcrn={p3}&pcid={campaign_id}&pssid={source}&pcrid={p5}&pcc={conv_rp_currency}&pca={payout}&agency_id=Y7O&pcid=5675&psid={pub_subid}",
  },
];

export default function CampaignCards() {
  const handleRedirect = (baseUrl) => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = /android/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);

    const publisher_id = Math.floor(Math.random() * 9) + 1;
    const source = Math.floor(Math.random() * 90 + 10);
    const click_id = uuidv4();

    const gaid = "sample-gaid";
    const idfa = "sample-idfa";

    const formattedUrl = baseUrl
      .replace("{publisher_id}", publisher_id)
      .replace("{source}", source)
      .replace("{click_id}", click_id)
      .replace("{gaid}", gaid)
      .replace("{android_id}", gaid)
      .replace("{idfa}", idfa);

    window.open(formattedUrl, "_blank");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-orange-100 to-pink-100 py-12 px-5">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center text-orange-800 mb-4">
          Personal Financing
        </motion.h1>
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl font-bold text-center text-orange-800 mb-10">
          Consider consolidating loans to simplify your payments and reduce
          interest costs.
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {campaigns.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-white p-6 rounded-3xl shadow-md border hover:border-orange-300 transition-all duration-300 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-white opacity-0 group-hover:opacity-40 transition duration-500 rounded-3xl z-0"></div>

              <div className="flex items-center relative z-10 mb-3">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="w-40 h-30 mr-4 rounded-xl"
                />
                <h2 className="text-2xl font-semibold text-orange-700">
                  {item.name}
                </h2>
              </div>

              <p className="text-gray-700 mb-3 relative z-10">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>

              <ul className="list-disc list-inside text-gray-600 space-y-1 mb-4 relative z-10">
                {item.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              <p className="italic text-orange-600 font-medium mb-4 relative z-10">
                {item.highlight}
              </p>

              <motion.button
                id={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-orange-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-700 transition relative z-10"
                onClick={() => handleRedirect(item.url)}>
                Apply Now
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
      <Subscribe />
      <Footer />
    </>
  );
}
