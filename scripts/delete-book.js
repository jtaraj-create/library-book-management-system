function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function loadBookInfo() {
  const bookId = parseInt(localStorage.getItem("bookToDeleteId"), 10);

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

  $("#infoTitle").text(book.title);
  $("#infoId").text(book.id);
  $("#infoAuthor").text(book.author);
  $("#infoCategory").text(book.category);
  $("#infoStatus").text(book.status);
}

function deleteBookRecord() {
  const bookId = parseInt(localStorage.getItem("bookToDeleteId"), 10);
  const books = getBooks().filter(function (item) {
    return item.id !== bookId;
  });

  saveBooks(books);
  localStorage.removeItem("bookToDeleteId");

  alert("Book deleted successfully.");
  window.location.href = "index.html";
}

$(document).ready(function () {
  loadBookInfo();
  $("#confirmDeleteBtn").on("click", deleteBookRecord);
});