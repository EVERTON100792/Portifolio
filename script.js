
/**
 * PORTFOLIO EVERTON - SCRIPT PRINCIPAL
 * Desenvolvedor Web Criativo
 * * Este arquivo contém todas as funcionalidades JavaScript do portfólio,
 * incluindo animações impressionantes, Intersection Observer API,
 * configuração do particles.js e interações do usuário.
 */

// ==========================================================================
// CONFIGURAÇÕES GLOBAIS E UTILITÁRIOS
// ==========================================================================

const CONFIG = {
    // Configurações de animação
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

function initIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('timeline-line')) {
                    entry.target.classList.add('drawing');
                }
                
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-animation');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

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
        return;
    }

    const particleCount = isMobile() ? 50 : CONFIG.PARTICLE_COUNT;
    const lineDistance = isMobile() ? 100 : 150;

    particlesJS('particles-js', {
        particles: {
            number: { value: particleCount, density: { enable: true, value_area: 1000 } },
            color: { value: ['#4a90e2', '#357abd', '#8b5cf6', '#25d366'] },
            shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
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
        document.querySelector('.hero-section').classList.add('loaded');
    }, 1000);
}

// ==========================================================================
// ANIMAÇÃO DE DIGITAÇÃO DO TÍTULO
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
            typingElement.textContent += originalText.charAt(charIndex);
            charIndex++;
            const delay = Math.random() * 50 + CONFIG.TYPING_SPEED;
            setTimeout(typeCharacter, delay);
        } else {
            if (cursor) {
                cursor.style.animation = 'blink 1s infinite';
            }
        }
    }
    setTimeout(typeCharacter, 1000);
}

// ==========================================================================
// LINHA DO TEMPO INTERATIVA
// ==========================================================================

function initTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineLine = document.getElementById('timeline-progress');
    if (!timelineItems.length || !timelineLine) return;

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                const itemIndex = Array.from(timelineItems).indexOf(entry.target);
                const percentage = ((itemIndex + 1) / timelineItems.length) * 100;
                timelineLine.style.height = `${percentage}%`;
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

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
        // ===============================================================
        // ALTERAÇÃO AQUI: Efeito 3D restaurado para o original
        // ===============================================================
        if (!isMobile()) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                // Aplica a transformação 3D diretamente no estilo do card
                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg) 
                    scale(1.05)
                `;
            });
            
            card.addEventListener('mouseleave', () => {
                // Remove a transformação ao tirar o mouse, permitindo a transição suave do CSS
                card.style.transform = '';
            });
        }
        
        // Efeito ripple no clique (mantido)
        card.addEventListener('click', (e) => {
            if (e.target.closest('.btn-primary, .btn-secondary')) return;
            
            const ripple = document.createElement('div');
            ripple.classList.add('ripple-effect');
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute; width: ${size}px; height: ${size}px;
                left: ${x}px; top: ${y}px; background: rgba(74, 144, 226, 0.3);
                border-radius: 50%; transform: scale(0);
                animation: ripple 0.6s ease-out; pointer-events: none; z-index: 10;
            `;
            
            card.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Adicionar CSS para ripple effect, se ainda não existir
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple { to { transform: scale(4); opacity: 0; } }
            .project-card { position: relative; overflow: hidden; }
        `;
        document.head.appendChild(style);
    }
}

// ==========================================================================
// BOTÃO WHATSAPP INTELIGENTE
// ==========================================================================

function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    const whatsappFloat = document.querySelector('.whatsapp-float');
    if (!whatsappButton || !whatsappFloat) return;

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
    
    let lastScrollY = window.scrollY;
    const handleScroll = debounce(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 500) {
            whatsappFloat.style.transform = 'translateY(100px) scale(0.8)';
            whatsappFloat.style.opacity = '0.7';
        } else {
            whatsappFloat.style.transform = '';
            whatsappFloat.style.opacity = '';
        }
        lastScrollY = currentScrollY;
    }, 100);
    
    window.addEventListener('scroll', handleScroll);
    
    whatsappButton.addEventListener('click', () => {
        console.log('WhatsApp button clicked - Lead generation event');
        whatsappButton.classList.add('clicked');
        setTimeout(() => whatsappButton.classList.remove('clicked'), 300);
    });
    
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-button.clicked { transform: scale(1.2); background: #128c7e; }
        .whatsapp-float { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    `;
    document.head.appendChild(style);
}

// ==========================================================================
// SIDEBAR NAVIGATION INTERATIVO
// ==========================================================================

function initSidebarNavigation() {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    if (!sidebar || !sidebarToggle) return;

    const closeSidebar = () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
    };
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    });
    
    sidebarOverlay.addEventListener('click', closeSidebar);
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            closeSidebar(); // Fecha a sidebar ao clicar em qualquer link
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                sidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    const sections = document.querySelectorAll('section[id]');
    const highlightSidebarNavigation = debounce(() => {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }, 100);
    
    window.addEventListener('scroll', highlightSidebarNavigation);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });
}

// ==========================================================================
// BOTÃO VOLTAR AO TOPO
// ==========================================================================

function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (!backToTopButton) return;
    
    const toggleBackToTop = debounce(() => {
        backToTopButton.classList.toggle('show', window.scrollY > 500);
    }, 100);
    
    window.addEventListener('scroll', toggleBackToTop);
    
    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ==========================================================================
// SCROLL SUAVE E INDICADORES
// ==========================================================================

function initSmoothScroll() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
    
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed; top: 0; left: 0; width: 0%; height: 3px;
        background: linear-gradient(90deg, #4a90e2, #8b5cf6, #25d366);
        z-index: 9999; transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    const updateReadingProgress = debounce(() => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }, 10);
    
    window.addEventListener('scroll', updateReadingProgress);
}

// ==========================================================================
// INICIALIZAÇÃO PRINCIPAL
// ==========================================================================

function initPortfolio() {
    console.log('🚀 Iniciando Portfolio Everton - Desenvolvedor Web Criativo');
    
    try {
        initSidebarNavigation();
        initBackToTop();
        initIntersectionObserver();
        initParticles();
        initTypingAnimation();
        initTimelineAnimation();
        initProjectCards();
        initWhatsAppButton();
        initSmoothScroll();
        
        console.log('✅ Portfolio inicializado com sucesso!');
        
    } catch (error) {
        console.error('❌ Erro na inicialização do portfolio:', error);
        document.querySelector('.hero-section')?.classList.add('loaded');
    }
}

// ==========================================================================
// EVENT LISTENERS E EXECUÇÃO
// ==========================================================================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
