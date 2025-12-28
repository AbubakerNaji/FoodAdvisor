
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import restaurants from '../data/restaurants';
import FeedbackList from '../components/feedback/FeedbackList';
import FeedbackForm from '../components/feedback/FeedbackForm';
import ThankYouMessage from '../components/feedback/ThankYouMessage';
import { saveRestaurantFeedback } from '../utils/feedbackStorage';
import './RestaurantPage.css';

const RestaurantPage = () => {
  const { id } = useParams(); // جلب معرّف المطعم من الرابط
  const navigate = useNavigate();

  const [showThankYou, setShowThankYou] = useState(false);
  const [feedbackKey, setFeedbackKey] = useState(0); // To force FeedbackList re-render


  const restaurant = restaurants.find(r => r.id === parseInt(id));

  // دائماً نبدأ الصفحة من الأعلى عند فتح صفحة المطعم
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]); // كل ما المستخدم يفتح مطعم جديد، الصفحة ترجع للأعلى

  /**
   * رسم النجوم بناءً على التقييم
   */
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star">⭐</span>);
    }

    if (hasHalfStar && fullStars < 5) {
      stars.push(<span key="half" className="star">⭐</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star-empty">☆</span>);
    }

    return stars;
  };

  /**
   * فتح الموقع في Google Maps
   */
  const openGoogleMaps = () => {
    if (restaurant?.googleMapsLink) {
      window.open(restaurant.googleMapsLink, '_blank');
    }
  };

  /**
   * Handle feedback form submission
   */
  const handleFeedbackSubmit = (feedbackData) => {
    const success = saveRestaurantFeedback(parseInt(id), feedbackData);

    if (success) {
      // Show thank you message
      setShowThankYou(true);

      // Force FeedbackList to re-render by updating key
      setFeedbackKey(prev => prev + 1);
    } else {
      alert('حدث خطأ أثناء حفظ التقييم. يرجى المحاولة مرة أخرى.');
    }
  };

  // المطعم غير موجود
  if (!restaurant) {
    return (
      <div className="page-error">
        <h2>المطعم غير موجود</h2>
        <button className="btn btn-primary" onClick={() => navigate('/')}>
          العودة للصفحة الرئيسية
        </button>
      </div>
    );
  }

  return (
    <div className="restaurant-page">
      {/* الصورة الكبيرة في الأعلى */}
      <div
        className="restaurant-hero"
        style={{ backgroundImage: `url(${restaurant.image})` }}
      >
        <div className="hero-overlay"></div>
        {/* زر العودة */}
        <button className="back-button" onClick={() => navigate('/')}>
          ← العودة
        </button>
      </div>

      {/* المحتوى */}
      <div className="container">
        <div className="restaurant-content">
          {/* معلومات المطعم */}
          <div className="restaurant-info-card">
            {/* الاسم والتقييم */}
            <div className="restaurant-header">
              <h1 className="restaurant-name">{restaurant.name}</h1>
              <div className="restaurant-rating">
                <div className="stars-large">
                  {renderStars(restaurant.rating)}
                </div>
                <span className="rating-number-large">
                  {restaurant.rating.toFixed(1)} / 5.0
                </span>
              </div>
            </div>

            {/* التفاصيل */}
            <div className="details-grid">
              {/* الفئة */}
              <div className="detail-item">
                <div className="detail-icon">🍽️</div>
                <div>
                  <div className="detail-label">الفئة</div>
                  <div className="detail-value">
                    {Array.isArray(restaurant.category)
                      ? restaurant.category.join(', ')
                      : restaurant.category}
                  </div>
                </div>
              </div>

              {/* نطاق السعر */}
              <div className="detail-item">
                <div className="detail-icon">💰</div>
                <div>
                  <div className="detail-label">نطاق السعر</div>
                  <div className="detail-value">{restaurant.priceRange}</div>
                </div>
              </div>

              {/* المدينة */}
              <div className="detail-item">
                <div className="detail-icon">📍</div>
                <div>
                  <div className="detail-label">المدينة</div>
                  <div className="detail-value">{restaurant.city}</div>
                </div>
              </div>

              {/* العنوان */}
              <div className="detail-item">
                <div className="detail-icon">🗺️</div>
                <div>
                  <div className="detail-label">العنوان</div>
                  <div className="detail-value">{restaurant.address}</div>
                </div>
              </div>
            </div>

            {/* ساعات العمل */}
            <div className="working-hours">
              <h3>ساعات العمل</h3>
              <div className="hours-grid">
                <div className="hours-item">
                  <span className="hours-label">أيام الأسبوع:</span>
                  <span className="hours-value">{restaurant.workingHours.weekdays}</span>
                </div>
                <div className="hours-item">
                  <span className="hours-label">عطلة نهاية الأسبوع:</span>
                  <span className="hours-value">{restaurant.workingHours.weekend}</span>
                </div>
              </div>
            </div>

            {/* الوصف */}
            <div className="description-section">
              <h3>عن المطعم</h3>
              <p className="description-text">{restaurant.description}</p>
            </div>

            {/* زر Google Maps */}
            {restaurant.googleMapsLink && (
              <div className="maps-section">
                <button
                  className="btn btn-maps"
                  onClick={openGoogleMaps}
                >
                  <span className="maps-icon">🗺️</span>
                  عرض الموقع على الخريطة
                </button>
              </div>
            )}

            {/* Feedback Section */}
            <div className="feedback-section">
              {/* Display all reviews (static + user reviews) */}
              <FeedbackList
                key={feedbackKey}
                restaurantId={parseInt(id)}
                staticReviews={restaurant.reviews || []}
              />

              {/* Feedback form for users */}
              <FeedbackForm
                restaurantId={parseInt(id)}
                onSubmitSuccess={handleFeedbackSubmit}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Thank You Message Overlay */}
      <ThankYouMessage
        show={showThankYou}
        onClose={() => setShowThankYou(false)}
      />
    </div>
  );
};

export default RestaurantPage;
