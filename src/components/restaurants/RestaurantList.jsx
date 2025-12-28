// RestaurantList.jsx - قائمة المطاعم
// بيعرض كل المطاعم في شكل grid من الكروت
// أو بيعرض رسالة لو مافيش نتائج

import React from 'react';
import RestaurantCard from './RestaurantCard';
import './RestaurantList.css';

const RestaurantList = ({ restaurants, loading, error }) => {
    // لو لسه بيحمل البيانات، نعرض شاشة تحميل
    if (loading) {
        return (
            <div className="restaurant-list-loading">
                <div className="spinner"></div>
                <p>جارٍ البحث عن مطاعم رائعة...</p>
            </div>
        );
    }

    // لو حصل error في جلب البيانات، نعرض رسالة خطأ
    if (error) {
        return (
            <div className="restaurant-list-error">
                <p>⚠️ {error}</p>
            </div>
        );
    }

    // لو البحث أو الفلترة مالقتش أي مطاعم، نعرض رسالة "مافيش نتائج"
    if (restaurants.length === 0) {
        return (
            <div className="restaurant-list-empty">
                <span className="empty-icon">🍽️</span>
                <h3>مافيش مطاعم تطابق البحث</h3>
                <p>جرب تبحث بكلمات تانية أو غيّر الفلاتر</p>
            </div>
        );
    }

    // لو كل حاجة تمام، نعرض كروت المطاعم في grid
    return (
        <div className="restaurant-list">
            {restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
        </div>
    );
};

export default RestaurantList;
