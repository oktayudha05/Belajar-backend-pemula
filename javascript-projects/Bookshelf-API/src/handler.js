const books = require('./books') 
const {nanoid} = require('nanoid') 

const addBookHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload 
    const id = nanoid(14) 
    const finished = pageCount === readPage 
    const insertedAt = new Date().toISOString() 
    const updatedAt = insertedAt 
    
    if (name == false) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku'
         })
         response.code(400) 
         return response 
    } 
    else if (readPage > pageCount) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400) 
        return response 
    }
    
    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, updatedAt, insertedAt
    }

    books.push(newBook) 

    const book = books.filter((book) => book.id === id) 
    const isSuccess = book.length > 0 

    if (isSuccess) {
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil ditambahkan',
            data : {
                bookId : id
            }
        })
        response.code(201) 
        return response 
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku gagal ditambahkan'
    })
    response.code(500) 
    return response 
} 


const getBookHandler = (request, h) => {
    let name = request.query.name 
    const reading = request.query.reading 
    const finished = request.query.finished 

    if (name) {
        name = name.toLowerCase().replace(/["]+/g, '') 
        const book = books.filter((n) => n.name.includes(name)) 
        const response = h.response({
            status : 'success',
            data : {
                book,
            }
        }) 
        response.code(200) 
        return response 
    }

    if (reading == 0) {
        const book = books.filter((n) => n.reading == false) 
        const response = h.response({
            status : 'success',
            data : {
                book,
            }
        }) 
        response.code(200) 
        return response 
    } else if (reading == 1) {
        const book = books.filter((n) => n.reading == true) 
        const response = h.response({
            status : 'success',
            data : {
                book,       
            }
        }) 
        response.code(200) 
        return response 
    }

    if (finished == 0) {
        const book = books.filter((n) => n.finished == false) 
        const response = h.response({
            status : 'success',
            data : {
                book,
            }
        }) 
        response.code(200) 
        return response 
    } else if (finished == 1) {
        const book = books.filter((n) => n.finished == true) 
        const response = h.response({
            status : 'success',
            data : {
                book,
            }
        }) 
        response.code(200) 
        return response 
    }

    else {
        console.log(books);
        const response = h.response({
            status : 'success',
            data : {
                books,
            }
        })
        response.code(200)
        return response
    }
} 

const getBookHandlerById = (request, h) => {
    const {bookId} = request.params 
    
    const book = books.filter((n) => n.id === bookId)[0] 

    
    if (book !== undefined) {
        const response = h.response({
            status : 'success',
            data : {
                book
            }
        }) 
        response.code(200) 
        return response 
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku tidak ditemukan'
    }) 
    response.code(404) 
    return response 
}

const updateBook = (request, h) => {
    const {bookId} = request.params
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload
    const updateAt = new Date().toISOString()
    const index = books.findIndex((book) => book.id === bookId)
    
    if (name == false) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }
    
    else if (readPage > pageCount) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
    }
    
     if (index !== -1) {
        books[index] = {
            ...books[index],
            name, 
            year, 
            author, 
            summary, 
            publisher, 
            pageCount, 
            readPage, 
            reading, 
            updateAt,
        }
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil diperbarui'
        })
        console.log(books[index]);
        response.code(200)
        return response
    }

    const response = h.response({
        status : 'fail',
        message : 'Gagal memperbarui buku. Id tidak ditemukan'
    })
    response.code(404)
    return response
}

const deleteBookById = (request, h) => {
    const {bookId} = request.params
    const index = books.findIndex((book) => book.id === bookId)
    
    if (index !== -1) {
        books.splice((index, 1))

        const response = h.response({
            status : 'success',
            messge : 'Buku berhasil dihapus'
        })
        response.code(200)
        return response
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku gagal dihapus. Id tidak ditemukan'
    })
    response.code(404)
    return response
}

module.exports = {addBookHandler, getBookHandler, getBookHandlerById, updateBook, deleteBookById} 