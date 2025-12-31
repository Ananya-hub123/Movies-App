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
        console.log("Response data:", response.data);
        console.log("Response token:", response.data?.token);
        
        // Store token in localStorage if present
        if (response.data && response.data.token) {
          localStorage.setItem("token", response.data.token);
          console.log("Token stored in localStorage:", response.data.token);
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
