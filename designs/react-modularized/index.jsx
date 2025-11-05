// React is loaded via CDN, so it's available globally
const { createRoot } = ReactDOM;

// Load all component files in order, then App.jsx
// This file serves as the entry point for the React application

// Initialize and render the App component when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Define component files to load in order
    const componentFiles = [
        'components/ChatHeader.jsx',
        'components/MessageBubble.jsx',
        'components/LoadingIndicator.jsx',
        'components/ChatMessages.jsx',
        'components/ImagePreview.jsx',
        'components/ChatInput.jsx',
        'App.jsx'
    ];

    // Load all files sequentially
    const loadFile = (index) => {
        if (index >= componentFiles.length) {
            // All files loaded, render the App component
            const rootElement = document.getElementById('root');
            if (rootElement) {
                const root = createRoot(rootElement);
                root.render(React.createElement(App));
            } else {
                console.error('Root element not found');
            }
            return;
        }

        const file = componentFiles[index];
        fetch(file)
            .then(response => response.text())
            .then(jsxCode => {
                // Transform JSX to JavaScript using Babel
                const transformedCode = Babel.transform(jsxCode, {
                    presets: ['react']
                }).code;

                // Execute the transformed code
                eval(transformedCode);

                // Load next file
                loadFile(index + 1);
            })
            .catch(error => {
                console.error(`Error loading ${file}:`, error);
                const rootElement = document.getElementById('root');
                if (rootElement) {
                    rootElement.innerHTML = `<div class="p-4 text-red-500">Error loading ${file}. Please check the console.</div>`;
                }
            });
    };

    // Start loading from the first file
    loadFile(0);
});
