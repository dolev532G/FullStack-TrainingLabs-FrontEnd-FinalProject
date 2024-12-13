import { useEffect, useState } from 'react';
import styles from '../../../styles';
import { collection, getDoc, query, where, getDocs, updateDoc, doc, onSnapshot } from 'firebase/firestore';
import db from '../../../DB/firebase';
import UniversalTable from '../../UniversalTable';

const Product = ({ product }) => {
  const [title, setTitle] = useState(product.Title);
  const [price, setPrice] = useState(product.Price);
  const [picLink, setPicLink] = useState(product.PicLink);
  const [description, setDescription] = useState(product.Description);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [purchases, setPurchases] = useState([]);

  // Fetch all categories and resolve current category
  useEffect(() => {
    const fetchCategories = async () => {
      const q = collection(db, 'Categories');
      const unsubscribe = onSnapshot(q, async (querySnapshot) => {
        const categoriesData = querySnapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));
        setCategories(categoriesData);

        // Resolve current category reference
        if (product.Category) {
          const categoryRef = product.Category;
          const categoryDoc = await getDoc(categoryRef);
          if (categoryDoc.exists()) {
            setCategory(categoryDoc.id);
          }
        }
      });

      return () => unsubscribe();
    };

    fetchCategories();
  }, [product.Category]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const productRef = doc(db, 'products', product.id);
        const q = query(collection(db, 'purchases'), where('Product', '==', productRef));
        const querySnapshot = await getDocs(q);

        const purchaseData = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const purchase = docSnapshot.data();
            let userFullName = 'Unknown User';

            if (purchase.User) {
              const userRef = purchase.User;
              const userDoc = await getDoc(userRef);
              if (userDoc.exists()) {
                const userData = userDoc.data();
                userFullName = `${userData.FirstName || ''} ${userData.LastName || ''}`.trim();
              }
            }

            return {
              name: userFullName,
              qty: purchase.Quantity || 0,
              date: purchase.Date ? purchase.Date.toDate().toLocaleDateString() : 'Unknown',
            };
          })
        );

        setPurchases(purchaseData);
      } catch (error) {
        console.error('Error fetching purchases:', error);
      }
    };

    fetchPurchases();
  }, [product.id]);

  const handleSave = async () => {
    const productDoc = doc(db, 'products', product.id);

    try {
      await updateDoc(productDoc, {
        Title: title,
        Price: price,
        PicLink: picLink,
        Description: description,
        Category: doc(db, 'Categories', category),
      });
      alert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update the product.');
    }
  };

  const headers = [
    { title: 'Name', key: 'name', type: 'text' },
    { title: 'Quantity', key: 'qty', type: 'text' },
    { title: 'Date', key: 'date', type: 'text' },
  ];

  return (
    <div style={styles.card}>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.Name}
            </option>
          ))}
        </select>
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Picture Link:</label>
        <input
          type="text"
          value={picLink}
          onChange={(e) => setPicLink(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputGroup}>
        <img
          src={picLink}
          alt="Product Preview"
          style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
        />
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleSave} style={styles.addButton}>
        Save
      </button>
      <h4 style={styles.headerTitle}>Bought By:</h4>
      <UniversalTable headers={headers} data={purchases} />
    </div>
  );
};

export default Product;
