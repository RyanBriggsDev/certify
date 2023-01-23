import { z } from "zod";

export const createAdmin = z.object({
  name: z.string().min(3, { message: "Name must be 3 or more characters long" }).optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password must be 5 or more characters long" }),
});

export const updateAdmin = z.object({
  name: z.string().min(3, { message: "Name must be 3 or more characters long" }).optional(),
  email: z.string().email({ message: "Invalid email address" }).optional(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(5, { message: "Password must be 5 or more characters long" }),
});

export const createCourse = z.object({
  name: z.string(),
  type: z.string(),
  description: z.string().optional(),
  location: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  adminId: z.string(),
});
