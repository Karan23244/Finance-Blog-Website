import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../state/Authslice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import ScrollButtons from "./ScrollButton";
const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // Check if admin is authenticated
  useEffect(() => {
    // Handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    // Fetch categories from your API or backend
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/posts`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const responseData = await response.json();
        const data = responseData.data; // Extract the 'data' array containing posts
        setPosts(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchPosts();
    fetchCategories(); // Call the function to fetch categories on component mount
  }, []);

  const toggleMenu = () => {
    // If the search bar is open, close it when toggling the menu
    if (searchBarOpen) {
      setSearchBarOpen(false);
    }
    // Toggle the menu state
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearchBar = () => {
    // If the menu is open, close it when toggling the search bar
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    // Toggle the search bar state
    setSearchBarOpen(!searchBarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Refresh the page if the user is already on the home page
      window.location.reload();
    } else {
      // Navigate to the home page
      navigate("/");
    }
  };

  const groupedCategories = useMemo(() => {
    return categories.reduce((acc, category) => {
      if (!acc[category.category_type]) {
        acc[category.category_type] = [];
      }
      acc[category.category_type].push(category);
      return acc;
    }, {});
  }, [categories]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest(".suggestion-item")
      ) {
        setShowDropdown(false);
        setSearchBarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Stable debounced function
  const debouncedSearch = useCallback(
    debounce((query) => {
      if (query.trim()) {
        const matches = posts.filter(
          (post) =>
            post.title.toLowerCase().includes(query.toLowerCase()) ||
            post.content.toLowerCase().includes(query.toLowerCase())
        );
        setSuggestions(matches.slice(0, 6));
        setShowDropdown(matches.length > 0);
        setSearchBarOpen(true);
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300),
    [posts]
  );
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query); // Update the input value
    debouncedSearch(query); // Trigger debounced search
  };
  const handleSuggestionClick = (suggestion) => {
    navigate(
      `/${createSlug(suggestion?.categories[0]?.category_name)}/${createSlug(
        suggestion?.Custom_url
      )}`
    );
    setSearchQuery(""); // Clear search input
    setSuggestions([]); // Clear suggestions
    setShowDropdown(false); // Close dropdown
    setSearchBarOpen(false);
  };

  return (
    <>
      <header className="mb-[68px]">
        <nav className="fixed top-0 w-full z-50 bg-black shadow-md">
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center  lg:gap-4 gap-2 lg:w-[30%] pl-3 py-1">
              <div onClick={handleLogoClick} className="cursor-pointer">
                <Link to="/">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    loading="lazy"
                  />
                </Link>
              </div>
              <div>
                <h1 className="lg:text-lg text-[#FF822E] text-sm font-medium text-center">
                  Trust Finance Advisory
                </h1>
              </div>
            </div>

            <div className="flex items-center lg:order-2 pr-3">
              {!isAuthenticated && (
                <button
                  className="text-white mr-4 lg:hidden"
                  onClick={toggleSearchBar}
                  aria-label="Search">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5a7 7 0 100 14 7 7 0 000-14z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      w
                      d="M21 21l-4.35-4.35"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={toggleMenu}
                className="inline-flex items-center p-2 text-sm text-white rounded-lg lg:hidden">
                <span className="sr-only">Open main menu</span>
                {/* Hamburger Icon */}
                <svg
                  className={`w-6 h-6 ${isMenuOpen ? "hidden" : "block"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                {/* Close Icon */}
                <svg
                  className={`w-6 h-6 ${isMenuOpen ? "block" : "hidden"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/* Desktop Links */}
            <div
              className="lg:flex items-center hidden justify-end lg:w-[70%] lg:order-1 pr-3"
              id="mobile-menu-2">
              <div className="flex flex-col items-center gap-5 text-black font-medium lg:flex-row">
                {isAuthenticated ? (
                  <>
                    <div>
                      <Link
                        to="/admin/category"
                        className="block py-2 pr-4 pl-3 text-white lg:py-1 lg:px-4 font-bold">
                        Category
                      </Link>
                    </div>
                    <div>
                      <Link
                        to="/admin/authors"
                        className="block py-2 pr-4 pl-3 text-white lg:py-1 lg:px-4 font-bold">
                        Authors
                      </Link>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-white bg-[#FF822E] rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 font-bold focus:outline-none">
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex flex-row justify-center items-center gap-20">
                      <div
                        className={`${
                          isMenuOpen ? "block" : "hidden"
                        } w-full lg:flex lg:items-center lg:justify-between lg:w-auto `}>
                        <ul className="flex flex-col lg:flex-row lg:space-x-8 gap-14">
                          {Object.keys(groupedCategories).map((type) => (
                            <li className="relative group" key={type}>
                              <button className="block text-white text-base font-semibold">
                                {type}
                              </button>
                              <ul className="absolute hidden group-hover:block w-[250px] z-200 bg-black border-b-2 border-orange-400">
                                {groupedCategories[type].map((category) => (
                                  <li
                                    key={category.category_id}
                                    className="p-1 cursor-pointer transition-transform duration-200 ">
                                    <Link
                                      to={`/categoryData?categoryId=${
                                        category.category_id
                                      }&categoryName=${encodeURIComponent(
                                        category.category_name
                                      )}&categoryType=${encodeURIComponent(
                                        category.category_type
                                      )}`}
                                      className="block px-4 py-2 text-white hover:text-[#FF822E]">
                                      {category.category_name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchChange}
                          placeholder="Search blogs..."
                          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-1 focus:ring-orange-400"
                        />
                        {showDropdown && (
                          <ul
                            ref={dropdownRef}
                            className="suggestion-item absolute bg-white border border-black rounded-xl shadow-lg w-[calc(100%+10rem)] -left-[10rem] mt-2 py-5 transition-all z-10">
                            <div className="px-4">
                              <span className="text-md text-semibold">
                                Searching For
                              </span>
                            </div>
                            {suggestions.map((suggestion) => (
                              <li
                                key={suggestion?.id}
                                className="px-6 py-2 flex items-center font-medium justify-between hover:bg-gray-200 hover:border-[#FF822E] hover:border-l-4 cursor-pointer transition-transform duration-200"
                                onClick={() =>
                                  handleSuggestionClick(suggestion)
                                }>
                                <div>
                                  <span className="flex-grow">
                                    {suggestion?.title}
                                  </span>
                                </div>
                                <div>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-700"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M7 17l9-9m0 0v6m0-6H10"
                                    />
                                  </svg>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Links */}
            <div
              className={`lg:hidden absolute w-full bg-black shadow-lg transition-all duration-300 ease-in-out ${
                isMenuOpen
                  ? "opacity-100 top-[100%] visible"
                  : "opacity-0 -top-full invisible"
              }`}
              style={{ zIndex: 1000 }}>
              <ul className="space-y-4">
                {isAuthenticated ? (
                  <>
                    <li>
                      <Link to="/admin/category" className="text-white">
                        Category
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/authors" className="text-white ">
                        Authors
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-white bg-blue-600 px-4 py-2 rounded-md  w-full">
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <div className="flex flex-col gap-4">
                      {Object.keys(groupedCategories).map((type) => (
                        <div key={type} className="relative group">
                          {/* Category Header */}
                          <button
                            className="flex justify-between items-center w-full px-4 py-2 text-white text-base font-semibold border-b"
                            onClick={() =>
                              setActiveCategory(
                                activeCategory === type ? null : type
                              )
                            }>
                            {type}
                            {/* Chevron icon */}
                            {activeCategory === type ? (
                              <FaChevronUp className="text-white text-sm" />
                            ) : (
                              <FaChevronDown className="text-white text-sm" />
                            )}
                          </button>
                          {/* Dropdown Content */}
                          <ul
                            className={`transition-all duration-300 ease-in-out overflow-hidden ${
                              activeCategory === type
                                ? "max-h-[500px]"
                                : "max-h-0"
                            }`}>
                            {groupedCategories[type].map((category) => (
                              <li
                                key={category.category_id}
                                className="text-base px-4 py-2 text-white">
                                <Link
                                  to={`/categoryData?categoryId=${
                                    category.category_id
                                  }&categoryName=${encodeURIComponent(
                                    category.category_name
                                  )}&categoryType=${encodeURIComponent(
                                    category.category_type
                                  )}`}
                                  className="block">
                                  {category.category_name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </ul>
            </div>

            {/* Search Bar */}
            <div
              className={`lg:hidden absolute w-full bg-black shadow-lg transition-all duration-300 ease-in-out ${
                searchBarOpen
                  ? "opacity-100 top-[100%] visible"
                  : "opacity-0 -top-full invisible"
              }`}
              style={{ zIndex: 1000 }}>
              <div className="p-4 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search blogs..."
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />
                {showDropdown && (
                  <ul
                    ref={dropdownRef}
                    className="suggestion-item absolute bg-black border rounded-lg mt-2 w-full z-10">
                    {suggestions.map((suggestion) => (
                      <li
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="px-4 py-2 hover:bg-gray-100 text-white cursor-pointer">
                        {suggestion.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
      <ScrollButtons />
    </>
  );
}
// Helper function to create slug
const createSlug = (title) => {
  // Check if the title is not null and is a string before processing
  if (typeof title !== "string") {
    return ""; // Return an empty string or handle the case as needed
  }

  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
};
export default Navbar;
