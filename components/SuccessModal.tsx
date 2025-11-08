'use client';

import React from 'react';
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
        // onClick={onClose}
      />

      {/* Modal */}
      <div
  className="
    absolute
    left-1/2
    transform
    -translate-x-1/2
    bg-white
    rounded-[8px]
    shadow-lg
    z-10
  "
  style={{
    width: isDesktop ? '581px' : isTablet ? '400px' : '300px',
    // height: isDesktop ? '540px' : isTablet ? '560px' : '700px',
    top: isDesktop ? '10px' : isTablet ? '10px' : '10px', // brings modal lower
  }}
>
  <div className="p-3">
    {children}
  </div>
</div>

    </div>
  );
};

export default CartModal;
