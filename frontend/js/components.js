// ===========================
// UI COMPONENTS
// ===========================

/**
 * Create a book card element
 * @param {Object} book - Book data
 * @returns {HTMLElement} - Book card element
 */
function createBookCard(book) {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 animate-fade-in';
    card.dataset.bookId = book.id;

    const progress = calculateProgress(book.readPage, book.pageCount);
    const gradients = [
        'from-indigo-500 to-purple-600',
        'from-purple-500 to-pink-600',
        'from-blue-500 to-cyan-600',
        'from-emerald-500 to-teal-600',
        'from-amber-500 to-orange-600',
        'from-rose-500 to-pink-600',
    ];
    const gradient = gradients[book.name.length % gradients.length];

    // Build badges
    let badges = '';
    if (book.reading) {
        badges += `
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Sedang Dibaca
            </span>
        `;
    }
    if (book.finished) {
        badges += `
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Selesai
            </span>
        `;
    }

    card.innerHTML = `
        <div class="h-40 bg-gradient-to-br ${gradient} flex items-center justify-center">
            <svg class="w-20 h-20 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
        </div>
        <div class="p-5">
            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">${sanitizeHTML(book.name)}</h3>
            
            <div class="space-y-1.5 mb-3 text-sm text-gray-600">
                <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    ${sanitizeHTML(book.author)}
                </div>
                <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    ${sanitizeHTML(book.publisher)}
                </div>
                <div class="flex items-center">
                    <svg class="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    ${book.year}
                </div>
            </div>
            
            ${badges ? `<div class="flex flex-wrap gap-2 mb-3">${badges}</div>` : ''}
            
            <div class="mb-4">
                <div class="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span class="font-medium">${book.readPage} / ${book.pageCount} halaman</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div class="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500" style="width: ${progress}%"></div>
                </div>
            </div>
            
            <div class="flex gap-2">
                <button onclick="editBook('${book.id}')" class="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                    </svg>
                    Edit
                </button>
                <button onclick="confirmDeleteBook('${book.id}', '${sanitizeHTML(book.name).replace(/'/g, "\\'")}'" class="flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200">
                    <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                    Hapus
                </button>
            </div>
        </div>
    `;

    return card;
}

/**
 * Show toast notification
 * @param {string} title - Toast title
 * @param {string} message - Toast message
 * @param {string} type - Toast type (success, error, warning)
 */
function showToast(title, message, type = 'success') {
    const container = document.getElementById('toastContainer');

    const toast = document.createElement('div');
    const colors = {
        success: 'bg-white border-l-4 border-emerald-500',
        error: 'bg-white border-l-4 border-red-500',
        warning: 'bg-white border-l-4 border-amber-500'
    };

    const icons = {
        success: `<svg class="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>`,
        error: `<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>`,
        warning: `<svg class="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>`
    };

    toast.className = `${colors[type]} shadow-lg rounded-lg p-4 max-w-sm w-full animate-slide-in-right`;

    toast.innerHTML = `
        <div class="flex items-start">
            <div class="flex-shrink-0">
                ${icons[type]}
            </div>
            <div class="ml-3 flex-1">
                <p class="text-sm font-medium text-gray-900">${sanitizeHTML(title)}</p>
                <p class="mt-1 text-sm text-gray-600">${sanitizeHTML(message)}</p>
            </div>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-500">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
            </button>
        </div>
    `;

    container.appendChild(toast);

    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentElement) {
                container.removeChild(toast);
            }
        }, 300);
    }, 4000);
}

/**
 * Show loading state
 */
function showLoading() {
    document.getElementById('loadingState').classList.remove('hidden');
    document.getElementById('booksGrid').classList.add('hidden');
    document.getElementById('emptyState').classList.add('hidden');
}

/**
 * Hide loading state
 */
function hideLoading() {
    document.getElementById('loadingState').classList.add('hidden');
}

/**
 * Show empty state
 */
function showEmptyState() {
    document.getElementById('emptyState').classList.remove('hidden');
    document.getElementById('booksGrid').classList.add('hidden');
}

/**
 * Show books grid
 */
function showBooksGrid() {
    document.getElementById('booksGrid').classList.remove('hidden');
    document.getElementById('emptyState').classList.add('hidden');
}

/**
 * Open modal
 * @param {string} modalId - Modal element ID
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

/**
 * Close modal
 * @param {string} modalId - Modal element ID
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

/**
 * Reset form
 * @param {string} formId - Form element ID
 */
function resetForm(formId) {
    const form = document.getElementById(formId);
    form.reset();

    // Clear error messages
    const errors = form.querySelectorAll('.text-red-600');
    errors.forEach(error => error.textContent = '');

    // Clear hidden ID field
    const idField = form.querySelector('#bookId');
    if (idField) idField.value = '';
}

/**
 * Show form error
 * @param {string} fieldId - Field ID
 * @param {string} message - Error message
 */
function showFormError(fieldId, message) {
    const errorElement = document.getElementById(`error${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)}`);
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Clear form errors
 */
function clearFormErrors() {
    const errors = document.querySelectorAll('.text-red-600');
    errors.forEach(error => error.textContent = '');
}

/**
 * Update statistics display
 * @param {Object} stats - Statistics object
 */
function updateStatistics(stats) {
    document.getElementById('statTotal').textContent = stats.total;
    document.getElementById('statReading').textContent = stats.reading;
    document.getElementById('statFinished').textContent = stats.finished;
    document.getElementById('statUnread').textContent = stats.unread;
}

/**
 * Render books to grid
 * @param {Array} books - Array of book objects
 */
function renderBooks(books) {
    const grid = document.getElementById('booksGrid');
    grid.innerHTML = '';

    if (books.length === 0) {
        showEmptyState();
        return;
    }

    showBooksGrid();
    books.forEach(book => {
        const card = createBookCard(book);
        grid.appendChild(card);
    });
}
