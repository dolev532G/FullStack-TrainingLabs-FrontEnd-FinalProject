import { useEffect } from 'react';
import { useNavigate, Link, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles';
import Categories from './AdminPages/Categorys/Categories'; // Import your components
import Products from './AdminPages/Products/Products';
import Customers from './AdminPages/Customers';
import Statistics from './AdminPages/Statistics';

const AdminMode = () => {
  const user = useSelector((state) => state.LogedUser); // Get logged-in user details from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redirect non-User users
  useEffect(() => {
    if (!user?.Admin) {
      alert('Access denied. Admin privileges are required.');
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
        <div style={styles.UserModeLabel}>Admin Mode</div>
        <div style={styles.greeting}>
          Hello, {user?.UserName || 'Admin'}
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
        <Link to="/AdminMode/categories" style={styles.navLink}>
          Categories
        </Link>
        <Link to="/AdminMode/products" style={styles.navLink}>
          Products
        </Link>
        <Link to="/AdminMode/customers" style={styles.navLink}>
          Customers
        </Link>
        <Link to="/AdminMode/statistics" style={styles.navLink}>
          Statistics
        </Link>
      </nav>

      {/* Admin Content Section */}
      <main style={styles.UserContent}>
        <Routes>
          <Route path="/categories" element={<Categories />} />
          <Route path="/products" element={<Products />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route
            path="/"
            element={<h3 style={styles.defaultMessage}>Select an option above</h3>}
          />
        </Routes>
      </main>
    </div>
  );
};

export default AdminMode;
