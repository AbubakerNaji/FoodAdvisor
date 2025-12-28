// FeedbackForm.jsx - نموذج إضافة تقييم
// بيسمح للمستخدم يكتب تقييمه ويختار عدد النجوم ويكتب comment

import React, { useState } from 'react';
import './FeedbackForm.css';

const FeedbackForm = ({ restaurantId, onSubmitSuccess }) => {
    // بيانات النموذج: الاسم، التقييم، والتعليق
    const [formData, setFormData] = useState({
        userName: '',
        rating: 0,
        comment: ''
    });

    // عشان نعرف المستخدم واقف على كام نجمة (للتفاعل)
    const [hoveredRating, setHoveredRating] = useState(0);

    // دالة بتنفذ لما المستخدم يكتب في أي خانة
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // دالة بتنفذ لما المستخدم يختار عدد النجوم
    const handleRatingClick = (rating) => {
        setFormData(prev => ({
            ...prev,
            rating: rating
        }));
    };

    // دالة إرسال النموذج
    const handleSubmit = (e) => {
        e.preventDefault();

        // نتأكد إن كل الحقول متملية
        if (!formData.userName.trim() || formData.rating === 0 || !formData.comment.trim()) {
            alert('الرجاء ملء جميع الحقول');
            return;
        }

        // نبعت البيانات للمكون الأب (RestaurantPage)
        if (onSubmitSuccess) {
            onSubmitSuccess(formData);
        }

        // نمسح النموذج بعد الإرسال
        setFormData({
            userName: '',
            rating: 0,
            comment: ''
        });
        setHoveredRating(0);
    };

    // دالة بترسم النجوم التفاعلية (اللي المستخdم بيختار منها)
    // لو المستخدم حوّم على نجمة، بتتلون، ولو click بتتحفظ
    const renderStarSelector = () => {
        const stars = [];
        const displayRating = hoveredRating || formData.rating; // نعرض اللي واقف عليه أو اللي مختاره

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <button
                    key={i}
                    type="button"
                    className={`star-btn ${i <= displayRating ? 'active' : ''}`}
                    onClick={() => handleRatingClick(i)}
                    onMouseEnter={() => setHoveredRating(i)}
                    onMouseLeave={() => setHoveredRating(0)}
                    aria-label={`${i} نجوم`}
                >
                    ⭐
                </button>
            );
        }
        return stars;
    };

    return (
        <div className="feedback-form-container">
            <h3 className="form-title">
                <span className="icon">✍️</span>
                أضف تقييمك
            </h3>
            <form className="feedback-form" onSubmit={handleSubmit}>
                {/* خانة الاسم */}
                <div className="form-group">
                    <label htmlFor="userName">الاسم</label>
                    <input
                        type="text"
                        id="userName"
                        name="userName"
                        value={formData.userName}
                        onChange={handleChange}
                        placeholder="أدخل اسمك"
                        required
                        maxLength="50"
                    />
                </div>

                {/* اختيار عدد النجوم */}
                <div className="form-group">
                    <label>التقييم</label>
                    <div className="star-selector">
                        {renderStarSelector()}
                        {formData.rating > 0 && (
                            <span className="rating-text">
                                {formData.rating} من 5
                            </span>
                        )}
                    </div>
                    <input
                        type="hidden"
                        name="rating"
                        value={formData.rating}
                        required
                    />
                </div>

                {/* خانة التعليق */}
                <div className="form-group">
                    <label htmlFor="comment">التعليق</label>
                    <textarea
                        id="comment"
                        name="comment"
                        value={formData.comment}
                        onChange={handleChange}
                        placeholder="شاركنا تجربتك في هذا المطعم..."
                        required
                        rows="4"
                        maxLength="500"
                    />
                    {/* عداد الحروف عشان المستخدم يعرف كم باقي له */}
                    <div className="char-count">
                        {formData.comment.length} / 500
                    </div>
                </div>

                {/* زر الإرسال */}
                <button type="submit" className="submit-btn">
                    <span className="btn-icon">📤</span>
                    إرسال التقييم
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
