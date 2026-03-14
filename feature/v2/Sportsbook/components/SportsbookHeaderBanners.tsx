'use client';

import React, { memo } from 'react';

export const SportsbookHeaderBanners = memo(function SportsbookHeaderBanners() {
  return (
    <header className="px-6 py-6">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section aria-label="Video promocional">
          <div className="relative w-full overflow-hidden rounded-4xl">
            <video
              className="h-64 w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/image.png"
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </div>
        </section>
        
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Top Live Events</h3>
          <div className="flex gap-2">
            <button className="cursor-pointer h-8 w-8 rounded-lg bg-[#1a1a1a] text-xs">{'<'}</button>
            <button className="cursor-pointer h-8 w-8 rounded-lg bg-[#1a1a1a] text-xs">{'>'}</button>
          </div>
        </div>
      </div>
    </header>
  );
});
