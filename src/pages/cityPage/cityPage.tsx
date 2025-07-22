import DownloadIcon from "@mui/icons-material/Download";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import { useTypedSelector } from "../../app/store/hooks";
import { useGetCityByIdQuery } from "../../entities/city/api/cityApi";
import { useGetPlacesQuery } from "../../entities/place/api/placeApi";
import Place from "../../entities/place/model/place";
import { useGetRegionByIdQuery } from "../../entities/region/api/regionApi";
import Tag from "../../entities/tags/models/tags";
import { isAuthSelector } from "../../entities/user/store/userSlice";
import { AuthRedirectModal } from "../../shared/ui/authRedirectModal";
import TourPartnersForm from "../../shared/ui/toorParthnersForm";
import CityCardsGrid from "../../widgets/cityCardGrid/CityCardGrid";
import PanoramaSlider from "../../widgets/panoramaSlider/panoramaSlider";
import PhotoSlider from "./ui/photoSlider";
import VideoSlider from "./ui/videoSlider";
import EditIcon from "@mui/icons-material/Edit";
import { useProfilePage } from "../profilePage/hooks/useProfilePage";
import { animations } from "../../shared/styles/animations";
import { darkIndigo, indigoColor } from "../../shared/styles/colors";

type Video = {
  id: string;
  title: string;
  path: string;
  preview?: string;
};

export type CityData = {
  places: Place[];
  videos: Video[];
  updatedAt?: string;
};

interface MediaItem {
  id: string;
  photoId?: string;
  videoId?: string;
  title: string;
  placeTitle: string;
  tags: Tag[];
  fileData?: string;
}

const SectionContainer = ({
  children,
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
}) => (
  <Box
    sx={{
      maxWidth: { xs: "85%", sm: "80%", md: "1280px" },
      mx: "auto",
      my: 4,
      px: { xs: 2, sm: 3, md: 4 },
      py: { xs: 4, md: 10 },
    }}
  >
    {children}
  </Box>
);

