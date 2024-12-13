import styles from '../../../styles';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import db from '../../../DB/firebase';
import { useState } from 'react';

const Category = ({ category }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState(category.Name);

  // Update category Name
  const handleUpdate = async () => {
    if (!updatedName.trim()) {
      alert('Category Name cannot be empty');
      return;
    }
    try {
      const categoryRef = doc(db, 'Categories', category.id);
      await updateDoc(categoryRef, { Name: updatedName });
      setEditMode(false); // Exit edit mode
    } catch (error) {
      alert('Failed to update category');
    }
  };

  // Remove category
  const handleRemove = async () => {
    try {
      const categoryRef = doc(db, 'Categories', category.id);
      await deleteDoc(categoryRef);
    } catch (error) {
      alert('Failed to delete category');
    }
  };

  return (
    <div style={styles.categoryCard}>
      {editMode ? (
        <input
          type="text"
          value={updatedName}
          onChange={(e) => setUpdatedName(e.target.value)}
          style={styles.categoryInput}
        />
      ) : (
        <div style={styles.categoryName}>{category.Name}</div>
      )}
      {editMode ? (
        <button onClick={handleUpdate} style={styles.updateButton}>
          Save
        </button>
      ) : (
        <button onClick={() => setEditMode(true)} style={styles.updateButton}>
          Update
        </button>
      )}
      <button onClick={handleRemove} style={styles.removeButton}>
        Remove
      </button>
    </div>
  );
};

export default Category;
