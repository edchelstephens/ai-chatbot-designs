// React is loaded via CDN, so it's available globally
const { useState, useEffect, useRef } = React;

// Container component - handles all state management and business logic
function App() {
    // State management
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

    // Refs
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

    const handleMessageChange = (e) => {
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

export default App;

