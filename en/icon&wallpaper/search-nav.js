// search-nav.js - Search and filters component (English)
class SearchNavComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="nav-section">
                <div class="nav-content">
                    <!-- Top row: buttons + search -->
                    <div class="nav-top-row">
                        <div class="main-nav">
                            <a href="https://lacosprofanos.com.br/en/" target="_blank" class="main-nav-btn">
                                <i class="fas fa-home"></i>
                                <span>Main Site</span>
                            </a>
                            <a href="https://lacosprofanos.fandom.com/" target="_blank" class="main-nav-btn">
                                <i class="fas fa-book"></i>
                                <span>Wiki</span>
                            </a>
                        </div>
                        
                        <div class="search-box">
                            <input type="text" class="search-input" id="search-input" placeholder="Search wallpapers and icons...">
                            <button class="search-btn" id="search-btn">
                                <i class="fas fa-search"></i>
                                <span>Search</span>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Filters -->
                    <div class="filters">
                        <button class="filter-btn active" data-filter="all">All</button>
                        <button class="filter-btn" data-filter="wallpaper">Wallpapers</button>
                        <button class="filter-btn" data-filter="icon">Icons</button>
                    </div>
                    
                    <!-- Results counter -->
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
        
        // These variables will be shared with main.js
        window.searchState = {
            currentFilter: 'all',
            currentSearch: '',
            updateResultsCounter: this.updateResultsCounter.bind(this),
            performSearch: this.performSearch.bind(this)
        };

        // Event listeners for search
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

        // Event listeners for filters
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filterType = button.getAttribute('data-filter');
                this.applyFilter(filterType);
            });
        });
    }

    // Function to normalize text
    normalizeText(text) {
        return text
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^\w\s]/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    // Function to apply filter
    applyFilter(filterType) {
        window.searchState.currentFilter = filterType;
        
        // Update active buttons
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

    // Function to update results counter
    updateResultsCounter(visibleItems, totalItems) {
        const resultsCounter = this.querySelector('#results-counter');
        const noResults = document.getElementById('no-results');
        
        if (visibleItems === 0) {
            if (noResults) noResults.style.display = 'block';
            if (resultsCounter) resultsCounter.textContent = '';
        } else {
            if (noResults) noResults.style.display = 'none';
            if (resultsCounter) resultsCounter.textContent = `Showing ${visibleItems} of ${totalItems} items`;
        }
    }

    // Search function (called by main.js)
    performSearch() {
        const searchInput = this.querySelector('#search-input');
        const searchTerm = this.normalizeText(searchInput.value);
        window.searchState.currentSearch = searchInput.value;
        
        // Return normalized search term
        return searchTerm;
    }
}

customElements.define('search-nav-component', SearchNavComponent);
