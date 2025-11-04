"use client";
import React from 'react'
import useResponsive from '@/hooks/useResponsive';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProductButton from '../ProductButton';
import { useState } from 'react';
interface ProductInfoProps {
 image: string;
  name: string;
  price: number;
  description: string;
  
}
const ProductInfo:React.FC<ProductInfoProps> = ({image ,name , price , description}) => {
        const { isMobile, isTablet, isDesktop } = useResponsive();
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';
       const router = useRouter();
         const [quantity, setQuantity] = useState(1);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  return (
    <div  style={{ padding: `4rem ${paddingValue}` }}>
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
        <div style={{display:'flex' , flexDirection: isDesktop ?'row' : 'column' , margin:'4rem 0rem' , gap: isDesktop ? "5rem" : "1rem",}}>
     <div
  style={{
    position: "relative",
    aspectRatio: "1 / 1",
    width: isDesktop ? "540px" : "100%",
    height: isDesktop ? "560px" : "auto",
    background: "#F1F1F1",
    borderRadius: "8px",
    display: "flex",         
    justifyContent: "center", 
    alignItems: "center",     
  }}
>
  <div
    style={{
      width: "349.238px",
      height: "386px",
      opacity: 1,
      transform: "rotate(0deg)",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Image
      src={image?.replace('./assets', '/assets')}
      alt="product"
       width={500}
        height={500}
      style={{
        objectFit: "contain",
        borderRadius: "8px",
        width: "100%",
        height: "100%",
      }}
    />
  </div>
</div>

 <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isDesktop ? "flex-start" : "center",
            justifyContent: "center",
            textAlign: isDesktop ? "start" : 'center',
          }}
        >
          <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "10px",
                textTransform: "uppercase",
                color: "#D87D4A",
                display: "inline-block",
                padding: "0.1rem 1rem",
                borderRadius: "4px",
                margin: 0,
              }}
            >
              NEW PRODUCT
            </p>

          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: isDesktop ? "40px" : "36px",
              lineHeight: isDesktop ? "44px" : "40px",
              letterSpacing: "1.43px",
              textTransform: "uppercase",
              margin: 0,
              color: "black",
              
            }}
          >
            {name}
            <br /> Headphones
          </p>

          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: "25px",
              paddingTop: isDesktop ? "1rem" : "0.5rem",
              maxWidth: "80%",
              color: "black",
            }}
          >
           {description}
          </p>
            <p
  style={{
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 700,
    fontSize: '18px',
    lineHeight: '100%',
    letterSpacing: '1.29px',
    textTransform: 'uppercase',
    margin: 0, 
    padding:'1.5rem 0rem',
  }}
>
  $ {price}
</p>
<div
  style={{
    display: 'flex',
    flexDirection: 'row',
    gap: '1.5rem',
    alignItems: 'center', 
    justifyContent: 'center',
  }}
>
  {/* quantity box */}
 
 <div
    style={{
      width: '120px',
      height: '48px',
      background: '#F1F1F1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between', 
      borderRadius: '8px',
      padding: '0 12px',
      boxSizing: 'border-box',
    }}
  >
    <button
      onClick={increment}
      style={{
        border: 'none',
        background: 'transparent',
        fontSize: '18px',
        cursor: 'pointer',
      }}
    >
      +
    </button>

    <span
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize: '16px',
        textAlign: 'center',
        width: '24px',
      }}
    >
      {quantity}
    </span>

    <button
      onClick={decrement}
      style={{
        border: 'none',
        background: 'transparent',
        fontSize: '18px',
        cursor: 'pointer',
      }}
    >
      -
    </button>
  </div>
  {/* ProductButton */}
  <div style={{ display: 'flex', alignItems: 'center', height: '48px' }}>
    <ProductButton
      text="ADD TO CART"
      bgColor="#D87D4A"
      textColor="white"
      hoverBgColor="#FBAF85"
      hoverTextColor="white"
       width= '120px'
      height='48px'
    />
  </div>
</div>


        </div>

            

        </div>
        </div>
  )
}

export default ProductInfo