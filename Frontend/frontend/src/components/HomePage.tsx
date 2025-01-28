
import { useEffect, useState } from "react";
import axios from "axios";
import AddItemDialog from "./AddItemDialog";// Import the new dialog component

const HomePage = () => {
  interface Item {
    image: string;
    text: string;
    price: number;
  }

  const [items, setItems] = useState<Item[]>([]);
  const [addedItems, setAddedItems] = useState<{ [key: string]: { item: string; quantity: number; price: number } }>({});
  const [dialogItem, setDialogItem] = useState<Item | null>(null); // Store the item to be added in the dialog
  const [showDialog, setShowDialog] = useState(false); // Control dialog visibility

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await axios.get("http://localhost:5000/items");

      // Update image URL for each item
      const updatedItems = data.map((item: Item) => ({
        ...item,
        image: `http://localhost:5000/${item.image}` // Prepend the base URL
      }));

      setItems(updatedItems);
    };
    fetchItems();
  }, []);
 
  
  

  const handleAddItem = (item: Item) => {
    setDialogItem(item); // Set the item to be added in the dialog
    setShowDialog(true); // Show the dialog
  };

  return (
    <div className="p-8 overflow-x-hidden">
      {/* <h1 className="text-4xl font-semibold text-center mb-8 text-blue-600">Welcome to the Home Page</h1> */}
      <table className="min-w-full table-auto border-collapse bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="border px-6 py-4 text-left">Image</th>
            <th className="border px-6 py-4 text-left">Text</th>
            <th className="border px-6 py-4 text-left">Price</th>
            <th className="border px-6 py-4 text-left">Add+</th> {/* Add new column for Add+ */}
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="text-center hover:bg-gray-100 transition-colors">
              <td className="border px-4 py-4">
                <img
                  src={item.image}
                  alt="Item"
                  className="w-24 h-24 object-cover mx-auto rounded-md shadow-md"
                />
              </td>
              <td className="border px-6 py-4 text-sm text-gray-800">{item.text}</td>
              <td className="border px-6 py-4 text-sm text-green-600 font-semibold">${item.price}</td>
              <td className="border px-6 py-4">
                <button
                  onClick={() => handleAddItem(item)}
                  className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-200"
                >
                  Add +
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog Box for Item Quantity */}
      {showDialog && dialogItem && (
        <AddItemDialog
          item={dialogItem}
          setShowDialog={setShowDialog}
          setAddedItems={setAddedItems}
        />
      )}
    </div>
  );
};

export default HomePage;
