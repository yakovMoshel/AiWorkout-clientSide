import { useRef, useState } from "react";
import { useAuth } from "../../store/auth-context"; // ← הוסף
import { editProfile } from "src/services/pofileEdit";
import Avatar from "../atoms/Avatar";
import InputField from "../atoms/InputField";
import SelectField from "../atoms/SelectField";
import styles from "../../styles/ProfileEdit.module.css";

type ProfileEditProps = {
  image?: string;
  initialWeight: number;
  initialGoal: string;
};

const ProfileEdit: React.FC<ProfileEditProps> = ({
  image,
  initialWeight,
  initialGoal,
}) => {
  const { refetchUser } = useAuth(); 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | undefined>(image);
  const [message, setMessage] = useState<string | null>(null);
  const [weight, setWeight] = useState(initialWeight);
  const [goal, setGoal] = useState(initialGoal);
  const [file, setFile] = useState<File | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) formData.append("image", file);
    formData.append("weight", weight.toString());
    formData.append("goal", goal);
    try {
      await editProfile(formData);
      await refetchUser(); // ← הוסף — מעדכן את ה-context
      setMessage("Profile updated successfully!");
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <form className={styles.edit} onSubmit={handleSubmit}>

      <div style={{ position: "relative", display: "inline-block" }}>
        <Avatar image={preview} />
        <span
          onClick={() => fileInputRef.current?.click()}
          style={{
            position: "absolute",
            bottom: 0,
            background: "#093b8c",
            borderRadius: "50%",
            width: 24,
            height: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          ✏️
        </span>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        name="image"
        accept="image/*"
        onChange={handleAvatarChange}
        style={{ display: "none" }}
      />

      <input
        ref={fileInputRef}
        type="file"
        name="image"
        accept="image/*"
        onChange={handleAvatarChange}
        style={{ display: "none" }}
      />
      <label>
        Weight
        <InputField
          type="number"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
      </label>

      <label>
        Goal
        <SelectField
          options={[{ value: goal, label: goal }]}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </label>

      <button type="submit">Save</button>
      {message &&
        <p style={{
          color: message.includes("success")
            ? "#22c55e" : "#ef4444"
        }}>{message}</p>}
    </form>
  );
};

export default ProfileEdit;