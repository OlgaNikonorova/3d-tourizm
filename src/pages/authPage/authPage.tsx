import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, Typography, Box } from "@mui/material";
import { AuthMode } from "./model/authMode";
import { getSchema } from "./lib/authValidation";
import { UserRole } from "../../entities/user/models/userRole";
import { useAuthPage } from "./hooks/useAuthPage";
import { animations } from "../../shared/styles/animations";
import { darkIndigo, indigoColor } from "../../shared/styles/colors";

const AuthPage = () => {

  const { error, mode, onSubmit, toggleMode } = useAuthPage();
  const isLogin = mode === AuthMode.Login;
  const isForgotPassword = mode === AuthMode.ForgotPassword;

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<any>({
    resolver: zodResolver(getSchema(mode) as any),
    mode: "onChange",
    defaultValues: { role: UserRole.USER },
  });

  const textFieldStyles = (fieldName: string) => ({
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      fontSize: "20px",
      height: "56px",
      transition: "all 0.3s ease",

      "& fieldset": {
        border: "none",
      },

      ...(dirtyFields[fieldName] && {
        boxShadow: "0 0 0 2px rgba(255,255,255,0.3)",
      }),

      "&:hover": {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
      },

      "&.Mui-focused": {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0 0 0 2px rgba(255,255,255,0.5)",
      },

      "& .MuiInputBase-input": {
        padding: "16px 14px",
      },
    },

    "& .MuiFormHelperText-root": {
      fontSize: "0.875rem",
      marginLeft: "14px",
    },
  });

  const handleFormSubmit = async (data: any) => {
    try {
      await onSubmit(data);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "url('/backgrounds/purple-iridescent-texture-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
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
            animation: `${animations.pulse} 3s ease-in-out infinite`,
          }}
        >
          {isLogin
            ? "Вход"
            : isForgotPassword
            ? "Восстановление пароля"
            : "Регистрация"}
        </Typography>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {isForgotPassword ? (
            <>
              <TextField
                label="Email"
                fullWidth
                sx={textFieldStyles("email")}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message?.toString()}
                margin="normal"
              />
              <TextField
                label="Логин"
                fullWidth
                sx={textFieldStyles("login")}
                {...register("login")}
                error={!!errors.login}
                helperText={errors.login?.message?.toString()}
                margin="normal"
              />
            </>
          ) : (
            <>
              <TextField
                label="Логин"
                fullWidth
                sx={textFieldStyles("login")}
                {...register("login")}
                error={!!errors.login}
                helperText={errors.login?.message?.toString()}
                margin="normal"
              />
              <TextField
                label="Пароль"
                type="password"
                fullWidth
                sx={textFieldStyles("password")}
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message?.toString()}
                margin="normal"
              />
            </>
          )}

          {!isLogin && !isForgotPassword && (
            <>
              <TextField
                label="Email"
                fullWidth
                sx={textFieldStyles("email")}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message?.toString()}
                margin="normal"
              />
              <TextField
                label="Имя"
                fullWidth
                sx={textFieldStyles("firstName")}
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message?.toString()}
                margin="normal"
              />
              <TextField
                label="Фамилия"
                fullWidth
                sx={textFieldStyles("lastName")}
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message?.toString()}
                margin="normal"
              />
              <TextField
                label="Телефон"
                fullWidth
                sx={textFieldStyles("phone")}
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message?.toString()}
                margin="normal"
              />
            </>
          )}

          {error && (
            <Typography
              color="error"
              textAlign="center"
              sx={{
                mt: 2,
                animation: `${animations.fadeIn} 0.3s ease-out`,
                textShadow: "none",
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              mb: 2,
              py: 1.5,
              borderRadius: "30px",
              backgroundColor: indigoColor,
              fontSize: "18px",
              fontWeight: 600,
              animation: `${animations.glow} 2s ease-in-out infinite`,
              "&:hover": {
                backgroundColor: darkIndigo,
                animation: `${animations.pulse} 1s ease-in-out infinite`,
              },
            }}
          >
            {isLogin
              ? "Войти"
              : isForgotPassword
              ? "Восстановить"
              : "Зарегистрироваться"}
          </Button>
        </form>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Button
            onClick={toggleMode}
            sx={{
              color: "white",
              textTransform: "none",
              fontSize: "16px",
              fontWeight: 500,
              textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
              "&:hover": {
                textDecoration: "underline",
                backgroundColor: "transparent",
              },
            }}
          >
            {isLogin
              ? "Нет аккаунта? Зарегистрируйтесь"
              : "Уже есть аккаунт? Войдите"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
