import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CreateTag from "../models/createTags";
import Tag from "../models/tags";
import { createBaseQueryWithReauth } from "../../../shared/api/baseQuery";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery: createBaseQueryWithReauth("http://localhost:5129"),
  endpoints: (builder) => ({
    getTags: builder.query<Tag[], void>({
      query: () => ({
        url: "api/tag/tags",
        method: "GET",
      }),
    }),

    getTagsById: builder.query<Tag, string>({
      query: (id) => ({
        url: `api/tag/${id}`,
        method: "GET",
      }),
    }),

    createTags: builder.mutation<Tag, CreateTag>({
      query: (body) => ({
        url: `api/tag/${body.id}`,
        method: "POST",
        body: body,
      }),
    }),

    updateTags: builder.mutation<Tag, Partial<Tag>>({
      query: (data) => ({
        url: `api/tag/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteTags: builder.mutation<void, string>({
      query: (id) => ({
        url: `api/tag/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTagsQuery,
  useUpdateTagsMutation,
  useCreateTagsMutation,
  useGetTagsByIdQuery,
  useDeleteTagsMutation,
} = tagsApi;
