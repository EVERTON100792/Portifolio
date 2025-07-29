/* ==========================================================================
   LÓGICA COMPLETA E CORRIGIDA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    //  LÓGICA DO MENU MOBILE (Método à Prova de Falhas)
    // ==========================================================================
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    // Função para FECHAR o menu
    const closeMenu = () => {
        if (navMenu) {
            navMenu.classList.remove('show-menu');
        }
    };
    
    // Função para ABRIR/FECHAR o menu com o botão
    const toggleMenu = () => {
        if (navMenu) {
            navMenu.classList.toggle('show-menu');
        }
    };

    // 1. Ação de clique no BOTÃO HAMBÚRGUER
    if (navToggle) {
        navToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });
    }

    // 2. Ação de clique nos LINKS DENTRO DO MENU para fechar
    if (navMenu) {
        navMenu.addEventListener('click', (event) => {
            if (event.target.classList.contains('nav__link')) {
                closeMenu();
            }
        });
    }
    
    // 3. Ação de clique FORA do menu para fechar
    document.addEventListener('click', (event) => {
        if (navMenu && navMenu.classList.contains('show-menu')) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = navToggle ? navToggle.contains(event.target) : false;

            if (!isClickInsideMenu && !isClickOnToggle) {
                closeMenu();
            }
        }
    });

    // ==========================================================================
    //  LÓGICA CENTRALIZADA DE SCROLL (Mais Eficiente)
    // ==========================================================================
    const handleScroll = () => {
        // --- Lógica do Header ---
        const header = document.getElementById('header');
        if (header) {
            window.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
        }

        // --- Lógica do Link Ativo ---
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector('.nav__menu a[href="#' + sectionId + '"]');
            
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav__menu a').forEach(link => link.classList.remove('active-link'));
                    correspondingLink.classList.add('active-link');
                }
            }
        });

        // --- Lógica do Botão Voltar ao Topo ---
        const scrollUp = document.getElementById('scroll-up');
        if (scrollUp) {
            window.scrollY >= 400 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
        }

        // --- Lógica do Botão WhatsApp ---
        const whatsAppButton = document.getElementById('whatsapp-float-button');
        if (whatsAppButton) {
            window.scrollY >= 400 ? whatsAppButton.classList.add('show') : whatsAppButton.classList.remove('show');
        }
    };

    // Adiciona apenas UM 'escutador' de evento de scroll para todas as funções
    window.addEventListener('scroll', handleScroll);

    // ==========================================================================
    //  OUTRAS LÓGICAS
    // ==========================================================================

    /* ANIMAÇÕES DE SCROLL REVEAL */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    const animatedElements = document.querySelectorAll('.section__header, .about__container, .project__card, .timeline__item, .contact__form');
    animatedElements.forEach((el) => observer.observe(el));

    /* EFEITO DE LUZ NO MOUSE */
    document.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    /* EFEITO 3D NOS CARDS DE PROJETO */
    const projectCards = document.querySelectorAll('.project__card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

});
