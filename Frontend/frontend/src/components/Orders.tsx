
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';

interface Order {
  id: number;
  items: string;
  total_price: number;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);  
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders');
        console.log("Orders fetched:", response.data);
    
        if (response.data && Array.isArray(response.data.orders)) {
          setOrders(response.data.orders);
        } else {
          console.error("Unexpected response structure:", response.data);
          setOrders([]);
        }
      } catch (err) {
        setError('Failed to fetch orders.');
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handleDownload = () => {
    const csvData = orders.map(order => `${order.id},${order.items},${order.total_price}`).join("\n");
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'orders.csv');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      
      {error && <p className="text-red-500">{error}</p>}
      
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white p-2 mb-4 rounded hover:bg-blue-600"
      >
        Download Orders
      </button>

      <div>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border p-2">Order ID</th>
                <th className="border p-2">Items</th>
                <th className="border p-2">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border p-2">{order.id}</td>
                  <td className="border p-2">{order.items}</td>
                  <td className="border p-2">${order.total_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Orders;

