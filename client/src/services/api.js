import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3030',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  reducerPath: 'api',
  baseQuery,
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: 'users',
        method: 'POST',
        body: user,
      }),
    }),
    authenticateUser: builder.mutation({
      query: (credentials) => ({
        url: 'authentication',
        method: 'POST',
        body: {
          strategy: 'local',
          ...credentials,
        },
      }),
    }),
    getUserInfo: builder.query({
      query: (userId) => `users/${userId}`,
    }),
    getUserExperiences: builder.query({
      query: () => 'experiences',
    }),
    addExperience: builder.mutation({
      query: (experience) => ({
        url: 'experiences',
        method: 'POST',
        body: experience,
      }),
    }),
    modifyExperience: builder.mutation({
      query: ({ id, ...experience }) => ({
        url: `experiences/${id}`,
        method: 'PATCH',
        body: experience,
      }),
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `experiences/${id}`,
        method: 'DELETE',
      }),
    }),
    getJob: builder.query({
      query: (jobId) => `jobs/${jobId}`,
    }),
    getJobs: builder.query({
      query: (params) => ({
        url: 'jobs',
        params,
      }),
    }),
    addJob: builder.mutation({
      query: (job) => ({
        url: 'jobs',
        method: 'POST',
        body: job,
      }),
    }),
    updateJob: builder.mutation({
      query: ({ id, ...job }) => ({
        url: `jobs/${id}`,
        method: 'PATCH',
        body: job,
      }),
    }),
    deleteJob: builder.mutation({
      query: (id) => ({
        url: `jobs/${id}`,
        method: 'DELETE',
      }),
    }),
    applyForJob: builder.mutation({
      query: (application) => ({
        url: 'applicants',
        method: 'POST',
        body: application,
      }),
    }),
    removeApplication: builder.mutation({
      query: (id) => ({
        url: `applicants/${id}`,
        method: 'DELETE',
      }),
    }),
    getApplicantsForJob: builder.query({
      query: (jobId) => `applicants?jobId=${jobId}`,
    }),
    getJobsForApplicant: builder.query({
      query: (userId) => `applicants?userId=${userId}`,
    }),
    addJobUser: builder.mutation({
      query: (jobUser) => ({
        url: 'jobs_users',
        method: 'POST',
        body: jobUser,
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useAuthenticateUserMutation,
  useGetUserInfoQuery,
  useGetUserExperiencesQuery,
  useAddExperienceMutation,
  useModifyExperienceMutation,
  useDeleteExperienceMutation,
  useGetJobQuery,
  useGetJobsQuery,
  useAddJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useApplyForJobMutation,
  useRemoveApplicationMutation,
  useGetApplicantsForJobQuery,
  useGetJobsForApplicantQuery,
  useAddJobUserMutation,
} = api;
