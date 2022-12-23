function Book (title, author, pages, status) {
	this.title = title
	this.author = author
	this.pages = pages
	this.status = status
	this.info = funcion () {
		return (`${title} by ${author}, ${pages} pages, ${status}.`)
	}
}
