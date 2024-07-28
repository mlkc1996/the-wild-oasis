import styled, { css } from "styled-components";

const direction = (props) => {
  switch (`${props.type}`.toLowerCase()) {
    case "horizontal":
      return css`
        justify-content: space-between;
        align-items: center;
      `;
    default:
    case "vertical":
      return css`
        flex-direction: column;
        gap: 1.6rem;
      `;
  }
};

const Row = styled.div`
  display: flex;
  ${(props) => direction(props)}
`;

export default Row;
