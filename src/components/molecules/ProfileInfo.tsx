import React from 'react';
import styles from '../../styles/ProfileInfo.module.css';
import Avatar from '../atoms/Avatar';

interface ProfileInfoProps {
  name: string;
  age: number;
  weight: number;
  goal: string;
    avatarSrc?: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ name, age, weight, goal, avatarSrc }) => (
  <div className={styles.info}>
    <Avatar src={avatarSrc} />
    <div className={styles.name}>{name}</div>
    <p>Age: {age}</p>
    <p>Weight: {weight} kg</p>
    <p>Goal: {goal}</p>
  </div>
);

export default ProfileInfo;
