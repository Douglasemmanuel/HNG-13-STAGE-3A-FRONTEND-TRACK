"use client";

import { useParams } from "next/navigation";
import React from 'react' ;
import Advertisement from '@/components/Advertisement' ;
import HomeShop from '@/components/HomeShop' ;
import products from '../../../public/assets/db.json' ;
import ProductImages from "@/components/products/ProductImages";
import AlsoLikeProducts from "@/components/products/AlsoLikeProducts";
import InBox from "@/components/products/InBox";
import ProductInfo from "@/components/products/ProductInfo";

const ProductScreen:React.FC = () => {
   const params = useParams();
  const { id } = params; 
const numericId = Number(id); 
const product = products.data.find((p) => p.id === numericId);

  return (
    <div>
<ProductInfo
  image={product!.image!.desktop ?? null}
  name={product?.slug ?? 'No Name'}
  price={product?.price ?? 0}        
  description={product?.description ?? 'No description available'} 
  productId={product?.id ?? 0 }
/>

      <InBox  features={product?.features}  includes={product?.includes}/>
      {product?.gallery && <ProductImages gallery={product.gallery} />}
      {product && (
  <AlsoLikeProducts others={product.others ?? []} />
)}

        <HomeShop/>
        <Advertisement/>
    </div>
  )
}

export default ProductScreen



// import products from "../../../public/assets/db.json";
// import Advertisement from "@/components/Advertisement";
// import HomeShop from "@/components/HomeShop";
// import ProductImages from "@/components/products/ProductImages";
// import AlsoLikeProducts from "@/components/products/AlsoLikeProducts";
// import InBox from "@/components/products/InBox";
// import ProductInfo from "@/components/products/ProductInfo";

// interface ProductPageProps {
//   params: { id: string };
// }

// export default function ProductScreen({ params }: ProductPageProps) {
//   const numericId = Number(params.id);
//   const product = products.data.find((p) => p.id === numericId);

//   if (!product) {
//     return <div>Product not found.</div>;
//   }

//   return (
//     <div>
//       <ProductInfo
//         image={product.image.desktop ?? null}
//         name={product.slug ?? "No Name"}
//         price={product.price ?? 0}
//         description={product.description ?? "No description available"}
//         productId={product.id ?? 0}
//       />

//       <InBox features={product.features} includes={product.includes} />

//       {product.gallery && <ProductImages gallery={product.gallery} />}

//       {product.others && <AlsoLikeProducts others={product.others} />}

//       <HomeShop />
//       <Advertisement />
//     </div>
//   );
// }

// // ✅ This is the key for Vercel build
// export async function generateStaticParams() {
//   return products.data.map((product) => ({
//     id: product.id.toString(),
//   }));
// }
