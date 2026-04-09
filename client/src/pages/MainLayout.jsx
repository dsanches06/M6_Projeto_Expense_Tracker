import { Outlet, Link, useLocation } from "react-router-dom";
import "../styles/MainLayout.css";

const MainLayout = () => {
  // pegar localização para destacar link ativo
  const location = useLocation();
  return (
    <div>
      <div className="layout-wrapper">
        <aside className="sidebar">
          <span className="nav-title">Expense Tracker</span>
          <nav className="sidebar-nav">
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
            <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
            <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link>
          </nav>
        </aside>
        <div className="main-content">
          <main>
            <Outlet />
          </main>
          <footer>
            <p>Desenvolvido por Abel Pinto e Danilson Sanchez.</p>
            <p>M6: Frontend: React &amp; Next.js</p>
            <p>Front End + AI - UPSKILL 2025 - 2026</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
