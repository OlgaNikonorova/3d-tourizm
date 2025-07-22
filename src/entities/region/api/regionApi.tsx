import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Region from "../models/region";
import { CreateRegion } from "../../../features/createRegion/createRegion";
import { createBaseQueryWithReauth } from "../../../shared/api/baseQuery";

export const regionApi = createApi({
  reducerPath: "regionApi",
  baseQuery: createBaseQueryWithReauth("http://localhost:5129"),
  endpoints: (builder) => ({
    getRegions: builder.query<Region[], void>({
      query: () => ({
        url: "/api/region/regions",
        method: "GET",
      }),
    }),

    getRegionById: builder.query<Region, string>({
      query: (id) => ({
        url: `/api/region/${id}`,
        method: "GET",
      }),
    }),

    createRegion: builder.mutation<Region, CreateRegion>({
      query: (body) => ({
        url: `/api/region/${body.id}`,
        method: "POST",
        body: body,
      }),
    }),

    updateRegion: builder.mutation<Region, Partial<Region>>({
      query: (data) => ({
        url: `/api/region/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteRegion: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/region/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useUpdateRegionMutation,
  useCreateRegionMutation,
  useGetRegionByIdQuery,
  useDeleteRegionMutation,
} = regionApi;
