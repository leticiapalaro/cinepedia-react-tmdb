import { IconButton } from "@mui/material";
import { styled } from "styled-components";
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

const StyledBotaoNavegacao = styled(IconButton)`
  && {
    color: ${({ theme }) => theme.colors.text};
    font-size: 1rem;
    letter-spacing: 1px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }
`

const BotaoFechar = ({onClick}) => {
  return (
    <StyledBotaoNavegacao
      onClick={onClick}
    >
      Fechar
      < CancelSharpIcon />
    </StyledBotaoNavegacao>
  )
};

export default BotaoFechar;