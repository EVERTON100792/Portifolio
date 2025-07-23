/**
 * PORTFOLIO EVERTON - SCRIPT PRINCIPAL (VERSÃO REFINADA)
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

    // Configurações do WhatsApp (Lembre-se de preencher com seus dados)
    WHATSAPP_NUMBER: '5511999999999',
    WHATSAPP_MESSAGE: 'Olá, Everton! Vi seu portfólio e gostaria de fazer um orçamento.',
    
    // Variável de estado para o resize
    LAST_WIDTH: window.innerWidth,
};

// Utilitário para debounce: adia a execução de uma função
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
// OBSERVER CENTRALIZADO PARA ANIMAÇÕES OTIMIZADAS
// ==========================================================================

/**
 * Configura um Intersection Observer central para todas as animações de scroll.
 * Isso melhora a organização e a performance.
 */
function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Animações de Fade-in
                if (target.classList.contains('fade-in-animation')) {
                    const delay = parseInt(target.dataset.delay || 0, 10);
                    setTimeout(() => {
                        target.classList.add('visible');
                    }, delay);
                }

                // Animação da Linha do Tempo
                if (target.classList.contains('timeline-line')) {
                    target.classList.add('drawing');
                }
                
                // Desconectar o observer após a animação para economizar recursos
                observer.unobserve(target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todos os elementos com a classe .fade-in-animation
    document.querySelectorAll('.fade-in-animation').forEach((element, index) => {
        element.dataset.delay = index * CONFIG.ANIMATION_DELAY;
        observer.observe(element);
    });
    
    // Observar a linha do tempo
    const timelineLine = document.getElementById('timeline-progress');
    if (timelineLine) {
        observer.observe(timelineLine);
    }
}


// ==========================================================================
// PARTICLES.JS - FUNDO INTERATIVO IMPRESSIONANTE
// ==========================================================================

function initParticles() {
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js não foi carregado. Usando fallback CSS.');
        document.querySelector('.hero-section')?.classList.add('loaded');
        return;
    }

    // Limpa instância anterior se houver (para o resize)
    if (window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom[0].pJS.fn.vendors.destroypJS();
        window.pJSDom = [];
    }

    const particleCount = isMobile() ? 40 : 80;
    const lineDistance = isMobile() ? 120 : 150;

    particlesJS('particles-js', {
        particles: {
            number: { value: particleCount, density: { enable: true, value_area: 800 } },
            color: { value: ['#4a90e2', '#357abd', '#8b5cf6'] },
            shape: { type: 'circle' },
            opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: lineDistance, color: '#4a90e2', opacity: 0.3, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false, attract: { enable: true, rotateX: 600, rotateY: 1200 } }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: !isMobile(), mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 200, line_linked: { opacity: 0.8 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    setTimeout(() => {
        document.querySelector('.hero-section')?.classList.add('loaded');
    }, 500);
}


// ==========================================================================
// ANIMAÇÕES E INTERAÇÕES DE UI
// ==========================================================================

function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    if (!typingElement) return;

    const originalText = typingElement.textContent;
    typingElement.textContent = '';
    let charIndex = 0;

    function typeCharacter() {
        if (charIndex < originalText.length) {
            typingElement.textContent += originalText.charAt(charIndex++);
            const delay = Math.random() * 50 + CONFIG.TYPING_SPEED;
            setTimeout(typeCharacter, delay);
        } else if (cursor) {
            cursor.style.animation = 'blink 1s infinite';
        }
    }
    setTimeout(typeCharacter, 1000);
}

function initProjectCards() {
    // Adiciona o CSS necessário para os efeitos de hover e ripple
    const style = document.createElement('style');
    style.id = 'project-card-styles';
    style.textContent = `
        .project-card:hover {
            transform: var(--transform-3d, translateY(-10px) scale(1.02));
        }
        @keyframes ripple { to { transform: scale(4); opacity: 0; } }
        .project-card { position: relative; overflow: hidden; }
        .ripple-effect {
            position: absolute;
            border-radius: 50%;
            background: rgba(74, 144, 226, 0.3);
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        }
    `;
    document.head.appendChild(style);

    document.querySelectorAll('.project-card').forEach(card => {
        // Efeito 3D no hover (apenas desktop)
        if (!isMobile()) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20; // Reduz a intensidade
                const rotateY = (centerX - x) / 20; // Reduz a intensidade
                
                // Atualiza a variável CSS em vez do estilo diretamente
                card.style.setProperty('--transform-3d', `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.removeProperty('--transform-3d');
            });
        }

        // Efeito ripple no clique
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;

            const rect = card.getBoundingClientRect();
            const ripple = document.createElement('div');
            ripple.className = 'ripple-effect';
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            
            card.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}


// ==========================================================================
// NAVEGAÇÃO E CONTROLES DE UI
// ==========================================================================

function initSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');
    const links = document.querySelectorAll('.sidebar-link');

    if (!sidebar || !toggle || !overlay) return;

    const closeSidebar = () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    };

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    });

    overlay.addEventListener('click', closeSidebar);
    links.forEach(link => link.addEventListener('click', closeSidebar));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) closeSidebar();
    });
}

function initActiveLinkOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.sidebar-menu a.sidebar-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-40% 0px -60% 0px' }); // Ajustado para melhor precisão

    sections.forEach(section => observer.observe(section));
}

function initBackToTop() {
    const button = document.getElementById('backToTop');
    if (!button) return;

    window.addEventListener('scroll', debounce(() => {
        button.classList.toggle('show', window.scrollY > 500);
    }, 100));

    button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}


// ==========================================================================
// INICIALIZAÇÃO PRINCIPAL
// ==========================================================================

function initPortfolio() {
    try {
        initSidebar();
        initActiveLinkOnScroll();
        initBackToTop();
        initIntersectionObserver();
        initParticles();
        initTypingAnimation();
        initProjectCards();
        // ... outras funções de inicialização
        
        document.documentElement.classList.add('js-enabled', isMobile() ? 'mobile' : 'desktop');
        
        console.log("✅ Portfólio inicializado com sucesso!");
        console.log(`
🎨 Portfolio desenvolvido por Everton
🚀 Tecnologias: HTML5, CSS3, JavaScript ES6+
⚡ Otimizado para performance e conversão
💬 WhatsApp: ${CONFIG.WHATSAPP_NUMBER}
Interessado em ter um site assim? Entre em contato!
        `);

    } catch (error) {
        console.error('❌ Erro na inicialização do portfolio:', error);
        document.querySelector('.hero-section')?.classList.add('loaded');
    }
}

// Evento de redimensionamento da janela
window.addEventListener('resize', debounce(() => {
    if (window.innerWidth !== CONFIG.LAST_WIDTH) {
        console.log('Viewport resized, re-initializing particles...');
        initParticles(); // Reinicializa as partículas para se adaptarem ao novo tamanho
        CONFIG.LAST_WIDTH = window.innerWidth;
        document.documentElement.classList.toggle('mobile', isMobile());
        document.documentElement.classList.toggle('desktop', !isMobile());
    }
}, 250));

// Inicia tudo quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
