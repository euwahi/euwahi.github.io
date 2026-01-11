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
                        <a href="https://profanebonds.com/icon&wallpaper/" target="_blank" class="nav-btn">
                            <i class="fas fa-image"></i>
                            <span>Wallpapers & Icons</span>
                        </a>
                        <a href="https://profanebonds.fandom.com/" target="_blank" class="nav-btn">
                            <i class="fas fa-book"></i>
                            <span>Wiki</span>
                        </a>
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
            en: "https://profanebonds.com",
            pt: "https://profanebonds.com/pt",
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
        
        if (currentPath.includes('/pt')) {
            languageSelect.value = 'pt';
        } else {
            languageSelect.value = 'en';
        }
    }
}

// Register the custom component
customElements.define('navbar-component', NavbarComponent);
