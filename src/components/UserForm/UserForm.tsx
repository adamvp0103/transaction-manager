import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { login, register } from '../../features/users/usersSlice';
import styles from './UserForm.module.scss';

function UserForm() {
  const dispatch = useAppDispatch();
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (isRegister) dispatch(register({ username, password, name }));
    dispatch(login({ username, password }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.dualButton}>
        <button
          className={isRegister ? styles.inactiveButton : styles.activeButton}
          onClick={() => setIsRegister(false)}
        >
          Log In
        </button>
        <button
          className={isRegister ? styles.activeButton : styles.inactiveButton}
          onClick={() => setIsRegister(true)}
        >
          Register
        </button>
      </div>

      <h2 className={styles.pageTitle}>{isRegister ? 'Register' : 'Log In'}</h2>

      <input
        className={styles.input}
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className={styles.input}
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {isRegister && (
        <input
          className={styles.input}
          value={name}
          placeholder="First Name"
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <button className={styles.submitButton} onClick={handleSubmit}>
        {isRegister ? 'Register' : 'Log In'}
      </button>
    </div>
  );
}

export default UserForm;
