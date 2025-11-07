"use client";
import { any, z } from "zod";
import React from 'react'
import { useRouter } from 'next/navigation';
import CheckOutForm from '@/components/CheckOutForm';
import ProductSummary from '@/components/ProductSummary';
import useResponsive from '@/hooks/useResponsive';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {  toast } from "react-toastify";
import { useState } from "react";
import { shippingSchema , billingSchema ,paymentSchema, checkoutSchema } from '../../validation/checkout_validation'
const CheckoutScreen:React.FC = () => {
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const router = useRouter()
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';

interface BillingData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
}

interface ShippingData {
  zip: string;
  city: string;
  country: string;
}

interface PaymentData {
  method: '' | 'eMoney' | 'cash';
  eMoneyNumber: string;
  eMoneyPin: string;
  phoneNumber: string; // add if needed
}

interface CheckoutData {
  billing: BillingData;
  shipping: ShippingData;
  payment: PaymentData;
}
   const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    billing: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zip: "",
      city: "",
      country: "",
    },
    shipping: {
      zip: "",
      city: "",
      country: "",
    },
    payment: {
      method: "", // or "cash"
      eMoneyNumber: "",
      eMoneyPin: "",
      phoneNumber: "",
    },
  });

  // ✅ React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onBlur",
  });

  // ✅ Handle submit
  const onSubmit = (data: any) => {
    console.log("Checkout data:", data);
    router.push("/confirmation");
  };



// ✅ Validation logic (updated)
const validateCheckout = (data: any) => {
  // Ensure phone is a string
  const phoneValue = String(data.phone || "");

  // Validate billing
  const billingResult = billingSchema.safeParse({
    name: data.name || "",
    email: data.email || "",
   
  });

  // Validate shipping
  const shippingResult = shippingSchema.safeParse({
    yourAddress: data.address || "",
    zipCode: data.zip || "",
    city: data.city || "",
    country: data.country || "",
  });

 // Extract payment info safely
const paymentMethod = data.payment?.method || data.paymentMethod || "";
const eMoneyNumber = data.payment?.eMoneyNumber || "";
const eMoneyPin = data.payment?.eMoneyPin || "";

// Pre-check: payment method must be selected
if (!paymentMethod || (paymentMethod !== "eMoney" && paymentMethod !== "cod")) {
  console.log("Payment method missing or invalid!");
  toast.error("Please select a payment method (eMoney or Cash)", {
    position: "top-right",
    autoClose: 2500,
  });
  return false;
}

// Validate payment using schema
const paymentPayload =
  paymentMethod === "eMoney"
    ? { paymentMethod, eMoneyNumber, pinNumber: eMoneyPin }
    : { paymentMethod };

const paymentResult = paymentSchema.safeParse(paymentPayload);

if (!paymentResult.success) {
  const missingFields = paymentResult.error.issues
    .map((err) => err.path.join('.') || err.message)
    .join(', ');
  toast.error(`Payment error: ${missingFields}`, {
    position: "top-right",
    autoClose: 2500,
  });
  return false;
}


  // Validate payment
  // const paymentResult = paymentSchema.safeParse({
  //   paymentMethod: paymentMethod,
  //   eMoneyNumber: eMoneyNumber,
  //   pinNumber: eMoneyPin,
  // });

  // if (!paymentResult.success) {
  //   const missingFields = paymentResult.error.issues
  //     .map((err) => err.path.join('.') || err.message)
  //     .join(', ');

  //   toast.error(`Payment error: ${missingFields}`, {
  //     position: "top-right",
  //     autoClose: 2500,
  //   });
  //   return false;
  // }

  // Validate billing/shipping errors
  if (!billingResult.success || !shippingResult.success) {
    toast.error("Please fill in all required fields", {
      position: "top-right",
      autoClose: 2500,
    });
    return false;
  }

  console.log("All data valid:", {
    ...billingResult.data,
    ...shippingResult.data,
    ...paymentResult.data,
  });

  return true;
};
const handlePaymentClick = () => {
  const data = getValues();
  console.log("Raw form data:", data); // For debugging

  const isValid = validateCheckout(data);

  if (!isValid) return;
const mappedMethod = data.payment?.method;
  console.log("Mapped payment method:", mappedMethod);

  // Optionally, check eMoney details
  console.log("eMoney Number:", data.payment?.eMoneyNumber);
  console.log("eMoney Pin:", data.payment?.eMoneyPin);


  // Update state
  setCheckoutData((prev) => ({
    ...prev,
    billing: {
      ...prev.billing,
      name: data.name || "",
      email: data.email || "",
      phone: String(data.phone || ""),
      address: data.address || "",
      zip: data.zip || "",
      city: data.city || "",
      country: data.country || "",
    },
    shipping: {
      ...prev.shipping,
      zip: data.zip || "",
      city: data.city || "",
      country: data.country || "",
    },
    payment: {
      method: mappedMethod,
      eMoneyNumber: data.payment?.eMoneyNumber || "",
      eMoneyPin: data.payment?.eMoneyPin || "",
      phoneNumber: data.payment?.phoneNumber || "",
    },
  }));

  // Proceed to next page
  // router.push("/confirmation");
};

// ✅ Triggered when user clicks "Continue & Pay" (updated)
// const handlePaymentClick = () => {
//   const data = getValues();
//   console.log("Raw form data:", data);  // For debugging

//   const isValid = validateCheckout(data);

//   if (isValid) {
//     // Map payment method to match your PaymentData interface
//     const mappedMethod = data.paymentMethod === "e-money" ? "eMoney" : data.paymentMethod === "cash" ? "cash" : "";

//     setCheckoutData((prev) => ({
//       ...prev,
//       billing: {
//         ...prev.billing,
//         name: data.name || "",
//         email: data.email || "",
//         phone: String(data.phone || ""),  // Ensure string
//         address: data.address || "",
//         zip: data.zip || "",
//         city: data.city || "",
//         country: data.country || "",
//       },
//       shipping: {
//         ...prev.shipping,
//         zip: data.zip || "",
//         city: data.city || "",
//         country: data.country || "",
//       },
//       payment: {
//         method: mappedMethod,
//         eMoneyNumber: data.eMoneyNumber || "",
//         eMoneyPin: data.eMoneyPin || "",
//         phoneNumber: "",  // If not used, leave empty
//       },
//     }));

//     // Navigate or handle next step
//     // router.push("/confirmation");
//   }
// };
  return (
    <div style={{padding: `2rem ${paddingValue}`}}>
      <p
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '25%',
        letterSpacing: '0px',
        paddingTop:'1rem',
        cursor:'pointer',
      }}
      onClick={()=> router.back()}
    >
    Go Back
    </p>
      <div style={{
        display:"flex" , 
      flexDirection:"row" ,
       flexWrap:"wrap" , 
      justifyContent:"space-between" ,
      alignItems: "flex-start",
        alignContent:"center",
         marginTop:"2rem" ,
         gap:isDesktop ? '0rem' : '3rem',
         }}>
        <CheckOutForm
          register={register}
          handleSubmit={handleSubmit}
          errors={errors}
          onSubmit={onSubmit}
          checkoutData={checkoutData}
          setCheckoutData={setCheckoutData}
        />
        <ProductSummary  onPayClick={handlePaymentClick}/>
      </div>
      </div>
  )
}

export default CheckoutScreen;