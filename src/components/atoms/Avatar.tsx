import React from 'react';
import styles from '../../styles/Avatar.module.css';

interface AvatarProps {
  src?: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => (
  <div className={styles.avatar}>
    {src ? (
      <img src={src} alt={alt || 'avatar'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    ) : (
      <span className={styles.noImage}>No Image</span>
    )}
  </div>
);

export default Avatar;
