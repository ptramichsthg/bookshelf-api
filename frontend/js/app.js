// ===========================
// API SERVICE
// ===========================

const API_BASE_URL = 'http://localhost:9000';

/**
 * API Service for communicating with backend
 */
const API = {
    /**
     * Get all books with optional filters
     * @param {Object} filters - Filter parameters
     * @returns {Promise<Array>} - Array of books
     */
    async getBooks(filters = {}) {
        try {
            const params = new URLSearchParams();
            if (filters.name) params.append('name', filters.name);
            if (filters.reading !== undefined && filters.reading !== '') {
                params.append('reading', filters.reading);
            }
            if (filters.finished !== undefined && filters.finished !== '') {
                params.append('finished', filters.finished);
            }

            const url = `${API_BASE_URL}/books${params.toString() ? '?' + params.toString() : ''}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Gagal mengambil data buku');
            }

            const data = await response.json();
            return data.data.books;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    },

    /**
     * Get single book by ID
     * @param {string} id - Book ID
     * @returns {Promise<Object>} - Book object
     */
    async getBookById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${id}`);

            if (!response.ok) {
                throw new Error('Buku tidak ditemukan');
            }

            const data = await response.json();
            return data.data.book;
        } catch (error) {
            console.error('Error fetching book:', error);
            throw error;
        }
    },

    /**
     * Add new book
     * @param {Object} bookData - Book data
     * @returns {Promise<Object>} - Response data
     */
    async addBook(bookData) {
        try {
            const response = await fetch(`${API_BASE_URL}/books`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal menambahkan buku');
            }

            return data;
        } catch (error) {
            console.error('Error adding book:', error);
            throw error;
        }
    },

    /**
     * Update book
     * @param {string} id - Book ID
     * @param {Object} bookData - Updated book data
     * @returns {Promise<Object>} - Response data
     */
    async updateBook(id, bookData) {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal memperbarui buku');
            }

            return data;
        } catch (error) {
            console.error('Error updating book:', error);
            throw error;
        }
    },

    /**
     * Delete book
     * @param {string} id - Book ID
     * @returns {Promise<Object>} - Response data
     */
    async deleteBook(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal menghapus buku');
            }

            return data;
        } catch (error) {
            console.error('Error deleting book:', error);
            throw error;
        }
    }
};

// ===========================
// APPLICATION STATE
// ===========================

const AppState = {
    books: [],
    allBooks: [], // Store all books for statistics
    filters: {
        name: '',
        reading: '',
        finished: ''
    },
    currentBookId: null
};

// ===========================
// CORE FUNCTIONS
// ===========================

/**
 * Load and display all books
 */
async function loadBooks() {
    try {
        showLoading();

        // Get all books (only id, name, publisher)
        const booksListResponse = await API.getBooks();

        // Fetch full details for each book for statistics
        const fullBooksPromises = booksListResponse.map(book => API.getBookById(book.id));
        AppState.allBooks = await Promise.all(fullBooksPromises);

        // Get filtered books list
        const filteredBooksListResponse = await API.getBooks(AppState.filters);

        // Fetch full details for filtered books for display
        if (filteredBooksListResponse.length > 0) {
            const filteredFullBooksPromises = filteredBooksListResponse.map(book => API.getBookById(book.id));
            AppState.books = await Promise.all(filteredFullBooksPromises);
        } else {
            AppState.books = [];
        }

        renderBooks(AppState.books);
        updateStats();
        hideLoading();
    } catch (error) {
        hideLoading();
        showToast('Error', 'Gagal memuat data buku. Pastikan server berjalan.', 'error');
        showEmptyState();
    }
}

/**
 * Calculate and update statistics
 */
function updateStats() {
    const stats = {
        total: AppState.allBooks.length,
        reading: AppState.allBooks.filter(book => book.reading).length,
        finished: AppState.allBooks.filter(book => book.finished).length,
        unread: AppState.allBooks.filter(book => !book.reading && !book.finished).length
    };

    updateStatistics(stats);
}

/**
 * Open add book modal
 */
function openAddBookModal() {
    resetForm('bookForm');
    document.getElementById('modalTitle').textContent = 'Tambah Buku Baru';
    document.getElementById('btnSubmitForm').innerHTML = `
        <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
        Simpan Buku
    `;
    openModal('bookModal');
}

/**
 * Edit book
 * @param {string} bookId - Book ID
 */
async function editBook(bookId) {
    try {
        const book = await API.getBookById(bookId);

        // Populate form
        document.getElementById('bookId').value = book.id;
        document.getElementById('bookName').value = book.name;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookYear').value = book.year;
        document.getElementById('bookPublisher').value = book.publisher;
        document.getElementById('bookSummary').value = book.summary || '';
        document.getElementById('bookPageCount').value = book.pageCount;
        document.getElementById('bookReadPage').value = book.readPage;
        document.getElementById('bookReading').checked = book.reading;

        // Update modal title
        document.getElementById('modalTitle').textContent = 'Edit Buku';
        document.getElementById('btnSubmitForm').innerHTML = `
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Update Buku
        `;

        openModal('bookModal');
    } catch (error) {
        showToast('Error', 'Gagal memuat data buku', 'error');
    }
}

