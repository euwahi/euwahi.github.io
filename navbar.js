// navbar.js - Componente de Navegação com Menu Hambúrguer
class NavbarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="header-content">
                    <div class="logo"><span id="site-title">Laços Profanos</span></div>

                    <!-- Botão menu hamburguer -->
                    <button class="menu-toggle" aria-label="Menu de navegação">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <!-- Selector de Idioma (desktop) -->
                    <div class="language-selector">
                        <span id="language-label">Idioma:</span>
                        <select id="language-select">
                            <option value="pt">Português (BR)</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    <!-- Botões de Navegação (desktop) -->
                    <div class="nav-buttons">
                        <a href="https://lacosprofanos.blogspot.com/" target="_blank" class="nav-btn">
                            <i class="fas fa-blog"></i>
                            <span>Blog</span>
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

                <!-- Overlay para menu mobile -->
                <div class="mobile-menu-overlay"></div>

                <!-- Menu Mobile -->
                <div class="mobile-menu">
                    <div class="nav-buttons">
                        <a href="https://lacosprofanos.blogspot.com/" target="_blank" class="nav-btn">
                            <i class="fas fa-blog"></i>
                            <span>Blog</span>
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

                    <!-- Idioma no mobile -->
                    <div class="mobile-language">
                        <div class="language-selector">
                            <span id="language-label-mobile">Idioma:</span>
                            <select id="language-select-mobile">
                                <option value="pt">Português (BR)</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                    </div>
                </div>
            </header>
        `;

        // Inicializar funcionalidades da navbar
        this.initializeNavbar();
        this.initializeMobileMenu();
    }

    initializeNavbar() {
        // URLs para cada idioma
        const languageUrls = {
            pt: "https://lacosprofanos.com.br",
            en: "https://lacosprofanos.com.br/en",
        };

        // Configurar ambos os seletores de idioma
        const languageSelect = this.querySelector('#language-select');
        const languageSelectMobile = this.querySelector('#language-select-mobile');

        const handleLanguageChange = (selectedLanguage) => {
            if (languageUrls[selectedLanguage]) {
                window.location.href = languageUrls[selectedLanguage];
            }
        };

        languageSelect.addEventListener('change', function() {
            handleLanguageChange(this.value);
        });

        languageSelectMobile.addEventListener('change', function() {
            handleLanguageChange(this.value);
        });

        // Detectar idioma atual
        this.detectCurrentLanguage();
    }

    detectCurrentLanguage() {
        const currentPath = window.location.pathname;
        const languageSelect = this.querySelector('#language-select');
        const languageSelectMobile = this.querySelector('#language-select-mobile');

        if (currentPath.includes('/en')) {
            languageSelect.value = 'en';
            languageSelectMobile.value = 'en';
        } else {
            languageSelect.value = 'pt';
            languageSelectMobile.value = 'pt';
        }
    }

    initializeMobileMenu() {
        const menuToggle = this.querySelector('.menu-toggle');
        const mobileMenu = this.querySelector('.mobile-menu');
        const overlay = this.querySelector('.mobile-menu-overlay');
        const body = document.body;

        if (!menuToggle || !mobileMenu || !overlay) return;

        // Abrir/fechar menu
        const toggleMenu = () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        };

        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Fechar menu ao clicar em um link
        const menuLinks = mobileMenu.querySelectorAll('.nav-btn');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Fechar menu ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });

        // Fechar menu ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
}

// Registrar o componente customizado
customElements.define('navbar-component', NavbarComponent);
