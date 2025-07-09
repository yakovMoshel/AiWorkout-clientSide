import { Form, NavLink, useRouteLoaderData } from 'react-router-dom'
import styles from '../styles/MainNavigation.module.css'

export default function MainNavigations() {
  const token = useRouteLoaderData('root') as string | null;

  const navLinks = [
    { to: "/", label: "HOME" },
    ...(token ? [
      { to: "/explore-exercises", label: "Explore Exercises" },
    //   { to: "/setup", label: "Set Up" },
    //   { to: "/AiCoach", label: "AI Coach" },
    //   { to: "/profile", label: "Profile" },
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

        {token && (
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
