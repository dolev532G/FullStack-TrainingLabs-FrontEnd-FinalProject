import { useState, useEffect } from 'react';
import styles from '../../../styles';
import { collection, onSnapshot } from 'firebase/firestore';
import db from '../../../DB/firebase';
import Product from './Product';
import AddNewProduct from './AddNewProduct';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch products from Firestore
  useEffect(() => {
    const q = collection(db, 'products');
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
    });

    return () => unsubscribe();
  }, []);

  // Fetch categories from Firestore
  useEffect(() => {
    const q = collection(db, 'Categories');
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const categoriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div style={styles.UserContent}>
      <h2 style={styles.headerTitle}>Products</h2>

      {!showAddForm && (
        <button
          onClick={() => setShowAddForm(true)}
          style={{ ...styles.addButton, marginBottom: '20px', width: '200px' }}
        >
          Add New
        </button>
      )}

      {showAddForm && (
        <AddNewProduct
          categories={categories}
          onProductAdded={() => setShowAddForm(false)} // Close form and refresh products
          onCancel={() => setShowAddForm(false)} // Close form without action
        />
      )}

      <div style={styles.productList}>
        {products.map((product) => (
          <div key={product.id} style={{ ...styles.productCardContainer, marginBottom: '20px' }}>
            <Product product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
