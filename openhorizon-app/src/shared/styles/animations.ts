import { keyframes } from "@mui/material";

export const animations = {
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

  glow: keyframes`
    0% { box-shadow: 0 0 5px rgba(255,255,255,0.3); }
    50% { box-shadow: 0 0 10px rgba(255,255,255,0.5); }
    100% { box-shadow: 0 0 5px rgba(255,255,255,0.3); }
  `,

  rotate: keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `,
};