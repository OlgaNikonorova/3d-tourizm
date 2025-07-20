import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CreatePlaceTag from "../models/createPlaceTag";
import PlaceTag from "../models/placeTag";
import { createBaseQueryWithReauth } from "../../../shared/api/baseQuery";

export const placeTagApi = createApi({
    reducerPath: "placeTagApi",
    baseQuery: createBaseQueryWithReauth("http://localhost:5129"),
    endpoints: (builder) => ({

        getPlaceTags: builder.query<PlaceTag[], void>({
            query: () => ({
                url: "api/placeTag",
                method: "GET",
            }),
        }),

        getPlaceTagById: builder.query<PlaceTag, string>({
            query: (id) => ({
                url: `api/placeTag/${id}`,
                method: "GET",
            }),
        }),

        createPlaceTag: builder.mutation<PlaceTag, CreatePlaceTag>({
            query: (body) => ({
                url: "api/placeTag",
                method: "POST",
                body,
            }),
        }),

        updatePlaceTag: builder.mutation<PlaceTag, { id: string; data: Partial<CreatePlaceTag> }>({
            query: ({ id, data }) => ({
                url: `api/placeTag/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),

        deletePlaceTag: builder.mutation<void, string>({
            query: (id) => ({
                url: `api/placeTag/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetPlaceTagsQuery,
    useGetPlaceTagByIdQuery,
    useCreatePlaceTagMutation,
    useUpdatePlaceTagMutation,
    useDeletePlaceTagMutation,
} = placeTagApi;
