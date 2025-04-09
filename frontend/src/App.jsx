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
import Footer from "./Common/Footer";
import ProtectedRoute from "./Common/ProtectedRoute";
import PageNotFound from "./Common/PageNotFound";
import Unauthorized from "./Common/Unauthorized";
import Disclaimer from "./Common/Disclaimer";
import Privacy_Policy from "./Common/Privacy_Policy";
import About_us from "./Common/About_Us";
import Terms_and_Condition from "./Common/Terms_and_Condition";
import Subscribe from "./Common/Subscribe";
import ScrollToTop from "./Common/ScrollToTop";
const Popup = React.lazy(() => import("./Common/Popup"));

// Lazy-loading User Components
const UserHome = React.lazy(() => import("./Components/User/UserHome"));
const CalculatorHome = React.lazy(() =>
  import("./Components/User/CalculatorHome")
);
const CalculatorPage = React.lazy(() =>
  import("./Components/User/Calculator/CalculatorPage")
);
const RouteHandler = React.lazy(() => import("./RouteHandler"));

// Lazy-loading Admin Components
const AdminLogin = React.lazy(() => import("./Components/Admin/AdminLogin"));
const Admin = React.lazy(() => import("./Components/Admin/Admin"));
const FullPostAdmin = React.lazy(() =>
  import("./Components/Admin/AdminPosts/FullPosts")
);
const CategoriesTable = React.lazy(() =>
  import("./Components/Admin/Categories")
);
const Authors = React.lazy(() => import("./Components/Admin/Authors"));
const EditPost = React.lazy(() =>
  import("./Components/Admin/New_Post/NewPost")
);

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
            <Route
              path="/"
              element={
                isAuthenticated ? <Navigate to="/admin/home" /> : <UserHome />
              }
            />
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy_policy" element={<Privacy_Policy />} />
            <Route
              path="/terms_and_condition"
              element={<Terms_and_Condition />}
            />
            <Route path="/About_us" element={<About_us />} />
            <Route path="/:param1/:param2" element={<RouteHandler />} />
            <Route path="/calculator" element={<CalculatorHome />} />
            <Route
              path="/calculator/:calculatorName"
              element={<CalculatorPage />}
            />

            {/* Admin Routes (Protected) */}
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <Suspense
                    fallback={
                      <div className="loading-spinner">Loading Admin...</div>
                    }>
                    <Routes>
                      <Route path="home" element={<Admin />} />
                      <Route path="category" element={<CategoriesTable />} />
                      <Route path="edit-post/:id" element={<EditPost />} />
                      <Route path="authors" element={<Authors />} />
                    </Routes>
                  </Suspense>
                </ProtectedRoute>
              }
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
