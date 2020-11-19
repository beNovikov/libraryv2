let myLibrary = [];

function createBook() {
  let title = document.querySelector('#title').value;
  let author = document.querySelector('#author').value;
  let description = document.querySelector('#description').value;
  let pages = document.querySelector('#pages').value;
  let isRead = document.querySelector('#isRead').checked;
  return { title, author, description, pages, isRead };
}

function createBookDOM(book) {
  /* Select container to append book's info and create book container */

  let container = document.querySelector('#book-list');
  let bookContainer = document.createElement('div');
  bookContainer.classList.add('book-card');

  /* Get book info (title, author, etc.) */

  let title = book.title;
  let author = book.author;
  let description = book.description;
  let pages = book.pages;
  let isRead = book.isRead;

  /* Create DOM element for each of book's values (title, author, etc.) */
  let titleDOM = document.createElement('h3');
  titleDOM.textContent = `«${title}»`;

  let authorDOM = document.createElement('p');
  authorDOM.textContent = `by ${author}`;

  let descriptionTitleDOM = document.createElement('p');
  descriptionTitleDOM.textContent = 'Description: \n';
  let descriptionDOM = document.createElement('p');
  descriptionDOM.textContent = description;

  let pagesDOM = document.createElement('p');
  pagesDOM.textContent = `Number of pages:`;
  let numbeOfPagesDOM = document.createElement('p');
  numbeOfPagesDOM.textContent = pages;

  let isReadDOM = document.createElement('p');
  isReadDOM.textContent =
    isRead === true
      ? 'I have read that book!'
      : "I haven't read that book, yet!";
  let markReadDOM = document.createElement('a');
  markReadDOM.classList.add('mark-read');
  isRead
    ? markReadDOM.classList.add('unread')
    : markReadDOM.classList.add('read');
  markReadDOM.textContent = isRead === true ? 'Mark as unread' : 'Mark as read';
  /* Add delete button to delete book */

  let deleteDOM = document.createElement('a');
  deleteDOM.classList.add('delete-btn');
  deleteDOM.textContent = 'Delete book';

  /* Append book values DOM to the book container */

  bookContainer.appendChild(titleDOM);
  bookContainer.appendChild(authorDOM);
  bookContainer.appendChild(descriptionTitleDOM);
  bookContainer.appendChild(descriptionDOM);
  bookContainer.appendChild(pagesDOM);
  bookContainer.appendChild(numbeOfPagesDOM);
  bookContainer.appendChild(isReadDOM);
  bookContainer.appendChild(markReadDOM);
  bookContainer.appendChild(deleteDOM);
  /* Append book container to the page */

  container.appendChild(bookContainer);
  changeMarkStatus();
  removeBookFromDOM();
}

function addBookToLibrary(book) {
  myLibrary.append(book);
}

function deleteBookFromLibrary(book) {
  let bookIndex = myLibrary.indexOf(book);
  myLibrary.splice(bookIndex, 1);
}

function renderLibrary() {
  /* Select book container */
  let bookContainer = document.querySelector('#book-list');
  /* Clear its content */
  bookContainer.innerHTML = '';
  /* Render page with all the books */
  myLibrary.forEach((book) => {
    createBookDOM(book);
  });
}

(function addBook() {
  let submitBtn = document.querySelector('#submit-button');
  submitBtn.addEventListener('click', () => {
    let book = createBook();
    createBookDOM(book);
  });
})();

function changeMarkStatus() {
  let marks = document.querySelectorAll('.mark-read');
  console.log(marks);
  marks.forEach((mark) => {
    mark.addEventListener('click', () => {
      if (mark.classList.contains('read')) {
        mark.previousSibling.textContent = 'I have read that book!';
        mark.textContent = 'Mark as unread';
        mark.classList.remove('read');
        mark.classList.add('unread');
      } else {
        mark.previousSibling.textContent = "I haven't read that book, yet!";
        mark.textContent = 'Mark as read';
        mark.classList.remove('unread');
        mark.classList.add('read');
      }
    });
  });
}

function removeBookFromDOM() {
  let books = document.querySelectorAll('.book-card');
  books.forEach((book) => {
    book.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('delete-btn')) {
        book.remove();
        deleteBookFromLibrary(book);
      }
    });
  });
}
