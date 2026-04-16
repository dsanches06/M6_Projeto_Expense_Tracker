import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/theme.css";
import "./styles/index.css";
import App from "./App";

// Ponto de entrada da aplicação React
// Renderiza o componente App dentro do StrictMode para deteção de problemas
createRoot(document.getElementById("root")).render(
  <StrictMode>
      <App />
  </StrictMode>
);
