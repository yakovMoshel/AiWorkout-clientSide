import React from "react";
import styles from "../../styles/ProfileInfo.module.css";
import Avatar from "../atoms/Avatar";

interface ProfileInfoProps {
  name: string;
  email: string;    
  age: number;
  height: number;   
  weight: number;
  goal: string;
  image?: string;
}



const ProfileInfo: React.FC<ProfileInfoProps> = ({
  name,
  email,
  age,
  height,
  weight,
  goal,
  image,
}) => (
  <div className={styles.info}>
    <Avatar image={image} />
    <div className={styles.name}>{name}</div>
    <p>{email}</p>
    <p>Age: {age ?? "—"}</p>
    <p>Height: {height ? `${height} cm` : "—"}</p>
    <p>Weight: {weight ? `${weight} kg` : "—"}</p>
    <p>Goal: {goal ?? "—"}</p>
  </div>
);

export default ProfileInfo;
