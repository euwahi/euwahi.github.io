// main-content.js - Main content logic (English)
class MainContentComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.initializeContent();
    }

    initializeContent() {
        // Define global search function
        window.performGlobalSearch = () => {
            if (!window.searchState || !window.searchState.performSearch) return;
            
            const searchTerm = window.searchState.performSearch();
            const contentItems = document.querySelectorAll('.content-item');
            let visibleCount = 0;
            
            contentItems.forEach(item => {
                const type = item.getAttribute('data-type');
                
                // Check if passes filter
                const passesFilter = window.searchState.currentFilter === 'all' || 
                                   type === window.searchState.currentFilter;
                
                // Check if passes search
                let passesSearch = true;
                if (searchTerm) {
                    let searchData = '';
                    searchData += item.getAttribute('data-name') + ' ';
                    searchData += item.getAttribute('data-tags') + ' ';
                    
                    const normalizedSearchData = window.searchState.normalizeText ?
                        window.searchState.normalizeText(searchData) :
                        searchData.toLowerCase();
                    
                    passesSearch = normalizedSearchData.includes(searchTerm);
                }
                
                // Show or hide item
                if (passesFilter && passesSearch) {
                    item.classList.remove('hidden');
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Update counter
            if (window.searchState.updateResultsCounter) {
                window.searchState.updateResultsCounter(visibleCount, contentItems.length);
            }
        };
        
        // Initialize download buttons
        this.initializeDownloadButtons();
        this.initializeImageModals();
        
        // Execute initial search
        if (window.performGlobalSearch) {
            window.performGlobalSearch();
        }
    }

    initializeDownloadButtons() {
        const downloadButtons = document.querySelectorAll('.btn-download:not(.btn-itch)');
        
        downloadButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation();
                const imageUrl = button.getAttribute('data-image');
                const filename = button.getAttribute('data-filename');
                this.downloadImage(imageUrl, filename, event);
            });
        });
    }

    initializeImageModals() {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalDownloadBtn = document.getElementById('modalDownload');
        const modalClose = document.querySelector('.modal-close');
        const itemImages = document.querySelectorAll('.content-item img');
        
        // Image preview
        itemImages.forEach(img => {
            img.addEventListener('click', () => {
                const item = img.closest('.content-item');
                const downloadBtn = item.querySelector('.btn-download:not(.btn-itch)');
                const imageUrl = img.src;
                const filename = downloadBtn.getAttribute('data-filename');
                this.openModal(imageUrl, filename);
            });
        });

        // Modal
        if (modalClose) {
            modalClose.addEventListener('click', () => this.closeModal());
        }

        if (modalDownloadBtn) {
            modalDownloadBtn.addEventListener('click', (event) => {
                const imageUrl = modalDownloadBtn.getAttribute('data-image');
                const filename = modalDownloadBtn.getAttribute('data-filename');
                this.downloadImage(imageUrl, filename, event);
            });
        }

        window.addEventListener('click', (event) => {
            if (modal && event.target === modal) {
                this.closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal && modal.style.display === 'block') {
                this.closeModal();
            }
        });
    }

    downloadImage(imageUrl, filename, event) {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = filename;
        link.setAttribute('target', '_blank');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Visual feedback
        const button = event.target.closest('.btn-download');
        if (button) {
            const originalContent = button.innerHTML;
            button.innerHTML = `<i class="fas fa-check"></i> Downloaded!`;
            button.style.backgroundColor = '#2E7D32';
            
            setTimeout(() => {
                button.innerHTML = originalContent;
                button.style.backgroundColor = '';
            }, 2000);
        }
    }

    openModal(imageUrl, filename) {
        const modal = document.getElementById('imageModal');
        const modalImage = document.getElementById('modalImage');
        const modalDownloadBtn = document.getElementById('modalDownload');
        
        if (modal && modalImage && modalDownloadBtn) {
            modalImage.src = imageUrl;
            modalDownloadBtn.setAttribute('data-image', imageUrl);
            modalDownloadBtn.setAttribute('data-filename', filename);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const modal = document.getElementById('imageModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
}

customElements.define('main-content-component', MainContentComponent);
