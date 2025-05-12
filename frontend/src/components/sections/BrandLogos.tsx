'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

const brands = [
  { id: 1, name: 'Brand 1', logo: '/brand1.svg' },
  { id: 2, name: 'Brand 2', logo: '/brand2.svg' },
  { id: 3, name: 'Brand 3', logo: '/brand3.svg' },
  { id: 4, name: 'Brand 4', logo: '/brand4.svg' },
  { id: 5, name: 'Brand 5', logo: '/brand5.svg' },
];

export default function BrandLogos() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={5}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          className="brand-logos"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <div className="flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}