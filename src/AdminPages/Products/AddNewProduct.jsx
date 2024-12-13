import { useState, useEffect } from 'react';
import styles from '../../../styles';
import { collection, addDoc, onSnapshot, doc } from 'firebase/firestore';
import db from '../../../DB/firebase';

const AddNewProduct = ({ categories, onProductAdded, onCancel }) => {
  const [newProduct, setNewProduct] = useState({
    Title: '',
    Price: '',
    Category: '',
    PicLink: '',
    Description: '',
  });

  const handleAddProduct = async () => {
    const { Title, Price, Category, PicLink, Description } = newProduct;

    if (!Title || !Price || !Category || !PicLink) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      await addDoc(collection(db, 'products'), {
        ...newProduct,
        Category: doc(db, 'categories', Category), // Reference to category document
      });

      setNewProduct({ Title: '', Price: '', Category: '', PicLink: '', Description: '' });
      alert('Product added successfully!');
      onProductAdded(); // Notify parent to refresh the list
    } catch (error) {
      alert('Failed to add product.');
    }
  };

  return (
    <div style={{ ...styles.card, marginBottom: '20px' }}>
      <h3 style={styles.headerTitle}>Add New Product</h3>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Title:</label>
        <input
          type="text"
          value={newProduct.Title}
          onChange={(e) => setNewProduct({ ...newProduct, Title: e.target.value })}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Price:</label>
        <input
          type="number"
          value={newProduct.Price}
          onChange={(e) => setNewProduct({ ...newProduct, Price: e.target.value })}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Category:</label>
        <select
          value={newProduct.Category}
          onChange={(e) => setNewProduct({ ...newProduct, Category: e.target.value })}
          style={styles.input}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.Name}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Picture Link:</label>
        <input
          type="text"
          value={newProduct.PicLink}
          onChange={(e) => setNewProduct({ ...newProduct, PicLink: e.target.value })}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Description:</label>
        <textarea
          value={newProduct.Description}
          onChange={(e) => setNewProduct({ ...newProduct, Description: e.target.value })}
          style={styles.input}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleAddProduct} style={styles.addButton}>
          Create
        </button>
        <button onClick={onCancel} style={{ ...styles.removeButton, backgroundColor: '#6c757d' }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNewProduct;
