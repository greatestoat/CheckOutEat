
// import React, { useState } from "react";
// import axios from "axios";

// interface OrderDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   item: { image: string; text: string; price: number };
// }

// const OrderDialog: React.FC<OrderDialogProps> = ({ isOpen, onClose, item }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [orderConfirmed, setOrderConfirmed] = useState(false);
//   const [addedItems, setAddedItems] = useState<{ [key: string]: { item: string, quantity: number, price: number } }>({});
//   const [showAddDialog, setShowAddDialog] = useState(false);

//   const handleIncrement = () => {
//     if (quantity < 10) setQuantity(quantity + 1);
//   };

//   const handleDecrement = () => {
//     if (quantity > 1) setQuantity(quantity - 1);
//   };

//   const handleConfirmOrder = async () => {
//     try {
//       const orderData = {
//         itemName: item.text,
//         quantity: quantity,
//         price: item.price * quantity,
//       };

//       // Send order data to the backend
//       await axios.post("http://localhost:5000/order", orderData);
//       setOrderConfirmed(true);
//     } catch (error) {
//       console.error("Error confirming order:", error);
//     }
//   };

//   const handleAddItem = () => {
//     setAddedItems(prevState => ({
//       ...prevState,
//       [item.text]: {
//         item: item.text,
//         quantity: quantity,
//         price: item.price * quantity,
//       }
//     }));
//     setShowAddDialog(true);
//   };

//   const handleCloseAddDialog = () => {
//     setShowAddDialog(false);
//   };

//   const handleAddQuantity = (itemName: string) => {
//     setAddedItems(prevState => {
//       const updatedItem = prevState[itemName];
//       if (updatedItem && updatedItem.quantity < 10) {
//         updatedItem.quantity += 1;
//         updatedItem.price = updatedItem.quantity * item.price;
//       }
//       return { ...prevState };
//     });
//   };

//   const handleRemoveQuantity = (itemName: string) => {
//     setAddedItems(prevState => {
//       const updatedItem = prevState[itemName];
//       if (updatedItem && updatedItem.quantity > 1) {
//         updatedItem.quantity -= 1;
//         updatedItem.price = updatedItem.quantity * item.price;
//       }
//       return { ...prevState };
//     });
//   };

//   return (
//     <div>
//       {/* Main Order Dialog */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold">Order Item</h2>
//               <button onClick={onClose} className="text-gray-600 hover:text-gray-800 font-bold">
//                 X
//               </button>
//             </div>
//             <div className="mt-4 flex flex-col items-center">
//               <img src={item.image} alt="Item" className="w-40 h-40 object-cover rounded-md" />
//               <h3 className="text-xl mt-4">{item.text}</h3>
//               <p className="text-lg text-green-600 mt-2">${item.price}</p>
//               <div className="mt-4 flex items-center">
//                 <button onClick={handleDecrement} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-l-full">-</button>
//                 <span className="mx-4 text-lg">{quantity}</span>
//                 <button onClick={handleIncrement} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-r-full">+</button>
//               </div>
//               <div className="mt-4">
//                 <button onClick={handleConfirmOrder} className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">
//                   Confirm Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add+ Dialog */}
//       {showAddDialog && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-end z-50 transition-transform duration-500 transform translate-y-0">
//           <div className="bg-white p-8 rounded-t-lg shadow-lg w-full max-w-lg">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold">Added Items</h2>
//               <button onClick={handleCloseAddDialog} className="text-gray-600 hover:text-gray-800 font-bold">
//                 X
//               </button>
//             </div>
//             {Object.keys(addedItems).map((itemName) => {
//               const { item, quantity, price } = addedItems[itemName];
//               return (
//                 <div key={itemName} className="mt-4 flex justify-between items-center">
//                   <div className="text-lg">{item}</div>
//                   <div className="flex items-center">
//                     <button onClick={() => handleRemoveQuantity(itemName)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-l-full">-</button>
//                     <span className="mx-4 text-lg">{quantity}</span>
//                     <button onClick={() => handleAddQuantity(itemName)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-r-full">+</button>
//                   </div>
//                   <div className="ml-4 text-green-600">${price}</div>
//                 </div>
//               );
//             })}
//             <div className="mt-4">
//               <button onClick={handleCloseAddDialog} className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">
//                 Proceed to Payment
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add+ Button */}
//       <button onClick={handleAddItem} className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 mt-4">
//         Add +
//       </button>
//     </div>
//   );
// };

// export default OrderDialog;
// import React, { useState } from "react";
// import axios from "axios";

