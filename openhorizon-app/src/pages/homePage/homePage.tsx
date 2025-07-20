import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  useTheme,
  keyframes,
  styled,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthRedirectModal } from "../../shared/ui/authRedirectModal";
import TourPartnersForm from "../../shared/ui/toorParthnersForm";
import CityCardsGrid from "../../widgets/cityCardGrid/CityCardGrid";
import FindTourForm from "./ui/findTourForm";
import { darkIndigo } from "../../shared/styles/colors";

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 10px rgba(255,255,255,0.5); }
  100% { text-shadow: 0 0 20px rgba(255,255,255,0.8); }
`;

const FloatingImage = styled("img")({
  animation: `${floatAnimation} 6s ease-in-out infinite`,
  transition: "transform 0.3s ease, filter 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    filter: "brightness(1.1)",
  },
});

const GlowText = styled(Typography)({
  animation: `${glow} 2s ease-in-out infinite alternate`,
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

const HoverButton = styled(Button)({
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
  },
});

const HomePage: React.FC = () => {
  const filterRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const floatingImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const animationFrameId = useRef<number>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCityClick = (cityId: string) => {
    navigate(`/city/${cityId}`);
  };

  const handleScrollToFilters = () => {
    filterRef.current?.scrollIntoView({ behavior: "smooth" });
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

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        overflow: "hidden",
        backgroundImage: "url('/backgrounds/purple.jpg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Box
        component="img"
        src="/Ellipse 2.png"
        sx={{
          width: { xs: "300px", sm: "450px", md: "608px", lg: "700px" },
          height: { xs: "500px", sm: "700px", md: "932px", lg: "1100px" },
          position: "absolute",
          top: { xs: "800px", md: "1200px", lg: "1100px" },
          left: 0,
          opacity: 0.45,
          zIndex: 1,
        }}
      />

      {!isMobile && (
        <>
          <Box
            component="img"
            src="/shrine.png"
            alt="Shrine"
            sx={{
              width: { xs: "400px", sm: "600px", md: "800px", lg: "900px" },
              height: { xs: "500px", sm: "700px", md: "900px", lg: "1030px" },
              display: { xs: "none", md: "none", lg: "block" },
              position: "absolute",
              top: { xs: "700px", md: "750px", lg: "800px" },
              left: { xs: "-100px", md: "-150px", lg: "-40px" },
              borderRadius: 2,
              animation: "levitate 12s ease-in-out infinite",
              "@keyframes levitate": {
                "0%, 100%": {
                  transform: "translateY(0px) rotate(-2deg)",
                  filter: "brightness(1)",
                },
                "50%": {
                  transform: "translateY(-25px) rotate(2deg)",
                  filter: "brightness(1.05)",
                },
              },
              zIndex: 2,
              transition: "all 0.5s ease",
              "&:hover": {
                filter: "brightness(1.1)",
              },
            }}
          />
        </>
      )}

      <Box
        component="img"
        src="/Group8.png"
        sx={{
          position: "absolute",
          top: { xs: "2500px", md: "3000px", lg: "3382px" },
          right: 0,
          width: { xs: "300px", md: "450px", lg: "550px" },
          height: { xs: "600px", md: "800px", lg: "1031px" },
          zIndex: 3,
        }}
      />

      <Box
        component="img"
        src="/Group9.png"
        sx={{
          position: "absolute",
          top: { xs: "1750px", md: "2050px", lg: "2250px" },
          right: 0,
          width: { xs: "585px", md: "685px", lg: "785px" },
          height: { xs: "550px", md: "650px", lg: "750px" },
          zIndex: 3,
        }}
      />

      <Box
        component="img"
        src="/Group10.png"
        sx={{
          position: "absolute",
          top: { xs: "1650px", md: "1950px", lg: "2150px" },
          right: 0,
          width: { xs: "240px", md: "280px", lg: "320px" },
          height: { xs: "217px", md: "257px", lg: "297px" },
          zIndex: 3,
        }}
      />

      <Box
        component="img"
        src="/Group11.png"
        sx={{
          position: "absolute",
          top: { xs: "3700px", md: "4100px", lg: "4470px" },
          left: 0,
          width: { xs: "690px", md: "820px", lg: "910px" },
          height: { xs: "650px", md: "754px", lg: "840px" },
          zIndex: 3,
        }}
      />

      <Box
        component="img"
        src="/Group12.png"
        sx={{
          position: "absolute",
          top: { xs: "3600px", md: "4000px", lg: "4400px" },
          left: { xs: "40px", md: "60px", lg: "77px" },
          width: { xs: "250px", md: "300px", lg: "350px" },
          height: { xs: "230px", md: "275px", lg: "330px" },
          zIndex: 3,
        }}
      />

      <Box
        component="img"
        src="/Group13.png"
        sx={{
          position: "absolute",
          display: { xs: "none", md: "none", lg: "block" },
          top: { xs: "4000px", md: "4400px", lg: "4800px" },
          right: 0,
          width: { xs: "350px", md: "450px", lg: "513px" },
          height: { xs: "700px", md: "850px", lg: "1031px" },
          zIndex: 3,
        }}
      />

      <Box
        component="img"
        src="/Ellipse1.png"
        sx={{
          position: "absolute",
          top: { xs: "3900px", md: "4300px", lg: "4755px" },
          display: { xs: "none", md: "none", lg: "block" },
          right: 0,
          width: { xs: "400px", md: "500px", lg: "573px" },
          height: { xs: "800px", md: "950px", lg: "1104px" },
          zIndex: 3,
        }}
      />

      <Box
        component="img"
        src="/WhiteCircle1.png"
        sx={{
          position: "absolute",
          top: { xs: "5000px", md: "6000px", lg: "6669px" },
          left: 0,
          width: { xs: "750px", md: "910px", lg: "1110px" },
          height: { xs: "1200px", md: "1280px", lg: "1400px" },
          zIndex: 1,
        }}
      />

      <Box
        component="img"
        src="/Group14.png"
        sx={{
          position: "absolute",
          top: { xs: "7000px", md: "7800px", lg: "8400px" },
          left: { xs: "80px", md: "109px", lg: "129px" },
          width: { xs: "380px", md: "441px", lg: "461px" },
          height: { xs: "350px", md: "412px", lg: "442px" },
          zIndex: 5,
        }}
      />

      <Box
        component="img"
        src="/Group15.png"
        sx={{
          position: "absolute",
          top: { xs: "7100px", md: "7900px", lg: "8500px" },
          right: 0,
          width: { xs: "750px", md: "950px", lg: "1050px" },
          height: { xs: "800px", md: "1024px", lg: "1124px" },
          zIndex: 5,
        }}
      />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: "url('/mountains.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: { xs: "scroll", md: "fixed" },
          color: "#fff",
          display: "flex",
          alignItems: "center",
          position: "relative",
          zIndex: 5,
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)",
            zIndex: 1,
          },
        }}
      >
        <Container
          maxWidth="md"
          sx={{
            textAlign: "center",
            mt: { xs: 8, sm: 12, md: 16, lg: 20 },
            mb: { xs: 4, md: 8 },
            px: { xs: 2, sm: 3 },
            position: "relative",
            zIndex: 2,
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: { xs: 1, md: 2 },
              fontSize: {
                xs: "1.5rem",
                sm: "1.75rem",
                md: "2rem",
                lg: "2.25rem",
              },
              fontWeight: 500,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              animation: `${fadeIn} 0.8s ease-out forwards`,
            }}
          >
            Откройте Россию заново
          </Typography>

          <GlowText
            variant="h1"
            sx={{
              fontWeight: 700,
              mb: { xs: 2, sm: 3, md: 4 },
              fontSize: {
                xs: "3rem",
                sm: "4rem",
                md: "5rem",
                lg: "5.5rem",
              },
              lineHeight: 1.2,
              letterSpacing: { xs: "-0.5px", md: "-1px" },
              color: "#ffffff",
              animation: `${fadeIn} 0.8s ease-out 0.2s forwards`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Путешествия стали ближе
          </GlowText>

          {!isMobile && (
            <Typography
              variant="subtitle1"
              sx={{
                mb: { xs: 3, md: 4 },
                fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                lineHeight: 1.6,
                textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                maxWidth: "800px",
                mx: "auto",
                animation: `${fadeIn} 0.8s ease-out 0.4s forwards`,
                opacity: 0,
              }}
            >
              Теперь вы можете исследовать самые живописные уголки России не
              выходя из дома. Погрузитесь в VR-туры, почувствуйте атмосферу
              Кавказа, Байкала или Камчатки и спланируйте идеальную поездку.
            </Typography>
          )}

          <HoverButton
            variant="outlined"
            onClick={handleScrollToFilters}
            sx={{
              borderRadius: "30px",
              color: "#fff",
              borderColor: "#fff",
              px: { xs: 3, md: 4 },
              py: { xs: 1, md: 1.5 },
              fontSize: { xs: "0.875rem", md: "1rem" },
              fontWeight: 500,
              backgroundColor: "rgba(255,255,255,0.1)",
              animation: `${pulse} 2s infinite, ${fadeIn} 0.8s ease-out 0.6s forwards`,
              opacity: 0,
              minWidth: { xs: "160px", md: "180px" },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
            }}
          >
            Найти тур
          </HoverButton>
        </Container>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          mt: { xs: "50px", sm: "100px", md: "150px", lg: "232px" },
          mb: { xs: "50px", md: "100px" },
          px: { xs: 2, sm: 3, md: 4 },
          zIndex: 6,
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: { xs: "center", lg: "flex-end" },
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", lg: "60%", xl: "50%" },
              maxWidth: { lg: "876px" },
              color: "#B122E9",
              display: "flex",
              flexDirection: "column",
              gap: { xs: "30px", md: "50px", lg: "75px" },
              alignItems: { xs: "center", lg: "flex-start" },
              textAlign: { xs: "center", lg: "left" },
              py: { xs: 3, md: 4 },
              px: { xs: 2, md: 3 },
              borderRadius: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                alignItems: { xs: "center", lg: "flex-start" },
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: "1.75rem",
                    sm: "2rem",
                    md: "2.5rem",
                    lg: "3rem",
                  },
                  color: "white",
                  lineHeight: 1,
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    color: darkIndigo,
                  },
                }}
              >
                ФОТО И ВИДЕО
              </Typography>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: "2.5rem",
                    sm: "3rem",
                    md: "4rem",
                    lg: "4.5rem",
                  },
                  color: "#B122E9",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                    color: darkIndigo,
                  },
                  lineHeight: 1,
                  mt: { xs: 1, md: 2 },
                }}
              >
                КОНТЕНТ 360°
              </Typography>
            </Box>

            <Box
              sx={{
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: "20px", md: "30px" },
                  alignItems: { xs: "center", lg: "flex-end" },
                  textAlign: { xs: "center", lg: "right" },
                  color: "#7041C7",
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "1.25rem",
                      sm: "1.5rem",
                      md: "1.75rem",
                      lg: "2rem",
                    },
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  Откройте для себя Алтайские горы, золотые пески Дагестана и
                  вулканы Камчатки через VR-туры. Выбирайте маршрут, изучайте
                  локации в 360° и создавайте идеальный тревел-план.
                </Typography>
                <Button
                  onClick={handleScrollToFilters}
                  variant="contained"
                  sx={{
                    borderRadius: "30px",
                    color: "#fff",
                    backgroundColor: "#A93FD3",
                    px: { xs: 3, md: 4 },
                    py: { xs: 1, md: 1.5 },
                    fontSize: { xs: "1rem", md: "1.25rem" },
                    fontWeight: 600,
                    textTransform: "uppercase",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "#fff",
                    },
                    transition: "all 0.3s ease",
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.05)" },
                      "100%": { transform: "scale(1)" },
                    },
                    minWidth: { xs: "200px", md: "240px" },
                  }}
                >
                  К маршрутам
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          gap: { xs: "48px", md: "64px", lg: "80px" },
          color: "#B122E9",
          mb: { xs: "60px", md: "80px", lg: "100px" },
          mt: { xs: "150px", md: "190px", lg: "270px" },
          zIndex: 7,
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 700,
            fontSize: {
              xs: "2.5rem",
              sm: "3.5rem",
              md: "4rem",
              lg: "4.5rem",
            },
            lineHeight: 1,
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              color: darkIndigo,
            },
          }}
        >
          3D-МАРШРУТЫ
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 600,
            color: "#3A2496",
            fontSize: {
              xs: "1.75rem",
              sm: "2.25rem",
              md: "2.75rem",
              lg: "3.5rem",
            },
            letterSpacing: "-0.4px",
            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.02)",
              color: darkIndigo,
            },
          }}
        >
          ПОПУЛЯРНЫЕ МАРШРУТЫ
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          zIndex: 8,
          py: { xs: 2, md: 4 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Box
          component="img"
          src="/tipok.png"
          alt="Человечек"
          sx={{
            position: "absolute",
            display: { xs: "none", md: "block" },
            right: { xs: "8vw", md: "10vw", lg: "12vw" },
            top: { xs: "-20px", md: "-15px", lg: "-10px" },
            width: {
              xs: "250px",
              sm: "300px",
              md: "350px",
              lg: "450px",
            },
            height: "auto",
            zIndex: 5,
            animation: "levitate 8s ease-in-out infinite",
            "@keyframes levitate": {
              "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
              "50%": { transform: "translateY(-20px) rotate(2deg)" },
            },
          }}
        />

        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", lg: "90%", xl: "1200px" },
            mx: "auto",
            mb: { xs: 4, md: 6 },
          }}
        >
          <CityCardsGrid onCityClick={handleCityClick} />
        </Box>

        <Box
          ref={filterRef}
          sx={{
            position: "relative",
            width: "100%",
            mt: { xs: 40, md: 48 },
            ml: { sm: 10, md: 18, lg: 22, xl: 24},
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            alignItems: { xs: "center", lg: "flex-start" },
            justifyContent: "center",
            zIndex: 9,
            gap: {lg:10}
          }}
        >
          <Box
            ref={filterRef}
            sx={{
              position: "relative",
              width: "100%",
              mt: { xs: 40, md: 48 },
              display: "flex",
              flexDirection: { xs: "column", lg: "row" },
              alignItems: "flex-start",
              zIndex: 9,
              "& .MuiTextField-root": {
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "scale(1.01)",
                },
              },
              "& .MuiInputBase-input": {
                transition: "all 0.3s ease",
                "&:focus": {
                  transform: "scale(1.02)",
                },
              },
            }}
          >
            <FindTourForm />
          </Box>

          <Box
            component="img"
            src="/Лев.png"
            alt="Лев"
            sx={{
              position: { xs: "absolute", lg: "relative" },
              display: { xs: "none", md: "block" },
              right: { xs: "-100px", md: "-20px", lg: "-10px", xl: 0 },
              top: { xs: "50%", lg: "20%" },
              width: {
                xs: "200px",
                sm: "300px",
                md: "400px",
                lg: "500px",
                xl: "700px",
              },
              height: "auto",
              zIndex: 4,
              animation: "levitate 8s ease-in-out infinite",
              "@keyframes levitate": {
                "0%, 100%": { transform: "translateY(0px) rotate(-2deg)" },
                "50%": { transform: "translateY(-20px) rotate(2deg)" },
              },
              mb: { lg: 2 },
              ml: { lg: 0 },
              order: { lg: 2 },
            }}
          />
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          py: { xs: 4, md: 6 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            mb: { xs: "40px", md: "60px", lg: "80px" },
            mt: { xs: 25, md: 30 },
            fontWeight: 700,
            color: "#3A2496",
            fontSize: { xs: "1.75rem", md: "2.25rem", lg: "2.5rem" },
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              color: 'darkIndigo'
            }
          }}
        >
          ПОДОБРАНО ДЛЯ ВАС
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", lg: "90%", xl: "1200px" },
            }}
          >
            <CityCardsGrid onCityClick={handleCityClick} />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          width: "100%",
          mt: { xs: 40, md: 48 },
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
            display: { xs: "none", lg: "block" },
            width: {
              xs: "200px",
              sm: "250px",
              md: "300px",
              lg: "450px",
              xl: "700px",
            },
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
              md: "75%",
              lg: "55%",
              xl: "50%",
            },
            mt: {
              xs: "120px",
              sm: "140px",
              md: "170px",
              lg: 0,
            },
            mx: { xs: "auto", lg: 0 },
            zIndex: 4,
            position: "relative",
          }}
        >
          <TourPartnersForm />
        </Box>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 11,
          ml: { xs: 0, md: 0, lg: "692px" }, 
          mb: { xs: "40px", md: "80px" },
        }}
      >
        <AuthRedirectModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
        />
      </Box>
    </Box>
  );
};

export default HomePage;
