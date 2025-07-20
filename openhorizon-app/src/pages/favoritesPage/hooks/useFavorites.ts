import { useGetMyFavoritesQuery } from "../../../features/favorites/api/favoritesApi";


export const useFavorites = () => {
  const { 
    data: favorites = [], 
    isLoading, 
    isError,
    refetch 
  } = useGetMyFavoritesQuery();

  return {
    favorites,
    isLoading,
    isError,
    refetch,
  };
};