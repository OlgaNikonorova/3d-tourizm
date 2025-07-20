import { Box, Button, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { darkIndigo, indigoColor } from "../../../shared/styles/colors";
import { animations } from "../../../shared/styles/animations";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  actionType: 'add' | 'edit';
}

const SuccessModal = ({ open, onClose, actionType }: SuccessModalProps) => {
  const navigate = useNavigate();

  const refreshForm = () => {
    // Закрываем модальное окно
    onClose();
    // Здесь можно добавить логику обновления формы, если нужно
  };

  const goToHome = () => {
    navigate("/home");
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Box sx={{
        backgroundColor: 'background.paper',
        borderRadius: '16px',
        boxShadow: 24,
        p: 4,
        width: '400px',
        outline: 'none'
      }}>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          {actionType === 'add' ? 'Город успешно добавлен!' : 'Город успешно обновлен!'}
        </Typography>
        
        <Typography sx={{ mb: 3 }}>
          {actionType === 'add' 
            ? 'Что вы хотите сделать дальше?' 
            : 'Изменения успешно сохранены.'}
        </Typography>
        
        <Box sx={{ display: "flex", gap: 3, justifyContent: 'center' }}>
          <Button
            onClick={goToHome}
            variant="contained"
            sx={{
              px: 4,
              borderRadius: "30px",
              minWidth: "120px",
              backgroundColor: indigoColor,
              fontSize: "16px",
              fontWeight: 600,
              animation: `${animations.pulse} 2s ease-in-out infinite`,
              "&:hover": {
                backgroundColor: darkIndigo,
              },
            }}
          >
            На главную
          </Button>
          
          {actionType === 'add' && (
            <Button
              onClick={refreshForm}
              variant="outlined"
              sx={{
                px: 4,
                borderRadius: "30px",
                minWidth: "120px",
                color: indigoColor,
                borderColor: indigoColor,
                fontSize: "16px",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(58, 36, 150, 0.1)",
                  borderColor: darkIndigo,
                },
              }}
            >
              Добавить еще
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default SuccessModal;