/* ==========================================================================
   LÓGICA COMPLETA E CORRIGIDA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    //  LÓGICA DO MENU MOBILE (Método à Prova de Falhas)
    // ==========================================================================
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    // Função para FECHAR o menu
    const closeMenu = () => {
        if (navMenu) {
            navMenu.classList.remove('show-menu');
        }
    };
    
    // Função para ABRIR/FECHAR o menu com o botão
    const toggleMenu = () => {
        if (navMenu) {
            navMenu.classList.toggle('show-menu');
        }
    };

    // 1. Ação de clique no BOTÃO HAMBÚRGUER para abrir/fechar
    if (navToggle) {
        navToggle.addEventListener('click', (event) => {
            event.stopPropagation(); // Impede que o clique se propague para outros 'escutadores'
            toggleMenu();
        });
    }

    // 2. Ação de clique nos LINKS DENTRO DO MENU para fechar (Correção Definitiva)
    if (navMenu) {
        navMenu.addEventListener('click', (event) => {
            // Verifica se o elemento clicado DENTRO do menu é um link
            if (event.target.classList.contains('nav__link')) {
                closeMenu(); // Se for um link, simplesmente fecha o menu.
            }
        });
    }
    
    // ==========================================================================
    //  LÓGICA ADICIONAL DA PÁGINA
    // ==========================================================================

    /* MUDAR ESTILO DO HEADER AO ROLAR */
    const scrollHeader = () => {
        const header = document.getElementById('header');
        if (header) {
            window.scrollY >= 50 ? header.classList.add('scroll-header') : header.classList.remove('scroll-header');
        }
    };
    window.addEventListener('scroll', scrollHeader);

    /* MARCAR LINK ATIVO NA NAVEGAÇÃO */
    const sections = document.querySelectorAll('section[id]');
    const scrollActive = () => {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector('.nav__menu a[href="#' + sectionId + '"]');

            if (correspondingLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    // Remove a classe de todos antes de adicionar à correta
                    document.querySelectorAll('.nav__menu a').forEach(link => link.classList.remove('active-link'));
                    correspondingLink.classList.add('active-link');
                }
            }
        });
    };
    window.addEventListener('scroll', scrollActive);


    /* BOTÃO VOLTAR AO TOPO */
    const scrollTop = () => {
        const scrollUp = document.getElementById('scroll-up');
        if (scrollUp) {
            window.scrollY >= 400 ? scrollUp.classList.add('show-scroll') : scrollUp.classList.remove('show-scroll');
        }
    };
    window.addEventListener('scroll', scrollTop);

    /* ANIMAÇÕES DE SCROLL REVEAL */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    const animatedElements = document.querySelectorAll('.section__header, .about__container, .project__card, .timeline__item, .contact__form');
    animatedElements.forEach((el) => observer.observe(el));
});
