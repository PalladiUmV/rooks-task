import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { updateUser } from '../../store/userSlice';
import { User } from '../../types/user';
import styles from './UserProfile.module.css';

const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => 
    state.users.users.find(u => u.id === Number(id))
  );

  const [editMode, setEditMode] = useState(false);
  const [editedUser, setEditedUser] = useState<User | null>(user || null);

  if (!user || !editedUser) return <div>User not found</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditedUser(prev => {
      if (!prev) return null;
      if (name.includes('.')) {
        const [parent, child] = name.split('.');
        return {
          ...prev,
          [parent]: {
            ...(prev[parent as keyof User] as object),
            [child]: value
          }
        };
      }
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editedUser) {
      dispatch(updateUser(editedUser));
      setEditMode(false);
      console.log('Updated user:', editedUser);
    }
  };

  return (
     <div className={styles.container}>
        <h1 className={styles.title}>Профиль пользователя</h1>
        <button className={styles.editModeButton} type="button" onClick={() => setEditMode(!editMode)}>Редактировать</button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleInputChange}
            disabled={!editMode}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>User name:</label>
          <input
            type="text"
            name="username"
            value={editedUser.username}
            onChange={handleInputChange}
            disabled={!editMode}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>E-mail:</label>
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleInputChange}
            disabled={!editMode}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Street:</label>
          <input
            type="text"
            name="address.street"
            value={editedUser.address.street}
            onChange={handleInputChange}
            disabled={!editMode}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>City:</label>
          <input
            type="text"
            name="address.city"
            value={editedUser.address.city}
            onChange={handleInputChange}
            disabled={!editMode}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Zip code:</label>
          <input
            type="text"
            name="address.zipcode"
            value={editedUser.address.zipcode}
            onChange={handleInputChange}
            disabled={!editMode}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={editedUser.phone}
            onChange={handleInputChange}
            disabled={!editMode}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Website:</label>
          <input
            type="text"
            name="website"
            value={editedUser.website}
            onChange={handleInputChange}
            disabled={!editMode}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Comment:</label>
          <textarea
            name="comment"
            value={editedUser.comment || ''}
            onChange={handleInputChange}
            disabled={!editMode}
          />
        </div>
        <button type="submit" disabled={!editMode} >Отправить</button>
      </form>
      
      <button onClick={() => navigate('/')}>Назад</button>
    </div>
  );
};

export default UserProfile;