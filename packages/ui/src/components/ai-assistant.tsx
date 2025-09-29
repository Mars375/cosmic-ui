'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { Input } from './input';
import { Avatar } from './avatar';
import { Badge } from './badge';
import { Card, CardContent, CardHeader, CardTitle } from './card';

export interface AIMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'code' | 'suggestion' | 'error';
  suggestions?: string[];
  code?: {
    language: string;
    content: string;
  };
}

export interface AIAssistantProps {
  messages: AIMessage[];
  onSendMessage: (message: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
  className?: string;
  placeholder?: string;
  isTyping?: boolean;
  disabled?: boolean;
  maxHeight?: number;
  showSuggestions?: boolean;
  suggestions?: string[];
}

export function AIAssistant({
  messages,
  onSendMessage,
  onSuggestionClick,
  className,
  placeholder = "Posez votre question à l'IA...",
  isTyping = false,
  disabled = false,
  maxHeight = 500,
  showSuggestions = true,
  suggestions = [],
}: AIAssistantProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [isMinimized, setIsMinimized] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim() && !disabled) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    if (onSuggestionClick) {
      onSuggestionClick(suggestion);
    } else {
      onSendMessage(suggestion);
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isMinimized) {
    return (
      <div className={twMerge('fixed bottom-4 left-4 z-50', className)}>
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-14 h-14 shadow-lg bg-cosmic-primary hover:bg-cosmic-primary/80"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </Button>
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        'fixed bottom-4 left-4 w-96 bg-cosmic-surface border border-cosmic-border rounded-lg shadow-xl z-50',
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-cosmic-border">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="AI Assistant"
              size="sm"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-cosmic-surface" />
          </div>
          <div>
            <div className="font-medium text-white">Assistant IA</div>
            <div className="text-xs text-white/70">
              {isTyping ? "En train d'écrire..." : 'En ligne'}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="text-white/70 hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="overflow-y-auto p-4 space-y-4" style={{ maxHeight: `${maxHeight}px` }}>
        {messages.length === 0 ? (
          <div className="text-center text-white/50 py-8">
            <svg
              className="w-12 h-12 mx-auto mb-4 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            <p>Bonjour ! Comment puis-je vous aider ?</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={twMerge(
                'flex',
                message.sender === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              <div
                className={twMerge(
                  'flex max-w-[80%]',
                  message.sender === 'user' ? 'flex-row-reverse' : 'flex-row',
                )}
              >
                {message.sender === 'ai' && (
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="AI Assistant"
                    size="xs"
                    className="mr-2 mt-1"
                  />
                )}

                <div
                  className={twMerge(
                    'rounded-lg px-3 py-2',
                    message.sender === 'user'
                      ? 'bg-cosmic-primary text-white'
                      : 'bg-cosmic-border text-white/90',
                  )}
                >
                  {message.type === 'code' && message.code ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="text-xs">
                          {message.code.language}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(message.code!.content)}
                          className="text-xs text-white/70 hover:text-white"
                        >
                          Copier
                        </Button>
                      </div>
                      <pre className="text-sm bg-cosmic-background rounded p-2 overflow-x-auto">
                        <code>{message.code.content}</code>
                      </pre>
                    </div>
                  ) : (
                    <div className="text-sm">{message.content}</div>
                  )}

                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <div className="text-xs text-white/70">Suggestions :</div>
                      <div className="flex flex-wrap gap-2">
                        {message.suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-xs"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div
                    className={twMerge(
                      'text-xs mt-1',
                      message.sender === 'user' ? 'text-white/70' : 'text-white/50',
                    )}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <Avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="AI Assistant"
                size="xs"
              />
              <div className="bg-cosmic-border rounded-lg px-3 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 bg-white/50 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestions */}
      {showSuggestions && suggestions.length > 0 && messages.length === 0 && (
        <div className="p-4 border-t border-cosmic-border">
          <div className="text-xs text-white/70 mb-2">Suggestions :</div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestionClick(suggestion)}
                className="text-xs"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-cosmic-border">
        <div className="flex items-center space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            className="flex-1"
          />

          <Button onClick={handleSendMessage} disabled={!inputValue.trim() || disabled} size="sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}

// Hook for AI assistant
export function useAIAssistant() {
  const [messages, setMessages] = React.useState<AIMessage[]>([]);
  const [isTyping, setIsTyping] = React.useState(false);

  const addMessage = (message: Omit<AIMessage, 'id' | 'timestamp'>) => {
    const newMessage: AIMessage = {
      ...message,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = (content: string) => {
    addMessage({
      content,
      sender: 'user',
    });
  };

  const simulateAIResponse = (
    content: string,
    type?: AIMessage['type'],
    suggestions?: string[],
    code?: AIMessage['code'],
  ) => {
    setIsTyping(true);
    setTimeout(
      () => {
        addMessage({
          content,
          sender: 'ai',
          type,
          suggestions,
          code,
        });
        setIsTyping(false);
      },
      1000 + Math.random() * 2000,
    );
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isTyping,
    addMessage,
    sendMessage,
    simulateAIResponse,
    clearMessages,
  };
}
