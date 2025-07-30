/* ==========================================================================
   LÓGICA DO PRELOADER
   ========================================================================== */
const preloader = document.getElementById('preloader');
const logoTextSpan = document.getElementById('logo-text');
const body = document.querySelector('body');
let isTypingFinished = false;
let isWindowLoaded = false;

function tryToHidePreloader() {
    if (isTypingFinished && isWindowLoaded) {
        setTimeout(() => {
            if (preloader) preloader.classList.add('hidden');
            body.classList.remove('preloader-active');
        }, 200);
    }
}

if (preloader && logoTextSpan && body) {
    const logoText = "Everton.dev";
    body.classList.add('preloader-active');
    let i = 0;
    function typeWriter() {
        if (i < logoText.length) {
            logoTextSpan.innerHTML += logoText.charAt(i);
            i++;
            setTimeout(typeWriter, 120);
        } else {
            isTypingFinished = true;
            tryToHidePreloader();
        }
    }
    window.addEventListener('load', () => {
        isWindowLoaded = true;
        tryToHidePreloader();
    });
    typeWriter();
} else {
    if (preloader) preloader.classList.add('hidden');
    if (body) body.classList.remove('preloader-active');
}


/* ==========================================================================
   LÓGICA DA ANIMAÇÃO DE FUNDO (PARTICLES.JS)
   ========================================================================== */
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 60,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#475569"
        },
        "shape": {
            "type": "circle"
        },
        "opacity": {
            "value": 0.3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.05,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": false
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "enable": true,
            "speed": 0.6,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
            "bounce": false
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": false
            },
            "onclick": {
                "enable": false
            },
            "resize": true
        }
    },
    "retina_detect": true
});


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
            text += "Sua presença online pode estar sendo prejudicada por uma má experiência em celulares, afetando seu ranking no Google. A solução é um <b>design 100% responsivo e otimizado para velocidade</b>.";
        } else if (userAnswers['3'] === 'raramente' || userAnswers['3'] === 'nunca') {
            text += "Seu site não está funcionando como uma ferramenta de negócios. Precisamos focar em uma <b>Landing Page de Alta Conversão</b> ou reestruturar seu site com chamadas para ação claras.";
        } else {
            text += "Sua base digital é boa, mas sempre há espaço para otimizar! Podemos melhorar a velocidade e a estratégia de conversão para <b>aumentar ainda mais seus resultados</b>.";
        }

        diagnosisText.innerHTML = text;
        diagnosisCta.style.display = 'inline-flex';
        setTimeout(() => {
            diagnosisCta.style.transform = 'scale(1)';
