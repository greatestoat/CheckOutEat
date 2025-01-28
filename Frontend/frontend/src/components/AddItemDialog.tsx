
// import { useState, useEffect } from "react";

// interface AddItemDialogProps {
//   item: {
//     image: string;
//     text: string;
//     price: number;
//   };
//   setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
//   setAddedItems: React.Dispatch<React.SetStateAction<{ [key: string]: { item: string; quantity: number; price: number } }>>;
// }

// const AddItemDialog = ({ item, setShowDialog, setAddedItems }: AddItemDialogProps) => {
//   const [quantity, setQuantity] = useState(1);
//   const [additionalItems, setAdditionalItems] = useState<any[]>([]);
//   const [showAdditionalItems, setShowAdditionalItems] = useState(false);
//   const [addedItems, setAddedItemsState] = useState<{ [key: string]: { item: string; quantity: number; price: number } }>({
//     [item.text]: { item: item.text, quantity, price: item.price },
//   });
//   const [showConfirmation, setShowConfirmation] = useState(false);  // New state for confirmation dialog

//   useEffect(() => {
//     const fetchAdditionalItems = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/items");
//         if (response.ok) {
//           const data = await response.json();
//           setAdditionalItems(data);
//         } else {
//           console.error("Failed to fetch additional items.");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     if (showAdditionalItems) {
//       fetchAdditionalItems();
//     }
//   }, [showAdditionalItems]);

//   const handleQuantityChange = (itemText: string, operation: "increase" | "decrease") => {
//     setAddedItemsState((prevState) => {
//       const newQuantity = prevState[itemText]?.quantity || 1;
//       const updatedQuantity = operation === "increase" ? newQuantity + 1 : newQuantity - 1;
//       if (updatedQuantity < 1 || updatedQuantity > 10) return prevState; // Ensure 1 to 10 range

//       const updatedPrice = prevState[itemText]?.price / prevState[itemText]?.quantity * updatedQuantity;

//       return {
//         ...prevState,
//         [itemText]: {
//           ...prevState[itemText],
//           quantity: updatedQuantity,
//           price: updatedPrice,
//         },
//       };
//     });
//   };

//   const handleAddToCart = () => {
//     setShowConfirmation(true); // Show the confirmation dialog
//   };

//   const handleConfirmAddToCart = async () => {
//     try {
//       const orderItems = Object.values(addedItems).map(item => ({
//         item: item.item,
//         quantity: item.quantity,
//         price: item.price,
//       }));

//       const totalPrice = orderItems.reduce((acc, item) => acc + item.price, 0);

//       const response = await fetch("http://localhost:5000/api/add-to-cart", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           items: orderItems,
//           total_price: totalPrice,
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         console.log("Order successfully added:", result);
//         setShowDialog(false); // Close the dialog
//       } else {
//         console.error("Failed to add order to cart");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//     setShowConfirmation(false);  // Close confirmation dialog
//   };

//   const handleCancelAddToCart = () => {
//     setShowConfirmation(false); // Close the confirmation dialog without any action
//   };

//   const handleAddAdditionalItem = (additionalItem: any) => {
//     setAddedItemsState((prevState) => {
//       const newTotalPrice = prevState[additionalItem.text]?.price + additionalItem.price || additionalItem.price;
//       return {
//         ...prevState,
//         [additionalItem.text]: {
//           item: additionalItem.text,
//           quantity: 1,
//           price: newTotalPrice,
//         },
//       };
//     });
//   };

//   const calculateTotal = () => {
//     return Object.values(addedItems).reduce((acc, item) => acc + item.price, 0);
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-full h-auto max-h-full overflow-auto">
//         <div className="flex justify-between items-center">
//           <h2 className="text-2xl font-semibold">Add Item</h2>
//           <button
//             onClick={() => setShowDialog(false)}
//             className="text-gray-600 hover:text-gray-800 font-bold"
//           >
//             X
//           </button>
//         </div>

