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
                    
                    <div class="nav-buttons">
                        <a href="https://lacosprofanos.blogspot.com/" target="_blank" class="nav-btn">
                            <i class="fas fa-blog"></i>
                            <span>Blog</span>
                        </a>
                        <a href="https://lacosprofanos.com.br/icon&wallpaper/" target="_blank" class="nav-btn">
                            <i class="fas fa-image"></i>
                            <span>Wallpapers & Icons</span>
                        </a>
                        <a href="https://lacosprofanos.fandom.com/pt-br/" target="_blank" class="nav-btn">
                            <i class="fas fa-book"></i>
                            <span>Wiki</span>
                        </a>
                        <a href="https://lacosprofanos.com.br/tos" target="_blank" class="nav-btn">
                            <i class="fas fa-file-contract"></i>
                            <span>Termos de Serviço</span>
                        </a>
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
