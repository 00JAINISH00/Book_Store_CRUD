const axios = require('axios');

const testServer = async () => {
  const baseURL = 'http://localhost:3000';
  
  try {
    console.log('🧪 Testing server...');
    
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
      bookName: "Test Book",
      bookTitle: "Test Title",
      author: "Test Author",
      sellingPrice: 299,
      publishDate: "2024-01-15"
    };
    
    const addBookResponse = await axios.post(`${baseURL}/api/book/addBook`, testBook);
    console.log('✅ Add book passed:', addBookResponse.data);
    
    console.log('🎉 All tests passed! Server is working correctly.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
};

testServer(); 