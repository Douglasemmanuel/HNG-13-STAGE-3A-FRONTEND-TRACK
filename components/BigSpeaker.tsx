"use client";
import React from 'react'
import Image from 'next/image';
import useResponsive from '@/hooks/useResponsive';
import ProductButton from './ProductButton';
import speaker from '../public/assets/home/desktop/image-speaker-zx9.svg' ;
import pattern from '../public/assets/home/desktop/pattern-circles.svg' ;

const BigSpeaker:React.FC = () => {
          const { isMobile, isTablet, isDesktop } = useResponsive();
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';
  return (
   <div style={{ padding: `2rem ${paddingValue}` }}>
  <div
    style={{
      position: 'relative',
      width:  isDesktop ? '1110px'  : isTablet  ? '100%' : '100%',
      height:  isDesktop ? '560px' : isTablet ? '720px' : '600px',
      backgroundColor: '#D87D4A',
      borderRadius: '8px',
      overflow: 'hidden',
      transform: 'rotate(0deg)',
    }}
  >
    <Image
      src={pattern}
      alt="SVG Image"
      fill
       style={{ width: '100%', height: '100%', objectFit: 'cover'   }}
    />

    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform:  'translate(-50%, -50%)' ,
       
      }}
    >
     <div style={{display:"flex" ,  flexDirection:isDesktop ? 'row' : 'column' , position:'relative' , justifyContent:'space-between' ,alignItems:'center'  , gap:'5rem'}}>
    {isDesktop && (
            <div
      style={{
        width: '410.23358154296875px',
        height: '493px',
        position: 'absolute',
       top:'-13rem',
       left:'-4rem',
        transform:  isDesktop ? 'translateX(-100%)' :  'translateX(100%)',   
      }}
    >
      <Image
        src={speaker}
        alt="Positioned Image"
        layout="fill"               
        objectFit="cover"             
      />
    </div>
    )}
    {(isTablet || isMobile) && (
         <div
      style={{
        width: isTablet ? '197px' :  isMobile ? '172px' :'410px',
        height: isTablet ? '237px' :  isMobile ? '207px' :'493px',
        position: 'absolute',
       top:'-16rem',       
      }}
    >
      <Image
        src={speaker}
        alt="Positioned Image"
        fill            
        objectFit="cover"             
      />
    </div>
    )}
     {/* <div
      style={{
        width: isTablet ? '197px' :  isMobile ? '172px' :'410px',
        height: isTablet ? '237px' :  isMobile ? '207px' :'493px',
        position: 'absolute',
       top:'-16rem',       
      }}
    >
      <Image
        src={speaker}
        alt="Positioned Image"
        layout="fill"               
        objectFit="cover"             
      />
    </div> */}
      <div style={{ position:'absolute' , alignContent:"flex-end" , alignItems:"self-end"}}>
        <p
  style={{
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 700,
    fontSize: isDesktop ? '56px' :'36px',
    lineHeight:  isDesktop ? '58px' : '40px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    margin: 0, 
    color:'#FFFFFF',
    textAlign:'center' ,
  }}
>
  ZX9 <br/> SPEAKER
</p>
 <p
  style={{
    fontFamily: 'Manrope, sans-serif',
    fontWeight: 400,
    fontSize: '15px',
    lineHeight: '25px',
    letterSpacing: '0px',
    paddingTop:isDesktop ? "1rem" :'0.1rem',
    color:'#FFFFFF'
  }}
>
Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound.
</p>

       <ProductButton 
  text="See Product"
  bgColor="black"
  textColor="white"
  borderColor="grey"
  hoverBgColor="grey"
  hoverTextColor="white"
/>
      </div>
     </div>
    </div>
  </div>
</div>


  )
}

export default BigSpeaker