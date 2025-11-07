"use client";
import React from "react";
import { useState } from "react";
import useResponsive from "@/hooks/useResponsive";
import payLogo from '../public/pay.svg' ;

import Image from "next/image";
interface LabeledInputProps {
  width?: number;
  height?: number;
  placeholder?: string;
  label?: string;
  register?: any; 
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  width = 309,
  height = 56,
  placeholder = "Enter text",
  label = "Your Label",
  register,
  error,
  name,
  value,
  onChange,
}) => (
  <div style={{ display: "flex", flexDirection: "column", marginBottom: "0.1rem" }}>
    <p
      style={{
        fontFamily: "Manrope",
        fontWeight: 700,
        fontSize: "12px",
        lineHeight: "100%",
        letterSpacing: "-0.21px",
        marginBottom: "4px",
      }}
    >
      {label}
    </p>
   <input
  type="text"
  placeholder={placeholder}
  {...(register && name
    ? register(name, { required: `${label} is required` })
    : {})}
  defaultValue={value || ""}
  style={{
    width: `${width}px`,
    height: `${height}px`,
    borderRadius: "8px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: error ? "red" : "#ccc",
    padding: "0 12px",
    fontFamily: "Manrope",
    fontWeight: 700,
    fontSize: "14px",
    lineHeight: "100%",
    letterSpacing: "-0.25px",
    marginTop: "0.5rem",
  }}
/>


    {error && (
      <span style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
        {error}
      </span>
    )}
  </div>
);


interface InputFormProps {
  title?: string;
  inputs: LabeledInputProps[];
  titleStyle?: React.CSSProperties;
  register?: any;
  errors?: any;
  checkoutData: any;
  setCheckoutData: React.Dispatch<React.SetStateAction<any>>;
}

const InputForm: React.FC<InputFormProps> = ({
  title = "Billing Details",
  inputs,
  titleStyle,
  register,
  errors,
  checkoutData,
  setCheckoutData,
}) => {
  const handleChange = (name: string, value: string) => {
    setCheckoutData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <p
        style={{
          fontFamily: "Manrope",
          fontWeight: 700,
          fontSize: "13px",
          lineHeight: "25px",
          letterSpacing: "0.93px",
          textTransform: "uppercase",
          color: "#D87D4A",
          ...titleStyle,
        }}
      >
        {title}
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "1rem",
          marginTop: "0.5rem",
        }}
      >
        {inputs.map((input, index) => (
          <LabeledInput
            key={index}
            {...input}
            name={input.name} // ✅ required for react-hook-form
            value={input.name ? checkoutData[input.name] : ''} // ✅ controlled value
            onChange={(val) => handleChange(input.name!, val)}
            register={register}
            error={input.name ? errors?.[input.name]?.message : undefined}
          />
        ))}
      </div>
    </div>
  );
};

type CheckOutFormProps = {
  register: any;
  handleSubmit: any;
  errors: any;
  onSubmit: any;
  checkoutData: any;
  setCheckoutData: React.Dispatch<React.SetStateAction<any>>;
};

