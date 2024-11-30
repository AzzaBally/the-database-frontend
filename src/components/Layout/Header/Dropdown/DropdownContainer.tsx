import styled from "styled-components";

export const DropdownContainer = styled.div`
  float: right;
  display: inline-block;

  > div {
    display: none;
  }

  &:focus-within > div {
    display: block;
  }
`;
