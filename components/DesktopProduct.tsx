

"use client";
import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import useResponsive from "@/hooks/useResponsive";
import ProductButton from "./ProductButton";

interface ProductProps {
  isNew?: boolean;
  title: string;
  subtitle?: string;
  description: string;
  image: string | StaticImageData;
  buttonText: string;
  buttonLink?: string;
  layout?: "imageLeft" | "imageRight";
}

const getFlexDirection = (layout: "imageLeft" | "imageRight") => {
  return layout === "imageRight" ? "row-reverse" : "row";
};

const DesktopProduct: React.FC<ProductProps> = ({
  isNew = false,
  title,
  subtitle,
  description,
  image,
  buttonText,
  buttonLink,
  layout = "imageLeft",
}) => {
  const { isMobile, isTablet, isDesktop } = useResponsive();
  const paddingValue = isDesktop ? "13rem" : isTablet ? "5rem" : "2rem";

  return (
    <div style={{ padding: `2rem ${paddingValue}` }}>
      <div
        style={{
          display: "flex",
          flexDirection: getFlexDirection(layout),
          justifyContent: "space-between",
          gap: isDesktop ? "5rem" : "1rem",
          alignItems: "center",
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        {/* IMAGE SECTION */}
        <div
          style={{
            position: "relative", // Required for Image fill
            aspectRatio: "1 / 1",
            width: isDesktop ? "540px" : "100%",
            height: isDesktop ? "560px" : "auto",
            background: "#F1F1F1",
            borderRadius: "8px",
          }}
        >
          <Image
            src={image} // string from JSON, e.g. "/assets/product-xx99-mark-two-headphones/desktop/image-product.jpg"
            alt={title}
            fill // Fill the parent div
            style={{
              objectFit: "contain",
              borderRadius: "8px",
              height:'100%',
              width:'100%'
            }}
          />
        </div>

        {/* TEXT SECTION */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isDesktop ? "flex-start" : "center",
            justifyContent: "center",
            textAlign: isDesktop ? "start" : 'center',
          }}
        >
          {isNew && (
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontWeight: 400,
                fontSize: "14px",
                lineHeight: "100%",
                letterSpacing: "10px",
                textTransform: "uppercase",
                color: "#D87D4A",
                display: "inline-block",
                padding: "0.1rem 1rem",
                borderRadius: "4px",
                margin: 0,
              }}
            >
              NEW PRODUCT
            </p>
          )}

          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 700,
              fontSize: isDesktop ? "40px" : "36px",
              lineHeight: isDesktop ? "44px" : "40px",
              letterSpacing: "1.43px",
              textTransform: "uppercase",
              margin: 0,
              color: "black",
              
            }}
          >
            {title}
            <br /> {subtitle}
          </p>

          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontWeight: 400,
              fontSize: "15px",
              lineHeight: "25px",
              paddingTop: isDesktop ? "1rem" : "0.5rem",
              maxWidth: "80%",
              color: "black",
            }}
          >
            {description}
          </p>

          <Link href={buttonLink ?? "/"} passHref>
            <ProductButton
              text={buttonText}
              bgColor="#D87D4A"
              textColor="white"
              hoverBgColor="#FBAF85"
              hoverTextColor="white"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopProduct;
