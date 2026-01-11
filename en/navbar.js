// navbar.js - Navigation Component
class NavbarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="container header-content">
                    <div class="logo"><span id="site-title">Profane Bonds</span></div>
                    
                    <div class="language-selector">
                        <span id="language-label">Language:</span>
                        <select id="language-select">
                            <option value="en">English</option>
                            <option value="pt">Português (BR)</option>
                        </select>
                    </div>
                    
                    <div class="nav-buttons">
                        <a href="https://lacosprofanos.com.br/en/icon&wallpaper/" target="_blank" class="nav-btn">
                            <i class="fas fa-image"></i>
                            <span>Wallpapers & Icons</span>
                        </a>
                        <a href="https://lacosprofanos.blogspot.com/" target="_blank" class="nav-btn">
                            <i class="fas fa-blog"></i>
                            <span>Blog</span>
                        </a>
                        <a href="https://profanebonds.fandom.com/wiki/" target="_blank" class="nav-btn">
                            <i class="fas fa-book"></i>
                            <span>Wiki</span>
                        </a>
                    </div>
                    
                    <div class="footer-links">
                        <a href="https://lacosprofanos.com.br/tos" target="_blank" class="footer-link">Terms of Service</a>
                    </div>
                </div>
            </header>
        `;
        
        // Initialize navbar functionalities
        this.initializeNavbar();
    }

    initializeNavbar() {
        // URLs for each language
        const languageUrls = {
            en: "https://lacosprofanos.com.br/en/",
            pt: "https://lacosprofanos.com.br/",
        };

        const languageSelect = document.getElementById('language-select');

        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            if (languageUrls[selectedLanguage]) {
                window.location.href = languageUrls[selectedLanguage];
            }
        });

        // Detect current language
        this.detectCurrentLanguage();
    }

    detectCurrentLanguage() {
        const currentPath = window.location.pathname;
        const languageSelect = document.getElementById('language-select');
        
        // Set the correct option based on current path
        if (currentPath.includes('/en')) {
            languageSelect.value = 'en';
        } else {
            languageSelect.value = 'pt';
        }
    }
}

// Register the custom component
customElements.define('navbar-component', NavbarComponent);
