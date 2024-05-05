import styled from "styled-components";

const StyledParagraph = styled.p`
  font-size: 10px;
  margin-left: 10px;
`;

export default function Footer() {
  return (
    <>
      <hr />
      <div>
        <StyledParagraph>
          Version 1: Date of Development: 04/06/2020 | Date of Release:
          16/07/2020
        </StyledParagraph>
        <StyledParagraph>
          Current Version: Date of Development: 05/05/2024 | Date of Release:
          ??/??/????
        </StyledParagraph>
      </div>
    </>
  );
}
