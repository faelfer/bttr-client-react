import api from "../api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    forgotPassword: build.mutation({
      query: (body) => ({
        url: "/users/forgot_password",
        method: "POST",
        body,
      }),
    }),
    signUp: build.mutation({
      query: (body) => ({
        url: "/users/sign_up",
        method: "POST",
        body,
      }),
    }),
    signIn: build.mutation({
      query: (credentials) => ({
        url: "/users/sign_in",
        method: "POST",
        body: credentials,
      }),
    }),
    profile: build.mutation({
      query: () => ({
        url: "/users/profile",
        method: "GET",
      }),
    }),
    profileUpdate: build.mutation({
      query: (body) => ({
        url: "/users/profile",
        method: "PATCH",
        body,
      }),
    }),
    profileDelete: build.mutation({
      query: () => ({
        url: "/users/profile",
        method: "DELETE",
      }),
    }),
    redefinePassword: build.mutation({
      query: (body) => ({
        url: "/users/redefine_password",
        method: "POST",
        body,
      }),
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
