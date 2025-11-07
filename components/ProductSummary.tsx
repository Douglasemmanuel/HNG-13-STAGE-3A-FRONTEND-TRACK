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
}
const ProductSummary:React.FC<ProductSummaryProps> = ({ onPayClick }) => {
   const router = useRouter();
   const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();
  const { isMobile, isTablet, isDesktop } = useResponsive();
   const [open, setOpen] = useState(false)
      const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
   const handlePayed = () => {
  handleCloseModal()      
  router.push('/'); 
};
const handleContinuePay = () => {
    if (onPayClick) {
      onPayClick(); // Run validation & form submission logic from CheckoutScreen
    } else {
      handleOpenModal(); // Fallback (in case no function passed)
    }
  };
   const total = cart.reduce((sum, item) => {
          // adjust these property names to match your item object
          return sum + (item.price * item.quantity);
        }, 0);
        const shipping = 50;
  const vat = 50;
  const grandTotal = total + shipping + vat;
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
              ${total.toLocaleString()}
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
              $ 50
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
      onClick={handleContinuePay}
     
    />
  </div>
 <SuccessModal isOpen={open} onClose={handleCloseModal}>
    <div style={{padding:"1rem"}}>
       <div
    style={{
      width: '64px',
      height: '64px',
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
      <p
  style={{
    fontFamily: "Manrope",
    fontWeight: 700,
    fontSize: "32px",
    lineHeight: "36px",
    letterSpacing: "1.14px",
    textTransform: "uppercase",
     paddingTop:'0.5rem',
  }}
>
  THANK YOU <br/>FOR YOUR ORDER
</p>

    <p
  style={{
    fontFamily: "Manrope",
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "25px",
    paddingTop:'0.5rem',
   
  }}
>
 You will receive an email confirmation shortly.
</p>
<div style={{display:"flex" , flexDirection:"row" , justifyContent:"space-between" , marginTop:"1rem" , flexWrap:"wrap" , gap:isMobile? '1rem' :'0rem'}}>
  <div
style={{
  color: 'black',
    paddingTop: '0.5rem',
    width: '314px',
    // height: '140px',
    top: '299px',
    left: '294px',
    transform: 'rotate(0deg)',
    opacity: 1,
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    background:"#F1F1F1",
}}
>
<div style={{display:"flex" , flexDirection:"column" , padding:'1rem'}}>
    <div style={{display:'flow' , flexDirection:'column' }}>
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
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
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
                  <div style={{ position: 'relative', width: '50px', height: '50px' }}>
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
                      // paddingTop:'0.3rem',
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
 <div
  style={{
    borderTop: '1px solid black', 
    opacity: 0.2,                
    width: '100%',                 
    margin: '10px 0'              
  }}
></div>
<p
  style={{
    fontFamily: 'Manrope',
    fontWeight: 700,
    fontSize: '12px',
    lineHeight: '100%',
    letterSpacing: '-0.21px',
    textAlign:'center' , 
  }}
>
 and {cart.length -1} other item(s)
</p>
</div>
</div>
<div
style={{
  color: 'black',
    paddingTop: '0.5rem',
    width:  isDesktop ?'168px' : '100%',
    height:  isDesktop ? '140px' : '100px',
    top: '299px',
    left: '294px',
    transform: 'rotate(0deg)',
    opacity: 1,
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
    background:"black",
    marginTop: isDesktop ? '0rem' :'0.3rem'
}}
>
<div style={{display:"flex" , flexDirection:"column" , alignItems:"center" , justifyContent:"center" , }}>
 <p
  style={{
    fontFamily: "Manrope",
    fontWeight: 400,
    fontSize: "15px",
    lineHeight: "25px",
    paddingTop:'0.5rem',
    color:"white",
      //  textAlign:"center",
   
  }}
>
GRAND TOTAL
</p>
<p
  style={{
    fontFamily: "Manrope",
    fontWeight: 700,
    fontSize: "18px",
    lineHeight: "25px",
    paddingTop:'0.5rem',
    color:"white",
      textTransform: "uppercase",
      // textAlign:"center",
   
  }}
>
$ 5,446
</p>
</div>
</div>

</div>
   <ProductButton
      text="BACK TO HOME"
      bgColor="#D87D4A"
      textColor="white"
      hoverBgColor="#FBAF85"
      hoverTextColor="white"
      width= '100%'
      height='48px'
      onClick={handlePayed}
     
    />
      
      
    </div>
 </SuccessModal>
</div>

  )
}

export default ProductSummary;