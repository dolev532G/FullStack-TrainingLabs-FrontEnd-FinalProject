import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import db from '../../DB/firebase';
import UniversalTable from '../UniversalTable';
import styles from '../../styles';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = useSelector((state) => state.LogedUser); // Get logged-in user details from Redux

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersQuery = query(
          collection(db, 'purchases'),
          where('User', '==', doc(db, 'users', user.id)) // Match purchases for the current user
        );
        const ordersSnapshot = await getDocs(ordersQuery);

        const ordersData = await Promise.all(
          ordersSnapshot.docs.map(async (orderDoc) => {
            const order = orderDoc.data();

            // Fetch the product details
            const productDoc = await getDoc(order.Product);
            const productTitle = productDoc.exists() ? productDoc.data().Title : 'Unknown Product';

            return {
              title: productTitle,
              qty: order.Quantity || 0,
              total: `$${(order.Quantity * productDoc.data().Price).toFixed(2) || 0}`, // Calculate total
              date: order.Date.toDate().toLocaleDateString(),
            };
          })
        );

        console.log(ordersData)

        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [user.id]);

  // Define table headers
  const headers = [
    { title: 'Title', key: 'title', type: 'text' },
    { title: 'Qty', key: 'qty', type: 'text' },
    { title: 'Total', key: 'total', type: 'text' },
    { title: 'Date', key: 'date', type: 'text' },
  ];

  return (
    <div style={styles.adminContent}>
      <h2 style={styles.headerTitle}>Orders</h2>
      <UniversalTable headers={headers} data={orders} />
    </div>
  );
};

export default MyOrders;
