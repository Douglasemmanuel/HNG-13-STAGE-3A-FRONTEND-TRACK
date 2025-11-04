"use client";
import React from 'react'
import Image from 'next/image';
import man from '../../public/assets/man.png'
import useResponsive from '@/hooks/useResponsive';
interface ProductGallery {
  first: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  second: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
  third: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}

interface ProductImagesProps {
  gallery?: ProductGallery; // <-- make it optional
}

const ProductImages:React.FC<ProductImagesProps>= ({gallery}) => {
    // const galleryArray = [gallery.first, gallery.second, gallery.third];
        const { isMobile, isTablet, isDesktop } = useResponsive();
      const paddingValue = isDesktop ? '13rem' : isTablet ? '5rem' : '2rem';
  return (
    <div style={{ padding: `2rem ${paddingValue}` }}>
        <div style={{display:'flex' , flexDirection:"row" , flexWrap:'wrap' , gap:"1rem"}}>
            <div style={{display:'flex' , flexDirection:"column" , gap:'2rem'}}>
                <div
      style={{
        width: '445px',
        height: '280px',
        opacity: 1,
        transform: 'rotate(0deg)',
      }}
    >
      <Image
      src={gallery?.first?.desktop.replace('./assets', '/assets') ?? '/assets/fallback.jpg'}
  alt="Gallery Image 1"
        width={445}
        height={280}
        style={{ objectFit: 'cover', width:'100%' , height:'100%' }}
      />
    </div>
         <div
      style={{
        width: '445px',
        height: '280px',
        opacity: 1,
        transform: 'rotate(0deg)',
      }}
    >
      <Image
       src={gallery?.second?.desktop.replace('./assets', '/assets') ?? '/assets/fallback.jpg'}
  alt="Gallery Image 2"
        width={445}
        height={280}
        style={{ objectFit: 'cover', width:'100%' , height:'100%' }}
      />
    </div>
            </div>
            <div
      style={{
        top: '1455px',
        left: '640px',
        width: '635px',
        height: '592px',
        opacity: 1,
        transform: 'rotate(0deg)',
      }}
    >
      <Image
     src={gallery?.third?.desktop.replace('./assets', '/assets') ?? '/assets/fallback.jpg'}
  alt="Gallery Image 3"
        width={635}
        height={592}
        style={{ objectFit: 'cover' , width:'100%' , height:'100%' }}
      />
    </div>
        </div>
    </div>
  )
}

export default ProductImages;