// src/widget.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChatWidget } from '@/components/custom/chatwidget';
import './index.css';

const widgetContainer = document.getElementById('chat-widget');
if (widgetContainer) {
  createRoot(widgetContainer).render(
    <StrictMode>
      <ChatWidget />
    </StrictMode>
  );
} else {
  console.error("Chat widget container not found. Please add <div id='chat-widget'></div> to your HTML.");
}