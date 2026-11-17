import { NavLink, Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout() {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <div className={styles.logoIcon}>AI</div>
            <span className={styles.brandTitle}>AITaskPlanner</span>
            <span className={styles.badge}>v0.1.0-alpha</span>
          </div>
          <nav className={styles.nav} aria-label="Main Navigation">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
              end
            >
              Головна
            </NavLink>
            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              Задачі (404 тест)
            </NavLink>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <p>© {new Date().getFullYear()} AITaskPlanner Team. Веб-технології та веб-дизайн (ПР4).</p>
          <div className={styles.footerLinks}>
            <span className={styles.footerLink}>React + Vite</span>
            <span className={styles.footerLink}>CSS Modules</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