//         {/* Add the confirmation dialog */}
//         {showConfirmation && (
//           <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-8 rounded-lg shadow-lg text-center">
//               <h3 className="text-xl font-semibold">Are you sure you want to add this item to the cart?</h3>
//               <div className="mt-4 flex justify-center gap-4">
//                 <button
//                   onClick={handleConfirmAddToCart}
//                   className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600"
//                 >
//                   Sure
//                 </button>
//                 <button
//                   onClick={handleCancelAddToCart}
//                   className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className="mt-4 flex flex-col items-center">
//           <img
//             src={item.image}
//             alt="Item"
//             className="w-24 h-24 object-cover mx-auto rounded-md shadow-md"
//           />
//           <div className="text-lg mt-4">{item.text}</div>
//           <div className="flex items-center mt-4">
//             <button
//               onClick={() => handleQuantityChange(item.text, "decrease")}
//               className="bg-gray-300 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-400"
//             >
//               -
//             </button>
//             <span className="mx-4 text-lg">{quantity}</span>
//             <button
//               onClick={() => handleQuantityChange(item.text, "increase")}
//               className="bg-gray-300 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-400"
//             >
//               +
//             </button>
//           </div>

//           <div className="mt-4 text-sm">
//             <h4 className="font-semibold">Items Added:</h4>
//             <ul className="list-none space-y-2">
//               {Object.entries(addedItems).map(([key, item]) => (
//                 <li key={key}>
//                   {item.item} (x{item.quantity}) - ${item.price}
//                   <div className="flex items-center mt-2">
//                     <button
//                       onClick={() => handleQuantityChange(key, "decrease")}
//                       className="bg-gray-300 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-400"
//                     >
//                       -
//                     </button>
//                     <span className="mx-4">{item.quantity}</span>
//                     <button
//                       onClick={() => handleQuantityChange(key, "increase")}
//                       className="bg-gray-300 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-400"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="mt-4 text-xl font-semibold">Total: ${calculateTotal()}</div>

//           <div className="mt-4">
//             <button
//               onClick={handleAddToCart}
//               className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
//             >
//               Add to Cart
//             </button>
//           </div>

//           <div className="mt-4">
//             <button
//               onClick={() => setShowAdditionalItems(true)}
//               className="bg-gray-300 text-gray-600 py-2 px-6 rounded-full hover:bg-gray-400"
//             >
//               Browse More Items
//             </button>
//           </div>

//           {showAdditionalItems && (
//             <div className="mt-4 max-h-60 overflow-y-auto">
//               <h3 className="text-xl font-semibold">Other Items</h3>
//               <div className="flex gap-4 mt-4 overflow-x-auto">
//                 {additionalItems.map((additionalItem) => (
//                   <div key={additionalItem.id} className="border p-2 rounded-lg text-center">
//                     <img
//                       src={`http://localhost:5000/${additionalItem.image}`}
//                       alt={additionalItem.text}
//                       className="w-14 h-14 object-cover mx-auto mb-4"
//                     />
//                     <div className="text-xs font-semibold">{additionalItem.text}</div>
//                     <div className="text-xs text-gray-500">${additionalItem.price}</div>
//                     <button
//                       onClick={() => handleAddAdditionalItem(additionalItem)}
//                       className="bg-blue-500 text-white py-1 px-4 mt-4 rounded-full hover:bg-blue-600"
//                     >
//                       Add to Cart
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddItemDialog;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for redirection
import TickAnimation from "./TickAnimation"; // Importing the TickAnimation component

interface AddItemDialogProps {
  item: {
    image: string;
    text: string;
    price: number;
  };
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setAddedItems: React.Dispatch<React.SetStateAction<{ [key: string]: { item: string; quantity: number; price: number } }>>;
}

