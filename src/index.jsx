// index.jsx - نقطة البداية للتطبيق
// ملف بسيط بيشغل React ويربطه بـ HTML

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// هنا بنمسك الـ div اللي id بتاعه "root" في ملف index.html
// وبنشغل فيه كل التطبيق بتاعنا
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
