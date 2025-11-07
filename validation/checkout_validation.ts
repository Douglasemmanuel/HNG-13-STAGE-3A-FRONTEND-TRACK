import { z } from "zod";

// Billing inputs validation
export const billingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  emailAddress: z.string().email("Invalid email address"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[0-9\s-]{7,15}$/, "Invalid phone number"),
});

// Shipping inputs validation
export const shippingSchema = z.object({
  yourAddress: z.string().min(1, "Address is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
});

// Payment schema
 export const paymentSchema = z.object({
  paymentMethod: z.enum(["eMoney", "cod"], {
    message: "Payment method is required",
  }),
  eMoneyNumber: z.string().optional(),
  pinNumber: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "eMoney") {
    if (!data.eMoneyNumber?.trim()) {
      ctx.addIssue({
        path: ["eMoneyNumber"],
        message: "e-Money Number is required",
        code: "custom",
      });
    }

    if (!data.pinNumber?.trim()) {
      ctx.addIssue({
        path: ["pinNumber"],
        message: "PIN Number is required",
        code: "custom",
      });
    }
  }
});


// Combined checkout schema
export const checkoutSchema = z.object({
  billing: billingSchema,
  shipping: shippingSchema,
  payment: paymentSchema,
});
