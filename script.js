/**
 * PORTFOLIO EVERTON - SCRIPT PRINCIPAL
 * Desenvolvedor Web Criativo
 */

// ==========================================================================
// CONFIGURAÇÕES GLOBAIS E UTILITÁRIOS
// ==========================================================================
const CONFIG = {
    TYPING_SPEED: 50,
    PARTICLE_COUNT: 100,
    MOBILE_BREAKPOINT: 768,
    TABLET_BREAKPOINT: 1024,
    WHATSAPP_NUMBER: '5543998719821',
    WHATSAPP_MESSAGE: 'Olá, Everton! Vi seu portfólio e gostaria de fazer um orçamento.'
};

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

function isMobile() {
    return window.innerWidth <= CONFIG.MOBILE_BREAKPOINT;
}

// ==========================================================================
// LÓGICA DO PRELOADER (ATUALIZADA)
// ==========================================================================
function handlePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Define o tempo total que o preloader ficará visível (em milissegundos).
        // Este valor deve corresponder à duração da sua nova animação CSS.
        // 4500ms = 4.5 segundos. Ajuste aqui se quiser mais ou menos tempo.
        const preloaderDuration = 4500;

        setTimeout(() => {
            preloader.classList.add('hidden');
        }, preloaderDuration);
    }
}

// ==========================================================================
// ANIMAÇÕES E OBSERVERS
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
    animatedElements.forEach(element => observer.observe(element));

    const timelineLine = document.getElementById('timeline-progress');
    if (timelineLine) {
        observer.observe(timelineLine);
    }
}

function initParticles() {
    if (typeof particlesJS === 'undefined') {
        console.warn('Particles.js não foi carregado.');
        return;
    }
    const particleCount = isMobile() ? 50 : CONFIG.PARTICLE_COUNT;
    const lineDistance = isMobile() ? 100 : 150;
    particlesJS('particles-js', {
        particles: {
            number: { value: particleCount, density: { enable: true, value_area: 1000 } },
            color: { value: ['#4a90e2', '#357abd', '#8b5cf6', '#25d366'] },
            shape: { type: 'circle' },
            opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
            size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
            line_linked: { enable: true, distance: lineDistance, color: '#4a90e2', opacity: 0.3, width: 1 },
            move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', attract: { enable: true, rotateX: 600, rotateY: 1200 } }
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
        } else if (cursor) {
            cursor.style.animation = 'blink 1s infinite';
        }
    }
    setTimeout(typeCharacter, 1000);
}

// ==========================================================================
// INTERAÇÕES DE COMPONENTES
// ==========================================================================
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        if (!isMobile()) {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        }
    });
}

function initWhatsAppButton() {
    const whatsappButton = document.querySelector('.whatsapp-button');
    if (!whatsappButton) return;

    whatsappButton.addEventListener('click', () => {
        console.log('WhatsApp button clicked - Lead generation event');
        whatsappButton.classList.add('clicked');
        setTimeout(() => whatsappButton.classList.remove('clicked'), 300);
    });

    const style = document.createElement('style');
    style.textContent = `.whatsapp-button.clicked { transform: scale(1.2); background: #128c7e; }`;
    document.head.appendChild(style);
}

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
        link.addEventListener('click', () => {
            closeSidebar();
            if (link.getAttribute('href').startsWith('#')) {
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

function initReadingProgressBar() {
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

function setupSmoothScrolling() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
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
        initProjectCards();
        initWhatsAppButton();
        initReadingProgressBar();
        setupSmoothScrolling();
        // A função problemática 'kickstartAnimation' foi removida מכאן.

        console.log('✅ Portfolio inicializado com sucesso!');
    } catch (error) {
        console.error('❌ Erro na inicialização do portfolio:', error);
        document.querySelector('.hero-section')?.classList.add('loaded');
    }
}

// ==========================================================================
// EVENT LISTENERS E EXECUÇÃO
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
});

window.addEventListener('load', () => {
    handlePreloader();
});
