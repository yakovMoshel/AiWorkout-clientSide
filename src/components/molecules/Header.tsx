import MainNavigations from '../../navigation/MainNavigations'
import styles from '../../styles/header.module.css'
import { Link } from 'react-router-dom'
export default function Header() {
  return (
    <header className={styles.header}>
       <Link to="/"><h1>Ai Workout</h1></Link>
        <MainNavigations />
    </header>
  )
}