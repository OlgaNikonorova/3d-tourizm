import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import CreatePlacePhoto from "../models/createPlacePhoto";
import PlacePhoto from "../models/placePhoto";
import { createBaseQueryWithReauth } from "../../../shared/api/baseQuery";

export const placePhotoApi = createApi({
    reducerPath: "placePhotoApi",
    baseQuery: createBaseQueryWithReauth("http://localhost:5129"),
    endpoints: (builder) => ({

        getPlacePhotos: builder.query<PlacePhoto[], void>({
            query: () => ({
                url: "api/placePhoto",
                method: "GET",
            }),
        }),

        getPlacePhotoById: builder.query<PlacePhoto, string>({
            query: (id) => ({
                url: `api/placePhoto/${id}`,
                method: "GET",
            }),
        }),

        createPlacePhoto: builder.mutation<PlacePhoto, CreatePlacePhoto>({
            query: (body) => ({
                url: "api/placePhoto",
                method: "POST",
                body,
            }),
        }),

        updatePlacePhoto: builder.mutation<PlacePhoto, { id: string; data: Partial<CreatePlacePhoto> }>({
            query: ({ id, data }) => ({
                url: `api/placePhoto/${id}`,
                method: "PATCH",
                body: data,
            }),
        }),

        deletePlacePhoto: builder.mutation<void, string>({
            query: (id) => ({
                url: `api/placePhoto/${id}`,
                method: "DELETE",
            }),
        }),
    }),
});

export const {
    useGetPlacePhotosQuery,
    useGetPlacePhotoByIdQuery,
    useCreatePlacePhotoMutation,
    useUpdatePlacePhotoMutation,
    useDeletePlacePhotoMutation,
} = placePhotoApi;
