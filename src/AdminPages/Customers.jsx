import { useEffect, useState } from 'react';
import styles from '../../styles';
import { collection, getDoc, query, where, getDocs, doc } from 'firebase/firestore';
import db from '../../DB/firebase';
import UniversalTable from '../UniversalTable';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  // Fetch customers and their purchases
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersQuery = query(collection(db, 'users'));
        const customersSnapshot = await getDocs(customersQuery);

        const customersData = await Promise.all(
          customersSnapshot.docs.map(async (customerDoc) => {
            const customer = customerDoc.data();

            // Fetch purchases for each customer
            const purchasesQuery = query(
              collection(db, 'purchases'),
              where('User', '==', doc(db, 'users', customerDoc.id))
            );
            const purchasesSnapshot = await getDocs(purchasesQuery);

            const purchasesData = purchasesSnapshot.empty
              ? [] // If no purchases, return an empty array
              : await Promise.all(
                  purchasesSnapshot.docs.map(async (purchaseDoc) => {
                    const purchase = purchaseDoc.data();

                    // Resolve product reference
                    const productRef = purchase.Product;
                    const productDoc = await getDoc(productRef);
                    const productName = productDoc.exists() ? productDoc.data().Title : 'Unknown Product';

                    return {
                      product: productName, // Now just a text field
                      qty: purchase.Quantity || 0,
                      date: purchase.Date ? purchase.Date.toDate().toLocaleDateString() : 'Unknown Date',
                    };
                  })
                );

            return {
              fullName: `${customer.FirstName || ''} ${customer.LastName || ''}`.trim(),
              joinedAt: customer.JoinedAt?.toDate().toLocaleDateString() || 'Unknown Date',
              purchases: purchasesData,
            };
          })
        );

        setCustomers(customersData);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Define headers for the main table and nested purchases table
  const mainTableHeaders = [
    { title: 'Full Name', key: 'fullName', type: 'text' },
    { title: 'Joined At', key: 'joinedAt', type: 'text' },
    {
      title: 'Products Bought',
      key: 'purchases',
      type: 'nestedTable',
    },
  ];

  const purchasesTableHeaders = [
    { title: 'Product', key: 'product', type: 'text' }, // Changed from 'link' to 'text'
    { title: 'Qty', key: 'qty', type: 'text' },
    { title: 'Date', key: 'date', type: 'text' },
  ];

  return (
    <div style={styles.adminContent}>
      <h2 style={styles.headerTitle}>Customers</h2>
      <UniversalTable
        headers={mainTableHeaders}
        data={customers.map((customer) => ({
          ...customer,
          purchases: {
            headers: purchasesTableHeaders,
            data: customer.purchases || [], // Ensure data is an empty array if no purchases
          },
        }))}
      />
    </div>
  );
};

export default Customers;
