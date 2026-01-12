// navbar.js - Menu Hambúrguer com Tradução
class NavbarComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <header>
                <div class="header-content">
                    <div class="logo">
                        <span id="site-title" data-translate="site.title">Laços Profanos</span>
                    </div>

                    <!-- Seletor de Idioma -->
                    <div class="language-selector">
                        <span data-translate="language.label">Idioma:</span>
                        <select id="language-select">
                            <option value="pt">Português (BR)</option>
                            <option value="en">English</option>
                        </select>
                    </div>

                    <!-- Botão menu hambúrguer -->
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
                            <span data-translate="menu.blog">Blog</span>
                        </a>
                        <a href="https://lacosprofanos.fandom.com/pt-br/" target="_blank" class="nav-btn">
                            <i class="fas fa-book"></i>
                            <span data-translate="menu.wiki">Wiki</span>
                        </a>
                        <a href="https://lacosprofanos.com.br/tos" target="_blank" class="nav-btn">
                            <i class="fas fa-file-contract"></i>
                            <span data-translate="menu.tos">Termos de Serviço</span>
                        </a>
                    </div>
                </div>
            </header>
        `;

        // Inicializar funcionalidades
        this.initializeNavbar();
        this.initializeMobileMenu();
    }

    initializeNavbar() {
        // Configurar seletor de idioma
        const languageSelect = this.querySelector('#language-select');

        if (languageSelect) {
            // Adicionar traduções do navbar ao JSON
            if (window.translations) {
                window.translations['pt']['site.title'] = 'Laços Profanos';
                window.translations['en']['site.title'] = 'Profane Bonds';
                window.translations['pt']['language.label'] = 'Idioma:';
                window.translations['en']['language.label'] = 'Language:';
                window.translations['pt']['menu.blog'] = 'Blog';
                window.translations['en']['menu.blog'] = 'Blog';
                window.translations['pt']['menu.wiki'] = 'Wiki';
                window.translations['en']['menu.wiki'] = 'Wiki';
                window.translations['pt']['menu.tos'] = 'Termos de Serviço';
                window.translations['en']['menu.tos'] = 'Terms of Service';
            }

            // Carregar idioma salvo
            const savedLang = localStorage.getItem('preferred-language') || 'pt';
            languageSelect.value = savedLang;

            // Configurar evento de mudança
            languageSelect.addEventListener('change', function() {
                const selectedLanguage = this.value;
                
                // Aplicar tradução usando a função do sistema principal
                if (window.TranslationSystem) {
                    window.TranslationSystem.applyTranslation(selectedLanguage);
                }
                
                // Atualizar o favicon conforme o idioma
                updateFavicon(selectedLanguage);
                
                // Salvar preferência
                localStorage.setItem('preferred-language', selectedLanguage);
            });

            // Atualizar favicon inicial
            updateFavicon(savedLang);
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

// Função para atualizar favicon conforme idioma
function updateFavicon(lang) {
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        if (lang === 'en') {
            favicon.href = 'https://i.imgur.com/mgxXSto.png'; // Manter mesmo favicon
        } else {
            favicon.href = 'https://i.imgur.com/mgxXSto.png';
        }
    }
}

// Registrar o componente
if (!customElements.get('navbar-component')) {
    customElements.define('navbar-component', NavbarComponent);
}
