// RestaurantCard.jsx - كارت عرض المطعم
// بيعرض صورة المطعم واسمه وتقييمه بشكل جميل
// لما تضغط عليه بيودّيك لصفحة تفاصيل المطعم

import React from 'react';
import { Link } from 'react-router-dom';
import './RestaurantCard.css';

const RestaurantCard = ({ restaurant }) => {
    // دالة بترسم النجوم حسب التقييم
    // مثلاً لو التقييم 4.5 هترسم 4 نجوم ممتلئة ونصف نجمة ونصف نجمة فاضية
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating); // النجوم الكاملة (مثلاً 4 من 4.5)
        const hasHalfStar = rating % 1 >= 0.5; // فيه نصف نجمة ولا لأ؟

        // نرسم النجوم الممتلئة ⭐
        for (let i = 0; i < fullStars; i++) {
            stars.push(<span key={`full-${i}`} className="star full">⭐</span>);
        }

        // لو فيه نصف نجمة بنرسمها
        if (hasHalfStar && fullStars < 5) {
            stars.push(<span key="half" className="star half">⭐</span>);
        }

        // نكمل بالنجوم الفاضية ☆
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
        }

        return stars;
    };

    // دالة بتحول الفئات من array لنص
    // مثلاً ["بيتزا", "ايطالي"] يبقوا "بيتزا, ايطالي"
    const getCategoryText = () => {
        if (Array.isArray(restaurant.category)) {
            return restaurant.category.join(', ');
        }
        return restaurant.category;
    };

    return (
        // الكارت كله عبارة عن لينك، لما تضغط في أي مكان بيودّيك لصفحة المطعم
        <Link to={`/restaurant/${restaurant.id}`} className="restaurant-card-link">
            <article className="restaurant-card">
                {/* صورة المطعم */}
                <div className="restaurant-image">
                    <img
                        src={restaurant.image}
                        alt={restaurant.name}
                        loading="lazy"
                    />
                    <div className="image-overlay"></div>
                </div>

                {/* معلومات المطعم */}
                <div className="restaurant-content">
                    {/* اسم المطعم */}
                    <p className="restaurant-name">{restaurant.name}</p>

                    {/* التقييم بالنجوم والرقم */}
                    <div className="restaurant-rating">
                        <div className="stars">
                            {renderStars(restaurant.rating)}
                        </div>
                        <span className="rating-number">{restaurant.rating.toFixed(1)}</span>
                    </div>

                    {/* الفئة ونطاق السعر (مثلاً: بيتزا • متوسط) */}
                    <div className="restaurant-meta">
                        <span className="category">{getCategoryText()}</span>
                        <span className="separator">•</span>
                        <span className="price">{restaurant.priceRange}</span>
                    </div>

                    {/* المدينة 📍 */}
                    <div className="restaurant-city">
                        <span className="city-icon">📍</span>
                        <span>{restaurant.city}</span>
                    </div>
                </div>
            </article>
        </Link>
    );
};

export default RestaurantCard;
