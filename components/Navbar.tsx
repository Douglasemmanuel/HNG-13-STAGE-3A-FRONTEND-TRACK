"use client";
import Link from 'next/link';
import React from 'react'
import Image from 'next/image';
import useResponsive from '@/hooks/useResponsive';
import logo from '../public/assets/logo.svg' ;
import hamburger from '../public/assets/hamburger.svg' ;
import { useState } from 'react';
import carts from '../public/assets/carts.svg' ;
import { useRouter } from 'next/navigation';
import CartModal from './cartModal';
import { useCartStore } from '@/store/cart_store';
import ProductButton from './ProductButton';
const Navbar:React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
   const [isCartOpen, setIsCartOpen] = useState(false);
     const handleOpenCart = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);
   const [quantity, setQuantity] = useState(1);
   const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();
   const clearCart = useCartStore((state) => state.clearCart);
  
  const toggleMenu = () => {
    setIsVisible(!isVisible);
  };
  const handleCheckout = () => {
  handleCloseCart()      
  router.push('/checkout'); 
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
          fill
           style={{ objectFit: 'contain' }}
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
      fill
     style={{ objectFit: 'contain' }}
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
       onClick={()=> router.push('/')}
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
          cursor:'pointer' ,
        }}
        onClick={() => setIsCartOpen(true)}
      >
        <Image
          src={carts}
          alt="carts"
          fill
           style={{ objectFit: 'contain' }}
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
<CartModal isOpen={isCartOpen} onClose={handleCloseCart}>
  {cart.length < 0 ? (
     <div style={{display:'flex' , flexDirection:'column' , justifyContent:'space-between' , alignItems:"center"}}>
    <p style={{textAlign:"center"}}>No Items Available</p>
    </div>
  ):(
      <div>
          <div style={{display:'flex' , flexDirection:'row' , justifyContent:'space-between' , alignItems:"center"}}>
           <p
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize: '18px',
        lineHeight: '100%',
        letterSpacing: '1.29px',
        textTransform: 'uppercase',
      }}
    >
      CART ({cart.length})
    </p>
          <p
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '25px',
        letterSpacing: '0px',
        textDecoration: 'underlined',
        textDecorationStyle: 'solid',
        textDecorationThickness: '0%',
        cursor:'pointer'
      }}
       onClick={clearCart}
    >
      Remove all
    </p>
  
        </div>
       
      <div style={{display:'flow' , flexDirection:'column' , margin:'1rem 0rem'}}>
       {cart.map((item) => (
        <div
          key={item.id}
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left: Image and Info */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
            {/* Image */}
            <div
              style={{
                width: '64px',
                height: '64px',
                transform: 'rotate(0deg)',
                background: '#F1F1F1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div style={{ position: 'relative', width: '40px', height: '38.5px' }}>
                <Image
                  src={item?.image.replace('./assets', '/assets')} 
                  alt={`${item.name}-image`}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
            </div>

            {/* Name & Price */}
            <div>
              <p
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 700,
                  fontSize: '15px',
                  lineHeight: '25px',
                  letterSpacing: '0px',
                }}
              >
                {item.name}
              </p>
              <p
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '25px',
                  letterSpacing: '0px',
                  paddingTop:'0.3rem',
                }}
              >
                ${item.price}
              </p>
            </div>
          </div>

          {/* Quantity Selector */}
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
              onClick={() => decreaseQuantity(item.id)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              -
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
              {item.quantity}
            </span>
            <button
              onClick={() => increaseQuantity(item.id)}
              style={{
                border: 'none',
                background: 'transparent',
                fontSize: '18px',
                cursor: 'pointer',
              }}
            >
              +
            </button>
          </div>
        </div>
      ))}

    </div>

    {(() => {
        const total = cart.reduce((sum, item) => {
          // adjust these property names to match your item object
          return sum + (item.price * item.quantity);
        }, 0);
        return (
          <div style={{ display:'flex', flexDirection:"row", justifyContent:'space-between'  , alignItems:"center"  , paddingTop:'1rem'}}>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '25px',
              letterSpacing: '0px',
              textDecoration: 'none',
            }}>
              TOTAL
            </p>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '1.29px',
              textTransform: 'uppercase',
            }}>
              ${total.toLocaleString()}
            </p>
          </div>
        );
      })()}
         <ProductButton
      text="CHECKOUT"
      bgColor="#D87D4A"
      textColor="white"
      hoverBgColor="#FBAF85"
      hoverTextColor="white"
      width= '325px'
      height='48px'
      onClick={handleCheckout}
     
    />
      </div>
  )}
    
      </CartModal>

 <div style={{ border: '1px solid white', width: '100%', marginTop: '2rem' , opacity:'10.4%' }}></div>
        </div>

  )
}

export default Navbar ;