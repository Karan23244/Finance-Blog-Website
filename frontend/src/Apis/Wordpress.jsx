// src/api/wordpress.js
import axios from "axios";

const BASE_URL = "https://cms.trustfinancialadvisory.com/wp-json/wp/v2";

export const fetchCategories = async (limit = 7) => {
  const res = await axios.get(`${BASE_URL}/categories?per_page=100`);
  return res.data;
};
export const fetchLatestPosts = async (limit = 20) => {
  const res = await axios.get(
    `${BASE_URL}/posts?_embed&per_page=${limit}&orderby=date&order=desc`
  );
  return res.data;
};

// // Function to fetch sub-category IDs for a given parent category
// const fetchSubCategoryIds = async (parentCategoryId) => {
//   try {
//     const res = await axios.get(
//       `${BASE_URL}/categories?parent=${parentCategoryId}&per_page=100`
//     );
//     return res.data.map((cat) => cat.id);
//   } catch (error) {
//     console.error("Error fetching sub-categories:", error);
//     return [];
//   }
// };

// // Function to fetch posts from a category and all its sub-categories
// export const fetchPostsWithSubcategories = async ({
//   limit = 7
// }) => {
//   try {
//     // Fetch sub-category IDs
//     const subCategoryIds = await fetchSubCategoryIds(categoryId);

//     // Combine parent and sub-category IDs
//     const allCategoryIds = [...subCategoryIds];
//     console.log("All Category IDs:", allCategoryIds);
//     const categoryParam = allCategoryIds.join(",");

//     // Fetch posts with combined category IDs
//     const res = await axios.get(
//       `${BASE_URL}/posts?categories=${categoryParam}&_embed&per_page=${limit}&orderby=date&order=desc`
//     );
//     console.log("Fetched Posts:", res.data);
//     return res.data;
//   } catch (error) {
//     console.error("Error fetching posts with subcategories:", error);
//     return [];
//   }
// };

// // Example usage
// export const fetchPersonalFinancePosts = async () => {
//   return await fetchPostsWithSubcategories({ limit: 7, categoryId: 9 });
// };

// export const fetchInvestmentPosts = async () => {
//   return await fetchPostsWithSubcategories({ limit: 7, categoryId: 12 });
// };

// export const fetchRiskManagementPosts = async () => {
//   return await fetchPostsWithSubcategories({ limit: 7, categoryId: 17 });
// };
