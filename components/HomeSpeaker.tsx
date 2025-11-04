"use client";

import React from 'react'
import Image from 'next/image';
import useResponsive from '@/hooks/useResponsive';
import ProductButton from './ProductButton';
import speaker from '../public/assets/product-Zx7-speaker/desktop/image-gallery-3.jpg' ;
import bigspeaker from '../public/assets/home/desktop/image-speaker-zx7.jpg';
const HomeSpeaker:React.FC = () => {
    
          const { isMobile, isTablet, isDesktop } = useResponsive();
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';
    let buttonWidth, buttonHeight ,fontSize;

if (isMobile) {
  buttonWidth = '120px';
  buttonHeight = '30px';
  fontSize = '10px' ;
} else if (isTablet) {
  buttonWidth = '140px';
  buttonHeight = '45px';
   fontSize = '10px' ;
} else if (isDesktop) {
  buttonWidth = '160px';
  buttonHeight = '48px';
   fontSize = '13px' ;
}
      return (
    <div style={{padding: `2rem ${paddingValue}`}}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '1247px', margin: '0 auto' }}>
  <div style={{ width: '100%', height: 'auto', overflow: 'hidden' }}>
    <Image
      src={bigspeaker}
      alt="speaker"
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
    />
  </div>
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '20%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}
  >
    <p
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize:  isDesktop ? '28px' : isTablet ? '24px' : '18px',
        lineHeight: '100%',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        margin: 0,
        color: 'black', 
      }}
    >
      ZX7 SPEAKER
    </p>
    <ProductButton
      text="See Product"
      bgColor="transparent"
      textColor="black"
      borderColor="black"
      hoverBgColor="black"
      hoverTextColor="white"
      height={buttonHeight}
      width={buttonWidth}
      fontSize={fontSize}
      
    />
  </div>
</div>

        {/* <div style={{display:'flex' , flexDirection:'row' ,justifyContent:"space-between"    }}>
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
  ZX7 SPEAKER
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
            <div
      style={{
        // width: '1247.px', 
        // height: '300px', 
         overflow: 'hidden',
        //  transform: 'scaleX(-1)'
      }}
    >
      <Image
        src={bigspeaker}
        alt="speaker"
        style={{ width: '100%', height: '100%', objectFit: 'cover' ,  }}
      />
    </div>
    
        </div> */}

    </div>
  )
}

export default HomeSpeaker