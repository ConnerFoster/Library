let bookArray = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${
    this.pages
  } pages, ${this.readString()}`;
};

Book.prototype.readString = function () {
  if (this.read === true) {
    return "already read";
  } else {
    return "not read yet";
  }
};
const bro = new Book("Hobbit", "JRR TOLKIEN", "123", true);
console.log(bro.info());

const addBookBtn = document.querySelector(".addbook");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-button");

addBookBtn.addEventListener("click", toggleModal);

closeModalBtn.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("show-modal");
}
