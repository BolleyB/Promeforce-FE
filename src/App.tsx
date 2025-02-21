// src/App.tsx
import './App.css';
import { Chat } from './pages/chat/chat';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Adjust path if needed
import { MessageCircle } from 'lucide-react';

function App() {
  const [showWidget, setShowWidget] = useState<boolean>(false); // Toggle for local widget testing

  return (
    <ThemeProvider>
      <Router>
        <div className="w-full h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative">
          <Routes>
            <Route
              path="/"
              element={
                !showWidget ? (
                  <Chat />
                ) : (
                  <div
                    className="fixed bottom-16 right-4 w-96 h-[80vh] bg-background border rounded-lg shadow-lg z-50 overflow-hidden flex flex-col"
                  >
                    <Chat />
                  </div>
                )
              }
            />
          </Routes>

          {/* Floating Toggle Button for Testing Widget Locally */}
          <Button
            onClick={() => setShowWidget(prev => !prev)}
            className="fixed bottom-4 right-4 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 z-50"
          >
            <MessageCircle size={24} />
          </Button>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;