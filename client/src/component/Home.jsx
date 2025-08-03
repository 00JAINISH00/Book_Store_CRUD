import React, { useState } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import { columns } from '../utils/BooksHelper';
import { useEffect } from 'react';

// API URL configuration with fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_API_URL || 'https://book-store-crud-9apg.onrender.com';

const Home = () => {

  const [bookForm, setBookForm] = useState({
    bookName: "",
    bookTitle: "",
    author: "",
    sellingPrice: "",
    publishDate: "",
  });
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookForm({ ...bookForm, [name]: value });
  };

  const resetForm = () => {
    setBookForm({
      bookName: "",
      bookTitle: "",
      author: "",
      sellingPrice: "",
      publishDate: "",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bookForm.bookName || !bookForm.bookTitle || !bookForm.author || !bookForm.sellingPrice || !bookForm.publishDate) {
    alert("Please fill all required fields");
    return;
  }
    try {
      setLoading(true);
      if (isEditing) {
        // Update existing book
        const response = await axios.put(
          `${API_BASE_URL}/api/book/updateBook/${editingId}`,
          bookForm
        );
        alert("Book updated successfully");
      } else {
        // Add new book
        const response = await axios.post(
          `${API_BASE_URL}/api/book/addBook`,
          bookForm
        );
        alert("Book added successfully");
      }
      
      resetForm();
      featchBooks();
    } catch (error) {
      console.error('Error submitting book:', error);
      alert(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const featchBooks = async () => {
    try {
      setLoading(true);
      console.log('Fetching books from:', `${API_BASE_URL}/api/book/getBooks`);
      
      const response = await axios.get(`${API_BASE_URL}/api/book/getBooks`);
      console.log('API Response:', response.data);
      
      if(response.data.success) {
        let sno = 1;
        const data = response.data.data.map((book) => ({
          _id: book._id,
          sno: sno++,
          bookName: book.bookName,
          bookTitle: book.bookTitle,
          author: book.author,
          sellingPrice: book.sellingPrice,
          publishDate: book.publishDate,
        }))
        setBooks(data);
      } else {
        console.error('API returned success: false');
        setBooks([]);
      }
    } catch(error) {
      console.error('Error fetching books:', error);
      alert(`Error fetching books: ${error.response?.data?.message || error.message}`);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    console.log('=== DEBUG INFO ===');
    console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
    console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
    console.log('Final API Base URL:', API_BASE_URL);
    console.log('==================');
    featchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        setLoading(true);
        const response = await axios.delete(
          `${API_BASE_URL}/api/book/deleteBook/${id}`
        );
        alert("Book deleted successfully");
        featchBooks(); // Refresh the book list after deletion
      } catch (error) {
        console.error('Error deleting book:', error);
        alert(`Error deleting book: ${error.response?.data?.message || error.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (id) => {
    const bookToEdit = books.find(book => book._id === id);
    if (bookToEdit) {
      // Format the date properly for the HTML date input (YYYY-MM-DD)
      const formattedDate = new Date(bookToEdit.publishDate).toISOString().split('T')[0];
      
      setBookForm({
        bookName: bookToEdit.bookName,
        bookTitle: bookToEdit.bookTitle,
        author: bookToEdit.author,
        sellingPrice: bookToEdit.sellingPrice,
        publishDate: formattedDate,
      });
      setIsEditing(true);
      setEditingId(id);
    }
  };



  return (
    <>
    {/* Debug Info - Remove this in production */}
    <div className="w-full px-5 py-2 bg-yellow-100 border-b border-yellow-300">
      <div className="max-w-4xl mx-auto text-sm">
        <p><strong>Debug Info:</strong></p>
        <p>• VITE_API_BASE_URL: {import.meta.env.VITE_API_BASE_URL || 'Not set'}</p>
        <p>• VITE_API_URL: {import.meta.env.VITE_API_URL || 'Not set'}</p>
        <p>• Final API URL: {API_BASE_URL}</p>
        <p>• Status: {loading ? 'Loading...' : 'Ready'}</p>
        <p>• Books Count: {books.length}</p>
        <button 
          onClick={featchBooks}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
        >
          Test API Connection
        </button>
      </div>
    </div>
    
    <div className="w-full px-5 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="w-full max-w-md mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isEditing ? "Edit Book" : "Book Entry Form"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-medium mb-1">Book Name</label>
            <input
              type="text"
              placeholder="Enter book name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              name='bookName'
              value={bookForm.bookName}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Book Title</label>
            <input
              type="text"
              placeholder="Enter book title"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              name='bookTitle'
              value={bookForm.bookTitle}
              onChange={handleFormChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Author</label>
            <input
              type="text"
              placeholder="Enter author name"
              name='author'
              value={bookForm.author}
              onChange={handleFormChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Selling Price</label>
            <input
              type="number"
              placeholder="Enter price"
              name='sellingPrice'
              min="0"
              value={bookForm.sellingPrice}
              onChange={handleFormChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Publish Date</label>
            <input
              type="date"
              onChange={handleFormChange}
              name='publishDate'
              value={bookForm.publishDate}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700'
              }`}
            >
              {loading ? 'Processing...' : (isEditing ? "Update" : "Submit")}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
    <div className='w-full px-10 py-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Books Management</h2>
        <div className="max-h-[500px] overflow-auto">
          <DataTable 
            columns={columns(handleDelete, handleEdit)} 
            data={books} 
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[5, 10, 15, 20]}
            responsive
            customStyles={{
              table: {
                style: {
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                },
              },
              header: {
                style: {
                  fontSize: '16px',
                  fontWeight: 'bold',
                },
              },
              headRow: {
                style: {
                  minHeight: '50px',
                  fontSize: '14px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  fontWeight: '600',
                },
              },
              headCells: {
                style: {
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  fontSize: '14px',
                  fontWeight: '600',
                },
              },
              rows: {
                style: {
                  minHeight: '50px',
                  fontSize: '14px',
                  borderBottom: '1px solid #e5e7eb',
                  backgroundColor: '#ffffff',
                  '&:nth-of-type(odd)': {
                    backgroundColor: '#f8fafc',
                  },
                  '&:hover': {
                    backgroundColor: '#f1f5f9',
                    transform: 'scale(1.01)',
                    transition: 'all 0.2s ease',
                  },
                },
              },
              cells: {
                style: {
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  fontSize: '14px',
                },
              },
              pagination: {
                style: {
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '16px',
                  marginTop: '16px',
                },
              },
            }}
            noDataComponent={
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium">No books found</p>
                <p className="text-sm mt-2">Add some books to get started!</p>
              </div>
            }
          />
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