// interface OrderDialogProps {
//   isOpen: boolean;
//   onClose: () => void;
//   item: { image: string; text: string; price: number };
// }

// const OrderDialog: React.FC<OrderDialogProps> = ({ isOpen, onClose, item }) => {
//   const [quantity, setQuantity] = useState(1);
//   const [orderConfirmed, setOrderConfirmed] = useState(false);
//   const [addedItems, setAddedItems] = useState<{ [key: string]: { item: string, quantity: number, price: number } }>({});
//   const [showAddDialog, setShowAddDialog] = useState(false);

//   const handleIncrement = () => {
//     if (quantity < 10) setQuantity(quantity + 1);
//   };

//   const handleDecrement = () => {
//     if (quantity > 1) setQuantity(quantity - 1);
//   };

//   const handleConfirmOrder = async () => {
//     try {
//       const orderData = {
//         itemName: item.text,
//         quantity: quantity,
//         price: item.price * quantity,
//       };

//       // Send order data to the backend
//       await axios.post("http://localhost:5000/order", orderData);
//       setOrderConfirmed(true);
//     } catch (error) {
//       console.error("Error confirming order:", error);
//     }
//   };

//   const handleAddItem = () => {
//     setAddedItems(prevState => ({
//       ...prevState,
//       [item.text]: {
//         item: item.text,
//         quantity: quantity,
//         price: item.price * quantity,
//       }
//     }));
//     setShowAddDialog(true);
//   };

//   const handleCloseAddDialog = () => {
//     setShowAddDialog(false);
//   };

//   const handleAddQuantity = (itemName: string) => {
//     setAddedItems(prevState => {
//       const updatedItem = prevState[itemName];
//       if (updatedItem && updatedItem.quantity < 10) {
//         updatedItem.quantity += 1;
//         updatedItem.price = updatedItem.quantity * item.price;
//       }
//       return { ...prevState };
//     });
//   };

//   const handleRemoveQuantity = (itemName: string) => {
//     setAddedItems(prevState => {
//       const updatedItem = prevState[itemName];
//       if (updatedItem && updatedItem.quantity > 1) {
//         updatedItem.quantity -= 1;
//         updatedItem.price = updatedItem.quantity * item.price;
//       }
//       return { ...prevState };
//     });
//   };

//   return (
//     <div>
//       {/* Main Order Dialog */}
//       {isOpen && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold">Order Item</h2>
//               <button onClick={onClose} className="text-gray-600 hover:text-gray-800 font-bold">
//                 X
//               </button>
//             </div>
//             <div className="mt-4 flex flex-col items-center">
//               <img src={item.image} alt="Item" className="w-40 h-40 object-cover rounded-md" />
//               <h3 className="text-xl mt-4">{item.text}</h3>
//               <p className="text-lg text-green-600 mt-2">${item.price}</p>
//               <div className="mt-4 flex items-center">
//                 <button onClick={handleDecrement} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-l-full">-</button>
//                 <span className="mx-4 text-lg">{quantity}</span>
//                 <button onClick={handleIncrement} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-r-full">+</button>
//               </div>
//               <div className="mt-4">
//                 <button onClick={handleConfirmOrder} className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">
//                   Confirm Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Add+ Dialog */}
//       {showAddDialog && (
//         <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-end z-50 transition-transform duration-500 transform translate-y-0">
//           <div className="bg-white p-8 rounded-t-lg shadow-lg w-full max-w-lg">
//             <div className="flex justify-between items-center">
//               <h2 className="text-2xl font-semibold">Added Items</h2>
//               <button onClick={handleCloseAddDialog} className="text-gray-600 hover:text-gray-800 font-bold">
//                 X
//               </button>
//             </div>
//             {Object.keys(addedItems).map((itemName) => {
//               const { item, quantity, price } = addedItems[itemName];
//               return (
//                 <div key={itemName} className="mt-4 flex justify-between items-center">
//                   <div className="text-lg">{item}</div>
//                   <div className="flex items-center">
//                     <button onClick={() => handleRemoveQuantity(itemName)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-l-full">-</button>
//                     <span className="mx-4 text-lg">{quantity}</span>
//                     <button onClick={() => handleAddQuantity(itemName)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-r-full">+</button>
//                   </div>
//                   <div className="ml-4 text-green-600">${price}</div>
//                 </div>
//               );
//             })}
//             {/* Add+ Button */}
//             <button onClick={handleAddItem} className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 mt-4 w-full">
//               Add +
//             </button>
//             <div className="mt-4">
//               <button onClick={handleCloseAddDialog} className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">
//                 Proceed to Payment
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default OrderDialog;
