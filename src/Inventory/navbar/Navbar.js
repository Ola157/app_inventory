import React from "react";
import { useSelector } from "react-redux";
import { MdKeyboardArrowDown } from "react-icons/md";

import { SlLocationPin } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import NavContent from "./NavStoreContent";
import useNavigator from "../custom-hooks/use-Navigation";
import useCategory from "../custom-hooks/use-category";
import { RiShoppingCartFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";


const NavBar = ({ page }) => {

    const isMenu = useSelector(state => state.isMenu)
    const isSearch = useSelector(state => state.isSearch)
    const isStore = useSelector(state => state.isStore)
    const isSignin = useSelector(state => state.isSignin)
    const activeCategory = useSelector(state => state.activeCategory)
    const isGMenu = useSelector(state => state.isGMenu)

    const [handleToggleCategory, toggleDepartment, toggleInnerDepartment, handleNavBtn] = useCategory()
    const [handleNavigation] = useNavigator()

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
                            <div className="grocery_menu-burger">
                                <span className={`menu-hamburger`} onClick={() => handleNavBtn('grocerymenu')}>
                                    <GiHamburgerMenu size={25} />
                                    <p>MENU</p>
                                </span>
                            </div>
                            <h4 onClick={() => handleNavigation('/')}>Express</h4>
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
                                <button className={`signinbtn ${isSignin ? 'active' : ''}`} onClick={() => handleNavBtn('signin')}><FaRegUser size={20} /></button>
                                <button className={`locationbtn ${isStore ? 'active' : ''}`} onClick={() => handleNavBtn('store')}><SlLocationPin size={20} /></button>
                                <button className={`searchbtn ${isSearch ? 'active' : ''}`} onClick={() => handleNavBtn('search')}><BsSearch size={20} /></button>
                                <button className={`searchbtnGrocery`} onClick={() => handleNavBtn('search')}><BsSearch size={20} /></button>
                                <button className={`cartIcon`}><RiShoppingCartFill size={20} /></button>
                            </span>

                        </div>
                    </div>

                    <div className="nav_storemenu">

                        <NavContent />
                    </div>

                    <div className="bg-white">
                        <div className="menu-div">
                            <button className={isMenu || activeCategory ? 'active' : ''} onClick={() => handleNavBtn('menu')}>Menu
                                <MdKeyboardArrowDown size={35} />
                            </button>
                        </div>
                    </div>

                </div>
            </div >
        </nav >)
}

export default NavBar