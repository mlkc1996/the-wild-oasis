import { useForm } from "react-hook-form";
import useSettings from "../../hooks/useSettings";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function UpdateSettingsForm() {
  const { settings, updateSetting } = useSettings();
  const { register } = useForm({
    defaultValues: settings ?? {},
  });
  const onSubmitHandler = (e) => {
    if (!e.target.value) {
      return;
    }

    if (settings[e.target.name] === Number(e.target.value)) {
      return;
    }

    e.target.disabled = true;

    updateSetting(
      {
        [e.target.name]: e.target.value,
      },
      {
        onSuccess: () => {
          e.target.disabled = false;
        },
      }
    );
  };

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          {...register("min_booking_length", {
            required: "This field is required",
            onBlur: onSubmitHandler,
          })}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          {...register("max_booking_length", {
            required: "This field is required",
            onBlur: onSubmitHandler,
          })}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          {...register("max_guests_bookings", {
            required: "This field is required",
            onBlur: onSubmitHandler,
          })}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          {...register("breakfast_price", {
            required: "This field is required",
            onBlur: onSubmitHandler,
          })}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
