import { styled } from "styled-components"

const StyledInput = styled.input`

  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  box-shadow: ${({ theme }) => theme.css.sombraPadrao};
  border: 2px dotted ${({ theme }) => theme.colors.borda};

  border-radius: 20px;

  font-family: var(--font-open);
  font-size: 1.1rem;
  text-align: center;
  letter-spacing: 1px;

  width: 200px;
  max-width: 80vw;

  padding: 0.8rem;
  margin: 0.5rem;
`

const InputPadrao = ({
  tipo='text',
  placeholder,
  valor,
  onChange,
  min,
  max,
  minLength,
  maxLength,
  required = false}) => {

  return (

    <StyledInput
      type={tipo}
      placeholder={placeholder}
      value={valor}
      min={min}
      max={max}
      minLength={minLength}
      maxLength={maxLength}
      onChange={onChange}
      required={required}
    />

  )
}

export default InputPadrao