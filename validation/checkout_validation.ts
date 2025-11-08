import { z } from "zod";

// Billing inputs validation
export const billingSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z
    .string()
    .nonempty({ message: "Email is required" }) 
    .refine((val) => z.email().safeParse(val).success, {
        message: 'Invalid email address',
      }),
  phone: z
    .string()
        .min(1, "Phone number is required")
    .nonempty({ message: "Phone number is required" })
    .regex(/^\+?[0-9\s-]{7,15}$/, "Invalid phone number"),
});



export const shippingSchema = z.object({
  address: z.string().nonempty({ message: "Address is required" }).min(1, "Address is required"),
  zip: z.string().nonempty({ message: "ZIP code is required" }).min(1, "ZIP code is required"),
  city: z.string().nonempty({ message: "City is required" }).min(1, "City is required"),
  country: z.string().nonempty({ message: "Country is required" }).min(1, "Country is required"),
});



// export const paymentSchema = z.object({
//   paymentMethod: z.enum(["eMoney", "cod"]),
//   eMoneyNumber: z.string().optional(),
//   eMoneyPin: z.string().optional(),
// }).superRefine((data, ctx) => {
//   if (data.paymentMethod === "eMoney") {
//     if (!data.eMoneyNumber) {
//       ctx.addIssue({
//         path: ["eMoneyNumber"],
//         message: "eMoney Number is required for eMoney payment",
//         code: "custom", // ✅ use string literal instead of ZodIssueCode.custom
//       });
//     }
//     if (!data.eMoneyPin) {
//       ctx.addIssue({
//         path: ["eMoneyPin"],
//         message: "eMoney PIN is required for eMoney payment",
//         code: "custom", // ✅ string literal
//       });
//     }
//   }
// });


export const paymentSchema = z
  .object({
    paymentMethod: z.enum(["eMoney", "cod"]),
    eMoneyNumber: z.string().optional(),
    eMoneyPin: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.paymentMethod === "eMoney") {
      if (!data.eMoneyNumber || data.eMoneyNumber.trim() === "") {
        ctx.addIssue({
          path: ["eMoneyNumber"],
          message: "eMoney Number is required for eMoney payment",
          code: "custom",
        });
      }
      if (!data.eMoneyPin || data.eMoneyPin.trim() === "") {
        ctx.addIssue({
          path: ["eMoneyPin"],
          message: "eMoney PIN is required for eMoney payment",
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
