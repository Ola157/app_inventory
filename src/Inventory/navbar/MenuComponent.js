import React from "react";
import { useSelector } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import { GiCompass } from "react-icons/gi";
import { MdArrowForwardIos } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import Navmenu from "./Navmenu";
import { SlLocationPin } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";

const MenuComponent = ({ toggleCategory, activeCategory, page, navBtn, handleNavigation }) => {

    const isMenu = useSelector(state => state.isMenu)
    const isSearch = useSelector(state => state.isSearch)
    const isStore = useSelector(state => state.isStore)


    return (
        <div className="menu-container">
            <div className={`menu-component ${isMenu ? 'active' : ''}`}>
                <div className={`menu-content`}>
                    <ul className="menu-content-ul">
                        <div className={`responding-li ${activeCategory ? 'slidediv' : ''}`}>
                            <li className="d-flex justify-content-end py-1">
                                <button onClick={() => navBtn('menu')}>
                                    Close <span><IoCloseSharp size={20} /></span>
                                </button>
                            </li>
                            <li onClick={!page ? () => toggleCategory('grocery') : () => handleNavigation('/')}>
                                {!page ? <><span>Groceries</span> <span></span><MdArrowForwardIos size={20} /></> : 'Express.com'}</li>

                            <li onClick={() => toggleCategory(!page && 'clothing')}>{!page ? <><span>F&F Clothing</span> <span></span><MdArrowForwardIos size={20} /></> : 'Contact us'}</li>
                            <li onClick={() => toggleCategory(!page && 'clubcard')}>{!page ? <><span>Express Clubcard</span> <span></span><MdArrowForwardIos size={20} /></> : 'Help'}</li>
                            <li onClick={() => toggleCategory(!page && 'bank')}>{!page ? <><span>Express Bank</span> <span></span><MdArrowForwardIos size={20} /></> : 'Feedback'}</li>
                            <li onClick={() => toggleCategory('mobile')}><span>Express Mobile</span> <span><MdArrowForwardIos size={20} /></span></li>
                            <li onClick={() => toggleCategory('recipe')}><span>Recipes</span> <span><MdArrowForwardIos size={20} /></span></li>
                        </div>

                        <div className={`innerrespondingdiv ${activeCategory ? 'slidediv' : page ? 'hidden-element' : ''}`}>
                            <li>
                                <Navmenu
                                    activeCategory={activeCategory}
                                    toggleCategory={toggleCategory} />
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