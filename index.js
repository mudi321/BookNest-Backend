const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", 'https://book-nest-delta.vercel.app'],
  credentials: true,
}));

// Routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

// Connect to MongoDB
async function main() {
  await mongoose.connect(process.env.DB_URL);
  console.log("DB connected successfully");
}
main().catch(err => console.log(err));

// Default route for unmatched paths
app.use('*', (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
