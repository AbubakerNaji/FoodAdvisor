// App.jsx - الملف الرئيسي للتطبيق
// هنا بنبني هيكل التطبيق الأساسي: الهيدر، الصفحات، والفوتر
// كمان فيه نظام الوضع المظلم (Dark Mode)

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';
import './App.css';

function App() {
    // بنستخدم Dark Mode من localStorage عشان لو المستخدم رجع للموقع يلاقي نفس الإعدادات
    // لو مافيش حاجة محفوظة، بنخليه Light Mode افتراضياً
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    // كل ما المستخدم يغير بين Light و Dark Mode:
    // 1. بنحفظ الاختيار الجديد في localStorage عشان يفضل محفوظ
    // 2. بنضيف أو نشيل class من body عشان التنسيق يتغير
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));

        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    // دالة بسيطة عشان نبدل بين الوضعين لما المستخدم يدوس على الزر
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Router>
            <div className="app">
                {/* الهيدر فيه اللوجو والعنوان وزر تبديل الوضع المظلم */}
                <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

                {/* المحتوى الرئيسي - هنا بتظهر الصفحات المختلفة */}
                <main className="main-content">
                    <Routes>
                        {/* الصفحة الرئيسية - فيها كل المطاعم مع البحث والفلاتر */}
                        <Route path="/" element={<HomePage />} />

                        {/* صفحة تفاصيل المطعم - بتفتح لما ت click على أي مطعم */}
                        <Route path="/restaurant/:id" element={<RestaurantPage />} />
                    </Routes>
                </main>

                {/* الفوتر في آخر الصفحة */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
