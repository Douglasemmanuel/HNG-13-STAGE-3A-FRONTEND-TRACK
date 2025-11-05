// "use client";
import React from 'react'
import useResponsive from '@/hooks/useResponsive';
const HeadphoneHero:React.FC = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const paddingValue = isDesktop ? '13rem' : isTablet ? '0rem' : '0rem';

  return (
    <div
      style={{
        padding: `2rem ${paddingValue}`,
        backgroundColor: 'black',
      }}
    >
   
      <div
        style={{
          width: '100%',
          height: '150px',
          display: 'flex',             
          alignItems: 'center',        
          justifyContent: 'center',    
        }}
      >
        <p
          style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 700,
            fontSize: isTablet ? '56px' : '40px',
            lineHeight: '100%',
            letterSpacing: '10px',
            textTransform: 'uppercase',
            margin: 0,
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          HEADPHONES
        </p>
      </div>
    </div>
  );
};


export default HeadphoneHero