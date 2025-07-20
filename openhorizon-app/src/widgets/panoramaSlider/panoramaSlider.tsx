import { useRef, useState } from "react";
import { Box, Typography, IconButton, CircularProgress } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { YMaps, Panorama } from "@pbe/react-yandex-maps";
import PanoramaModel from "../../entities/city/model/panorama";
import { indigoColor } from "../../shared/styles/colors";

const API_KEY = "b674d967-935b-4af2-b50d-d00fcfd70665";

export interface YandexPanoramaSliderProps {
  panoramas: PanoramaModel[];
}

export default function YandexPanoramaSlider({
  panoramas,
}: YandexPanoramaSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const panoramaRef = useRef<ymaps.Map | undefined>(undefined);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % panoramas.length);
  };

  const prev = () =>
    setCurrentIndex((prev) => (prev - 1 + panoramas.length) % panoramas.length);

  return (
    <Box sx={{ width: "100%", mx: "auto", my: 4, height: "100%" }}>
      <Box
        sx={{
          position: "relative",
          height: "500px",
          borderRadius: "12px",
          overflow: "hidden",
          bgcolor: "#f0f0f0",
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "rgba(0,0,0,0.1)",
            }}
          >
            <CircularProgress />
            <Typography sx={{ ml: 2 }}>Загрузка панорамы...</Typography>
          </Box>
        )}

        <YMaps
          query={{
            apikey: API_KEY,
          }}
        >
          <Panorama
            instanceRef={panoramaRef}
            key={currentIndex}
            point={panoramas[currentIndex].coordinates}
            options={{
              direction: panoramas[currentIndex].direction,
              span: panoramas[currentIndex].span,
              suppressMapOpenBlock: true,
              controls: [],
            }}
            style={{ width: "100%", height: "100%" }}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </YMaps>

        <IconButton
          onClick={prev}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "grey.200" },
            width: 48,
            height: 48,
            zIndex: 5,
          }}
        >
          <ChevronLeft fontSize="large" />
        </IconButton>

        <IconButton
          onClick={next}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            bgcolor: "background.paper",
            "&:hover": { bgcolor: "grey.200" },
            width: 48,
            height: 48,
            zIndex: 1,
          }}
        >
          <ChevronRight fontSize="large" />
        </IconButton>

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: "rgba(216, 205, 239, 0.69)",
            color: indigoColor,
            backdropFilter: "blur(4px)",
            zIndex: 1,
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {panoramas[currentIndex].name}
          </Typography>
          <Typography variant="body2">
            {panoramas[currentIndex].description}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
