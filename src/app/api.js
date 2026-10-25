import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// One place for every server call. RTK Query caches results and refetches
// after mutations, so components never hold server data in Redux by hand.
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/', credentials: 'same-origin' }),
  tagTypes: ['Me', 'Posts', 'Videos', 'VideoChannels', 'Quizzes'],
  endpoints: (build) => ({
    me: build.query({
      query: () => 'auth/me',
      providesTags: ['Me'],
    }),
    signUp: build.mutation({
      query: (body) => ({ url: 'auth/signup', method: 'POST', body }),
      invalidatesTags: ['Me'],
    }),
    login: build.mutation({
      query: (body) => ({ url: 'auth/login', method: 'POST', body }),
      invalidatesTags: ['Me'],
    }),
    logout: build.mutation({
      query: () => ({ url: 'auth/logout', method: 'POST' }),
      invalidatesTags: ['Me'],
    }),

    getPosts: build.query({
      query: () => 'posts',
      providesTags: ['Posts'],
    }),
    createPost: build.mutation({
      query: (body) => ({ url: 'posts', method: 'POST', body }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: build.mutation({
      query: ({ id, ...body }) => ({ url: `posts/${id}`, method: 'PUT', body }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: build.mutation({
      query: (id) => ({ url: `posts/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Posts'],
    }),

    getVideos: build.query({
      query: () => 'videos',
      providesTags: ['Videos'],
    }),
    createVideo: build.mutation({
      query: (body) => ({ url: 'videos', method: 'POST', body }),
      invalidatesTags: ['Videos'],
    }),
    updateVideo: build.mutation({
      query: ({ id, ...body }) => ({
        url: `videos/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Videos'],
    }),
    deleteVideo: build.mutation({
      query: (id) => ({ url: `videos/${id}`, method: 'DELETE' }),
      invalidatesTags: ['Videos'],
    }),

    getVideoChannels: build.query({
      query: () => 'video-channels',
      providesTags: ['VideoChannels'],
    }),

    getQuizzes: build.query({
      query: () => 'quizzes',
      providesTags: ['Quizzes'],
    }),
  }),
});

export const {
  useMeQuery,
  useSignUpMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetVideosQuery,
  useCreateVideoMutation,
  useUpdateVideoMutation,
  useDeleteVideoMutation,
  useGetVideoChannelsQuery,
  useGetQuizzesQuery,
} = api;
