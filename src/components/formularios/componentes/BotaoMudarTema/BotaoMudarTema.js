import { IconButton } from "@mui/material";
import NightsStaySharpIcon from '@mui/icons-material/NightsStaySharp';
import Brightness7SharpIcon from '@mui/icons-material/Brightness7Sharp';
import { styled } from "styled-components";


const StyledBotaoMudarTema = styled(IconButton)`
  &&{
    color: ${({ theme }) => theme.colors.text};

    font-size: 0.5rem;
    font-weight: bolder;
    text-transform: uppercase;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin: 0.5rem auto;
  }
`

const BotaoMudarTema = ({temaAtual, setTemaAtual}) => {

  const conteudo = temaAtual ?
  <>
    <Brightness7SharpIcon />
    <p>tema claro</p>
  </> :
  <>
    <NightsStaySharpIcon />
    <p>tema escuro</p>
  </>;

  return (
    <StyledBotaoMudarTema
      onClick={setTemaAtual}
      aria-label='Mudar esquema de cores da página'
    >
      {conteudo}
    </StyledBotaoMudarTema>
  )
};

export default BotaoMudarTema;