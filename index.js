import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App';

const root = createRoot(document.getElementById('root')); // Use createRoot from 'react-dom/client'
root.render(<App />);
