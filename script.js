let bookTitle = document.querySelector('#bookTitle');
let bookAuthor = document.querySelector('#bookAuthor');
let bookPages = document.querySelector('#bookPages');
let bookStatus = document.querySelector('#bookStatus');
let addBookBtn = document.querySelector('#submitForm');
let libraryDisplay = document.querySelector('.display');

let myLibrary = [];

addBookBtn.addEventListener('click', () => {
	let temp = '';
	let title = bookTitle.value;
	let author = bookAuthor.value;
	let pages = bookPages.value;
	let status = bookStatus.value;
	temp = new Book(title, author, pages, status);
	addBookToLibrary(temp.info());
	populateDisplay();
	console.log(temp);
	event.preventDefault();
	reset();
});

function reset () {
	bookTitle.value = '';
	bookAuthor.value = '';
	bookPages.value = '';
	bookStatus.value = '';
}

function Book(title, author, pages, status) {
	this.title = title,
	this.author = author,
	this.pages = pages,
	this.status = status,
	this.info = () => {return {title, author, pages, status} }
};

function addBookToLibrary (x) {
	myLibrary.push(x)
	return myLibrary;
}

function populateDisplay () {
	libraryDisplay.innerHTML = null;
	for (let i = 0; i < myLibrary.length; i++) {
		let card = document.createElement('div')
		card.textContent = `${myLibrary[i].title} by ${myLibrary[i].author}, ${myLibrary[i].pages} pages, ${myLibrary[i].status}.`;
		libraryDisplay.appendChild(card);
	};
}