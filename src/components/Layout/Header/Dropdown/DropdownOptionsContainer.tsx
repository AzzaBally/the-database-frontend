import styled from "styled-components";

export const DropdownOptionsContainer = styled.div`
  position: absolute;
  background-color: #333;
  margin-left: 3px;
  min-width: 154px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  max-height: 500px;

  a {
    color: white;
    font-family: Arial;
    padding: 10px 12px;
    text-decoration: none;
    display: block;
  }

  a:hover {
    background-color: #444;
  }
`;