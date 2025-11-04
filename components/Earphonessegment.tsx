
"use client";
import React from 'react'
import Image from 'next/image';
import earbuds from '../public/assets/product-yx1-earphones/desktop/image-gallery-2.jpg' ;
import ProductButton from './ProductButton';
import useResponsive from '@/hooks/useResponsive';
const Earphonessegment:React.FC = () => {
      const { isMobile, isTablet, isDesktop } = useResponsive();
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';
  return (
    <div style={{padding: `2rem ${paddingValue}`}}>
        <div style={{display:'flex' , flexDirection:'row' , flexWrap:"wrap" ,justifyContent:"space-between"  , gap:isDesktop ? '0rem' : '1.5rem'}}>
            <div
  style={{
    width: '540px',
    height: '320px',
    // top: '2277px',
    overflow: 'hidden',
  }}
>
  <Image
    src={earbuds} 
    alt="Ear Buds"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
</div>
   <div
  style={{
    width: '540px',
    height: '320px',
    // top: '2277px',
    overflow: 'hidden',
    backgroundColor: '#F1F1F1' , 
  }}
>
    <div style={{display:'flex' , flexDirection:'column' , alignItems:'center' , justifyContent:'center' , alignContent:'center'  , padding:'100px'}}>
        <p
  style={{
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 700,
    fontSize: '28px',
    lineHeight: '100%',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    textAlign:"center" ,
  }}
>
  YX1 EARPHONES
</p>
<ProductButton 
  text="See Product"
  bgColor="transparent"
  textColor="black"
  borderColor="black"
  hoverBgColor="black"
  hoverTextColor="white"
/>


    </div>
</div>
        </div>
    </div>
  )
}

export default Earphonessegment