import React from 'react';
import ProfileEdit from '../components/molecules/ProfileEdit';
import styles from '../styles/ProfilePage.module.css';

const user = {
  weight: 75,
  goal: 'muscle_gain',
  avatarSrc: undefined,
};

export default function EditProfile() {
  return (
    <div className={styles.container}>
      <h2>Edit Profile</h2>
      <ProfileEdit initialWeight={user.weight} initialGoal={user.goal} avatarSrc={user.avatarSrc} />
    </div>
  );
}
