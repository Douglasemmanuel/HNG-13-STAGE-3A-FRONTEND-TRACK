"use client";
import React from 'react'
import { useState, useEffect } from 'react';

function useScreenVisibility(minWidth: number) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsVisible(window.innerWidth >= minWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [minWidth]);

  return isVisible;
}

export default useScreenVisibility;
