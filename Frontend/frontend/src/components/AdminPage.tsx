
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    id: "",
    image: null as File | null,
    text: "",
    price: "",
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/items");
      setItems(data);
    } catch (err) {
      alert("Error fetching items!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async () => {
    const { id, image, text, price } = formData;

    if (!text || !price) {
      alert("Text and price are required!");
      return;
    }

    const formDataToSend = new FormData();
    if (image) formDataToSend.append("image", image);
    formDataToSend.append("text", text);
    formDataToSend.append("price", price);

    try {
      if (id) {
        // Update item
        await axios.put(`http://localhost:5000/update/${id}`, formDataToSend);
        alert("Item updated successfully!");
      } else {
        // Add new item
        await axios.post("http://localhost:5000/add", formDataToSend);
        alert("Item added successfully!");
      }
      fetchItems();
      setFormData({ id: "", image: null, text: "", price: "" });
    } catch (err) {
      alert("Error adding/updating item!");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      alert("Item deleted successfully!");
      fetchItems();
    } catch (err) {
      alert("Error deleting item!");
    }
  };

  const handleEdit = (item: any) => {
    setFormData({
      id: item.id,
      image: null,
      text: item.text,
      price: item.price,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      <input
        type="file"
        name="image"
        accept="image/*"
        className="border p-2 mb-4 w-full"
        onChange={handleFileChange}
      />
      <input
        type="text"
        name="text"
        placeholder="Enter Text"
        className="border p-2 mb-4 w-full"
        value={formData.text}
        onChange={handleChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Enter Price"
        className="border p-2 mb-4 w-full"
        value={formData.price}
        onChange={handleChange}
      />
      {/* <button className="bg-green-500 text-white px-4 py-2" onClick={handleSubmit}>
        {formData.id ? "Update" : "Submit"}
      </button>
      <Link to="/page2" className="inline-block px-8 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
  Messages
</Link> */}
<button className="bg-green-500 text-white px-4 py-2 mr-4" onClick={handleSubmit}>
  {formData.id ? "Update" : "Submit"}
</button>
<Link to="/page2" className="inline-block px-8 py-3 mt-4 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-300">
  Messages
</Link>


      <h2 className="text-xl font-bold mt-6 mb-4">Items</h2>
      <ul>
        {items.map((item: any) => (
          <li key={item.id} className="mb-4 border p-4 rounded">
            <img src={`http://localhost:5000/${item.image}`} alt={item.text} className="mb-2 w-32 h-32 object-cover" />
            <p>Text: {item.text}</p>
            <p>Price: {item.price}</p>
            <button
              className="bg-blue-500 text-white px-2 py-1 mr-2"
              onClick={() => handleEdit(item)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
