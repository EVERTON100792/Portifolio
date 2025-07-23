/**
 * PORTFOLIO EVERTON - SCRIPT PRINCIPAL
 * Desenvolvedor Web Criativo
 * 
 * Este arquivo contém todas as funcionalidades JavaScript do portfólio,
 * incluindo animações impressionantes, Intersection Observer API,
 * configuração do particles.js e interações do usuário.
 */

// ==========================================================================
// CONFIGURAÇÕES GLOBAIS E UTILITÁRIOS
// ==========================================================================

const CONFIG = {
    // Configurações de animação
    ANIMATION_DELAY: 100,
    TYPING_SPEED: 50,
    PARTICLE_COUNT: 100,
    
    // Breakpoints responsivos
    MOBILE_BREAKPOINT: 768,
    TABLET_BREAKPOINT: 1024,
    
    // Configurações do WhatsApp
    WHATSAPP_NUMBER: '5511999999999',
    WHATSAPP_MESSAGE: 'Olá, Everton! Vi seu portfólio e gostaria de fazer um orçamento.'
};

// Utilitário para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utilitário para detectar dispositivo móvel
function isMobile() {
    return window.innerWidth <= CONFIG.MOBILE_BREAKPOINT;
}

// ==========================================================================
// INTERSECTION OBSERVER API - ANIMAÇÕES OTIMIZADAS
// ==========================================================================

/**
 * Configura o Intersection Observer para animações performáticas
 * Elementos aparecem suavemente quando entram na viewport
 */
function initIntersectionObserver() {
    // Configurações otimizadas do observer
    const observerOptions = {
        root: null,
        rootMargin: '-50px 0px -50px 0px', // Trigger antes do elemento aparecer
        threshold: [0.1, 0.3, 0.5] // Múltiplos pontos de trigger
    };

    // Callback otimizado para performance
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona classe visible com delay escalonado
                const delay = entry.target.dataset.delay || 0;
                
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    
                    // Trigger para animações especiais
                    if (entry.target.classList.contains('timeline-line')) {
                        entry.target.classList.add('drawing');
                    }
                    
                    // Para por observar após animação
                    observer.unobserve(entry.target);
                }, delay);
            }
        });
    };

    // Criar observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todos os elementos com animação
    const animatedElements = document.querySelectorAll('.fade-in-animation');
    animatedElements.forEach((element, index) => {
        // Adicionar delay escalonado para efeito cascata
        element.dataset.delay = index * CONFIG.ANIMATION_DELAY;
        observer.observe(element);
    });

    // Observar linha do tempo especificamente
    const timelineLine = document.getElementById('timeline-progress');
    if (timelineLine) {
        observer.observe(timelineLine);
    }
}

// ==========================================================================
// PARTICLES.JS - FUNDO INTERATIVO IMPRESSIONANTE
// ==========================================================================

/**
 * Configuração avançada do particles.js para máximo impacto visual
 * Partículas reagem ao mouse e criam um ambiente imersivo
 */
function initParticles() {
    // Verificar se particles.js foi carregado
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js não foi carregado. Usando fallback CSS.');
        return;
    }

    // Configuração responsiva baseada no dispositivo
    const particleCount = isMobile() ? 50 : CONFIG.PARTICLE_COUNT;
    const lineDistance = isMobile() ? 100 : 150;

    particlesJS('particles-js', {
        particles: {
            number: {
                value: particleCount,
                density: {
                    enable: true,
                    value_area: 1000
                }
            },
            color: {
                value: ['#4a90e2', '#357abd', '#8b5cf6', '#25d366']
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: lineDistance,
                color: '#4a90e2',
                opacity: 0.3,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: !isMobile(), // Desativar no mobile para performance
                    mode: 'grab'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });

    // Marcar hero como carregado após particles
    setTimeout(() => {
        document.querySelector('.hero-section').classList.add('loaded');
    }, 1000);
}

// ==========================================================================
// ANIMAÇÃO DE DIGITAÇÃO DO TÍTULO
// ==========================================================================

/**
 * Cria efeito de digitação impressionante no título principal
 */
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    
    if (!typingElement) return;

    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    
    let charIndex = 0;
    
    function typeCharacter() {
        if (charIndex < originalText.length) {
            typingElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            
            // Velocidade variável para mais naturalidade
            const delay = Math.random() * 50 + CONFIG.TYPING_SPEED;
            setTimeout(typeCharacter, delay);
        } else {
            // Iniciar animação do cursor após digitação completa
            if (cursor) {
                cursor.style.animation = 'blink 1s infinite';
            }
        }
    }
    
    // Iniciar digitação após um delay
    setTimeout(typeCharacter, 1000);
}

