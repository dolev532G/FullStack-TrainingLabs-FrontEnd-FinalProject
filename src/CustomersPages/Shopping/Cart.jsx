import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem';
import styles from '../../../styles';
import { collection, addDoc , doc } from 'firebase/firestore';
import db from '../../../DB/firebase';

const Cart = () => {
  const cart = useSelector((state) => state.cart); // Get the cart from Redux
  const products = useSelector((state) => state.products); // Get products for reference
  const user = useSelector((state) => state.LogedUser); // Logged-in user
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const quantityToRestore = cart[productId]?.quantity || 0;
      dispatch({ type: 'RemoveFromCart', payload: { productId } });
      dispatch({ type: 'UpdateProductStock', payload: { productId, stock: product.stock + quantityToRestore } });
    }
  };

  const handleUpdateQuantity = (productId, quantityChange) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const currentQuantity = cart[productId]?.quantity || 0;
      const newQuantity = currentQuantity + quantityChange;

      if (newQuantity > 0 && newQuantity <= product.stock + currentQuantity) {
        dispatch({ type: 'AddToCart', payload: { productId, quantity: newQuantity } });
        dispatch({ type: 'UpdateProductStock', payload: { productId, stock: product.stock - quantityChange } });
      } else if (newQuantity === 0) {
        handleRemoveFromCart(productId);
      }
    }
  };

  const handleOrder = async () => {
    try {
      // Loop through the cart and create a purchase entry for each product
      for (const [productId, cartItem] of Object.entries(cart)) {
        await addDoc(collection(db, 'purchases'), {
          Product:  doc(db, 'products', productId),
          Quantity: cartItem.quantity,
          User:  doc(db, 'users', user.id),
          Date: new Date(),
        });
      }
      // Clear the cart after the order
      dispatch({ type: 'SetCart', payload: {} });
      alert('Order placed successfully!');
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const total = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div style={styles.cartSection}>
      <h3>Cart</h3>
      {Object.keys(cart).length > 0 ? (
        Object.entries(cart).map(([productId, cartItem]) => (
          <CartItem
            key={productId}
            item={cartItem}
            onIncrease={() => handleUpdateQuantity(productId, 1)}
            onDecrease={() => handleUpdateQuantity(productId, -1)}
            onRemove={() => handleRemoveFromCart(productId)}
          />
        ))
      ) : (
        <p>Your cart is empty.</p>
      )}
      <h4>Total: ${total.toFixed(2)}</h4>
      {Object.keys(cart).length > 0 && (
        <button
          onClick={handleOrder}
          style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer',
          }}
        >
          Order
        </button>
      )}
    </div>
  );
};

export default Cart;
