import { Outlet, NavLinkLink } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>&copy; 2026 </p>
      </footer>
    </div>
  );
};

export default MainLayout;
