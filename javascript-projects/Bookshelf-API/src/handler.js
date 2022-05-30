const books = require('./books');
const {nanoid} = require('nanoid');

const addBookHandler = (request, h) => {
    const {name, year, author, summary, publisher, pageCount, readPage, reading} = request.payload;
    const id = nanoid(14);
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    
    if (name.length < 1) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. Mohon isi nama buku'
         })
         response.code(400);
         return response;
    } 
    else if (readPage > pageCount) {
        const response = h.response({
            status : 'fail',
            message : 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400);
        return response;
    }
    
    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, reading, id, finished, updatedAt, insertedAt
    }

    books.push(newBook);

    const book = books.filter((book) => book.id === id);
    const isSuccess = book.length > 0;

    if (isSuccess) {
        const response = h.response({
            status : 'success',
            message : 'Buku berhasil ditambahkan',
            data : {
                bookId : id
            }
        })
        response.code(201);
        return response;
    }

    const response = h.response({
        status : 'fail',
        message : 'Buku gagal ditambahkan'
    })
    response.code(500);
    return response;
};


const getBookHandler = (request, h) => {
    const response = h.response({
        status : 'success',
        data : {
            books,
        }
    });
    response.code(200);
    return response;
}

module.exports = {addBookHandler, getBookHandler};