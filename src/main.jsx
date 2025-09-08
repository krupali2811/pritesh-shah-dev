import "./index.css";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { CONFIG } from "./utils/config-global.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter basename={CONFIG.site.basePath || "/"}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>
);
