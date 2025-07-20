import { AddLocationAlt, Favorite, Language } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  keyframes,
  styled
} from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTypedSelector } from "../../../../app/store/hooks";
import {
  userIdSelector,
  userRoleSelector,
} from "../../../../entities/user/store/userSlice";
import { useGetUserByIdQuery } from "../../../../entities/user/api/userApi";
import { useGetFileByIdQuery } from "../../../../features/files/api/filesApi";

const glowAnimation = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(251, 191, 36, 0.3); }
  50% { box-shadow: 0 0 15px rgba(251, 191, 36, 0.6); }
`;

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  padding: '8px 12px',
  textDecoration: 'none',
  color: '#fff',
  borderBottom: '2px solid transparent',
  transition: 'all 0.3s ease',
  fontSize: 'clamp(0.75rem, 3vw, 1rem)',
  position: 'relative',
  '&:hover': {
    color: 'rgb(251, 191, 36)',
    '&::after': {
      width: '100%',
    },
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-2px',
    left: 0,
    width: '0',
    height: '2px',
    backgroundColor: 'rgb(251, 191, 36)',
    transition: 'width 0.3s ease',
  },
}));

const StyledActiveLink = styled(StyledLink)({
  color: 'rgb(251, 191, 36)',
  borderBottom: '2px solid rgb(251, 191, 36)',
  '&::after': {
    width: '100%',
  },
});

const NavLink = ({
  to,
  children,
  active,
  icon,
}: {
  to: string;
  children: React.ReactNode;
  active?: boolean;
  icon?: React.ReactNode;
}) => {
  const LinkComponent = active ? StyledActiveLink : StyledLink;
  
  return (
    <LinkComponent to={to} sx={{fontSize: {sm: "14px", lg: "16px"}}}>
      {icon && <span style={{ display: 'flex' }}>{icon}</span>}
      <span>{children}</span>
    </LinkComponent>
  );
};

export const Navbar = () => {
  const userId = useTypedSelector(userIdSelector);
  const { data: user } = useGetUserByIdQuery(userId!, {
    refetchOnMountOrArgChange: true,
  });

  const { data: file } = useGetFileByIdQuery(user?.profilePictureId ?? "", {
    refetchOnMountOrArgChange: true,
    skip: !user?.profilePictureId,
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { pathname } = useLocation();
  const userRole = useTypedSelector(userRoleSelector);
  const isAdmin = userRole === "admin";
  const isActiveRoute = (path: string) => pathname.startsWith(path);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (langCode: string) => {
    console.log("Выбран язык:", langCode);
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        background: "transparent",
        backdropFilter: "blur(10px)",
        transition: "all 0.3s ease",
        "&:hover": {
          background: "rgba(0, 0, 0, 0.17)",
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 4,
          py: 2,
          "@media (max-width:600px)": {
            gap: 2,
            px: 1,
          },
        }}
      >
        <NavLink to="/home" active={isActiveRoute("/home")}>
          Главная
        </NavLink>
        <NavLink to="/contacts" active={isActiveRoute("/contacts")}>
          Контакты
        </NavLink>
        
        {isAdmin && (
          <NavLink
            to="/create-city"
            active={isActiveRoute("/create-city")}
            icon={<AddLocationAlt fontSize="small" />}
          >
            Добавить регион
          </NavLink>
        )}

        <IconButton 
          sx={{ 
            color: "#fff",
            transition: "all 0.3s ease",
            "&:hover": {
              color: "rgb(251, 191, 36)",
              transform: "rotate(15deg)",
            }
          }} 
          onClick={handleMenuOpen}
        >
          <Language />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{
            "& .MuiPaper-root": {
              background: "rgba(219, 213, 213, 0.39)",
              backdropFilter: "blur(10px)",
            }
          }}
        >
          {[
            { code: "ru", icon: "/ru.png", label: "RU" },
            { code: "en", icon: "/en.png", label: "EN" },
            { code: "zh", icon: "/zn.png", label: "ZH" },
            { code: "ar", icon: "/ar.png", label: "AR" },
          ].map((lang) => (
            <MenuItem 
              key={lang.code}
              onClick={() => handleLanguageSelect(lang.code)}
              sx={{
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(251, 191, 36, 0.1)",
                }
              }}
            >
              <img
                src={lang.icon}
                alt={lang.label}
                width={24}
                height={16}
                style={{ marginRight: 8 }}
              />
              <Typography variant="body2">{lang.label}</Typography>
            </MenuItem>
          ))}
        </Menu>

        <IconButton
          component={Link}
          to="/favorites"
          sx={{
            color: "#fff",
            transition: "all 0.3s ease",
            "&:hover": {
              color: "rgb(251, 191, 36)",
              animation: `${glowAnimation} 1.5s ease-in-out infinite`,
            }
          }}
        >
          <Favorite />
        </IconButton>

        <IconButton
          component={Link}
          to="/profile"
          sx={{
            p: 0,
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
            }
          }}
        >
          <Avatar
            src={`data:image/jpeg;base64,${file?.data}`}
            sx={{
              width: 32,
              height: 32,
              bgcolor: "rgba(255, 255, 255, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                bgcolor: "rgba(251, 191, 36, 0.3)",
                boxShadow: "0 0 10px rgba(251, 191, 36, 0.5)",
              },
            }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};