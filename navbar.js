// navbar.js - Componente de Navegação
class NavbarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="container header-content">
                    <div class="logo"><span id="site-title">Laços Profanos</span></div>
                    
                    <div class="language-selector">
                        <span id="language-label">Idioma:</span>
                        <select id="language-select">
                            <option value="pt">Português (BR)</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    
                    <div class="nav-buttons">
                        <a href="https://lacosprofanos.com.br/icon&wallpaper/" target="_blank" class="nav-btn">
                            <i class="fas fa-image"></i>
                            <span>Wallpapers & Icons</span>
                        </a>
                        <a href="https://lacosprofanos.fandom.com/pt-br/" target="_blank" class="nav-btn">
                            <i class="fas fa-book"></i>
                            <span>Wiki</span>
                        </a>
                    </div>
                </div>
            </header>
        `;
        
        // Inicializar funcionalidades da navbar
        this.initializeNavbar();
    }

    initializeNavbar() {
        // URLs para cada idioma
        const languageUrls = {
            pt: "https://lacosprofanos.com.br",
            en: "https://lacosprofanos.com.br/en",
        };

        const languageSelect = document.getElementById('language-select');

        languageSelect.addEventListener('change', function() {
            const selectedLanguage = this.value;
            if (languageUrls[selectedLanguage]) {
                window.location.href = languageUrls[selectedLanguage];
            }
        });

        // Detectar idioma atual
        this.detectCurrentLanguage();
    }

    detectCurrentLanguage() {
        const currentPath = window.location.pathname;
        const languageSelect = document.getElementById('language-select');
        
        if (currentPath.includes('/en')) {
            languageSelect.value = 'en';
        } else {
            languageSelect.value = 'pt';
        }
    }
}

// Registrar o componente customizado
customElements.define('navbar-component', NavbarComponent);
