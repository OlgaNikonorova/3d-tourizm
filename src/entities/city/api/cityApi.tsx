import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import City from "../model/city";
import CreateCity from "../model/createCity";
import { createBaseQueryWithReauth } from "../../../shared/api/baseQuery";

export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: createBaseQueryWithReauth("http://localhost:5129"),
  endpoints: (builder) => ({
    getCities: builder.query<City[], void>({
      query: () => ({
        url: "/api/city/cities",
        method: "GET",
      }),
    }),

    getCityById: builder.query<City, string>({
      query: (id) => ({
        url: `/api/city/${id}`,
        method: "GET",
      }),
    }),

    createCity: builder.mutation<City, CreateCity>({
      query: (createCity) => ({
        url: `/api/city/${createCity.id}`,
        method: "POST",
        body: createCity,
      }),
    }),

    updateCity: builder.mutation<City, { id: string; data: City }>({
      query: ({ id, data }) => ({
        url: `/api/city/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteCity: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/city/${id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
    }),
  }),
});

export const {
  useGetCitiesQuery,
  useUpdateCityMutation,
  useCreateCityMutation,
  useGetCityByIdQuery,
  useDeleteCityMutation,
} = cityApi;
