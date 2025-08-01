const Book = require('../model/book.js');

const handleBookStoreController = async (req, res) => {
  try {
    const { bookName, bookTitle, author, sellingPrice, publishDate } = req.body;

    // Validation (optional but recommended)
    if (!bookName || !bookTitle || !author || !sellingPrice || !publishDate) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newBook = new Book({
      bookName,
      bookTitle,
      author,
      sellingPrice,
      publishDate,
    });

    await newBook.save();

    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error('Error saving book:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const handleGetBookController = async (req, res) => {
  try {
    const getBooks = await Book.find();
    res.status(200).json({success: true, data: getBooks})
  }catch (error) {
    return res.status(500).json({success: false, error: " get books server error"})
  }
}


const handleBookDeleteController = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Book.findByIdAndDelete(id);
    if (deleted) {
      return res.json({
        Message: "Book deleted successfully !",
        Success: true,
      });
    } else {
      return res.status(404).json({ Message: "Book not found", Success: false });
    }
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

const handleBookUpdateController = async (req, res) => {
  const { id } = req.params;
  const { bookName, bookTitle, author, sellingPrice, publishDate } = req.body;
  
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { bookName, bookTitle, author, sellingPrice, publishDate },
      { new: true }
    );
    
    if (updatedBook) {
      return res.json({
        Message: "Book updated successfully !",
        Success: true,
        data: updatedBook
      });
    } else {
      return res.status(404).json({ Message: "Book not found", Success: false });
    }
  } catch (error) {
    return res.status(400).json({ Message: error.message, Success: false });
  }
};

module.exports = {handleBookStoreController, handleGetBookController , handleBookDeleteController, handleBookUpdateController};
