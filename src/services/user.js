import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { REHYDRATE } from "redux-persist";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["User"],
  endpoints: (build) => ({
    signUp: build.mutation({
      query: (body) => ({
        url: `/users/sign_up`,
        method: "POST",
        body,
      }),
      invalidatesTags: (error) => [{ type: "User", id: "LIST", error }],
    }),
  }),
});

export const { useSignUpMutation } = api;
