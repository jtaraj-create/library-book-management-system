function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBook() {
  const bookId = parseInt(localStorage.getItem("bookToEditId"), 10);

  if (!bookId) {
    alert("No book selected.");
    window.location.href = "index.html";
    return;
  }

  const books = getBooks();
  const book = books.find(function (item) {
    return item.id === bookId;
  });

  if (!book) {
    alert("Book not found.");
    window.location.href = "index.html";
    return;
  }

  $("#bookTitle").val(book.title);
  $("#bookId").val(book.id);
  $("#bookAuthor").val(book.author);
  $("#bookCategory").val(book.category);
  $("#bookStatus").val(book.status);
}

function updateBook(event) {
  event.preventDefault();

  const bookId = parseInt(localStorage.getItem("bookToEditId"), 10);
  const books = getBooks();
  const index = books.findIndex(function (item) {
    return item.id === bookId;
  });

  if (index === -1) {
    alert("Book not found.");
    window.location.href = "index.html";
    return;
  }

  books[index] = {
    id: bookId,
    title: $("#bookTitle").val().trim(),
    author: $("#bookAuthor").val().trim(),
    category: $("#bookCategory").val().trim(),
    status: $("#bookStatus").val()
  };

  saveBooks(books);
  localStorage.removeItem("bookToEditId");

  alert("Book updated successfully.");
  window.location.href = "index.html";
}

$(document).ready(function () {
  loadBook();
  $("#editBookForm").on("submit", updateBook);
});