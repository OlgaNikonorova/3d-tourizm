import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import Place from "../model/place";
import GetPlaces from "../model/getPlaces";
import CreatePlace from "../model/createPlace";
import { createBaseQueryWithReauth } from "../../../shared/api/baseQuery";

export const placeApi = createApi({
  reducerPath: "placeApi",
  baseQuery: createBaseQueryWithReauth("http://localhost:5129"),
  endpoints: (builder) => ({
    getPlaces: builder.query<Place[], GetPlaces>({
      query: (params) => ({
        url: "api/place/places",
        method: "GET",
        params,
      }),
    }),

    getPlaceById: builder.query<Place, string>({
      query: (id) => ({
        url: `api/place/${id}`,
        method: "GET",
      }),
    }),

    createPlace: builder.mutation<Place, CreatePlace>({
      query: (body) => ({
        url: `api/place/${body.id}`,
        method: "POST",
        body,
      }),
    }),

    updatePlace: builder.mutation<Place, CreatePlace>({
      query: (CreatePlace) => ({
        url: `api/place/${CreatePlace.id}`,
        method: "PUT",
        body: CreatePlace,
      }),
    }),

    deletePlace: builder.mutation<void, string>({
      query: (id) => ({
        url: `api/place/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetPlacesQuery,
  useGetPlaceByIdQuery,
  useCreatePlaceMutation,
  useUpdatePlaceMutation,
  useDeletePlaceMutation,
} = placeApi;
