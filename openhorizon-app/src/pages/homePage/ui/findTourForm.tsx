import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  keyframes,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "58px",
  padding: "55px 40px",
  backgroundColor: "rgba(255, 255, 255, 0.53)",
  maxWidth: "643px",
  borderRadius: "30px",
  textAlign: "center",
  filter: "drop-shadow(20px 25px 4px rgba(68, 56, 117, 0.3))",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "8px",
    background: "linear-gradient(90deg, #B122E9, #3A2496)",
    backgroundSize: "200% 200%",
    animation: `${gradientAnimation} 5s ease infinite`,
    zIndex: 1,
  },
  [theme.breakpoints.down("sm")]: {
    padding: "30px 20px",
    maxWidth: "90%",
    gap: "30px",
  },
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "42px",
  color: "#B122E9",
  lineHeight: "52px",
  textAlign: "center",
  letterSpacing: "-0.4px",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-15px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "60px",
    height: "3px",
    background: "linear-gradient(90deg, #B122E9, #3A2496)",
    borderRadius: "3px",
    animation: `${gradientAnimation} 5s ease infinite`,
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "32px",
    lineHeight: "42px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    lineHeight: "32px",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#B122E9",
  color: "white",
  borderRadius: "30px",
  padding: "12px 24px",
  fontSize: "1.5rem",
  fontWeight: 700,
  width: "60%",
  boxShadow: "0px 4px 15px rgba(177, 34, 233, 0.3)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s ease",
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  "&:hover": {
    backgroundColor: "#9119c7",
    boxShadow: "0px 6px 20px rgba(177, 34, 233, 0.4)",
    transform: "scale(1.05)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: "-100%",
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
    transition: "all 0.6s ease",
  },
  "&:hover::before": {
    left: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "80%",
    fontSize: "1.2rem",
  },
}));

const StyledSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-icon": {
    color: "#7041C7",
    fontSize: "2rem",
  },
  "&.MuiOutlinedInput-root": {
    backgroundColor: "white",
    borderRadius: "12px",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0px 0px 0px 2px rgba(177, 34, 233, 0.2)",
    },
    "&.Mui-focused": {
      boxShadow: "0px 0px 0px 2px rgba(177, 34, 233, 0.4)",
    },
  },
}));

const FindTourForm = () => {
  const [region, setRegion] = React.useState("");
  const [city, setCity] = React.useState("");
  const [sort, setSort] = React.useState("");
  const theme = useTheme();

  return (
    <FormContainer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "49px",
          mt: 2,
          flexGrow: 1,
        }}
      >
        <FormTitle>ПОДБЕРИ ИДЕАЛЬНЫЙ ТУР</FormTitle>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "44px" }}>
          <FormControl fullWidth>
            <InputLabel
              id="region-label"
              sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
            >
              Область
            </InputLabel>
            <StyledSelect
              labelId="region-label"
              id="region"
              label="Область"
              value={region}
              onChange={(e) => setRegion(e.target.value as string)}
              IconComponent={KeyboardArrowDown}
            >
              <MenuItem
                value="altai"
                sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
              >
                Алтай
              </MenuItem>
              <MenuItem
                value="dagestan"
                sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
              >
                Дагестан
              </MenuItem>
              <MenuItem
                value="kamchatka"
                sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
              >
                Камчатка
              </MenuItem>
            </StyledSelect>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel
              id="city-label"
              sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
            >
              Город
            </InputLabel>
            <StyledSelect
              labelId="city-label"
              id="city"
              label="Город"
              value={city}
              onChange={(e) => setCity(e.target.value as string)}
              IconComponent={KeyboardArrowDown}
            >
              <MenuItem
                value="city1"
                sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
              >
                Город 1
              </MenuItem>
              <MenuItem
                value="city2"
                sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
              >
                Город 2
              </MenuItem>
              <MenuItem
                value="city3"
                sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
              >
                Город 3
              </MenuItem>
            </StyledSelect>
          </FormControl>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "42px",
              color: "#7041C7",
              lineHeight: "52px",
              textAlign: "center",
              letterSpacing: "-0.4px",
              [theme.breakpoints.down("md")]: {
                fontSize: "32px",
                lineHeight: "42px",
              },
              [theme.breakpoints.down("sm")]: {
                fontSize: "24px",
                lineHeight: "32px",
              },
            }}
          >
            Сортировать по:
          </Typography>

          <FormControl fullWidth>
            <InputLabel
              id="sort-label"
              sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
            >
              По популярности
            </InputLabel>
            <StyledSelect
              labelId="sort-label"
              id="sort"
              label="Сортировка"
              value={sort}
              IconComponent={KeyboardArrowDown}
            >
              <MenuItem
                value="popular"
                sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
              >
                Популярности
              </MenuItem>
              <MenuItem
                value="price"
                sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
              >
                Цене
              </MenuItem>
              <MenuItem
                value="rating"
                sx={{ fontSize: "20px", fontWeight: 400, color: "#3D3D46" }}
              >
                Рейтингу
              </MenuItem>
            </StyledSelect>
          </FormControl>
        </Box>
      </Box>

      <StyledButton variant="contained" color="primary">
        ПОДОБРАТЬ
      </StyledButton>
    </FormContainer>
  );
};

export default FindTourForm;
