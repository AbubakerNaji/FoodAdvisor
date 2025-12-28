// Footer.jsx - الفوتر (آخر الصفحة)
// فيه معلومات عن الموقع وشوية روابط

import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* معلومات عن الموقع */}
                    <div className="footer-section">
                        <h4>FoodAdvisor</h4>
                        <p className="text-muted">
                            دليلك لأفضل المطاعم في ليبيا
                        </p>
                    </div>

                    {/* روابط سريعة عشان المستخدم يتنقل بسرعة */}
                    <div className="footer-section">
                        <h5>روابط سريعة</h5>
                        <ul className="footer-links">
                            <li><a href="/">الرئيسية</a></li>
                            <li><a href="/">المطاعم</a></li>
                            <li><a href="/">حول</a></li>
                        </ul>
                    </div>

                    {/* روابط التواصل الاجتماعي */}
                    <div className="footer-section">
                        <h5>تواصل معنا</h5>
                        <ul className="footer-links">
                            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">فيسبوك</a></li>
                            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">إنستجرام</a></li>
                            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">تويتر</a></li>
                        </ul>
                    </div>
                </div>

                {/* نص حقوق النشر */}
                <div className="footer-bottom">
                    <p>© 2025 FoodAdvisor. جميع الحقوق محفوظة.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
