
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Page1 = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Please fill the field.');
      return;
    }
    try {
      setError(''); // Clear error if input is valid
      await axios.post('http://localhost:5000/message', { message });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700">
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Enter Your Message
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full px-4 py-2 text-lg bg-gray-100 rounded-lg border ${
                error ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:${
                error ? 'ring-red-500' : 'ring-purple-500'
              }`}
              placeholder="Type your message..."
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-pink-500 hover:to-purple-500 transform hover:scale-105 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page1;
