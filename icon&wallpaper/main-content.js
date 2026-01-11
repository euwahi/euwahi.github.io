// main-content.js - Lógica principal do conteúdo
class MainContentComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // O conteúdo HTML será injetado pelo index.html
        // Esta classe apenas gerencia a lógica
        this.initializeContent();
    }

    initializeContent() {
        // Definir função global de busca
        window.performGlobalSearch = () => {
            if (!window.searchState || !window.searchState.performSearch) return;
            
            const searchTerm = window.searchState.performSearch();
            const contentItems = document.querySelectorAll('.content-item');
            let visibleCount = 0;
            
            contentItems.forEach(item => {
                const type = item.getAttribute('data-type');
                
                // Verifica se passa no filtro
                const passesFilter = window.searchState.currentFilter === 'all' || 
                                   type === window.searchState.currentFilter;
                
                // Verifica se passa na busca
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
                
                // Mostra ou esconde o item
                if (passesFilter && passesSearch) {
                    item.classList.remove('hidden');
                    visibleCount++;
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Atualizar contador
            if (window.searchState.updateResultsCounter) {
                window.searchState.updateResultsCounter(visibleCount, contentItems.length);
            }
        };
        
        // Inicializar download buttons
        this.initializeDownloadButtons();
        this.initializeImageModals();
        
        // Executar busca inicial
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
        
        // Visualização de imagem
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
        
        // Feedback visual
        const button = event.target.closest('.btn-download');
        if (button) {
            const originalContent = button.innerHTML;
            button.innerHTML = `<i class="fas fa-check"></i> Baixado!`;
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
