import React from 'react';
import { User } from '../../types/user';
import styles from './UserCard.module.css';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{user.name}</h2>
      <p className={styles.info}>город: {user.address.city}</p>
      <p className={styles.info}>компания: {user.company.name}</p>
      <span className={styles.link}>Подробнее</span>
    </div>
  );
};

export default UserCard;