import { IconButton } from "@mui/material";
import { styled } from "styled-components";
import DoubleArrowSharpIcon from '@mui/icons-material/DoubleArrowSharp';

const StyledBotaoNavegacao = styled(IconButton)`
  && {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    letter-spacing: 1px;
  }
`

const BotaoNavegacaoSecoes = ({onClick, conteudo}) => {
  return (
    <StyledBotaoNavegacao
      onClick={onClick}
    >
      {conteudo}
      < DoubleArrowSharpIcon />
    </StyledBotaoNavegacao>
  )
};

export default BotaoNavegacaoSecoes;