import styled from "styled-components";

export const Button = styled.button`
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  width: auto;
  margin-top: 0;
  padding: 0px;
  border: 10px solid transparent;
  border-radius: 0;
  color: white;
  background-color: #00703c;
  box-shadow: 0 2px 0 black;
  text-align: center;
  vertical-align: top;
  cursor: pointer;
  webkit-appearance: none;

  &:hover {
    background-color: #00572e;
  }

  &:active {
    top: 2px;
    box-shadow: none;
  }
`;
