import React from "react";
import { useSelector } from "react-redux";

const NavContent = ({ page, toggleCategory }) => {
    const activeCategory = useSelector((state) => state.activeCategory);

    return (
        <div className={`store-content ${page ? 'hidden-element' : ''}`}>

            <ul className="store-content-ul">
                <li
                    onClick={() => toggleCategory('grocery')}
                    className={activeCategory === 'grocery' ? 'active' : ''}
                >
                    Groceries
                </li>
                <li
                    onClick={() => toggleCategory('clothing')}
                    className={activeCategory === 'clothing' ? 'active' : ''}
                >
                    F&F Clothing
                </li>
                <li
                    onClick={() => toggleCategory('clubcard')}
                    className={activeCategory === 'clubcard' ? 'active' : ''}
                >
                    Express Clubcard
                </li>
                <li
                    onClick={() => toggleCategory('bank')}
                    className={activeCategory === 'bank' ? 'active' : ''}
                >
                    Express Bank
                </li>
                <li
                    onClick={() => toggleCategory('mobile')}
                    className={activeCategory === 'mobile' ? 'active' : ''}
                >
                    Express Mobile
                </li>
                <li
                    onClick={() => toggleCategory('recipe')}
                    className={activeCategory === 'recipe' ? 'active' : ''}
                >
                    Recipes
                </li>
            </ul>
        </div>
    );
};

export default NavContent;
