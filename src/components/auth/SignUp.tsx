import React, { useState } from "react";
import {
  VStack,
  FormControl,
  FormHelperText,
  Button,
  useToast,
} from "@chakra-ui/react";
import { FaRegCircleUser } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { LiaIndustrySolid } from "react-icons/lia";
import { RiLockPasswordLine } from "react-icons/ri";
import { PiUser } from "react-icons/pi";
import { SubmitHandler, useForm } from "react-hook-form";
import InputContainer from "./InputContainer";
import api from "../../api/ApiSettings";
import { signupSchema } from "../../validations/auth/authvalidation";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  handleSignIn: () => void;
}

interface formData {
  email: string;
  name: string;
  password: string;
  company: string;
  username: string;
  confirmPassword: string;
}

const SignUp: React.FC<Props> = ({ handleSignIn }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<formData>({
    resolver: zodResolver(signupSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const onSubmit: SubmitHandler<formData> = async (value) => {
    const { confirmPassword, ...others } = value;

    console.log(others);

    setIsLoading(true);
    try {
      const response = await api.post("/users/sign-up", others);
      if (response.status === 201) {
        toast({
          position: "top-right",
          status: "success",
          title: "Operation Successful",
          description: "Account Created Successfully",
          duration: 1500,
        });
        setIsLoading(false);
        setTimeout(() => {
          handleSignIn();
        }, 1500);
      }
    } catch (error: any) {
      // console.log(error?.response?.data.message);
      // toast({
      //   position: "top",
      //   status: "error",
      //   title: "Operation Failed",
      //   description: error?.response?.data.message || "Something went wrong, Try again",
      //   duration: 4000,
      // });
      // setIsLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast({
          position: "top",
          status: "error",
          title: "Sign-In Failed",
          description: error?.response?.data.message,
        });
      } else if (error.request) {
        // The request was made but no response was received
        toast({
          position: "top",
          status: "error",
          title: "Sign-In Failed",
          description: "Network Error,  Please check your internet connection",
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        toast({
          position: "top",
          status: "error",
          title: "Sign-In Failed",
          description: "Our Fault, Please try again later ",
        });
      }
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <section className="border rounded-md py-10 px-12 max-w-[700px] w-[500px] min-w-[350px] space-y-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-medium">Sign Up</h1>
        <p className="text-sm text-black/60">
          Already have an account?{" "}
          <button onClick={handleSignIn} className="underline">
            Sign In
          </button>
        </p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <VStack spacing={6} align={"stretch"}>
          {/* email */}
          <InputContainer
            register={register}
            type="email"
            icon={<HiOutlineMail />}
            inputname="email"
            placeholder="Enter your email"
            error={errors.email}
          />
          {/* name */}
          <InputContainer
            register={register}
            type="text"
            icon={<PiUser />}
            inputname="name"
            placeholder="Enter your name"
            error={errors.name}
          />
          {/* Username */}
          <InputContainer
            register={register}
            type="text"
            icon={<FaRegCircleUser />}
            inputname="username"
            placeholder="Enter your username"
            error={errors.username}
          />
          {/* Company */}
          <InputContainer
            register={register}
            type="text"
            icon={<LiaIndustrySolid />}
            inputname="company"
            placeholder="Enter your company name"
            error={errors.company}
          />
          {/* Password */}
          <FormControl>
            <InputContainer
              register={register}
              type="password"
              icon={<RiLockPasswordLine />}
              inputname="password"
              placeholder="Enter your password"
              error={errors.password}
            />
            <FormHelperText>
              Password should contain atleast: <br /> 1 uppercase, <br />1
              lowercase,
              <br /> 1 number and 1 symbol[@$!%*?&]
            </FormHelperText>
          </FormControl>
          {/* Confirm Password */}
          <InputContainer
            register={register}
            type="password"
            icon={<RiLockPasswordLine />}
            inputname="confirmPassword"
            placeholder="Confirm your password"
            error={errors.confirmPassword}
          />
        </VStack>
        <div className="flex justify-end">
          <Button
            type="submit"
            size={"lg"}
            padding={"0 40px"}
            variant={"authSolid"}
            isLoading={isLoading}
            loadingText="Processing"
          >
            <span className="text-[15px]">Sign Up</span>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SignUp;
