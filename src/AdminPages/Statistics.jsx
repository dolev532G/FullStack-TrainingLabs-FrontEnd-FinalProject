import { useEffect, useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import styles from '../../styles';
import { collection, getDocs, query, where, doc } from 'firebase/firestore';
import db from '../../DB/firebase';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Statistics = () => {
  const [totalSalesData, setTotalSalesData] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [customerSalesData, setCustomerSalesData] = useState([]);

  // Fetch total sales data
  useEffect(() => {
    const fetchTotalSales = async () => {
      try {
        const purchasesSnapshot = await getDocs(collection(db, 'purchases'));
        const productCounts = {};

        purchasesSnapshot.docs.forEach((doc) => {
          const purchase = doc.data();
          const productRef = purchase.Product.id;
          productCounts[productRef] = (productCounts[productRef] || 0) + purchase.Quantity;
        });

        const productsSnapshot = await getDocs(collection(db, 'products'));
        const totalSales = Object.entries(productCounts).map(([productId, count]) => {
          const product = productsSnapshot.docs.find((p) => p.id === productId)?.data();
          return {
            productName: product?.Title || 'Unknown',
            count,
          };
        });

        setTotalSalesData(totalSales);
      } catch (error) {
        console.error('Error fetching total sales data:', error);
      }
    };

    fetchTotalSales();
  }, []);

  // Fetch customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersSnapshot = await getDocs(collection(db, 'users'));
        const customersList = customersSnapshot.docs.map((doc) => ({
          id: doc.id,
          fullName: `${doc.data().FirstName || ''} ${doc.data().LastName || ''}`.trim(),
        }));
        setCustomers(customersList);
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    };

    fetchCustomers();
  }, []);

  // Fetch customer-specific sales data or total sales when no customer is selected
  useEffect(() => {
    const fetchCustomerSales = async () => {
      if (!selectedCustomer) {
        // Show total sales when no customer is selected
        setCustomerSalesData(totalSalesData);
        return;
      }

      try {
        const customerRef = doc(db, 'users', selectedCustomer);
        const purchasesQuery = query(collection(db, 'purchases'), where('User', '==', customerRef));
        const purchasesSnapshot = await getDocs(purchasesQuery);

        const productCounts = {};
        purchasesSnapshot.docs.forEach((purchaseDoc) => {
          const purchase = purchaseDoc.data();
          const productRef = purchase.Product.id;
          productCounts[productRef] = (productCounts[productRef] || 0) + purchase.Quantity;
        });

        const productsSnapshot = await getDocs(collection(db, 'products'));
        const customerSales = Object.entries(productCounts).map(([productId, count]) => {
          const product = productsSnapshot.docs.find((p) => p.id === productId)?.data();
          return {
            productName: product?.Title || 'Unknown',
            count,
          };
        });

        setCustomerSalesData(customerSales);
      } catch (error) {
        console.error('Error fetching customer-specific sales data:', error);
      }
    };

    fetchCustomerSales();
  }, [selectedCustomer, totalSalesData]);

  // Pie chart data
  const pieData = {
    labels: totalSalesData.map((data) => data.productName),
    datasets: [
      {
        data: totalSalesData.map((data) => data.count),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#FF9800'],
      },
    ],
  };

  // Bar chart data
  const barData = {
    labels: customerSalesData.map((data) => data.productName),
    datasets: [
      {
        label: 'Quantity',
        data: customerSalesData.map((data) => data.count),
        backgroundColor: '#36A2EB',
      },
    ],
  };

  return (
    <div style={styles.UserContent}>
      <h2 style={styles.headerTitle}>Statistics</h2>

      {/* Pie Chart */}
      <div style={styles.card}>
      <h3 style={styles.headerTitle}>Total Sold Products</h3>
        <Pie data={pieData} />
      </div>
      <h4></h4>
      {/* Bar Chart */}
      <div style={styles.card}>
      <h3 style={styles.headerTitle}>Products Quantity Per Customer</h3>
        <label style={styles.label}>Sort by Customer:</label>
        <select
          style={styles.input}
          value={selectedCustomer}
          onChange={(e) => setSelectedCustomer(e.target.value)}
        >
          <option value="">All Customers</option>
          {customers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.fullName}
            </option>
          ))}
        </select>
        {customerSalesData.length > 0 ? (
          <Bar data={barData} />
        ) : (
          <p>No data available for the selected customer</p>
        )}
      </div>
    </div>
  );
};

export default Statistics;
