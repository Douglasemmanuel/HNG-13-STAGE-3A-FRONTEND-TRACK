"use client";
import React from 'react'
import SpeakerHero from '@/components/SpeakerHero'
import Advertisement from '@/components/Advertisement';
import SpeakerProduct from '@/components/SpeakerProduct';
import HomeShop from '@/components/HomeShop';
const Page:React.FC = () => {
  return (
    <div>
        <SpeakerHero/>
        <SpeakerProduct/>
        <HomeShop/>
        <Advertisement/>
    </div>
  )
}

export default Page;