const CityPage = () => {
  const { id: cityId } = useParams<{ id: string }>();
  const isAuthenticated = useTypedSelector(isAuthSelector);
  const floatingImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const animationFrameId = useRef<number>();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useProfilePage();

  const {
    data: city,
    isLoading: isCityLoading,
    error: cityError,
  } = useGetCityByIdQuery(cityId!, {
    skip: !cityId,
    refetchOnMountOrArgChange: true,
  });

  const { data: region, isLoading: isRegionLoading } = useGetRegionByIdQuery(
    city?.regionId || "",
    {
      skip: !city?.regionId,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: places = [], isLoading: isPlacesLoading } = useGetPlacesQuery(
    { cityId: cityId! },
    {
      skip: !cityId,
      refetchOnMountOrArgChange: true,
    }
  );

  const handleEditClick = () => {
    if (!city) return;
    navigate(`/edit-city/${city.id}`, {
      state: {
        city,
      },
    });
  };

  useEffect(() => {
    const animate = () => {
      const time = Date.now() * 0.002;

      if (floatingImagesRef.current[0]) {
        floatingImagesRef.current[0].style.transform = `translateY(${
          Math.sin(time * 0.5) * 25
        }px)`;
      }

      if (floatingImagesRef.current[1]) {
        floatingImagesRef.current[1].style.transform = `translateY(${
          Math.sin(time * 0.7) * 20
        }px)`;
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  const photoItems: MediaItem[] = places.flatMap(
    (place) =>
      place.photos?.map((photo) => ({
        id: `photo-${place.id}-${photo.photoId}`,
        photoId: photo.photoId,
        title: place.title,
        placeTitle: place.title,
        tags: place.tags || [],
      })) || []
  );

  const videoItems: MediaItem[] = places.flatMap(
    (place) =>
      place.videos?.map((video) => ({
        id: `video-${place.id}-${video.videoId}`,
        videoId: video.videoId,
        title: place.title,
        placeTitle: place.title,
        tags: place.tags || [],
      })) || []
  );

  if (isCityLoading || isPlacesLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!city || !cityId) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" color="error">
          {!cityId ? "ID города не указан" : "Город не найден"}
        </Typography>
      </Box>
    );
  }

  if (!city || !cityId) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h4" color="error">
          {!cityId ? "ID города не указан" : "Город не найден"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          backgroundImage: "url('/backgrounds/purple.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          component="img"
          src="/VioletCircle2.png"
          sx={{
            position: "absolute",
            top: "3300px",
            left: 0,
            width: 804,
            height: 1124,
            zIndex: 1,
            transition: "transform 0.5s ease, opacity 0.5s ease",
          }}
        />

        <Box
          component="img"
          src="/WhiteCircleSquare.png"
          sx={{
            position: "absolute",
            top: 2045,
            right: 0,
            width: 275,
            height: 295,
            zIndex: 1,
            transition: "transform 0.5s ease, opacity 0.5s ease",
          }}
        />
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box
            component="img"
            src="/WhiteCircle3.png"
            sx={{
              position: "absolute",
              top: 2500,
              right: 0,
              width: 605,
              height: 1229,
              zIndex: 1,
              transition: "transform 0.5s ease, opacity 0.5s ease",
            }}
          />

          <Box
            component="img"
            src="/WhiteCircle1.png"
            sx={{
              position: "absolute",
              top: 1390,
              left: 0,
              display: { xs: "none", md: "none", lg: "block" },
              width: 495,
              height: 674,
              zIndex: 1,
              transition: "transform 0.5s ease, opacity 0.5s ease",
            }}
          />

          <Box
            component="img"
            src="/WhiteCircle2.png"
            sx={{
              position: "absolute",
              top: 1371,
              right: 0,
              width: 400,
              height: 645,
              zIndex: 1,
              transition: "transform 0.5s ease, opacity 0.5s ease",
            }}
          />
          <Box
            component="img"
            src="/VioletCircle3.png"
            sx={{
              position: "fixed",
              top: 4250,
              left: 0,
              width: 650,
              height: 1234,
              zIndex: 1,
              transition: "transform 0.5s ease, opacity 0.5s ease",
            }}
          />
        </Box>
        <Box sx={{ zIndex: 2 }}>
          <Box
            className="bg-gradient-to-r from-blue-500 to-indigo-900 
         flex flex-col self-center justify-start align-center pt-60 pb-0 z-0 text-white"
            sx={{ zIndex: 10 }}
          >
            <Box className="px-[12vw] md:px-[17vw] pb-12">
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography
                    style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}
                    className="font-bold mb-4 text-start"
                  >
                    Фото и видео
                  </Typography>
                  <Typography
                    style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
                    className="font-bold mb-4 text-start"
                  >
                    Контент 360
                  </Typography>
                </Box>
              </Box>
            </Box>

            <meta
              name="description"
              content={`Виртуальный тур по ${city.name}`}
            />

            <Box
              className="relative bg-white/45 text-white pt-6"
              sx={{ height: "fit-content" }}
            >
              <div className="z-10 w-full h-full flex flex-col xl:flex-row justify-between items-start xl:items-center py-[8vh] px-[12vw] md:px-[17vw] gap-y-5 gap-x-4">
                <div className="flex flex-col justify-center items-start">
                  <Typography
                    className="text-[#7041C7] font-bold mb-0 md:mb-4 text-left"
                    style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
                  >
                    {city.name.toUpperCase()} 360
                  </Typography>
                  <Typography
                    className="text-[#7041C7] max-w-2xl text-left mb-2 sm:mb-0"
                    style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                  >
                    {region?.name || "Регион"}
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  startIcon={<DownloadIcon />}
                  sx={{
                    backgroundColor: "#3A2496",
                    fontSize: { xs: "0.875rem", sm: "1rem" },
                    padding: { xs: "6px 12px", sm: "10px 24px" },
                    borderRadius: "30px",
                    textTransform: "none",
                    fontWeight: "bold",
                    height: "min-content",
                    minWidth: "max-content",
                    "&:hover": {
                      backgroundColor: darkIndigo,
                      animation: `${animations.pulse} 1s ease-in-out infinite`,
                    },
                  }}
                >
                  Скачать регион
                </Button>

                {isAuthenticated && user?.role === "admin" && (
                  <IconButton
                    sx={{
                      borderRadius: 20,
                      display: "flex",
                      gap: 1,
                      color: indigoColor,
                      "&:hover": {
                        color: darkIndigo,
                      },
                    }}
                    onClick={handleEditClick}
                  >
                    <EditIcon />
                    <Typography>Редактировать</Typography>
                  </IconButton>
                )}
              </div>
            </Box>
          </Box>

          {places.some((p) => p.panorama) && (
            <SectionContainer>
              <PanoramaSlider
                panoramas={places
                  .filter((p) => !!p.panorama)
                  .map((p) => p.panorama!)}
              />
            </SectionContainer>
          )}

          <SectionContainer>
            <VideoSlider items={videoItems} />
          </SectionContainer>

          <SectionContainer>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 4, md: 8 },
                mb: { xs: 4, md: 10 },
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#3A2496",
                  fontSize: { xs: "2rem", md: "4rem" },
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  minWidth: { md: "26rem" },
                }}
              >
                Описание
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.25rem", md: "2rem" },
                  lineHeight: 1.75,
                  color: "#3A2496",
                  maxWidth: { md: "47rem" },
                }}
              >
                {city.description || "Описание города отсутствует"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 4, md: 8 },
                mb: { xs: 4, md: 10 },
                alignItems: "center",
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  color: "#3A2496",
                  fontSize: { xs: "2rem", md: "4rem" },
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  minWidth: { md: "26rem" },
                }}
              >
                3D - тур
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { xs: "1.25rem", md: "2rem" },
                  lineHeight: 1.75,
                  color: "#3A2496",
                  maxWidth: { md: "47rem" },
                }}
              >
                {city.tour ||
                  "Три панорамных вида с возможностью прогулки по основным достопримечательностям {city.name} и фото-галерея."}
              </Typography>
            </Box>
          </SectionContainer>

          <SectionContainer>
            <PhotoSlider items={photoItems} />
          </SectionContainer>

          <SectionContainer>
            <CityCardsGrid />
          </SectionContainer>

          <Box
            sx={{
              position: "relative",
              width: "100%",
              mt: { xs: 4, md: 6 },
              display: { lg: "flex" },
              alignItems: "flex-start",
              marginLeft: 0,
              marginRight: { xs: "2vw", md: "3vw", lg: "4vw" },
            }}
          >
            <Box
              component="img"
              src="/10.png"
              alt="Человек"
              ref={(el: HTMLImageElement | null) => {
                floatingImagesRef.current[0] = el;
              }}
              sx={{
                width: {
                  xs: "200px",
                  sm: "250px",
                  md: "300px",
                  lg: "600px",
                  xl: "750px",
                },
                display: {xs: "none", lg: "block"},
                height: "auto",
                position: { xs: "absolute", lg: "relative" },
                left: { xs: "-8%", md: "-7%", lg: 0 },
                transform: { xs: "translateX(-50%)", lg: "none" },
                top: {
                  xs: "-230px",
                  sm: "-210px",
                  md: "-200px",
                  lg: "-50px",
                },
                mb: { lg: 2 },
                mr: { lg: 4 },
                zIndex: 5,
                transition: "all 0.3s ease",
              }}
            />

            <Box
              sx={{
                width: {
                  xs: "90%",
                  sm: "85%",
                  md: "65%",
                  lg: "48%",
                  xl: "40%",
                },
                mt: {
                  xs: "120px",
                  sm: "140px",
                  md: "170px",
                  lg: 0,
                },
                mx: { xs: "auto", lg: "-30px", xl: "-50px" },
                zIndex: 4,
                position: "relative",
              }}
            >
              <TourPartnersForm />
            </Box>
          </Box>
        </Box>
      </Box>

      <AuthRedirectModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

    </Box>
  );
};

export default CityPage;
