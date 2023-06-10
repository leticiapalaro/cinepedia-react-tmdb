import { styled } from "styled-components";

const StyledTituloPrincipal = styled.h1`

  font-family: var(--font-cherry);
  font-size: 4rem;
  letter-spacing: 4px;
  font-weight: bolder;

  margin: 0 auto;
`

const TituloPrincipal = ({conteudo}) => {
  return(
    <StyledTituloPrincipal>
      {conteudo}
    </StyledTituloPrincipal>
  )
};

export default TituloPrincipal;