// ==========================================================================
// LINHA DO TEMPO INTERATIVA
// ==========================================================================

/**
 * Controla a animação da linha do tempo que se desenha conforme o scroll
 */
function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineLine = document.getElementById('timeline-progress');
    
    if (!timelineItems.length || !timelineLine) return;

    // Configurar Intersection Observer específico para timeline
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Calcular altura da linha baseada no item visível
                const itemIndex = Array.from(timelineItems).indexOf(entry.target);
                const percentage = ((itemIndex + 1) / timelineItems.length) * 100;
                
                timelineLine.style.height = `${percentage}%`;
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    // Observar cada item da timeline
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
}

// ==========================================================================
// INTERAÇÕES DOS CARDS DE PROJETO
// ==========================================================================

/**
 * Adiciona interatividade avançada aos cards de projeto
 */
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Efeito 3D no hover (apenas desktop)
        if (!isMobile()) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    translateY(-10px) 
                    scale(1.02)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        }
        
        // Animação de clique
        card.addEventListener('click', (e) => {
            // Prevenir se clicou em um botão
            if (e.target.closest('.btn-primary, .btn-secondary')) return;
            
            // Efeito ripple
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-effect');
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(74, 144, 226, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
                z-index: 10;
            `;
            
            card.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Adicionar CSS para ripple effect
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            .project-card {
                position: relative;
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
}

// ==========================================================================
// BOTÃO WHATSAPP INTELIGENTE
// ==========================================================================

/**
 * Funcionalidades avançadas do botão WhatsApp
 */
function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (!whatsappButton || !whatsappFloat) return;

    // Tooltip inteligente
    let tooltipTimeout;
    
    // Mostrar tooltip após 3 segundos na primeira vez
    setTimeout(() => {
        if (!localStorage.getItem('whatsapp-tooltip-shown')) {
            showTooltipTemporarily();
            localStorage.setItem('whatsapp-tooltip-shown', 'true');
        }
    }, 3000);
    
    function showTooltipTemporarily() {
        const tooltip = whatsappButton.querySelector('.whatsapp-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
            tooltip.style.transform = 'translateY(-50%) translateX(-10px)';
            
            setTimeout(() => {
                tooltip.style.opacity = '';
                tooltip.style.visibility = '';
                tooltip.style.transform = '';
            }, 3000);
        }
    }
    
    // Animação especial no scroll
    let lastScrollY = window.scrollY;
    
    const handleScroll = debounce(() => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            // Scrolling para baixo - ocultar temporariamente
            whatsappFloat.style.transform = 'translateY(100px) scale(0.8)';
            whatsappFloat.style.opacity = '0.7';
        } else {
            // Scrolling para cima ou no topo - mostrar
            whatsappFloat.style.transform = '';
            whatsappFloat.style.opacity = '';
        }
        
        lastScrollY = currentScrollY;
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    // Click tracking (para analytics futuras)
    whatsappButton.addEventListener('click', () => {
        // Poderia integrar com Google Analytics aqui
        console.log('WhatsApp button clicked - Lead generation event');
        
        // Adicionar classe para animação de sucesso
        whatsappButton.classList.add('clicked');
        setTimeout(() => {
            whatsappButton.classList.remove('clicked');
        }, 300);
    });
    
    // Adicionar estilos para animação de click
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-button.clicked {
            transform: scale(1.2);
            background: #128c7e;
        }
        .whatsapp-float {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
    `;
    document.head.appendChild(style);
}

// ==========================================================================
// SIDEBAR NAVIGATION INTERATIVO
// ==========================================================================

/**
 * Funcionalidades do sidebar responsivo e estiloso
 */
function initSidebarNavigation() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    if (!sidebar || !sidebarToggle) return;
    
    // Toggle sidebar - sempre mostra/oculta
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    });
    
    // Fechar sidebar ao clicar no overlay
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        });
    }
    
    // Navegação por links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Se for link interno
            if (href.startsWith('#')) {
                // Fechar sidebar após clique
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('active');
                document.body.classList.remove('sidebar-open');
                
                // Marcar link ativo
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Smooth scroll
                e.preventDefault();
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 20;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Auto-highlight baseado no scroll
    const sections = document.querySelectorAll('section[id]');
    
    const highlightSidebarNavigation = debounce(() => {
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, 100);
    
    window.addEventListener('scroll', highlightSidebarNavigation);
    
    // Fechar sidebar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            document.body.classList.remove('sidebar-open');
        }
    });
}

