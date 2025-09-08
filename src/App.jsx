import "bootstrap/dist/js/bootstrap.bundle.min.js"; 
import "datatables.net-bs5";
import "datatables.net-bs5/css/dataTables.bootstrap5.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Router } from "./routes/sections";
import { useScrollToTop } from "./hooks/use-scroll-to-top";


export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <AuthProvider>

          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            closeButton={false}
          />
          <Router />

      </AuthProvider>
    </ThemeProvider>
  );
}
