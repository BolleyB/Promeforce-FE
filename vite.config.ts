// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  const isWidget = mode === 'widget'; // Only need mode for widget check

  return {
    plugins: [react()],
    server: {
      port: 8501,
      watch: {
        usePolling: false,
        interval: 1000,
      },
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    build: isWidget ? {
      // Widget build configuration
      lib: {
        entry: resolve(__dirname, 'src/main.tsx'),
        name: 'ChatWidget',
        fileName: (format) => `chat-widget.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          // Inject widget-specific styles and div
          intro: `
            const style = document.createElement('style');
            style.textContent = \`
              .chat-widget-container {
                position: fixed;
                bottom: 16px;
                right: 16px;
                width: 384px;
                height: 80vh;
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
                z-index: 50;
                overflow: hidden;
                display: flex;
                flex-direction: column;
              }
              .chat-toggle-button {
                position: fixed;
                bottom: 16px;
                right: 16px;
                padding: 8px;
                border-radius: 9999px;
                background-color: #2563eb;
                color: white;
                z-index: 50;
              }
              .chat-toggle-button:hover {
                background-color: #1d4ed8;
              }
            \`;
            document.head.appendChild(style);
            if (!document.getElementById('chat-widget')) {
              const div = document.createElement('div');
              div.id = 'chat-widget';
              document.body.appendChild(div);
            }
          `,
        },
      },
      outDir: 'dist/widget',
      sourcemap: true,
    } : {
      // Full app build configuration
      outDir: 'dist/app',
      sourcemap: true,
    },
  };
});