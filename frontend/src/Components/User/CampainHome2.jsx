// CampaignCards.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Footer from "../../Common/Footer";
import Subscribe from "../../Common/Subscribe";

const campaigns = [
  {
    name: "FatakPay",
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
  },
  {
    name: "mPokket",
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
  },
  {
    name: "Bharat Loan",
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
  },
  {
    name: "Rupee112",
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
  },
  {
    name: "LendingPlate",
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
  },
  {
    name: "Olyv",
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
  },
  {
    name: "Zype",
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
  },
];

export default function CampaignTable() {
  const [search, setSearch] = useState("");

  const filteredCampaigns = campaigns.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-orange-100 to-pink-100 py-12 px-5">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center text-orange-800 mb-10">
          Explore Our Campaigns
        </motion.h1>

        <div className="max-w-3xl mx-auto mb-12">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl shadow focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="overflow-x-auto max-w-7xl mx-auto">
          <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
            <tbody>
              {filteredCampaigns.map((item, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-orange-50 border-t border-gray-200">
                  <td className="py-4 px-6">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="w-full h-full rounded-xl"
                    />
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {item.description}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {item.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
                          #{tag}
                        </span>
                      ))}
                    </div>
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
                  <td className="py-4 px-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-orange-600 text-white px-5 py-2 rounded-full text-base shadow hover:bg-orange-700 transition">
                      Apply
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
