"use client";

import React from 'react'
import Image from 'next/image';
import man from '../public/assets/man.png' ;
import useResponsive from '@/hooks/useResponsive';
const Advertisement:React.FC = () => {
     const { isMobile, isTablet, isDesktop } = useResponsive();
     let width = 360;
  let height = 300;

  if (isTablet) {
    // width = 540;
    // width = '100%' ;
    height = 400;
  }
  if (isDesktop) {
    width = 500;
    height = 540;
  }
  return (
    <div
    className="
                w-full                 
                h-[698px]             
                sm:h-[633px]           
                lg:h-[588px]                        
                top-[2797px] 
                left-[165px]            
                rotate-0                  
                "
>
 
{isDesktop && (
<div
  style={{
    display: 'flex',
    flexDirection:  'row' ,
    padding: '3rem 13rem',
    alignItems:  'center', 
    justifyContent:'space-between' ,
  }}
>
  {/* Text Section */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems:  'flex-start' ,
      justifyContent: 'center',
      maxWidth:  '100%' ,
    }}
  >
    <p
      style={{
        paddingTop: '0rem',
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize:  '40px',
        lineHeight: '44px',
        letterSpacing: '1.43px',
        textTransform: 'uppercase',
        textAlign:  'start',
      }}
    >
      BRINGING YOU THE <br />
      <span style={{ color: '#D87D4A' }}>BEST</span> AUDIO GEAR
    </p>
    <p
      style={{
        paddingTop:  '1rem',
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '25px',
        letterSpacing: '0px',
        color: '#000000',
        maxWidth: '60%' ,
        textAlign:'start'  ,
      }}
    >
      Located at the heart of New York City, Audiophile is the premier store for high end headphones,
      earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration
      rooms available for you to browse and experience a wide range of our products. Stop by our
      store to meet some of the fantastic people who make Audiophile the best place to buy your
      portable audio equipment.
    </p>
  </div>
   <div
      style={{
        width: '500px',
        height: '540px',
        borderRadius: '8px',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <Image
        src={man}
        alt="My Image"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
</div>
)}
{(isTablet || isMobile) && (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <div
      style={{   
          width: '100%',
        height: isTablet ? '400px' :  '360px' ,
        borderRadius: '8px',  
         position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Image
        src={man}
        alt="My Image"
        
        style={{ width: '100%', height: '100%' , objectFit:'cover' }}
      />
    </div>
    {/* Text Section */}
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems:  'center' ,
      justifyContent: 'center',
      maxWidth:  '80%' ,
      paddingTop:'1rem',
    }}
  >
    <p
      style={{
        paddingTop: '0rem',
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize:  isMobile ? '20px' : '40px',
        lineHeight: '44px',
        letterSpacing: '1.43px',
        textTransform: 'uppercase',
        textAlign:  'center',
      }}
    >
      BRINGING YOU THE 
       <span style={{ color: '#D87D4A' }}> BEST</span> <br />AUDIO GEAR
    </p>
    <p
      style={{
        paddingTop:  '1rem',
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '25px',
        letterSpacing: '0px',
        color: '#000000',
        maxWidth: '100%' ,
        textAlign:'center'  ,
        margin: '0 auto',
      }}
    >
      Located at the heart of New York City, Audiophile is the premier store for high end headphones,
      earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration
      rooms available for you to browse and experience a wide range of our products. Stop by our
      store to meet some of the fantastic people who make Audiophile the best place to buy your
      portable audio equipment.
    </p>
  </div>
  </div>
)}


</div>
  )
}

export default Advertisement