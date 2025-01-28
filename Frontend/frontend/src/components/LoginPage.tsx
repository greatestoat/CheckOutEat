
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";  // Import Notification

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ name: "", password: "" });
  const [notification, setNotification] = useState({ message: "", show: false });
  const navigate = useNavigate();

  const handleLogin = () => {
    if (credentials.name === "admin" && credentials.password === "Rahul@123456") {
      // Show notification
      setNotification({ message: "Admin has been logged in", show: true });

      // Navigate to admin panel after delay (to display the notification)
      setTimeout(() => {
        navigate("/admin-panel");
      }, 2000);  // Adjust the time as needed
    } else {
      alert("Invalid credentials!");
    }
  };

  const closeNotification = () => {
    setNotification({ message: "", show: false });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <input
        type="text"
        placeholder="Username"
        className="mb-2 p-2 border rounded"
        onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="mb-4 p-2 border rounded"
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogin}>
        Login
      </button>

      {/* Display Notification */}
      {notification.show && <Notification message={notification.message} onClose={closeNotification} />}
    </div>
  );
};

export default LoginPage;

