import { styled } from "styled-components"

const StyledBotaoSubmit = styled.button`

  cursor: pointer;

  background-color: ${({ theme }) => theme.colors.text};
  color: ${({ theme }) => theme.colors.background};
  box-shadow: ${({ theme }) => theme.css.sombraAlternativa};

  border: ${({ theme }) => theme.css.borderDashed2};
  border-radius: 10px;

  font-family: var(--font-inter);
  font-size: 0.8rem;
  letter-spacing: 1px;
  font-weight: bolder;
  text-transform: uppercase;
  font-weight: bolder;

  display: block;
  padding: 0.5rem;
  margin: 0.5rem auto;

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`

const BotaoSubmit = ({onClick, conteudo = 'Enviar'}) => {
  return(
    <StyledBotaoSubmit
      type='submit'
      onClick={onClick}
    >
      {conteudo}
    </StyledBotaoSubmit>
  )
}

export default BotaoSubmit