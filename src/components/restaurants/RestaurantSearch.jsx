// RestaurantSearch.jsx - شريط البحث
// بيسمح للمستخدم إنه يكتب اسم مطعم أو نوع أكل ويدور عليه

import React from 'react';
import './RestaurantSearch.css';

const RestaurantSearch = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="search- container">
            <div className="search-wrapper">
                {/* أيقونة البحث 🔍 */}
                <span className="search-icon">🔍</span>

                {/* خانة الكتابة - كل ما المستخدم يكتب حاجة بتتنفذ onSearchChange */}
                <input
                    type="text"
                    className="search-input"
                    placeholder="ابحث عن المطاعم بالاسم أو نوع الطعام..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />

                {/* زر المسح ✕ - بيظهر بس لما يكون فيه نص في البحث */}
                {searchTerm && (
                    <button
                        className="search-clear"
                        onClick={() => onSearchChange('')}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default RestaurantSearch;
