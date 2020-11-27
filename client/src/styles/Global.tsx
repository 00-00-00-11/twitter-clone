import styled, { css } from "styled-components";

const DEFAULT_FORM_GROUP = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const InputFormGroup = styled.div`
  ${DEFAULT_FORM_GROUP}
  background: #192734;
  border-bottom: 0.2rem solid #8899a6;
  border-radius: 5px;
`;

export const FormGroup = styled.div`
  ${DEFAULT_FORM_GROUP}
`;

export const Input = styled.input`
  color: #fff;
  border: 0;
  font-size: 1rem;
  padding: 0.5rem 0.8rem;
  background: #192734;
`;

export const FormLabel = styled.label`
  padding: 0.5rem 0.8rem;
  font-size: 1rem;
  color: #8899a6;
`;

export const Button = styled.button`
  background: var(--secondary);
  font-size: 1rem;
  border-radius: 30px;
  padding: 0.8rem;
  border: 1px solid var(--secondary);
  color: #fff;
  transition: filter 200ms;
  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }
`;
