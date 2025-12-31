import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response, meta, arg) => {
        console.log("=== LOGIN RESPONSE DEBUG ===");
        console.log("Raw response:", response);
        console.log("Response type:", typeof response);
        console.log("Response constructor:", response?.constructor?.name);
        console.log("Response keys:", response ? Object.keys(response) : "null");
        
        // Try different ways to access the data
        let responseData = null;
        let token = null;
        
        if (response) {
          // Try direct response
          if (response.token) {
            responseData = response;
            token = response.token;
            console.log("Found token in direct response");
          }
          // Try response.data
          else if (response.data && response.data.token) {
            responseData = response.data;
            token = response.data.token;
            console.log("Found token in response.data");
          }
          // Try nested structures
          else if (response.data && response.data.data && response.data.data.token) {
            responseData = response.data.data;
            token = response.data.data.token;
            console.log("Found token in response.data.data");
          }
          // Try any nested token
          else {
            console.log("Searching for token in nested structure...");
            const findToken = (obj) => {
              if (!obj || typeof obj !== 'object') return null;
              if (obj.token) return obj.token;
              for (let key in obj) {
                const result = findToken(obj[key]);
                if (result) return result;
              }
              return null;
            };
            token = findToken(response);
            if (token) {
              responseData = response;
              console.log("Found token in nested structure");
            }
          }
        }
        
        console.log("Final token found:", token ? token.substring(0, 20) + "..." : "none");
        console.log("Final response data:", responseData);
        
        // Store token in localStorage if present
        if (token) {
          localStorage.setItem("token", token);
          console.log("Token stored in localStorage:", token.substring(0, 20) + "...");
        } else {
          console.log("No token found anywhere in response");
        }
        console.log("============================");
        return response;
      },
    }),

    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),

    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
    }),

    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useProfileMutation,
  useGetUsersQuery,
} = userApiSlice;
