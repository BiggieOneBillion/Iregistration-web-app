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
import {
  Button,
  FormControl,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { GiGlassCelebration } from "react-icons/gi";
import { useState } from "react";
import {
  authStore,
  authType,
  userProp,
  userStore,
} from "../../../store/GlobalStore";
import axios from "axios";
import SelectTOC from "../event/SelectTOC";
import SandEDateInput from "../event/SandEDateInput";
import SelectTimes from "../event/SelectTimes";
import { TimesOptions } from "../event/TimesData";
import { IEvent } from "./EventDetail";
import ImageUploadForm from "./ImagePreview";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Times {
  value: string;
  label: string;
}

interface formData {
  name: string;
  location: string;
  type: optionType; // Correctly type the form field to match Select
  noOfAttendees: number;
  date: Date | string;
  startTimes: Times[];
  endTimes: Times[];
  eventImg: FileList;
  title: string;
  description: string;
  registrationUrl: string;
  registrationStartDate: Date;
  registrationEndDate: Date;
}

interface IPostData {
  type: string;
  startTimes: string[];
  endTimes: string[];
  registrationEndDate: string;
  registrationStartDate: string;
  name: string;
  location: string;
  noOfAttendees: number;
  date: Date | string;
  title: string;
  description: string;
  registrationUrl: string;
  eventImg: string;
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

interface Props extends IEvent {}

type PropType = {
  formInfo: Props;
  onClose: () => void;
};

const EditEventForm: React.FC<PropType> = (props) => {
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
    watch,
    setError,
    clearErrors,
    reset,
    setValue,
  } = useForm<formData>({
    mode: "onChange",
    defaultValues: {
      name: props.formInfo.name,
      location: props.formInfo.location,
      description: props.formInfo.location,
      title: props.formInfo.title,
      type: { label: props.formInfo.type, value: props.formInfo.type },
      noOfAttendees: props.formInfo.noOfAttendees,
      startTimes: props.formInfo.startTimes?.map((el: string) => ({
        label: el,
        value: el,
      })),
      endTimes: props.formInfo.endTimes?.map((el: string) => ({
        label: el,
        value: el,
      })),
      registrationStartDate: new Date(props.formInfo.registrationStartDate),
      registrationEndDate: new Date(props.formInfo.registrationEndDate),
      date: new Date(props.formInfo.date).toISOString().split("T")[0],
    },
  });

  const { id } = useParams();

  const toast = useToast();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const token = userStore((state) => (state as userProp).token);

  const updateIsAllowed = authStore(
    (state: unknown) => (state as authType).updateIsAllowed
  );

  const handleLogOut = () => {
    // clear the data of the user from the localstorage
    userStore.persist.clearStorage();
    // send the user back to the login page
    updateIsAllowed(false);
  };

  console.log(12);

  const editEvent = async (data: IPostData) => {
    const response = await axios.patch(
      `http://localhost:3000/events/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };

  const saveImageToCloud = useMutation({
    mutationFn: async (imageData: FormData) => {
      return await axios.post(
        `https://api.cloudinary.com/v1_1/dinigw27h/image/upload`, // Replace with your Cloudinary cloud name
        imageData
      );
    },
    onError: () => {
      toast({
        title: "Network Error",
        description: "Please Try Again",
        status: "error",
        duration: 2000,
        position: "top",
      });
    },
  });

  const {
    isPending: saveIsPending,
    mutate: saveMutate,
    isSuccess,
  } = saveImageToCloud;

  const { mutate } = useMutation({
    mutationFn: editEvent,
    onSuccess: () => {
      toast({
        position: "top-right",
        status: "success",
        title: "Operation Successful",
        description: "Event added successfully",
        duration: 2000,
      });
      props.onClose();
      queryClient.invalidateQueries();
    },
    onError: (error: any) => {
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
    },
  });

  const onSubmit: SubmitHandler<formData> = async (data) => {
    // setIsLoading(true);

    console.log(data);
    const {
      eventImg,
      type,
      startTimes,
      endTimes,
      registrationEndDate,
      registrationStartDate,
      ...input
    } = data;

    const transformST = startTimes.map((item) => item.label);
    const transformET = endTimes.map((item) => item.label);

    const postData = {
      ...input,
      type: type.label,
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
      // const imgUrl = await axios.post(
      //   `https://api.cloudinary.com/v1_1/dinigw27h/image/upload`, // Replace with your Cloudinary cloud name
      //   formData
      // );

      saveMutate(formData, {
        onSuccess: (data) => {
          mutate({ ...postData, eventImg: data.data.secure_url });
        },
      });

      // mutate({ ...postData, eventImg: imgUrl.data.secure_url });

      // const response = await axios.patch(
      //   `http://localhost:3000/events/${id}`,
      //   { ...postData, eventImg: imgUrl.data.secure_url },
      //   {
      //     headers: {
      //       // "Content-Type": "multipart/form-data",
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      // if (response.status === 200) {
      //   toast({
      //     position: "top-right",
      //     status: "success",
      //     title: "Operation Successful",
      //     description: "Event added successfully",
      //     duration: 2000,
      //   });
      //   setIsLoading(false);
      //   props.onClose();
      //   queryClient.invalidateQueries();
      // }
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
      <form
        className="space-y-6 p-2 lg:p-10 lg:w-[700px] h-[700px] overflow-y-auto rounded-md border focus-within:outline-black"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl>
          <ImageUploadForm<formData>
            inputname="eventImg"
            register={register}
            defaultValues={props.formInfo.eventImg}
            setValue={setValue}
            control={control}
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
        {/* Custom Select input controlled using Controller */}
        <FormControl>
          <SelectTOC<formData> control={control} errors={errors} name="type" />
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
        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            // isLoading={saveIsPending || isSuccess }
            loadingText="Processing"
            // variant={"authSolid"}
            type="submit"
            padding={"0 60px"}
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

export default EditEventForm;
