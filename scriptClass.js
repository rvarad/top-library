class Book {
	constructor(_title, _author, _pages, _status) {
		this.title = _title
		this.author = _author
		this.pages = _pages
		this.status = _status
	}
}

class Library {
	constructor() {
		this.books = [{ title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling', pages: '223', status: 'read' }, { title: "Brothers Karamazov", author: 'Fyodor Dostoevsky', pages: '840', status: 'unread' }]
	}

	inLibrary(title) {
		return this.books.some(book => book.title === title)
	}

	addBook(newBook) {
		this.inLibrary(newBook.title) ? console.log("book in Library") : this.books.unshift(newBook)
	}

	removeBook(title) {
		this.books = this.books.filter(book => book.title !== title)
	}

	getBook(title) {
		return this.books.find(book => book.title === title)
	}

	editBook(title, edits) {
		let oldBook = this.getBook(title)
		oldBook.title = edits.title
		oldBook.author = edits.author
		oldBook.pages = edits.pages
		oldBook.status = edits.status ? edits.status : "unread";
	}
}

const myLibrary = new Library();

let bookTitle = document.querySelector('#bookTitle');
let bookAuthor = document.querySelector('#bookAuthor');
let bookPages = document.querySelector('#bookPages');
let bookStatus = document.querySelector('#bookStatus');
let addBookBtn = document.querySelector('#submitForm');
let libraryDisplay = document.querySelector('.display');
let statusButtons;
let modalBackdrop = document.querySelector('.modal-backdrop');
let modal = document.querySelector('.modal');
let editBookTitle = document.querySelector('#edit-bookTitle');
let editBookAuthor = document.querySelector('#edit-bookAuthor');
let editBookPages = document.querySelector('#edit-bookPages');
let editDone = document.querySelector('#edit-submitForm');

function createCard(book) {
	let card = document.createElement('div');
	card.classList.add('card');

	let title = document.createElement('p');
	title.classList.add('title');
	title.textContent = `"${book.title}"`;

	let author = document.createElement('p');
	author.classList.add('author');
	author.textContent = book.author;

	let pages = document.createElement('p');
	pages.classList.add('pages');
	pages.textContent = book.pages + ' Pages';

	let mods = document.createElement('div');
	mods.classList.add('mods');

	let status = document.createElement('button');
	status.classList.add('status');
	if (book.status === 'read') {
		status.textContent = 'Read';
		status.classList.add('read');
	} else {
		status.textContent = 'Unread';
		status.classList.add('unread');
	};
	status.addEventListener('click', () => {
		let temp = {}
		temp.title = book.title
		temp.author = book.author
		temp.pages = book.pages
		if (book.status === "read") {
			temp.status = "unread"
		} else {
			temp.status = "read"
		}
		myLibrary.editBook(book.title, temp)
		populateDisplay()
	})

	let remove = document.createElement('button');
	remove.innerHTML = '<i class="fas fa-trash-alt" style="-webkit-text-stroke-width: 0.5px; -webkit-text-stroke-color: black"></i>';
	remove.classList.add('remove');
	remove.addEventListener('click', () => {
		// console.log('clicked')
		myLibrary.removeBook(book.title)
		populateDisplay()
	})

	let edit = document.createElement('button');
	edit.innerHTML = '<i class="fas fa-pen-nib" style="-webkit-text-stroke-width: 0.5px; -webkit-text-stroke-color: black"></i>';
	edit.classList.add('edit');
	edit.addEventListener('click', () => {
		modalBackdrop.style.visibility = 'visible';
		modalBackdrop.addEventListener('click', (e) => {
			if (e.target !== modal && e.target === modalBackdrop) {
				modalBackdrop.style.visibility = 'hidden';
			};
		})
		editBookTitle.value = book.title
		editBookAuthor.value = book.author
		editBookPages.value = book.pages
		editDone.addEventListener('click', () => {
			event.preventDefault()
			let temp = {}
			temp.title = editBookTitle.value
			temp.author = editBookAuthor.value
			temp.pages = editBookPages.value
			myLibrary.editBook(book.title, temp)
			populateDisplay()
			modalBackdrop.style.visibility = 'hidden';
			// reset();
		})
	})

	mods.append(status, remove, edit);
	card.append(title, author, pages, mods);
	return card;
}

function populateDisplay() {
	libraryDisplay.innerHTML = null;
	myLibrary.books.forEach(book => {
		libraryDisplay.append(createCard(book))
	});
}

function reset() {
	bookTitle.value = '';
	bookAuthor.value = '';
	bookPages.value = '';
	bookStatus.checked = false;
	editBookTitle.value = '';
	editBookAuthor.value = '';
	editBookPages.value = '';
};

addBookBtn.addEventListener('click', () => {
	event.preventDefault();
	let temp = null;
	let title = bookTitle.value;
	let author = bookAuthor.value;
	let pages = bookPages.value;
	let status = bookStatus.checked ? "read" : "unread";
	temp = new Book(title, author, pages, status);
	myLibrary.addBook(temp);
	populateDisplay();
	reset();
});

populateDisplay()