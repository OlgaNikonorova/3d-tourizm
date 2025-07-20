import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  keyframes,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(177, 34, 233, 0.4); }
  70% { transform: scale(1.02); box-shadow: 0 0 0 10px rgba(177, 34, 233, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(177, 34, 233, 0); }
`;

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "20px",
    background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.15)",
    animation: `${fadeIn} 0.4s ease-out forwards`,
    fontFamily: "'DM Sans', sans-serif",
    maxWidth: "450px",
    width: "90%",
  },
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  fontSize: "1.8rem",
  fontWeight: 700,
  color: "#3A2496",
  textAlign: "center",
  padding: "24px 24px 8px 24px",
  fontFamily: "'DM Sans', sans-serif",
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  fontSize: "1.1rem",
  color: "#555",
  textAlign: "center",
  padding: "0 24px 20px 24px",
  fontFamily: "'DM Sans', sans-serif",
  lineHeight: 1.6,
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  padding: "16px 24px",
  justifyContent: "center",
  gap: "16px",
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "30px",
  padding: "10px 24px",
  fontSize: "1rem",
  fontWeight: 600,
  textTransform: "none",
  transition: "all 0.3s ease",
  fontFamily: "'DM Sans', sans-serif",
}));

export const AuthRedirectModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose?: () => void;
}) => {
  const navigate = useNavigate();

  const handleAuthRedirect = () => {
    navigate("/auth");
    onClose?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <StyledDialog open={open} onClose={handleClose}>
      <StyledDialogTitle>Требуется авторизация</StyledDialogTitle>
      <StyledDialogContent>
        Для выполнения этого действия необходимо войти в систему. Войдите, чтобы
        получить доступ ко всем возможностям!
      </StyledDialogContent>
      <StyledDialogActions>
        <StyledButton
          onClick={handleClose}
          sx={{
            color: "#3A2496",
            border: "2px solid #3A2496",
            "&:hover": {
              backgroundColor: "rgba(58, 36, 150, 0.1)",
              border: "2px solid #3A2496",
            },
          }}
        >
          Позже
        </StyledButton>
        <StyledButton
          onClick={handleAuthRedirect}
          variant="contained"
          sx={{
            backgroundColor: "#B122E9",
            color: "white",
            "&:hover": {
              backgroundColor: "#9119c7",
              animation: `${pulse} 1.5s infinite`,
            },
          }}
        >
          Войти / Зарегистрироваться
        </StyledButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};
