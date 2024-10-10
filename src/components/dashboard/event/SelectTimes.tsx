import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import Select, { MultiValue, StylesConfig } from "react-select";

type OptionType = {
  value: string;
  label: string;
};

type Props<T extends FieldValues> = {
  control: Control<T, any>;
  errors: FieldErrors<T>;
  name: Path<T>;
  options: OptionType[];
};

// Define custom styles for react-select
const customStyles: StylesConfig<OptionType, true> = {
  control: (provided, state) => ({
    ...provided,
    boxShadow: state.isFocused ? "none" : provided.boxShadow, // Remove blue outline
    borderColor: state.isFocused ? "gray" : provided.borderColor, // Change border color when focused
    "&:hover": {
      borderColor: "gray", // Change border color on hover
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "darkgray" // Change background color when an option is selected
      : state.isFocused
      ? "darkgray" // Change hover color
      : "white", // Default color
    color: state.isSelected ? "white" : "black", // Text color
    "&:hover": {
      backgroundColor: "darkgray", // Hover color for options
      color: "white", // Text color on hover
    },
  }),
};

const SelectTimes = <T extends FieldValues>({
  control,
  errors,
  name,
  options,
}: Props<T>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{ required: "You must select at least one option" }}
        render={({ field }) => (
          <Select
            {...field}
            options={options}
            placeholder="Select an option"
            isMulti // Enables multi-select
            isClearable
            styles={customStyles} // Apply custom styles
            onChange={(selectedOptions: MultiValue<OptionType>) => {
              field.onChange(selectedOptions); // Update form value with multiple selections
            }}
          />
        )}
      />
      {errors.type && (
        <p className="text-sm text-red-700">{errors.type.message as string}</p>
      )}
    </div>
  );
};

export default SelectTimes;
