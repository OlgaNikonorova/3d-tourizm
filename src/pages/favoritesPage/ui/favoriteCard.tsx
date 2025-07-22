import { CSSProperties } from "react";

import { useGetCityByIdQuery } from "../../../entities/city/api/cityApi";
import CityCard from "../../../entities/city/ui/cityCard";

import React from "react";
import Favorite from "../../../features/favorites/model/favorite";
import { useDeleteFavoriteMutation } from "../../../features/favorites/api/favoritesApi";

interface FavoriteCardProps {
  favorite: Favorite;
  isFavorite: boolean;
  style?: CSSProperties;
  tagStyle?: CSSProperties;
  onClick: () => void;
  refetchFavorites: () => void;
}

const FavoriteCard = React.memo(
  (props: FavoriteCardProps) => {
    const {
      data: city,
      isLoading,
      isError,
    } = useGetCityByIdQuery(props.favorite.cityId, {
      refetchOnMountOrArgChange: true,
    });

    const [deleteFavorite] = useDeleteFavoriteMutation();

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading city</div>;
    if (!city) return <div>City not found</div>;

    return (
      <CityCard
        city={city}
        isFavorite={props.isFavorite}
        style={props.style}
        tagStyle={props.tagStyle}
        refetchCities={() => {}}
        onClick={props.onClick}
        onFavoriteToggle={async () => {
          await deleteFavorite(props.favorite.id);
          props.refetchFavorites();
        }}
        hideDelete
      />
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.favorite.id === nextProps.favorite.id &&
      prevProps.isFavorite === nextProps.isFavorite &&
      prevProps.favorite.cityId === nextProps.favorite.cityId
    );
  }
);

export default FavoriteCard;