/**
 * Confirm delete book
 * @param {string} bookId - Book ID
 * @param {string} bookTitle - Book title
 */
function confirmDeleteBook(bookId, bookTitle) {
    AppState.currentBookId = bookId;
    document.getElementById('deleteBookTitle').textContent = bookTitle;
    openModal('deleteModal');
}

/**
 * Delete book
 */
async function deleteBook() {
    try {
        await API.deleteBook(AppState.currentBookId);
        closeModal('deleteModal');
        showToast('Berhasil', 'Buku berhasil dihapus', 'success');
        await loadBooks();
    } catch (error) {
        showToast('Error', error.message, 'error');
    }
}

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 */
async function handleFormSubmit(e) {
    e.preventDefault();
    clearFormErrors();

    // Get form data
    const bookId = document.getElementById('bookId').value;
    const name = document.getElementById('bookName').value.trim();
    const author = document.getElementById('bookAuthor').value.trim();
    const year = parseInt(document.getElementById('bookYear').value);
    const publisher = document.getElementById('bookPublisher').value.trim();
    const summary = document.getElementById('bookSummary').value.trim();
    const pageCount = parseInt(document.getElementById('bookPageCount').value);
    const readPage = parseInt(document.getElementById('bookReadPage').value);
    const reading = document.getElementById('bookReading').checked;

    // Validate
    let hasError = false;

    const nameError = validateField('name', name);
    if (nameError) {
        showFormError('name', nameError);
        hasError = true;
    }

    const authorError = validateField('author', author);
    if (authorError) {
        hasError = true;
    }

    const yearError = validateField('year', year);
    if (yearError) {
        hasError = true;
    }

    const publisherError = validateField('publisher', publisher);
    if (publisherError) {
        hasError = true;
    }

    const pageCountError = validateField('pageCount', pageCount);
    if (pageCountError) {
        hasError = true;
    }

    const readPageError = validateField('readPage', readPage, pageCount);
    if (readPageError) {
        showFormError('readPage', readPageError);
        hasError = true;
    }

    if (hasError) {
        showToast('Validasi Gagal', 'Mohon periksa kembali form Anda', 'error');
        return;
    }

    // Prepare data
    const bookData = {
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading
    };

    try {
        if (bookId) {
            // Update existing book
            await API.updateBook(bookId, bookData);
            showToast('Berhasil', 'Buku berhasil diperbarui', 'success');
        } else {
            // Add new book
            await API.addBook(bookData);
            showToast('Berhasil', 'Buku berhasil ditambahkan', 'success');
        }

        closeModal('bookModal');
        await loadBooks();
    } catch (error) {
        showToast('Error', error.message, 'error');
    }
}

/**
 * Handle search input
 */
const handleSearch = debounce(async function () {
    const searchValue = document.getElementById('searchInput').value.trim();
    AppState.filters.name = searchValue;
    await loadBooks();
}, 500);

/**
 * Handle filter change
 */
async function handleFilterChange() {
    AppState.filters.reading = document.getElementById('filterReading').value;
    AppState.filters.finished = document.getElementById('filterFinished').value;
    await loadBooks();
}

// ===========================
// EVENT LISTENERS
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    // Load books on page load
    loadBooks();

    // Add book button
    document.getElementById('btnAddBook').addEventListener('click', openAddBookModal);

    // Modal close buttons
    document.getElementById('btnCloseModal').addEventListener('click', () => closeModal('bookModal'));
    document.getElementById('btnCancelForm').addEventListener('click', () => closeModal('bookModal'));
    document.getElementById('btnCloseDeleteModal').addEventListener('click', () => closeModal('deleteModal'));
    document.getElementById('btnCancelDelete').addEventListener('click', () => closeModal('deleteModal'));

    // Delete confirmation
    document.getElementById('btnConfirmDelete').addEventListener('click', deleteBook);

    // Form submission
    document.getElementById('bookForm').addEventListener('submit', handleFormSubmit);

    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);

    // Filters
    document.getElementById('filterReading').addEventListener('change', handleFilterChange);
    document.getElementById('filterFinished').addEventListener('change', handleFilterChange);

    // Close modal on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', function () {
            const modal = this.parentElement;
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Real-time validation for readPage
    document.getElementById('bookReadPage').addEventListener('input', function () {
        const pageCount = parseInt(document.getElementById('bookPageCount').value);
        const readPage = parseInt(this.value);

        if (readPage > pageCount) {
            showFormError('readPage', 'Halaman dibaca tidak boleh lebih besar dari jumlah halaman');
        } else {
            showFormError('readPage', '');
        }
    });

    document.getElementById('bookPageCount').addEventListener('input', function () {
        const pageCount = parseInt(this.value);
        const readPage = parseInt(document.getElementById('bookReadPage').value);

        if (readPage > pageCount) {
            showFormError('readPage', 'Halaman dibaca tidak boleh lebih besar dari jumlah halaman');
        } else {
            showFormError('readPage', '');
        }
    });
});
