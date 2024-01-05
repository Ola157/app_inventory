import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";


const CategoryList = ({ category, activeCategory, toggleCategory }) => {

    const categories = {
        grocery: [
            "Shop groceries",
            "Shop homeware",
            "My account",
            "Delivery saver",
            "Inspiration and events",
            "Favourites",
        ],
        clothing: [
            "Browse F&F clothing",
            "Browse women clothing",
            "Browse school uniform",
            "Browse men clothing",
            "Browse kids clothing",
        ],
        clubcard: [
            "Browse Clubcard",
            "Clubcard plus",
            "Join Clubcard",
            "About Clubcard",
            "Collect points",
            "Spend vouchers",
        ],
        bank: [
            "Browse Express bank",
            "Clubcard pay+",
            "Credit cards",
            "Loans",
            "Savings",
            "Car insurance",
        ],
        mobile: [
            "Shop all mobile",
            "Pay monthly phones",
            "SIM only contracts",
            "Pay as you go phones",
            "Pay as you go SIMs",
            "SIM free phones",
        ],
        recipe: [
            "Recipe inspiration",
            "Under 30 minute meals",
            "Healthy recipes",
            "Budget meals",
            "Baking",
            "Food Love Stories",
        ],
    };

    return (
        <ul className={activeCategory === category ? 'active' : ''}>
            <li className="d-flex justify-content-start p-0 px-1 py-1 d-block d-md-none">
                <button onClick={() => toggleCategory(null)}>
                    <span className="me-1"><MdArrowBackIosNew size={20} /></span>   Back
                </button>
            </li>
            {categories[category].map((item, index) => (
                <li key={index}><a>{item}</a></li>
            ))}
        </ul>
    );
};

export default CategoryList