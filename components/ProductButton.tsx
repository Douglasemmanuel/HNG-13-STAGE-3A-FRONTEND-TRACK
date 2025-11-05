'use client';

import React, { useState } from 'react';
import useResponsive from '@/hooks/useResponsive';

interface ProductButtonProps {
  text?: string;
  width?: string;
  height?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string; 
  borderWidth?: string; 
  hoverBgColor?: string;
  hoverTextColor?: string;
  fontSize?: string;
  marginTop?: string;
  onClick?: () => void; // Optional onClick prop
}

const ProductButton: React.FC<ProductButtonProps> = ({
  text = 'See Product',
  width = '160px',
  height = '48px',
  bgColor = 'transparent',
  textColor = 'black',
  borderColor,      
  borderWidth = '1px', 
  hoverBgColor = 'black',
  hoverTextColor = 'white',
  fontSize = '13px',
  marginTop = '2rem',
  onClick, // destructure it here
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick} // optional click
      style={{
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isHovered ? hoverBgColor : bgColor,
        color: isHovered ? hoverTextColor : textColor,
        border: borderColor ? `${borderWidth} solid ${borderColor}` : 'none',
        textAlign: 'center',
        cursor: onClick ? 'pointer' : 'default', // only show pointer if clickable
        marginTop,
        transition: 'all 0.3s ease',
      }}
    >
      <p
        style={{
          color: isHovered ? hoverTextColor : textColor,
          fontFamily: 'Manrope, sans-serif',
          fontWeight: 700,
          fontSize,
          lineHeight: '100%',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          margin: 0,
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default ProductButton;
