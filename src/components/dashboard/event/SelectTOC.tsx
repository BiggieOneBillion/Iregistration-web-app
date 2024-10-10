import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import Select, { SingleValue, StylesConfig } from "react-select";
import { optionType } from "./data";

type Props<T extends FieldValues> = {
  control: Control<T, any>;
  errors: FieldErrors<T>;
  name: Path<T>;
  placeholder: string;
  options: optionType[];
};

// Define custom styles for react-select
const customStyles: StylesConfig<optionType, false> = {
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


const SelectTOC = <T extends FieldValues>({
  control,
  errors,
  name,
  placeholder,
  options,
}: Props<T>) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{ required: "You must select an option" }}
        render={({ field }) => (
          <Select<optionType>
            {...field}
            options={options} // Correctly typed options
            placeholder={placeholder}
            isClearable
            styles={customStyles} // Apply custom styles
            onChange={(option: SingleValue<optionType>) => {
              field.onChange(option); // Pass the entire option object
            }}
            value={field.value} // Use the correct type for value
            classNames={{
              control: () => "py-1",
            }}
          />
        )}
      />
      {/* Correct error handling for 'type' */}
      {errors.type && (
        <p className="text-sm text-red-700">{errors.type.message as string}</p>
      )}
    </div>
  );
};

export default SelectTOC;
