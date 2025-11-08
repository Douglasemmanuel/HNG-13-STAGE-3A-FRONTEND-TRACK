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
import {useMutation , useQuery} from 'convex/react' ;
import {api} from '../../convex/_generated/api' ;
import { useState , useRef , useEffect } from "react";
import { useCartStore } from "@/store/cart_store";
import { shippingSchema , billingSchema ,paymentSchema, checkoutSchema } from '../../validation/checkout_validation'
import Image from "next/image";
import ProductButton from "@/components/ProductButton";
import SuccessModal from '../../components/SuccessModal';
import logo from '../../public/assets/logo.svg';
const CheckoutScreen:React.FC = () => {
  
    const { isMobile, isTablet, isDesktop } = useResponsive();
       const { cart, increaseQuantity, decreaseQuantity, removeFromCart  , subtotal , shipping , vat , grandTotal , clearCart} = useCartStore();
    const router = useRouter()
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';
     const createOrder = useMutation(api.mutations.createOrder) ;
      const [open, setOpen] = useState(false)
  //     const cartRef = useRef<HTMLDivElement>(null);


  // useEffect(() => {
  //   if (!open) return; 

  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
  //       setTimeout(() => clearCart(), 1000); // Clear cart after 1 second
  //       setOpen(false); // Close cart
  //       router.push("/"); // Redirect to home
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [open, clearCart, setOpen, router]);

  const handleOpenModal = () => setOpen(true);
  const handlePayed = () => {
  handleCloseModal()  
   setTimeout(() => clearCart(), 1000);    
  router.push('/'); 
};
  const handleCloseModal = () => setOpen(false);
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
      method: "", 
      eMoneyNumber: "",
      eMoneyPin: "",
      phoneNumber: "",
    },
  });


  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data: any) => {
    console.log("Checkout data:", data);
    router.push("/confirmation");
  };


const validateCheckout = (data: any) => {
 

 
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
const sendOrderConfirmationEmail = async (email: string, userName: string) => {
  try {
    const emailRes = await fetch("/api/send_email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: email,
        subject: "Order Confirmation ",
        text: `Order Successful - Thank you ${userName}`, 
        cart,
      subtotal,
      shipping,
      vat,
      grandTotal,
      userName,
      }),
    });
    if (!emailRes.ok) {
  const text = await emailRes.text();
  console.log("API Error:", text); 
  return;
}

    const emailData = await emailRes.json();

    if (emailData.success) {
      toast.success("Confirmation email sent!");
      return true;
    } else {
      toast.error("Failed to send confirmation email: " + emailData.error);
      return false;
    }
  } catch (err: any) {
    console.error(err);
    toast.error("An error occurred: " + err.message);
    return false;
  }
};
const handlePaymentClick =  async() => {
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

  const mappedItems = (cart || []).map((item: any) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    image:item.image,
  }));


  try {

   const orderResult = await createOrder({
  customer: { name: data.name, email: data.email, phone: String(data.phone) },
  shipping: { address: data.address, city: data.city, zip: data.zip, country: data.country },
  items: mappedItems, 
  totals: { subtotal, shipping, tax: vat, grandTotal },
  status: String(mappedMethod),
});

    console.log("Order created:", orderResult);
  } catch (err) {
    console.error("Failed to create order:", err);
    toast.error("Failed to create order. Please try again.");
  }
  const userName = data.name; 
   await sendOrderConfirmationEmail(data.email , userName);
   setOpen(true);

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
        <ProductSummary  onPayClick={handlePaymentClick} />
      </div>
       {/* <div ref={cartRef}> */}
       <SuccessModal isOpen={open} onClose={handleCloseModal}>
    <div style={{padding:"0.4rem 1rem"}}>
       <div
    style={{
      width: '64px',
      height: '64px',
       position: 'relative',
    }}
  >
    <Image
      src={logo}
      alt="Logo"
      fill
     style={{ objectFit: 'contain' }}
    />
  </div>
      <p
  style={{
    fontFamily: "Manrope",
    fontWeight: 700,
    fontSize: "32px",
    lineHeight: "36px",
    letterSpacing: "1.14px",
    textTransform: "uppercase",
    //  paddingTop:'0.5rem',
  }}