const CheckOutForm: React.FC<CheckOutFormProps> = ({
  register,
  errors,
  onSubmit,
  checkoutData,
  setCheckoutData,
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  const getResponsiveWidth = (desktopWidth: number, tabletWidth?: number, mobileWidth?: number) => {
    if (isMobile) return mobileWidth ?? desktopWidth * 0.8;
    if (isTablet) return tabletWidth ?? desktopWidth * 0.9;
    return desktopWidth; // default for desktop
  };
//   const getResponsiveHeight = (
//   desktopHeight: number,
//   tabletHeight?: number,
//   mobileHeight?: number
// ) => {
//   if (isMobile) return mobileHeight ?? desktopHeight * 0.8;
//   if (isTablet) return tabletHeight ?? desktopHeight * 0.9;
//   return desktopHeight; // default for desktop
// };

  // ✅ Handle change for billing & shipping fields
  const handleChange = (section: "billing" | "shipping", field: string, value: string) => {
    setCheckoutData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const billingInputs: LabeledInputProps[] = [
    {
      name: "name",
      label: "Name",
      placeholder: "Alexei Ward",
      width: getResponsiveWidth(250, 220, 180),
      value: checkoutData.billing?.name || "",
      onChange: (val: string) => handleChange("billing", "name", val),
      error: errors?.billing?.name?.message,
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "alexeiward@mail.com",
      width: getResponsiveWidth(270, 240, 180),
      value: checkoutData.billing?.email || "",
      onChange: (val: string) => handleChange("billing", "email", val),
      error: errors?.billing?.email?.message,
    },
    {
      name: "phone",
      label: "Phone Number",
      placeholder: "+1 202-555-0136",
      width: getResponsiveWidth(309, 280, 180),
      value: checkoutData.billing?.phone || "",
      onChange: (val: string) => handleChange("billing", "phone", val),
      error: errors?.billing?.phone?.message,
    },
  ];

  const shippingInputs: LabeledInputProps[] = [
    {
      name: "address",
      label: "Your Address",
      placeholder: "1137 Williams Avenue",
      width: getResponsiveWidth(510, 400, 180),
      value: checkoutData.shipping?.address || "",
      onChange: (val: string) => handleChange("shipping", "address", val),
      error: errors?.shipping?.address?.message,
    },
    {
      name: "zip",
      label: "ZIP Code",
      placeholder: "10001",
      width: getResponsiveWidth(250, 220, 180),
      value: checkoutData.shipping?.zip || "",
      onChange: (val: string) => handleChange("shipping", "zip", val),
      error: errors?.shipping?.zip?.message,
    },
    {
      name: "city",
      label: "City",
      placeholder: "New York",
      width: getResponsiveWidth(250, 220, 180),
      value: checkoutData.shipping?.city || "",
      onChange: (val: string) => handleChange("shipping", "city", val),
      error: errors?.shipping?.city?.message,
    },
    {
      name: "country",
      label: "Country",
      placeholder: "United States",
      width: getResponsiveWidth(250, 220, 180),
      value: checkoutData.shipping?.country || "",
      onChange: (val: string) => handleChange("shipping", "country", val),
      error: errors?.shipping?.country?.message,
    },
  ];

  return (
    <div
      style={{
        width: "630px",
        height: isDesktop ? "1126px" : isTablet ? "1160px" : "1000px",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        padding: "2rem",
      }}
    >
      <p
        style={{
          fontFamily: "Manrope",
          fontWeight: 700,
          fontSize: "32px",
          lineHeight: "36px",
          letterSpacing: "1.14px",
          textTransform: "uppercase",
          padding: "1rem 0rem",
        }}
      >
        CHECKOUT
      </p>

      <InputForm title="Billing Details" inputs={billingInputs} register={register} errors={errors} checkoutData={checkoutData} setCheckoutData={setCheckoutData} />
      <InputForm title="Shipping Info" inputs={shippingInputs} register={register} errors={errors} checkoutData={checkoutData} setCheckoutData={setCheckoutData} />

     <PaymentDetails
  checkoutData={checkoutData}
  setCheckoutData={setCheckoutData}
  errors={errors}
  register={register}
/>


      {isDesktop && (
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem", marginTop: "1rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              transform: "rotate(0deg)",
              opacity: 1,
            }}
          >
            <Image src={payLogo} alt="Logo" fill style={{ objectFit: "contain" }} />
          </div>

          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: "25px",
              letterSpacing: "0px",
              maxWidth: "80%",
            }}
          >
            The ‘Cash on Delivery’ option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
          </p>
        </div>
      )}
    </div>
  );
};




interface RadioInputProps {
  label: string;
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  width?: number;
  height?: number;
  top?: number;
  left?: number;
}

const RadioInput: React.FC<RadioInputProps> = ({
  label,
  name,
  value,
  checked = false,
  onChange,
  width = 250,
  height = 56,
  top = 0,
  left = 0,
}) => {
  return (
    <label
      style={{
        position: "relative", 
        top: `${top}px`,
        left: `${left}px`,
        width: `${width}px`,
        height: `${height}px`,
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        backgroundColor: "#fff",
        cursor: "pointer",
        opacity: 1,
        transform: "rotate(0deg)",
        gap: "12px",
        boxSizing: "border-box",
      }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{
          width: "16px",
          height: "16px",
          accentColor: "#D87D4A",
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontFamily: "Manrope",
          fontWeight: 700,
          fontSize: "14px",
          lineHeight: "100%",
          letterSpacing: "-0.25px",
        }}
      >
        {label}
      </span>
    </label>
  );
};

interface PaymentData {
  method: '' | 'eMoney' | 'cod';
  eMoneyNumber?: string;
  eMoneyPin?: string;
}

interface CheckoutData {
  payment: PaymentData;
}

