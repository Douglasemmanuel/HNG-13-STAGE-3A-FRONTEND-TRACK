"use client";
import React from 'react'
import DesktopProduct from './DesktopProduct';
import products from '../public/assets/db.json';
const HeadphoneProduct:React.FC = () => {
  return (
    <div style={{margin:'2rem 0rem'}}>
     <ProductWrapper productId={4} layout="imageLeft" />
     <ProductWrapper productId={3} layout="imageRight" />
      <ProductWrapper productId={2} layout="imageLeft" />
    </div>
  )
}

interface ProductWrapperProps {
  productId: number;
  layout?: 'imageRight' | 'imageLeft'; // optional, default to imageRight
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
      // image={product.image.desktop.startsWith("./") ? product.image.desktop.slice(1) : product.image.desktop}
      buttonText="See Product"
      buttonLink={`/products/${product.id}`}
      layout={layout}
    />
  );
};


export default HeadphoneProduct;