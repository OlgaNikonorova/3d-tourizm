import { Edit } from "@mui/icons-material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import CloseIcon from "@mui/icons-material/Close";
import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Link,
  TextField,
  Typography,
  keyframes,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useProfilePage } from "./hooks/useProfilePage";

const animations = {
  fadeIn: keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `,
  float: keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0); }
  `,
  pulse: keyframes`
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  `,
};

const indigoColor = "#3A2496";

const ProfilePage = () => {
  const {
    user,
    form,
    isLoading,
    error,
    handleUpdateProfile,
    handleAvatarChange,
    handleLogout,
    isPasswordEditable,
    setIsPasswordEditable,
    avatarBase64,
  } = useProfilePage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = form;

  const floatingImagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const animationFrameId = useRef<number>();

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

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Ошибка загрузки данных пользователя
      </Alert>
    );
  }

  if (!user) {
    return (
      <Alert severity="warning" sx={{ mt: 2 }}>
        Пользователь не найден
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        backgroundImage: "url(/фонПрофиля.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "#000",
        pt: 15,
        pb: 60,
        overflowX: "hidden",
        position: "relative",
        zIndex: 1,
        animation: `${animations.fadeIn} 0.5s ease-out`,
      }}
    >
      <Box
        component="img"
        src="/1.png"
        ref={(el: HTMLImageElement | null) => {
          floatingImagesRef.current[0] = el;
        }}
        sx={{
          position: "absolute",
          top: { xs: 1250, md: 841 },
          left: { md: 337 },
          right: { xs: 0 },
          width: "28vw",
          height: "22vw",
          zIndex: 3,
          transition: "transform 0.5s ease, opacity 0.5s ease",
          display: { xs: "none", lg: "block" },
        }}
      />
      <Box
        component="img"
        src="/7.png"
        ref={(el: HTMLImageElement | null) => {
          floatingImagesRef.current[1] = el;
        }}
        sx={{
          position: "absolute",
          top: { xs: 1350, md: 910 },
          left: { xs: 20, md: 190 },
          width: 194,
          height: 215,
          zIndex: 3,
          transition: "transform 0.5s ease, opacity 0.5s ease",
          display: { xs: "none", lg: "block" },
        }}
      />
      <Box
        component="img"
        src="/squareGroup.png"
        sx={{
          position: "absolute",
          top: 601,
          left: -8,
          width: 305,
          height: 295,
          zIndex: 2,
          transition: "transform 0.5s ease, opacity 0.5s ease",
        }}
      />
      <Box
        component="img"
        src="/squareGroup2.png"
        sx={{
          position: "absolute",
          top: 858,
          left: 995,
          width: 305,
          height: 295,
          zIndex: 2,
          transition: "transform 0.5s ease, opacity 0.5s ease",
        }}
      />
      <Box
        component="img"
        src="/circleGroup.png"
        sx={{
          position: "absolute",
          top: { xs: 400, md: 683 },
          left: -41,
          width: 720,
          maxWidth: 720,
          height: 645,
          zIndex: 2,
          transition: "transform 0.5s ease, opacity 0.5s ease",
        }}
      />
      <Box
        component="img"
        src="/Group.png"
        sx={{
          position: "absolute",
          top: { xs: 1200, md: 800, lg: 750 },
          right: 0,
          width: 380,
          maxWidth: { xs: 250, md: 300, lg: 380 },
          height: { xs: 450, md: 550, lg: 645 },
          zIndex: 2,
          transition: "transform 0.5s ease, opacity 0.5s ease",
        }}
      />

      <Container
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row", lg: "row" },
          gap: { xs: 0, md: "5vw" },
          alignItems: { sx: "center", md: "flex-start" },
          position: "relative",
          zIndex: 4,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "35vw", lg: "30vw" },
            backgroundColor: "rgba(112, 65, 199, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: 10,
            zIndex: 4,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 3,
              pt: 5,
              px: 5,
            }}
          >
            <Typography
              sx={{
                mb: 2,
                color: "white",
                fontSize: 20,
                textShadow: "1px 1px 3px rgba(0,0,0,0.5)",
                animation: `${animations.pulse} 3s ease-in-out infinite`,
              }}
            >
              {user.phone ?? user.firstName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <label htmlFor="avatar-upload">
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleAvatarChange}
                />
                <Box
                  sx={{
                    position: "relative",
                    bottom: 7,
                  }}
                >
                  <Avatar
                    src={`data:image/jpeg;base64,${avatarBase64}`}
                    sx={{
                      width: 70,
                      height: 70,
                      cursor: "pointer",
                      mx: "auto",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      right: -5,
                      bottom: -5,
                      backgroundColor: "white",
                      borderRadius: "50%",
                      padding: "4px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      color: indigoColor,
                      animation: ` 2s ease-in-out infinite`,
                    }}
                  >
                    <BorderColorIcon sx={{ fontSize: 20 }} />
                  </Box>
                </Box>
              </label>
            </Box>
          </Box>
          <Box
            component="nav"
            sx={{
              fontSize: 24,
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", sm: "90%", md: "35%", lg: "30%", xl: "25%" },
              minWidth: { md: 350, lg: 400 },
              gap: "2rem",
              fontWeight: 300,
              borderRadius: 10,
              alignItems: "flex-start",
              px: 5,
            }}
          >
            <Link
              component={RouterLink}
              to="/favorites"
              underline="none"
              sx={{
                color: "white",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Просмотренное
            </Link>
            <Link
              component={RouterLink}
              to="/favorites"
              underline="none"
              sx={{
                color: "white",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Избранное
            </Link>
            <Link
              component={RouterLink}
              to="/favorites"
              underline="none"
              sx={{
                color: "white",
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              FAQ/частые вопросы
            </Link>
            <Link
              component={RouterLink}
              to="/favorites"
              underline="none"
              sx={{
                color: "white",
                mt: 2,
                textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Cлужба поддержки
            </Link>

            <Box
              sx={{
                width: "100%",
                px: 0,
                my: 2,
                marginBottom: 4,
              }}
            >
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  width: "100%",
                  borderRadius: "30px",
                  backgroundColor: indigoColor,
                  fontSize: "1rem",
                  fontWeight: "700",
                  color: "white",
                  py: 1.5,
                  animation: ` 2s ease-in-out infinite`,
                  "&:hover": {
                    backgroundColor: "#2a1a6d",
                    animation: `${animations.pulse} 1s ease-in-out infinite`,
                  },
                }}
              >
                Выйти из аккаунта
              </Button>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            minWidth: { lg: 650, xl: 800 },
            backgroundColor: "rgba(112, 65, 199, 0.8)",
            backdropFilter: "blur(10px)",
            borderRadius: 10,
            fontFamily: '"DM Sans", sans-serif',
            mt: { xs: 4, md: "160px" },
            mb: { xs: 4, md: 0 },
            zIndex: 4,
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          }}
        >
          <form onSubmit={handleSubmit(handleUpdateProfile)}>
            <Box
              sx={{
                display: "grid",
                rowGap: "30px",
                px: 5,
                pt: 7,
                "& .MuiTextField-root": {
                  "& .MuiOutlinedInput-root": {
                    fontSize: "24px",
                    color: "#ffffff",
                    borderRadius: "30px",
                    background: "transparent",
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                    fontSize: "24px",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  },
                  "& .MuiFormHelperText-root": {
                    color: "white",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
                  },
                },
              }}
            >
              <TextField
                label="Email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message?.toString()}
              />
              <TextField
                label="Логин"
                fullWidth
                {...register("login")}
                error={!!errors.login}
                helperText={errors.login?.message?.toString()}
              />
              <TextField
                label="Имя"
                fullWidth
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message?.toString()}
              />
              <TextField
                label="Фамилия"
                fullWidth
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message?.toString()}
              />
              <TextField
                fullWidth
                label="Номер телефона"
                {...register("phone")}
                {...(errors.phone && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phone.message}
                  </p>
                ))}
                defaultValue={user.phone}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TextField
                  label="Пароль"
                  type="password"
                  fullWidth
                  disabled={!isPasswordEditable}
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message?.toString()}
                  required={false}
                  value={isPasswordEditable ? undefined : "**********"}
                  slotProps={{
                    inputLabel: {
                      shrink: true,
                    },
                  }}
                />
                <IconButton
                  onClick={() => {
                    setIsPasswordEditable(!isPasswordEditable);
                    if (isPasswordEditable) {
                      setValue("password", undefined);
                    } else {
                      setValue("password", "");
                    }
                  }}
                  color={isPasswordEditable ? "primary" : "default"}
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  }}
                >
                  {isPasswordEditable ? <CloseIcon /> : <Edit />}
                </IconButton>
              </Box>
            </Box>

            <Box sx={{ mt: 4, px: 5 }}>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{
                  borderRadius: "30px",
                  backgroundColor: indigoColor,
                  fontSize: "1rem",
                  fontWeight: "700",
                  color: "white",
                  py: 1.5,
                  mb: 5,
                  fontFamily: '"DM Sans", sans-serif',
                  animation: ` 2s ease-in-out infinite`,
                  "&:hover": {
                    backgroundColor: "#2a1a6d",
                    animation: `${animations.pulse} 1s ease-in-out infinite`,
                  },
                }}
              >
                Сохранить
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;
