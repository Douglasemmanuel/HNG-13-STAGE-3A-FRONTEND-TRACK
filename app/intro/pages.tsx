"use client";
import React from 'react'
import Advertisement from '@/components/Advertisement'
import Earphonessegment from '@/components/Earphonessegment'
import HomeSpeaker from '@/components/HomeSpeaker';
import HomeShop from '@/components/HomeShop';
import BigSpeaker from '@/components/BigSpeaker';

import HomeHero from '@/components/HomeHero';
const HomeScreen:React.FC = () => {
  return (
    <div >
      <HomeHero/>
      <HomeShop/>
      <BigSpeaker/>
      <HomeSpeaker/>
      <Earphonessegment/>
      <Advertisement/>
      {/* <Footer/> */}
    </div>
  )
}

export default HomeScreen;