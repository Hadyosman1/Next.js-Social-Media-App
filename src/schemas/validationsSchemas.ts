import { z } from "zod";

/* ======== Articles ======== */
export const createArticleSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be more than 2 digits")
    .max(200, "Title must be less than 200 digits"),
  description: z.string().min(10, "description must be more than 10 digits"),
});
export type TArticleInputs = z.infer<typeof createArticleSchema>;

export const updateArticleSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be more than 2 digits")
    .max(200, "Title must be less than 200 digits")
    .optional(),
  description: z
    .string()
    .min(10, "description must be more than 10 digits")
    .optional(),
});
/* ======== Articles ======== */

export const createUserSchema = z.object({
  userName: z
    .string()
    .min(2, "User name must be at least 2 digits")
    .max(100, "User name must be less than 100 digits"),
  email: z
    .string()
    .email({ message: "Please insert a valid email address" })
    .min(5, "Email address must be at least 5 digits"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 digits" }),
});
export type TRegisterInputs = z.infer<typeof createUserSchema>;

export const userLogInSchema = z.object({
  email: z
    .string()
    .email({ message: "Please insert a valid email address" })
    .min(5, "Email address must be at least 5 digits"),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 digits" }),
});
export type TLoginInputs = z.infer<typeof userLogInSchema>;

export const userUpdateSchema = z.object({
  userName: z.string().min(2).max(100).optional(),
  email: z.string().email().min(5).optional(),
  password: z.string().min(8).optional(),
  isAdmin: z.boolean().optional(),
});

export const createCommentSchema = z.object({
  content: z.string().min(2).max(500),
  articleId: z.number(),
});

export const updateCommentSchema = z.object({
  content: z.string().min(2).max(500).optional(),
});
