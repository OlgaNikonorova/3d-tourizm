import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  keyframes,
  styled,
} from "@mui/material";
import { darkIndigo } from "../styles/colors";

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const FormContainer = styled(Box)(({ theme }) => ({
  maxWidth: "642px",
  margin: "440px auto",
  padding: "55px 40px",
  background: "rgba(255, 255, 255, 0.69)",
  borderRadius: "30px",
  boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  filter: "drop-shadow(20px 25px 4px rgba(68, 56, 117, 0.3))",
  zIndex: 50,
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "90%",
    margin: "100px auto",
    padding: "30px 20px",
  },
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
}));

const FormTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: "#741998ff",
  "&:hover": {
    transform: "scale(1.02)",
    color: darkIndigo,
  },
  fontSize: "42px",
  marginBottom: "77px",
  textTransform: "uppercase",
  lineHeight: 1.2,
  position: "relative",
  [theme.breakpoints.down("md")]: {
    fontSize: "32px",
    marginBottom: "50px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    marginBottom: "30px",
  },
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
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#B122E9",
  color: "white",
  padding: "5px 74px",
  fontSize: "32px",
  fontWeight: 700,
  borderRadius: "30px",
  boxShadow: "0px 4px 15px rgba(177, 34, 233, 0.3)",
  position: "relative",
  overflow: "hidden",
  whiteSpace: "nowrap",
  transition: "all 0.3s ease",
  animation: `${floatAnimation} 3s ease-in-out infinite`,
  [theme.breakpoints.down("md")]: {
    fontSize: "24px",
    padding: "5px 50px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
    padding: "5px 30px",
  },
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
}));

const TourPartnersForm = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  return (
    <FormContainer>
      <FormTitle variant="h4">ПРИОБРЕТАЙТЕ ТУРЫ У НАШИХ ПАРТНЕРОВ</FormTitle>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          transition: "all 0.3s ease",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: { xs: "100%", sm: "527px" },
            mb: { xs: "30px", sm: "50px", md: "77px" },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "20px", sm: "26px", md: "32px" },
              lineHeight: "1.4",
              color: "#3A2496",
              fontWeight: 700,
              textAlign: "left",
              mb: { xs: 1, sm: 2 },
            }}
          >
            Подробнее
          </Typography>

          <Box
            component="a"
            href="https://tours.tutu.ru/?utm_source=yandex&utm_medium=cpc&utm_campaign=mrkt_tours_wizard%C2%A0—%C2%A0new&utm_term=---autotargeting&yclid=10263498674584682495"
            sx={{
              color: "#3A2496",
              fontSize: { xs: "12px", sm: "14px", md: "16px" },
              fontWeight: 700,
              width: "100%",
              whiteSpace: "normal",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              textDecoration: "none",
              lineHeight: { xs: "1.5", sm: "1.8", md: "52px" },
              textAlign: "left",
              p: 1,
              borderRadius: "8px",
              transition: "all 0.3s ease",
              "&:hover": {
                textDecoration: "underline",
                backgroundColor: "rgba(177, 34, 233, 0.05)",
                transform: "translateX(5px)",
              },
            }}
          >
            https://tours.tutu.ru/?utm_source=yandex&utm_medium=cpc&utm_campaign=mrkt_tours_wizard%C2%A0—%C2%A0new&utm_term=---autotargeting&yclid=10263498674584682495
          </Box>
        </Box>
      </Box>

      <StyledButton
        variant="contained"
        size="large"
        href="https://tours.tutu.ru/?utm_source=yandex&utm_medium=cpc&utm_campaign=mrkt_tours_wizard%C2%A0—%C2%A0new&utm_term=---autotargeting&yclid=10263498674584682495"
      >
        Купить тур
      </StyledButton>
    </FormContainer>
  );
};

export default TourPartnersForm;
