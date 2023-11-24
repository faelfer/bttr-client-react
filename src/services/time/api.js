import api from "../api";

export const timeApi = api.injectEndpoints({
  endpoints: (build) => ({
    timesByPage: build.query({
      query: (page = 1) => `/times/times_by_page?page=${page}`,
      transformResponse: (response, meta, arg) => {
        const countPages = Math.ceil(response.count / 5);
        return {
          ...response,
          pages: countPages,
        };
      },
    }),
    timesByDate: build.mutation({
      query: (body) => ({
        url: `/times/times_by_date?skill_id=${body.id}&date_initial=${body.firstDay}&date_final=${body.lastDay}`,
        method: "GET",
      }),
    }),
    time: build.mutation({
      query: (id) => ({
        url: `/times/time_by_id/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Time" }],
    }),
    timeCreate: build.mutation({
      query: (body) => ({
        url: "/times/create_time",
        method: "POST",
        body,
      }),
      invalidatesTags: (id) => [{ type: "Time", id }],
    }),
    timeUpdate: build.mutation({
      query: (data) => ({
        url: `/times/update_time_by_id/${data.id}`,
        method: "PUT",
        body: data.time,
      }),
      invalidatesTags: (id) => [{ type: "Time", id }],
    }),
    timeDelete: build.mutation({
      query: (id) => ({
        url: `/times/delete_time_by_id/${id}`,
        method: "DELETE",
      }),
      providesTags: [{ type: "Time" }],
    }),
  }),
});

export const {
  useTimesByPageQuery,
  useTimesByDateMutation,
  useTimeMutation,
  useTimeCreateMutation,
  useTimeUpdateMutation,
  useTimeDeleteMutation,
} = timeApi;
