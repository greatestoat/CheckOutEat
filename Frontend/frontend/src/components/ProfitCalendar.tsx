
// pages/ProfitCalendar.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, parseISO } from 'date-fns';

interface Order {
  created_at: string;
  total_price: number;
}

const ProfitCalendar = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [profitByDay, setProfitByDay] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/orders');
      setOrders(response.data.orders);
      calculateProfitByDay(response.data.orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const calculateProfitByDay = (orderData: Order[]) => {
    const profitMap: { [key: string]: number } = {};
    
    orderData.forEach(order => {
      // Format the ISO date string to just get the date part
      const dateKey = format(parseISO(order.created_at), 'yyyy-MM-dd');
      profitMap[dateKey] = (profitMap[dateKey] || 0) + order.total_price;
    });

    setProfitByDay(profitMap);
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(selectedMonth);
    const end = endOfMonth(selectedMonth);
    return eachDayOfInterval({ start, end });
  };

  const getProfitColor = (profit: number) => {
    if (profit === 0) return 'bg-gray-100';
    if (profit < 50) return 'bg-green-100';
    if (profit < 100) return 'bg-green-300';
    return 'bg-green-500';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Daily Profit Calendar</h1>
        <input
          type="month"
          value={format(selectedMonth, 'yyyy-MM')}
          onChange={(e) => setSelectedMonth(new Date(e.target.value))}
          className="border p-2 rounded"
        />
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold p-2">
            {day}
          </div>
        ))}

        {getDaysInMonth().map(day => {
          const dateKey = format(day, 'yyyy-MM-dd');
          const profit = profitByDay[dateKey] || 0;
          
          return (
            <div
              key={dateKey}
              className={`p-4 rounded-lg ${getProfitColor(profit)} h-24 relative`}
            >
              <div className="absolute top-2 left-2">
                {format(day, 'd')}
              </div>
              {profit > 0 && (
                <div className="absolute bottom-2 right-2 font-semibold">
                  ₹{profit.toFixed(2)}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex gap-4">
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <span>No sales</span>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 rounded"></div>
            <span>{'< ₹50'}</span>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-300 rounded"></div>
            <span>₹50 - ₹100</span>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>{'> ₹100'}</span>
          </div>
        </div>
      </div>

      {/* Summary section */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-3">Monthly Summary</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold">{orders.length}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Profit</p>
            <p className="text-2xl font-bold">
              ₹{orders.reduce((sum, order) => sum + order.total_price, 0).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitCalendar;
