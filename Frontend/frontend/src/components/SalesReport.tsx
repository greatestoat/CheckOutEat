import React, { useState } from 'react';
import axios from 'axios';

const SalesReport = () => {
  const [date, setDate] = useState('');
  const [itemsSold, setItemsSold] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) {
      setError('Please enter a valid date.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/sales-report', { date });
      setItemsSold(response.data.itemsSold);
      setError('');
    } catch (err) {
      setError('Failed to fetch sales data.');
      setItemsSold(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">Sales Report</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="date" className="block text-gray-700 font-semibold">Enter Date (YYYY-MM-DD):</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Get Sales Report
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {itemsSold !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-medium text-gray-700">Sales for {date}:</h3>
            <p className="text-lg font-bold text-indigo-600">{itemsSold} Items Sold</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
