import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API,
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().user;
    if (token) {
      headers.set("authorization", `Token ${token}`);
    }
    return headers;
  },
})

const tagTypes = ["User", "Skill", "Time"];

const api = createApi({
  baseQuery,
  tagTypes,
  endpoints: () => ({}),
});

export default api;