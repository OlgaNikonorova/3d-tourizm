import { toast } from 'react-toastify';
import { keyframes } from '@mui/system';

const glow = keyframes`
  0% { border-left-color: rgba(251, 191, 36, 0.7); }
  50% { border-left-color: rgb(251, 191, 36); }
  100% { border-left-color: rgba(251, 191, 36, 0.7); }
`;

export const showSuccessToast = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    style: {
      borderLeft: '4px solid rgb(251, 191, 36)',
      animation: `${glow} 2s ease-in-out infinite`,
    },
  });
};

export const showErrorToast = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    style: {
      borderLeft: '4px solid #FF3D57',
    },
  });
};

export const showLoadingToast = (message: string) => {
  return toast.loading(message, {
    position: "top-right",
    style: {
      background: 'rgba(58, 36, 150, 0.95)',
      borderLeft: '4px solid #7A90D6',
    }
  });
};

export const showCustomToast = (message: string, icon: React.ReactNode) => {
  toast(message, {
    position: "top-right",
    autoClose: 5000,
    style: {
      background: 'rgba(90, 60, 180, 0.95)',
      borderLeft: '4px solid #9644C2',
    }
  });
};