// ==========================================================================
// BOTÃO VOLTAR AO TOPO
// ==========================================================================

/**
 * Funcionalidade do botão "voltar ao topo"
 */
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    // Mostrar/ocultar botão baseado no scroll
    const toggleBackToTop = debounce(() => {
        if (window.scrollY > 500) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }, 100);
    
    window.addEventListener('scroll', toggleBackToTop);
    
    // Funcionalidade de click - scroll suave para o topo
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Adicionar efeito de click
        backToTopButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            backToTopButton.style.transform = '';
        }, 150);
        
        // Scroll suave para o topo
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Analytics (opcional)
        console.log('Back to top button clicked');
    });
    
    // Efeito hover aprimorado
    const button = backToTopButton.querySelector('.back-to-top-button');
    
    if (button) {
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'glow 1s ease-in-out infinite';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.animation = '';
        });
    }
}

// ==========================================================================
// SCROLL SUAVE E INDICADORES
// ==========================================================================

/**
 * Implementa scroll suave e indicadores visuais
 */
function initSmoothScroll() {
    // Scroll indicator na hero section
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Progress bar de leitura (opcional)
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #4a90e2, #8b5cf6, #25d366);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    // Atualizar progress bar no scroll
    const updateReadingProgress = debounce(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = Math.min(scrollPercent, 100) + '%';
    }, 10);
    
    window.addEventListener('scroll', updateReadingProgress);
}

// ==========================================================================
// OTIMIZAÇÕES DE PERFORMANCE
// ==========================================================================

/**
 * Implementa otimizações para melhor performance
 */
function initPerformanceOptimizations() {
    // Lazy loading para imagens SVG pesadas
    const svgElements = document.querySelectorAll('svg');
    
    const svgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                svgObserver.unobserve(entry.target);
            }
        });
    });
    
    svgElements.forEach(svg => svgObserver.observe(svg));
    
    // Prefetch para links importantes
    const importantLinks = document.querySelectorAll('a[href^="https://api.whatsapp.com"]');
    importantLinks.forEach(link => {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
    });
    
    // Service Worker para cache (se disponível)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Implementar service worker futuro
            console.log('Service Worker ready for implementation');
        });
    }
}

// ==========================================================================
// TRATAMENTO DE ERROS E FALLBACKS
// ==========================================================================

/**
 * Implementa tratamento de erros gracioso
 */
function initErrorHandling() {
    // Fallback para particles.js
    window.addEventListener('error', (e) => {
        if (e.filename && e.filename.includes('particles')) {
            console.warn('Particles.js failed to load, using CSS fallback');
            document.querySelector('.hero-section').classList.add('loaded');
        }
    });
    
    // Verificar se elementos críticos existem
    const criticalElements = [
        '.hero-section',
        '.whatsapp-button',
        '.cta-button'
    ];
    
    criticalElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.error(`Critical element missing: ${selector}`);
        }
    });
}

