"use client";
import React from 'react'
import Image from 'next/image';
import useResponsive from '@/hooks/useResponsive';
import ProductButton from './ProductButton';
import arrow from '../public/assets/home/desktop/Path 2.svg' ;
import headphone from '../public/assets/home/desktop/headphone.png' ;
import speaker from '../public/assets/home/desktop/speaker3.png' ;
import earbuds from '../public/assets/product-yx1-earphones/desktop/image-product.jpg' ;
import earbud from '../public/assets/budss.png' ;
const HomeShop:React.FC = () => {
  const products = [
  { id: 1, title: "HEADPHONES", image: headphone },
  { id: 2, title: "SPEAKERS", image: speaker },
  { id: 3, title: "EARPHONES", image: earbud },
];
         const { isMobile, isTablet, isDesktop } = useResponsive();
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';
  return (
    <div style={{padding: `8rem ${paddingValue}`}}>
       <div style={{
        display:'flex' ,
        flexDirection:isDesktop ? 'row' :'column',
        gap:isDesktop ?  '2rem'  : '8rem'  ,
        marginTop:'1rem',
       }}>
  {products.map((item) => (
        <div
          key={item.id}
          style={{
            width:  isTablet ? '350px' :  isMobile ? '327px' : '360px',
            height:  isDesktop ? '204px' :'210px',
            position: 'relative',
            transform: 'rotate(0deg)',
            opacity: 1,
            backgroundColor: '#F1F1F1',
            borderRadius: '8px',
            overflow: 'visible',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-4.5rem',
              left: '113.68px',
              width: '122.947px',
              height: '160px',
            }}
          >
            <Image
              src={item.image}
              alt={item.title}
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div style={{ position: 'relative', textAlign: 'center', marginTop: '130px' }}>
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
              {item.title}
            </p>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '0.3rem', justifyContent:"center", paddingTop:'1rem' , cursor:'pointer' }}>
              <p
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 700,
                  fontSize: '13px',
                  lineHeight: '100%',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Shop
              </p>
              <div
                style={{
                  position: 'relative',
                  width: '5px',
                  height: '10px',
                }}
              >
                <Image
                  src={arrow}
                  alt="Arrow"
                  layout="fill"
                style={{objectFit:'contain'}}
                />
              </div>
            </div>
          </div>
        </div>
      ))}

       </div>

        </div>
  )
}

export default HomeShop