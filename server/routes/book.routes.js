const express = require('express');
const {handleBookStoreController, handleGetBookController, handleBookDeleteController, handleBookUpdateController} = require('../controller/book.controller');

const router = express.Router();

router.post('/addBook', handleBookStoreController)
router.get('/getBooks', handleGetBookController)
router.delete('/deleteBook/:id', handleBookDeleteController)
router.put('/updateBook/:id', handleBookUpdateController)

module.exports = router;