import { NavLink } from 'react-router-dom'
import styles from '../styles/MainNavigation.module.css'
import { useAuth } from '../store/auth-context';

export default function MainNavigations() {
  const { isAuthenticated,logout } = useAuth();

   const navLinks = [
    { to: "/", label: "HOME" },
    ...(isAuthenticated ? [
      { to: "/explore-exercises", label: "Explore Exercises" },
      // { to: "/setup", label: "Set Up" },
      // { to: "/AiCoach", label: "AI Coach" },
      // { to: "/profile", label: "Profile" },
    ] : [
      { to: "/login", label: "Login" },
      { to: "/register", label: "Register" },
    ])
  ];

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {navLinks.map(({ to, label }) => (
          <li key={to}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }>
              {label}
            </NavLink>
          </li>
        ))}

        {isAuthenticated && (
          <li>
              <button onClick={logout} className={styles.navLink}>
                Logout
              </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
