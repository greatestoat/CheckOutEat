
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa'; // Notification icon

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center">
      {/* Left side: Logo and Menu */}
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" // React logo (replace with your logo URL)
            alt="Logo"
            className="w-10 h-10"
          />
        </Link>  <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-400">Home</Link>
          </li>
          <li>
            <Link to="/orders" className="text-white hover:text-gray-400">Orders</Link>
          </li>
          <li>
            <Link to="/help" className="text-white hover:text-gray-400">Help</Link>
          </li>
          <li>
            <Link to="/page1" className="text-white hover:text-gray-400">Support</Link>
          </li>
          <li>
            <Link to="/admin" className="text-white hover:text-gray-400">Portal</Link>
          </li>
          <li>
            <Link to="/dashboard" className="text-white hover:text-gray-400">DashBoard</Link>
          </li>
        </ul>
      </div>

      {/* Right side: Notification and Profile
      <div className="flex items-center space-x-4">
        {/* Notification icon */}
        {/* <FaBell className="text-white hover:text-gray-400 cursor-pointer" /> */} 
        <div className="flex items-center space-x-4">
  {/* Notification icon */}
  <Link to="/notification">
    <FaBell className="text-white hover:text-gray-400 cursor-pointer" />
  </Link>


        {/* Profile picture (represented as a small circle) */}
        <img
          src="https://www.w3schools.com/w3images/avatar2.png" // Replace with your profile image URL
          alt="Profile"
          className="w-8 h-8 rounded-full border-2 border-gray-400"
        />
      </div>
    </nav>
  );
};

export default Navbar;
