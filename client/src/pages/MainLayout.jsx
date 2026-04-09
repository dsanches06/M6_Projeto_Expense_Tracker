import { Outlet, Link, useLocation } from "react-router-dom";
import "../styles/MainLayout.css";

const MainLayout = () => {
  // pegar localização para destacar link ativo
  const location = useLocation();
  return (
    <div>
      <header className="navbar">
        <span className="nav-title">Expense Tracker</span>
        <nav className="navbar-links">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link>
          <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>About</Link>
          <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>Contact</Link>
        </nav>
      </header>
      <main className="main-content" style={{marginLeft: 0}}>
        <Outlet />
      </main>
      <footer>
        <p>Desenvolvido por Abel Pinto e Danilson Sanchez.</p>
        <p>M6: Frontend: React &amp; Next.js</p>
        <p>Front End + AI - UPSKILL 2025 - 2026</p>
      </footer>
    </div>
  );
};

export default MainLayout;
