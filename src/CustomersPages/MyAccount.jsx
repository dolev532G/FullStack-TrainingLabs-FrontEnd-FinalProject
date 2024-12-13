import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import styles from '../../styles';
import db from '../../DB/firebase';

const MyAccount = () => {
    const user = useSelector((state) => state.LogedUser); // Get logged-in user details
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [viewOrders, setViewOrders] = useState(false);

    useEffect(() => {
        // Pre-fill fields with current user data
        if (user) {
            setFirstName(user.FirstName || '');
            setLastName(user.LastName || '');
            setUsername(user.UserName || '');
            setPassword(user.Password || '');
            setViewOrders(user.ViewOrders || false);
        }
    }, [user]);

    const handleUpdate = async () => {
        if (!firstName || !lastName || !username || !password) {
            alert('Please fill in all fields!');
            return;
        }

        const updatedUser = {
            FirstName: firstName,
            LastName: lastName,
            UserName: username,
            Password: password,
            ViewOrders: viewOrders,
        };

        try {
            const userRef = doc(db, 'users', user.id); // Reference to the user's document
            await updateDoc(userRef, updatedUser);

            // Update the logged-in user details in Redux
            const updatedUserDoc = await getDoc(userRef);
            dispatch({ type: 'LoginUser', payload: { id: user.id, ...updatedUserDoc.data() } });

            alert('Details updated successfully!');
        } catch (error) {
            console.error('Error updating user details:', error);
            alert('Failed to update details. Please try again.');
        }
    };

    return (
        <div style={styles.centerContainer}>
            <div style={styles.card}>
                <h2 style={styles.headerTitle}>Update Your Account</h2>
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
                        style={styles.input}
                        disabled // Username cannot be updated
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
                <div style={{ marginTop: '20px' }}>
                    <button
                        onClick={handleUpdate}
                        style={styles.loginButton}
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyAccount;
