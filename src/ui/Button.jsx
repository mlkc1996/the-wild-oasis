import styled, { css } from "styled-components";

const sizes = (props) => {
  switch (`${props.size}`.toLowerCase()) {
    case "small":
      return css`
        font-size: 1.2rem;
        padding: 0.4rem 0.8rem;
        text-transform: uppercase;
        font-weight: 600;
        text-align: center;
      `;
    default:
    case "medium":
      return css`
        font-size: 1.4rem;
        padding: 1.2rem 1.6rem;
        font-weight: 500;
      `;
    case "large":
      return css`
        font-size: 1.6rem;
        padding: 1.2rem 2.4rem;
        font-weight: 500;
      `;
  }
};

const variations = (props) => {
  switch (`${props.variaion}`.toLowerCase()) {
    default:
    case "primary":
      return css`
        color: var(--color-brand-50);
        background-color: var(--color-brand-600);

        &:hover {
          background-color: var(--color-brand-700);
        }
      `;
    case "secondary":
      return css`
        color: var(--color-grey-600);
        background: var(--color-grey-0);
        border: 1px solid var(--color-grey-200);

        &:hover {
          background-color: var(--color-grey-50);
        }
      `;
    case "danger":
      return css`
        color: var(--color-red-100);
        background-color: var(--color-red-700);

        &:hover {
          background-color: var(--color-red-800);
        }
      `;
  }
};

const Button = styled.button`
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  ${(props) => sizes(props)}
  ${(props) => variations(props)}
`;

export default Button;
