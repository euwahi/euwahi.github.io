// navbar2.js - Componente da barra de navegação superior
class NavbarTopComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="header-fixed">
                <div class="header-content">
                    <!-- Logo -->
                    <div class="logo"><span>Laços Profanos</span></div>
                    
                    <!-- Menu Hamburguer -->
                    <button class="hamburger-menu" id="hamburger-menu">
                        <i class="fas fa-bars"></i>
                    </button>
                    
                    <!-- Menu Lateral -->
                    <div class="mobile-menu-overlay" id="mobile-menu-overlay"></div>
                    <div class="mobile-menu" id="mobile-menu">
                        <div class="mobile-menu-header">
                            <span class="mobile-menu-title">Menu</span>
                            <button class="mobile-menu-close" id="mobile-menu-close">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="mobile-menu-content">
                            <a href="https://lacosprofanos.blogspot.com/" target="_blank" class="mobile-menu-item">
                                <i class="fas fa-blog"></i>
                                <span>Blog</span>
                            </a>
                            <a href="https://lacosprofanos.com.br/icon&wallpaper/" class="mobile-menu-item">
                                <i class="fas fa-image"></i>
                                <span>Wallpapers & Icons</span>
                            </a>
                            <a href="https://lacosprofanos.fandom.com/pt-br/" target="_blank" class="mobile-menu-item">
                                <i class="fas fa-book"></i>
                                <span>Wiki</span>
                            </a>
                            <a href="https://lacosprofanos.com.br/tos" target="_blank" class="mobile-menu-item">
                                <i class="fas fa-file-contract"></i>
                                <span>Termos de Serviço</span>
                            </a>
                            <a href="https://lacosprofanos.com.br/" target="_blank" class="mobile-menu-item">
                                <i class="fas fa-home"></i>
                                <span>Site Principal</span>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Seletor de Idioma (visível em desktop) -->
                    <div class="language-selector desktop-only">
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

        // Menu Hamburguer
        const hamburgerMenu = this.querySelector('#hamburger-menu');
        const mobileMenu = this.querySelector('#mobile-menu');
        const mobileMenuClose = this.querySelector('#mobile-menu-close');
        const mobileMenuOverlay = this.querySelector('#mobile-menu-overlay');

        hamburgerMenu.addEventListener('click', () => {
            mobileMenu.classList.add('active');
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        mobileMenuClose.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });

        mobileMenuOverlay.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
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
