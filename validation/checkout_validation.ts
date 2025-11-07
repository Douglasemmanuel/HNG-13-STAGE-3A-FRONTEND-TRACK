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
//  export const paymentSchema = z.object({
//   paymentMethod: z.enum(["eMoney", "cod"], {
//     message: "Payment method is required",
//   }),
//   eMoneyNumber: z.string().optional(),
//   pinNumber: z.string().optional(),
// }).superRefine((data, ctx) => {
//   if (data.paymentMethod === "eMoney") {
//     if (!data.eMoneyNumber?.trim()) {
//       ctx.addIssue({
//         path: ["eMoneyNumber"],
//         message: "e-Money Number is required",
//         code: "custom",
//       });
//     }

//     if (!data.pinNumber?.trim()) {
//       ctx.addIssue({
//         path: ["pinNumber"],
//         message: "PIN Number is required",
//         code: "custom",
//       });
//     }
//   }
// });
// export const paymentSchema = z.object({
//   paymentMethod: z.enum(["eMoney", "cod"]),
//   eMoneyNumber: z.string().optional(),
//   pinNumber: z.string().optional(),
// }).refine(
//   (data) => data.paymentMethod !== "eMoney" || (data.eMoneyNumber && data.pinNumber),
//   {
//     message: "e-Money number and PIN are required when using e-Money",
//     path: ["eMoneyNumber"], // optional, can attach to pin too
//   }
// );

export const paymentSchema = z.object({
  paymentMethod: z.enum(["eMoney", "cod"]),
  eMoneyNumber: z.string().optional(),
  eMoneyPin: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.paymentMethod === "eMoney") {
    if (!data.eMoneyNumber) {
      ctx.addIssue({
        path: ["eMoneyNumber"],
        message: "eMoney Number is required for eMoney payment",
        code: "custom", // ✅ use string literal instead of ZodIssueCode.custom
      });
    }
    if (!data.eMoneyPin) {
      ctx.addIssue({
        path: ["eMoneyPin"],
        message: "eMoney PIN is required for eMoney payment",
        code: "custom", // ✅ string literal
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
