'use client';

import { useState, useEffect, useRef } from 'react';
import ChatHeader from './components/ChatHeader';
import ChatMessages from './components/ChatMessages';
import ImagePreview from './components/ImagePreview';
import ChatInput from './components/ChatInput';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  images: string[];
}

interface UploadedImage {
  file: File;
  dataUrl: string;
}

export default function Home() {
  // State management
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'ai',
      images: []
    }
  ]);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [messageInput, setMessageInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  // Refs
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize dark mode after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    // Set initial dark mode from localStorage or system preference
    const saved = localStorage.getItem('darkMode');
    const initialDarkMode = saved !== null
      ? saved === 'true'
      : window.matchMedia('(prefers-color-scheme: dark)').matches;

    setIsDarkMode(initialDarkMode);

    if (initialDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Update dark mode when state changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(isDarkMode));
  }, [isDarkMode]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [messageInput]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus textarea on mount and after AI response
  useEffect(() => {
    if (textareaRef.current && !isLoading) {
      textareaRef.current.focus();
    }
  }, [isLoading]);

  // Focus textarea on initial mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Business logic functions
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setUploadedImages(prev => [...prev, {
            file: file,
            dataUrl: event.target?.result as string
          }]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const clearPreview = () => {
    setUploadedImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUploadClick = () => {
    if (!isInputDisabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const sendMessage = () => {
    if (isInputDisabled) return;

    const message = messageInput.trim();
    if (!message && uploadedImages.length === 0) return;

    if (message || uploadedImages.length > 0) {
      const userImages = uploadedImages.map(img => img.dataUrl);

      // Add user message
      const newMessage: Message = {
        id: Date.now(),
        text: message,
        sender: 'user',
        images: userImages
      };
      setMessages(prev => [...prev, newMessage]);

      // Clear input
      setMessageInput('');
      setUploadedImages([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Show loading state
      setIsLoading(true);
      setIsInputDisabled(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 1,
          text: "I received your message" +
            (message ? `: "${message}"` : '') +
            (userImages.length > 0 ? ' with images' : '') +
            ". How can I assist you further?",
          sender: 'ai',
          images: []
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        setIsInputDisabled(false);
      }, 2000);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(e.target.value);
  };

  // Render presentation components with props
  return (
    <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-800 shadow-lg">
      <ChatHeader
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      <ChatMessages
        messages={messages}
        isLoading={isLoading}
        chatContainerRef={chatContainerRef}
      />

      <ImagePreview
        uploadedImages={uploadedImages}
        onRemoveImage={removeImage}
        onClearPreview={clearPreview}
      />

      <ChatInput
        messageInput={messageInput}
        isInputDisabled={isInputDisabled}
        isLoading={isLoading}
        textareaRef={textareaRef}
        fileInputRef={fileInputRef}
        onMessageChange={handleMessageChange}
        onKeyDown={handleKeyDown}
        onUploadClick={handleUploadClick}
        onSendMessage={sendMessage}
        onFileChange={handleFileChange}
      />
    </div>
  );
}
