import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const formatCategory = (str) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const BASE_URL = "https://cms.trustfinancialadvisory.com/wp-json/wp/v2";

const usePostsByCategory = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryId, setCategoryId] = useState(null);

  const { param1, param2 } = useParams(); // Get slugs from URL
  const formattedCategoryType = param1 ? formatCategory(param1) : "";
  const formattedCategoryName = param2 ? formatCategory(param2) : "";

  // Define pagination limits per category type
  const categoryLimits = {
    "Personal Finance": 4,
    "Investment And Wealth Growth": 19,
    "Risk Management": 12,
  };

  // 1. Fetch category ID based on slug
  const fetchCategoryId = async () => {
    try {
      const slug = param2 || param1;
      const res = await axios.get(
        `${BASE_URL}/categories?_embed=true&slug=${slug}`
      );
      if (res.data.length > 0) {
        setCategoryId(res.data[0].id);
      }
    } catch (err) {
      console.error("Error fetching category:", err);
      setError(err);
    }
  };

  // 2. Fetch posts for that category ID
  const fetchPosts = async (page = 1) => {
    if (!categoryId) return;

    try {
      setLoading(true);
      const limit = categoryLimits[formattedCategoryType] || 10;

      const res = await axios.get(
        `${BASE_URL}/posts?_embed=true&categories=${categoryId}&page=${page}&per_page=${limit}`
      );

      setPosts(res.data);
      setTotalPages(Number(res.headers["x-wp-totalpages"]) || 1);
      setCurrentPage(page);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch category ID when params change
  useEffect(() => {
    if (param1 || param2) {
      fetchCategoryId();
    }
  }, [param1, param2]);

  // Fetch posts when category ID is known
  useEffect(() => {
    if (categoryId) {
      fetchPosts(1); // Reset to first page
    }
  }, [categoryId]);

  return {
    posts,
    loading,
    error,
    categoryName: formattedCategoryName,
    categoryType: formattedCategoryType,
    totalPages,
    currentPage,
    fetchPosts, // For manual page changes
  };
};

export default usePostsByCategory;
