import { Routes, Route } from 'react-router-dom';
import Login from './src/Login';
import Register from './src/Register';
import AdminMode from './src/AdminMode';
import CustomersMode from './src/CustomersMode';
import styles from './styles'; // Assuming styles are imported correctly

const App = () => {
  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.appTitle}>PixelCart</h1>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/CustomersMode" element={<CustomersMode />} />
          <Route path="/AdminMode/*" element={<AdminMode />} />
          <Route path="/CustomersMode/*" element={<CustomersMode />} />
          <Route path="*" element={<div style={styles.error}>Page Not Found</div>} />
        </Routes>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p style={styles.footerText}>© 2024 Dolev's PixelCart. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
