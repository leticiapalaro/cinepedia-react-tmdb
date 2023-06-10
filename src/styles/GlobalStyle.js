import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  ::-webkit-scrollbar {
    width: 10px; /* Largura da barra de rolagem */
    height: calc(100vh - 200px);
  }

  ::-webkit-scrollbar-track {
    background-color: black; /* Cor do fundo da barra de rolagem */
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1b1624; /* Cor da barra de rolagem */
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #1b1600; /* Cor da barra de rolagem */
  }

  :root {
    --cor-sombra-escura: rgba(0, 0, 0, 0.9);
    --cor-sombra-clara: rgba(255, 255, 255, 0.9);

    --semi-transparente-rich-black: rgba(0, 8, 20, 0.9);
    --semi-transparente-isabelline: rgba(237, 230, 227, 0.9);

    --color-rich-black: #000814;
    --color-gold: #FFD60A;
    --color-mikado-yellow: #FFC300;

    --color-isabelline: #EDE6E3;
    --color-black-olive: #36382E;
    --color-tomato: #F06449;

    --font-cherry: 'Cherry Bomb One', cursive;
    --font-titan: 'Titan One', cursive;
    --font-noto: 'Noto Color Emoji', sans-serif;
    --font-open: 'Open Sans', sans-serif;
    --font-poppins: 'Poppins', sans-serif;
    --font-inter: 'Inter', sans-serif;
    --font-rubik: 'Rubik', sans-serif;

  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    background-image: ${({ theme }) => theme.css.backgroundImage};
    text-align: center;
    font-family: var(--font-inter);
    letter-spacing: 1px;
  }

  * {
    @media screen and (min-width: 1024px) {
      .apenas-mobile {
        display: none;
      }
    }

    @media screen and (max-width: 1023px) {
      .apenas-desktop {
        display: none;
      }
    }
  }

`;
