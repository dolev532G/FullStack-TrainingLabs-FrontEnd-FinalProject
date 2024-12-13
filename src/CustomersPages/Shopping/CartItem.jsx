import React from 'react';
import styles from '../../../styles';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <div style={styles.cartItem}>
      <div style={styles.cartItemHeader}>
        <p style={styles.cartItemTitle}>Title: {item.title}</p>
        <button onClick={onRemove} style={styles.removeButton}>
          X
        </button>
      </div>
      <p>Qty: {item.quantity}</p>
      <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
      <div style={styles.quantityControls}>
        <button onClick={onDecrease} style={styles.quantityButton}>
          -
        </button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease} style={styles.quantityButton}>
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;
