import React, { useState } from "react";
import SignUp from "../components/auth/SignUp";
import SignIn from "../components/auth/SignIn";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const signIn = () => setIsSignIn(true);
  const signUp = () => setIsSignIn(false);
  return (
    <section className="min-h-screen w-screen flex justify-center items-center">
      {isSignIn ? <SignIn handleSignUp={signUp} /> : <SignUp handleSignIn={signIn}/>}
    </section>
  );
};

export default Auth;
