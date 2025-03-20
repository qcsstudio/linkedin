"use client"
import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import './style.css';

// import required modules
import { EffectCards } from 'swiper/modules';

 function KeyFeatureCarousel() {
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
              width: '342px',
              height: '479px',
            }}
            initialSlide={5}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((slide, index) => (
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
                Slide {slide}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      );
}
export default KeyFeatureCarousel