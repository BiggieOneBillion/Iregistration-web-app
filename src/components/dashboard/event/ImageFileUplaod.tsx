// export default ImageUploadForm;
import React, { useState } from "react";
import {
  useForm,
  Controller,
  FieldValues,
  Control,
  FieldErrors,
  Path,
  ControllerRenderProps,
} from "react-hook-form";
import {
  Box,
  FormControl,
  FormErrorMessage,
  Icon,
  Image,
  Text,
  Button,
} from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

// interface FormData {
//   image: FileList | null;
// }

type Props<T extends FieldValues> = {
  control: Control<T, any>;
  errors: FieldErrors<T>;
  name: Path<T>;   
};

const ImageUploadForm = <T extends FieldValues>({
  control,
  errors,
  name,
}: Props<T>) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setFileName(file.name);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setFileName("");
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  return (
    <section className="space-y-2">
      <FormControl isInvalid={!!errors.image}>
        <Controller
          name={name}
          control={control}
          rules={{ required: "Please upload an image" }}
          render={({ field: { onChange } }) => (
            <Box>
              {/* Hidden Input Field */}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  handleImageChange(e); // Preview the image
                  onChange(e.target.files); // Update the react-hook-form state with FileList
                }}
              />
              {/* Custom Label for Upload */}
              <label
                htmlFor="file-upload"
                className="flex flex-col items-center justify-center w-full h-40 px-4 py-6 text-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
              >
                {!preview && (
                  <>
                    <span className="text-lg font-semibold">
                      Click to upload your banner image
                    </span>
                    {errors.image && (
                      <FormErrorMessage>
                        {errors.image.message as string}
                      </FormErrorMessage>
                    )}
                  </>
                )}
                {preview && (
                  <div className="flex flex-col items-center">
                    <Icon as={FaCheck} boxSize={6} color="green.500" />
                    <Text className="mt-2 text-sm text-green-500">
                      Image Selected
                    </Text>
                    <Text className="text-sm text-gray-500">{fileName}</Text>
                  </div>
                )}
              </label>
            </Box>
          )}
        />
      </FormControl>

      {/* Preview and Remove Buttons */}
      {preview && (
        <div className="flex items-center gap-4">
          <Button
            onClick={toggleModal}
            className="px-4 py-2 text-white bg-teal-500 rounded hover:bg-teal-600"
          >
            Preview
          </Button>
          <Button
            onClick={handleRemoveImage}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Remove
          </Button>
        </div>
      )}

      {/* Image Preview Modal */}
      {isModalOpen && preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative p-4 bg-white/90 rounded-lg shadow-lg">
            <Image
              src={preview}
              alt="Preview"
              className="w-[200px] h-[200px] md:w-[400px] md:h-[400px] object-cover"
            />
            <Button
              onClick={toggleModal}
              className="mt-4 px-4 py-2 text-white bg-gray-700 rounded hover:bg-gray-800"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ImageUploadForm;
