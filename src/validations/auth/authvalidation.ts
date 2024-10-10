import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().min(1, { message: "email cannot be empty*" }).email(),
  password: z.string().min(1, { message: "password cannot be empty*" }),
});

// const passwordSchema = z
//   .string()
//   .min(8, { message: "Password must be at least 8 characters long." })
//   .refine((val) => /[a-z]/.test(val), {
//     message: "Password must contain at least 1 lowercase letter.",
//   })
//   .refine((val) => /[A-Z]/.test(val), {
//     message: "Password must contain at least 1 uppercase letter.",
//   })
//   .refine((val) => /\d/.test(val), {
//     message: "Password must contain at least 1 number.",
//   })
//   .refine((val) => /[*&%#$]/.test(val), {
//     message: "Password must contain at least 1 symbol (*, &, %, #, $).",
//   });

export const signupSchema = z
  .object({
    email: z.string().min(1, { message: "email cannot be empty*" }).email(),
    company: z.string().min(1, { message: "company cannot be empty*" }),
    name: z.string().min(1, { message: "name cannot be empty*" }),
    username: z.string().min(1, { message: "username cannot be empty*" }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
