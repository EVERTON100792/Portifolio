/* ==========================================================================
   LÓGICA DO PRELOADER (VERSÃO SIMPLIFICADA E À PROVA DE FALHAS)
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

        // Inicia a digitação imediatamente
        typeWriter();

        // Espera a página inteira carregar (incluindo imagens)
        window.addEventListener('load', () => {
            // Garante que o preloader fique visível por pelo menos 2 segundos
            setTimeout(() => {
                preloader.classList.add('hidden');
                body.classList.remove('preloader-active');
            }, 2000); // 2 segundos de duração mínima
        });
    } else {
        // Se algo der errado, remove o preloader para não travar o site
        const preloaderEl = document.getElementById('preloader');
        if (preloaderEl) {
           preloaderEl.classList.add('hidden');
        }
        document.querySelector('body').classList.remove('preloader-active');
    }

    /* ==========================================================================
       LÓGICA PRINCIPAL DA PÁGINA (GARANTIDA PARA RODAR)
       ========================================================================== */

    // LÓGICA DO MENU MOBILE
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

    // LÓGICA DO FAQ (ACORDEÃO)
    const faqItems = document.querySelectorAll('.faq__item');
    faqItems.forEach((item) => {
        const header = item.querySelector('.faq__header');
        header.addEventListener('click', () => {
            const openItem = document.querySelector('.faq__item.active');
            if(openItem && openItem !== item) { openItem.classList.remove('active'); }
            item.classList.toggle('active');
        });
    });

    // LÓGICA DO DIAGNÓSTICO DIGITAL
    const diagnosisOptions = document.querySelectorAll('.diagnosis__questions .option');
    const diagnosisText = document.getElementById('diagnosis-text');
    const diagnosisCta = document.getElementById('diagnosis-cta');
    const userAnswers = {};
    const totalQuestions = 3;
    function generateDiagnosis() {
        if (Object.keys(userAnswers).length !== totalQuestions) return;
        let text = "<b>Diagnóstico:</b> ";
        if (userAnswers['1'] === 'nao-tenho') { text += "Você está no ponto de partida ideal. Um <b>Site Institucional</b> é o primeiro passo para estabelecer sua marca e gerar credibilidade."; } 
        else if (userAnswers['2'] === 'lento' || userAnswers['2'] === 'nao-sei') { text += "Sua presença online pode estar sendo prejudicada por uma má experiência em celulares. A solução é um <b>design 100% responsivo e otimizado para velocidade</b>."; } 
        else if (userAnswers['3'] === 'raramente' || userAnswers['3'] === 'nunca') { text += "Seu site não está funcionando como uma ferramenta de negócios. Precisamos focar em uma <b>Landing Page de Alta Conversão</b> ou reestruturar seu site com chamadas para ação claras."; } 
        else { text += "Sua base digital é boa, mas sempre há espaço para otimizar! Podemos melhorar a velocidade e a estratégia de conversão para <b>aumentar ainda mais seus resultados</b>."; }
        diagnosisText.innerHTML = text;
        diagnosisCta.style.display = 'inline-flex';
        setTimeout(() => { diagnosisCta.style.transform = 'scale(1)'; }, 100);
    }
    diagnosisOptions.forEach(option => {
        option.addEventListener('click', () => {
            const parentCard = option.closest('.question__card');
            if (!parentCard) return;
            const questionNumber = parentCard.dataset.question;
            const selectedValue = option.dataset.value;
            userAnswers[questionNumber] = selectedValue;
            parentCard.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
            option.classList.add('selected');
            generateDiagnosis();
        });
    });

    // LÓGICA CENTRALIZADA DE SCROLL
    const handleScroll = () => {
        const header = document.getElementById('header');
        if (header) { window.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header'); }
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight, sectionTop = current.offsetTop - 58, sectionId = current.getAttribute('id'),
                  correspondingLink = document.querySelector('.nav__menu a[href="#' + sectionId + '"]');
            if (correspondingLink) {
                document.querySelectorAll('.nav__menu a').forEach(link => link.classList.remove('active-link'));
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    correspondingLink.classList.add('active-link');
                }
            }
        });
        if (scrollY < sections[0].offsetTop - 58) {
             document.querySelectorAll('.nav__menu a').forEach(link => link.classList.remove('active-link'));
             const homeLink = document.querySelector('.nav__menu a[href="#hero"]');
             if(homeLink) homeLink.classList.add('active-link');
        }
        const scrollUp = document.getElementById('scroll-up');
        if (scrollUp) { window.scrollY >= 400 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll'); }
        const whatsAppButton = document.getElementById('whatsapp-float-button');
        if (whatsAppButton) { window.scrollY >= 400 ? whatsAppButton.classList.add('show') : whatsAppButton.classList.remove('show'); }
    };
    window.addEventListener('scroll', handleScroll);

    // LÓGICA DO OBSERVER PARA ANIMAÇÕES
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); }});
    }, { threshold: 0.1 });
    const animatedElements = document.querySelectorAll('.section__header, .about__container, .project__card, .service__card, .process__step, .testimonial__card, .faq__item, .diagnosis__container, .contact__form');
    animatedElements.forEach((el) => observer.observe(el));
});
