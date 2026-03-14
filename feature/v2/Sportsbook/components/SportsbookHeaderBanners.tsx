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
    <header className="border-b border-gray-800 bg-[#07122b] px-4 py-4">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-sm text-blue-100">{description}</p>
        </div>
        <section
          className="grid grid-cols-1 gap-3 md:grid-cols-3"
          aria-label="Promociones destacadas"
        >
          {banners.map((banner) => (
            <article
              key={banner.id}
              className="rounded-xl border border-cyan-500/40 bg-[#0c1e43] p-4 text-white"
            >
              <h2 className="text-sm font-semibold">{banner.title}</h2>
              <p className="mt-1 text-xs text-blue-100">{banner.subtitle}</p>
              <button
                className="mt-3 rounded-md bg-cyan-500 px-3 py-2 text-xs font-semibold text-[#00112c] transition hover:bg-cyan-400"
                type="button"
              >
                {banner.ctaLabel}
              </button>
            </article>
          ))}
        </section>
      </div>
    </header>
  );
});
