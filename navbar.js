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
                        <a href="https://lacosprofanos.blogspot.com/" target="_blank" class="nav-btn">
                            <i class="fas fa-blog"></i>
                            <span>Blog</span>
                        </a>
                        <a href="https://lacosprofanos.fandom.com/pt-br/" target="_blank" class="nav-btn">
                            <i class="fas fa-book"></i>
                            <span>Wiki</span>
                        </a>
                    </div>
                    
                    <div class="footer-links">
                        <a href="https://lacosprofanos.com.br/tos" target="_blank" class="footer-link">Termos de Serviço</a>
                    </div>
                </div>
            </header>
            
            <style>
                /* Estilos específicos para a navbar */
                .footer-links {
                    margin-top: 12px;
                    text-align: center;
                    padding-top: 10px;
                    border-top: 1px solid rgba(255, 255, 255, 0.2);
                    width: 100%;
                }
                
                .footer-link {
                    color: #aaa !important;
                    text-decoration: none;
                    font-size: 0.85em;
                    transition: color 0.3s ease;
                    font-weight: 400;
                }
                
                .footer-link:hover {
                    color: #fff !important;
                    text-decoration: underline;
                }
                
                /* Estilo base para a navbar */
                header {
                    background: linear-gradient(135deg, #2c3e50 0%, #4a6491 100%);
                    color: white;
                    padding: 15px 0;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .header-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 15px;
                    position: relative;
                }
                
                .logo {
                    font-size: 1.8em;
                    font-weight: bold;
                    letter-spacing: 1px;
                }
                
                .language-selector {
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                
                #language-select {
                    background-color: rgba(255, 255, 255, 0.9);
                    border: 1px solid #ddd;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-size: 0.9em;
                }
                
                .nav-buttons {
                    display: flex;
                    gap: 12px;
                    align-items: center;
                    flex-wrap: wrap;
                    justify-content: center;
                }
                
                .nav-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 8px 16px;
                    background-color: rgba(255, 255, 255, 0.15);
                    border-radius: 6px;
                    text-decoration: none;
                    color: white;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    font-size: 0.95em;
                }
                
                .nav-btn:hover {
                    background-color: rgba(255, 255, 255, 0.25);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                }
                
                .nav-btn i {
                    font-size: 1.1em;
                }
                
                /* Responsividade */
                @media (max-width: 768px) {
                    .header-content {
                        gap: 12px;
                    }
                    
                    .language-selector {
                        position: static;
                        order: 3;
                        margin-top: 5px;
                    }
                    
                    .nav-buttons {
                        flex-direction: column;
                        width: 100%;
                        max-width: 300px;
                        gap: 8px;
                    }
                    
                    .nav-btn {
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .logo {
                        order: 1;
                        font-size: 1.5em;
                    }
                    
                    .nav-buttons {
                        order: 2;
                    }
                    
                    .footer-links {
                        order: 4;
                        margin-top: 15px;
                    }
                }
                
                @media (max-width: 480px) {
                    .logo {
                        font-size: 1.3em;
                    }
                    
                    .nav-btn span {
                        font-size: 0.9em;
                    }
                    
                    .footer-link {
                        font-size: 0.8em;
                    }
                }
            </style>
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
