import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  gender: z.string().min(1, "Please select a gender"),
  dateOfBirth: z.string().min(1, "Please enter your date of birth"),
  phoneNumber: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your address"),
  programId: z.string().min(1, "Please select a program"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export const serviceRequestSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  serviceId: z.string().min(1, "Please select a service"),
  projectDescription: z.string().min(10, "Please describe your project (min 10 characters)"),
  budget: z.string().optional(),
  preferredDate: z.string().optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export const newsSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().min(10, "Content is required"),
  featuredImage: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  isPublished: z.boolean().default(false),
});

export const serviceSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().optional(),
  description: z.string().min(10, "Description is required"),
  content: z.string().optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  benefits: z.string().optional(),
  process: z.string().optional(),
  features: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

export const programSchema = z.object({
  title: z.string().min(2, "Title is required"),
  slug: z.string().optional(),
  description: z.string().min(10, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  requirements: z.string().optional(),
  learningOutcomes: z.string().optional(),
  image: z.string().optional(),
  order: z.number().default(0),
  isActive: z.boolean().default(true),
});

export const settingsSchema = z.object({
  companyName: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  location: z.string().optional(),
  about: z.string().optional(),
  logo: z.string().optional(),
  favicon: z.string().optional(),
  facebook: z.string().url().optional().or(z.literal("")),
  twitter: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  instagram: z.string().url().optional().or(z.literal("")),
  youtube: z.string().url().optional().or(z.literal("")),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ServiceRequestInput = z.infer<typeof serviceRequestSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type NewsInput = z.infer<typeof newsSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
export type ProgramInput = z.infer<typeof programSchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
