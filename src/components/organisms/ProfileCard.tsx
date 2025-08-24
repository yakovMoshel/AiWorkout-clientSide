import React from 'react';
import ProfileInfo from '../molecules/ProfileInfo';

interface ProfileCardProps {
    user: {
        name: string;
        age: number;
        weight: number;
        goal: string;
        avatarSrc?: string;
    };
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => (
    <>
        <ProfileInfo
            name={user.name}
            age={user.age}
            weight={user.weight}
            goal={user.goal}
            avatarSrc={user.avatarSrc}
        />

    </>
);

export default ProfileCard;
