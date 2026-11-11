import { z } from "zod";

export const CONTACT_TOPICS = [
  { value: "COURSE", label: "A course" },
  { value: "ENROLLMENT", label: "Enrolling" },
  { value: "PAYMENT", label: "Payment" },
  { value: "TECHNICAL", label: "Technical help" },
  { value: "OTHER", label: "Something else" },
] as const;

export const MESSAGE_MAX = 2000;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80, "Name is too long"),
  email: z.string().trim().min(1, "Enter your email address").email("Enter a valid email address").max(120),
  phone: z
    .string()
    .trim()
    .regex(/^$|^\+?[0-9 ()-]{7,20}$/, "Enter a valid phone number")
    .optional(),
  topic: z.enum(["COURSE", "ENROLLMENT", "PAYMENT", "TECHNICAL", "OTHER"], { message: "Choose a topic" }),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(MESSAGE_MAX, `Keep it under ${MESSAGE_MAX.toLocaleString("en-US")} characters`),
  website: z.string().max(0).optional(),
});

export type ContactValues = z.infer<typeof contactSchema>;
