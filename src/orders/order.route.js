const express = require('express'); // Importing the express
const { createOrder, getOrder } = require('./order.controller');

const router = express.Router(); // Calling method

// Create order
router.post("/", createOrder);


//get order by email address
router.get("/email/:email", getOrder);



module.exports = router;