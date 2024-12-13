import { useState } from 'react';
import styles from '../styles';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import db from '../DB/firebase';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [viewOrders, setViewOrders] = useState(false);

  const handleRegister = async () => {
    if (!firstName || !lastName || !username || !password) {
      alert('Please fill in all fields!');
      return;
    }

    // Check if username already exists
    const isUsernameTaken = await checkUsernameExists(username);
    if (isUsernameTaken) {
      alert('Username already exists. Please choose another username.');
      setUsername(''); // Clear the username field
      return;
    }

    // If username does not exist, add the user
    const newUser = {
      FirstName: firstName,
      LastName: lastName,
      UserName: username,
      Password: password,
      ViewOrders: viewOrders,
      Admin: false,
      JoinedAt: new Date(), // Add the current date in "MM/DD/YYYY" format
    };

    try {
      await addDoc(collection(db, 'users'), newUser);
      alert('Registration successful!');
      // Clear the form
      setFirstName('');
      setLastName('');
      setUsername('');
      setPassword('');
      setViewOrders(false);
    } catch (error) {
      alert('Error registering user, please try again.');
    }
  };

  const checkUsernameExists = async (username) => {
    const q = query(collection(db, 'users'), where('UserName', '==', username));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty; // Returns true if a username exists, otherwise false
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.headerTitle}>New User Registration</h2>
      <div style={styles.inputGroup}>
        <label style={styles.label}>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>User Name:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label>
          <input
            type="checkbox"
            checked={viewOrders}
            onChange={(e) => setViewOrders(e.target.checked)}
            style={{ marginRight: '10px' }}
          />
          Allow others to see my orders
        </label>
      </div>
      <button
        onClick={handleRegister}
        style={styles.loginButton}
      >
        Create
      </button>
    </div>
  );
};

export default Register;
