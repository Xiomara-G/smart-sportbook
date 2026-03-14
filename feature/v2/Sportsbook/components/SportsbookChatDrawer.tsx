'use client';

import React, { memo } from 'react';
import Chatbot from '../../Chatbot/Chatbot';

interface SportsbookChatDrawerProps {
  isOpen: boolean;
  closeLabel: string;
  onToggle: () => void;
}

export const SportsbookChatDrawer = memo(function SportsbookChatDrawer({
  isOpen,
  closeLabel,
  onToggle,
}: SportsbookChatDrawerProps) {
  return (
    <>
      <button
        className="animate-glow-pulse fixed right-4 top-1/2 z-40 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-linear-to-br from-[#81C00A] to-[#3B6C01] text-white transition-all duration-300"
        onClick={onToggle}
        type="button"
        aria-label={isOpen ? closeLabel : 'Abrir asistente'}
      >
        <svg
          className="animate-icon-shine h-7 w-7"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
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
