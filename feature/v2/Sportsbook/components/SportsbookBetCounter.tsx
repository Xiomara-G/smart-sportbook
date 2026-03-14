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
    <footer className="border-t border-[#1f3f7d] bg-[#07122b] px-4 py-3">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <p className="text-sm text-blue-100">{label}</p>
        <span className="rounded-full bg-lime-500 px-3 py-1 text-sm font-bold text-[#102a00]">
          {count}
        </span>
      </div>
    </footer>
  );
});
