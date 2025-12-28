// ThankYouMessage.jsx - رسالة الشكر
// رسالة جميلة بتظهر بعد ما المستخدم يرسل تقييمه
// بتختفي تلقائياً بعد 3 ثواني

import React, { useEffect } from 'react';
import './ThankYouMessage.css';

const ThankYouMessage = ({ show, onClose }) => {
    // بعد 3 ثواني، نخفي الرسالة تلقائياً
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                if (onClose) {
                    onClose();
                }
            }, 3000);

            // لو المكون اتشال قبل ما ال 3 ثواني يخلصوا، نلغي التايمر
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    // لو الرسالة مش مفترض تظهر، منعرضش حاجة
    if (!show) return null;

    return (
        // الخلفية - لو المستخدم ضغط عليها بتقفل الرسالة
        <div className="thank-you-overlay" onClick={onClose}>
            {/* الكارد - لو ضغط عليه ميقفلش (عشان يقدر يقرا) */}
            <div className="thank-you-card" onClick={(e) => e.stopPropagation()}>
                {/* أيقونة علامة الصح ✓ */}
                <div className="success-icon">
                    <div className="checkmark-circle">
                        <div className="checkmark">✓</div>
                    </div>
                </div>
                <h2 className="thank-you-title">شكراً لك على تقييمك!</h2>
                <p className="thank-you-message">رأيك يهمنا كثيراً</p>
                <div className="thank-you-emoji">🌟</div>
            </div>
        </div>
    );
};

export default ThankYouMessage;
