const axios = require('axios');

const testAtlasConnection = async () => {
  const baseURL = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing Atlas Connection...');
    
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${baseURL}/api/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    
    // Test get books endpoint
    console.log('2. Testing get books endpoint...');
    const booksResponse = await axios.get(`${baseURL}/api/books/getBooks`);
    console.log('✅ Get books passed:', booksResponse.data);
    
    // Test add book endpoint
    console.log('3. Testing add book endpoint...');
    const testBook = {
      bookName: "Atlas Test Book",
      bookTitle: "Testing Atlas Connection",
      author: "Test Author",
      sellingPrice: 399,
      publishDate: "2024-01-15"
    };
    
    const addBookResponse = await axios.post(`${baseURL}/api/book/addBook`, testBook);
    console.log('✅ Add book passed:', addBookResponse.data);
    
    // Test get books again to see the new book
    console.log('4. Testing get books again...');
    const booksResponse2 = await axios.get(`${baseURL}/api/books/getBooks`);
    console.log('✅ Updated books list:', booksResponse2.data);
    
    console.log('🎉 All Atlas tests passed! Your MongoDB Atlas connection is working perfectly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
};

testAtlasConnection(); 