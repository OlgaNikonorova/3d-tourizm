import { useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import React from "react";
import { Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { AuthRedirectModal } from "../../../shared/ui/authRedirectModal";
import { useTypedSelector } from "../../../app/store/hooks";
import { isAuthSelector } from "../../user/store/userSlice";
import City from "../model/city";
import { useGetFileByIdQuery } from "../../../features/files/api/filesApi";
import { useDeleteCityMutation } from "../api/cityApi";
import DeleteIcon from "@mui/icons-material/Delete";
import { useProfilePage } from "../../../pages/profilePage/hooks/useProfilePage";
import { DeleteSuccessModal } from "../../../shared/ui/deleteSuccessModal";
import { showErrorToast, showSuccessToast } from "../../../shared/ui/toast";

interface CityCardProps {
  city: City;
  isFavorite: boolean;
  style?: CSSProperties;
  tagStyle?: CSSProperties;
  onClick: () => void;
  onFavoriteToggle: () => Promise<void> | void;
  refetchCities: () => void;
  hideDelete?: boolean;
}

const indigoColor = "#3A2496";

const CityCard = React.memo(
  ({
    city,
    isFavorite,
    style,
    tagStyle,
    onClick,
    refetchCities,
    onFavoriteToggle,
    hideDelete,
  }: CityCardProps) => {
    const { id, name, description, previewId } = city;
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    const isAuthenticated = useTypedSelector(isAuthSelector);
    const [deleteCity] = useDeleteCityMutation();
    const { user } = useProfilePage();

    const handleToggleFavorite = async (e: React.MouseEvent) => {
      e.stopPropagation();

      if (!isAuthenticated) {
        setAuthModalOpen(true);
        return;
      }

      try {
        await onFavoriteToggle();
        showSuccessToast(
          isFavorite
            ? "Город удален из избранного"
            : "Город добавлен в избранное"
        );
      } catch (error) {
        showErrorToast("Произошла ошибка при изменении статуса избранного");
      }
    };

    const handleDelete = async (e: React.MouseEvent) => {
      e.stopPropagation();
      try {
        await deleteCity(city.id).unwrap();
        refetchCities();
        showSuccessToast("Город успешно удален");
        setDeleteSuccessOpen(true);
      } catch (err) {
        console.log(err);
        showErrorToast("Не удалось удалить город");
      }
    };

    const defaultTagStyle = {
      backgroundColor: "white",
      padding: "6px 12px",
      fontFamily: '"DM Sans", sans-serif',
      color: indigoColor,
      fontSize: "14px",
      borderRadius: "20px",
      marginRight: "8px",
      marginBottom: "8px",
      display: "inline-block",
    };

    const { data: previewFile } = useGetFileByIdQuery(previewId || "", {
      skip: !previewId,
    });

    return (
      <>
        <motion.div
          style={{
            ...style,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
          className="hover:cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => navigate(`/city/${id}`)}
          whileHover={{ scale: 1.02 }}
        >
          <div
            className="relative w-full aspect-[4/3] overflow-hidden group"
            style={{ borderRadius: "50px", flexShrink: 0 }}
          >
            {previewFile?.data ? (
              <img
                src={`data:image/jpeg;base64,${previewFile.data}`}
                alt={name}
                className="absolute w-full h-full object-cover object-center"
                style={{ borderRadius: "50px" }}
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/default-city.jpg";
                }}
              />
            ) : (
              <div className="absolute w-full h-full bg-gray-200 flex items-center justify-center">
                <Typography color="textSecondary">
                  Загрузка изображения...
                </Typography>
              </div>
            )}
          </div>

          <div className="p-6 flex flex-col flex-grow">
            <div className="mb-4 flex  items-start justify-between">
              <div className=" flex flex-col items-start">
                <Typography
                  sx={{
                    color: indigoColor,
                    fontWeight: 700,
                    fontFamily: '"DM Sans", sans-serif',
                    mb: 1,
                    fontSize: "1.25rem",
                  }}
                >
                  {name} 360°
                </Typography>
                <Typography
                  sx={{
                    color: indigoColor,
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: "0.875rem",
                  }}
                >
                  {description}
                </Typography>
              </div>
              <IconButton
                onClick={(e) => handleToggleFavorite(e)}
                className="!p-2 !rounded-full !border !border-black bg-white hover:bg-gray-100 transition"
                size="large"
              >
                <Tooltip
                  title={
                    isFavorite
                      ? "Удалить из избранного"
                      : "Добавить в избранное"
                  }
                  placement="top"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        fontSize: "1.3rem",
                      },
                    },
                  }}
                >
                  {isFavorite ? (
                    <Favorite className="text-black" fontSize="large" />
                  ) : (
                    <FavoriteBorder className="text-black" fontSize="large" />
                  )}
                </Tooltip>
              </IconButton>
            </div>

            <div className="mt-auto pt-2">
              <div className="flex flex-wrap gap-2">
                <Chip
                  label="Виртуальный тур"
                  sx={{
                    backgroundColor: "white",
                    color: indigoColor,
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                />
                <Chip
                  label="3D-панорамы"
                  sx={{
                    backgroundColor: "white",
                    color: indigoColor,
                    fontFamily: '"DM Sans", sans-serif',
                  }}
                />
              </div>
            </div>
          </div>

          {user?.role === "admin" && !hideDelete && (
            <IconButton
              onClick={handleDelete}
              sx={{
                position: "absolute",
                top: 30,
                right: 30,
                color: "rgba(216, 151, 40, 1)",
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                "&:hover": {
                  backgroundColor: "rgba(129, 41, 173, 0.9)",
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </motion.div>

        <AuthRedirectModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />

        <DeleteSuccessModal
          open={deleteSuccessOpen}
          onClose={() => setDeleteSuccessOpen(false)}
          cityName={city.name}
        />
      </>
    );
  }
);

export default CityCard;
