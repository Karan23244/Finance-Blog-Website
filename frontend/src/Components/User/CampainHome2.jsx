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
      "FatakPay offers quick online personal loans for immediate financial assistance.",
    points: [
      "Fast approvals",
      "No hidden fees",
      "Flexible repayment",
      "Secure platform",
    ],
    highlight:
      "Experience the fastest personal loan solution anytime, anywhere with FatakPay's convenient services",
    url: "https://app.appsflyer.com/com.fatakpay?pid=clickorbits_int&c=Affiliates_ClickOrbits&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "mPokket",
    id: "mpokket",
    logo: "/Mpokket.png",
    description:
      "mPokket is a popular instant loan app in India, providing easy access to urgent loans.",
    points: [
      "Fast approvals",
      "Custom repayment",
      "Online application",
      "No hidden fees",
    ],
    highlight:
      "mPokket revolutionizes personal loans in India, offering quick solutions for emergencies and planned expenses.",
    url: "https://app.appsflyer.com/com.mpokket.app?pid=clickorbits_int&c=Affiliates_ClickOrbits&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "Bharat Loan",
    id: "bharat",
    logo: "/Bharat.png",
    description:
      "BharatLoan offers a reliable source for quick online personal loans to meet urgent financial needs.",
    points: [
      "Fast approvals",
      "Low rates",
      "Intuitive interface",
      "Dedicated support",
    ],
    highlight:
      "Join BharatLoan today and overcome financial hurdles with easy access to funds in no time!",
    url: "https://app.appsflyer.com/com.devmunifin.bharatloan?pid=clickorbits_int&c=Affiliates_ClickOrbits&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "Rupee112",
    id: "rupee112",
    logo: "/Rupee112.png",
    description:
      "Rupee112 offers quick personal loans up to ₹1 lakh for salaried individuals needing instant cash.",
    points: [
      "Fast approvals",
      "Flexible repayment",
      "Online application",
      "Unsecured loans",
    ],
    highlight:
      "Choose Rupee112 for fast, easy, and hassle-free loans—apply now for your financial needs!",
    url: "https://app.appsflyer.com/com.vrindafinlease.rupee112?pid=clickorbits_int&c=Affiliates_ClickOrbits&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "LendingPlate",
    id: "lendingplate",
    logo: "/LendingPlate.png",
    description:
      "LendingPlate is an instant personal loan platform designed to seamlessly fulfill your urgent financial needs.",
    points: ["Loan Range", "User-Friendly", "Minimal Docs", "Quick Disbursal"],
    highlight:
      "LendingPlate prioritizes transparency and data protection, ensuring a smooth loan experience. Take action today—apply now!",
    url: "https://app.appsflyer.com/com.lendingplate?pid=clickorbits_int&c=Affiliates_ClickOrbits&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "Olyv",
    id: "olyv",
    logo: "/Olyv.png",
    description:
      "Olyv is your one-stop app for fast, easy personal loans without any obligations—anytime, anywhere.",
    points: [
      "Fast approvals",
      "Loan Amount",
      "Competitive Rates",
      "User-Friendly",
    ],
    highlight:
      "Get instant loans today with Olyv and fulfill your monetary needs effortlessly!",
    url: "https://app.appsflyer.com/in.rebase.app?pid=clickorbits_int&c=CLICK_ORBITS&af_siteid={publisher_id}&af_adset_id=testadset&af_sub_siteid={source}&af_click_lookback=7d&clickid={click_id}&advertising_id={gaid}&android_id={android_id}&idfa={idfa}&af_prt=clickorbitspvtl",
  },
  {
    name: "Zype",
    id: "zype",
    logo: "/Zype.png",
    description:
      "Zype is the top instant loan app in India, offering personal loans tailored to your needs.",
    points: [
      "Fast approvals",
      "Flexible Amount",
      "Competitive Rates",
      "Secure Transactions",
    ],
    highlight:
      "Get instant loans today with Zype and fulfill your monetary needs effortlessly!",
    url: "https://zype.sng.link/Ajygt/usit?_dl=com.zype.mobile&_smtype=3&idfa={idfa}&andi={android_id}&aifa={gaid}&psid={publisher_id}_{source}&ve={os}&cl={click_id}&ip={ip}&pcrn={p3}&pcid={campaign_id}&pssid={source}&pcrid={p5}&pcc={conv_rp_currency}&pca={payout}&agency_id=Y7O&pcid=5675&psid={pub_subid}",
  },
];

export default function CampaignTable() {
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

    console.log("Final redirect URL:", formattedUrl);
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
        <div className="overflow-x-auto max-w-7xl mx-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <thead className="bg-orange-100 text-orange-700 text-left">
              <tr>
                <th className="py-3 px-6 text-lg font-semibold">
                  Quick Financial Solution
                </th>
                <th className="py-3 px-6 text-lg font-semibold w-[250px]">
                  Key Features
                </th>
                <th className="py-3 px-6 text-lg font-semibold">Highlight</th>
                <th className="py-3 px-6 text-lg font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((item, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-orange-50 border-t border-gray-200">
                  <td className="py-4 px-6 text-gray-700">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-40 h-30 rounded-xl mb-2"
                    />
                    {item.description}
                  </td>
                  <td className="py-4 px-6">
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {item.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 px-6 italic text-orange-600 font-medium">
                    {item.highlight}
                  </td>
                  <td className="py-4 px-6">""
                    <motion.button
                      id={item.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-orange-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-orange-700 transition relative z-10"
                      onClick={() => handleRedirect(item.url)}>
                      Apply Now
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Subscribe />
      <Footer />
    </>
  );
}
