
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import AdminPage from "./components/AdminPage";
import LoginPage from "./components/LoginPage";
import Navbar from './components/Navbar';
import Orders from "./components/Orders";
import Notification from "./components/Notification";
import Dashboard from "./components/Dashboard";
import SalesReport from "./components/SalesReport";
import AnotherSalesReport from "./components/AnotherSalesReport";
import Page1 from "./components/page1";
import Page2 from "./components/page2";
import HelpPage from "./components/HelpPage";
import ProfitCalendar from "./components/ProfitCalendar";
import TickAnimation from "./components/TickAnimation";
import CalculatorPage from "./components/CalculatorPage";

function App() {
  const [sales, setSales] = useState<number | null>(null);
  const [time, setTime] = useState<string>('');

  // Function to save data before page unload
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    localStorage.setItem('sales', JSON.stringify(sales));
    localStorage.setItem('time', time);
    event.returnValue = 'Are you sure you want to leave? Your data may not be saved.';
  };

  useEffect(() => {
    // Set up beforeunload event listener
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Clean up the event listener when the component unmounts
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [sales, time]); // This will trigger whenever sales or time changes

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin" element={<LoginPage />} />
        <Route path="/admin-panel" element={<AdminPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/notification" element={<Notification message="Sample message" onClose={() => {}} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sales-report" element={<SalesReport />} />
        <Route path="/another-sales-report" element={<AnotherSalesReport />} />
        
        <Route path= "page1" element={<Page1 />} />
        <Route path= "page2" element={<Page2 />} />
        <Route path= "help" element= {<HelpPage />} />
        <Route path= "profit-calendar" element= {<ProfitCalendar />} />
        <Route path= "tick-animation" element= {<TickAnimation />} />
        <Route path= "calculator" element= {<CalculatorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
