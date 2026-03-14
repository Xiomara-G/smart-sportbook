'use client';

import React, { memo } from 'react';
import { SportsbookBanner } from '../interfaces/SportsbookInterfaces';

interface SportsbookHeaderBannersProps {
  title: string;
  description: string;
  banners: SportsbookBanner[];
}

export const SportsbookHeaderBanners = memo(function SportsbookHeaderBanners({
  title,
  description,
  banners,
}: SportsbookHeaderBannersProps) {
  return (
    <header className="px-6 py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section
          className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          aria-label="Promociones destacadas"
        >
          {banners.map((banner, idx) => (
            <article
              key={banner.id}
              className={`relative overflow-hidden rounded-[2rem] p-6 text-white h-48 flex flex-col justify-end ${
                idx === 0 
                  ? 'bg-gradient-to-br from-[#1a4a1a] to-[#0d1f03] border border-[#3B6C01]/30' 
                  : 'bg-[#121212] border border-[#1a1a1a]'
              }`}
            >
              <div className="relative z-10">
                <h2 className="text-xl font-bold leading-tight">{banner.title}</h2>
                <p className="mt-1 text-xs text-gray-300">{banner.subtitle}</p>
                <button
                  className="mt-4 rounded-full bg-[#81C00A] px-4 py-2 text-xs font-bold text-black transition hover:bg-[#9ad00b]"
                  type="button"
                >
                  {banner.ctaLabel}
                </button>
              </div>
              {/* Decorative elements to mimic image style */}
              <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-[#81C00A]/10 blur-3xl" />
            </article>
          ))}
        </section>
        
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Top Live Events</h3>
          <div className="flex gap-2">
            <button className="h-8 w-8 rounded-lg bg-[#1a1a1a] text-xs">{'<'}</button>
            <button className="h-8 w-8 rounded-lg bg-[#1a1a1a] text-xs">{'>'}</button>
          </div>
        </div>
      </div>
    </header>
  );
});
