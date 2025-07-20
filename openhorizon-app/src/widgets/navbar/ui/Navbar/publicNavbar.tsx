import { AppBar, Button, Toolbar, Typography, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
`;

export const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar
      position="absolute"
      sx={{
        background: 'transparent',
        backdropFilter: 'blur(10px)',
        boxShadow: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          background: 'rgba(0, 0, 0, 0.17)',
        },
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          py: 2,
          px: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          component="div"
          sx={{
            fontSize: { xs: '1.1rem', sm: '1.3rem' },
            fontWeight: 700,
            color: '#fff',
            cursor: 'pointer',
            animation: `${floatAnimation} 3s ease-in-out infinite`,
            transition: 'all 0.3s ease',
            '&:hover': {
              color: 'rgb(251, 191, 36)',
              textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
            },
          }}
          onClick={() => navigate('/')}
        >
          OpenHorizon
        </Typography>

        <Button
          variant="outlined"
          onClick={() => navigate('/auth')}
          sx={{
            color: '#fff',
            borderColor: 'rgba(255, 255, 255, 0.5)',
            fontSize: { xs: '0.875rem', sm: '1rem' },
            fontWeight: 600,
            borderRadius: '20px',
            px: 3,
            py: 1,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(251, 191, 36, 0.1)',
              borderColor: 'rgb(251, 191, 36)',
              color: 'rgb(251, 191, 36)',
              transform: 'translateY(-2px)',
              boxShadow: '0 5px 15px rgba(251, 191, 36, 0.2)',
            },
          }}
        >
          Авторизоваться
        </Button>
      </Toolbar>
    </AppBar>
  );
};