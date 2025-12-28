// Header.jsx - الهيدر (الجزء العلوي من الصفحة)
// فيه اللوجو وزر Dark Mode

import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* اللوجو - لما تضغط عليه بيرجعك للصفحة الرئيسية */}
                    <Link to="/" className="logo">
                        <span className="logo-icon">🍽️</span>
                        <span className="logo-text">FoodAdvisor</span>
                    </Link>

                    {/* البتن بيغير بين Light Mode و Dark Mode
                        لو الوضع المظلم شغال بنعرض شمس ☀️ 
                        ولو مش شغال بنعرض قمر 🌙 */}
                    <button
                        className="dark-mode-toggle"
                        onClick={toggleDarkMode}
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? '☀️' : '🌙'}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
