import { Link, Outlet, useLocation } from "react-router-dom";
import { activities } from "./activities";

export default function AppLayout() {
  const { pathname } = useLocation();
  const activity = activities.find(item => item.path === pathname);

  return (
    <div className="app-shell" data-activity={activity?.kind}>
      <header className="app-header">
        <Link to="/" className="brand" aria-label="Ditado web — início">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none"><path d="M5 8Q11 6 16 10Q21 6 27 8V24Q21 22 16 26Q11 22 5 24Z" fill="white" /><path d="M16 10V26" stroke="#C9B9FF" strokeWidth="2" /></svg>
          </span>
          ditado<span>web</span>
        </Link>
        <span className="header-caption"><span aria-hidden="true">✦</span> Aprender é uma aventura!</span>
      </header>
      <main id="conteudo" className="main-content"><Outlet /></main>
      <footer className="app-footer"><span aria-hidden="true">✦</span> Cada descoberta é uma conquista. Vamos no seu ritmo!</footer>
    </div>
  );
}

