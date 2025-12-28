// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Format date to readable string
 * @param {string} dateString - ISO date string
 * @returns {string} - Formatted date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('id-ID', options);
}

/**
 * Validate form input
 * @param {string} name - Field name
 * @param {any} value - Field value
 * @param {number} pageCount - Total page count (for readPage validation)
 * @returns {string|null} - Error message or null if valid
 */
function validateField(name, value, pageCount = null) {
    switch (name) {
        case 'name':
            if (!value || value.trim() === '') {
                return 'Judul buku tidak boleh kosong';
            }
            break;
        case 'author':
            if (!value || value.trim() === '') {
                return 'Nama penulis tidak boleh kosong';
            }
            break;
        case 'year':
            if (!value) {
                return 'Tahun terbit tidak boleh kosong';
            }
            if (value < 1000 || value > 2100) {
                return 'Tahun terbit tidak valid';
            }
            break;
        case 'publisher':
            if (!value || value.trim() === '') {
                return 'Nama penerbit tidak boleh kosong';
            }
            break;
        case 'pageCount':
            if (!value || value < 1) {
                return 'Jumlah halaman harus lebih dari 0';
            }
            break;
        case 'readPage':
            if (value === null || value === undefined || value === '') {
                return 'Halaman dibaca tidak boleh kosong';
            }
            if (value < 0) {
                return 'Halaman dibaca tidak boleh negatif';
            }
            if (pageCount !== null && value > pageCount) {
                return 'Halaman dibaca tidak boleh lebih besar dari jumlah halaman';
            }
            break;
    }
    return null;
}

/**
 * Sanitize HTML to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Calculate reading progress percentage
 * @param {number} readPage - Pages read
 * @param {number} pageCount - Total pages
 * @returns {number} - Percentage (0-100)
 */
function calculateProgress(readPage, pageCount) {
    if (pageCount === 0) return 0;
    return Math.round((readPage / pageCount) * 100);
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Show element with animation
 * @param {HTMLElement} element - Element to show
 */
function showElement(element) {
    element.style.display = 'block';
    setTimeout(() => {
        element.style.opacity = '1';
    }, 10);
}

/**
 * Hide element with animation
 * @param {HTMLElement} element - Element to hide
 */
function hideElement(element) {
    element.style.opacity = '0';
    setTimeout(() => {
        element.style.display = 'none';
    }, 300);
}

/**
 * Scroll to top of page smoothly
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
