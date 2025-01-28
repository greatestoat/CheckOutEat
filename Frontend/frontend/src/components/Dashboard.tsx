
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

const Dashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [sales, setSales] = useState<number | null>(null);
    const [time, setTime] = useState<string>(''); // For time display
    const [location, setLocation] = useState<string>(''); // For location display

    const fetchSalesData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/sales-report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: new Date().toISOString().split('T')[0], // Get today's date
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch sales data');
            }

            const data = await response.json();
            setSales(data.itemsSold);
        } catch (error) {
            console.error('Error:', error);
            setSales(0); // Fallback to 0 if error occurs
        } finally {
            setLoading(false);
        }
    };

    // Function to format the current time in hh:mm format
    const updateTime = () => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0'); // Add leading zero for single digits
        const minutes = String(now.getMinutes()).padStart(2, '0'); // Add leading zero for single digits
        setTime(`${hours}:${minutes}`);
    };

    // Function to get the current location
    const updateLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
                        .then((response) => response.json())
                        .then((data) => {
                            setLocation(data.city || data.countryName || 'Location Unavailable');
                        })
                        .catch((error) => {
                            console.error('Error fetching location:', error);
                            setLocation('Location Unavailable');
                        });
                },
                (error) => {
                    console.error('Error getting location:', error);
                    setLocation('Location Unavailable');
                }
            );
        } else {
            setLocation('Location Unavailable');
        }
    };

    useEffect(() => {
        fetchSalesData();
        updateTime(); // Set initial time
        updateLocation(); // Set initial location
        const interval = setInterval(updateTime, 60000); // Update every minute

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const chartData: ChartData<'line'> = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)', // Lighter grid for better contrast
                },
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)', // Lighter grid for better contrast
                },
            },
        },
        elements: {
            line: {
                tension: 0.1, // Slightly smooth the curve
            },
        },
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-600 flex flex-col items-center justify-start p-6 overflow-hidden">
            <h1 className="text-4xl font-bold text-white mb-6">Dashboard</h1>

            {loading ? (
                <div className="space-y-6">
                    {/* Skeleton loader */}
                    <div className="w-64 h-32 bg-gray-300 animate-pulse rounded-lg"></div>
                    <div className="w-64 h-32 bg-gray-300 animate-pulse rounded-lg"></div>
                    <div className="w-64 h-32 bg-gray-300 animate-pulse rounded-lg"></div>
                </div>
            ) : (
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Sales box with dynamic sales data */}
                    <Link to="/sales-report" className="w-full col-span-1">
                        <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out" style={{ height: '250px' }}>
                            <h2 className="text-xl text-white font-semibold">Today's Sales</h2>
                            <div className="text-5xl font-bold text-white mt-2">
                                {sales !== null ? sales : 'Loading...'}
                            </div>
                        </div>
                    </Link>

                    {/* Graph Display */}
                    <Link to="/another-sales-report" className="w-full col-span-1 md:col-span-1">
                        <div className="bg-gradient-to-r from-blue-700 to-teal-500 p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out">
                            <h2 className="text-xl text-white font-semibold">Sales Overview</h2>
                            <p className="text-white mt-2">View detailed sales insights</p>

                            <div className="mt-4">
                                <Line data={chartData} options={options} />
                            </div>
                        </div>
                    </Link>

                    {/* Time box */}
                    <div className="w-full col-span-1">
                        <div className="bg-gradient-to-r from-green-600 to-green-400 p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out" style={{ height: '250px' }}>
                            <h2 className="text-xl text-white font-semibold">Current Time</h2>
                            <div className="text-5xl font-bold text-white mt-2">
                                {time}
                            </div>
                            <div className="text-white mt-2">
                                {new Date().toDateString()}
                            </div>
                            <div className="text-white mt-2">
                                {location}
                            </div>
                        </div>
                    </div>
                    <Link to="/profit-calendar" className="w-full col-span-1">
  <div className="bg-gradient-to-r from-purple-600 to-indigo-500 p-10 rounded-xl shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out">
    <h2 className="text-4xl text-white font-extrabold tracking-wide mb-4">Profits</h2>
    <p className="text-white text-lg font-medium">
     View your monthly profits and sales data.
    </p>
  </div>
</Link>
<Link to="/" className="w-full col-span-1">
  <div className="bg-gradient-to-r from-purple-600 to-indigo-500 p-10 rounded-xl shadow-2xl hover:scale-105 transform transition duration-300 ease-in-out">
    <h2 className="text-4xl text-white font-extrabold tracking-wide mb-4">Items</h2>
    <p className="text-white text-lg font-medium">
     Tiffins and snacks.
    </p>
  </div>
</Link>
<Link to="/calculator" className="w-full col-span-1">
                        <div className="bg-gradient-to-r from-indigo-700 to-indigo-500 p-6 rounded-lg shadow-xl hover:scale-105 transform transition duration-300 ease-in-out" style={{ height: '250px' }}>
                        <h2 className="text-4xl text-white font-extrabold tracking-wide mb-4">Cals</h2>
                        <p></p>
                        <p className="text-white text-lg font-medium">
                        calculate the perfect and accurate
    </p>
                            
                            <div className="text-5xl font-bold text-white mt-2">
                            </div>
                        </div>
                    </Link>


                </div>
            )}
        </div>
    );
};

export default Dashboard;
