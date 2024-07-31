import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import useCabins from "../../hooks/useCabins";
import FormRow from "./../../ui/FormRow";

function CreateCabinForm({ cabin, onSuccess, onError }) {
  const { id, ...values } = cabin ?? {};
  const edit_mode = !!id;
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: edit_mode ? { ...values, image: "" } : {},
  });

  const { errors } = formState;

  const { creating, createOrUpdateCabin } = useCabins();

  const onSubmitHandler = (data) => {
    createOrUpdateCabin(
      {
        ...data,
        id: id ?? undefined,
        image: data.image?.length ? data.image[0] : cabin?.image || "",
      },
      {
        onSuccess: () => {
          if (!edit_mode) {
            reset();
          }
          if (onSuccess) {
            onSuccess();
          }
        },
      }
    );
  };

  const onErrorHandler = (err) => {};

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler, onErrorHandler)}>
      <FormRow
        disabled={creating}
        label="Cabin name"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        disabled={creating}
        label="Maximum capacity"
        error={errors?.max_capicity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          min={1}
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        disabled={creating}
        label="Regular price"
        error={errors?.regular_price?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          {...register("regular_price", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        disabled={creating}
        label="Discount"
        error={errors?.discount?.message}
      >
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
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow
        disabled={creating}
        label="Cabin photo"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: edit_mode ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={creating}>
          {edit_mode ? "Save changes" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
