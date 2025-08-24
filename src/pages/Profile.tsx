import ProfileCard from '../components/organisms/ProfileCard';
import styles from '../styles/ProfilePage.module.css';
import { useNavigate } from 'react-router-dom';

const user = {
    name: 'John Doe',
    age: 25,
    weight: 75,
    goal: 'muscle_gain',
    avatarSrc: undefined,
};

export default function Profile() {
    const navigate = useNavigate();
    return (
        <div className={styles.container}>
            <ProfileCard user={user} />
            <button onClick={() => navigate('/profile/Edit')} style={{ marginTop: 24 }}>ערוך פרופיל</button>
        </div>
    );
}
