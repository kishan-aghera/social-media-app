import * as z from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(2, { message: "Too short" }),
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
});

export const PostSchema = z.object({
  caption: z
    .string()
    .min(5, {
      message: "Caption must be at least 5 characters",
    })
    .max(2200, {
      message: "Caption must be at most 2200 characters",
    }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(2, {
      message: "Location must be at least 2 characters",
    })
    .max(100, {
      message: "Location must be at most 100 characters",
    }),
  tags: z.string().optional(),
});
