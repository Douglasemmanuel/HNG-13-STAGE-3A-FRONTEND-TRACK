"use client";


import React from 'react'
import Logo from '../assets/logo.svg' ;
import facebook from '../assets/shared/desktop/icon-facebook.svg' ;
import instagram from '../assets/shared/desktop/icon-instagram.svg' ;
import twitter from '../assets/shared/desktop/icon-twitter.svg' ;
import Image from 'next/image';
import useResponsive from '@/hooks/useResponsive';
const Footer:React.FC = () => {
    const { isMobile, isTablet, isDesktop } = useResponsive();
  return (
   <div
   style={{
     paddingTop: isMobile ? "6rem" : isTablet ? "4rem" : "5rem",

   }}
   >
     <div
    className="bg-black 
                w-full                 
                h-[654px]             
                sm:h-[400px]           
                lg:h-[365px]                        
                            
                rotate-0                  
                "
>
    <div style={{padding:isDesktop ? '5rem' : isTablet ? '3rem' :'2rem'}}>
        <div style={{display:'flex' ,  flexDirection: isDesktop ? 'row' : 'column',justifyContent:'space-between' , flexWrap:'wrap'}}>
      <Image src={Logo} alt="My SVG" width={143} height={25} />
      <div style={{ display:'flex', flexDirection:"row", gap:isDesktop ? '3rem' : '0.8rem', flexShrink: 0 , paddingTop:isDesktop? '0rem' : '1rem' }}>
    {['HOME','HEADPHONES','SPEAKERS','EARPHONES'].map((item) => (
      <p
        key={item}
        style={{
          fontFamily: 'Manrope',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: '25px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#FFFFFF', // make sure text is visible
        }}
      >
        {item}
      </p>
    ))}
  </div>
        </div>
        <div style={{display:'flex' , flexDirection:'row' , flexWrap:'wrap' , justifyContent:"space-between" , padding:'2rem 0', }}>
             <p
  style={{
    fontFamily: 'Manrope',
    fontWeight: 400,
    fontSize: '15px',
    lineHeight: '25px',
    letterSpacing: '0px',
    color:'#FFFFFF',
    margin:0,
    flex :'1 1 300px' ,
     maxWidth: isDesktop ? '60%' : isTablet ? '80%' :'100%'
  }}
>
Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music lovers and sound specialists who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we’re open 7 days a week.
</p>

{isDesktop && (
    <div style={{display:'flex' , flexDirection:'row' , gap:'1rem' , alignItems:'center'}}>
 <Image src={facebook} alt="My SVG" width={13} height={14} />
 <Image src={twitter} alt="My SVG" width={13} height={14} />
  <Image src={instagram} alt="My SVG" width={13} height={14} />
</div>
)}
        </div>
     <div>
  {/* Desktop */}
  {isDesktop && (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0',
      }}
    >
      <p
        style={{
          fontFamily: 'Manrope',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: '25px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#FFFFFF',
        }}
      >
        Copyright 2021. All Rights Reserved
      </p>
      
    </div>
  )}

  {/* Tablet */}
  {isTablet && !isDesktop && (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0',
      }}
    >
      <p
        style={{
          fontFamily: 'Manrope',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: '25px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#FFFFFF',
        }}
      >
        Copyright 2021. All Rights Reserved
      </p>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
        <Image src={facebook} alt="Facebook" width={13} height={14} />
        <Image src={twitter} alt="Twitter" width={13} height={14} />
        <Image src={instagram} alt="Instagram" width={13} height={14} />
      </div>
    </div>
  )}

  {/* Mobile */}
  {isMobile && !isTablet && !isDesktop && (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 0',
      }}
    >
      <p
        style={{
          fontFamily: 'Manrope',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: '25px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#FFFFFF',
        }}
      >
        Copyright 2021. All Rights Reserved
      </p>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center' }}>
        <Image src={facebook} alt="Facebook" width={13} height={14} />
        <Image src={twitter} alt="Twitter" width={13} height={14} />
        <Image src={instagram} alt="Instagram" width={13} height={14} />
      </div>
    </div>
  )}
</div>

    </div>
    </div>
   </div>
  )
}

export default Footer;