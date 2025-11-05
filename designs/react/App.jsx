// React is loaded via CDN, so it's available globally
const { useState, useEffect, useRef } = React;

function App() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your AI assistant. How can I help you today?",
            sender: 'ai',
            images: []
        }
    ]);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            return saved === 'true';
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isInputDisabled, setIsInputDisabled] = useState(false);

    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const chatContainerRef = useRef(null);

    // Initialize dark mode
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', isDarkMode);
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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        files.forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setUploadedImages(prev => [...prev, {
                        file: file,
                        dataUrl: event.target.result
                    }]);
                };
                reader.readAsDataURL(file);
            }
        });
    };

    const removeImage = (index) => {
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
            const newMessage = {
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
                const aiResponse = {
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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-white dark:bg-gray-800 shadow-lg">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-4 sm:px-6 sm:py-5 shadow-md">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex items-center justify-center bg-white/10">
                            <img src="sherlock.png" alt="Sherlock AI" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h1 className="text-lg sm:text-xl font-bold">Sherlock AI</h1>
                            <p className="text-xs sm:text-sm text-white/80">Ask anything</p>
                        </div>
                    </div>
                    {/* Dark mode toggle button */}
                    <button
                        onClick={toggleDarkMode}
                        className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50"
                        aria-label="Toggle dark mode"
                    >
                        {isDarkMode ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd"></path>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Chat messages area */}
            <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto chat-container chat-scrollbar px-4 py-6 sm:px-6 space-y-4"
            >
                {messages.map((message) => (
                    <div
                        key={message.id}
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
                ))}
                {isLoading && (
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
                )}
            </div>

            {/* Image preview area */}
            {uploadedImages.length > 0 && (
                <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Preview:</span>
                        <div className="flex space-x-2 flex-1 overflow-x-auto">
                            {uploadedImages.map((img, index) => (
                                <div key={index} className="relative flex-shrink-0">
                                    <img
                                        src={img.dataUrl}
                                        alt="Preview"
                                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 border-gray-300 dark:border-gray-600"
                                    />
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button
                            onClick={clearPreview}
                            className="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                        >
                            Clear
                        </button>
                    </div>
                </div>
            )}

            {/* Input area */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 pb-safe">
                <div className="px-4 py-3 sm:px-6 sm:py-4">
                    <div className="flex items-start space-x-2 sm:space-x-3">
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div className="flex-1 relative">
                            <textarea
                                ref={textareaRef}
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                rows="1"
                                placeholder="Type your message..."
                                disabled={isInputDisabled}
                                className={`w-full px-4 pt-2.5 pb-2.5 sm:px-5 sm:pt-3 sm:pb-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition-all ${isInputDisabled ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                style={{ maxHeight: '120px', overflowY: 'auto' }}
                            />
                        </div>
                        <button
                            onClick={handleUploadClick}
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
                            onClick={sendMessage}
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
        </div>
    );
}

export default App;

