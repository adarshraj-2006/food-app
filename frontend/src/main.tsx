import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import StoreContextProvider from "./context/StoreContext";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
