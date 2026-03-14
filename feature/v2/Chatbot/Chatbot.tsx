'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Message, ChatState } from './interfaces/ChatbotInterfaces';
import { ChatHeader } from './components/ChatHeader';
import { ChatMessageList } from './components/ChatMessageList';
import { ChatInput } from './components/ChatInput';
import { ChatSuggestions } from './components/ChatSuggestions';
import { createUserMessage, createAssistantMessage } from './adapters/MessageAdapter';
import { sendMessage } from './services/ChatbotService';
import { ThemeToggle } from './components/ThemeToggle';

const INITIAL_GREETING = "¡Hola! Soy Lucky, tu asistente de soporte. Estoy aquí para ayudarte. ¿En qué puedo asistirte hoy?";

export default function Chatbot() {
  const [state, setState] = useState<ChatState>({
    messages: [],
    inputValue: '',
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    setState((prev) => ({
      ...prev,
      messages: [createAssistantMessage(INITIAL_GREETING)],
    }));
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    const userMessage = createUserMessage(content);

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      error: null,
    }));

    try {
      const response = await sendMessage({ content });

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, response.message],
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: 'Failed to send message',
      }));
    }
  }, []);

  const handleNewChat = useCallback(() => {
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
    <div className="relative flex h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <ChatHeader onNewChat={handleNewChat} />
      <ChatMessageList messages={state.messages} isLoading={state.isLoading} />
      <ChatSuggestions
        onSuggestionClick={handleSuggestionClick}
        hasMessages={state.messages.length > 0}
      />
      <ChatInput onSendMessage={handleSendMessage} isLoading={state.isLoading} />
      <div className="absolute bottom-4 right-4 z-10">
        <ThemeToggle />
      </div>
    </div>
  );
}
