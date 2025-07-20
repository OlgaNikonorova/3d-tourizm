import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { CSSProperties, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "../../../app/store/hooks";
import { AuthRedirectModal } from "../../../shared/ui/authRedirectModal";
import { isAuthSelector } from "../../user/store/userSlice";
import { indigoColor } from "../../../shared/styles/colors";


interface City {
  id: string;
  name: string;
  description: string;
  images: string[];
}

interface CityCardProps {
  city: City;
  isFavorite: boolean;
  style?: CSSProperties;
  tagStyle?: CSSProperties;
  onClick: () => void;
  onFavoriteToggle: () => void;
}

const CityCard = React.memo(
  ({ city, isFavorite, style, tagStyle }: CityCardProps) => {
    const { id, name, description, images } = city;
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [favorites, setFavorites] = useState<string[]>([]);
    const isAuthenticated = useTypedSelector(isAuthSelector);

    useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isHovered && images && images.length > 0) {
        interval = setInterval(() => {
          setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 2000);
      }
      return () => clearInterval(interval);
    }, [isHovered, images]);

    const handleToggleFavorite = (e: React.MouseEvent, cityId: string) => {
      e.stopPropagation(); 
      
      if (!isAuthenticated) {
        setAuthModalOpen(true);
        return;
      }

      setFavorites((prev) =>
        prev.includes(cityId)
          ? prev.filter((id) => id !== cityId)
          : [...prev, cityId]
      );
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
            <AnimatePresence initial={false}>
              <motion.img
                key={currentImageIndex}
                src={images?.[0] || "/images/city-placeholder.webp"}
                alt={name}
                className="absolute w-full h-full object-cover object-center"
                style={{ borderRadius: "50px" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                loading="lazy"
              />
            </AnimatePresence>
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
            onClick={(e) => handleToggleFavorite(e, id)}
            className="!p-2 !rounded-full !border !border-black bg-white hover:bg-gray-100 transition"
            size="large"
          >
            <Tooltip
              title={
                isFavorite ? "Удалить из избранного" : "Добавить в избранное"
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
                <FavoriteBorder className="textblack" fontSize="large" />
              )}
            </Tooltip>
          </IconButton>
            </div>

            <div className="mt-auto pt-2">
              <div className="flex flex-wrap gap-2">
                <span style={{ ...defaultTagStyle, ...tagStyle }}>
                  Виртуальный тур
                </span>
                <span style={{ ...defaultTagStyle, ...tagStyle }}>
                  3D-панорамы
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        <AuthRedirectModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </>
    );
  }
);

export default CityCard;
