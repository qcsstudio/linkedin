"use client"
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';
import Image from 'next/image';

function KeyFeatureCarousel({ featureData, setActiveIndex, activeindex }) {
  const [cardSize, setCardSize] = useState({ width: 342, height: 479 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) { // Small screens (e.g., mobile)
        setCardSize({ width: 200, height: 300 });
      } else if (window.innerWidth < 1024) { // Medium screens (e.g., tablets)
        setCardSize({ width: 300, height: 420 });
      } else { // Large screens
        setCardSize({ width: 342, height: 479 });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      id="app"
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Swiper
        effect={'cards'}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
        style={{
          width: `${cardSize.width}px`,
          height: `${cardSize.height}px`,
        }}
        initialSlide={5}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {featureData.map((slide, index) => (
          <SwiperSlide
          key={index}
          className="relative w-full h-full overflow-hidden "
          style={{
            borderRadius: '18px',
            backgroundColor: [
              'rgb(255, 255, 255,0.7)',
              'rgb(255, 255, 255,0.7)',
              'rgb(255, 255, 255,0.7)',
              'rgb(255, 255, 255,0.7)',
              'rgb(255, 255, 255,0.7)',
              'rgb(255, 255, 255,0.7)',
              'rgb(255, 255, 255,0.7)',
              'rgb(255, 255, 255,0.7)',
              'rgb(255, 255, 255,0.7)',
              'rgb(255, 255, 255,0.7)',
            ][index % 10],
          }}
        >
          <div className="relative w-full h-full z-10 overflow-hidden">
            <Image 
              src={slide.Image} 
              alt="img"
              fill
              className="object-cover z-10"
            />
          </div>
        </SwiperSlide>
        
        ))}
      </Swiper>
    </div>
  );
}

export default KeyFeatureCarousel;
