// navbar.js - Menu Hambúrguer Sempre
class NavbarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="header-content">
                    <div class="logo"><span id="site-title">Laços Profanos</span></div>

                    <!-- Botão menu hambúrguer - SEMPRE VISÍVEL -->
                    <button class="menu-toggle" aria-label="Abrir menu de navegação">
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
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
                            <span>Idioma:</span>
                            <select id="language-select-mobile">
                                <option value="pt">Português (BR)</option>
                                <option value="en">English</option>
                            </select>
                        </div>
                    </div>
                </div>
            </header>
        `;

        // Inicializar funcionalidades
        this.initializeNavbar();
        this.initializeMobileMenu();
    }

    initializeNavbar() {
        // URLs para cada idioma
        const languageUrls = {
            pt: "https://lacosprofanos.com.br",
            en: "https://lacosprofanos.com.br/en",
        };

        // Configurar seletor de idioma mobile
        const languageSelectMobile = this.querySelector('#language-select-mobile');

        if (languageSelectMobile) {
            languageSelectMobile.addEventListener('change', function() {
                const selectedLanguage = this.value;
                if (languageUrls[selectedLanguage]) {
                    window.location.href = languageUrls[selectedLanguage];
                }
            });

            // Detectar idioma atual
            this.detectCurrentLanguage();
        }
    }

    detectCurrentLanguage() {
        const currentPath = window.location.pathname;
        const languageSelectMobile = this.querySelector('#language-select-mobile');

        if (languageSelectMobile) {
            if (currentPath.includes('/en')) {
                languageSelectMobile.value = 'en';
            } else {
                languageSelectMobile.value = 'pt';
            }
        }
    }

    initializeMobileMenu() {
        const menuToggle = this.querySelector('.menu-toggle');
        const mobileMenu = this.querySelector('.mobile-menu');
        const overlay = this.querySelector('.mobile-menu-overlay');
        const body = document.body;

        if (!menuToggle || !mobileMenu || !overlay) return;

        // Função para abrir/fechar menu
        const toggleMenu = () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Bloquear/liberar scroll do body
            if (mobileMenu.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        };

        // Event listeners
        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        // Fechar menu ao clicar em links
        const menuLinks = mobileMenu.querySelectorAll('.nav-btn');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                overlay.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Fechar menu com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    }
}

// Registrar o componente
if (!customElements.get('navbar-component')) {
    customElements.define('navbar-component', NavbarComponent);
}
