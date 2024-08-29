import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(2 /*, "Title must be more than 2 digits"*/).max(200),
  description: z
    .string()
    .min(10 /*, "description must be more than 10 digits"*/),
});

export const createUserSchema = z.object({
  userName: z.string().min(2).max(100),
  email: z.string().email().min(5),
  password: z.string().min(8),
});

export const userLogInSchema = z.object({
  email: z.string().email().min(5),
  password: z.string().min(8),
});

