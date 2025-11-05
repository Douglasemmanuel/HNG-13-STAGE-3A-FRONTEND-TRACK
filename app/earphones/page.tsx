"use client";
import React from 'react'
import EarphoneHero from '@/components/EarphoneHero';
import Advertisement from '@/components/Advertisement';
import HomeShop from '@/components/HomeShop';
import EarphoneProduct from '@/components/EarphoneProduct';
const Pages:React.FC = () => {
  return (
    <div>
        <EarphoneHero/>
        <EarphoneProduct/>
        <HomeShop/>
          <Advertisement/>
    </div>
  )
}

export default Pages;