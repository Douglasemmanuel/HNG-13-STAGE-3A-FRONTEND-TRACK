"use client";
import React from 'react'
import useResponsive from '@/hooks/useResponsive';
import ProductButton from './ProductButton';
import { useCartStore } from '@/store/cart_store';
import SuccessModal from './SuccessModal';
import { useState } from 'react';
import logo from '../public/assets/checked.svg' ;
import Image from 'next/image';
import { useRouter } from 'next/navigation';
interface ProductSummaryProps {
  onPayClick?: () => void;
  // open: boolean;
  // setOpen: (val: boolean) => void;
}
const ProductSummary:React.FC<ProductSummaryProps> = ({ onPayClick }) => {
   const router = useRouter();
   const { cart, increaseQuantity, decreaseQuantity, removeFromCart , subtotal , grandTotal , shipping , vat } = useCartStore();
  const { isMobile, isTablet, isDesktop } = useResponsive();
  
 
  return (
    <div
  style={{
    width: isDesktop ?'430px' : isTablet ? '100%': '100%',
    // height: '612px',
    // width:'250px' ,
    // position: 'relative',
    backgroundColor: '#FFFFFF', 
  }}
>
  <div style={{display:'flex' , flexDirection:'column' , padding:'2rem '}}>
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
      SUMMARY
    </p>
     <div style={{display:'flow' , flexDirection:'column' , margin:'1rem 0rem' }}>
           {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop:'1rem',
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
    
            <p
  style={{
    fontFamily: "Manrope",
    fontWeight: 700,
    fontSize: "15px",
    lineHeight: "25px",
    letterSpacing: "0px",
    textAlign: "right",
  }}
>
  x{item.quantity}
</p>

            </div>
          ))}
    
        </div>
         {(() => {
       
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
              ${subtotal}
            </p>
          </div>
        );
      })()}
       <div style={{ display:'flex', flexDirection:"row", justifyContent:'space-between'  , alignItems:"center"  , paddingTop:'1rem'}}>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '25px',
              letterSpacing: '0px',
              textDecoration: 'none',
            }}>
              SHIPPING
            </p>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '1.29px',
              textTransform: 'uppercase',
            }}>
              $ {shipping}
            </p>
          </div>
           <div style={{ display:'flex', flexDirection:"row", justifyContent:'space-between'  , alignItems:"center"  , paddingTop:'1rem'}}>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '25px',
              letterSpacing: '0px',
              textDecoration: 'none',
            }}>
            VAT (INCLUDED)
            </p>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '1.29px',
              textTransform: 'uppercase',
            }}>
              $ {vat}
            </p>
          </div>
             <div style={{ display:'flex', flexDirection:"row", justifyContent:'space-between'  , alignItems:"center"  , paddingTop:'1rem'}}>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '25px',
              letterSpacing: '0px',
              textDecoration: 'none',
            }}>
            GRAND TOTAL
            </p>
            <p style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: '18px',
              lineHeight: '100%',
              letterSpacing: '1.29px',
              textTransform: 'uppercase',
              color:'#D87D4A',
            }}>
              ${grandTotal}
            </p>
          </div>
         <ProductButton
      text="CONTINUE & PAY"
      bgColor="#D87D4A"
      textColor="white"
      hoverBgColor="#FBAF85"
      hoverTextColor="white"
      width='100%'
      // width={isDesktop ? '230px' : isTablet ? '230px' : '100%'}
      height='48px'
      onClick={onPayClick}
     
    />
  </div>

</div>

  )
}

export default ProductSummary;