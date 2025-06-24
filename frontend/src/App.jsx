import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

// Common Components
import Navbar from "./Common/Navbar";
import PageNotFound from "./Common/PageNotFound";
import Disclaimer from "./Common/Disclaimer";
import Privacy_Policy from "./Common/Privacy_Policy";
import About_us from "./Common/About_Us";
import Terms_and_Condition from "./Common/Terms_and_Condition";
import ScrollToTop from "./Common/ScrollToTop";
import CampainHome1 from "./Components/User/CampainHome1";
import CampainHome2 from "./Components/User/CampainHome2";
import CategoryBlogs from "./Pages/CategoryBlogs";
import RiskManagement from "./Pages/RiskManagement";
import Personalfinance from "./Pages/PersonalFinance";
import Investment from "./Pages/Investment";

const Popup = React.lazy(() => import("./Common/Popup"));

// Lazy-loading User Components
const UserHome = React.lazy(() => import("./Pages/UserHome"));
const CalculatorHome = React.lazy(() => import("./Pages/CalculatorHome"));
const CalculatorPage = React.lazy(() =>
  import("./Components/User/Calculator/CalculatorPage")
);
const FullPostAdmin = React.lazy(() => import("./Pages/FullPosts"));
function App() {
  // Prevent unnecessary re-renders
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated,
    shallowEqual
  );

  return (
    <HelmetProvider>
      <Router>
        <Navbar />
        <Popup />
        <ScrollToTop />
        <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<UserHome/>} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy_policy" element={<Privacy_Policy />} />
            <Route path="/fast-financial-help" element={<CampainHome1 />} />
            <Route path="/urgent-financial-needs" element={<CampainHome2 />} />
            <Route
              path="/terms_and_condition"
              element={<Terms_and_Condition />}
            />
            <Route path="/About_us" element={<About_us />} />
            <Route path="/:param1/:param2" element={<CategoryBlogs />} />
            <Route
              path="/:param1/:param2/:param3"
              element={<FullPostAdmin />}
            />
            <Route path="/calculator" element={<CalculatorHome />} />
            <Route path="/risk-management" element={<RiskManagement />} />
            <Route path="/personal-finance" element={<Personalfinance />} />
            <Route
              path="/investment-and-wealth-growth"
              element={<Investment />}
            />
            <Route
              path="/calculator/:calculatorName"
              element={<CalculatorPage />}
            />

            {/* Catch-all for undefined routes */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
}

export default App;
