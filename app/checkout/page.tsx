"use client";

import React from 'react'
import { useRouter } from 'next/navigation';
import CheckOutForm from '@/components/CheckOutForm';
import ProductSummary from '@/components/ProductSummary';
import useResponsive from '@/hooks/useResponsive';
const CheckoutScreen:React.FC = () => {
    const { isMobile, isTablet, isDesktop } = useResponsive();
    const router = useRouter()
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';
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
      <div style={{display:"flex" , 
      flexDirection:"row" ,
       flexWrap:"wrap" , 
      justifyContent:"space-between" ,
       alignItems:'center',
         marginTop:"2rem" 
         }}>
        <CheckOutForm/>
        <ProductSummary/>
      </div>
      </div>
  )
}

export default CheckoutScreen;