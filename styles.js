const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f0f8ff', // Light blue background
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#1e90ff', // Dodger blue header
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
  appTitle: {
    margin: 0,
    fontSize: '2.5rem',
  },
  main: {
    flex: 1, // Takes up the remaining vertical space
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
  },
  footer: {
    backgroundColor: '#4682b4', // Steel blue footer
    color: '#fff',
    textAlign: 'center',
    padding: '10px',
  },
  footerText: {
    margin: 0,
    fontSize: '0.9rem',
  },
  card: {
    width: '400px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff', // White card background
    textAlign: 'center',
  },
  headerTitle: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#1e90ff', // Blue color for the card header
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#4682b4', // Steel blue for labels
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #87cefa', // Light blue border
    marginBottom: '10px',
  },
  loginButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '25px',
    border: 'none',
    background: 'linear-gradient(90deg, #1e90ff, #4682b4)', // Blue gradient
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  loginButtonHover: {
    background: 'linear-gradient(90deg, #4682b4, #1e90ff)', // Hover effect
  },
  newUserSection: {
    marginTop: '20px',
    fontSize: '14px',
  },
  newUserText: {
    color: '#555',
  },
  registerLink: {
    color: '#1e90ff', // Blue color for the register link
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.5rem',
    color: '#d9534f', // Red color for the error text
  },
  loginButton: {
    width: '100%',
    padding: '12px',
    borderRadius: '25px',
    border: 'none',
    background: 'linear-gradient(90deg, #007bff, #0056b3)', // Blue gradient
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow
    transition: 'transform 0.2s ease, background 0.3s ease',
  },
  inputGroup: {
    marginBottom: '15px',
    width: '100%', // Ensure the input group takes up full width of the parent
    maxWidth: '360px', // Constrain the group to a max width
    margin: '0 auto', // Center-align the input group
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #87cefa', // Light blue border
    marginBottom: '10px',
    boxSizing: 'border-box', // Prevent overflow or merging
  },
  loginButtonHover: {
    background: 'linear-gradient(90deg, #0056b3, #007bff)', // Reverse gradient on hover
    transform: 'scale(1.05)', // Slight zoom effect
  },
  UserContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    width: '60%'
  },
  UserHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#1e90ff',
    color: '#fff',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  centerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Optional background color
  },
  card: {
    width: '400px',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  UserModeLabel: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginRight: '15px', // Add margin-right to create spacing
  },
  greeting: {
    fontSize: '16px',
  },
  UserNav: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#4682b4',
    padding: '10px 0',
  },
  navLink: {
    margin: '0 15px',
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  UserContent: {
    padding: '20px',
  },
  categoryName: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  categoryCard: {
    display: 'flex',
    alignItems: 'center', // Ensures vertical alignment
    justifyContent: 'space-between', // Spreads items across the card
    padding: '10px 15px',
    margin: '10px 0',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    gap: '10px', // Adds consistent spacing between elements
  },
  updateButton: {
    marginRight: '10px', // Adds space before the Remove button
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  addCategory: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  categoryInput: {
    flex: 1,
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addCategory: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '15px',
  },
  categoryInput: {
    flex: 1,
    padding: '10px',
    marginRight: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  categoryCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 15px',
    margin: '10px 0',
    backgroundColor: '#fff',
    borderRadius: '5px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  categoryName: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
  updateButton: {
    marginRight: '10px',
    padding: '5px 10px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  removeButton: {
    padding: '5px 10px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 0px)', // Adjust to compensate for browser UI
    backgroundColor: '#f0f8ff', // Light blue background
    fontFamily: 'Arial, sans-serif', // Consistent font family
    margin: 0, // Removes unwanted spacing
    padding: 0, // Removes padding to avoid layout issues
    boxSizing: 'border-box', // Ensures consistent sizing
  },
  
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    backgroundColor: '#ffffff', // Table background color
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
    backgroundColor: '#f2f2f2', // Header background
    textAlign: 'center', // Center text in headers
    fontWeight: 'bold',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center', // Center text in data cells
  },
  evenRow: {
    backgroundColor: '#f9f9f9',
  },
  oddRow: {
    backgroundColor: '#ffffff',
  },
  link: {
    color: '#1e90ff', // Consistent blue for links
    textDecoration: 'none',
  },
  productCardContainer: {
    marginBottom: '20px', // Add spacing between each card
  },
  noDataMessage: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    margin: '10px 0',
  },
  customerContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    fontFamily: 'Arial, sans-serif',
  },

  customerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },

  customerNav: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  navLink: {
    margin: '0 15px',
    color: '#FFF',
    textDecoration: 'none',
    fontWeight: 'normal',
    fontSize: '16px',
  },

  logoutButton: {
    background: 'none',
    border: 'none',
    color: 'blue',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontSize: '16px',
  },

  customerContent: {
    padding: '20px',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  defaultMessage: {
    fontSize: '18px',
    color: '#333',
  },
  productCard: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  productImage: {
    width: '100%',
    height: 'auto',
    marginBottom: '8px',
  },
  quantityControls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '8px',
  },
  quantityButton: {
    padding: '8px 16px',
    margin: '0 8px',
    backgroundColor: '#1e90ff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cartSection: {
    border: '1px solid #ddd',
    padding: '16px',
    margin: '8px',
    borderRadius: '8px',
  },
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },
  removeButton: {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  pageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '20px',
    gap: '20px',
  },
  cartSection: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '300px',
  },
  cartItem: {
    borderBottom: '1px solid #ccc',
    padding: '10px 0',
  },
  removeButton: {
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  productList: {
    flex: 3,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  productImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  quantityControls: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  quantityButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '5px 10px',
    cursor: 'pointer',
  },
  cartContainer: {
    position: 'relative',
    width: '300px',
  },
  cartToggle: {
    position: 'absolute',
    top: '10px',
    right: '-20px',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '50%',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
  },
  cartSection: {
    backgroundColor: '#f8f9fa',
    border: '1px solid #ddd',
    borderRadius: '5px',
    padding: '20px',
  },
  productCentered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    padding: '20px',
    transition: 'all 0.3s ease-in-out',
  },

  productList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Dynamic grid layout
    gap: '20px',
    padding: '20px',
  },
  productCard: {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    transition: 'transform 0.3s ease', // Add hover effect
  },
  productCardHover: {
    transform: 'scale(1.05)', // Slight zoom on hover
  },
  productImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
    marginBottom: '10px',
  },
  productTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#333',
  },
  productPrice: {
    fontSize: '16px',
    color: '#1e90ff',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  productDescription: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '15px',
  },
  addToCartButton: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.3s ease',
  },
  addToCartButtonHover: {
    backgroundColor: '#45a049',
  },
  responsiveContainer: {
    display: 'flex',
    flexWrap: 'wrap', // Allows wrapping to the next row
    justifyContent: 'center', // Center-align cards
    gap: '20px', // Space between cards
    padding: '20px', // Padding around the container
  },
  responsiveCard: {
    flex: '1 1 calc(33.33% - 20px)', // Adjusts card width to 3 per row on large screens
    maxWidth: '400px', // Limit the card width
    minWidth: '280px', // Minimum width for cards
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    transition: 'transform 0.3s ease',
  },
  responsiveCardHover: {
    transform: 'scale(1.05)', // Slight zoom on hover
  },
};

export default styles;
