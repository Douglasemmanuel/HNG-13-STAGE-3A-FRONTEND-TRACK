"use client";
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import useResponsive from '@/hooks/useResponsive';
import ProductButton from './ProductButton';
import headPhone from '../public/assets/headphones.png' ;
const HomeHero:React.FC = () => {
      const { isMobile, isTablet, isDesktop } = useResponsive();
      const paddingValue = isDesktop ? '13rem' : isTablet ? '0rem' : '0rem';
  return (
    <div style={{padding: `2rem ${paddingValue}` , backgroundColor:'black'}}>
    {isDesktop &&(
          <div style={{display:'flex' , justifyContent:'space-between'}}>
        <div style={{display:'flex' , flexDirection:"column" , alignContent:"center" , justifyContent:'center'}}>
            <p
  style={{
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '100%',
    letterSpacing: '10px',
    textTransform: 'uppercase',
    margin: 0, 
        color:'#FFFFFF',
  }}
>
  NEW PRODUCT
</p>

<p
  style={{
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 700,
    fontSize: '56px',
    lineHeight: '58px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    margin: 0, 
    color:'#FFFFFF',
  }}
>
  XX99 Mark II<br />Headphones
</p>

<p
  style={{
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '25px',
    letterSpacing: '0px',
    margin: 0, 
    maxWidth: '370px', 
    wordWrap: 'break-word',
    color:'#FFFFFF',
  }}
>
  Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
</p>

<ProductButton 
  text="See Product"
  bgColor=" #D87D4A"
  textColor="white"
  borderColor="gray"
  hoverBgColor="#FBAF85" 
  hoverTextColor="white"
/>

        </div>
        <div
  style={{
    height: '500px',
    width: '486px',
    position:'relative'
  }}
>
  <Image
    src={headPhone} 
    alt="headPhone"
    fill
    // objectFit="contain"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
  />
</div>


      </div>
    )}
    {/* tablet */}
    {(isTablet || isMobile)&& (
 <div style={{ position: 'relative', width: '100%', height: isTablet ? '600px' : '475px' }}>
      {/* Image as background */}
      <Image
        src={headPhone} 
        alt="headPhone"
        fill // modern Next.js prop instead of layout="fill"
        style={{ objectFit: 'cover'  , width:"100%" , height:'100%'}}
        priority
      />

      {/* Text and button on top */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 10, // ensures text is above image
          padding: '0 1rem', // small padding for mobile
        }}
      >
        <p
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '100%',
            letterSpacing: '10px',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          NEW PRODUCT
        </p>

        <p
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 700,
            fontSize: isTablet ? '56px' : '36px',
            lineHeight: '58px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          XX99 Mark II<br />Headphones
        </p>

        <p
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 500,
            fontSize: '15px',
            lineHeight: '25px',
            letterSpacing: '0px',
            margin: 0,
            maxWidth: '370px',
            wordWrap: 'break-word',
          }}
        >
          Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
        </p>

        <ProductButton
          text="See Product"
          bgColor="#D87D4A"
          textColor="white"
          hoverBgColor="#FBAF85"
          hoverTextColor="white"
        />
      </div>
    </div>
    )}
        </div>
  )
}

export default HomeHero