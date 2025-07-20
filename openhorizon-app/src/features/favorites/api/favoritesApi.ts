import { createApi } from "@reduxjs/toolkit/query/react";
import AddToFavorites from "../model/addToFavorites";
import { createBaseQueryWithReauth } from "../../../shared/api/baseQuery";
import Favorite from "../model/favorite";


export const favoritesApi = createApi({
  reducerPath: "favoritesApi",
  baseQuery: createBaseQueryWithReauth("http://localhost:5129"),
  endpoints: (builder) => ({
    getMyFavorites: builder.query<Favorite[], void>({
      query: () => ({
        url: `/api/favorite/favorites`,
        method: "GET",
      }),
    }),

    addToFavorites: builder.mutation<Favorite, AddToFavorites>({
      query: (addToFavorites) => ({
        url: `/api/favorite/${addToFavorites.id}`,
        method: "POST",
        body: addToFavorites,
      }),
    }),

    deleteFavorite: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/favorite/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetMyFavoritesQuery, useAddToFavoritesMutation, useDeleteFavoriteMutation } =
  favoritesApi;
