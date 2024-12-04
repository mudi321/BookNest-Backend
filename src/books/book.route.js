const express = require('express'); // Importing the express
const Book = require('./book.model');
const { postBook, getBook, getOneBook, updateBook, deleteBook } = require('./book.controller');
const verifyAdminToken = require('../middleware/verifyAdminToken');
const router = express.Router(); //Calling method

// To EXPORT elements to frontend from database use POST
// To IMPORT elements from frontend from database use GET 
// To EDIT or UPDATE elements use PATCH & PUT method
// To DELETE elements use DELETE

// API on how to POST BOOKSa
router.post("/create-book", verifyAdminToken, postBook)

//Get all books
router.get("/", getBook)

//single book endpoint
router.get("/:id", getOneBook)

//Updating a book
router.put("/edit/:id", verifyAdminToken, updateBook)

//Delete a book
router.delete("/:id", verifyAdminToken, deleteBook)


module.exports = router; // Exporting the router