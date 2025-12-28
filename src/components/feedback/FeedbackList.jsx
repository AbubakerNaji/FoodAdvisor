// FeedbackList.jsx - قائمة التقييمات
// بتعرض كل التقييمات: اللي في ملف البيانات + اللي المستخدمين كتبوها
// مرتبة من الأحدث للأقدم

import React, { useState, useEffect } from 'react';
import { getRestaurantFeedbacks } from '../../utils/feedbackStorage';
import './FeedbackList.css';

const FeedbackList = ({ restaurantId, staticReviews = [] }) => {
    const [userReviews, setUserReviews] = useState([]); // التقييمات اللي المستخدمين كتبوها
    const [allReviews, setAllReviews] = useState([]); // كل التقييمات مع بعض

    // نجيب التقييمات المحفوظة في localStorage
    useEffect(() => {
        const loadedUserReviews = getRestaurantFeedbacks(restaurantId);
        setUserReviews(loadedUserReviews);
    }, [restaurantId]);

    // ندمج التقييمات الأصلية مع تقييمات المستخدمين ونرتبهم من الأحدث للأقدم
    useEffect(() => {
        const combined = [...userReviews, ...staticReviews].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        setAllReviews(combined);
    }, [userReviews, staticReviews]);

    // دالة بترسم النجوم
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<span key={i} className="star filled">⭐</span>);
            } else {
                stars.push(<span key={i} className="star empty">☆</span>);
            }
        }
        return stars;
    };

    // دالة بتحول التاريخ لصيغة عربية قابلة للقراءة
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-LY', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="feedback-list">
            <h3 className="feedback-title">
                <span className="icon">💬</span>
                التقييمات والآراء
                <span className="count">({allReviews.length})</span>
            </h3>

            {/* لو مافيش تقييمات خالص */}
            {allReviews.length === 0 ? (
                <div className="no-reviews">
                    <span className="no-reviews-icon">📝</span>
                    <p>لا توجد تقييمات بعد. كن أول من يقيّم هذا المطعم!</p>
                </div>
            ) : (
                /* نعرض كل التقييمات */
                <div className="reviews-grid">
                    {allReviews.map((review) => (
                        <div
                            key={review.id}
                            className={`review-card ${review.isUserReview ? 'user-review' : ''}`}
                        >
                            <div className="review-header">
                                <div className="reviewer-info">
                                    {/* الصورة الرمزية (أول حرف من الاسم) */}
                                    <div className="reviewer-avatar">
                                        {review.userName.charAt(0)}
                                    </div>
                                    <div className="reviewer-details">
                                        <h4 className="reviewer-name">
                                            {review.userName}
                                            {/* شارة "جديد" للتقييمات اللي المستخدمين ضافوها */}
                                            {review.isUserReview && (
                                                <span className="user-badge">جديد</span>
                                            )}
                                        </h4>
                                        <div className="review-date">
                                            {formatDate(review.date)}
                                        </div>
                                    </div>
                                </div>
                                <div className="review-rating">
                                    <div className="stars">
                                        {renderStars(review.rating)}
                                    </div>
                                    <span className="rating-number">{review.rating}/5</span>
                                </div>
                            </div>
                            {/* التعليق */}
                            <p className="review-comment">{review.comment}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeedbackList;
