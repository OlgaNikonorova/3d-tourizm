import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetMyFavoritesQuery } from "../../../features/favorites/api/favoritesApi";

import FavoriteCard from "../ui/favoriteCard";

interface FavoriteCitiesGridProps {
  searchQuery: string;
  selectedTags: string[];
  sortOption: "name";
  onCityClick?: (cityId: string) => void;
}

export const FavoriteCitiesGrid = ({
  searchQuery,
  selectedTags,
  sortOption,
  onCityClick,
}: FavoriteCitiesGridProps) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);
  const {
    data: favorites = [],
    isLoading,
    isError,
    refetch: refetchFavorites,
  } = useGetMyFavoritesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const handleCardClick = (id: string) => {
    navigate(`/city/${id}`);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleRefetchFavorites = async () => {
    await refetchFavorites();
  };

  const slicedFavorites = favorites.slice(0, visibleCount);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography color="error">Ошибка загрузки</Typography>;

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", px: 2.5, py: 4, zIndex: 5 }}>
      {slicedFavorites.length > 0 ? (
        <>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              columnGap: 15,
              rowGap: 8,
              mb: 5,
              alignItems: "stretch",
              position: "relative",
            }}
          >
            {slicedFavorites.map((favorite) => (
              <FavoriteCard
                key={favorite.id}
                onClick={() => handleCardClick(favorite.id)}
                favorite={favorite}
                refetchFavorites={handleRefetchFavorites}
                isFavorite={true}
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  height: "100%",
                  minHeight: 40,
                }}
              />
            ))}
          </Box>

          {visibleCount < Object.values(favorites).filter(Boolean).length && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 8 }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#B122E9",
                  color: "white",
                  px: 9.25,
                  py: 1.25,
                  fontSize: 32,
                  fontWeight: "bold",
                  borderRadius: 30,
                  boxShadow: "0px 4px 15px rgba(177, 34, 233, 0.3)",
                  "&:hover": {
                    bgcolor: "#9119c7",
                    boxShadow: "0px 6px 20px rgba(177, 34, 233, 0.4)",
                  },
                }}
                onClick={loadMore}
              >
                Показать еще
              </Button>
            </Box>
          )}
        </>
      ) : (
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            color: "#3A2496",
            fontFamily: '"DM Sans", sans-serif',
          }}
        >
          У вас пока нет избранных регионов
        </Typography>
      )}
    </Box>
  );
};

export default FavoriteCitiesGrid;