import ProfileCard from "../components/organisms/ProfileCard";
import { useAuth } from "../store/auth-context";
import styles from "../styles/ProfilePage.module.css";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user?.image);
  if (!user) {
    return <div className={styles.container}>משתמש לא נמצא</div>;
  }
  return (
    <div className={styles.container}>
      <ProfileCard user={user} />
      <button
        onClick={() => navigate("/profile/Edit")}
        style={{ marginTop: 24 }}
      >
        Edit Profile
      </button>
    </div>
  );
}
