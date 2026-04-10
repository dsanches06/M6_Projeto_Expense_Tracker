import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "../styles/MainLayout.css";


const MainLayout = () => {
  // pegar localização para destacar link ativo
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <div className="layout-wrapper">
        <aside className="sidebar">
          <div className="logo-container">
            <NavLink to="/" className="logo-link">
              <img className="nav-logo" src="./src/assets/expense.png" alt="logotipo do app" />
            </NavLink>
          </div>
          <nav className="sidebar-nav">
            <NavLink to="/" className={location.pathname === "/" ? "active" : ""}>🏠 Home</NavLink>
            <NavLink to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>📊 DashBoard</NavLink>
            <NavLink to="/about" className={location.pathname === "/about" ? "active" : ""}>ℹ️ About</NavLink>
            <NavLink to="/contact" className={location.pathname === "/contact" ? "active" : ""}>📧 Contact</NavLink>
          </nav>
        </aside>
        <div className="main-content">
          <div className="theme-toggle">
            <button 
              className={`theme-btn ${theme === "light" ? "active" : ""}`}
              onClick={() => toggleTheme("light")}
              title="Tema Claro"
            >
              <i className="fas fa-sun"></i>
            </button>
            <button 
              className={`theme-btn ${theme === "dark" ? "active" : ""}`}
              onClick={() => toggleTheme("dark")}
              title="Tema Escuro"
            >
              <i className="fas fa-moon"></i>
            </button>
          </div>
          <main>
            <Outlet />
          </main>
          <footer>
            <p>Desenvolvido por Abel Pinto e Danilson Sanches.</p>
            <p>M6: Frontend: React &amp; Next.js</p>
            <p>Front End + AI - UPSKILL 2025 - 2026</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
