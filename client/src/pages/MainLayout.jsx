import { Outlet, Link } from "react-router";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import expenseLogo from "../assets/expense.png";
import "../styles/MainLayout.css";

const MainLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`app ${theme}`}>
      <div className="layout-wrapper">
        <aside className="sidebar">
          <div className="logo-container">
            <Link to="/" className="logo-link">
              <img
                className="nav-logo"
                src={expenseLogo}
                alt="logotipo do app"
              />
            </Link>
          </div>

          <nav className="sidebar-nav">
            <Link to="/">Painel Dashboard</Link>
            <Link to="/adicionar">Nova Transação</Link>
            <Link to="/historico">Histórico</Link>
            <Link to="/estatisticas">Estatisticas</Link>
            <Link to="/definicoes">Definições</Link>
          </nav>
        </aside>

        <div className="main-content">
          <header className="app-header">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              title="Alternar tema"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
          </header>

          <main>
            <Outlet /> {/* ← as páginas renderizam aqui */}
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
