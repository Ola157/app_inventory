import React from "react";
import { useSelector } from "react-redux";
import useCategory from "../custom-hooks/use-category";
import { GiHamburgerMenu } from "react-icons/gi";

const NavContent = ({ page }) => {
    const activeCategory = useSelector((state) => state.activeCategory);
    const storeNavMenu = useSelector(state => state.storeNavMenu)
    const isMenu = useSelector(state => state.isMenu)

    const [handleToggleCategory, toggleDepartment, toggleInnerDepartment, handleNavBtn] = useCategory()

    return (
        <div className={`store-content`}>
            <div className="store-content-div">
                <ul className="store-content-ul">

                    {storeNavMenu && storeNavMenu.map((menu, index) => (
                        <li
                            key={index}
                            onClick={() => handleToggleCategory(menu.category)}
                            className={activeCategory === menu.category ? 'active' : ''}
                        >
                            {menu.name}
                        </li>))}

                </ul>
            </div>


        </div >
    );
};

export default NavContent;
