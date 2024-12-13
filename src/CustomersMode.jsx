import { useEffect } from 'react';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles';
import MyOrders from './CustomersPages/MyOrders';
import Shopping from './CustomersPages/Shopping/Shopping';
import MyAccount from './CustomersPages/MyAccount';


const CustomersMode = () => {
  const user = useSelector((state) => state.LogedUser); // Get logged-in user details from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    if (!user?.id) {
      alert('Access denied. Login is required.');
      navigate('/'); // Redirect to the homepage or login page
    }
  }, [user, navigate]);


  // Handle Logout
  const handleLogout = () => {
    dispatch({ type: 'SET_LOGGED_USER', payload: null }); // Clear the logged user
    navigate('/'); // Redirect to the login page
  };

  return (
    <div style={styles.UserContainer}>
      {/* Top Navigation Bar */}
      <header style={styles.UserHeader}>
        <div style={styles.UserModeLabel}>Shopping Mode {' '}</div>
        <div style={styles.greeting}>

          Hello, {user?.UserName || ''}
          <button
            onClick={handleLogout}
            style={{
              marginLeft: '15px',
              padding: '5px 10px',
              backgroundColor: '#d9534f',
              color: '#fff',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Navigation Links */}
      <nav style={styles.UserNav}>
        <Link to="/CustomersMode/Shopping" style={styles.navLink}>
          Shopping
        </Link>
        <Link to="/CustomersMode/MyOrders" style={styles.navLink}>
          MyOrders
        </Link>
        <Link to="/CustomersMode/MyAccount" style={styles.navLink}>
          MyAccount
        </Link>
      </nav>

      {/* Admin Content Section */}
      <main style={styles.UserContent}>
        <Routes>
          <Route path="/Shopping" element={<Shopping />} />
          <Route path="/MyOrders" element={<MyOrders />} />
          <Route path="/MyAccount" element={<MyAccount />} />
          <Route
            path="/"
            element={<h3 style={styles.defaultMessage}>Select an option above</h3>}
          />
        </Routes>
      </main>
    </div>
  );
};

export default CustomersMode;
