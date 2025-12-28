/**
 * HomePage - الصفحة الرئيسية
 * 
 * تعرض جميع المطاعم مع إمكانية البحث والفلترة
 * تستخدم البيانات المحلية من ملف restaurants.js
 */

import React, { useState, useMemo } from 'react';
import restaurants from '../data/restaurants';
import RestaurantCard from '../components/restaurants/RestaurantCard';
import SearchFilter from '../components/restaurants/SearchFilter';
import './HomePage.css';

const HomePage = () => {
    // حالة البحث
    const [searchTerm, setSearchTerm] = useState('');

    // حالة الفلاتر
    const [filters, setFilters] = useState({
        city: '',          // المدينة
        category: '',      // الفئة
        priceRange: '',    // نطاق السعر
        minRating: 0       // الحد الأدنى للتقييم
    });

    /**
     * فلترة المطاعم بناءً على البحث والفلاتر
     * useMemo لتحسين الأداء - يعيد الحساب فقط عند تغيير المدخلات
     */
    const filteredRestaurants = useMemo(() => {
        return restaurants.filter((restaurant) => {
            // فلتر البحث (بحث في الاسم والوصف)
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                const matchesSearch =
                    restaurant.name.toLowerCase().includes(searchLower) ||
                    restaurant.description.toLowerCase().includes(searchLower);
                if (!matchesSearch) return false;
            }

            // فلتر المدينة
            if (filters.city && restaurant.city !== filters.city) {
                return false;
            }

            // فلتر الفئة
            if (filters.category) {
                const hasCategory = restaurant.category.includes(filters.category);
                if (!hasCategory) return false;
            }

            // فلتر نطاق السعر
            if (filters.priceRange && restaurant.priceRange !== filters.priceRange) {
                return false;
            }

            // فلتر التقييم
            if (filters.minRating > 0 && restaurant.rating < filters.minRating) {
                return false;
            }

            return true;
        });
    }, [searchTerm, filters]);

    return (
        <div className="home-page">
            {/* قسم البطل - Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">اكتشف أفضل المطاعم في ليبيا</h1>
                        <p className="hero-subtitle">
                            نقدم لك دليلاً شاملاً لأفضل المطاعم والمقاهي في ليبيا
                        </p>

                        {/* شريط البحث الكبير */}
                        <div className="hero-search">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="ابحث عن مطعم..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="search-button">
                                <span className="search-icon">🔍</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* قسم المحتوى */}
            <section className="content-section">
                <div className="container">
                    {/* الفلاتر */}
                    <SearchFilter filters={filters} onFilterChange={setFilters} />

                    {/* عداد النتائج */}
                    <div className="results-header">
                        <h2>
                            {filteredRestaurants.length === 0
                                ? 'لا توجد نتائج'
                                : `تم العثور على ${filteredRestaurants.length} ${filteredRestaurants.length === 1
                                    ? 'مطعم'
                                    : filteredRestaurants.length === 2
                                        ? 'مطعمان'
                                        : 'مطاعم'
                                }`}
                        </h2>
                    </div>

                    {/* شبكة المطاعم */}
                    {filteredRestaurants.length > 0 ? (
                        <div className="restaurants-grid">
                            {filteredRestaurants.map((restaurant) => (
                                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                            ))}
                        </div>
                    ) : (
                        <div className="no-results">
                            <div className="no-results-icon">🔍</div>
                            <h3>لم نجد أي نتائج</h3>
                            <p>جرب تغيير معايير البحث أو الفلاتر</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
