# cinepedia-react-tmdb
Aplicação web no formato SPA, feita com React alimentada com a API do TMDB (The Movie Data Base). A aplicação possui recomendações de filmes/séries e uma busca por algum item específico.

# Para utilizar o Projeto
1. Adicione sua chave no TMDB em src/services/api.js
2. No prompt navegue até a pasta raiz do projeto
3. Instale as dependências com `yarn install` ou `npm install`
4. Rode o projeto com `yarn start` ou `npm start`

# Créditos
1. Icone da aplicação retirado do site Flaticon: <a href="https://www.flaticon.com/free-icons/cinema" title="cinema icons">Cinema icons created by Freepik - Flaticon</a>
2. Fundos SVG retirados do site HeroPatterns: [Hero Patterns](https://heropatterns.com)

# Inspiração
A idéia veio do projeto AluraFlix, o último challenge do Projeto Oracle ONE da formação front-end.
A base era um site com links fixos de vídeos do YouTube baseados em algum tema.
Resolvi adaptar e fazer um site com informações de filmes e séries, alimentado por uma API.

# Funcionalidades

1. Carrosséis de Recomendação
    1. Na página inicial, há um carrossel com os filmes mais buscados e com as melhores notas, e também existe uma página dedicada a dois carrosséis, de novidades e futuros lançamentos.
        1. O carrossel com os filmes mais buscados está disponível apenas para computador, devido as limitações de tamanho da tela. Mas página a dedicada a dois carrosséis, de novidades e futuros lançamentos permanece para a versão mobile.
    3. O carrossel gira automaticamente a cada 2 segundos, ele para de girar colocando o cursos em cima do carrossel, permitindo arrastar ou clicar nos botões para navegar entre os itens.
    4. Ao clicar no pôster, uma janela flutuante é exibida com mais informações.
        1. Para fechar a janela flutuante, basta clicar no botão fechar, pressionar a tecla ESC ou clicar fora da janela.
    5. Cada item trás o tipo de mídia (filme ou série), poster, título, nota e data de lançamento.
        1. A nota possui um css que varia de acordo com a nota, sendo preenchido com um radial grandient e varias especificações via JS para refletir melhor a nota visualmente.
2. Pesquisa de Filmes/Séries
     1. É possível pesquisar por um item específico (filme ou série) com 3 campos: uma palavra chave que faz parte do nome do item (obrigatório), ano de lançamento (opcional - não é o ano mínimo, mas o ano exato do lançamento), nota mínima (opcional).
     2. Ele retorna um carrossel semelhante ao carrossel de recomendações, a única diferença é que ele não gira automaticamente para o usuário poder analisar melhor os resultados, a navegação é feita arrastando ou clicando nos botões para navegar entre os itens.
3. Janela flutuante com detalhes dos itens
     1. É possível pesquisar por um item específico (filme ou série) com 3 campos: uma palavra chave que faz parte do nome do item (obrigatório), ano de lançamento (opcional - não é o ano mínimo, mas o ano exato do lançamento), nota mínima (opcional).

