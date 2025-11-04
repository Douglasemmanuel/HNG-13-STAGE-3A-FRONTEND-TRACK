"use client";
import React from 'react'
import useResponsive from '@/hooks/useResponsive';
interface IncludeItem {
  quantity: number;
  item: string;
}
export interface InBoxProps {
  features?: string;           
  includes?: IncludeItem[];   
}
const InBox:React.FC<InBoxProps> = ({features , includes}) => {
        const { isMobile, isTablet, isDesktop } = useResponsive();
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';
  return (
    <div style={{ padding: `4rem ${paddingValue}` }}>
    
        <div
  style={{
    display: 'flex',
    alignItems: 'flex-start', 
    // justifyContent: 'space-between' ,
    gap: '8rem',
    flexWrap:'wrap' ,
  }}
>
  {/* Features section */}
  <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }}>
    <p
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize: '32px',
        lineHeight: '36px',
        letterSpacing: '1.14px',
        textTransform: 'uppercase',
        margin: 0,
      }}
    >
      Features
    </p>
   
    <p
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 400,
        fontSize: '15px',
        lineHeight: '25px',
        letterSpacing: '0px',
        marginTop: '1rem',
        maxWidth: '100%',
        width:'100%',
      }}
    >
     {features}
    </p>
 
  </div>

  {/* In the Box section */}
  <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '50%' }}>
    <p
      style={{
        fontFamily: 'Manrope, sans-serif',
        fontWeight: 700,
        fontSize: '32px',
        lineHeight: '36px',
        letterSpacing: '1.14px',
        textTransform: 'uppercase',
        marginBottom: '1rem',
      }}
    >
      In the Box
    </p>

  {(includes ?? []).map((include, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          {/* Quantity */}
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              lineHeight: "25px",
              color: "#D87D4A",
              margin: 0,
            }}
          >
            {include.quantity}x
          </p>

          {/* Item text */}
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: "25px",
              margin: 0,
            }}
          >
            {include.item}
          </p>
        </div>
      ))}

  </div>
</div>

        </div>
  )
}

export default InBox