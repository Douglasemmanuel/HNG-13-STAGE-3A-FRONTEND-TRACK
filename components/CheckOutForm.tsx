"use client";
import React from "react";
import { useState } from "react";
import useResponsive from "@/hooks/useResponsive";
interface LabeledInputProps {
  width?: number;
  height?: number;
  placeholder?: string;
  label?: string;
}

const LabeledInput: React.FC<LabeledInputProps> = ({
  width = 309,
  height = 56,
  placeholder = "Enter text",
  label = "Your Label",
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
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: "8px",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "#ccc",
        padding: "0 12px",
        fontFamily: "Manrope",
        fontWeight: 700,
        fontSize: "14px",
        lineHeight: "100%",
        letterSpacing: "-0.25px",
        marginTop: "0.5rem",
      }}
    />
  </div>
);

interface InputFormProps {
  title?: string;
  inputs: LabeledInputProps[];
  titleStyle?: React.CSSProperties;
}

const InputForm: React.FC<InputFormProps> = ({
  title = "Billing Details",
  inputs,
  titleStyle,
}) => {
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
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "1rem" , marginTop:'0.5rem' }}>
        {inputs.map((input, index) => (
          <LabeledInput key={index} {...input} />
        ))}
      </div>
    </div>
  );
};

const CheckOutForm: React.FC = () => {
     const { isMobile, isTablet, isDesktop } = useResponsive();
     const getResponsiveWidth = (desktopWidth: number, tabletWidth?: number, mobileWidth?: number) => {
    if (isMobile) return mobileWidth ?? desktopWidth * 0.8;
    if (isTablet) return tabletWidth ?? desktopWidth * 0.9;
    return desktopWidth; // default for desktop
  };
  const billingInputs: LabeledInputProps[] = [
    { label: "Name", placeholder: "Alexei Ward", width: getResponsiveWidth(250, 220, 180) },
    { label: "Email Address", placeholder: "alexeiward@mail.com", width: getResponsiveWidth(270, 240, 180) },
    { label: "Phone Number", placeholder: "+1 202-555-0136", width: getResponsiveWidth(309, 280, 180) },
  ];

  const shippingInputs: LabeledInputProps[] = [
    { label: "Your Address", placeholder: "1137 Williams Avenue", width: getResponsiveWidth(510, 400, 180) },
    { label: "ZIP Code", placeholder: "10001", width: getResponsiveWidth(250, 220, 180) },
    { label: "City", placeholder: "New York", width: getResponsiveWidth(250, 220, 180) },
    { label: "Country", placeholder: "United States", width: getResponsiveWidth(250, 220, 180) },
  ];
//   const billingInputs: LabeledInputProps[] = [
//     { label: "Name", placeholder: "Alexei Ward", width: 250 },
//     { label: "Email Address", placeholder: "alexeiward@mail.com", width: 270 },
//     { label: "Phone Number", placeholder: "+1 202-555-0136", width: 309 },
//   ];

//   const shippingInputs: LabeledInputProps[] = [
//     { label: " Your Address", placeholder: "1137 Williams Avenue", width: 510 },
//     { label: "ZIP Code", placeholder: "10001", width: 250 },
//     { label: "City", placeholder: "New York", width: 250 },
//     { label: "Country", placeholder: "United States", width: 250 },
//   ];

  return (
    <div
      style={{
        width: "630px",
        height:  isDesktop ? "1126px" : isTablet ?'1160PX' :'1378PX',
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
          padding:'1rem 0rem'
        }}
      >
        CHECKOUT
      </p>

      
      <InputForm title="Billing Details" inputs={billingInputs} />

  
      <InputForm title="Shipping Info" inputs={shippingInputs} />
      <PaymentDetails/>
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



const PaymentDetails: React.FC = ()=>{
    const [selectedPayment, setSelectedPayment] = useState("");

  const paymentData = [
    { label: "e-Money", value: "eMoney" },
    { label: "Cash on Delivery", value: "cod" },
  ];
  const emoneyData = [
    { label: "e-Money Number", placeholder: "238521993" },
    { label: "PIN Number", placeholder: "6891" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPayment(e.target.value);
  };

return(
     <div style={{ marginBottom: "0.1rem" , width:'90%' }}>
      <p
        style={{
          fontFamily: "Manrope",
          fontWeight: 700,
          fontSize: "13px",
          lineHeight: "25px",
          letterSpacing: "0.93px",
          textTransform: "uppercase",
          color: "#D87D4A",
        }}
      >
        PAYMENT
      </p>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "1rem" , marginTop:'0.5rem' , justifyContent:'space-between' }}>
       
         <p
        style={{
          fontFamily: "Manrope",
          fontWeight: 700,
          fontSize: "12px",
          lineHeight: "25px",
          letterSpacing: "0.93px",
          color: 'black',
        }}
      >
        Payment Method
      </p>
      <div style={{display:'flex' , flexDirection:'column' , gap:'1rem' , flexWrap:"wrap"}}>
        {paymentData.map((payment) => (
        <RadioInput
          key={payment.value}
          label={payment.label}
          name="payment"
          value={payment.value}
          checked={selectedPayment === payment.value}
          onChange={handleChange}
        />
      ))}

      </div>
      <div style={{ display: "flex", flexDirection: "row", gap: "1rem" , justifyContent:'space-between'  , flexWrap:'wrap'}}>
      {emoneyData.map((item) => (
        <LabeledInput
          key={item.label}
          label={item.label}
          placeholder={item.placeholder}
          width={250}
          height={56}
        />
      ))}
    </div>

      </div>
    </div>
)
};
export default CheckOutForm;


