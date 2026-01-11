// navbar.js - Componente de Navegação Atualizado
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
                    <div class="menu-toggle">&#9776;</div>

                    <div class="language-selector">
                        <span id="language-label">Idioma:</span>
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
            </header>
        `;

        // Inicializar funcionalidades da navbar
        this.initializeNavbar();
        this.initializeMenuToggle();
    }

    initializeNavbar() {
        // URLs para cada idioma
        const languageUrls = {
            pt: "https://lacosprofanos.com.br",
            en: "https://lacosprofanos.com.br/en",
        };

        const languageSelect = this.querySelector('#language-select');

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
        const languageSelect = this.querySelector('#language-select');

        if (currentPath.includes('/en')) {
            languageSelect.value = 'en';
        } else {
            languageSelect.value = 'pt';
        }
    }

    initializeMenuToggle() {
        const menuToggle = this.querySelector('.menu-toggle');
        const navButtons = this.querySelector('.nav-buttons');
        const header = this.querySelector('header');

        if (!menuToggle || !navButtons || !header) return;

        menuToggle.addEventListener('click', () => {
            // Alterna a exibição dos botões
            if (navButtons.style.display === 'flex' || navButtons.style.display === '') {
                navButtons.style.display = navButtons.style.display === 'flex' ? 'none' : 'flex';
            } else {
                navButtons.style.display = 'flex';
            }
            
            // Alterna classe para estilização CSS
            header.classList.toggle('expanded');
        });

        // Detecta redimensionamento para resetar o menu
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navButtons.style.display = 'flex';
                header.classList.remove('expanded');
            } else {
                navButtons.style.display = 'none';
            }
        });

        // Inicializar estado inicial
        if (window.innerWidth <= 768) {
            navButtons.style.display = 'none';
        }
    }
}

// Registrar o componente customizado
customElements.define('navbar-component', NavbarComponent);
