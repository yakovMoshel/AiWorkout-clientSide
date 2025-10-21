import ProfileEdit from "../components/molecules/ProfileEdit";
import styles from "../styles/ProfilePage.module.css";
import { useAuth } from "../store/auth-context";

export default function EditProfile() {
  const { user } = useAuth();
  if (!user) {
    return <div className={styles.container}>משתמש לא נמצא</div>;
  }
  return (
    <div className={styles.container}>
      <h2>Edit Profile</h2>
      <ProfileEdit
        initialWeight={user.weight}
        initialGoal={user.goal}
        image={user.image}
      />
    </div>
  );
}
