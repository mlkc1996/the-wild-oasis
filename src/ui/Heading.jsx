import styled, { css } from "styled-components";

const variations = (props) => {
  switch (props?.as) {
    default:
    case "h1":
      return css`
        font-size: 3rem;
        font-weight: 600;
      `;
    case "h2":
      return css`
        font-size: 2rem;
        font-weight: 600;
      `;
    case "h3":
      return css`
        font-size: 2rem;
        font-weight: 500;
      `;
  }
};

const Heading = styled.h1`
  ${(props) => variations(props)}
  line-height:1.4rem;
`;

export default Heading;
