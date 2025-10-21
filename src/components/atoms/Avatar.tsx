import React from 'react';
import styles from '../../styles/Avatar.module.css';

interface AvatarProps {
  image?: string;
  alt?: string;
}

const Avatar: React.FC<AvatarProps> = ({ image, alt }) => (
  <div className={styles.avatar}>
    {image ? (
      <img 
        src={image} 
        alt={alt || 'avatar'}  
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        
      />
    ) : (
      <span className={styles.noImage}>No Image</span>
    )}
  </div>
);

export default Avatar;
