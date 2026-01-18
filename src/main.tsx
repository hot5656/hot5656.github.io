import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import i18n + i18n.init()：確保 react-i18next 有完整 i18n
import i18n from './i18n/config';  // 🔥 import default i18n

// 🔥 等待 i18n 初始化完成再 render
i18n.init().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}).catch((err) => {
  console.error('i18n init failed:', err);
  // fallback render
  createRoot(document.getElementById('root')!).render(<App />);
});

