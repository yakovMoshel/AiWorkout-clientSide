import React, { useState } from "react";
import Avatar from "../atoms/Avatar";
import InputField from "../atoms/InputField";
import SelectField from "../atoms/SelectField";
import styles from "../../styles/ProfileEdit.module.css";
import { editProfile } from "../../services/pofileEdit";

const goals = [
    { value: "muscle_gain", label: "Muscle Gain" },
    { value: "fat_loss", label: "Fat Loss" },
    { value: "endurance", label: "Endurance" },
];

type ProfileEditProps = {
    image?: string;
    initialWeight: number;
    initialGoal: string;
};

const ProfileEdit: React.FC<ProfileEditProps> = ({ image, initialWeight, initialGoal }) => {
    const [preview, setPreview] = useState<string | undefined>(image);
    const [message, setMessage] = useState<string | null>(null);
    const [weight, setWeight] = useState(initialWeight);
    const [goal, setGoal] = useState(initialGoal);
    const [file, setFile] = useState<File | null>(null)

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
            setMessage("Profile updated successfully!");
        } catch (err: any) {
            setMessage(err.message);
        }
    };

    return (
        <form className={styles.edit} onSubmit={handleSubmit}>
            <label>
                <Avatar image={preview} />
                <input type="file" name="image" accept="image/*" onChange={handleAvatarChange} />
            </label>

            <label>
                Weight
                <InputField type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} />
            </label>

            <label>
                Goal
                <SelectField options={goals} value={goal} onChange={e => setGoal(e.target.value)} />
            </label>

            <button type="submit">Save</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default ProfileEdit;
