import React from 'react';
import ReactDOM from 'react-dom/client';
import { LanguageProvider } from './context/LanguageContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

const queryClient = new QueryClient();

document.documentElement.setAttribute('data-theme', 'dark');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
