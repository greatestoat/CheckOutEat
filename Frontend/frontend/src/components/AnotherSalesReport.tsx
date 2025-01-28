
import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from "react-chartjs-2";
import { Calendar, DollarSign, TrendingUp, Users } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface SalesData {
  date: string;
  totalRevenue: number;
}

const SalesDashboard = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const fetchSalesData = async (start: string, end: string) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/another-sales-report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate: start, endDate: end }),
      });
      const data = await response.json();
      setSalesData(Array.isArray(data) ? data : [data]);
    } catch (error) {
      console.error("Error fetching sales data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalesData(startDate, endDate);
  }, [startDate, endDate]);

  const chartData = {
    labels: salesData.map(item => item.date),
    datasets: [
      {
        label: "Total Revenue",
        data: salesData.map(item => item.totalRevenue),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Revenue Over Time',
        font: {
          size: 16,
          weight: 700,
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(tickValue: string | number) {
            return `$${Number(tickValue).toLocaleString()}`;
          }
        }
      }
    }
  };

  const totalRevenue = salesData.reduce((sum, item) => sum + item.totalRevenue, 0);
  const averageRevenue = totalRevenue / (salesData.length || 1);
  const highestRevenue = Math.max(...salesData.map(item => item.totalRevenue));

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sales Dashboard</h1>
        <p className="text-gray-600">Track your revenue and sales performance</p>
      </div>

      {/* Date Range Selector */}
      <div className="flex flex-wrap gap-4 mb-6 items-center bg-white p-4 rounded-lg shadow">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gray-500" />
          <label className="text-sm font-medium text-gray-700">Date Range:</label>
        </div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        />
        <span className="text-gray-500">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-green-500" />
            <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">${totalRevenue.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <h3 className="text-sm font-medium text-gray-600">Average Daily Revenue</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">${averageRevenue.toLocaleString()}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-purple-500" />
            <h3 className="text-sm font-medium text-gray-600">Highest Daily Revenue</h3>
          </div>
          <p className="text-2xl font-bold text-gray-800">${highestRevenue.toLocaleString()}</p>
        </div>
      </div>

      {/* Chart */}
      {loading ? (
        <div className="flex justify-center items-center h-96 bg-white rounded-lg shadow">
          <div className="text-gray-600">Loading data...</div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="h-96">
            <Line data={chartData} options={options} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesDashboard;