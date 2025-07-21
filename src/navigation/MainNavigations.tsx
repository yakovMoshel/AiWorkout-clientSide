import { Form, NavLink } from 'react-router-dom'
import styles from '../styles/MainNavigation.module.css'
import { useAuth } from '../store/auth-context';

export default function MainNavigations() {
  const { isAuthenticated } = useAuth();

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
            <Form method="post" action="/logout">
              <button type="submit" className={styles.navLink}>
                Logout
              </button>
            </Form>
          </li>
        )}
      </ul>
    </nav>
  );
}
