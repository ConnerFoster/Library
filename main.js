//Array holding Book objects
let bookArray = [];

//Book constructor
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//Prototype Functions
Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${
    this.pages
  } pages, ${this.readString()}`;
};

Book.prototype.readString = function () {
  if (this.read === true) {
    return "Read";
  } else {
    return "Not Read";
  }
};

const addBookBtn = document.querySelector(".addbook");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-button");
const titleBox = document.querySelector("#title");
const authorBox = document.querySelector("#author");
const pagesBox = document.querySelector("#pages");
const checkbox = document.querySelector("#read");
const submitBtn = document.querySelector(".sub");
const bookCtr = document.querySelector(".booksContainer");
let titleIn, authorIn, pagesIn, readIn;
let removeButtons, i;

//Trigger Modal Form
addBookBtn.addEventListener("click", toggleModal);
closeModalBtn.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("show-modal");
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    toggleModal();
  }
});

//Create book with form info when submitted
submitBtn.addEventListener("click", (e) => {
  titleIn = titleBox.value;
  authorIn = authorBox.value;
  pagesIn = pagesBox.value;
  readIn = checkbox.checked;

  if (titleIn && authorIn && pagesIn) {
    bookArray.push(new Book(titleIn, authorIn, pagesIn, readIn));

    toggleModal();

    titleBox.value = "";
    authorBox.value = "";
    pagesBox.value = "";
    checkbox.checked = false;

    displayBooks();
  }
});

//Render books onto the page
function displayBooks() {
  clearContainer(bookCtr);
  bookArray.forEach((book, index) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("book");
    let titleText = document.createElement("h3");
    titleText.textContent = `"${book.title}"`;
    newDiv.appendChild(titleText);
    let authorText = document.createElement("h3");
    authorText.textContent = book.author;
    newDiv.appendChild(authorText);
    let pageText = document.createElement("h3");
    pageText.textContent = `${book.pages} pages`;
    newDiv.appendChild(pageText);
    let readBtn = document.createElement("button");
    readBtn.textContent = book.readString();
    if (book.read === true) {
      readBtn.classList.add("read-btn");
    } else {
      readBtn.classList.add("not-read-btn");
    }
    readBtn.addEventListener("click", () => {
      if (book.read === true) {
        book.read = false;
      } else {
        book.read = true;
      }
      displayBooks();
    });
    newDiv.appendChild(readBtn);
    let removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove");
    removeBtn.addEventListener("click", () => {
      bookArray.splice(index, 1);
      store();
      displayBooks();
    });
    removeBtn.setAttribute("bookIndex", index);
    newDiv.appendChild(removeBtn);

    bookCtr.appendChild(newDiv);

    store();
  });
}

//Clear div holding books
function clearContainer(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

//Local Storage setup and retrieval
function store() {
  localStorage.setItem("arr", JSON.stringify(bookArray));
}

window.addEventListener("load", () => {
  if (localStorage.getItem("arr") != null) {
    let temp = JSON.parse(localStorage.getItem("arr"));
    for (item of temp) {
      let book = new Book(item.title, item.author, item.pages, item.read);
      bookArray.push(book);
    }
    displayBooks();
  }
});
