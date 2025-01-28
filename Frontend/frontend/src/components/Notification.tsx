
import React from "react";

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-300 rounded-lg shadow-xl z-50 max-w-md w-full p-6 transition-all duration-300 transform">
      <div className="flex justify-between items-center">
        <span className="text-gray-800 font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-3 text-gray-600 font-bold text-lg hover:text-gray-800 transition-colors duration-300"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Notification;

