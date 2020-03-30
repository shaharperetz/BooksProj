
function onInit() {
    creataBooks()
    renderBooks()
}




function renderBooks() {
    var books = gBooks
    var strHTMLs = books.map(book => {
        return `<tr">
<td style="display: none;">${book.id}</td>
<td>${book.title}</td>
<td>${book.price}</td>
<td><button class="blue" onclick="onShowModal('${book.id}' , event)">Read</button></td>
<td><button class="orange" onclick="onUpdateBook('${book.id}')">Update</button></td>
<td><button class="red" onclick="onRemoveBook('${book.id}')">Delete</button></td>
</tr>`

    })
    document.querySelector('.tbody').innerHTML = strHTMLs.join('')

}


function onRemoveBook(bookId) {
    removeBook(bookId)
    renderBooks()

}


function onAddBook() {
    addBook();
    renderBooks();
}

function onUpdateBook(bookId) {
    var price = prompt('set new price')
    updateBook(bookId, price);
    renderBooks();
}


function onShowModal(bookId, event) {
    showModal(bookId);
    event.stopPropagation()
    renderBooks();
}

function onClickMinusRate(event, bookId) {
    event.stopPropagation();
    RateDown(bookId)


}

function onClickPlusRate(event , bookId){
    event.stopPropagation()
    rateUp(bookId)
}