const AddItemDialog = ({ item, setShowDialog, setAddedItems }: AddItemDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const [additionalItems, setAdditionalItems] = useState<any[]>([]);
  const [showAdditionalItems, setShowAdditionalItems] = useState(false);
  const [addedItems, setAddedItemsState] = useState<{ [key: string]: { item: string; quantity: number; price: number } }>({
    [item.text]: { item: item.text, quantity, price: item.price },
  });
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [showTickAnimation, setShowTickAnimation] = useState(false); // State for the tick animation
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const fetchAdditionalItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/items");
        if (response.ok) {
          const data = await response.json();
          setAdditionalItems(data);
        } else {
          console.error("Failed to fetch additional items.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (showAdditionalItems) {
      fetchAdditionalItems();
    }
  }, [showAdditionalItems]);

  const handleQuantityChange = (itemText: string, operation: "increase" | "decrease") => {
    setAddedItemsState((prevState) => {
      const newQuantity = prevState[itemText]?.quantity || 1;
      const updatedQuantity = operation === "increase" ? newQuantity + 1 : newQuantity - 1;
      if (updatedQuantity < 1 || updatedQuantity > 10) return prevState; 

      const updatedPrice = prevState[itemText]?.price / prevState[itemText]?.quantity * updatedQuantity;

      return {
        ...prevState,
        [itemText]: {
          ...prevState[itemText],
          quantity: updatedQuantity,
          price: updatedPrice,
        },
      };
    });
  };

  const handleAddToCart = () => {
    setShowConfirmation(true); // Show the confirmation dialog
  };

  const handleConfirmAddToCart = async () => {
    try {
      const orderItems = Object.values(addedItems).map(item => ({
        item: item.item,
        quantity: item.quantity,
        price: item.price,
      }));

      const totalPrice = orderItems.reduce((acc, item) => acc + item.price, 0);

      const response = await fetch("http://localhost:5000/api/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: orderItems,
          total_price: totalPrice,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Order successfully added:", result);
        setShowTickAnimation(true); // Show tick animation
        setTimeout(() => {
          setShowDialog(false); // Close the dialog
          navigate("/"); // Redirect to homepage after animation
        }, 3000); // Wait for the animation to finish
      } else {
        console.error("Failed to add order to cart");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setShowConfirmation(false);  // Close confirmation dialog
  };

  const handleCancelAddToCart = () => {
    setShowConfirmation(false); // Close the confirmation dialog without any action
  };

  const handleAddAdditionalItem = (additionalItem: any) => {
    setAddedItemsState((prevState) => {
      const newTotalPrice = prevState[additionalItem.text]?.price + additionalItem.price || additionalItem.price;
      return {
        ...prevState,
        [additionalItem.text]: {
          item: additionalItem.text,
          quantity: 1,
          price: newTotalPrice,
        },
      };
    });
  };

  const calculateTotal = () => {
    return Object.values(addedItems).reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-full h-auto max-h-full overflow-auto">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Add Item</h2>
          <button
            onClick={() => setShowDialog(false)}
            className="text-gray-600 hover:text-gray-800 font-bold"
          >
            X
          </button>
        </div>

        {showConfirmation && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <h3 className="text-xl font-semibold">Are you sure you want to add this item to the cart?</h3>
              <div className="mt-4 flex justify-center gap-4">
                <button
                  onClick={handleConfirmAddToCart}
                  className="bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600"
                >
                  Sure
                </button>
                <button
                  onClick={handleCancelAddToCart}
                  className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-col items-center">
          <img
            src={item.image}
            alt="Item"
            className="w-24 h-24 object-cover mx-auto rounded-md shadow-md"
          />
          <div className="text-lg mt-4">{item.text}</div>
          <div className="flex items-center mt-4">
            <button
              onClick={() => handleQuantityChange(item.text, "decrease")}
              className="bg-gray-300 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-400"
            >
              -
            </button>
            <span className="mx-4 text-lg">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(item.text, "increase")}
              className="bg-gray-300 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-400"
            >
              +
            </button>
          </div>

          <div className="mt-4 text-sm">
            <h4 className="font-semibold">Items Added:</h4>
            <ul className="list-none space-y-2">
              {Object.entries(addedItems).map(([key, item]) => (
                <li key={key}>
                  {item.item} (x{item.quantity}) - ${item.price}
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleQuantityChange(key, "decrease")}
                      className="bg-gray-300 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="mx-4">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(key, "increase")}
                      className="bg-gray-300 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 text-xl font-semibold">Total: ${calculateTotal()}</div>

          <div className="mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowAdditionalItems(true)}
              className="bg-gray-300 text-gray-600 py-2 px-6 rounded-full hover:bg-gray-400"
            >
              Browse More Items
            </button>
          </div>

          {showAdditionalItems && (
            <div className="mt-4 max-h-60 overflow-y-auto">
              <h3 className="text-xl font-semibold">Other Items</h3>
              <div className="flex gap-4 mt-4 overflow-x-auto">
                {additionalItems.map((additionalItem) => (
                  <div key={additionalItem.id} className="border p-2 rounded-lg text-center">
                    <img
                      src={`http://localhost:5000/${additionalItem.image}`}
                      alt={additionalItem.text}
                      className="w-14 h-14 object-cover mx-auto mb-4"
                    />
                    <div className="text-xs font-semibold">{additionalItem.text}</div>
                    <div className="text-xs text-gray-500">${additionalItem.price}</div>
                    <button
                      onClick={() => handleAddAdditionalItem(additionalItem)}
                      className="bg-blue-500 text-white py-1 px-4 mt-4 rounded-full hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tick Animation */}
      {showTickAnimation && <TickAnimation />}
    </div>
  );
};

export default AddItemDialog;
