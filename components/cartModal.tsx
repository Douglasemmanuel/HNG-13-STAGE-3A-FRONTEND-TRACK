'use client';

import React, { useState } from 'react';
import useResponsive from '@/hooks/useResponsive';
interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, children }) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  if (!isOpen) return null;

  return (
    // Overlay
 <div className="fixed inset-0 z-50">
  {/* Dimmed background */}
  <div
    className="fixed inset-0 bg-black opacity-50"
    onClick={onClose}
  />

  {/* Modal */}
  <div
    className="
      absolute
      top-[129px]          
      w-[377px]         
      max-w-full        
      sm:w-[377px]       
              
      p-6
      bg-white
      rounded-[8px]      
      shadow-lg
      z-10
    "
    style={{
      right:isDesktop ? '10rem' : isTablet ? '5rem' : '2rem'
    }}
  >
    {children}

    {/* Close button */}
    {/* <button
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      onClick={onClose}
    >
      ✕
    </button> */}
  </div>
</div>




  );
};

export default CartModal;
