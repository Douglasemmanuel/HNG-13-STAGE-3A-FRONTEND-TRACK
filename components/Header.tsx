
"use client";
import React from 'react'
import Image from 'next/image';
import Navbar from './Navbar';
import HomeHero from './HomeHero';
// import useResponsive from '@/hooks/useResponsive';

const Header:React.FC = () => {
  return (
    <div
     className="bg-black 
                w-full                 
                h-[600px]             
                sm:h-[729px]           
                lg:h-[729px]                        
                            
                rotate-0                  
                "
    
    >
      <Navbar/>
      <HomeHero/>
    </div>
  )
}

export default Header