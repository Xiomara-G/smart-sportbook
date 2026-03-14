'use client';

import React, { memo, useState, useCallback, useRef, KeyboardEvent } from 'react';
import { ChatbotLocalization } from '../localization/Core/ChatbotLocalization';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = memo(function ChatInput({
  onSendMessage,
  isLoading,
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = useCallback(() => {
    const trimmedMessage = inputValue.trim();
    if (trimmedMessage && !isLoading) {
      onSendMessage(trimmedMessage);
      setInputValue('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  }, [inputValue, isLoading, onSendMessage]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(event.target.value);
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${Math.min(
          textareaRef.current.scrollHeight,
          200
        )}px`;
      }
    },
    []
  );

  return (
    <section
      className="border-t border-gray-800 bg-gray-900 px-4 py-4"
      aria-label="Message input"
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative flex items-end gap-2 rounded-2xl border border-gray-700 bg-gray-800 p-2 shadow-sm">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={ChatbotLocalization.inputPlaceholder}
            disabled={isLoading}
            rows={1}
            className="max-h-[200px] min-h-[44px] w-full resize-none rounded-xl bg-transparent px-3 py-3 text-sm text-gray-100 placeholder-gray-400 outline-none disabled:opacity-50"
            aria-label="Message input field"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            aria-label={ChatbotLocalization.sendButtonAriaLabel}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#81C00A] text-gray-900 transition-all hover:bg-[#6da308] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              className="h-5 w-5 rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-gray-400">
          {ChatbotLocalization.helperText}
        </p>
      </div>
    </section>
  );
});
