// importar componentes do react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";

// componente principal da aplicação
import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import DashBoard from "./pages/DashBoard";

const App = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

// exportar componente principal
export default App;
