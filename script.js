/*=============== MOSTRAR E ESCONDER O MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navLinks = document.querySelectorAll('.nav__link');

/*===== MOSTRAR MENU =====*/
/* Valida se a constante existe */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.toggle('show-menu');
    });
}

/*===== ESCONDER MENU (AO CLICAR NO LINK) =====*/
/* A SOLUÇÃO DEFINITIVA ESTÁ AQUI */
const linkAction = () => {
    // Esta linha garante que estamos nos referindo ao navMenu correto
    const navMenuToClose = document.getElementById('nav-menu');
    // E esta linha remove a classe para fechar o menu
    navMenuToClose.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));


/*=============== MUDAR BACKGROUND DO HEADER AO ROLAR ===============*/
const scrollHeader = () => {
    const header = document.getElementById('header');
    // Quando a rolagem for maior que 50, adiciona a classe scroll-header
    window.scrollY >= 50 ? header.classList.add('scroll-header') 
                         : header.classList.remove('scroll-header');
};
window.addEventListener('scroll', scrollHeader);


/*=============== MARCAR LINK ATIVO NA NAVEGAÇÃO ===============*/
const sections = document.querySelectorAll('section[id]');
    
const scrollActive = () =>{
  	const scrollY = window.pageYOffset;

	sections.forEach(current =>{
		const sectionHeight = current.offsetHeight,
			  sectionTop = current.offsetTop - 58,
			  sectionId = current.getAttribute('id'),
			  sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

		if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
			sectionsClass.classList.add('active-link');
		}else{
			sectionsClass.classList.remove('active-link');
		}                                                    
	})
}
window.addEventListener('scroll', scrollActive);


/*=============== BOTÃO VOLTAR AO TOPO ===============*/ 
const scrollTop = () =>{
    const scrollUp = document.getElementById('scroll-up');
    // Quando a rolagem for maior que 350, mostra o botão
	window.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
						  : scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

/*=============== ANIMAÇÃO DE SCROLL REVEAL ===============*/
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1
});

const animatedElements = document.querySelectorAll('.section__header, .about__container, .project__card, .timeline__item, .contact__form');
animatedElements.forEach((el) => observer.observe(el));


/*=============== EFEITO DE LUZ NO MOUSE ===============*/
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

/*=============== EFEITO 3D NOS CARDS DE PROJETO ===============*/
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

/*=============== FECHAR MENU AO CLICAR FORA ===============*/
const mainContent = document.querySelector('.main');

const closeMenuOnClickContent = () => {
    if (navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
    }
};
mainContent.addEventListener('click', closeMenuOnClickContent);
