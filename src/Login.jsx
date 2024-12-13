import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles';
import { useDispatch } from 'react-redux';

import db from '../DB/firebase';
import { where, getDocs, collection, query } from 'firebase/firestore';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // React Router hook for navigation

  const [username, setUsername] = useState('U2');
  const [password, setPassword] = useState('P1');
  const [hover, setHover] = useState(false); // Hover state

  const handleLogin = async () => {
    const user = await getUserByCredentials(username, password);
    if (user && user.length > 0) {
      console.log('User data:', user);
      dispatch({ type: 'LoginUser', payload: user[0] });

      // Navigate based on Admin field
      if (user[0].Admin) {
        navigate('/AdminMode');
      } else {
        navigate('/CustomersMode');
      }
    } else {
      alert('Invalid username or password.');
      setUsername('');
      setPassword('');
    }
  };

  const getUserByCredentials = async (username, password) => {
    const q = query(
      collection(db, 'users'),
      where('UserName', '==', username),
      where('Password', '==', password)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const user = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error retrieving user:', error);
      return null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(); // Trigger the login function on Enter key
    }
  };

  return (
    <div
      style={styles.card}
      onKeyDown={handleKeyDown} // Add the onKeyDown event listener
      tabIndex="0" // Ensure the div is focusable for keyboard events
    >
      <h2 style={styles.headerTitle}>Login</h2>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button
        onClick={handleLogin}
        style={hover ? { ...styles.loginButton, ...styles.loginButtonHover } : styles.loginButton}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        Login
      </button>
      <div style={styles.newUserSection}>
        <span style={styles.newUserText}>New User?</span>{' '}
        <Link to="/Register" style={styles.registerLink}>
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
