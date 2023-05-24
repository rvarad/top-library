window.onload = populateDisplay;

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

let myLibrary = [{title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling', pages: '223', status: 'read'}, {title: "Brothers Karamazov", author: 'Fyodor Dostoevsky', pages: '840', status: 'unread'}];

addBookBtn.addEventListener('click', () => {
	let temp = null;
	let title = bookTitle.value;
	let author = bookAuthor.value;
	let pages = bookPages.value;
	let status = enterStatus();
	temp = new Book(title, author, pages, status);
	addBookToLibrary(temp.info());
	populateDisplay();
	console.log(temp);
	event.preventDefault();
	reset();
});

function enterStatus () {
	if (bookStatus.checked) {
		bookStatus.setAttribute('value', 'read');
		return bookStatus.value;
	} else if (!bookStatus.checked) {
		bookStatus.setAttribute('value', 'unread');
		return bookStatus.value;
	} else {
		console.log('error with the change status function.')
	}
}

function reset () {
	bookTitle.value = '';
	bookAuthor.value = '';
	bookPages.value = '';
	bookStatus.checked = false;
	editBookTitle.value = '';
	editBookAuthor.value = '';
	editBookPages.value = '';
}

function Book(title, author, pages, status) {
	this.title = title,
	this.author = author,
	this.pages = pages,
	this.status = status,
	this.info = () => {return {title, author, pages, status} }
};

function addBookToLibrary (x) {
	myLibrary.unshift(x);
	return myLibrary;
}

function populateDisplay () {
	libraryDisplay.innerHTML = null;
	for (let i = 0; i < myLibrary.length; i++) {
		let newCard = createCard(myLibrary[i]);
		libraryDisplay.appendChild(newCard);
		newCard.addEventListener('click', (e) => {
			if (e.target.classList.contains('status')) {
				if (e.target.classList.contains('read')) {
					myLibrary[i].status = 'unread';
					e.target.textContent = 'Unread';
					e.target.classList.remove('read');
					e.target.classList.add('unread');
				} else {
					myLibrary[i].status = 'read';
					e.target.textContent = 'Read';
					e.target.classList.remove('unread');
					e.target.classList.add('read');
				}
			} else if (e.target.classList.contains('remove') || e.target.classList.contains('fa-trash-alt')) {
				myLibrary.splice(i,1);
				libraryDisplay.removeChild(libraryDisplay.children[i])
			} else if (e.target.classList.contains('edit') || e.target.classList.contains('fa-pen-nib')) {
				modalBackdrop.style.visibility = 'visible';
				modalBackdrop.addEventListener('click', (e) => {
					if (e.target !== modal) {
						modalBackdrop.style.visibility = 'hidden';
					}
				})
				editDone.addEventListener('click', () => {
					myLibrary[i].title = editBookTitle.value;
					myLibrary[i].author = editBookAuthor.value;
					myLibrary[i].pages = editBookPages.value;
					newCard = createCard(myLibrary[i]);
					libraryDisplay.replaceChild(newCard, libraryDisplay.childNodes[i]);
					modalBackdrop.style.visibility = 'hidden';
					event.preventDefault();
					reset();	
				})
			}
		})
	};
}

function createCard (x) {
	let card = document.createElement('div');
	card.classList.add('card');
	let title = document.createElement('p');
	title.classList.add('title');
	title.textContent = `"${x.title}"`
	card.appendChild(title);
	let author = document.createElement('p');
	author.classList.add('author');
	author.textContent = x.author
	card.appendChild(author);
	let pages = document.createElement('p')
	pages.classList.add('pages')
	pages.textContent = x.pages + ' Pages'
	card.appendChild(pages)
	let mods = document.createElement('div')
	mods.classList.add('mods');
	let status = document.createElement('button')
	status.classList.add('status')
	if (x.status === 'read') {
		status.textContent = 'Read'
		status.classList.add('read')
	} else {
		status.textContent = 'Unread'
		status.classList.add('unread')
	}
	mods.appendChild(status)
	let remove = document.createElement('button')
	remove.innerHTML = '<i class="fas fa-trash-alt" style="-webkit-text-stroke-width: 0.5px;-webkit-text-stroke-color: black;"></i>'
	remove.classList.add('remove')
	mods.appendChild(remove)
	let edit = document.createElement('button')
	edit.innerHTML = '<i class="fas fa-pen-nib" style="-webkit-text-stroke-width: 0.5px;-webkit-text-stroke-color: black;"></i>'
	edit.classList.add('edit')
	mods.appendChild(edit)
	card.appendChild(mods)
	return card;
}

// window.addEventListener('click', (e) => {
// 	console.log(e.target)
// })