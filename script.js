document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       LÓGICA DO PRELOADER
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    const logoTextSpan = document.getElementById('logo-text');
    const body = document.body;

    if (preloader && logoTextSpan) {
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
            }, 1800);
        });
    }

    /* ==========================================================================
       LÓGICA DA ANIMAÇÃO DE FUNDO (PARTICLES.JS)
       ========================================================================== */
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": { "number": { "value": 80, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#334155" }, "shape": { "type": "circle" }, "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 3, "random": true }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 0.6, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false } },
            "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": false }, "onclick": { "enable": false }, "resize": true } },
            "retina_detect": true
        });
    }

    /* ==========================================================================
       LÓGICA DO MENU MOBILE (SIDEBAR)
       ========================================================================== */
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    if (navToggle && navMenu) {
        const closeMenu = () => navMenu.classList.remove('show-menu');

        navToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            navMenu.classList.toggle('show-menu');
        });
        
        navMenu.addEventListener('click', (event) => {
            if (event.target.classList.contains('nav__link')) {
                closeMenu();
            }
        });

        document.addEventListener('click', (event) => {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            if (!isClickInsideMenu && !isClickOnToggle && navMenu.classList.contains('show-menu')) {
                closeMenu();
            }
        });
    }
    
    /* ==========================================================================
       LÓGICA DO DIAGNÓSTICO DIGITAL
       ========================================================================== */
    const diagnosisOptions = document.querySelectorAll('.diagnosis__questions .option');
    const diagnosisText = document.getElementById('diagnosis-text');
    const diagnosisCta = document.getElementById('diagnosis-cta');
    const userAnswers = {};
    const totalQuestions = 3;

    function generateDiagnosis() {
        if (Object.keys(userAnswers).length !== totalQuestions) return;

        let text = "<b>Diagnóstico:</b> ";
        if (userAnswers['1'] === 'nao-tenho') {
            text += "Você está no ponto de partida ideal. Um <b>Site Institucional</b> é o primeiro passo para estabelecer sua marca e gerar credibilidade.";
        } else if (userAnswers['2'] === 'lento' || userAnswers['2'] === 'nao-sei') {
            text += "Sua presença online pode estar sendo prejudicada. A solução é um <b>design 100% responsivo e otimizado para velocidade</b>.";
        } else if (userAnswers['3'] === 'raramente' || userAnswers['3'] === 'nunca' || userAnswers['1'] === 'tenho-insatisfeito') {
            text += "Seu site não está funcionando como ferramenta de negócios. Precisamos focar em uma <b>Landing Page de Alta Conversão</b> ou reestruturar seu site atual.";
        } else {
            text += "Sua base digital é boa, mas sempre há espaço para otimizar! Podemos melhorar a estratégia de conversão para <b>aumentar ainda mais seus resultados</b>.";
        }
        
        diagnosisText.innerHTML = text;
        if (diagnosisCta) {
            diagnosisCta.classList.add('visible');
        }
    }

    diagnosisOptions.forEach(option => {
        option.addEventListener('click', () => {
            const parentCard = option.closest('.question__card');
            if (!parentCard) return;

            const questionNumber = parentCard.dataset.question;
            userAnswers[questionNumber] = option.dataset.value;

            parentCard.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
            option.classList.add('selected');
            
            generateDiagnosis();
        });
    });

    /* ==========================================================================
       LÓGICA DE SCROLL
       ========================================================================== */
    const header = document.getElementById('header');
    const scrollUp = document.getElementById('scroll-up');
    const whatsAppButton = document.getElementById('whatsapp-float-button');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__menu a[href^="#"]');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        if (header) {
            scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
        }

        if (navMenu && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
        }

        let currentSectionId = '';
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === '#' + currentSectionId) {
                link.classList.add('active-link');
            }
        });

        if (scrollUp) {
            scrollY >= 400 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
        }
        if (whatsAppButton) {
            scrollY >= 400 ? whatsAppButton.classList.add('show') : whatsAppButton.classList.remove('show');
        }
    };
    window.addEventListener('scroll', handleScroll);

    /* ==========================================================================
       LÓGICA DO OBSERVER PARA ANIMAÇÕES AO SCROLLAR
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.section__header, .about__container, .project__card, .service__card, .diagnosis__container, .contact__form, .academic__item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach((el) => {
        el.classList.add('animated-element');
        observer.observe(el);
    });
});
