// SearchFilter.jsx - فلاتر البحث
// بيسمح للمستخدم يفلتر المطاعم حسب المدينة، النوع، السعر، والتقييم

import React from 'react';
import './SearchFilter.css';

const SearchFilter = ({ filters, onFilterChange }) => {
    // قائمة كل الفئات المتاحة (أنواع الأكل)
    // مرتبة أبجدياً عشان تكون سهلة في البحث
    const categories = [
        'باستا',
        'بيتزا',
        'حلويات',
        'ساندويتش',
        'شوكولاتة',
        'عصائر',
        'كبدة',
        'لحوم مدخنة',
        'مأكولات بحرية',
        'مأكولات شرقية',
        'مشاوي',
        'مشروبات',
        'مطعم إيطالي',
        'مطعم إيطالي/وجبات سريعة',
        'مطعم شعبي',
        'مطعم فاخر',
        'مطعم لبناني',
        'مقهى',
        'وجبات سريعة',
        'وجبات شعبية'
    ];

    // قائمة المدن المتاحة
    const cities = ['طرابلس', 'بنغازي', 'مصراتة', 'زليتن'];

    // نطاقات الأسعار من رخيص لفاخر
    const priceRanges = ['رخيص', 'متوسط', 'مرتفع', 'فاخر'];

    // خيارات التقييم
    const ratings = [
        { value: 4, label: '4 نجوم وأكثر' },
        { value: 3, label: '3 نجوم وأكثر' },
        { value: 2, label: '2 نجمة وأكثر' },
        { value: 0, label: 'جميع التقييمات' }
    ];

    // دالة بتنفذ لما المستخدم يغير أي فلتر
    // بتاخد نوع الفلتر والقيمة الجديدة وتبعتهم للمكون الأب
    const handleFilterChange = (filterType, value) => {
        onFilterChange({ ...filters, [filterType]: value });
    };

    // دالة بتمسح كل الفلاتر وترجع للإعدادات الافتراضية
    const clearFilters = () => {
        onFilterChange({
            city: '',
            category: '',
            priceRange: '',
            minRating: 0
        });
    };

    return (
        <div className="search-filter">
            <div className="filter-header">
                <h3>🔍 تصفية النتائج</h3>
                {/* زر "مسح الكل" بيرجع كل الفلاتر للافتراضي */}
                <button className="btn-clear" onClick={clearFilters}>
                    مسح الكل
                </button>
            </div>

            <div className="filters-grid">
                {/* فلتر المدينة */}
                <div className="filter-item">
                    <label className="filter-label">المدينة</label>
                    <select
                        className="filter-select"
                        value={filters.city || ''}
                        onChange={(e) => handleFilterChange('city', e.target.value)}
                    >
                        <option value="">جميع المدن</option>
                        {cities.map((city) => (
                            <option key={city} value={city}>
                                {city}
                            </option>
                        ))}
                    </select>
                </div>

                {/* فلتر الفئة (نوع الأكل) */}
                <div className="filter-item">
                    <label className="filter-label">الفئة</label>
                    <select
                        className="filter-select"
                        value={filters.category || ''}
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                        <option value="">جميع الفئات</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* فلتر نطاق السعر */}
                <div className="filter-item">
                    <label className="filter-label">نطاق السعر</label>
                    <select
                        className="filter-select"
                        value={filters.priceRange || ''}
                        onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                    >
                        <option value="">جميع الأسعار</option>
                        {priceRanges.map((range) => (
                            <option key={range} value={range}>
                                {range}
                            </option>
                        ))}
                    </select>
                </div>

                {/* فلتر التقييم */}
                <div className="filter-item">
                    <label className="filter-label">التقييم</label>
                    <select
                        className="filter-select"
                        value={filters.minRating || 0}
                        onChange={(e) =>
                            handleFilterChange('minRating', Number(e.target.value))
                        }
                    >
                        {ratings.map((rating) => (
                            <option key={rating.value} value={rating.value}>
                                {rating.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
