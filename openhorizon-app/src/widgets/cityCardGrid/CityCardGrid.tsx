import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCitiesQuery } from "../../entities/city/api/cityApi";
import CityCard from "../../entities/city/ui/cityCard";
import { AuthRedirectModal } from "../../shared/ui/authRedirectModal";
import { useTypedSelector } from "../../app/store/hooks";
import {
  isAuthSelector,
  userIdSelector,
} from "../../entities/user/store/userSlice";
import City from "../../entities/city/model/city";
import {
  useAddToFavoritesMutation,
  useDeleteFavoriteMutation,
  useGetMyFavoritesQuery,
} from "../../features/favorites/api/favoritesApi";
import { v4 as uuidv4 } from "uuid";

interface CityCardsGridProps {
  onCityClick?: (cityId: string) => void;
}

const CityCardsGrid = ({ onCityClick }: CityCardsGridProps) => {
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(4);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const isAuthenticated = useTypedSelector(isAuthSelector);
  const [addToFavorites] = useAddToFavoritesMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const userId = useTypedSelector(userIdSelector)!;
  const { data: favorites = [], refetch: refetchFavorites } =
    useGetMyFavoritesQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const {
    data: cities = [],
    isLoading,
    isError,
    refetch: refetchCities,
  } = useGetCitiesQuery(undefined, { refetchOnMountOrArgChange: true });

  const visibleCities = cities.slice(0, visibleCount);

  const getCardStyle = (): CSSProperties => ({
    width: "100%",
    height: "100%",
    borderRadius: 50,
    overflow: "hidden",
    position: "relative",
    cursor: "pointer",
  });

  const handleCityClick = (cityId: string) => {
    if (onCityClick) {
      onCityClick(cityId);
    } else {
      navigate(`/city/${cityId}`);
    }
  };

  const handleFavoriteToggle = async (cityId: string) => {
    try {
      if (!isAuthenticated) {
        setAuthModalOpen(true);
        return;
      }

      const favorite = favorites.find((f) => f.cityId === cityId);
      if (favorite) {
        await deleteFavorite(favorite.id);
      } else {
        await addToFavorites({ cityId, id: uuidv4(), userId });
      }
    } catch (error) {
      alert("Произошла непредвиденная ошибка");
    } finally {
      refetchFavorites();
    }
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ textAlign: "center", mt: 10 }}>
        <Typography color="error">Ошибка загрузки городов</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: { xs: "0 16px", sm: "0 20px" },
        backgroundColor: "transparent",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          position: "relative",
          gap: 5,
          height: {
            md: visibleCities.length * 380,
          },
          mb: { sm: 0, md: 1 },
          zIndex: 100,
        }}
      >
        {visibleCities.map((city: City, index) => (
          <Box
            key={city.id}
            sx={{
              position: { sm: "relative", md: "absolute" },
              left: { xs: 0, sm: 0, md: index % 2 === 0 ? 0 : "48%" },
              top: {
                sm: 0,
                md: index * 350,
              },
              width: {
                xs: "100%",
                sm: "100%",
                md: "47%",
              },
              transform: {
                md: index % 2 !== 0 ? "translateX(56px)" : "none",
              },
              transition: "all 0.3s ease",
              "&:hover": {
                transform: {
                  xs: "scale(1.02)",
                  sm: "scale(1.02)",
                  md:
                    index % 2 !== 0
                      ? "translateX(56px) scale(1.02)"
                      : "scale(1.02)",
                },
              },
            }}
          >
            <Box style={getCardStyle()}>
              <CityCard
                city={city}
                isFavorite={favorites.some((f) => f.cityId === city.id)}
                onClick={() => handleCityClick(city.id)}
                onFavoriteToggle={() => handleFavoriteToggle(city.id)}
                refetchCities={refetchCities}
                style={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                }}
                tagStyle={{
                  backgroundColor: "white",
                  fontFamily: '"DM Sans", sans-serif',
                  color: "#3A2496",
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>

      {visibleCount < cities.length && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: { xs: 1, sm: 2 },
          }}
        >
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#B122E9",
              color: "white",
              padding: { xs: "8px 40px", sm: "10px 60px", md: "12px 74px" },
              fontSize: { xs: 20, sm: 26, md: 32 },
              fontWeight: "bold",
              mt: "150px",
              borderRadius: "48px",
              boxShadow: "0px 4px 15px rgba(177, 34, 233, 0.3)",
              "&:hover": {
                backgroundColor: "#9119c7",
                boxShadow: "0px 6px 20px rgba(177, 34, 233, 0.4)",
              },
              minWidth: { xs: 200, sm: 240 },
            }}
            onClick={loadMore}
          >
            Показать еще
          </Button>
        </Box>
      )}

      <AuthRedirectModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </Box>
  );
};

export default CityCardsGrid;
