function getBooks() {
  return JSON.parse(localStorage.getItem("books")) || [];
}

function saveBooks(books) {
  localStorage.setItem("books", JSON.stringify(books));
}

function generateBookId() {
  const books = getBooks();
  const existingIds = books.map(function (book) {
    return book.id;
  });

  let newId;

  do {
    newId = Math.floor(Math.random() * 9000) + 1000;
  } while (existingIds.includes(newId));

  return newId;
}

function addBook(event) {
  event.preventDefault();

  const title = $("#bookTitle").val().trim();
  const author = $("#bookAuthor").val().trim();
  const category = $("#bookCategory").val().trim();
  const status = $("#bookStatus").val();

  const newBook = {
    id: generateBookId(),
    title: title,
    author: author,
    category: category,
    status: status
  };

  const books = getBooks();
  books.push(newBook);
  saveBooks(books);

  alert("Book added successfully.");
  window.location.href = "index.html";
}

$(document).ready(function () {
  $("#addBookForm").on("submit", addBook);
});