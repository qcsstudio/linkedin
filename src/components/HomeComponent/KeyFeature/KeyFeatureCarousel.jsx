"use client"
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { EffectCards } from 'swiper/modules';

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
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '18px',
              fontSize: '22px',
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: [
                'rgb(206, 17, 17)',
                'rgb(0, 140, 255)',
                'rgb(10, 184, 111)',
                'rgb(211, 122, 7)',
                'rgb(118, 163, 12)',
                'rgb(180, 10, 47)',
                'rgb(35, 99, 19)',
                'rgb(0, 68, 255)',
                'rgb(218, 12, 218)',
                'rgb(54, 94, 77)',
              ][index % 10],
            }}
          >
            {activeindex}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default KeyFeatureCarousel;