interface PaymentDetailsProps {
  checkoutData: CheckoutData;
  setCheckoutData: React.Dispatch<React.SetStateAction<CheckoutData>>;
  errors: Record<string, any>;
  register?: any;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  checkoutData,
  setCheckoutData,
  errors,
  register,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'' | 'eMoney' | 'cod'>(
    checkoutData.payment.method || 'eMoney'
  );

  const { isMobile, isTablet, isDesktop } = useResponsive();

  const handleChange = (field: string, value: string) => {
    setCheckoutData((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        [field]: value,
      },
    }));
  };

  const paymentInputs = [
    {
      name: "payment.eMoneyNumber",
      label: "e-Money Number",
      placeholder: "238521993",
      value: checkoutData.payment?.eMoneyNumber || "",
      onChange: (val: string) => handleChange("eMoneyNumber", val),
      register,
      error: errors?.payment?.eMoneyNumber?.message,
      width: 250,
    },
    {
      name: "payment.eMoneyPin",
      label: "e-Money PIN",
      placeholder: "6891",
      value: checkoutData.payment?.eMoneyPin || "",
      onChange: (val: string) => handleChange("eMoneyPin", val),
      register,
      error: errors?.payment?.eMoneyPin?.message,
      width: 250,
    },
  ];

  const handleRadioChange = (method: 'eMoney' | 'cod') => {
    setPaymentMethod(method);
    setCheckoutData((prev) => ({
      ...prev,
      payment: {
        ...prev.payment,
        method, // Update the actual payment method in checkoutData
      },
    }));
  };

  return (
    <>
    <div style={{ marginTop: '2rem' , display:"flex"  , flexDirection: isDesktop ?'row' :'column'  , justifyContent:'space-around' }}>
      <div>
        <p
        style={{
          fontFamily: 'Manrope',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: '25px',
          letterSpacing: '0.93px',
          textTransform: 'uppercase',
          color: '#D87D4A',
        }}
      >
        Payment Details
      </p>
       <p
        style={{
          fontFamily: 'Manrope',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: '25px',
          letterSpacing: '-0.213px',
          paddingTop:"1rem",
          color: 'black',
        }}
      >
    Payment Method
      </p>
      </div>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexDirection:'column' }}>
      <RadioInput
  label="e-Money"
  name="paymentMethod"
  value="eMoney"
  checked={checkoutData.payment.method === "eMoney"}
  onChange={() => setCheckoutData(prev => ({
    ...prev,
    payment: { ...prev.payment, method: "eMoney" }
  }))}
/>

<RadioInput
  label="Cash on Delivery"
  name="paymentMethod"
  value="cod"
  checked={checkoutData.payment.method === "cod"}
  onChange={() => setCheckoutData(prev => ({
    ...prev,
    payment: { ...prev.payment, method: "cod" }
  }))}
/>

      </div>

    </div>
    {checkoutData.payment.method === 'eMoney' && (
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexDirection: isDesktop ? 'row' : 'column' }}>
          {paymentInputs.map((input) => (
            <PaymentInput key={input.name} {...input} />
          ))}
        </div>
      )}
    </>
  );
};


interface PaymentInputProps {
  width?: number;
  height?: number;
  placeholder?: string;
  label?: string;
  register?: any;
  error?: string;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

const PaymentInput: React.FC<PaymentInputProps> = ({
  width = 309,
  height = 56,
  placeholder = "Enter value",
  label = "Your Label",
  register,
  error,
  name,
  value,
  onChange,
}) => (
  <div style={{ display: "flex", flexDirection: "column", marginBottom: "0.5rem" }}>
    <p
      style={{
        fontFamily: "Manrope",
        fontWeight: 700,
        fontSize: "12px",
        lineHeight: "100%",
        letterSpacing: "-0.21px",
        marginBottom: "4px",
      }}
    >
      {label}
    </p>
    <input
      type="text"
      placeholder={placeholder}
      {...(register && name ? register(name, { required: `${label} is required` }) : {})}
      defaultValue={value || ""} // <-- change value to defaultValue
      onChange={(e) => onChange && onChange(e.target.value)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: "8px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: error ? "red" : "#ccc",
        padding: "0 12px",
        fontFamily: "Manrope",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "100%",
        letterSpacing: "-0.25px",
        marginTop: "0.5rem",
      }}
    />
    {error && (
      <span style={{ color: "red", fontSize: "12px", marginTop: "2px" }}>
        {error}
      </span>
    )}
  </div>
);

export default CheckOutForm;


