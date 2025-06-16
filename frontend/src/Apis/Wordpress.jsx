// src/api/wordpress.js
import axios from "axios";

const BASE_URL = "https://cms.trustfinancialadvisory.com/wp-json/wp/v2";


export const fetchCategories = async (limit = 7) => {
  const res = await axios.get(
    `${BASE_URL}/categories?per_page=100`
  );
  return res.data;
};
export const fetchLatestPosts = async (limit = 7) => {
  const res = await axios.get(
    `${BASE_URL}/posts?_embed&per_page=${limit}&orderby=date&order=desc`
  );
  return res.data;
};
export const fetchPersonalFinancePosts = async ({
  limit = 7,
  categoryId = 9,
}) => {
  const res = await axios.get(
    `${BASE_URL}/posts?categories=${categoryId}&_embed&per_page=${limit}&orderby=date&order=desc`
  );
  return res.data;
};
export const fetchInvestmentPosts = async ({ limit = 7, categoryId = 12 }) => {
  const res = await axios.get(
    `${BASE_URL}/posts?categories=${categoryId}&_embed&per_page=${limit}&orderby=date&order=desc`
  );
  return res.data;
};
export const fetchRiskManagementPosts = async ({
  limit = 7,
  categoryId = 17,
}) => {
  const res = await axios.get(
    `${BASE_URL}/posts?categories=${categoryId}&_embed&per_page=${limit}&orderby=date&order=desc`
  );
  return res.data;
};
