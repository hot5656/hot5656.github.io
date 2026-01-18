import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import i18n from './i18n/config';  // 🔥 import i18n

// 🔥 確保 i18n 初始化完成
i18n
  .init()
  .then(() => {
    console.log('✅ i18n initialized:', i18n.language);
    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  })
  .catch((err) => {
    console.error('i18n init error:', err);
    createRoot(document.getElementById('root')!).render(<App />);
  });


