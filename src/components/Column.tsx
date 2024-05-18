import styled from "styled-components";

interface ColumnProps {
  flex: string;
  minwidth?: string;
}

export const ColumnContainer = styled.div`
  display: flex;
`;

export const Column = styled.div<ColumnProps> `
  flex: ${(props) => props.flex};
  min-width: ${(props) => (props.minwidth ? props.minwidth : "unset")};
`;
