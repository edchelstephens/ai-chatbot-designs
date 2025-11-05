// React is loaded via CDN, so it's available globally
const { createRoot } = ReactDOM;

// Import App component (will be loaded from App.jsx)
// This file serves as the entry point for the React application

// Initialize and render the App component when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and load App.jsx
    fetch('App.jsx')
        .then(response => response.text())
        .then(jsxCode => {
            // Transform JSX to JavaScript using Babel
            const transformedCode = Babel.transform(jsxCode, {
                presets: ['react']
            }).code;

            // Execute the transformed code to define App component
            eval(transformedCode);

            // Render the App component
            const rootElement = document.getElementById('root');
            if (rootElement) {
                const root = createRoot(rootElement);
                root.render(React.createElement(App));
            } else {
                console.error('Root element not found');
            }
        })
        .catch(error => {
            console.error('Error loading App.jsx:', error);
            const rootElement = document.getElementById('root');
            if (rootElement) {
                rootElement.innerHTML = '<div class="p-4 text-red-500">Error loading application. Please check the console.</div>';
            }
        });
});
