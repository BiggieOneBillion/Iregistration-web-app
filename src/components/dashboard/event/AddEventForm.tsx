import { FaPeopleLine } from "react-icons/fa6";
import InputContainer from "../../auth/InputContainer";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoPersonCircleOutline } from "react-icons/io5";
import {
  MdEditNote,
  MdOutlineDateRange,
  MdOutlineMyLocation,
} from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import SelectTOC from "./SelectTOC";
import SandEDateInput from "./SandEDateInput";
import {
  Button,
  FormControl,
  FormHelperText,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { GiGlassCelebration } from "react-icons/gi";
import SelectTimes from "./SelectTimes";
import { TimesOptions } from "./TimesData";
import ImageUploadForm from "./ImageFileUplaod";
import { useState } from "react";
import {
  authStore,
  authType,
  userProp,
  userStore,
} from "../../../store/GlobalStore";
import axios from "axios";
import SuccessModal from "./SuccessModal";
import { optionsAuthType, optionsType } from "./data";

interface Times {
  value: string;
  label: string;
}

interface formData {
  name: string;
  location: string;
  type: optionType; // Correctly type the form field to match Select
  noOfAttendees: number;
  date: Date;
  startTimes: Times[];
  endTimes: Times[];
  eventImg: FileList;
  title: string;
  description: string;
  registrationUrl: string;
  registrationStartDate: Date;
  registrationEndDate: Date;
  authType: optionType;
}

type optionType = {
  value: string;
  label: string;
};

function convertDate(dateString: string) {
  // Split the input date string into day, month, and year
  const [day, month, year] = dateString.split("/");

  // Rearrange to ISO format (YYYY-MM-DD)
  const isoFormattedDate = `${year}-${month}-${day}`;

  return isoFormattedDate;
}

const AddEventForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
    setError,
    clearErrors,
    reset,
  } = useForm<formData>({ mode: "onChange" });

  const toast = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = userStore((state) => (state as userProp).token);

  const updateIsAllowed = authStore(
    (state: unknown) => (state as authType).updateIsAllowed
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [eventUrl, setEventUrl] = useState<string>("");

  const handleLogOut = () => {
    // clear the data of the user from the localstorage
    userStore.persist.clearStorage();
    // send the user back to the login page
    updateIsAllowed(false);
  };

  const onSubmit: SubmitHandler<formData> = async (data) => {
    setIsLoading(true);

    console.log(data);
    const {
      eventImg,
      type,
      startTimes,
      endTimes,
      registrationEndDate,
      registrationStartDate,
      authType,
      ...input
    } = data;

    const transformST = startTimes.map((item) => item.label);
    const transformET = endTimes.map((item) => item.label);

    const postData = {
      ...input,
      type: type.label,
      authType: authType.label,
      startTimes: transformST,
      endTimes: transformET,
      registrationEndDate: convertDate(
        new Date(registrationEndDate).toLocaleDateString()
      ),
      registrationStartDate: convertDate(
        new Date(registrationStartDate).toLocaleDateString()
      ),
    };

    const formData = new FormData();

    formData.append("file", eventImg[0]);
    formData.append("upload_preset", "fq6lskbq");

    try {
      const imgUrl = await axios.post(
        `https://api.cloudinary.com/v1_1/dinigw27h/image/upload`, // Replace with your Cloudinary cloud name
        formData
      );

      const response = await axios.post(
        "http://localhost:3000/events/create",
        { ...postData, eventImg: imgUrl.data.secure_url },
        {
          headers: {
            // "Content-Type": "multipart/form-data",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast({
          position: "top-right",
          status: "success",
          title: "Operation Successful",
          description: "Event added successfully",
          duration: 2000,
        });
        setIsLoading(false);
        setEventUrl(response.data.event.registrationUrl);
        reset();
        setTimeout(() => {
          onOpen();
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error?.response?.data.message === "Unauthorized") {
          handleLogOut();
          toast({
            position: "top",
            status: "error",
            title: "UnAuthorized! Please log-In",
            description: error?.response?.data.message,
            duration: 3000,
          });
          return;
        }
        toast({
          position: "top",
          status: "error",
          title: "Event not added",
          description: error?.response?.data.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        toast({
          position: "top",
          status: "error",
          title: "Event not added",
          description: "Network Error,  Please check your internet connection",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        toast({
          position: "top",
          status: "error",
          title: "Event not added",
          description: "Our Fault, Please try again later ",
        });
      }
      // console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <section className="space-y-4 md:space-y-10">
      <h1 className="text-2xl font-medium text-black/80">Add Event Form</h1>
      <form
        className="space-y-6 p-2 lg:p-10 lg:w-[700px] rounded-md border focus-within:outline-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl>
          <ImageUploadForm<formData>
            control={control}
            errors={errors}
            name="eventImg"
          />
          <FormHelperText>
            This is the image that would show in the event card
          </FormHelperText>
        </FormControl>
        {/* Title */}
        <FormControl>
          <InputContainer
            register={register}
            type="text"
            icon={<IoPersonCircleOutline />}
            inputname="title"
            placeholder="Enter your event title"
            error={errors.name}
          />
          <FormHelperText>
            Your event title is the first thing people will see.
          </FormHelperText>
        </FormControl>
        {/* Description */}
        <FormControl>
          <InputContainer
            register={register}
            type="text"
            icon={<MdEditNote />}
            inputname="description"
            placeholder="Enter the description of your event"
            error={errors.name}
          />
          <FormHelperText>What is your event about?</FormHelperText>
        </FormControl>
        {/* Name */}
        <FormControl>
          <InputContainer
            register={register}
            type="text"
            icon={<GiGlassCelebration />}
            inputname="name"
            placeholder="Enter your event name"
            error={errors.name}
          />
          <FormHelperText>This is the name of the event</FormHelperText>
        </FormControl>
        {/* Location */}
        <FormControl>
          <InputContainer
            register={register}
            type="text"
            icon={<MdOutlineMyLocation />}
            inputname="location"
            placeholder="Enter your event location"
            error={errors.location}
          />
          <FormHelperText>
            This is the location at which the event is taking place
          </FormHelperText>
        </FormControl>
        {/* Event type */}
        {/* Custom Select input controlled using Controller */}
        <FormControl>
          <SelectTOC<formData>
            control={control}
            errors={errors}
            name="type"
            options={optionsType}
            placeholder="Select an event type"
          />
          <FormHelperText>
            Type of event e.g Weddings,Birthday, etc
          </FormHelperText>
        </FormControl>
        {/* number of attendees */}
        <FormControl>
          <InputContainer
            register={register}
            type="number"
            icon={<FaPeopleLine />}
            inputname="noOfAttendees"
            placeholder="How many attendees are expected?"
            error={errors.noOfAttendees}
          />
          <FormHelperText>Amount of expected attendees</FormHelperText>
        </FormControl>
        {/* date of event */}
        <FormControl>
          <InputContainer
            register={register}
            type="date"
            icon={<MdOutlineDateRange />}
            inputname="date"
            placeholder="Date of event"
            error={errors.date}
          />
          <FormHelperText>The actual date of the event</FormHelperText>
        </FormControl>
        {/* start and end date */}
        <FormControl>
          <SandEDateInput<formData>
            control={control}
            errors={errors}
            name1="registrationStartDate"
            name2="registrationEndDate"
            clearErrors={clearErrors}
            setError={setError}
            watch={watch}
          />
          <FormHelperText>
            The start and end date of the event registration
          </FormHelperText>
        </FormControl>
        {/* event start times and end times */}
        <FormControl>
          <SelectTimes<formData>
            control={control}
            errors={errors}
            name="startTimes"
            options={TimesOptions}
          />
          <FormHelperText>The start time(s) of the event</FormHelperText>
        </FormControl>
        <FormControl>
          <SelectTimes<formData>
            control={control}
            errors={errors}
            name="endTimes"
            options={TimesOptions}
          />
          <FormHelperText>The end time(s) of the event</FormHelperText>
        </FormControl>
        {/* type of authorisation---pin code or bar code */}
        <FormControl>
          <SelectTOC<formData>
            control={control}
            errors={errors}
            name="authType"
            options={optionsAuthType}
            placeholder="Select an authorization type"
          />
          <FormHelperText>This is the type of authorization</FormHelperText>
        </FormControl>
        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            isLoading={isLoading}
            loadingText="Processing"
            // variant={"authSolid"}
            type="submit"
            padding={"0 60px"}
          >
            Submit
          </Button>
        </div>
      </form>
      <SuccessModal isOpen={isOpen} onClose={onClose} eventUrl={eventUrl} />
    </section>
  );
};

export default AddEventForm;
