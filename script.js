/* ==========================================================================
   NAVIGATION & HEADER
   ========================================================================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navLinks = document.querySelectorAll('.nav__link');

// Function to show/hide the mobile menu
const toggleMenu = () => navMenu.classList.toggle('show-menu');
navToggle.addEventListener('click', toggleMenu);

// Function to close the menu when a link is clicked
const linkAction = () => {
    navMenu.classList.remove('show-menu');
};
navLinks.forEach(link => link.addEventListener('click', linkAction));

// Function to change header style on scroll
const scrollHeader = () => {
    const header = document.getElementById('header');
    window.scrollY >= 50 ? header.classList.add('scroll-header') 
                         : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);


/* ==========================================================================
   ACTIVE LINK ON SCROLL
   ========================================================================== */
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58; // 58px = header height
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
   SCROLL TO TOP BUTTON
   ========================================================================== */
const scrollTop = () => {
    const scrollUp = document.getElementById('scroll-up');
    window.scrollY >= 400 ? scrollUp.classList.add('show-scroll')
                          : scrollUp.classList.remove('show-scroll');
};
window.addEventListener('scroll', scrollTop);

/* ==========================================================================
   SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
   ========================================================================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1 // Triggers when 10% of the element is visible
});

// Observe all sections and elements with the 'animate' class
const animatedElements = document.querySelectorAll('.section__header, .about__container, .project__card, .timeline__item, .contact__form');
animatedElements.forEach((el) => observer.observe(el));


/* ==========================================================================
   SPOTLIGHT MOUSE EFFECT
   ========================================================================== */
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

/* ==========================================================================
   PROJECT CARD 3D TILT EFFECT
   ========================================================================== */
const projectCards = document.querySelectorAll('.project__card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -7; // Max rotation 7 degrees
        const rotateY = ((x - centerX) / centerX) * 7;  // Max rotation 7 degrees
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});
/* ==========================================================================
   FECHAR O MENU AO CLICAR FORA (NA ÁREA DE CONTEÚDO)
   ========================================================================== */
const mainContent = document.querySelector('.main');

const closeMenuOnClickContent = () => {
    // Verifica se o menu está atualmente visível (contém a classe 'show-menu')
    if (navMenu.classList.contains('show-menu')) {
        // Remove a classe para 'encolher' ou esconder o menu
        navMenu.classList.remove('show-menu');
    }
};

// Adiciona um 'ouvinte' de clique à tag <main>
mainContent.addEventListener('click', closeMenuOnClickContent);
