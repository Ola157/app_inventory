import React, { useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import NavBar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Navmenu from "./navbar/Navmenu";
import { useSelector } from "react-redux";
import CategoryList from "./navbar/Navcategory";
import CarouselPage from "./carousel/CarouselComponent";
import { MdArrowBackIos } from "react-icons/md";
import AdSection from "./AdvertSectionOne";
import { IoIosArrowBack } from "react-icons/io";
import BaseComponentTwo from "./BaseComponentTwo";
import useQuantity from "./custom-hooks/use-Quantity";
import { IoIosArrowForward } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi";
import useCategory from "./custom-hooks/use-category";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegCalendarDays } from "react-icons/fa6";
import { BsJournalBookmark } from "react-icons/bs";
import { BiCalendarEvent } from "react-icons/bi";
import { BsChatSquareTextFill } from "react-icons/bs";
import { GiMeal } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { IoDownloadSharp } from "react-icons/io5";
import usePause from "./custom-hooks/use-pause";
import useNavigator from "./custom-hooks/use-Navigation";

const GroceryPage = ({
    footerBtn,
    toggleStorevNav,
    handleGoods
}) => {

    const [handleAddClick, handleSubtractClick] = useQuantity()
    const activeCategory = useSelector(state => state.activeCategory)
    const products = useSelector(state => state.goods)
    const isGMenu = useSelector(state => state.isGMenu)
    const isSearch = useSelector(state => state.isSearch)
    const activeDepartment = useSelector(state => state.activeDepartment)
    const offers = useSelector(state => state.offers)


    const [listItems, setListItems] = useState([{ name: 'GROCERIES' },
    { name: 'Shop all groceries', icon: <HiOutlineShoppingCart size={20} /> },
    { name: 'Favourites', icon: <FaHeart size={20} /> },
    { name: 'Book a slot', icon: <FaRegCalendarDays size={20} /> },
    { name: 'My orders', icon: <BsJournalBookmark size={20} /> },
    { name: 'Great Value Event', icon: <BiCalendarEvent size={20} /> },
    { name: 'Special offers', icon: <BsChatSquareTextFill size={20} /> },
    { name: 'Meals & Recipes', icon: <GiMeal size={20} /> },
    { name: 'My account', icon: <FaUser size={20} /> },
    { name: 'Delivery Saver', icon: <FaTruck size={20} /> },
    { name: 'Download the app', icon: <IoDownloadSharp size={20} /> },
    { name: 'MORE FROM TESCO' },
    { name: 'Clubcard account', icon: <IoDownloadSharp size={20} /> },
    { name: 'Store locator', icon: <IoDownloadSharp size={20} /> },
    { name: 'Tesco Direct', icon: <IoDownloadSharp size={20} /> },
    { name: 'F & F clothing', icon: <IoDownloadSharp size={20} /> },
    { name: 'ABOUT THIS SITE' },
    { name: 'Feedback', icon: <IoDownloadSharp size={20} /> },
    { name: 'HelpHelp with the groceries website', icon: <IoDownloadSharp size={20} /> },
    { name: 'Contact us', icon: <IoDownloadSharp size={20} /> }])

    const [handleNavigation] = useNavigator()
    const [isPause, handlePause] = usePause()
    const [handleToggleCategory, toggleDepartment, toggleInnerDepartment, handleNavBtn] = useCategory()
    const [grocerypage, setGpage] = useState([
        "Fresh Food",
        "Bakery",
        "Frozen Food",
        "Treats & Snacks",
        "Food Cupboard",
        "Drinks",
        "Baby & Toddler",
        "Health && Beauty",
        "Pets",
        "Household",
        "Home & Ents",
        "Easter",
    ])

    useEffect(() => {

        toggleStorevNav('STOREMENU-GROCERYPAGE')
        handlePause(true)
        handleGoods();

    }, [])

    useEffect(() => {
        const inventory = document.querySelector('.inventory')

        if (isGMenu && window.innerWidth < 830) {
            inventory.style.position = 'fixed'
            return
        } else {
            inventory.style.position = 'relative'
        }

    }, [isGMenu])

    useEffect(() => {
        const navmenuDiv = document.querySelector('.navmenu-div')
        const storeContent = document.querySelector('.store-content')
        const nav_storemenu = document.querySelector('.nav_storemenu')
        const carouselControl = document.querySelector('.carousel-control')
        const locationbtn = document.querySelector('.locationbtn')
        const signinbtn = document.querySelector('.signinbtn')
        carouselControl.classList.add('hide_Li')
        const cartIcon = document.querySelector('.cartIcon')
        const searchbtnGrocery = document.querySelector('.searchbtnGrocery')
        const searchbtn = document.querySelector('.searchbtn')
        const menuHamburger = document.querySelector('.grocery_menu-burger')
        const bgWhite = document.querySelector('.bg-white')
        const inventoryBrandDiv = document.querySelector('.inventory-brand-div')
        const inventoryBrand = document.querySelector('.inventory-brand')
        const inventoryNav = document.querySelector('.inventoryNav')

        bgWhite.style.display = 'none'
        menuHamburger.classList.add('active')
        searchbtn.style.display = 'none'
        signinbtn.style.display = 'none'
        nav_storemenu.classList.remove('hidden')
        navmenuDiv.classList.add('grocery_page')
        storeContent.classList.add('groceryPage')
        locationbtn.style.display = 'none'
        cartIcon.classList.add('display')
        searchbtnGrocery.classList.add('display')
        inventoryBrandDiv.classList.add('groceryPageDiv')
        inventoryBrand.classList.add('groceryPageBrand')
        inventoryNav.classList.add('groceryNav')
    }, [])


    const scrollContainerRef = useRef(null);

    const [scrollPosition, setScrollPosition] = useState(0);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);
    let [currentCar, setCurrentSlide] = useState(0)

    const handleScroll = () => {
        const container = scrollContainerRef.current;
        const currentPosition = container.scrollLeft;

        setScrollPosition(currentPosition);
        setIsAtStart(currentPosition === 0);
        setIsAtEnd(currentPosition + container.clientWidth >= container.scrollWidth);
    };

    const handleScrollClick = (direction) => {
        const container = scrollContainerRef.current;
        const scrollAmount = 250;

        if (direction === 'left') {
            container.scrollLeft -= scrollAmount;
        } else {
            container.scrollLeft += scrollAmount;
        }
    };

    useEffect(() => {
        const container = scrollContainerRef.current;

        if (container) {
            container.addEventListener('scroll', handleScroll);

            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, [handleScroll]);

    const nextCar = () => {
        setCurrentSlide((prev) => (prev + 1) % 4)
        const carouselItems = document.querySelectorAll('.carousel_ui_item');
        carouselItems.forEach((item, index) => {
            if (index === currentCar) {
                item.style.animation = '1000ms cubic-bezier(.77,0,.175,1) 0s 1 normal forwards running translateN1';
            } else if (index === (currentCar + 1) % 4) {
                item.style.animation = '1000ms cubic-bezier(.77,0,.175,1) 0s 1 normal forwards running translateN2';
            } else if (index === (currentCar + 2) % 4) {
                item.style.animation = '1000ms cubic-bezier(.77,0,.175,1) 0s 1 normal forwards running translateN3';
            } else if (index === (currentCar + 3) % 4) {
                item.style.animation = '1000ms cubic-bezier(.77,0,.175,1) 0s 1 normal forwards running translateN4';
            }
        });
    }

    const prevCar = () => {
        setCurrentSlide((prev) => (prev - 1 + 4) % 4);
        const carouselItems = document.querySelectorAll('.carousel_ui_item');

        carouselItems.forEach((item, index) => {
            if (index === currentCar) {
                item.style.animation = '1000ms cubic-bezier(.77,0,.175,1) 0s 1 normal forwards running translate1Rev';
            } else if (index === ((currentCar - 1) + 4) % 4) {
                item.style.animation = '1000ms cubic-bezier(.77,0,.175,1) 0s 1 normal forwards running translate2Rev';
            } else if (index === ((currentCar - 2) + 4) % 4) {
                item.style.animation = '1000ms cubic-bezier(.77,0,.175,1) 0s 1 normal forwards running translate3Rev';
            } else if (index === ((currentCar - 3) + 4) % 4) {
                item.style.animation = '1000ms cubic-bezier(.77,0,.175,1) 0s 1 normal forwards running translate4Rev';
            }
        });
    }



    return (
        <Container fluid className="inventory">
            <NavBar />

            <div className={`grocery_search ${isSearch ? 'active' : ''}`}>
                <div>
                    <span><input placeholder="search" /> </span>
                    <span><button className={`searchbtn-grocery`}><BsSearch size={20} /></button>
                    </span>
                </div>
            </div>

            <div className="main-nav-inner">
                <div className={`fixed-container ${isGMenu ? 'swipe_out' : ''}`}>
                    <div>
                        <header>
                            <button onClick={() => handleNavigation('/signIn/signin/user')}>Sign in</button>
                            <button onClick={() => handleNavigation('/signIn/register/user')}>Register</button></header>
                        <div className="list-container">
                            <ul>
                                {listItems.map((item, index) => (
                                    <li key={index}>
                                        <a>
                                            <span>{item.icon}</span>
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <span onClick={() => handleNavBtn('grocerymenu')}>
                            <GiHamburgerMenu size={25} />
                            <p>MENU</p>
                        </span>
                    </div>

                </div>
            </div>

            <div className={`navmenu-component grocerypage ${activeCategory || activeDepartment ?
                'grocerypage_active' : ''}`}>

                <Navmenu />

            </div>

            <section className="groceryPage_introsection">
                <div className="groceryPage_div">
                    <div className="grocerydefaultMenu">
                        <ul>
                            {grocerypage.map((category, index) => (
                                <li key={index} onClick={() => toggleDepartment(category, 'grocerypage')}>{category} <MdArrowBackIos className="svg_grocery" /></li>
                            ))}
                        </ul>
                    </div>

                    <div className="groceryPage_container">
                        <div className="groceryPage_container_heading">
                            <h3>Quick and convenient shopping</h3>
                        </div>

                        <div className="groceryPage_introflex">
                            <div className="groceryPage_introflexdivOne">
                                <div>
                                    <p><b>Your shopping, picked personally</b></p>
                                    <p>Want your bananas extra green or smaller jacket spuds? Just let us know. Add a note when you check out and we’ll pass it on to our pickers.</p>
                                </div>
                            </div>

                            <div className="groceryPage_introflexdivTwo">
                                <div>
                                    <h5>Sign in to start shopping</h5>
                                    <div>
                                        <h3><hr></hr><p>Already a customer?</p><hr></hr></h3>
                                        <button className="signInBtn" onClick={() => handleNavigation('/signIn/signin/user')}>Sign in</button>
                                    </div>
                                    <div>
                                        <h3> <hr></hr> <p>New to Express?</p><hr></hr></h3>
                                        <button className="regBtn" onClick={() => handleNavigation('/signIn/register/user')}>Register</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <section className="ui-panel">
                <div className="ui-content-title">
                    <h1>Double Clubcard points across these top offers</h1>
                </div>
            </section>

            <section className="ui-panel">
                <div className="ui-ddl-carousel">
                    <div className="carousel-slide">
                        <div className="carousel-overflow">
                            <div className="inner">
                                {offers && offers.map((good, index) => (
                                    <div className={`carousel_ui_item ${currentCar === index ? 'active' : ""}`} key={index}>
                                        <div className="ui-stamp-widget">
                                            <div className="stamp_widget">
                                                <div className="img_div">
                                                    <img src={require(`${good.image}`)} />
                                                </div>
                                                <div><span>Regular price</span> {good.price && <span>£{good.price} each</span>}</div>
                                                <div><span>Clubcard price</span> {good.clubP && <span>{`${good.clubP}p`}</span>}</div>
                                                <div><span>{good.name}</span><span><button><MdOutlineArrowForwardIos /></button></span></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="ui_panel_carousel_control">
                            <ul>
                                <li onClick={() => prevCar()}><span><MdOutlineArrowBackIos size={20} /></span></li>
                                {products && products.slice(6, 10).map((prod, index) => (
                                    <li className={`lisvg`} key={index}>
                                        <span className={index === currentCar ? 'active' : ''}></span>
                                    </li>
                                ))}
                                <li className="m-0" onClick={() => nextCar()}> <span> <MdOutlineArrowForwardIos size={20} /></span></li>
                            </ul>

                        </div>
                    </div>

                </div>
            </section>

            <section className="grocery_carousel">
                <div>
                    <div className="carousel_inner">
                        <CarouselPage />
                    </div>
                </div>
            </section>

            <section className="ui-panel">
                <div className="ui_panel_ad">
                    <AdSection />
                </div>
            </section>


            <section className="base-component mb-0 grocerypagecomponent">
                <div className="base-component-element-typeTwo">
                    <BaseComponentTwo />
                </div>
            </section>

            <section className="ui-panel">
                <div className="ui_wrapper">
                    <div className="recomended-carousel">
                        <div className="product_list_section">
                            <div>
                                <h2>Popular products in fresh fruit</h2>
                            </div>
                        </div>
                        <button
                            className={`scroll-btn ${isAtStart ? 'disabled' : ''}`}
                            onClick={() => handleScrollClick('left')}
                        >
                            <IoIosArrowBack size={30} />
                        </button>

                        <div className="carousel__wrapper" ref={scrollContainerRef}>
                            <div className="caro_usel">
                                <ul className="carousel_list_item">
                                    {products.slice(0, 10).map((item, index) => (
                                        <li key={index}>
                                            <div className="beans_carousel_wrapper">
                                                <div className="div_carousel_image">
                                                    <img src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/inventory/${item.image}`} />
                                                </div>
                                                <div className="item_name"><span>Express</span> {item.item}</div>
                                                <div className="item_price"><span>£0.{item.price}</span><span> £0.{item.price}/each</span></div>

                                                {item.addItem === false ? (
                                                    <button className={`inventory__product-btn ${item.userQuantity > 0 ? 'hidden' : ''}`}
                                                        onClick={() => handleAddClick({ itemId: item._id, newUserQuantity: item.userQuantity, quantity: item.quantity, page: 'homepage' })}>
                                                        Add
                                                    </button>
                                                ) : (
                                                    <div className={`inventory__product_qty ${item.userQuantity > 0 ? 'visible' : ''}`}>
                                                        <button className='inventory__product-btn adjust'
                                                            onClick={() => handleSubtractClick({ itemId: item._id, newUserQuantity: item.userQuantity, quantity: item.quantity })}
                                                        >-</button>
                                                        <input className={`inventory__product-input ${item.userQuantity > 0 ? 'shadowInput' : ''}`} value={item.userQuantity} readOnly />
                                                        <button className='inventory__product-btn adjust'
                                                            onClick={() => handleAddClick({ itemId: item._id, newUserQuantity: item.userQuantity, quantity: item.quantity })}>
                                                            +</button>
                                                    </div>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <button
                            className={`scroll-btn ${isAtEnd ? 'disabled' : ''}`}
                            onClick={() => handleScrollClick('right')}
                        >
                            <IoIosArrowForward size={30} />
                        </button>
                    </div>
                </div>
            </section>


            <Footer footerBtn={footerBtn} />

        </Container >
    )
}
export default GroceryPage