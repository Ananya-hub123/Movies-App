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
        console.log("Full response:", response);
        console.log("Meta:", meta);
        console.log("Arg:", arg);
        console.log("Response type:", typeof response);
        console.log("Response structure:", JSON.stringify(response, null, 2));
        
        // Handle different response structures
        let token = null;
        if (response && response.token) {
          token = response.token;
          console.log("Found token in response.token:", token);
        } else if (response && response.data && response.data.token) {
          token = response.data.token;
          console.log("Found token in response.data.token:", token);
        } else if (response && typeof response === 'object') {
          // Check if response itself is the token string
          if (typeof response === 'string') {
            token = response;
            console.log("Response itself is token:", token);
          } else {
            console.log("No token found in response structure");
          }
        }
        
        if (token) {
          localStorage.setItem("token", token);
          console.log("Token stored in localStorage:", token);
        } else {
          console.log("No token found to store");
        }
        
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
