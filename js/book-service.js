'use strict'
var gBooks;
const KEY = 'book'


function getDeafultBooks() {
    return [

        {
            id: makeId(),
            title: 'harry - potter',
            price: 100,
            img: 'img/book.png',
            actions: [{ read: false }, { update: false }, { delete: false }],
            rate: 5

        },
        {
            id: makeId(),
            title: 'corona',
            price: 120,
            img: 'img/book.png',
            actions: [{ read: false }, { update: false }, { delete: false }],
            rate: 6

        },
        {
            id: makeId(),
            title: 'worldWar2',
            price: 95,
            img: 'img/book.png',
            actions: [{ read: false }, { update: false }, { delete: false }],
            rate: 7

        }

    ]
}




function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book => {
        return bookId === book.id
    })
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}




function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}



function creataBooks() {

    var books = loadFromStorage(KEY)
    if (!books || !books.length) books = getDeafultBooks()
    gBooks = books;
    _saveBooksToStorage();
}



function _createBook(title, price, imageURL, rate) {
    if (!price) price = getRandomIntInclusive(100, 200)

    return {
        id: makeId(),
        title: title,
        price: price,
        img: `${imageURL}`,
        actions: [{ read: false }, { update: false }, { delete: false }],
        rate: rate

    }
}


function addBook() {
    // service never touch user actions !!!
    var title = prompt('Enter a Book Name ')
    var price = +prompt('Enter Book Price')
    var imageURL = prompt('enter img URL')
    var rate = 0;
    var newBook = _createBook(title, price, imageURL, rate);
    gBooks.unshift(newBook);
    saveToStorage();

}


function updateBook(bookId, price) {
    var catchBook = gBooks.find(book => {
        return bookId === book.id

    })

    catchBook.price = price
    _saveBooksToStorage()

}



function showModal(bookId) {
    // service never touch user actions !!!
    var modal = document.querySelector('.modal');
    var img = document.querySelector('.imgModal');
    var title = document.querySelector('.title')
    var price = document.querySelector('.price')
    var rate = document.querySelector('.rate')
    modal.style.display = 'flex'
    var currBook = gBooks.find(book => {
        return book.id === bookId

    }
    )
    img.innerHTML = `<img src="${currBook.img}" class="inside-img" alt="NO BOOK IMG" />`
    title.innerHTML = `<p class="book-details"> Book Name :${currBook.title} </p>`
    price.innerHTML = `<p class="book-details"> Book Price :${currBook.price} </p>`
    rate.innerHTML = `<p class="book-details"> Book Rate :<button onclick="onClickMinusRate(event , '${currBook.id}')">-</button> <span class="choose-rate">${currBook.rate}</span>   <button onclick="onClickPlusRate(event , '${currBook.id}')">+</button> </p>`
    // console.log('rate' , currBook.rate)
    // console.log('' , currBook)



}



function closeModal() {
    var modal = document.querySelector('.modal');
    console.log('modal', modal)
    modal.style.display = 'none'
}


function RateDown(bookId) {
    var currBook = gBooks.find(book => {
        return book.id === bookId
    })

    if (currBook.rate === 0) {
        currBook.rate = 10;
    } else currBook.rate = currBook.rate - 1;


    var rate = document.querySelector('.choose-rate')
    rate.innerText = currBook.rate

}



function rateUp(bookId) {
    var currBook = gBooks.find(book => {
        return book.id === bookId
    })

    if (currBook.rate === 10) {
        currBook.rate = 0;
    } else currBook.rate = currBook.rate + 1;


    var rate = document.querySelector('.choose-rate')
    rate.innerText = currBook.rate
    saveToStorage('book', gBooks)

}