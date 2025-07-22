import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";


export const AppLayout = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(to bottom,rgb(44, 14, 113) 0%,rgb(248, 238, 255) 100%)",
      }}
    >
      <Outlet />
    </Box>
  );
};
