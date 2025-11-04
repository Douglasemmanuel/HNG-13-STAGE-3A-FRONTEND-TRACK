"use client";
import React from 'react'
import DesktopProduct from './DesktopProduct';
import products from '../public/assets/db.json';
const SpeakerProduct:React.FC = () => {
  return (
    <div style={{margin:'2rem 0rem'}}>
     <ProductWrapper productId={6} layout="imageLeft" />
     <ProductWrapper productId={5} layout="imageRight" />
    </div>
  )
}
interface ProductWrapperProps {
  productId: number;
  layout?: 'imageRight' | 'imageLeft'; 
}

const ProductWrapper: React.FC<ProductWrapperProps> = ({ productId, layout = 'imageRight' }) => {
  const product = products.data.find((p) => p.id === productId);

  if (!product) return null; // No product found

  return (
    <DesktopProduct
      title={product.name}
      subtitle={product.category}
      description={product.description}
      image={product.image.desktop.replace("./assets", "/assets")}
      buttonText="See Product"
      buttonLink={`/products/${product.id}`}
      layout={layout}
    />
  );
};

export default SpeakerProduct