import styled from "styled-components";

const StyledErrorMessage = styled.p`
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 700;
  color: red;
`;

interface ErrorMessageProps {
  errorMessage: string | undefined;
}

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  return <>{!!errorMessage && <StyledErrorMessage>{errorMessage}</StyledErrorMessage>}</>;
}
