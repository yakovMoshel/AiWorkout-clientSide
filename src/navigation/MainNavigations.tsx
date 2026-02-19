import { NavLink } from "react-router-dom";
import styles from "../styles/MainNavigation.module.css";
import { useAuth } from "../store/auth-context";
import { useEffect, useRef, useState } from "react";

export default function MainNavigations() {
  const { isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const navLinks = [
    { to: "/", label: "HOME" },
    ...(isAuthenticated
      ? [
          { to: "/explore-exercises", label: "Explore Exercises" },
          { to: "/ai-chat", label: "AI Coach" },
          { to: "/profile", label: "Profile" },
        ]
      : [
          { to: "/login", label: "Login" },
          { to: "/register", label: "Register" },
        ]),
  ];

  return (
    <nav className={styles.nav} ref={navRef}>
      <button
        className={styles.menuButton}
        aria-expanded={menuOpen}
        aria-controls="main-nav-list"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <span className={styles.menuIcon} />
        <span className={styles.menuLabel}>Menu</span>
      </button>
      <ul
        id="main-nav-list"
        className={`${styles.list} ${menuOpen ? styles.listOpen : ""}`}
      >
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          </li>
        ))}

        {isAuthenticated && (
          <li>
            <button
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
              className={styles.navLink}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
