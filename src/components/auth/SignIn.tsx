import { Button, useToast, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import InputContainer from "./InputContainer";
import api from "../../api/ApiSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema } from "../../validations/auth/authvalidation";
import {
  userStore,
  userProp,
  authStore,
  authType,
} from "../../store/GlobalStore";
import { useNavigate } from "react-router-dom";
import { dashboardRoute } from "../../utils/constants";

interface Props {
  handleSignUp: () => void;
}

interface formData {
  email: string;
  password: string;
}

const SignIn: React.FC<Props> = ({ handleSignUp }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formData>({
    resolver: zodResolver(signinSchema),
  });

  const toast = useToast();

  const updateToken = userStore(
    (state: unknown) => (state as userProp).updateToken
  );
  const updateIsAllowed = authStore(
    (state: unknown) => (state as authType).updateIsAllowed
  );

  // const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<formData> = async (value) => {
    setIsLoading(true);
    try {
      const response = await api.post("/users/sign-in", value);
      if (response.status === 200) {
        toast({
          position: "top",
          status: "success",
          title: "Operation Successful",
          description: "Welcome Back",
          duration: 1500,
        });
        setIsLoading(false);
        updateToken(response.data.token);
        updateIsAllowed(true);
        // setTimeout(() => {
        //   navigate(dashboardRoute);
        // }, 3000);
      }
    } catch (error: any) {
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
        <h1 className="text-2xl font-medium">Sign In</h1>
        <p className="text-sm text-black/60">
          Don't have an account?{" "}
          <button onClick={handleSignUp} className="underline">
            Sign Up
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

          {/* Password */}
          <InputContainer
            register={register}
            type="password"
            icon={<RiLockPasswordLine />}
            inputname="password"
            placeholder="Enter your password"
            error={errors.password}
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
            <span className="text-[15px]">Sign In</span>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
