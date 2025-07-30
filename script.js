/* ==========================================================================
   LÓGICA DO PRELOADER
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const logoTextSpan = document.getElementById('logo-text');
    const body = document.querySelector('body');

    if (preloader && logoTextSpan && body) {
        body.classList.add('preloader-active');
        const logoText = "Everton.dev";
        let i = 0;

        function typeWriter() {
            if (i < logoText.length) {
                logoTextSpan.innerHTML += logoText.charAt(i);
                i++;
                setTimeout(typeWriter, 120);
            }
        }

        typeWriter();

        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                body.classList.remove('preloader-active');
            }, 2000);
        });
    } else {
        const preloaderEl = document.getElementById('preloader');
        if (preloaderEl) {
           preloaderEl.classList.add('hidden');
        }
        document.querySelector('body').classList.remove('preloader-active');
    }

    /* ==========================================================================
       LÓGICA DA ANIMAÇÃO DE FUNDO (PARTICLES.JS)
       ========================================================================== */
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#475569" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": false },
                "move": { "enable": true, "speed": 0.6, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } },
            "retina_detect": true
        });
    }

    /* ==========================================================================
       LÓGICA PRINCIPAL DA PÁGINA
       ========================================================================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const closeMenu = () => { if (navMenu) navMenu.classList.remove('show-menu'); };
    const toggleMenu = () => { if (navMenu) navMenu.classList.toggle('show-menu'); };
    if (navToggle) { navToggle.addEventListener('click', (event) => { event.stopPropagation(); toggleMenu(); }); }
    if (navMenu) { navMenu.addEventListener('click', (event) => { if (event.target.classList.contains('nav__link')) { closeMenu(); }}); }
    document.addEventListener('click', (event) => {
        if (navMenu && navMenu.classList.contains('show-menu')) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = navToggle ? navToggle.contains(event.target) : false;
            if (!isClickInsideMenu && !isClickOnToggle) { closeMenu(); }
        }
    });

    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach((item) => {
        const header = item.querySelector('.faq__header');
        header.addEventListener('click', () => {
            const openItem = document.querySelector('.faq__item.active');
            if(openItem && openItem !== item) { openItem.classList.remove('active'); }
            item.classList.toggle('active');
        });
    });

    const handleScroll = () => {
        const header = document.getElementById('header');
        if (header) { window.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header'); }
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        let currentSectionId = null;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight, sectionTop = current.offsetTop - 58;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });
        document.querySelectorAll('.nav__menu a').forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active-link');
            }
        });
        const scrollUp = document.getElementById('scroll-up');
        if (scrollUp) { window.scrollY >= 400 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll'); }
        const whatsAppButton = document.getElementById('whatsapp-float-button');
        if (whatsAppButton) { window.scrollY >= 400 ? whatsAppButton.classList.add('show') : whatsAppButton.classList.remove('show'); }
    };
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); }});
    }, { threshold: 0.1 });
    const animatedElements = document.querySelectorAll('.section__header, .about__container, .project__card, .service__card, .process__step, .testimonial__card, .faq__item, .diagnosis__container, .contact__form');
    animatedElements.forEach((el) => observer.observe(el));
});
