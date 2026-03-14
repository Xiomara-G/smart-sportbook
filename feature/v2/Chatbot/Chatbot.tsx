/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Message, ChatState } from './interfaces/ChatbotInterfaces';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessageList } from './components/ChatMessageList';
import { ChatInput } from './components/ChatInput';
import { ChatSuggestions } from './components/ChatSuggestions';
import { createUserMessage, createAssistantMessage } from './adapters/MessageAdapter';
import { sendMessage } from './services/ChatbotService';

const INITIAL_GREETING = "¡Hola! Soy Lucky, tu asistente de apuestas deportivas. 🏆⚽\n\nTe ayudo con:\n• Hacer apuestas simples y combinadas\n• Explicarte todos los tipos de apuestas\n• Proponerte apuestas para los partidos de hoy\n• Resolver dudas sobre tus apuestas y cuotas\n\n¿En qué evento deportivo te gustaría apostar?";
const STORAGE_KEY = 'chat_messages';

interface ChatbotProps {
  isEmbedded?: boolean;
}

const updateLastMessage = (
  messages: Message[],
  messagePatch: Partial<Message>
): Message[] => {
  return messages.map((message, index) => {
    if (index !== messages.length - 1) {
      return message;
    }
    return { ...message, ...messagePatch };
  });
};

export default function Chatbot({ isEmbedded = false }: Readonly<ChatbotProps>) {
  const [state, setState] = useState<ChatState>({
    messages: [],
    inputValue: '',
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setState((prev) => ({
            ...prev,
            messages: parsed.map((msg: Message) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })),
          }));
          return;
        }
      } catch {
        // Ignore parse errors
      }
    }
    setState((prev) => ({
      ...prev,
      messages: [createAssistantMessage(INITIAL_GREETING)],
    }));
  }, []);

  useEffect(() => {
    if (state.messages.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.messages));
    }
  }, [state.messages]);

  const handleSendMessage = useCallback(async (content: string) => {
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      return;
    }

    const userMessage = createUserMessage(trimmedContent);
    const streamingMessage = createAssistantMessage('', true);
    const conversationHistory = state.messages.filter((message) => !message.isStreaming);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage, streamingMessage],
      isLoading: true,
      error: null,
    }));

    try {
      await sendMessage(
        {
          content: trimmedContent,
          conversationHistory,
        },
        (chunk) => {
          setState((prev) => ({
            ...prev,
            messages: updateLastMessage(prev.messages, { content: chunk }),
          }));
        }
      );

      setState((prev) => ({
        ...prev,
        isLoading: false,
        messages: updateLastMessage(prev.messages, { isStreaming: false }),
      }));
    } catch {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        messages: updateLastMessage(prev.messages, {
          isStreaming: false,
          content:
            'Lo siento, estoy teniendo problemas tecnicos en este momento. Por favor, intenta nuevamente en unos momentos o contacta a soporte directamente.',
        }),
        error: 'Failed to send message',
      }));
    }
  }, [state.messages]);

  const handleNewChat = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      messages: [createAssistantMessage(INITIAL_GREETING)],
      inputValue: '',
      isLoading: false,
      error: null,
    });
  }, []);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      handleSendMessage(suggestion);
    },
    [handleSendMessage]
  );

  return (
    <div
      className={`relative flex flex-col bg-gray-950 ${
        isEmbedded ? 'h-full' : 'h-screen'
      }`}
    >
      <ChatHeader onNewChat={handleNewChat} />
      <ChatMessageList messages={state.messages} />
      <ChatSuggestions
        onSuggestionClick={handleSuggestionClick}
        hasMessages={state.messages.length > 0}
      />
      <ChatInput onSendMessage={handleSendMessage} isLoading={state.isLoading} />
    </div>
  );
}