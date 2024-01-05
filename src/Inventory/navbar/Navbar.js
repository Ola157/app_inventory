import React from "react";
import { useSelector } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";

import { SlLocationPin } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";


const NavBar = ({ handleNavigation, navBtn, activeCategory, page }) => {

    const isMenu = useSelector(state => state.isMenu)
    const isSearch = useSelector(state => state.isSearch)
    const isStore = useSelector(state => state.isStore)
    const isSignin = useSelector(state => state.isSignin)
    return (
        <nav className="inventoryNav">
            <div className={`inventory-nav`}>
                <div className="user-div">
                    <div className="user-logdiv">
                        <button className={page ? 'hidden-element' : ''}>Sign in</button>
                        <button>{!page ? <><span><SlLocationPin size={20} /></span>Store locator</> : 'Express.com'}</button>
                        <button>Contact us</button>
                        <button>Help</button>
                        {page && <button>Feedback</button>}
                        <button className={page ? 'hidden-element' : ''} onClick={() => handleNavigation('/signIn/landing/*')}><FaRegUser size={20} />My account</button>
                    </div>
                </div>
                <div className="navmenu-div">
                    <div className={`inventory-brand`}>
                        <div className="inventory-brand-div">
                            <h4>Express</h4>
                            <span className={page ? 'hidden-element' : ''}>
                                <select>
                                    <option onClick={() => handleNavigation('/grocery')}>Groceries</option>
                                    <option>Clubcard</option>
                                    <option>Recipies</option>
                                </select>
                                <input placeholder="Search" />
                                <button><BsSearch /></button>
                            </span>
                            <span className={page ? 'hidden-element' : ''}>
                                <button className={`signinbtn ${isSignin ? 'active' : ''}`} onClick={() => navBtn('signin')}><FaRegUser size={20} /></button>
                                <button className={`locationbtn ${isStore ? 'active' : ''}`} onClick={() => navBtn('store')}><SlLocationPin size={20} /></button>
                                <button className={`searchbtn ${isSearch ? 'active' : ''}`} onClick={() => navBtn('search')}><BsSearch size={20} /></button>
                            </span>

                        </div>
                    </div>


                    <div className="bg-white">
                        <div className="menu-div">
                            <button className={isMenu || activeCategory ? 'active' : ''} onClick={() => navBtn('menu')}>Menu
                                <MdKeyboardArrowDown size={35} />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </nav>)
}

export default NavBar