// Presentation component for the chat messages container
function ChatMessages({ messages, isLoading, chatContainerRef }) {
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

