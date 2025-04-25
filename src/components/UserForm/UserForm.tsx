import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { login, register } from '../../features/users/usersSlice';

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
    <div>
      <div>
        <button onClick={() => setIsRegister(false)}>Log In</button>
        <button onClick={() => setIsRegister(true)}>Register</button>
      </div>

      <h2>{isRegister ? 'Register' : 'Log In'}</h2>

      <input
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      {isRegister && (
        <input
          value={name}
          placeholder="First Name"
          onChange={(e) => setName(e.target.value)}
        />
      )}

      <button onClick={handleSubmit}>
        {isRegister ? 'Register' : 'Log In'}
      </button>
    </div>
  );
}

export default UserForm;
