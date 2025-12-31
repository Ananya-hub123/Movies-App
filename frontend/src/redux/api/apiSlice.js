import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");
    console.log("=== PREPARE HEADERS DEBUG ===");
    console.log("Token from localStorage:", token ? token.substring(0, 20) + "..." : "none");
    
    if (token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${token}`,
      };
      console.log("Headers after adding Authorization:", headers);
    } else {
      console.log("No token found, headers unchanged:", headers);
    }
    console.log("============================");
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: () => ({}),
});
