function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function getStatusLabel(status) {
  if (status === "Available") {
    return '<span class="status-label status-available">Available</span>';
  }
  return '<span class="status-label status-borrowed">Borrowed</span>';
}

function loadCategoryFilter() {
  const books = getBooks();
  const categoryFilter = $("#categoryFilter");
  const currentValue = categoryFilter.val() || "All";
  const categories = [...new Set(books.map(book => book.category))];

  categoryFilter.html('<option value="All">All Categories</option>');

  categories.forEach(function (category) {
    if (category.trim() !== "") {
      categoryFilter.append(`<option value="${category}">${category}</option>`);
    }
  });

  categoryFilter.val(currentValue);
}

function displayBooks() {
  const books = getBooks();
  const searchValue = $("#searchInput").val().toLowerCase().trim();
  const selectedCategory = $("#categoryFilter").val();
  const tableBody = $("#tableBody");

  const filteredBooks = books.filter(function (book) {
    const matchesSearch =
      book.title.toLowerCase().includes(searchValue) ||
      book.author.toLowerCase().includes(searchValue) ||
      String(book.id).includes(searchValue);

    const matchesCategory =
      selectedCategory === "All" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  tableBody.html("");

  if (filteredBooks.length === 0) {
    tableBody.html(`
      <tr>
        <td colspan="5" class="text-center text-muted py-4">No matching books found.</td>
      </tr>
    `);
    return;
  }

  filteredBooks.forEach(function (book) {
    const row = `
      <tr>
        <td>${book.title} (${book.id})</td>
        <td>${book.author}</td>
        <td>${book.category}</td>
        <td>${getStatusLabel(book.status)}</td>
        <td class="text-center">
          <button class="btn btn-sm btn-warning me-2" onclick="editBook(${book.id})">Edit</button>
          <button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Delete</button>
        </td>
      </tr>
    `;
    tableBody.append(row);
  });
}

function editBook(bookId) {
  localStorage.setItem("bookToEditId", bookId);
  window.location.href = "edit-book.html";
}

function deleteBook(bookId) {
  localStorage.setItem("bookToDeleteId", bookId);
  window.location.href = "delete-book.html";
}

function clearAllBooks() {
  const confirmed = confirm("Are you sure you want to delete all books?");
  if (confirmed) {
    localStorage.removeItem("books");
    loadCategoryFilter();
    displayBooks();
  }
}

$(document).ready(function () {
  loadCategoryFilter();
  displayBooks();

  $("#searchInput").on("keyup", displayBooks);
  $("#categoryFilter").on("change", displayBooks);
  $("#clearAllBtn").on("click", clearAllBooks);
});