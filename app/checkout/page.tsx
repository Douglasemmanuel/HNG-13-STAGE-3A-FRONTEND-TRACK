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
}

interface ShippingData {
  address:string;
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
    },
    shipping: {
      address: "" ,
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
  // const phoneValue = String(data.phone || "");

  // Validate billing
  const billingResult = billingSchema.safeParse({
    name: data.name || "",
    email: data.email || "",
    phone:data.phone || "",
   
  });

  // Validate shipping
  const shippingResult = shippingSchema.safeParse({
    address: data.address || "",
    zip: data.zip || "",
    city: data.city || "",
    country: data.country || "",
  });

   // Validate billing/shipping errors
  if (!billingResult.success || !shippingResult.success) {
    toast.error("Please fill in all required fields", {
      position: "top-right",
      autoClose: 2500,
    });
    return false;
  }
  if (!billingResult.success) {
  console.log("Billing errors:", billingResult);
}
if (!shippingResult.success) {
  console.log("Shipping errors:", shippingResult);
}

// Extract payment info safely
const paymentMethod = data.paymentMethod || "";
const eMoneyNumber = data.payment?.eMoneyNumber || "";
const eMoneyPin = data.payment?.eMoneyPin || "";

// Pre-check
if (!paymentMethod || (paymentMethod !== "eMoney" && paymentMethod !== "cod")) {
  toast.error("Please select a payment method (eMoney or Cash)");
  return false;
}

// Validate payment using schema
const paymentPayload =
  paymentMethod === "eMoney"
    ? { paymentMethod, eMoneyNumber, eMoneyPin }
    : { paymentMethod };

const paymentResult = paymentSchema.safeParse(paymentPayload);

if (!paymentResult.success) {
  const missingFields = paymentResult.error.issues
    .map((err) => err.message)
    .join(", ");
  toast.error(`Payment error: ${missingFields}`);
  return false;
}

 

  console.log("All data valid:", {
    ...billingResult.data,
    ...shippingResult.data,
    ...paymentResult.data,
  });
  console.log("Billing validation:", billingResult.success, billingResult.error);
console.log("Shipping validation:", shippingResult.success, shippingResult.error);

  return true;
};
const handlePaymentClick = () => {
  const data = getValues();
  console.log("Raw form data:", JSON.stringify(data, null, 2)); 

  const isValid = validateCheckout(data);
  if (!isValid) return;

  // Correctly map payment info
  const mappedMethod = data.paymentMethod; // root-level
  const eMoneyNumber = data.payment?.eMoneyNumber || "";
  const eMoneyPin = data.payment?.eMoneyPin || "";

  console.log("Mapped payment method:", mappedMethod);
  console.log("eMoney Number:", eMoneyNumber);
  console.log("eMoney Pin:", eMoneyPin);

  // Update state
  setCheckoutData((prev) => ({
    ...prev,
    billing: {
      ...prev.billing,
      name: data.name || "",
      email: data.email || "",
      phone: String(data.phone || ""),
    },
    shipping: {
      ...prev.shipping,
      address: data.address || "",
      zip: data.zip || "",
      city: data.city || "",
      country: data.country || "",
    },
    payment: {
      method: mappedMethod,
      eMoneyNumber,
      eMoneyPin,
      phoneNumber: data.payment?.phoneNumber || "",
    },
  }));

  // router.push("/confirmation");
};


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