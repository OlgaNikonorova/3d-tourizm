import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { ToastContainer } from "react-toastify";
import { keyframes } from "@mui/system";

const slideIn = keyframes`
  from { 
    transform: translateX(100%); 
    opacity: 0;
  }
  to { 
    transform: translateX(0); 
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(251, 191, 36, 0); }
  100% { box-shadow: 0 0 0 0 rgba(251, 191, 36, 0); }
`;

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        toastStyle={{
          borderRadius: "12px",
          background: "rgba(58, 36, 150, 0.9)",
          backdropFilter: "blur(10px)",
          color: "#fff",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          animation: `${slideIn} 0.5s ease-out forwards`,
          margin: "8px",
          borderLeft: "4px solid transparent",
        }}
      />
    </>
  );
}

export default App;
