import React from 'react';
import ProfileInfo from '../molecules/ProfileInfo';
import { User } from '../../domain/models/interfaces/IUser';

const ProfileCard: React.FC<{ user: User }> = ({ user }) => (
    <>
        <ProfileInfo
            name={user.name}
            age={user.age}
            weight={user.weight}
            goal={user.goal}
            image={user.image}
        />

    </>
);

export default ProfileCard;