>
  THANK YOU <br/>FOR YOUR ORDER
</p>

    <p
  style={{
    fontFamily: "Manrope",
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "25px",
    paddingTop:'0.5rem',
   
  }}
>
 You will receive an email confirmation shortly.
</p>
<div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between" , marginTop:"1rem" , flexWrap:"wrap" , gap:isMobile? '1rem' :'0rem'}}>
  <div
style={{
  color: 'black',
    paddingTop: '0.5rem',
    width: '314px',
    // height: '140px',
    top: '299px',
    left: '294px',
    transform: 'rotate(0deg)',
    opacity: 1,
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    background:"#F1F1F1",
}}
>
<div style={{display:"flex" , flexDirection:"column" , padding:'1rem'}}>
    <div style={{display:'flow' , flexDirection:'column' }}>
           {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {/* Left: Image and Info */}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                {/* Image */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    transform: 'rotate(0deg)',
                    background: '#F1F1F1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div style={{ position: 'relative', width: '50px', height: '50px' }}>
                    <Image
                      src={item?.image.replace('./assets', '/assets')} 
                      alt={`${item.name}-image`}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                </div>
    
                {/* Name & Price */}
                <div>
                  <p
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 700,
                      fontSize: '15px',
                      lineHeight: '25px',
                      letterSpacing: '0px',
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 700,
                      fontSize: '14px',
                      lineHeight: '25px',
                      letterSpacing: '0px',
                      // paddingTop:'0.3rem',
                    }}
                  >
                    ${item.price}
                  </p>
                </div>
              </div>
    
            <p
  style={{
    fontFamily: "Manrope",
    fontWeight: 700,
    fontSize: "15px",
    lineHeight: "25px",
    letterSpacing: "0px",
    textAlign: "right",
  }}
>
  x{item.quantity}
</p>

            </div>
          ))}
    
        </div>
 <div
  style={{
    borderTop: '1px solid black', 
    opacity: 0.2,                
    width: '100%',                 
    margin: '10px 0'              
  }}
></div>
<p
  style={{
    fontFamily: 'Manrope',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '100%',
    letterSpacing: '-0.21px',
    textAlign:'center' , 
  }}
>
 and {cart.length -1} other item(s)
</p>
</div>
</div>
<div
style={{
  color: 'black',
    paddingTop: '0.5rem',
    width:  isDesktop ?'168px' : '100%',
    height:  isDesktop ? '140px' : '100px',
    top: '299px',
    left: '294px',
    transform: 'rotate(0deg)',
    opacity: 1,
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    background:"black",
    marginTop: isDesktop ? '0rem' :'0.3rem'
}}
>
<div style={{display:"flex" , flexDirection:"column" , alignItems:"center" , justifyContent:"center" , }}>
 <p
  style={{
    fontFamily: "Manrope",
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "25px",
    paddingTop:'0.5rem',
    color:"white",
      //  textAlign:"center",
   
  }}
>
GRAND TOTAL
</p>
<p
  style={{
    fontFamily: "Manrope",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "25px",
    paddingTop:'0.5rem',
    color:"white",
      textTransform: "uppercase",
      // textAlign:"center",
   
  }}
>
$ 5,446
</p>
</div>
</div>

</div>
   <ProductButton
      text="BACK TO HOME"
      bgColor="#D87D4A"
      textColor="white"
      hoverBgColor="#FBAF85"
      hoverTextColor="white"
      width= '100%'
      height='48px'
      onClick={handlePayed}
     
    />
      
      
    </div>
 </SuccessModal>
 {/* </div> */}
      </div>
  )
}

export default CheckoutScreen;