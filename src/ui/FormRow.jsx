import styled from "styled-components";
{
  /* <FormRow>
    <Label htmlFor="discount">Discount</Label>
    <Input
      type="number"
      id="discount"
      defaultValue={0}
      {...register("discount", {
        required: "This field is required",
        validate: (value) =>
          value <= getValues().regular_price ||
          "Discount should be less than regular price",
      })}
    />
  </FormRow>; */
}
const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

const FormRow = ({ children, label, error, disabled }) => {
  return (
    <StyledFormRow disabled={disabled}>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
};

export default FormRow;
