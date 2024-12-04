const Book = require("./book.model");


//Post a book logic
const postBook = async (req, res) => {
    try{
        const newBook = await Book({...req.body});
        await newBook.save();
        res.status(200).send({message: "Book successfully added", book: newBook})
    } catch (error) {
        console.error("Something went wrong", error);
        res.status(500).send({message: "Failed posting the book", error: error.message})
    }
}


//get the book list to frontend logic
const getBook = async (req, res) => {
    try {
        const books = await Book.find().sort({createdAt: -1});
        res.status(200).send({message: "Books fetched successfully", books})
    } catch (error) {
        console.error("Something went wrong", error);
        res.status(500).send({message: "Failed fetching book list", error: error.message})
    }
}

//get a one book to frontend logic
const getOneBook = async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id);
        if (!book) {
            res.status(404).send({message: "Book not available", error: error.message})
        }
        res.status(200).send({message: "Book fetched successfully", book})
    } catch (error) {
        console.error("Something went wrong", error);
        res.status(500).send({message: "Failed fetching the book", error: error.message})
    }
}

//Updating a book
const updateBook = async (req, res) => {
    try {
        const {id} = req.params;
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new:true});
        if (!updatedBook) {
            res.status(404).send({message: "Book not available", error: error.message})
        }
        res.status(200).send({message: "Book updated successfully", book: updatedBook})    
    } catch (error) {
        console.error("Something went wrong", error);
        res.status(500).send({message: "Failed update the book", error: error.message})
    }
}

//Delete a book
const deleteBook = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).send({message: "Book not available to delete", error: error.message})
        }
        res.status(200).send({message: "Book deleted successfully", book: deletedBook})    
    } catch (error) {
        console.error("Something went wrong", error);
        res.status(500).send({message: "Failed to delete the book", error: error.message})
    }
}

module.exports = {
    postBook,
    getBook,
    getOneBook,
    updateBook,
    deleteBook
};