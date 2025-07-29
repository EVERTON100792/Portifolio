/* ==========================================================================
   MOSTRAR E ESCONDER O MENU MOBILE
   ========================================================================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle');

// Função para mostrar/esconder o menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show-menu');
    });
}

/* ==========================================================================
   A SOLUÇÃO PARA O SEU PROBLEMA ESTÁ AQUI
   Fecha o menu quando um link (ex: Sobre, Projetos) é clicado
   ========================================================================== */
const navLinks = document.querySelectorAll('.nav__link');

const linkAction = () => {
    // Quando clicamos em um link do menu, removemos a classe show-menu para fechá-lo
    navMenu.classList.remove('show-menu');
};
navLinks.forEach(link => link.addEventListener('click', linkAction));


/* ==========================================================================
   FECHAR O MENU AO CLICAR FORA (NA ÁREA DE CONTEÚDO)
   ========================================================================== */
const mainContent = document.querySelector('.main');

const closeMenuOnClickContent = () => {
    // Verifica se o menu está atualmente visível
    if (navMenu.classList.contains('show-menu')) {
        // Remove a classe para esconder o menu
        navMenu.classList.remove('show-menu');
    }
};
// Adiciona o 'ouvinte' de clique à tag <main>
mainContent.addEventListener('click', closeMenuOnClickContent);


/* ==========================================================================
   MUDAR ESTILO DO HEADER AO ROLAR A PÁGINA
   ========================================================================== */
const scrollHeader = () => {
    const header = document.getElementById('header');
    // Quando a rolagem for maior que 50, adiciona a classe scroll-header
    window.scrollY >= 50 ? header.classList.add('scroll-header') 
                         : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);


/* ==========================================================================
   MARCAR LINK ATIVO NA NAVEGAÇÃO CONFORME A ROLAGEM
   ========================================================================== */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58; // 58px = altura do header
        const sectionId = current.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            correspondingLink.classList.add('active-link');
        } else {
            correspondingLink.classList.remove('active-link');
        }
    });
};
window.addEventListener('scroll', scrollActive);


/* ==========================================================================
   BOTÃO DE VOLTAR AO TOPO
   ========================================================================== */
const scrollTop = () => {
    const scrollUp = document.getElementById('scroll-up');
    // Quando a rolagem for maior que 400, mostra o botão
    window.scrollY >= 400 ? scrollUp.classList.add('show-scroll')
                          : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollTop);


/* ==========================================================================
   ANIMAÇÕES DE SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1 // Ativa quando 10% do elemento está visível
});

const animatedElements = document.querySelectorAll('.section__header, .about__container, .project__card, .timeline__item, .contact__form');
animatedElements.forEach((el) => observer.observe(el));


/* ==========================================================================
   EFEITO DE LUZ (SPOTLIGHT) NO MOUSE
   ========================================================================== */
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});


/* ==========================================================================
   EFEITO 3D NOS CARDS DE PROJETO
   ========================================================================== */
const projectCards = document.querySelectorAll('.project__card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -7; // Rotação máxima de 7 graus
        const rotateY = ((x - centerX) / centerX) * 7;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});
