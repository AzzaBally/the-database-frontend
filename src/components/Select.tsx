import styled from "styled-components";

export const Select = styled.select`
  height: 38px;
  font-size: 19px;
  padding: 5px 4px 4px;
  border: 2px solid rgb(11, 12, 12);

  &:focus {
    outline: rgb(255, 221, 0) solid 3px;
    outline-offset: 0px;
  }
`;
