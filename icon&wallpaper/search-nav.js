// search-nav.js - Componente da barra de pesquisa e filtros
class SearchNavComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="nav-section">
                <div class="nav-content">
                    <!-- Linha superior: barra de pesquisa -->
                    <div class="nav-top-row">
                        <div class="search-box">
                            <input type="text" class="search-input" id="search-input" placeholder="Pesquisar wallpapers e ícones...">
                            <button class="search-btn" id="search-btn">
                                <i class="fas fa-search"></i>
                                <span>Buscar</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Filtros -->
                    <div class="filters">
                        <button class="filter-btn active" data-filter="all">Todos</button>
                        <button class="filter-btn" data-filter="wallpaper">Wallpapers</button>
                        <button class="filter-btn" data-filter="icon">Ícones</button>
                    </div>
                    
                    <!-- Contador de resultados -->
                    <div class="results-counter" id="results-counter"></div>
                </div>
            </div>
            <div class="nav-spacer"></div>
        `;
        
        this.initializeSearch();
    }

    initializeSearch() {
        const searchInput = this.querySelector('#search-input');
        const searchBtn = this.querySelector('#search-btn');
        const filterButtons = this.querySelectorAll('.filter-btn');
        const resultsCounter = this.querySelector('#results-counter');
        
        // Estas variáveis serão compartilhadas com o main.js
        window.searchState = {
            currentFilter: 'all',
            currentSearch: '',
            updateResultsCounter: this.updateResultsCounter.bind(this),
            performSearch: this.performSearch.bind(this)
        };

        // Event listeners para busca
        searchBtn.addEventListener('click', () => {
            if (window.performGlobalSearch) {
                window.performGlobalSearch();
            }
        });
        
        searchInput.addEventListener('keyup', (event) => {
            if (event.key === 'Enter' && window.performGlobalSearch) {
                window.performGlobalSearch();
            }
            if (window.performGlobalSearch) {
                window.performGlobalSearch();
            }
        });

        // Event listeners para filtros
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterType = button.getAttribute('data-filter');
                this.applyFilter(filterType);
            });
        });
    }

    // Função para normalizar texto
    normalizeText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Função para aplicar filtro
    applyFilter(filterType) {
        window.searchState.currentFilter = filterType;
        
        // Atualizar botões ativos
        const filterButtons = this.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === filterType) {
                btn.classList.add('active');
            }
        });
        
        if (window.performGlobalSearch) {
            window.performGlobalSearch();
        }
    }

    // Função para atualizar contador de resultados
    updateResultsCounter(visibleItems, totalItems) {
        const resultsCounter = this.querySelector('#results-counter');
        const noResults = document.getElementById('no-results');
        
        if (visibleItems === 0) {
            if (noResults) noResults.style.display = 'block';
            if (resultsCounter) resultsCounter.textContent = '';
        } else {
            if (noResults) noResults.style.display = 'none';
            if (resultsCounter) resultsCounter.textContent = `Mostrando ${visibleItems} de ${totalItems} itens`;
        }
    }

    // Função de busca (chamada pelo main.js)
    performSearch() {
        const searchInput = this.querySelector('#search-input');
        const searchTerm = this.normalizeText(searchInput.value);
        window.searchState.currentSearch = searchInput.value;
        
        // Retorna o termo de busca normalizado
        return searchTerm;
    }
}

customElements.define('search-nav-component', SearchNavComponent);
