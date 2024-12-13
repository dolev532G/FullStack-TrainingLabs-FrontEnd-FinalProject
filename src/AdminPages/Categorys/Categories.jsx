import { useState, useEffect } from 'react';
import styles from '../../../styles';
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc, query } from 'firebase/firestore';
import db from '../../../DB/firebase';
import Category from './Category';

const Categories = () => {
  const [categories, setCategories] = useState([]); // State to store all categories
  const [newCategoryName, setNewCategoryName] = useState(''); // State for new category input

  // Fetch categories when the component mounts
  useEffect(() => {
    const q = query(collection(db, 'Categories'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setCategories(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    return () => unsubscribe(); // Cleanup the subscription
  }, []);

  // Add a new category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Category name cannot be empty');
      return;
    }
    try {
      await addDoc(collection(db, 'Categories'), { Name: newCategoryName });
      setNewCategoryName(''); // Clear the input field
    } catch (error) {
      alert('Failed to add category');
    }
  };

  return (
    <div>
      <h2>Categories</h2>
      <div>
        {categories.map((category) => (
          <Category
            key={category.id}
            category={category}
          />
        ))}
      </div>

      {/* Add new category */}
      <div style={styles.addCategory}>
        <input
          type="text"
          placeholder="Add new category"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          style={styles.categoryInput}
        />
        <button onClick={handleAddCategory} style={styles.addButton}>
          Add
        </button>
      </div>
    </div>
  );
};

export default Categories;
