export const columns = (handleDelete, handleEdit) => [
  {
    name: "S No",
    selector: (row) => row.sno,
    width: "80px",
    center: true,
    sortable: true,
  },
  {
    name: "Book Name",
    selector: (row) => row.bookName,
    width: "150px",
    sortable: true,
    wrap: true,
  },
  {
    name: "Book Title",
    selector: (row) => row.bookTitle,
    width: "350px",
    sortable: true,
    wrap: true,
  },
  {
    name: "Author",
    selector: (row) => row.author,
    width: "120px",
    sortable: true,
    wrap: true,
  },
  {
    name: "Selling Price",
    selector: (row) => `₹${row.sellingPrice}`,
    width: "130px",
    center: true,
    sortable: true,
  },
  {
    name: "Publish Date",
    selector: (row) => new Date(row.publishDate).toLocaleDateString('en-IN'),
    width: "200px",
    center: true,
    sortable: true,
  },
  {
    name: "Actions",
    cell: (row) => (
      <div className="flex gap-3 justify-center items-center">
        <button
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
          onClick={() => handleEdit(row._id)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button
          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center gap-2"
          onClick={() => handleDelete(row._id)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    ),
    width: "200px",
    center: true,
    ignoreRowClick: true,
    allowOverflow: false,
    button: true,
  },
];

