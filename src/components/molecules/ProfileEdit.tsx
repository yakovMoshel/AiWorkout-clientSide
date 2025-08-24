import React, { useState } from 'react';
import InputField from '../atoms/InputField';
import SelectField from '../atoms/SelectField';
import Avatar from '../atoms/Avatar';
import styles from '../../styles/ProfileEdit.module.css';

interface ProfileEditProps {
    initialWeight: number;
    initialGoal: string;
    avatarSrc?: string;
}

const goals = [
    { value: 'muscle_gain', label: 'Muscle Gain' },
    { value: 'fat_loss', label: 'Fat Loss' },
    { value: 'endurance', label: 'Endurance' },
];

const ProfileEdit: React.FC<ProfileEditProps> = ({ initialWeight, initialGoal, avatarSrc }) => {
    const [weight, setWeight] = useState(initialWeight);
    const [goal, setGoal] = useState(initialGoal);
    const [avatar, setAvatar] = useState<string | undefined>(avatarSrc);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (ev) => setAvatar(ev.target?.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className={styles.edit}>
            <label>
                <Avatar src={avatar} />
                <input type="file" accept="image/*" onChange={handleAvatarChange} className={styles.avatarInput} />
            </label>
            <label>
                Weight
                <InputField type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} />
            </label>
            <label>
                Goal
                <SelectField options={goals} value={goal} onChange={e => setGoal(e.target.value)} />
            </label>
        </div>
    );
};

export default ProfileEdit;
