import { Button, Typography, Box, keyframes } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { animations } from "../../shared/styles/animations";
import { darkIndigo, indigoColor } from "../../shared/styles/colors";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: "url('/backgrounds/purple-iridescent-texture-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        animation: `${animations.fadeIn} 0.5s ease-out`,
      }}
    >
      <Typography
        sx={{
          fontSize: "42px",
          color: "white",
          mb: 4,
          fontWeight: 700,
          letterSpacing: "2px",
          textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
          animation: `${animations.float} 3s ease-in-out infinite`,
        }}
      >
        OpenHorizon
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          borderRadius: "20px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          padding: "40px",
          mx: "auto",
          mb: 4,
          animation: `${animations.fadeIn} 0.7s ease-out`,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "white",
            fontWeight: 600,
            textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          404 - Страница не найдена
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 4,
            color: "white",
            fontWeight: 500,
            textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
          }}
        >
          Запрашиваемая Вами страница не существует или была перемещена
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            onClick={() => navigate('/')}
            variant="contained"
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: "30px",
              backgroundColor: indigoColor,
              fontSize: "18px",
              fontWeight: 600,
              textTransform: "none",
              animation: ` 2s ease-in-out infinite`,
              "&:hover": {
                backgroundColor: darkIndigo,
              },
            }}
          >
            Вернуться на главную
          </Button>
        </Box>
      </Box>
    </Box>
  );
};