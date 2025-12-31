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
      transformResponse: (response) => {
        console.log("=== LOGIN RESPONSE DEBUG ===");
        console.log("Full response:", response);
        console.log("Response structure:", JSON.stringify(response, null, 2));
        
        // Store token in localStorage if present
        if (response.token) {
          localStorage.setItem("token", response.token);
          console.log("Token stored in localStorage:", response.token);
        } else if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          console.log("Token stored from response.data:", response.data.token);
        } else {
          console.log("No token found in response");
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
