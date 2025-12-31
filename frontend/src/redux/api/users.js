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
        console.log("Response type:", typeof response);
        console.log("Response keys:", response ? Object.keys(response) : "null");
        
        // Handle different response structures
        let responseData = response;
        if (response && response.data) {
          responseData = response.data;
        }
        
        console.log("Processed response data:", responseData);
        console.log("Token in processed data:", responseData?.token);
        
        // Store token in localStorage if present
        if (responseData && responseData.token) {
          localStorage.setItem("token", responseData.token);
          console.log("Token stored in localStorage:", responseData.token);
        } else {
          console.log("No token found in response");
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
