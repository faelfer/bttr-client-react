import api from '../api'

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    skills: build.query({
      query: () => ({ url: "/skills/skills_from_user" }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Skill", id })),
        { type: "Skill", id: 'LIST' },
      ],
    }),
    skillsByPage: build.query({
      query: (page = 1) => `/skills/skills_by_page?page=${page}`,
    }),
    skill: build.mutation({
      query: (id) => ({
        url: `/skills/skill_by_id/${id}`,
        method: "GET",
      }),
      providesTags: [{ type: "Skill" }],
    }),
    skillCreate: build.mutation({
      query: (body) => ({
        url: "/skills/create_skill",
        method: "POST",
        body,
      }),
      invalidatesTags: (id) => [{ type: "Skill", id }],
    }),
    skillUpdate: build.mutation({
      query: (id, body) => ({
        url: `/skills/update_skill_by_id/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (id) => [{ type: "Skill", id}],
    }),
    skillDelete: build.mutation({
      query: (id) => ({
        url: `/skills/delete_skill_by_id/${id}`,
        method: "DELETE",
      }),
      providesTags: [{ type: "Skill" }],
    }),
  }),
});

export const { 
  useSkillsQuery,
  useSkillsByPageQuery,
  useSkillMutation,
  useSkillUpdateMutation,
  useSkillDeleteMutation,
 } = userApi;
