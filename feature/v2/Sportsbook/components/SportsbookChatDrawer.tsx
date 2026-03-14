'use client';

import React, { memo } from 'react';
import Chatbot from '../../Chatbot/Chatbot';

interface SportsbookChatDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export const SportsbookChatDrawer = memo(function SportsbookChatDrawer({
  isOpen,
  onToggle,
  onClose,
}: SportsbookChatDrawerProps) {
  return (
    <>
      {!isOpen && (
        <button
          className="animate-glow-pulse fixed right-4 top-[60%] z-40 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-[#81C00A] to-[#3B6C01] text-white transition-all duration-300"
          onClick={onToggle}
          type="button"
          aria-label="Abrir asistente"
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
      )}
      <aside
        className={`fixed right-0 top-0 z-30 h-full w-full max-w-md border-l border-[#3B6C01] bg-[#050801] shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Panel de chat"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-[#1a1a1a] px-4 py-4">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-[#81C00A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-base font-bold uppercase tracking-wider">Asistente</h2>
            </div>
            <button
              onClick={onClose}
              className="cursor-pointer rounded-lg p-2 text-gray-400 hover:bg-[#1a1a1a] hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <Chatbot isEmbedded />
          </div>
        </div>
      </aside>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 z-20 cursor-pointer bg-black/40"
          onClick={onClose}
          aria-label="Cerrar chat"
        />
      )}
    </>
  );
});
