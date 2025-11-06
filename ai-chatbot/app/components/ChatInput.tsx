'use client';

import { RefObject } from 'react';

interface ChatInputProps {
    messageInput: string;
    isInputDisabled: boolean;
    isLoading: boolean;
    textareaRef: RefObject<HTMLTextAreaElement | null>;
    fileInputRef: RefObject<HTMLInputElement | null>;
    onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onUploadClick: () => void;
    onSendMessage: () => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ChatInput({
    messageInput,
    isInputDisabled,
    isLoading,
    textareaRef,
    fileInputRef,
    onMessageChange,
    onKeyDown,
    onUploadClick,
    onSendMessage,
    onFileChange
}: ChatInputProps) {
    return (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pb-safe">
            <div className="px-4 py-3 sm:px-6 sm:py-4">
                <div className="flex items-start space-x-2 sm:space-x-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        multiple
                        onChange={onFileChange}
                        className="hidden"
                    />
                    <div className="flex-1 relative">
                        <textarea
                            ref={textareaRef}
                            value={messageInput}
                            onChange={onMessageChange}
                            onKeyDown={onKeyDown}
                            rows={1}
                            placeholder="Type your message..."
                            disabled={isInputDisabled}
                            className={`w-full px-4 pt-2.5 pb-2.5 sm:px-5 sm:pt-3 sm:pb-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all ${isInputDisabled ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            style={{ maxHeight: '120px', overflowY: 'auto' }}
                        />
                    </div>
                    <button
                        onClick={onUploadClick}
                        disabled={isInputDisabled}
                        className={`flex-shrink-0 pt-2.5 pb-2.5 px-2.5 sm:pt-3 sm:pb-3 sm:px-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 ${isInputDisabled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        aria-label="Upload image"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                    </button>
                    <button
                        onClick={onSendMessage}
                        disabled={isInputDisabled}
                        className={`flex-shrink-0 pt-2.5 pb-2.5 px-2.5 sm:pt-3 sm:pb-3 sm:px-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 shadow-md hover:shadow-lg active:scale-95 ${isInputDisabled ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        aria-label="Send message"
                    >
                        {isLoading ? (
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white spinner" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="60" strokeDashoffset="45"></circle>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

