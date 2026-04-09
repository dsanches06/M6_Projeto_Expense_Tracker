
// importar componentes do react-router-dom
import { Routes, Route } from "react-router-dom";

// componente principal da aplicação
import MainLayout from "./pages/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
};

// exportar componente principal
export default App;
