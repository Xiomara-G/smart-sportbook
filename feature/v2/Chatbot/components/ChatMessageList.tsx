'use client';

import React, { memo, useRef, useEffect } from 'react';
import { Message } from '../interfaces/ChatbotInterfaces';
import { ChatMessage } from './ChatMessage';
import { ChatbotLocalization } from '../localization/Core/ChatbotLocalization';

interface ChatMessageListProps {
  messages: Message[];
}

export const ChatMessageList = memo(function ChatMessageList({
  messages,
}: ChatMessageListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const hasMessages = messages.length > 0;

  if (!hasMessages) {
    return (
      <section
        className="flex flex-1 flex-col items-center justify-center px-4"
        aria-label="Empty chat state"
      >
        <div className="text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#81C00A] to-[#3B6C01] mx-auto">
            <svg
              className="h-8 w-8 text-white"
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
          </div>
          <p className="text-gray-400">
            {ChatbotLocalization.subtitle}
          </p>
        </div>
      </section>
    );
  }

  const isStreaming = messages.some((msg) => msg.isStreaming);
  const hasContent = messages.some((msg) => msg.isStreaming && msg.content);

  return (
    <section
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-4"
      aria-label="Chat messages"
      role="log"
      aria-live="polite"
      aria-atomic="false"
    >
      <div className="mx-auto max-w-3xl space-y-6">
        {messages
          .filter((msg) => !(msg.isStreaming && !msg.content))
          .map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        {isStreaming && !hasContent && (
          <div className="flex items-center gap-3 text-gray-400">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700 text-sm font-medium text-gray-200">
              AI
            </div>
            <div className="flex items-center gap-1">
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></span>
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></span>
              <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></span>
            </div>
            <span className="text-sm">{ChatbotLocalization.loadingMessage}</span>
          </div>
        )}
      </div>
    </section>
  );
});
