'use client';

interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
    images: string[];
}

interface MessageBubbleProps {
    message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
    return (
        <div
            className={message.sender === 'user'
                ? 'flex items-start justify-end'
                : 'flex items-start space-x-3'}
        >
            {message.sender === 'ai' && (
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                    AI
                </div>
            )}
            <div className={`flex-1 ${message.sender === 'user' ? 'flex flex-col items-end' : ''}`}>
                <div className={`${message.sender === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl rounded-tr-sm'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-tl-sm'} px-4 py-3 sm:px-5 sm:py-4 shadow-sm max-w-[85%] sm:max-w-md`}>
                    {message.text && (
                        <p className="text-sm sm:text-base whitespace-pre-wrap break-words">
                            {message.text}
                        </p>
                    )}
                    {message.images && message.images.length > 0 && (
                        <div className={`mt-2 flex flex-wrap gap-2 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                            {message.images.map((imgSrc, idx) => (
                                <div key={idx} className="relative">
                                    <img
                                        src={imgSrc}
                                        alt="Uploaded image"
                                        className="max-w-[150px] sm:max-w-[200px] h-auto rounded-lg border-2 border-white/20"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

