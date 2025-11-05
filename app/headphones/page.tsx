"use client";
import React from 'react'
import Advertisement from '@/components/Advertisement';
import HomeShop from '@/components/HomeShop';
import HeadphoneHero from '@/components/HeadphoneHero';
import  HeadphoneProduct  from '@/components/HeadphoneProduct';
const HeadphonesScreen:React.FC = () => {
  return (
    <div>
      <HeadphoneHero/>
      <HeadphoneProduct/>
        <HomeShop/>
        <Advertisement/>
    </div>
  )
}

export default HeadphonesScreen;