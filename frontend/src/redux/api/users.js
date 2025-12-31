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
        console.log("=== LOGIN TRANSFORM RESPONSE DEBUG ===");
        console.log("Response:", response);
        console.log("Response.token:", response?.token);
        console.log("Response.data:", response?.data);
        
        // Store token in localStorage if present
        if (response && response.token) {
          localStorage.setItem("token", response.token);
          console.log("Token stored in localStorage:", response.token);
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
