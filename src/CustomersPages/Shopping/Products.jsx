import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../../../styles';
import Product from './Product';

const Products = () => {
  const products = useSelector((state) => state.products); // Fetch products from Redux state

  return (
    <div style={styles.productList}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
