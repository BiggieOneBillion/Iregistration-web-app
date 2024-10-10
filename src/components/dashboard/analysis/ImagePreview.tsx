import React, { useState } from "react";
import {
  FieldValues,
  UseFormRegister,
  Path,
  FieldError,
  UseFormSetValue,
  Controller,
  Control,
} from "react-hook-form";


interface PropsType<T extends FieldValues> {
  register: UseFormRegister<T>;
  inputname: Path<T>;
  error?: FieldError;
  defaultValues: string;
  setValue: UseFormSetValue<T>;
  control: Control<T, any>;
}

const ImageUploadForm = <T extends FieldValues>({
  inputname,
//   register,
//   error,
  defaultValues,
  setValue,
  control,
}: PropsType<T>) => {
  const [preview, setPreview] = useState<string>(defaultValues || "");


  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string); // Set the preview to the loaded file data
        setValue(inputname, e.target.files as any); // Update the react-hook-form value
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-4 w-full">
      {/* <input
        type="file"
        id="imageUpload"
        accept="image/*"
        {...register(inputname)}
        onChange={handleImageChange}
        className="hidden" // Hide the default file input
      /> */}

      <Controller
        name={inputname}
        control={control}
        render={({ field: { onBlur } }) => (
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={(e) => handleImageChange(e)}
            onBlur={onBlur}
            className="hidden" // Hide the default file input
          />
        )}
      />

      {preview && (
        <div className="w-full border-2 border-dotted border-gray-400 rounded-md overflow-hidden">
          <img
            src={preview}
            alt="Preview"
            className="h-[200px] w-full object-cover "
          />
        </div>
      )}

      <label
        htmlFor="imageUpload"
        className="px-4 py-2 bg-gray-200 text-black rounded cursor-pointer hover:bg-gray-300 transition-colors duration-300"
      >
        {preview ? "Change Image" : "Upload Image"}
      </label>
    </div>
  );
};

export default ImageUploadForm;
