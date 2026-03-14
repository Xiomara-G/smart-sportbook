'use client';

import React, { memo } from 'react';
import Chatbot from '../../Chatbot/Chatbot';

interface SportsbookChatDrawerProps {
  isOpen: boolean;
  openLabel: string;
  closeLabel: string;
  onToggle: () => void;
}

export const SportsbookChatDrawer = memo(function SportsbookChatDrawer({
  isOpen,
  openLabel,
  closeLabel,
  onToggle,
}: SportsbookChatDrawerProps) {
  const buttonLabel = isOpen ? closeLabel : openLabel;

  return (
    <>
      <button
        className="fixed right-4 top-1/2 z-40 -translate-y-1/2 rounded-full border border-[#81C00A] bg-[#3B6C01] px-4 py-3 text-xs font-semibold text-white shadow-lg transition hover:bg-[#4a7d02]"
        onClick={onToggle}
        type="button"
      >
        {buttonLabel}
      </button>
      <aside
        className={`fixed right-0 top-0 z-30 h-full w-full max-w-md border-l border-[#3B6C01] bg-[#050801] shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Panel de chat"
      >
        <Chatbot isEmbedded />
      </aside>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 bg-black/40"
          onClick={onToggle}
          aria-label={closeLabel}
        />
      )}
    </>
  );
});
