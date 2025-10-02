'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { Input } from './input';
import { Avatar } from './avatar';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  avatar?: string;
  name?: string;
  type?: 'text' | 'image' | 'file' | 'system';
  metadata?: {
    fileName?: string;
    fileSize?: string;
    imageUrl?: string;
  };
}

export interface ChatAgent {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  role?: string;
}

export interface ChatWidgetProps {
  messages: ChatMessage[];
  agent: ChatAgent;
  onSendMessage: (content: string) => void;
  onSendFile?: (file: File) => void;
  className?: string;
  placeholder?: string;
  maxHeight?: number;
  showTyping?: boolean;
  isTyping?: boolean;
  disabled?: boolean;
  userBubbleClassName?: string; // classes Tailwind pour la bulle utilisateur
  agentBubbleClassName?: string; // classes Tailwind pour la bulle agent
  showSenderName?: boolean;
  groupConsecutive?: boolean; // regroupe les messages consécutifs du même auteur
}

export function ChatWidget({
  messages,
  agent = {
    id: 'default-agent',
    name: 'Assistant',
    avatar: '',
    status: 'online' as const,
    role: 'Support',
  },
  onSendMessage,
  onSendFile,
  className,
  placeholder = 'Tapez votre message...',
  maxHeight = 500,
  showTyping = true,
  isTyping = false,
  disabled = false,
  userBubbleClassName = 'bg-primary text-primary-foreground',
  agentBubbleClassName = 'bg-muted text-foreground',
  showSenderName = false,
  groupConsecutive = true,
}: ChatWidgetProps) {
  const [inputValue, setInputValue] = React.useState('');
  const [isMinimized, setIsMinimized] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isFirstRenderRef = React.useRef(true);

  // Auto-scroll only inside the chat container when new messages arrive (skip first mount)
  React.useEffect(() => {
    if (isFirstRenderRef.current) {
      isFirstRenderRef.current = false;
      return;
    }
    const el = containerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onSendFile) {
      onSendFile(file);
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: ChatAgent['status']) => {
    switch (status) {
      case 'online':
        return 'bg-green-400';
      case 'away':
        return 'bg-yellow-400';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status: ChatAgent['status']) => {
    switch (status) {
      case 'online':
        return 'En ligne';
      case 'away':
        return 'Absent';
      case 'offline':
        return 'Hors ligne';
      default:
        return 'Inconnu';
    }
  };

  if (isMinimized) {
    return (
      <div className={twMerge('z-10', className)}>
        <Button onClick={() => setIsMinimized(false)} className="rounded-full w-14 h-14 shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </Button>
      </div>
    );
  }

  return (
    <div className={twMerge('w-full rounded-lg', className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Avatar src={agent.avatar} alt={agent.name} size="sm" />
            <div
              className={twMerge(
                'absolute -bottom-1 -right-1 w-3 h-3 rounded-full',
                getStatusColor(agent.status),
              )}
            />
          </div>
          <div>
            <div className="font-medium text-foreground">{agent.name}</div>
            <div className="text-xs text-muted-foreground">
              {getStatusText(agent.status)}
              {agent.role && ` • ${agent.role}`}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => setIsMinimized(true)} className="">
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
      <div
        ref={containerRef}
        className="overflow-y-auto p-4 space-y-4"
        style={{ maxHeight: `${maxHeight}px` }}
      >
        {messages.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p>Commencez une conversation</p>
          </div>
        ) : (
          messages.map((message, idx) => {
            const prev = idx > 0 ? messages[idx - 1] : undefined;
            const groupedWithPrev =
              !!groupConsecutive &&
              !!prev &&
              prev.sender === message.sender &&
              (message.sender === 'agent'
                ? (prev.name || agent.name) === (message.name || agent.name)
                : true);
            return (
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
                  {message.sender === 'agent' && (
                    <div className="mr-2 mt-1 flex flex-col items-center">
                      {groupedWithPrev ? (
                        <div className="w-6 h-6" />
                      ) : (
                        <Avatar
                          src={message.avatar || agent.avatar}
                          alt={message.name || agent.name}
                          size="xs"
                        />
                      )}
                      {showSenderName && !groupedWithPrev && (
                        <span className="mt-1 text-[10px] text-muted-foreground max-w-[80px] truncate">
                          {message.name || agent.name}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex flex-col items-stretch">
                    {showSenderName &&
                      message.sender === 'user' &&
                      message.name &&
                      !groupedWithPrev && (
                        <div className="text-[10px] text-muted-foreground mb-1 text-right">
                          {message.name}
                        </div>
                      )}
                    <div
                      className={twMerge(
                        'rounded-lg px-3 py-2',
                        message.sender === 'user' ? userBubbleClassName : agentBubbleClassName,
                      )}
                    >
                      {message.type === 'system' ? (
                        <div className="text-center text-xs text-muted-foreground italic">
                          {message.content}
                        </div>
                      ) : message.type === 'file' ? (
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            <span className="text-sm font-medium">
                              {message.metadata?.fileName}
                            </span>
                          </div>
                          {message.metadata?.fileSize && (
                            <div className="text-xs text-muted-foreground">
                              {message.metadata.fileSize}
                            </div>
                          )}
                        </div>
                      ) : message.type === 'image' ? (
                        <div className="space-y-2">
                          <img
                            src={message.metadata?.imageUrl}
                            alt="Image"
                            className="rounded max-w-full h-auto"
                          />
                          {message.content && <div className="text-sm">{message.content}</div>}
                        </div>
                      ) : (
                        <div className="text-sm">{message.content}</div>
                      )}

                      <div
                        className={twMerge(
                          'text-xs mt-1',
                          message.sender === 'user'
                            ? 'text-primary-foreground/80 text-right'
                            : 'text-foreground/70 text-left',
                        )}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {showTyping && isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Avatar src={agent.avatar} alt={agent.name} size="xs" />
              <div className="rounded-lg px-3 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <div
                    className="w-2 h-2 rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4">
        <div className="flex items-center space-x-2">
          {onSendFile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className=""
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </Button>
          )}

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

        {/* Hidden file input */}
        {onSendFile && (
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt"
          />
        )}
      </div>
    </div>
  );
}

// Hook for managing chat state
export function useChatWidget() {
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = React.useState(false);

  const addMessage = (message: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
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

  const sendFile = (file: File) => {
    const fileName = file.name;
    const fileSize = (file.size / 1024).toFixed(1) + ' KB';

    addMessage({
      content: `Fichier: ${fileName}`,
      sender: 'user',
      type: 'file',
      metadata: {
        fileName,
        fileSize,
      },
    });
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    isTyping,
    addMessage,
    sendMessage,
    sendFile,
    simulateTyping,
    clearMessages,
  };
}
