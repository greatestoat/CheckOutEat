
const fs = require("fs");
const path = require("path");

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const multer = require("multer");


const app = express();
app.use(bodyParser.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: 'uploads/',  // This should match the static middleware path
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Rahul@1234",
  database: "webpage",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database.");
});
let savedMessage = '';

app.post('/message', (req, res) => {
  savedMessage = req.body.message;
  res.json({ success: true });
});

app.get('/message', (req, res) => {
  res.json({ message: savedMessage });
});
// Add new item (with file upload)
app.post("/add", upload.single("image"), (req, res) => {
  const { text, price } = req.body;
  const image = req.file ? req.file.path : null; // Path to the uploaded image

  if (!image || !text || !price) {
    return res.status(400).send("All fields are required!");
  }

  const query = "INSERT INTO items (image, text, price) VALUES (?, ?, ?)";
  db.query(query, [image, text, price], (err) => {
    if (err) throw err;
    res.send("Item added successfully.");
  });
});

// Fetch all items
app.get("/items", (req, res) => {
  const query = "SELECT * FROM items";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post("/api/add-to-cart", (req, res) => {
  const { items, total_price } = req.body;

  // Insert order into the MySQL database
  const query = "INSERT INTO orders (items, total_price) VALUES (?, ?)";
  const values = [JSON.stringify(items), total_price];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error("Error inserting order:", err);
      return res.status(500).json({ error: "Failed to add order to cart" });
    }

    res.status(200).json({ message: "Order successfully added to cart", orderId: results.insertId });
  });
});


app.get("/api/orders", (req, res) => {
  const query = "SELECT * FROM orders";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching orders:", err);
      return res.status(500).json({ error: "Failed to fetch orders" });
    }

    // Send back the orders
    res.status(200).json({ orders: results });
  });
});

app.post("/api/sales-report", (req, res) => {
  const { date } = req.body; // 'date' in format 'YYYY-MM-DD'

  const query = `
    SELECT SUM(JSON_LENGTH(items)) AS items_sold 
    FROM orders 
    WHERE DATE(created_at) = ?`;

  db.query(query, [date], (err, results) => {
    if (err) {
      console.error("Error fetching sales data:", err);
      return res.status(500).json({ error: "Failed to fetch sales data" });
    }

    res.status(200).json({
      date: date,
      itemsSold: results[0].items_sold || 0,
    });
  });
});
app.post("/api/another-sales-report", (req, res) => {
  const { startDate, endDate } = req.body;

  const query = `
    SELECT 
      DATE(created_at) as date,
      SUM(total_price) AS total_revenue 
    FROM orders 
    WHERE DATE(created_at) BETWEEN ? AND ?
    GROUP BY DATE(created_at)
    ORDER BY date ASC`;

  db.query(query, [startDate, endDate], (err, results) => {
    if (err) {
      console.error("Error fetching sales data:", err);
      return res.status(500).json({ error: "Failed to fetch sales data" });
    }

    // Format the results to ensure we have data for all dates in the range
    const formattedResults = [];
    const currentDate = new Date(startDate);
    const end = new Date(endDate);

    while (currentDate <= end) {
      const currentDateStr = currentDate.toISOString().split('T')[0];
      const dayData = results.find(
        row => row.date.toISOString().split('T')[0] === currentDateStr
      );

      formattedResults.push({
        date: currentDateStr,
        totalRevenue: dayData ? parseFloat(dayData.total_revenue) || 0 : 0
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    res.status(200).json(formattedResults);
  });
});
// Add Update functionality
app.put("/update/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { text, price } = req.body;
  const image = req.file ? req.file.path : null;

  const query = image
    ? "UPDATE items SET image = ?, text = ?, price = ? WHERE id = ?"
    : "UPDATE items SET text = ?, price = ? WHERE id = ?";

  const values = image ? [image, text, price, id] : [text, price, id];

  db.query(query, values, (err) => {
    if (err) throw err;
    res.send("Item updated successfully.");
  });
});

// Add Delete functionality
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  // Get the image path to delete the file
  const selectQuery = "SELECT image FROM items WHERE id = ?";
  db.query(selectQuery, [id], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      const imagePath = results[0].image;

      // Delete the file from the filesystem
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete the item from the database
    const deleteQuery = "DELETE FROM items WHERE id = ?";
    db.query(deleteQuery, [id], (err) => {
      if (err) throw err;
      res.send("Item deleted successfully.");
    });
  });
});


app.use('/uploads', express.static('uploads')); // Replace 'uploads' with your actual upload directory
app.listen(5000, () => console.log("Server running on port 5000"));



