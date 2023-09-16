import api from "../api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    forgotPassword: build.mutation({
      query: (body) => ({
        url: "/users/forgot_password",
        method: "POST",
        body,
      }),
      invalidatesTags: (error) => [{ type: "User", id: "LIST", error }],
    }),
    signUp: build.mutation({
      query: (body) => ({
        url: "/users/sign_up",
        method: "POST",
        body,
      }),
      invalidatesTags: (error) => [{ type: "User", id: "LIST", error }],
    }),
    signIn: build.mutation({
      query: (credentials) => ({
        url: "/users/sign_in",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    profile: build.mutation({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
      providesTags: [{ type: "User" }],
    }),
    profileUpdate: build.mutation({
      query: (body) => ({
        url: "/users/profile",
        method: "PATCH",
        body,
      }),
      invalidatesTags: (error) => [{ type: "User", id: "LIST", error }],
    }),
    profileDelete: build.mutation({
      query: () => ({
        url: "/users/profile",
        method: "DELETE",
      }),
      providesTags: [{ type: "User" }],
    }),
    redefinePassword: build.mutation({
      query: (body) => ({
        url: "/users/redefine_password",
        method: "POST",
        body,
      }),
      invalidatesTags: (error) => [{ type: "User", id: "LIST", error }],
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useSignUpMutation,
  useSignInMutation,
  useProfileMutation,
  useProfileUpdateMutation,
  useProfileDeleteMutation,
  useRedefinePasswordMutation,
} = userApi;
