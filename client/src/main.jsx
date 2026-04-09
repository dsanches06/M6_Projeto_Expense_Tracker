import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./styles/index.css";
import App from "./App";
import Summary from "./components/Summary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="card" element={<Summary />} />
    </Routes>
  </BrowserRouter>,
);
