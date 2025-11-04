"use client";
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import useResponsive from '@/hooks/useResponsive';
import ProductButton from './ProductButton';
import logo from '../public/assets/logo.svg' ;
import hamburger from '../public/assets/hamburger.svg' ;
import { useState } from 'react';
import carts from '../public/assets/carts.svg' ;
const Navbar:React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };
      const { isMobile, isTablet, isDesktop } = useResponsive();
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';
  return (
    <div style={{padding: `2rem ${paddingValue}` , backgroundColor:'black' }}>
       <div style={{display:'flex' , justifyContent:'space-between' , alignItems:"center" }}>
     <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
{(isMobile || isTablet) && (
      <div
        style={{
          width: '16px',
          height: '15px',
          position: 'relative',
          cursor:'pointer'
        }}
        onClick={toggleMenu}
      >
        <Image
          src={hamburger}
          alt="Menu"
          layout="fill"
          objectFit="contain"
        />
      </div>
    )}
  <div
    style={{
      width: '143px',
      height: '25px',
       position: 'relative',
    }}
  >
    <Image
      src={logo}
      alt="Logo"
      layout="fill"
      objectFit="contain"
    />
  </div>
</div>
{(isDesktop)&&(
  <>
    <div style={{ display: 'flex', gap: '1.5rem' , position:'relative' }}>
  <Link href="/" passHref>
    <p
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize: '13px',
        lineHeight: '25px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        margin: 0,
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'white',
      }}
    >
      HOME
    </p>
  </Link>

  <Link href="/headphones" passHref>
    <p
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize: '13px',
        lineHeight: '25px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        margin: 0,
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'white',
      }}
    >
      HEADPHONES
    </p>
  </Link>

  <Link href="/speakers" passHref>
    <p
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize: '13px',
        lineHeight: '25px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        margin: 0,
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'white',
      }}
    >
      SPEAKERS
    </p>
  </Link>

  <Link href="/earphones" passHref>
    <p
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize: '13px',
        lineHeight: '25px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        margin: 0,
        textDecoration: 'none',
        cursor: 'pointer',
        color: 'white',
      }}
    >
      EARPHONES
    </p>
  </Link>
</div>
   
</>
)}
<div
        style={{
          width: '23px',
          height: '20px',
          position: 'relative',
        }}
      >
        <Image
          src={carts}
          alt="carts"
          layout="fill"
          objectFit="contain"
        />
      </div>
       </div>
  {isVisible && (
  <div
    style={{
      display: 'flex',
      gap: '1.5rem',
      flexDirection: 'column',
      position: 'absolute',
      // top: '60px',          
      right: '0',
      // left:'5rem',  
      padding:'2rem  3rem',
      width:'100%',          
      backgroundColor: '#000', 
      zIndex: 1000,           
      borderRadius: '8px',   
    }}
  >
    <Link href="/" passHref>
      <p
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: '25px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          margin: 0,
          textDecoration: 'none',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        HOME
      </p>
    </Link>

    <Link href="/headphones" passHref>
      <p
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: '25px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          margin: 0,
          textDecoration: 'none',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        HEADPHONES
      </p>
    </Link>

    <Link href="/speakers" passHref>
      <p
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: '25px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          margin: 0,
          textDecoration: 'none',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        SPEAKERS
      </p>
    </Link>

    <Link href="/earphones" passHref>
      <p
        style={{
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 700,
          fontSize: '13px',
          lineHeight: '25px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          margin: 0,
          textDecoration: 'none',
          cursor: 'pointer',
          color: 'white',
        }}
      >
        EARPHONES
      </p>
    </Link>
  </div>
)}
 <div style={{ border: '1px solid white', width: '100%', marginTop: '2rem' , opacity:'10.4%' }}></div>
        </div>

  )
}

export default Navbar ;