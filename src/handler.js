const { nanoid } = require('nanoid');
const books = require('./books');

// handler untuk menambahkan buku baru
const addBookHandler = (request, h) => {
    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    // cek dulu apakah client kirim properti name
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    // readPage ga boleh lebih besar dari pageCount
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    // generate id unik
    const id = nanoid(16);
    // cek apakah buku sudah selesai dibaca
    const finished = pageCount === readPage;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;

    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    // cek apakah buku berhasil ditambahkan
    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    // kalau gagal
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
};

// handler untuk mendapatkan semua buku
const getAllBooksHandler = (request, h) => {
    const { name, reading, finished } = request.query;

    let filteredBooks = books;

    // filter berdasarkan nama buku (case insensitive)
    if (name !== undefined) {
        filteredBooks = filteredBooks.filter((book) =>
            book.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    // filter berdasarkan status reading
    if (reading !== undefined) {
        filteredBooks = filteredBooks.filter((book) =>
            book.reading === !!Number(reading)
        );
    }

    // filter berdasarkan status finished
    if (finished !== undefined) {
        filteredBooks = filteredBooks.filter((book) =>
            book.finished === !!Number(finished)
        );
    }

    const response = h.response({
        status: 'success',
        data: {
            books: filteredBooks.map((book) => ({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);
    return response;
};

// handler untuk mendapatkan detail buku berdasarkan id
const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.filter((b) => b.id === bookId)[0];

    // kalau buku ditemukan
    if (book !== undefined) {
        return {
            status: 'success',
            data: {
                book,
            },
        };
    }

    // kalau buku tidak ditemukan
    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);
    return response;
};

// handler untuk mengubah data buku berdasarkan id
const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
    } = request.payload;

    // validasi name
    if (!name) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);
        return response;
    }

    // validasi readPage
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
        });
        response.code(400);
        return response;
    }

    // cari index buku yang mau diupdate
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        const finished = pageCount === readPage;
        const updatedAt = new Date().toISOString();

        books[index] = {
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        };

        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }

    // kalau id tidak ditemukan
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

// handler untuk menghapus buku berdasarkan id
const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    // cari index buku yang mau dihapus
    const index = books.findIndex((book) => book.id === bookId);

    if (index !== -1) {
        // hapus buku dari array
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    // kalau id tidak ditemukan
    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
};
