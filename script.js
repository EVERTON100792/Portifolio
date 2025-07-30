/* ==========================================================================
   LÓGICA DO PRELOADER (COM REVELAÇÃO SINCRONIZADA)
   ========================================================================== */

// Seleciona os elementos do preloader
const preloader = document.getElementById('preloader');
const logoTextSpan = document.getElementById('logo-text');
const body = document.querySelector('body');

// Variáveis de controle para a sincronização
let isTypingFinished = false;
let isWindowLoaded = false;

// Função "gatekeeper": só revela o site quando ambas as condições são verdadeiras
function tryToHidePreloader() {
    if (isTypingFinished && isWindowLoaded) {
        // Um pequeno delay para a transição ficar mais suave
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add('hidden');
            }
            body.classList.remove('preloader-active'); // Libera o scroll
        }, 200); // 200ms de pausa antes de sumir
    }
}

// Verifica se todos os elementos do preloader existem antes de rodar a lógica
if (preloader && logoTextSpan && body) {
    const logoText = "Everton.dev";
    
    body.classList.add('preloader-active'); // Bloqueia o scroll

    // 1. Lógica da Animação de "digitar"
    let i = 0;
    function typeWriter() {
        if (i < logoText.length) {
            logoTextSpan.innerHTML += logoText.charAt(i);
            i++;
            setTimeout(typeWriter, 120); // Velocidade da digitação
        } else {
            // AVISO: A digitação terminou!
            isTypingFinished = true;
            tryToHidePreloader(); // Tenta revelar o site
        }
    }

    // 2. Lógica de Carregamento da Página
    window.addEventListener('load', () => {
        // AVISO: A página carregou!
        isWindowLoaded = true;
        tryToHidePreloader(); // Tenta revelar o site
    });

    // Inicia a animação de digitação
    typeWriter();

} else {
    // Fallback: Se os elementos do preloader não forem encontrados, remove-o para não travar o site
    if (preloader) {
       preloader.classList.add('hidden');
    }
    if (body) {
        body.classList.remove('preloader-active');
    }
}

/* ==========================================================================
   LÓGICA PRINCIPAL DA PÁGINA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    const closeMenu = () => { if (navMenu) navMenu.classList.remove('show-menu'); };
    const toggleMenu = () => { if (navMenu) navMenu.classList.toggle('show-menu'); };

    if (navToggle) {
        navToggle.addEventListener('click', (event) => { event.stopPropagation(); toggleMenu(); });
    }
    if (navMenu) {
        navMenu.addEventListener('click', (event) => { if (event.target.classList.contains('nav__link')) { closeMenu(); }});
    }
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
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight, sectionTop = current.offsetTop - 58, sectionId = current.getAttribute('id'),
                  correspondingLink = document.querySelector('.nav__menu a[href="#' + sectionId + '"]');
            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav__menu a').forEach(link => link.classList.remove('active-link'));
                    correspondingLink.classList.add('active-link');
                }
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
    const animatedElements = document.querySelectorAll('.section__header, .about__container, .project__card, .timeline__item, .contact__form, .service__card, .process__step, .testimonial__card, .faq__item');
    animatedElements.forEach((el) => observer.observe(el));

    document.addEventListener('mousemove', (e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    });
});
