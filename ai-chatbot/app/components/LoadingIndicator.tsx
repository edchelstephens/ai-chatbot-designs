'use client';

export default function LoadingIndicator() {
    return (
        <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                AI
            </div>
            <div className="flex-1">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 sm:px-5 sm:py-4 shadow-sm max-w-[85%] sm:max-w-md">
                    <div className="flex items-center space-x-1.5">
                        <div className="typing-dot w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
                        <div className="typing-dot w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
                        <div className="typing-dot w-2 h-2 bg-gray-500 dark:bg-gray-400 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

