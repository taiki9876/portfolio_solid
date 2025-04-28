import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ClientApp } from './ClientApp.tsx';

// Native アプリ用のエントリーポイント
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ClientApp />
    </StrictMode>
);
