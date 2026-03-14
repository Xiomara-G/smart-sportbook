'use client';

import React, { memo } from 'react';

interface SportsbookBetCounterProps {
  label: string;
  count: number;
}

export const SportsbookBetCounter = memo(function SportsbookBetCounter({
  label,
  count,
}: SportsbookBetCounterProps) {
  return (
    <footer className="border-t border-[#1a1a1a] bg-[#0a0a0a] px-4 py-3">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-500">{label}</p>
        <span className="rounded-full bg-[#81C00A] px-4 py-1 text-sm font-bold text-black shadow-[0_0_15px_rgba(129,192,10,0.3)]">
          {count}
        </span>
      </div>
    </footer>
  );
});
