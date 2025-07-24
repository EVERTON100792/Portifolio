# Site de Portfólio Pessoal do Everton
Resumo do Projeto
É um site de portfólio de uma página só, feito para o Everton, um desenvolvedor web criativo. O projeto foi construído usando apenas HTML, CSS e JavaScript (o que chamamos de "vanilla"), sem usar frameworks como React ou Angular. O foco foi em ter um site rápido e com animações agradáveis.

O site tem um fundo interativo com partículas, animações na linha do tempo, uma galeria de projetos e integração com o WhatsApp para clientes entrarem em contato.

Arquitetura do Sistema
O site funciona inteiramente no navegador do usuário, com três partes principais:

Estrutura (HTML): Uma única página HTML, organizada de forma semântica (com tags como <section>, <nav>, etc.).

Estilo (CSS): Estilização moderna usando CSS puro, com variáveis para facilitar a troca de cores e temas.

Interatividade (JavaScript): JavaScript puro, sem bibliotecas ou frameworks, para cuidar de todas as animações e interações.

Design Responsivo (Mobile-First): O site foi desenhado primeiro para funcionar bem em celulares e depois foi adaptado para telas maiores, como tablets e computadores.

Decisões Importantes no Projeto:

Sem Frameworks: A escolha foi para deixar o site mais leve, carregar mais rápido e mostrar o domínio das tecnologias base da web.

Otimização de Desempenho: Usa uma tecnologia chamada Intersection Observer para que as animações só comecem quando o usuário rolar a página até elas. Isso economiza processamento.

Recursos Modernos de CSS: Usa Grid, Flexbox e variáveis CSS para um código mais limpo e fácil de dar manutenção.

Principais Componentes
Seção Principal (Hero)

Fundo Interativo: Usa a biblioteca Particles.js para criar um efeito de partículas que reagem ao movimento do mouse.

Animação de Digitação: O título principal tem um efeito de texto sendo digitado.

Botão de Ação: Um botão que leva o cliente direto para o WhatsApp.

Seção Sobre Mim

Apresentação Profissional: Uma foto e um texto que aparecem com uma animação suave de "fade-in".

Animação Inteligente: A animação só é ativada quando a seção aparece na tela.

Linha do Tempo

Interativa: Mostra a jornada de aprendizado de forma vertical.

Animação Progressiva: A linha do tempo vai "se desenhando" conforme o usuário rola a página.

Planos Futuros: Mostra também o que você planeja estudar a seguir.

Galeria de Projetos

Layout em Cards: Uma grade com os projetos em formato de "cartões".

Projetos Reais: Mostra projetos de verdade que foram concluídos, como a plataforma "Prof Vane PDFs".

Botões de Ação: Cada projeto tem botões para "Ver Site" e "Ver Código".

Pré-visualizações customizadas: Imagens únicas em SVG para cada projeto.

Efeitos de Hover: Uma leve animação de escala quando o mouse passa por cima dos cards.

Botão Flutuante do WhatsApp

Sempre Visível: Fica fixo no canto inferior direito da tela.

Animação de Pulso: Tem uma animação contínua para chamar a atenção.

Mensagem Pronta: Já abre o WhatsApp com uma mensagem pré-configurada para o cliente.

Dependências e Integrações
Bibliotecas: Particles.js (fundo animado), Font Awesome (ícones) e Google Fonts (para a fonte Poppins). Todos são carregados externamente (via CDN) para não pesar no seu site.

Integrações:

API do WhatsApp Business: Para o contato direto com clientes.

Links de Projetos Reais: Links para os sites e repositórios dos projetos.

Prof Vane PDFs: Um projeto real que usa a plataforma de pagamentos da Hotmart.

Estratégia de Hospedagem
Hospedagem Estática: Como o site é feito só de arquivos HTML, CSS e JS, ele não precisa de um servidor complexo para funcionar. Pode ser hospedado em qualquer serviço de hospedagem estática (Netlify, Vercel, GitHub Pages, etc.).

Desempenho: As animações só carregam quando são vistas, e as bibliotecas vêm de CDNs, o que ajuda no cache e na velocidade.

Responsividade: O layout se adapta perfeitamente a celulares, tablets e desktops.

Últimas Atualizações (23 de julho de 2025)
Legal ver as atualizações de ontem! Ficou muito bom.

Novo Sistema de Menu
Menu Hambúrguer: O menu lateral tradicional foi trocado por um menu hambúrguer mais moderno e limpo.

Menu Escondido: Agora, o menu fica totalmente escondido e só aparece quando o usuário clica no ícone.

Animações Suaves: O menu abre e fecha com transições fluidas.

Otimizado para Celular: Funciona perfeitamente em todos os dispositivos.

Fecha com a Tecla ESC: Para uma melhor experiência, o menu também pode ser fechado apertando a tecla "Esc".

Integração de Projeto Real
Adicionado "Prof Vane PDFs": O projeto real da plataforma educacional foi adicionado à galeria.

Design SVG Personalizado: Foi criada uma imagem de pré-visualização com tema pedagógico (maçã, livros em PDF) para combinar com o projeto.

Informações Reais: O texto de "placeholder" foi trocado pelas informações verdadeiras do projeto.

Links Funcionais: Os links para o site no ar e para o código no repositório foram adicionados.

Tecnologias Usadas: Destaca o uso de HTML5, CSS3, JavaScript e a integração com o WhatsApp.

Detalhes do Projeto - Prof Vane PDFs
Tipo: Plataforma para venda de materiais pedagógicos em PDF.

Recursos: Design vibrante com gradientes em rosa/dourado, animações flutuantes e integração com WhatsApp.

Público-Alvo: Educadores que buscam materiais de ensino de qualidade.

Tecnologias: HTML/CSS/JavaScript puros, com integração ao sistema de pagamento da Hotmart.