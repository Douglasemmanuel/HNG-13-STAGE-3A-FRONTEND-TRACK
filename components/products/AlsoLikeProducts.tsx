"use client";
import React from 'react'
import Image from 'next/image';
import headphone from '../../public/assets/home/desktop/headphone.png'
import useResponsive from '@/hooks/useResponsive';
import ProductButton from '../ProductButton';

interface OtherProduct {
  slug: string;
  name: string;
  image: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
interface OthersProductsProps {
  others: OtherProduct[];
}
const AlsoLikeProducts:React.FC<OthersProductsProps> = ({others}) => {
 
        const { isMobile, isTablet, isDesktop } = useResponsive();
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';
  return (
    <div style={{ padding: `4rem ${paddingValue}` }}>
         <div style={{display:'flex' , alignItems:"center" , justifyContent:"center"}}>
                       <p
  style={{
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '36px',
    letterSpacing: '1.14px',
    textTransform: 'uppercase',
    textAlign:"center"
  }}
>
  YOU MAY ALSO LIKE
</p>
     </div>
    <div
  style={{
    display: "flex",
    flexDirection: "row", 
    gap: "1rem",
    flexWrap: "wrap", 
    marginTop: "3rem",
  }}
>
  {others.map((item) => (
    <div
      key={item.slug}
      style={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "flex-start",
      }}
    >
      <div
        style={{
          width: "350px",
          height: "318px",
          backgroundColor: "#F1F1F1",
          opacity: 1,
          transform: "rotate(0deg)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "148px",
            height: "193px",
          }}
        >
          <Image
            src={item.image.desktop.replace("./assets", "/assets")}
            alt={item.name}
            width={148}
            height={193}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "1rem",
          gap: "0.1rem",
        }}
      >
        <p
          style={{
            fontFamily: "Manrope, sans-serif",
            fontWeight: 700,
            fontSize: "24px",
            lineHeight: "100%",
            letterSpacing: "1.71px",
            textTransform: "uppercase",
            paddingTop: "1rem",
          }}
        >
          {item.name}
        </p>
        <ProductButton
          text="SEE PRODUCT"
          bgColor="#D87D4A"
          textColor="white"
          hoverBgColor="#FBAF85"
          hoverTextColor="white"
        />
      </div>
    </div>
  ))}
</div>

       
    </div>
  )
}

export default AlsoLikeProducts