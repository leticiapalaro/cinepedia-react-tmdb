import backgroundImageDark from "../assets/imgs/backgroundImageDark";
import backgroundImageLight from "../assets/imgs/backgroundImgLight";

export const lightTheme = {
  colors: {
    background: 'var(--color-isabelline)',
    backgroundDivFilmes: 'var(--color-tomato)',
    backgroundTransparencia: 'var(--semi-transparente-isabelline)',
    text: 'var(--color-black-olive)',
    borda: 'var(--color-black-olive)',
  },
  css: {
    sombraPadrao: '0 2px 8px var(--cor-sombra-escura)',
    sombraAlternativa: '0 2px 8px var(--cor-sombra-clara)',
    borderDashed1: '1px dashed var(--color-isabelline)',
    borderDashed2: '1px dashed var(--color-black-olive)',
    backgroundImage: backgroundImageLight,
  },
};

export const darkTheme = {
  colors: {
    background: 'var(--color-rich-black)',
    backgroundDivFilmes: 'var(--color-mikado-yellow)',
    backgroundTransparencia: 'var(--semi-transparente-rich-black)',
    text: 'var(--color-gold)',
    borda: 'var(--color-gold)',
  },
  css: {
    sombraPadrao: '0 2px 8px var(--cor-sombra-clara)',
    sombraAlternativa: '0 2px 8px var(--cor-sombra-escura)',
    borderDashed1: '1px dashed var(--color-rich-black)',
    borderDashed2: '1px dashed var(--color-gold)',
    backgroundImage: backgroundImageDark,
  },
};
