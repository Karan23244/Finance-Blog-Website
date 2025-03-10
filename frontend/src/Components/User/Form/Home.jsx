import React, { useState, useEffect } from "react";
import { initializeOTPless, phoneAuth, verifyOTP } from "./Otpless";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
function LoanForm() {
  const navigate = useNavigate();

  useEffect(() => {
    initializeOTPless();
  }, []);
  // In your React component

  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

  const [showOTPForm, setShowOTPForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false); // New state for Thank You section
  const [showThankYoufinal, setshowThankYoufinal] = useState(false);
  const [error, setError] = useState("");
  const [errorpin, setErrorpin] = useState("");

  const [currentStep, setCurrentStep] = useState(1); // Track the current step
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Dynamically inject the Google Analytics script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";

    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', 'G-XXXXXXX');
    `;

    document.head.appendChild(script1);
    document.head.appendChild(script2);

    return () => {
      // Cleanup scripts if necessary
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const handleChange = (e) => {
    const { value } = e.target;

    // Allow only digits and enforce 10-digit maximum
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, phone: value });

      if (value.length > 10) {
        setError("Phone number cannot exceed 10 digits.");
      } else {
        setError(""); // Clear error if input is valid
      }
    }
  };

  const handlePinChange = (e) => {
    const { value } = e.target;

    // Allow only digits and enforce 6-digit maximum
    if (/^\d*$/.test(value)) {
      setFormData({ ...formData, pin: value });

      if (value.length > 6) {
        setErrorpin("PIN code cannot exceed 6 digits.");
      } else {
        setError(""); // Clear error if input is valid
      }
    }
  };
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    employment: "",
    loan_type: "",
    loan_amount: "",
    pin: "",
    monthly_income: "",
  });
  const [formData1, setFormData1] = useState({
    property_Identified: "",
    property_type: "",
    down_payment: "",
    business_vintage: "",
    nature_of_business: "",
    estimated_property_value: "",
  });

  const [otp, setOtp] = useState("");
  const isFormValid = () => {
    const {
      name,
      phone,
      employment,
      loan_type,
      loan_amount,
      pin,
      monthly_income,
    } = formData;

    // Basic validations
    const isNameValid = name.trim() !== ""; // Name should not be empty
    const isPhoneValid = /^\d{10}$/.test(phone.trim()); // Phone should be exactly 10 digits
    const isEmploymentValid = employment.trim() !== ""; // Employment should not be empty
    const isLoanTypeValid = loan_type.trim() !== ""; // Loan type should not be empty
    const isLoanAmountValid =
      /^\d+$/.test(loan_amount.trim()) && parseInt(loan_amount, 10) > 0; // Loan amount should be a positive number
    const isPinValid = /^\d{6}$/.test(pin.trim()); // Pin should be exactly 6 digits
    const isMonthlyIncomeValid =
      /^\d+$/.test(monthly_income.trim()) && parseInt(monthly_income, 10) > 0; // Monthly income should be a positive number

    // Combine all validations
    return (
      isNameValid &&
      isPhoneValid &&
      isEmploymentValid &&
      isLoanTypeValid &&
      isLoanAmountValid &&
      isPinValid &&
      isMonthlyIncomeValid &&
      isCheckboxSelected // Ensure checkbox is selected
    );
  };

  const isFormValid1 = () => {
    const {
      property_Identified,
      property_type,
      down_payment,
      business_vintage,
      nature_of_business,
      estimated_property_value,
    } = formData1;

    // Dropdown validations (should not be empty)
    const isPropertyIdentifiedValid = property_Identified.trim() !== "";
    const isPropertyTypeValid = property_type.trim() !== "";
    const isDownPaymentValid = down_payment.trim() !== "";
    const isBusinessVintageValid = business_vintage.trim() !== "";
    const isNatureOfBusinessValid = nature_of_business.trim() !== "";

    // Input validation for estimated_property_value (should be a positive number)
    const isEstimatedPropertyValueValid =
      /^\d+$/.test(estimated_property_value.trim()) &&
      parseInt(estimated_property_value, 10) > 0;

    // Combine all validations
    return (
      isPropertyIdentifiedValid &&
      isPropertyTypeValid &&
      isDownPaymentValid &&
      isBusinessVintageValid &&
      isNatureOfBusinessValid &&
      isEstimatedPropertyValueValid &&
      isCheckboxSelected // Ensure checkbox is selected
    );
  };

  const handlePhoneAuth = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      setShowOTPForm(true);
      setCurrentStep(2); // Move to OTP step
      phoneAuth(formData.phone, "+91"); // Dynamic values
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all required fields.",
      });
    }
  };

  const [loading, setLoading] = useState(false); // Loader state

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader

    const onSuccess = () => {
      handleOTPVerificationSuccess(); // Call success handler
    };

    const onFailure = () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Wrong OTP. Please try again.",
      });
    };

    try {
      // Call OTP verification logic
      await verifyOTP(formData.phone, otp, "+91", onSuccess, onFailure);
    } catch (error) {
      console.error("Error verifying OTP:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred during OTP verification. Please try again.",
      });
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleOTPVerificationSuccess = async () => {
    setLoading(true); // Show loader
    try {
      setCurrentStep(3); // Proceed to the next step
      setShowOTPForm(false); // Hide OTP form
      setShowThankYou(true); // Show Thank You message
    } catch (error) {
      console.error("Error handling OTP success:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };

  const handleOTPSuccess = async (e) => {
    e.preventDefault();
    if (isFormValid1()) {
      setLoading(true); // Show loader
      const scriptURL =
        "https://script.google.com/macros/s/AKfycbwO4Xos-ZjyFUXnBFiWL4TDc8YqVuTS57FbtXRVIUuukIuXyV1xRRCLvLAUO3cmSmWHuA/exec"; // Replace with your script URL

      // Combine formData and formData1
      const combinedData = { ...formData, ...formData1 };

      try {
        const response = await fetch(scriptURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(combinedData),
          mode: "no-cors", // Prevents CORS issues when sending data to Google Apps Script
        });

        setCurrentStep(3);
        //   setShowOTPForm(false);
        //   setShowThankYou(false);
        //   setshowThankYoufinal(true);
        navigate("/thankyou"); // Redirect to '/destination-route'
        // Optional: Handle server response if mode is not 'no-cors'
        // const result = await response.json();
        // if (result.status === 'success') {
        //   setStatus('Form submitted successfully!');
        // } else {
        //   setStatus('Error submitting form.');
        // }
      } catch (error) {
        console.error("Error submitting form:", error);
        setStatus("Error submitting form.");
      } finally {
        setLoading(false); // Hide loader
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all required fields.",
      });
    }
  };

  const handleChangenumber = () => {
    setShowOTPForm(false);
    setCurrentStep(1); // Move to OTP step
  };
  const [countdown, setCountdown] = useState(51); // Initial countdown value
  const [isResendDisabled, setIsResendDisabled] = useState(true); // Disable resend initially

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000); // Decrease every second
    } else {
      setIsResendDisabled(false); // Enable resend when countdown reaches 0
    }
    return () => clearInterval(timer); // Cleanup timer
  }, [countdown]);

  const handleResendClick = () => {
    if (!isResendDisabled) {
      setIsResendDisabled(true); // Disable resend after click
      setCountdown(51); // Reset countdown
      handlePhoneAuth(); // Call the resend OTP function
    }
  };
  // Validate form fields

  // const handleGenerateOTP = (e) => {
  //   e.preventDefault();

  //   if (isFormValid()) {
  //     setShowOTPForm(true);

  //     setCurrentStep(2); // Move to OTP step
  //   } else {
  //     alert("Please fill out all required fields.");
  //   }
  // };

  // const handleVerifyOTP = (e) => {
  //   e.preventDefault();
  //   if (otp.trim().length === 4) {
  //     setCurrentStep(3); // Move to review step
  //   } else {
  //     alert("Please enter a valid OTP.");
  //   }
  // };
  // const handleGenerateOTP = (e) => {
  //   e.preventDefault();
  //   setShowOTPForm(true);
  // };

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  //   const handleVerifyOTP = async (e) => {
  //     e.preventDefault();

  //     const scriptURL = 'https://script.google.com/macros/s/AKfycbwYdzq9FN_ZTniUoP9IeRw17XdLc7feO6s7FNd8wboB4qo8e-haRPGPGE-_p2cOd6NH/exec'; // Replace with your script URL

  //     try {
  //       const response = await fetch(scriptURL, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(formData),
  //         mode: 'no-cors',

  //       });
  // console.log('hh',formData)      // Move to OTP step
  // setCurrentStep(3);
  // setShowOTPForm(false);
  // setShowThankYou(true);
  //       const result = await response.json();
  //       if (result.status === 'success') {
  //         setStatus('Form submitted successfully!');
  //         setFormData({ name: '', email: ''});
  //       } else {
  //         setStatus('Error submitting form.');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //       setStatus('Error submitting form.');
  //     }
  //   }

  return (
    <>
      <div className=" flex flex-col">
        {loading && (
          <div className="flex justify-center items-center fixed inset-0 bg-gray-900 bg-opacity-50 z-50">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* Header */}
        <div id="Form" className="">
          <h1 className="text-center text-base lg:text-xl font-semibold">
            Get home loans with low interest and flexible EMIs.
            <span className="text-orange-500"> Apply online today!</span>
          </h1>
        </div>
        <div class="flex justify-center items-center px-4 py-12 lg:py-16 md:py-14">
          <div className="bg-white shadow-lg rounded-lg w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3">
            {/* Conditional Rendering */}
            {showThankYou ? (
              <div className="lg:col-span-2 bg-white   rounded-lg">
                <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-6 lg:p-10">
                  {/* Header */}
                  <h1 className="text-lg lg:text-xl font-semibold mb-4 text-gray-700">
                    Hello {formData.name}, you are only a few details away from
                    completing your loan application!
                  </h1>

                  {/* Form Section */}
                  <div>
                    <h2 className="text-lg font-medium text-gray-800 mb-4">
                      Please share your financial details
                    </h2>

                    <form className="space-y-6">
                      {/* Row 1 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Property Identified?
                          </label>
                          <select
                            value={formData1.property_Identified} // Ensure this binds to the correct state key
                            onChange={(e) =>
                              setFormData1({
                                ...formData1,
                                property_Identified: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-orange-500 focus:border-orange-500">
                            <option value="" disabled selected>
                              Please indicate if you have identified the
                              property you wish to purchase
                            </option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Property Type
                          </label>
                          <select
                            value={formData1.property_type} // Ensure this binds to the correct state key
                            onChange={(e) =>
                              setFormData1({
                                ...formData1,
                                property_type: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-orange-500 focus:border-orange-500">
                            <option value="" disabled selected>
                              Please select the type of property you wish to
                              purchase
                            </option>
                            <option value="Ready-to-move-in">
                              Ready-to-move-in property
                            </option>
                            <option value="Under-construction">
                              Under-construction property
                            </option>
                            <option value="Plot">Plot</option>
                            <option value="Resale">Resale</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Estimated Property Value
                          </label>
                          <input
                            value={formData1.estimated_property_value}
                            onChange={(e) =>
                              setFormData1({
                                ...formData1,
                                estimated_property_value: e.target.value,
                              })
                            }
                            type="text"
                            placeholder="Please enter the estimated current market value of your property"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-orange-500 focus:border-orange-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Down Payment Completed?
                          </label>
                          <select
                            value={formData1.down_payment} // Ensure this binds to the correct state key
                            onChange={(e) =>
                              setFormData1({
                                ...formData1,
                                down_payment: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-orange-500 focus:border-orange-500">
                            <option value="" disabled selected>
                              Please indicate if you have paid your contribution
                              towards the property purchase
                            </option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                      </div>

                      {/* Row 3 */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Business Vintage
                          </label>
                          <select
                            value={formData1.business_vintage} // Ensure this binds to the correct state key
                            onChange={(e) =>
                              setFormData1({
                                ...formData1,
                                business_vintage: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-orange-500 focus:border-orange-500">
                            <option value="" disabled selected>
                              Please select the age of your current business
                            </option>
                            <option value="1-2 years">1-2 years</option>
                            <option value="3-5  years">3-5 years</option>
                            <option value="6-9  years">6-9 years</option>
                            <option value="10-14  years">10-14 years</option>
                            <option value="15-25  years">15-25 years</option>
                            <option value="25+ years">25+ years</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">
                            Nature of Business
                          </label>
                          <select
                            value={formData1.nature_of_business} // Ensure this binds to the correct state key
                            onChange={(e) =>
                              setFormData1({
                                ...formData1,
                                nature_of_business: e.target.value,
                              })
                            }
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-orange-500 focus:border-orange-500">
                            <option value="" disabled selected>
                              Please select your business type
                            </option>
                            <option value="Trader">Trader</option>
                            <option value="Manufacturer">Manufacturer</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md"
                        onClick={handleOTPSuccess}>
                        Submit
                      </button>
                    </form>
                  </div>

                  {/* Disclaimer */}
                  <p className="text-sm text-gray-600 mt-6 text-center">
                    I authorise Orbits work and its affiliates to contact me,
                    overriding my registration for DNC/NDNC, if any, and I have
                    understood and agree with the{" "}
                    <Link
                      to="/privacy_policy"
                      className="hover:underline text-orange-500">
                      Terms and Conditions
                    </Link>
                    .
                  </p>
                </div>
              </div>
            ) : // <div className="lg:col-span-2 bg-white p-4 sm:p-8  rounded-lg text-center">
            //   <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Thank You!</h2>
            //   <p className="text-sm sm:text-base text-gray-700 mb-6">
            //     Thank you for your interest. We will get back to you shortly.
            //   </p>

            // </div>
            showOTPForm ? (
              <div className="lg:col-span-2 bg-white p-4 sm:p-8 rounded-lg">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Enter your One Time Password (OTP)
                </h2>
                <div className="text-center mb-6">
                  <span className="text-4xl">🔒</span>
                </div>
                <form className="space-y-4" onSubmit={handleVerifyOTP}>
                  <div className="flex justify-center space-x-2">
                    {Array(4)
                      .fill("")
                      .map((_, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          value={otp[index] || ""}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "");
                            setOtp(
                              (prevOtp) =>
                                prevOtp.slice(0, index) +
                                value +
                                prevOtp.slice(index + 1)
                            );
                          }}
                          className="border border-gray-300 rounded-md w-12 h-12 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ))}
                  </div>
                  <p
                    className="text-sm text-orange-500 text-center mt-4 cursor-pointer"
                    onClick={handleChangenumber}>
                    Change Mobile Number?
                  </p>
                  <p className="text-sm text-center mt-2">
                    Didn’t receive OTP?{" "}
                    <span
                      className={`cursor-pointer ${
                        isResendDisabled ? "text-gray-400" : "text-blue-500"
                      }`}
                      onClick={handleResendClick}>
                      Resend OTP
                    </span>
                    <br />
                    {isResendDisabled && <span>in {countdown} Seconds</span>}
                  </p>
                  <div className="mt-4">
                    <label className="flex items-start text-xs sm:text-sm">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-500 mt-1"
                        checked={isCheckboxSelected}
                        onChange={(e) =>
                          setIsCheckboxSelected(e.target.checked)
                        }
                      />
                      <span className="ml-2">
                        I authorise Orbits work and its affiliates to contact
                        me, overriding my registration for DNC/NDNC, if any, and
                        I have understood and agree with the{" "}
                        <Link
                          to="/privacy_policy"
                          className="hover:underline text-orange-500">
                          Terms and Conditions
                        </Link>
                        .
                      </span>
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white font-bold py-2 px-4 text-sm sm:text-base rounded-lg hover:bg-orange-600">
                    Proceed
                  </button>
                </form>
              </div>
            ) : showThankYoufinal ? (
              <div className="lg:col-span-2 bg-white p-4 sm:p-8  rounded-lg text-center">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Thank You!
                </h2>
                <p className="text-sm sm:text-base text-gray-700 mb-6">
                  Thank you for your interest. We will get back to you shortly.
                </p>
              </div>
            ) : (
              <div className="lg:col-span-2 bg-white p-4 sm:p-8 rounded-lg">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                  Please share your basic details
                </h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter your 10-digit phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                  </div>

                  {/* Employment Type */}
                  <div className="col-span-2">
                    <label className="block text-sm sm:text-base font-medium mb-1">
                      Employment Type
                    </label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="employment"
                          className="form-radio text-blue-500 h-4 w-4"
                          value="Salaried"
                          checked={formData.employment === "Salaried"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              employment: e.target.value,
                            })
                          }
                        />
                        <span className="ml-2 text-sm sm:text-base">
                          Salaried
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="employment"
                          className="form-radio text-blue-500 h-4 w-4"
                          value="Self-Employed"
                          checked={formData.employment === "Self-Employed"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              employment: e.target.value,
                            })
                          }
                        />
                        <span className="ml-2 text-sm sm:text-base">
                          Self-Employed
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="employment"
                          className="form-radio text-blue-500 h-4 w-4"
                          value="Self-Employed Doctors/CAs"
                          checked={
                            formData.employment === "Self-Employed Doctors/CAs"
                          }
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              employment: e.target.value,
                            })
                          }
                        />
                        <span className="ml-2 text-sm sm:text-base">
                          Self-Employed Doctors/CAs
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Loan Type */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium mb-1">
                      Select Loan Type
                    </label>
                    <select
                      value={formData.loan_type} // Ensure this binds to the correct state key
                      onChange={(e) =>
                        setFormData({ ...formData, loan_type: e.target.value })
                      }
                      className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Please select the type of loan</option>
                      <option value="home">Home</option>
                      <option value="business">Business</option>
                    </select>
                  </div>

                  {/* Net Monthly Income */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium mb-1">
                      Net Monthly Income
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter your total net monthly income"
                      value={formData.monthly_income}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          monthly_income: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Loan Amount */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium mb-1">
                      Required Loan Amount
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter the loan amount"
                      value={formData.loan_amount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          loan_amount: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* PIN Code */}
                  <div>
                    <label className="block text-sm sm:text-base font-medium mb-1">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      placeholder="Please enter PIN code"
                      value={formData.pin}
                      onChange={handlePinChange}
                      className="border border-gray-300 rounded-md w-full py-2 px-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{errorpin}</p>
                    )}
                  </div>

                  {/* Terms */}
                  <div className="col-span-2 flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-500"
                      checked={isCheckboxSelected}
                      onChange={(e) => setIsCheckboxSelected(e.target.checked)}
                    />
                    <label className="ml-2 text-xs sm:text-sm">
                      I authorise Orbits work and its affiliates to contact me,
                      overriding my registration for DNC/NDNC, if any, and I
                      have understood and agree with the{" "}
                      <Link
                        to="/privacy_policy"
                        className="hover:underline text-orange-500">
                        Terms and Conditions
                      </Link>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-orange-500 text-white font-bold py-2 px-4 text-sm sm:text-base rounded-lg hover:bg-orange-600"
                      onClick={handlePhoneAuth}>
                      Generate OTP
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Tracker Section */}

            {/* Tracker Section */}
            <div className="bg-black text-white p-6 rounded-lg lg:col-span-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-6">My Tracker</h3>
              <div className="space-y-4">
                {/* Step 1 */}
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span
                      className={`h-6 w-6 ${
                        currentStep >= 1 ? "bg-green-500" : "bg-orange-500"
                      } rounded-full flex justify-center items-center text-white text-sm`}>
                      {currentStep > 1 ? "✓" : "1"}
                    </span>
                  </div>
                  <p className="ml-4 text-sm">Submit Basic Details</p>
                </div>
                {/* Step 2 */}
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span
                      className={`h-6 w-6 ${
                        currentStep >= 2
                          ? "bg-green-500"
                          : "border-2 border-white bg-orange-500"
                      } rounded-full flex justify-center items-center text-white text-sm`}>
                      {currentStep > 2 ? "✓" : "2"}
                    </span>
                  </div>
                  <p className="ml-4 text-sm">Generate OTP</p>
                </div>
                {/* Step 3 */}
                {/* Step 3 */}
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span
                      className={`h-6 w-6 ${
                        currentStep >= 3
                          ? "bg-green-500"
                          : "border-2 border-white bg-orange-500"
                      } rounded-full flex justify-center items-center text-white text-sm`}>
                      {currentStep > 3 ? "✓" : currentStep === 3 ? "✓" : "3"}
                    </span>
                  </div>
                  <p className="ml-4 text-sm">Review Loan Details</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Tracker Section */}
      </div>
    </>
  );
}

export default LoanForm;
