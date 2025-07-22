import { Box, Typography, Container, Divider, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { keyframes } from "@mui/system";

const glowAnimation = keyframes`
  0%, 100% { text-shadow: 0 0 5px rgba(251, 191, 36, 0.3); }
  50% { text-shadow: 0 0 15px rgba(232, 232, 232, 0.71); }
`;

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#d6a6e5ff",
        color: "#1E0E62",
        py: 8,
        px: { xs: 4, md: 8 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr 1fr" },
            gap: 6,
            mb: 6,
          }}
        >
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
                mb: 2,
                cursor: "pointer",
                display: "inline-block",
                transition: "all 0.3s ease",
                animation: `${glowAnimation} 3s ease-in-out infinite`,
                "&:hover": {
                  color: "rgb(251, 191, 36)",
                  transform: "scale(1.02)",
                },
              }}
              onClick={() => navigate("/")}
            >
              OpenHorizon
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 3,
                fontSize: "0.875rem",
                maxWidth: "300px",
                transition: "all 0.3s ease",
                "&:hover": {
                  color: "rgba(251, 191, 36, 0.8)",
                },
              }}
            >
              Рекомендуем ознакомиться с Пользовательским соглашением и
              Политикой конфиденциальности
            </Typography>

            <Box sx={{ display: "flex", gap: 2 }}>
              {[
                { icon: <Facebook />, color: "#3b5998" },
                { icon: <Instagram />, color: "#E1306C" },
                { icon: <Twitter />, color: "#1DA1F2" },
                { icon: <YouTube />, color: "#FF0000" },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  sx={{
                    color: "inherit",
                    transition: "all 0.3s ease",
                    backgroundColor: "rgba(251, 191, 36, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(251, 191, 36, 0.2)",
                      color: social.color,
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {[
            {
              title: "VR-туры",
              items: ["Найти тур", "Заказать тур", "Галерея"],
            },
            {
              title: "Дополнительно",
              items: [
                "Конфиденциальность",
                "Поддержка",
                "Пользовательское соглашение",
                "FAQ",
              ],
            },
            {
              title: "О нас",
              items: ["Блог", "Команда", "Наши партнеры", "Контакты"],
            },
          ].map((column, colIndex) => (
            <Box key={colIndex}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    color: "rgb(251, 191, 36)",
                    transform: "translateX(5px)",
                  },
                }}
              >
                {column.title}
              </Typography>
              <Box
                component="ul"
                sx={{
                  listStyle: "none",
                  p: 0,
                  m: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: 1.5,
                }}
              >
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Typography
                      variant="body2"
                      sx={{
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        position: "relative",
                        display: "inline-block",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          width: "0",
                          height: "1px",
                          bottom: 0,
                          left: 0,
                          backgroundColor: "rgb(251, 191, 36)",
                          transition: "width 0.3s ease",
                        },
                        "&:hover": {
                          color: "rgb(251, 191, 36)",
                          "&::before": {
                            width: "100%",
                          },
                        },
                      }}
                    >
                      {item}
                    </Typography>
                  </li>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Divider
          sx={{
            my: 4,
            borderColor: "rgba(251, 191, 36, 0.2)",
            transition: "all 0.5s ease",
            "&:hover": {
              borderColor: "rgba(103, 43, 200, 0.5)",
            },
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "rgb(251, 191, 36)",
              },
            }}
          >
            2025 © OpenHorizon. Все права защищены.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              transition: "all 0.3s ease",
              "&:hover": {
                color: "rgb(251, 191, 36)",
              },
            }}
          >
            Версия 1.0.0
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