// ==========================================================================
// ANALYTICS E TRACKING
// ==========================================================================

/**
 * Sistema de tracking para otimização de conversão
 */
function initAnalytics() {
    // Tracking de eventos importantes
    const trackEvent = (category, action, label = '') => {
        // Integração futura com Google Analytics
        console.log(`Event: ${category} - ${action} - ${label}`);
    };
    
    // Track scroll depth
    let maxScroll = 0;
    const scrollMilestones = [25, 50, 75, 90, 100];
    
    window.addEventListener('scroll', debounce(() => {
        const scrollPercent = Math.round(
            (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        );
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            scrollMilestones.forEach(milestone => {
                if (scrollPercent >= milestone && maxScroll < milestone + 5) {
                    trackEvent('Scroll', 'Depth', `${milestone}%`);
                }
            });
        }
    }, 500));
    
    // Track time on page
    const startTime = Date.now();
    
    window.addEventListener('beforeunload', () => {
        const timeSpent = Math.round((Date.now() - startTime) / 1000);
        trackEvent('Engagement', 'Time on Page', `${timeSpent}s`);
    });
    
    // Track CTA clicks
    document.querySelectorAll('.cta-button, .whatsapp-button').forEach(button => {
        button.addEventListener('click', () => {
            trackEvent('Conversion', 'CTA Click', button.textContent.trim());
        });
    });
}

// ==========================================================================
// INICIALIZAÇÃO PRINCIPAL
// ==========================================================================

/**
 * Função principal que inicializa todas as funcionalidades
 * Executa quando o DOM está pronto
 */
function initPortfolio() {
    console.log('🚀 Iniciando Portfolio Everton - Desenvolvedor Web Criativo');
    
    try {
        // Inicializar funcionalidades principais
        initSidebarNavigation();
        initBackToTop();
        initIntersectionObserver();
        initParticles();
        initTypingAnimation();
        initTimelineAnimation();
        initProjectCards();
        initWhatsAppButton();
        initSmoothScroll();
        
        // Inicializar otimizações
        initPerformanceOptimizations();
        initErrorHandling();
        initAnalytics();
        
        console.log('✅ Portfolio inicializado com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro na inicialização do portfolio:', error);
        
        // Fallback para funcionalidade básica
        document.querySelector('.hero-section')?.classList.add('loaded');
    }
}

// ==========================================================================
// EVENT LISTENERS E EXECUÇÃO
// ==========================================================================

// Aguardar DOM estar pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}

// Reagir a mudanças de orientação/redimensionamento
window.addEventListener('resize', debounce(() => {
    // Reinicializar particles.js se necessário
    if (window.innerWidth !== CONFIG.LAST_WIDTH) {
        CONFIG.LAST_WIDTH = window.innerWidth;
        
        // Lógica de redimensionamento
        console.log('Viewport resized, adjusting layout...');
    }
}, 250));

// Adicionar classes helper para CSS
document.documentElement.classList.add(
    isMobile() ? 'mobile' : 'desktop',
    'js-enabled'
);

// Detectar tema do sistema (para futuras implementações)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    console.log('User prefers light theme (currently using dark)');
}

// Expor funções globais para debug (apenas desenvolvimento)
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.portfolioDebug = {
        initParticles,
        initTypingAnimation,
        CONFIG
    };
}

/**
 * Easter egg para desenvolvedores curiosos 🥚
 */
console.log(`
🎨 Portfolio desenvolvido por Everton
🚀 Tecnologias: HTML5, CSS3, JavaScript ES6+
⚡ Otimizado para performance e conversão
💬 WhatsApp: ${CONFIG.WHATSAPP_NUMBER}

Interessado em ter um site assim? Entre em contato! 
`);
