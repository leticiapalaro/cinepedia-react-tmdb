import { styled } from "styled-components";

const StyledSlogan = styled.span`

  font-size: 1.3rem;
  font-weight: bolder;

  margin: 0 auto;
`

const Slogan = () => {
  return(
    <StyledSlogan>
      A sua enciclopédia do Cinema!
    </StyledSlogan>
  )
};

export default Slogan;