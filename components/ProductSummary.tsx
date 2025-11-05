"use client";
import React from 'react'
import useResponsive from '@/hooks/useResponsive';
const ProductSummary:React.FC = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  return (
    <div
  style={{
    width: isDesktop ?'250px' : isTablet ? '240px': '327px',
    height: '612px',
    // position: 'relative',
    backgroundColor: '#f0f0f0', 
  }}
></div>

  )
}

export default ProductSummary