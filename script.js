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
   LÓGICA PRINCIPAL DA PÁGINA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // LÓGICA DO MENU MOBILE, FAQ, SCROLL, OBSERVER...
    const navMenu=document.getElementById("nav-menu"),navToggle=document.getElementById("nav-toggle");const closeMenu=()=>{navMenu&&navMenu.classList.remove("show-menu")},toggleMenu=()=>{navMenu&&navMenu.classList.toggle("show-menu")};navToggle&&navToggle.addEventListener("click",e=>{e.stopPropagation(),toggleMenu()}),navMenu&&navMenu.addEventListener("click",e=>{e.target.classList.contains("nav__link")&&closeMenu()}),document.addEventListener("click",e=>{navMenu&&navMenu.classList.contains("show-menu")&&(!navMenu.contains(e.target)&&!(navToggle?navToggle.contains(e.target):!1))&&closeMenu()});const faqItems=document.querySelectorAll(".faq__item");faqItems.forEach(e=>{const t=e.querySelector(".faq__header");t.addEventListener("click",()=>{const o=document.querySelector(".faq__item.active");o&&o!==e&&o.classList.remove("active"),e.classList.toggle("active")})});const handleScroll=()=>{const e=document.getElementById("header");e&&(window.scrollY>=50?e.classList.add("scroll-header"):e.classList.remove("scroll-header"));const t=document.querySelectorAll("section[id]"),o=window.pageYOffset;t.forEach(e=>{const t=e.offsetHeight,n=e.offsetTop-58,c=e.getAttribute("id"),s=document.querySelector('.nav__menu a[href="#'+c+'"]');s&&(o>n&&o<=n+t?(document.querySelectorAll(".nav__menu a").forEach(e=>e.classList.remove("active-link")),s.classList.add("active-link")):s.classList.remove("active-link"))});const n=document.getElementById("scroll-up");n&&(window.scrollY>=400?n.classList.add("show-scroll"):n.classList.remove("show-scroll"));const c=document.getElementById("whatsapp-float-button");c&&(window.scrollY>=400?c.classList.add("show"):c.classList.remove("show"))};window.addEventListener("scroll",handleScroll);const observer=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add("is-visible")})},{threshold:.1});const animatedElements=document.querySelectorAll(".section__header, .about__container, .project__card, .service__card, .process__step, .testimonial__card, .faq__item, .diagnosis__container");animatedElements.forEach(e=>{observer.observe(e)}),document.addEventListener("mousemove",e=>{document.documentElement.style.setProperty("--mouse-x",`${e.clientX}px`),document.documentElement.style.setProperty("--mouse-y",`${e.clientY}px`)});

    // ==========================================================================
    //  NOVA LÓGICA DO DIAGNÓSTICO DIGITAL
    // ==========================================================================
    const diagnosisOptions = document.querySelectorAll('.diagnosis__questions .option');
    const diagnosisText = document.getElementById('diagnosis-text');
    const diagnosisCta = document.getElementById('diagnosis-cta');
    const userAnswers = {};
    const totalQuestions = 3;

    function generateDiagnosis() {
        if (Object.keys(userAnswers).length !== totalQuestions) return;

        let text = "<b>Diagnóstico:</b> ";
        
        if (userAnswers['1'] === 'nao-tenho') {
            text += "Você está no ponto de partida ideal. Um <b>Site Institucional</b> é o primeiro passo para estabelecer sua marca e gerar credibilidade. ";
        } else if (userAnswers['2'] === 'lento' || userAnswers['2'] === 'nao-sei') {
            text += "Sua presença online pode estar sendo prejudicada por uma má experiência em celulares. Isso afeta seu ranking no Google. A solução é um <b>design 100% responsivo e otimizado para velocidade</b>. ";
        } else if (userAnswers['3'] === 'raramente' || userAnswers['3'] === 'nunca') {
            text += "Seu site não está funcionando como uma ferramenta de negócios. Precisamos focar em uma <b>Landing Page de Alta Conversão</b> ou reestruturar seu site com chamadas para ação claras. ";
        } else {
            text += "Sua base digital é boa, mas sempre há espaço para otimizar! Podemos melhorar a velocidade e a estratégia de conversão para <b>aumentar ainda mais seus resultados</b>. ";
        }

        diagnosisText.innerHTML = text;
        diagnosisCta.style.display = 'inline-flex';
        setTimeout(() => {
            diagnosisCta.style.transform = 'scale(1)';
        }, 100);
    }

    diagnosisOptions.forEach(option => {
        option.addEventListener('click', () => {
            const parentCard = option.closest('.question__card');
            const questionNumber = parentCard.dataset.question;
            const selectedValue = option.dataset.value;

            userAnswers[questionNumber] = selectedValue;
            parentCard.querySelectorAll('.option').forEach(btn => btn.classList.remove('selected'));
            option.classList.add('selected');
            generateDiagnosis();
        });
    });
});
