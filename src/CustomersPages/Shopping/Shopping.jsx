import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../../../styles';
import Product from './Product';
import Cart from './Cart';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';
import db from '../../../DB/firebase';

const Shopping = () => {
    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [isCartOpen, setIsCartOpen] = useState(true); // State to toggle cart visibility

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsSnapshot = await getDocs(collection(db, 'products'));
                const productsData = await Promise.all(
                    productsSnapshot.docs.map(async (productDoc) => {
                        const product = productDoc.data();
                        const productId = productDoc.id;

                        const stockQuery = query(
                            collection(db, 'Stock'),
                            where('Product', '==', doc(db, 'products', productId))
                        );
                        const stockSnapshot = await getDocs(stockQuery);
                        const totalStock = stockSnapshot.docs.reduce(
                            (sum, stockDoc) => sum + (stockDoc.data().Quantity || 0),
                            0
                        );

                        const purchaseQuery = query(
                            collection(db, 'purchases'),
                            where('Product', '==', doc(db, 'products', productId))
                        );
                        const purchaseSnapshot = await getDocs(purchaseQuery);
                        const totalPurchased = purchaseSnapshot.docs.reduce(
                            (sum, purchaseDoc) => sum + (purchaseDoc.data().Quantity || 0),
                            0
                        );

                        const availableStock = totalStock - totalPurchased;

                        return {
                            id: productId,
                            title: product.Title,
                            description: product.Description,
                            price: parseFloat(product.Price),
                            stock: availableStock,
                            bought: totalPurchased,
                            image: product.PicLink,
                        };
                    })
                );
                dispatch({ type: 'SetProducts', payload: productsData });
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [dispatch]);

    return (
        <div
            style={{
                ...styles.pageContainer,
                flexDirection: isCartOpen ? 'row' : 'column',
                alignItems: isCartOpen ? 'flex-start' : 'center',
                justifyContent: isCartOpen ? 'flex-start' : 'center',
                position: 'relative', // Required to position the arrow button properly
            }}
        >
            {isCartOpen && <Cart />}
            <button
                style={{
                    position: 'absolute',
                    top: '0%',
                    transform: 'translateY(-50%)', // Centers the button vertically relative to the container
                    left: isCartOpen ? '20%' : '10px', // Adjusts the left position dynamically based on cart state
                    zIndex: 1000,
                    padding: '10px',
                    borderRadius: '50%',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                }}
                onClick={() => setIsCartOpen((prev) => !prev)}
            >
                {isCartOpen ? '←' : '→'}
            </button>

            <div
                style={{
                    ...styles.productList,
                    width: isCartOpen ? '70%' : '100%', // Adjust width dynamically
                    textAlign: isCartOpen ? 'left' : 'center', // Center products when cart is closed
                }}
            >
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default Shopping;
