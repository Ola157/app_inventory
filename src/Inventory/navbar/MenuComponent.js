import React from "react";
import { useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { GiCompass } from "react-icons/gi";
import { MdArrowForwardIos } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import Navmenu from "./Navmenu";
import { SlLocationPin } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import useNavigator from "../custom-hooks/use-Navigation";
import useCategory from "../custom-hooks/use-category";

const MenuComponent = ({ page }) => {

    const isMenu = useSelector(state => state.isMenu)
    const isSearch = useSelector(state => state.isSearch)
    const isStore = useSelector(state => state.isStore)
    const activeCategory = useSelector(state => state.activeCategory)
    const [handleNavigation] = useNavigator()
    const [handleToggleCategory, toggleDepartment, toggleInnerDepartment, handleNavBtn] = useCategory()

    return (
        <div className="menu-container">
            <div className={`menu-component ${isMenu ? 'active' : ''}`}>
                <div className={`menu-content`}>
                    <ul className="menu-content-ul">
                        <div className={`responding-li ${activeCategory ? 'slidediv' : ''}`}>
                            <li className="d-flex justify-content-end py-1">
                                <button onClick={() => handleNavBtn('menu')}>
                                    Close <span><IoCloseSharp size={20} /></span>
                                </button>
                            </li>
                            <li onClick={!page ? () => handleToggleCategory('grocery') : () => handleNavigation('/')}>
                                {!page ? <><span>Groceries</span> <span></span><MdArrowForwardIos size={20} /></> : 'Express.com'}</li>

                            <li onClick={() => handleToggleCategory(!page && 'clothing')}>{!page ? <><span>F&F Clothing</span> <span></span><MdArrowForwardIos size={20} /></> : 'Contact us'}</li>
                            <li onClick={() => handleToggleCategory(!page && 'clubcard')}>{!page ? <><span>Express Clubcard</span> <span></span><MdArrowForwardIos size={20} /></> : 'Help'}</li>
                            <li onClick={() => handleToggleCategory(!page && 'bank')}>{!page ? <><span>Express Bank</span> <span></span><MdArrowForwardIos size={20} /></> : 'Feedback'}</li>
                            <li onClick={() => handleToggleCategory('mobile')}><span>Express Mobile</span> <span><MdArrowForwardIos size={20} /></span></li>
                            <li onClick={() => handleToggleCategory('recipe')}><span>Recipes</span> <span><MdArrowForwardIos size={20} /></span></li>
                        </div>

                        <div className={`innerrespondingdiv ${activeCategory ? 'slidediv' : page ? 'hidden-element' : ''}`}>
                            <li>
                                <Navmenu
                                />
                            </li>
                        </div>

                        <div className={`bg-li ${activeCategory ? 'changePosition' : page ? 'hidden-element' : ''}`}>
                            <li onClick={() => handleNavigation('/signIn/landing/*')}>Sign in</li>
                            <li><span>Store locator</span> <span><SlLocationPin size={20} /></span></li>
                            <li>Contact us</li>
                            <li>Help</li>
                            <li><span>My account</span><span><FaRegUser size={20} /></span></li>
                        </div>

                    </ul>

                </div>
            </div>
            <div className={`smsearch-div ${isSearch ? 'active' : ''}`}>
                <select>
                    <option onClick={() => handleNavigation('/grocery')}>Groceries</option>
                    <option>Clubcard</option>
                    <option>Recipies</option>
                </select>

                <div>
                    <input placeholder="Search" />
                    <button>Search</button>
                </div>
            </div>

            <section className="store-location-section">
                <div className={`store-location-div ${isStore ? 'active' : ''}`}>
                    <div className="location-content">
                        <h4><IoIosSearch /> <span>Find a store</span></h4>
                        <div> <input placeholder="Enter postcode, city or town" /><button>Search</button></div>
                        <div><button><span>Find stores near me </span><GiCompass size={20} /></button></div>
                        <div><a>Filter your search</a></div>
                    </div>
                    <div>Use our store locator to find a store near you or <span>browse our directory.</span></div>
                </div>
            </section>
        </div>
    )
}
export default MenuComponent