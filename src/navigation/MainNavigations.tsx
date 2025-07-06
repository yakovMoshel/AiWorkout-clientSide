import { NavLink } from 'react-router-dom'
import styles from '../styles/MainNavigation.module.css'


const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/explore-exercises", label: "Explore Exercises" },
    { to: "/profile", label: "Profile" },
    { to: "/AiCoach", label: "AI Coach" },
    
];

export default function MainNavigations() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                {navLinks.map(({ to, label }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            className={({ isActive }) =>
                                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
                            }
                        >
                            {label}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}