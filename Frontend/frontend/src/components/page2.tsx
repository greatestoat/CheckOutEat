// import { useEffect, useState } from 'react';
// import axios from 'axios';

// const Page2 = () => {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const fetchMessage = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/message');
//         setMessage(response.data.message);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchMessage();
//   }, []);

//   return (
//     <div>
//       <h1>Received Message</h1>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default Page2;
import { useEffect, useState } from 'react';
import axios from 'axios';

const Page2 = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get('http://localhost:5000/message');
        setMessage(response.data.message);
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessage();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 via-teal-700 to-green-600">
      <div className="w-full max-w-lg p-6 bg-white rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Received Message
        </h1>
        <div className="p-4 bg-gradient-to-r from-green-500 to-teal-500 text-white text-xl font-semibold rounded-lg shadow-lg">
          {message ? (
            <p className="animate-pulse text-center">{message}</p>
          ) : (
            <p className="text-center">Loading message...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page2;
