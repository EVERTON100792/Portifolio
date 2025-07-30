/**
 * PORTFOLIO EVERTON - SCRIPT PRINCIPAL
 * Desenvolvedor Web Criativo
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Iniciando Portfolio Everton - Desenvolvedor Web Criativo');

    // Função auxiliar para debounce
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

    // Inicialização do Particles.js
    function initParticles() {
        if (typeof particlesJS === 'undefined') {
            console.warn('Particles.js não foi carregado.');
            return;
        }
        const isMobile = window.innerWidth <= 768;
        particlesJS('particles-js', {
            particles: {
                number: { value: isMobile ? 40 : 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    // Animação de digitação
    function initTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 70);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // Intersection Observer para animações de fade-in
    function initIntersectionObserver() {
        const animatedElements = document.querySelectorAll('.fade-in-animation, .fade-up-animation');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    }

    // Lógica da Sidebar
    function initSidebar() {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.getElementById('sidebarToggle');
        const overlay = document.getElementById('sidebarOverlay');
        const links = document.querySelectorAll('.sidebar-link');

        const closeSidebar = () => {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
        };
        
        toggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', closeSidebar);
        links.forEach(link => link.addEventListener('click', closeSidebar));
    }

    // Botão Voltar ao Topo
    function initBackToTop() {
        const backToTopButton = document.getElementById('backToTop');
        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        }, 100));

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Navegação suave e ativação de links
    function initSmoothScrollAndActiveLinks() {
        const links = document.querySelectorAll('.sidebar-link');
        const sections = document.querySelectorAll('section');

        links.forEach(link => {
            link.addEventListener('click', function(e) {
                if(this.href.includes('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href').substring(1);
                    const targetSection = document.getElementById(targetId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        window.addEventListener('scroll', debounce(() => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 150) {
                    current = section.getAttribute('id');
                }
            });

            links.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        }, 100));
    }

    // Inicia todas as funções
    initParticles();
    initTypingAnimation();
    initIntersectionObserver();
    initSidebar();
    initBackToTop();
    initSmoothScrollAndActiveLinks();
});
