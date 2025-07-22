import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import {
  Box,
  Typography,
  CircularProgress,
  IconButton,
  useTheme,
} from "@mui/material";
import { useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useGetFileByIdQuery } from "../../../features/files/api/filesApi";

interface PhotoSliderProps {
  items: Array<{
    id: string;
    photoId?: string;
    title: string;
    placeTitle?: string;
    tags?: Array<{ id: string; name: string }>;
  }>;
}

const PhotoSlider = ({ items }: PhotoSliderProps) => {
  const theme = useTheme();
  const swiperRef = useRef<SwiperType | null>(null);

  if (items.length === 0) {
    return (
      <Box
        sx={{
          textAlign: "center",
          py: 4,
          color: theme.palette.text.secondary,
        }}
      >
        <Typography variant="body1">Нет доступных фотографий</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "88vw",
        mx: "auto",
        py: 4,
        position: "relative",
        [theme.breakpoints.down("sm")]: {
          maxWidth: "95vw",
        },
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontsize: { sm: "2rem", md: "2.7rem", lg: "3rem" },
          mb: "9vw",
          fontWeight: "bold",
          color: "#3A2496",
          fontSize: { xs: "1.5rem", md: "2rem" },
          textTransform: "uppercase",
        }}
      >
        Фотогалерея
      </Typography>

      <Box
        sx={{
          position: "relative",
          "&:hover .nav-button": {
            opacity: 1,
          },
        }}
      >
        <IconButton
          className="nav-button"
          onClick={() => swiperRef.current?.slidePrev()}
          sx={{
            position: "absolute",
            left: { xs: 8, md: -40 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "background.paper",
            color: "#1E0E62",
            opacity: { xs: 0.8, md: 0 },
            transition: theme.transitions.create("opacity"),
            "&:hover": {
              bgcolor: "background.paper",
              opacity: 1,
            },
            boxShadow: 3,
            width: 48,
            height: 48,
            "& svg": {
              fontSize: "2rem",
            },
          }}
        >
          <ChevronLeft />
        </IconButton>
        <Box sx={{ width: "100%", maxWidth: "88vw", mx: "auto", py: 4 }}>
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            onSwiper={(swiper: SwiperType) => (swiperRef.current = swiper)}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 20 },
              768: { slidesPerView: 1, spaceBetween: 24 },
              1024: { slidesPerView: 2, spaceBetween: 32 },
            }}
            style={{
              borderRadius: theme.shape.borderRadius,
              overflow: "hidden",
            }}
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} style={{ height: "auto" }}>
                <Box
                  sx={{
                    height: "100%",
                    px: { xs: 0, sm: 0.5 },
                    pb: 1,
                  }}
                >
                  <PhotoItemWithLoader item={item} />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <IconButton
          className="nav-button"
          onClick={() => swiperRef.current?.slideNext()}
          sx={{
            position: "absolute",
            right: { xs: 8, md: -40 },
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "background.paper",
            color: "#1E0E62",
            opacity: { xs: 0.8, md: 0 },
            transition: theme.transitions.create("opacity"),
            "&:hover": {
              bgcolor: "background.paper",
              opacity: 1,
            },
            boxShadow: 3,
            width: 48,
            height: 48,
            "& svg": {
              fontSize: "2rem",
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

const PhotoItemWithLoader = ({
  item,
}: {
  item: PhotoSliderProps["items"][0];
}) => {
  const theme = useTheme();
  const { data, isLoading } = useGetFileByIdQuery(item.photoId || "", {
    skip: !item.photoId,
  });
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) {
    return (
      <Box
        sx={{
          height: { xs: "240px", sm: "300px", md: "360px" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
          borderRadius: theme.shape.borderRadius,
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!data?.data) return null;

  return (
    <Box
      sx={{
        width: "100%",
        height: { xs: "240px", sm: "300px", md: "360px" },
        borderRadius: theme.shape.borderRadius,
        overflow: "hidden",
        position: "relative",
        boxShadow: 2,
        transition: theme.transitions.create("transform"),
        "&:hover": {
          transform: "translateY(-2px)",
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`data:image/jpeg;base64,${data.data}`}
        alt={item.title}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          bgcolor: "rgba(255, 255, 255, 0.43)",
          color: "#1E0E62",
          p: 2,
          backdropFilter: "blur(4px)",
          transform: isHovered ? "translateY(100%)" : "translateY(0)",
          transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.complex,
          }),
        }}
      >
        <Typography
          fontWeight={600}
          sx={{ fontSize: { sm: "1rem", md: "1.2rem", lg: "1.3rem" } }}
        >
          {item.title}
        </Typography>
        {item.placeTitle && (
          <Typography
            variant="body2"
            sx={{
              opacity: 0.9,
              mt: 0.5,
              fontSize: { sm: "0.9rem", md: "1rem", lg: "1.1rem" },
            }}
          >
            {item.placeTitle}
          </Typography>
        )}
        {item.tags && item.tags.length > 0 && (
          <Box sx={{ mt: 1.5, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {item.tags.map((tag) => (
              <Typography
                key={tag.id}
                sx={{
                  bgcolor: "#1E0E62",
                  color: "common.white",
                  px: 1.2,
                  py: 0.4,
                  borderRadius: 4,
                  fontWeight: 500,
                  lineHeight: 1.5,
                  fontSize: { sm: "0.6rem", md: "0.7rem", lg: "0.8rem" },
                }}
              >
                {tag.name}
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default PhotoSlider;
