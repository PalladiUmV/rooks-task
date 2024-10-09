import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState, AppDispatch } from '../../store/store';
import { fetchUsers, sortUsersByCity, sortUsersByCompany } from '../../store/userSlice';
import UserCard from '../UserCard/UserCard';
import styles from './UserList.module.css';

const UserList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Список пользователей</h1>
        <div className={styles.sortButtons}>
          <button onClick={() => dispatch(sortUsersByCity())}>по городу</button>
          <button onClick={() => dispatch(sortUsersByCompany())}>по компании</button>
        </div>
      </div>
      <div className={styles.userGrid}>
        {users.map(user => (
          <Link to={`/user/${user.id}`} key={user.id} style={{ textDecoration: 'none' }}>
            <UserCard user={user} />
          </Link>
        ))}
      </div>
      <div className={styles.userCount}>Найдено {users.length} пользователей</div>
    </div>
  );
};

export default UserList;