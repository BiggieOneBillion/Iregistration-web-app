import { useEffect } from "react";
import DatePicker from "react-datepicker";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
  UseFormClearErrors,
  UseFormSetError,
  UseFormWatch,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  control: Control<T, any>;
  errors: FieldErrors<T>;
  name1: Path<T>;
  name2: Path<T>;
  watch: UseFormWatch<T>;
  setError: UseFormSetError<T>;
  clearErrors: UseFormClearErrors<T>;
};

const SandEDateInput = <T extends FieldValues>({
  control,
  errors,
  name1,
  name2,
  watch,
  setError,
  clearErrors,
}: Props<T>) => {
  // Date logic
  const watchStartDate = watch(name1);
  const watchEndDate = watch(name2);

  useEffect(() => {
    if (watchStartDate && watchEndDate && watchEndDate <= watchStartDate) {
      setError(name2, {
        type: "manual",
        message: "End date must be greater than start date",
      });
    } else {
      clearErrors(name2);
    }
  }, [watchStartDate, watchEndDate, setError, clearErrors]);
  return (
    <section className="space-y-1">
      <div className="w-full flex flex-col md:flex-row  md:justify-between md:items-center gap-5 p-2 bg-gray-200/40 rounded-md">
        <div className="flex items-center gap-3">
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <Controller
            name={name1}
            control={control}
            rules={{ required: "Start date is required" }}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                selected={value}
                onChange={(date: Date | null) => onChange(date)}
                onBlur={onBlur}
                ref={ref}
                placeholderText="Select start date"
                dateFormat="yyyy/MM/dd"
                className="form-input border px-2 block w-full py-2"
              />
            )}
          />
        </div>

        <div className="flex items-center gap-3">
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <Controller
            name={name2}
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePicker
                selected={value}
                onChange={(date: Date | null) => onChange(date)}
                onBlur={onBlur}
                ref={ref}
                placeholderText="Select end date"
                dateFormat="yyyy/MM/dd"
                className="form-input border py-2 px-2 block w-full"
              />
            )}
          />
        </div>
      </div>
      <>
        {errors.registrationStartDate && (
          <p className="text-red-700 text-sm">
            {errors.registrationStartDate.message as string}
          </p>
        )}
        {errors.registrationEndDate && (
          <p className="text-red-700 text-sm">
            {errors.registrationEndDate.message as string}
          </p>
        )}
      </>
    </section>
  );
};

export default SandEDateInput;
