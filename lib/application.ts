import { z } from "zod";
const short = z
  .string()
  .trim()
  .min(1, "Please fill in this field.")
  .max(160, "Please use 160 characters or fewer.");
export const applicationSchema = z.object({
  name: short,
  email: z
    .string()
    .trim()
    .max(254)
    .email("Please enter a valid email address."),
  company: short,
  role: short,
  website: z
    .string()
    .trim()
    .max(300)
    .refine((v) => {
      if (!v) return true;
      try {
        const u = new URL(v.includes("://") ? v : `https://${v}`);
        return (
          ["http:", "https:"].includes(u.protocol) && u.hostname.includes(".")
        );
      } catch {
        return false;
      }
    }, "Please enter a website, such as example.com."),
  millwork: z
    .string()
    .trim()
    .min(1, "Tell us what your shop produces.")
    .max(2000),
  volume: z.enum(["1–5", "6–15", "16–30", "31+", "Varies / not sure"]),
  reviewer: z
    .string()
    .trim()
    .min(1, "Tell us who performs the final review.")
    .max(1000),
  incident: z.string().trim().max(3000),
  willingness: z.enum(["Yes", "Possibly — let’s discuss", "Not at this time"]),
  consent: z.literal(true, {
    error: "Please agree to being contacted about this application.",
  }),
  _gotcha: z.string().max(0, "This submission could not be verified."),
});
export const fieldLabels: Record<string, string> = {
  name: "Name",
  email: "Work email",
  company: "Company",
  role: "Role",
  website: "Company website",
  millwork: "Primary millwork",
  volume: "Typical monthly project volume",
  reviewer: "Final production reviewer",
  incident: "Past missed change / condition",
  willingness: "Historical project availability",
};
