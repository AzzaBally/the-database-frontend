import styled from "styled-components";

interface TextInputProps {
  $error?: string | undefined;
}

export const TextInput = styled.input<TextInputProps>`
  display: block;
  font-size: 19px;
  box-sizing: border-box;
  height: 40px;
  padding: 5px;
  border: ${(props) => props.$error ? "3px solid red" : "2px solid rgb(11, 12, 12)"};

  &:focus {
    outline: rgb(255, 221, 0) solid 3px;
    outline-offset: 0px;
  }
`;
