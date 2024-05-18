import styled from "styled-components";

export const GridDisplayContainer = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  column-gap: 4px;
  grid-template-columns: repeat(auto-fit, 131px);
  grid-template-rows: repeat(auto-fit, 179px);
`;