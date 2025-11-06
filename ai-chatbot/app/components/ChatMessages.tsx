'use client';

import { RefObject } from 'react';
import MessageBubble from './MessageBubble';
import LoadingIndicator from './LoadingIndicator';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    images: string[];
}

interface ChatMessagesProps {
    messages: Message[];
    isLoading: boolean;
    chatContainerRef: RefObject<HTMLDivElement | null>;
}

export default function ChatMessages({ messages, isLoading, chatContainerRef }: ChatMessagesProps) {
    return (
        <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto chat-container chat-scrollbar px-4 py-6 sm:px-6 space-y-4"
        >
            {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
            ))}
            {isLoading && <LoadingIndicator />}
        </div>
    );
}

