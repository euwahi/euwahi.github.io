// navbar2.js - Componente da barra de navegação superior
class NavbarTopComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="header-fixed">
                <div class="header-content">
                    <div class="logo"><span>Laços Profanos</span></div>
                    
                    <div class="language-selector">
                        <span>Idioma:</span>
                        <select id="language-select">
                            <option value="pt">Português (BR)</option>
                            <option value="en">English</option>
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
        
        // URLs para cada idioma
        const languageUrls = {
            pt: "https://lacosprofanos.com.br/icon&wallpaper/",
            en: "https://lacosprofanos.com.br/en/icon&wallpaper/",
        };

        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            if (languageUrls[selectedLanguage]) {
                window.location.href = languageUrls[selectedLanguage];
            }
        });

        // Detectar idioma atual
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
