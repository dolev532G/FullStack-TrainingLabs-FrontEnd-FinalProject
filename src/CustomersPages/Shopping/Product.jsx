import React from 'react';
import styles from '../../../styles';
import { useDispatch, useSelector } from 'react-redux';

const Product = ({ product }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const quantityInCart = cart[product.id]?.quantity || 0;

  const handleIncrease = () => {
    if (quantityInCart < product.stock) {
      dispatch({ type: 'AddToCart', payload: { productId: product.id, quantity: quantityInCart + 1 } });
      dispatch({ type: 'UpdateProductStock', payload: { productId: product.id, stock: product.stock - 1 } });
    }
  };

  const handleDecrease = () => {
    if (quantityInCart > 0) {
      dispatch({ type: 'AddToCart', payload: { productId: product.id, quantity: quantityInCart - 1 } });
      dispatch({ type: 'UpdateProductStock', payload: { productId: product.id, stock: product.stock + 1 } });
    }
    if (quantityInCart - 1 === 0) {
      dispatch({ type: 'RemoveFromCart', payload: { productId: product.id } });
    }
  };

  return (
    <div style={styles.productCard}>
      <img src={product.image} alt={product.title} style={styles.productImage} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>In stock: {product.stock}</p>
      <p>Bought: {product.bought}</p>
      <div style={styles.quantityControls}>
        <button onClick={handleDecrease} style={styles.quantityButton}>
          -
        </button>
        <span>{quantityInCart}</span>
        <button onClick={handleIncrease} style={styles.quantityButton}>
          +
        </button>
      </div>
    </div>
  );
};

export default Product;
