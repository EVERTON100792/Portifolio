/* ==========================================================================
   LÓGICA COMPLETA E CORRIGIDA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    //  LÓGICA DO MENU MOBILE (Método à Prova de Falhas)
    // ==========================================================================
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    const closeMenu = () => {
        if (navMenu) navMenu.classList.remove('show-menu');
    };
    
    const toggleMenu = () => {
        if (navMenu) navMenu.classList.toggle('show-menu');
    };

    if (navToggle) {
        navToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            toggleMenu();
        });
    }

    if (navMenu) {
        navMenu.addEventListener('click', (event) => {
            if (event.target.classList.contains('nav__link')) {
                closeMenu();
            }
        });
    }
    
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
        const header = document.getElementById('header');
        if (header) {
            window.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
        }

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

        const scrollUp = document.getElementById('scroll-up');
        if (scrollUp) {
            window.scrollY >= 400 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
        }

        const whatsAppButton = document.getElementById('whatsapp-float-button');
        if (whatsAppButton) {
            window.scrollY >= 400 ? whatsAppButton.classList.add('show') : whatsAppButton.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScroll);

    // ==========================================================================
    //  OUTRAS LÓGICAS
    // ==========================================================================
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    const animatedElements = document.querySelectorAll('.section__header, .about__container, .project__card, .timeline__item, .contact__form');
    animatedElements.forEach((el) => observer.observe(el));

    document.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });

    /* O código do efeito 3D foi removido daqui para dar lugar à nova animação CSS. */

});
