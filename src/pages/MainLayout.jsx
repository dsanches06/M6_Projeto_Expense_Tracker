import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
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
