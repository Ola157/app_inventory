import React from "react";
import CategoryList from "./Navcategory";
import { IoCloseSharp } from "react-icons/io5";


const Navmenu = ({ activeCategory, toggleCategory, navBtn }) => {


    const multiFunc = () => {
        if (window.innerWidth > 830) {
            toggleCategory(null)
        } else {
            navBtn('menu')
        }
    }

    return (
        <div>
            <span className="close-span">
                <button onClick={() => multiFunc()}>
                    Close <span><IoCloseSharp size={20} /></span>
                </button>
            </span>

            <CategoryList category="grocery" activeCategory={activeCategory} toggleCategory={toggleCategory} />
            <CategoryList category="clothing" activeCategory={activeCategory} toggleCategory={toggleCategory} />
            <CategoryList category="clubcard" activeCategory={activeCategory} toggleCategory={toggleCategory} />
            <CategoryList category="bank" activeCategory={activeCategory} toggleCategory={toggleCategory} />
            <CategoryList category="mobile" activeCategory={activeCategory} toggleCategory={toggleCategory} />
            <CategoryList category="recipe" activeCategory={activeCategory} toggleCategory={toggleCategory} />
        </div >
    );
};
export default Navmenu;
