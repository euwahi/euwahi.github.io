// navbar2.js - Top navigation bar component (English)
class NavbarTopComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="header-fixed">
                <div class="header-content">
                    <div class="logo"><span>Profane Bonds</span></div>
                    
                    <div class="language-selector">
                        <span>Language:</span>
                        <select id="language-select">
                            <option value="en">English</option>
                            <option value="pt">Português (BR)</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="header-spacer"></div>
        `;
        
        this.initializeNavbar();
    }

    initializeNavbar() {
        const languageSelect = this.querySelector('#language-select');
        
        // URLs for each language
        const languageUrls = {
            en: "https://lacosprofanos.com.br/en/icon&wallpaper/",
            pt: "https://lacosprofanos.com.br/icon&wallpaper/",
        };

        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            if (languageUrls[selectedLanguage]) {
                window.location.href = languageUrls[selectedLanguage];
            }
        });

        // Detect current language
        this.detectCurrentLanguage(languageSelect);
    }

    detectCurrentLanguage(languageSelect) {
        const currentPath = window.location.pathname;
        
        if (currentPath.includes('/en/icon&wallpaper') || currentPath.includes('/en/icon%26wallpaper')) {
            languageSelect.value = 'en';
        } else {
            languageSelect.value = 'pt';
        }
    }
}

customElements.define('navbar-top-component', NavbarTopComponent);
