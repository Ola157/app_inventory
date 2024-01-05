import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "./navbar/Navbar";
import Footer from "./Footer";
import Navmenu from "./navbar/Navmenu";
import NavContent from "./navbar/NavStoreContent";
import MenuComponent from "./navbar/MenuComponent";
import CarouselComponent from "./carousel/CarouselComponent";


const LandingPage = ({
    handleNavigation,
    navBtn,
    footerBtn,
    toggleCategory }) => {

    const isMenu = useSelector(state => state.isMenu)
    const isSearch = useSelector(state => state.isSearch)
    const isStore = useSelector(state => state.isStore)
    const isSignin = useSelector(state => state.isSignin)
    const activeCategory = useSelector(state => state.activeCategory)

    const [timeOfDay, setTimeOfDay] = useState('');
    let [backWard, setBackard] = useState(false);


    let slides = [
        {
            image: './carouselAsset/christmaschicken.jpg',
            h4: 'Order your festive food',
            p: 'Add festive food to order to your basket by 11.45pm 14 December',
            b: 'Festive food to order'
        },
        {
            image: './carouselAsset/christmasoven.jpg',
            h4: 'Christmas party food range',
            p: `Christmas party food range`,
            b: 'Shop christmas party food'
        },
        {
            image: './carouselAsset/christmasdrinks.jpg',
            h4: 'Top up your drinks cabinet',
            p: 'Browse the latest offers on our festive favourites',
            b: 'shop christmas drinks'
        }
    ]

    const [currentSlide, setCurrentSlide] = useState(0);
    const [manualClick, setClick] = useState(false)
    const [innerWidth, setInnerWidth] = useState()

    useEffect(() => {
        const determineTimeOfDay = () => {
            const currentHour = new Date().getHours();

            if (currentHour >= 5 && currentHour < 12) {
                setTimeOfDay('Morning');
            } else if (currentHour >= 12 && currentHour < 18) {
                setTimeOfDay('Afternoon');
            } else {
                setTimeOfDay('Evening');
            }
        };

        determineTimeOfDay();

        const intervalId = setInterval(determineTimeOfDay, 10000);

        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {
        setInnerWidth(window.innerWidth)

        if (manualClick) return

        let intervalTime = setInterval(nextSlide, 5000)

        return () => {
            clearInterval(intervalTime)
        }

    }, [currentSlide, manualClick])

    useEffect(() => {

        toggleEffects()

        const menuComponent = document.querySelector('.main-container')
        menuComponent.addEventListener('click', () => {
            handleNavigation()
            scrollToTop()
        })

        return () => {
            menuComponent.removeEventListener('click', handleNavigation)
        }

    }, [innerWidth, activeCategory, isMenu, isSearch, isStore, isSignin])

    const scrollToTop = () => {

        if (isStore || isSearch) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    const toggleEffects = () => {
        const inventoryContainer = document.querySelector('.inventory');
        const searchButton = document.querySelector('.searchbtn');
        const locationBtn = document.querySelector('.locationbtn');
        const signInBtn = document.querySelector('.signinbtn');
        const mainCont = document.querySelector('.main-container')

        if (window.innerWidth < 830) {

            if (activeCategory && !isMenu) {
                navBtn('menu')

            } else if (isStore && !isSearch && !activeCategory) {

                hideElements(signInBtn, searchButton);
                inventoryContainer.classList.add('fixed');
                mainCont.classList.add('active');

            } else if (isSearch && !isStore && !activeCategory) {

                hideElements(signInBtn, locationBtn);
                inventoryContainer.classList.add('fixed');
                mainCont.classList.add('active');

            } else if (isMenu && !isStore && !activeCategory) {

                resetVisibility(signInBtn, locationBtn, searchButton);
                inventoryContainer.classList.add('active');

            } else {
                resetVisibility(signInBtn, locationBtn, searchButton);
                inventoryContainer.classList.remove('active');
                mainCont.classList.remove('active');
                inventoryContainer.classList.remove('fixed');

            }
        }
        else if (window.innerWidth > 830) {
            if (activeCategory) {
                inventoryContainer.classList.add('active');

            } else {

                inventoryContainer.classList.remove('active');
            }
        }

    };

    const resetVisibility = (...elements) => {
        elements.forEach((element) => (element.style.visibility = 'visible'));
    };

    const hideElements = (...elements) => {
        elements.forEach((element) => (element.style.visibility = 'hidden'));
    };


    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);

        const carouselItems = document.querySelectorAll('.carousel_item');

        carouselItems.forEach((item, index) => {
            if (index === currentSlide) {
                item.style.animation = 'translateXOut 600ms forwards';
            } else if (index === (currentSlide + 1) % slides.length) {
                item.style.animation = 'translateXIn 600ms forwards';
            } else {
                item.style.animation = 'translateX 600ms forwards';
            }
        });
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);

        const carouselItems = document.querySelectorAll('.carousel_item');

        carouselItems.forEach((item, index) => {
            if (index === currentSlide) {
                item.style.animation = 'translateXOutReverse 600ms forwards';
            } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                item.style.animation = 'translateXInReverse 600ms forwards';
            } else {
                item.style.animation = 'translateXReverse 600ms forwards';
            }
        });
    };

    return (
        <>
            <NavContent
                toggleCategory={toggleCategory}
            />

            <div className={`navmenu-component ${activeCategory ? 'active' : ''}`}>
                <Navmenu
                    activeCategory={activeCategory}
                    toggleCategory={toggleCategory}
                    navBtn={navBtn}
                />
            </div>

            <Container fluid className='inventory'>

                <NavBar toggleCategory={toggleCategory}
                    activeCategory={activeCategory}
                    navBtn={navBtn}
                    handleNavigation={handleNavigation} />

                <MenuComponent
                    handleNavigation={handleNavigation}
                    toggleCategory={toggleCategory}
                    navBtn={navBtn}
                    activeCategory={activeCategory}
                />

                <Container fluid className={`main-container`}>
                    <div className="main-div">

                        <div className="main-content">

                            <div className="greetings-div">
                                <h2>Good {timeOfDay}</h2>
                                <p><Link to={'/signIn/signin/user'}>Sign in</Link> for the best experience. Not a customer yet? <Link to={'/signIn/register/user'}>Register</Link></p>
                            </div>

                            <CarouselComponent
                                currentSlide={currentSlide}
                                backWard={backWard}
                                setClick={setClick}
                                nextSlide={nextSlide}
                                prevSlide={prevSlide}
                                slides={slides}
                                manualClick={manualClick}
                            />

                            <section className="battery-section">

                                <div className="battery-container">
                                    <div className="battery-information">
                                        <p>Dont forget the batteries!</p>
                                        <p>Make sure you are prepared for Christmas</p>
                                    </div>
                                    <div className="battery-image-div">
                                        <img src={require(`${'./assets/2555.jpg'}`)} />
                                        <button onClick={() => nextSlide()}> <MdOutlineArrowForwardIos /></button>
                                    </div>
                                </div>

                            </section>


                            <div className="title-section">
                                <h2 className="styled-title">
                                    Let's get Christmas sorted
                                </h2>
                            </div>


                            <section className="christmas-section" onClick={() => handleNavigation('/signIn/landing/*')}>
                                <div className="christmas-container">
                                    <div className="christmas-information">
                                        <h3>Festive inspiration is here</h3>
                                        <p>The festive season is upon us and we want to help you spend less while you enjoy more</p>
                                    </div>
                                    <div className="christmas-image-div">
                                        <img src={require(`${'./assets/christmastable.jpg'}`)} />
                                        <button> <MdOutlineArrowForwardIos /></button>
                                    </div>
                                </div>
                            </section>


                            <section className="base-component">
                                <div className="base-component-element">
                                    <div className="base-component-grid-row">

                                        <div className="base-container mb-0">
                                            <div className="base-component-container">
                                                <Link>
                                                    <div className="base-component-image">
                                                        <img src={require(`${'./assets/christmas-choc.jpg'}`)} />
                                                    </div>
                                                    <div className="base-component-detail">
                                                        <div>
                                                            <h3>Christmas treats</h3>
                                                            <p>Choose your chocs, puds and savoury snakcs</p>
                                                        </div>
                                                        <div>
                                                            <span className="span-shop">
                                                                <span>Shop treats</span><span> <MdOutlineArrowForwardIos size={20} /></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="base-container mb-0">
                                            <div className="base-component-container">
                                                <Link>
                                                    <div className="base-component-image">
                                                        <img src={require(`${'./assets/christmas-dessert.jpg'}`)} />
                                                    </div>
                                                    <div className="base-component-detail">
                                                        <div>
                                                            <h3>Create a classic feast</h3>
                                                            <p>from tender turkey and moreish sides to decadent desserts</p>
                                                        </div>
                                                        <div>
                                                            <span className="span-shop">
                                                                <span>Shop Christmas food</span><span> <MdOutlineArrowForwardIos size={20} /></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="base-container mb-0">
                                            <div className="base-component-container">
                                                <Link>
                                                    <div className="base-component-image">
                                                        <img src={require(`${'./assets/christmasgift.jpg'}`)} />
                                                    </div>
                                                    <div className="base-component-detail">
                                                        <div>
                                                            <h3>Christmas gifts</h3>
                                                            <p>Wrap up your shopping with gifts for every budget</p>
                                                        </div>
                                                        <div>
                                                            <span className="span-shop">
                                                                <span>Shop gifts</span><span> <MdOutlineArrowForwardIos size={20} /></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="base-container mb-0">
                                            <div className="base-component-container">
                                                <Link>
                                                    <div className="base-component-image">
                                                        <img src={require(`${'./assets/6201855.jpg'}`)} />
                                                    </div>
                                                    <div className="base-component-detail">
                                                        <div>
                                                            <h3>Christmas decs</h3>
                                                            <p>Add a little extra twinkle before santa arrives</p>
                                                        </div>
                                                        <div>
                                                            <span className="span-shop">
                                                                <span>Shop decorations</span><span> <MdOutlineArrowForwardIos size={20} /></span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>


                            <div className="title-section">
                                <h2 className="styled-title">
                                    Discover more December deals
                                </h2>
                            </div>


                            <section className="base-component mb-0">

                                <div className="base-component-element-typeTwo">
                                    <div className="base-component-element">
                                        <div className="base-component-grid-row">
                                            <div className="base-container-typeTwo">
                                                <div className="base-component-container-typeTwo">
                                                    <Link>
                                                        <div className="base-component-image">
                                                            <img src={require(`${'./assets/family-christmas.jpg'}`)} />
                                                        </div>
                                                        <div className="base-component-detail">
                                                            <div>
                                                                <h3>Save 25% on nightwear and slippers</h3>
                                                                <p>Cosy up this christmas with fleece pyjamas, satin sets and fluffy slippers on clubcard**</p>
                                                            </div>
                                                            <div>
                                                                <span className="span-shop">
                                                                    <span>Browse F&F</span><span> <MdOutlineArrowForwardIos size={20} /></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="base-container-typeTwo">
                                                <div className="base-component-container-typeTwo">
                                                    <Link>
                                                        <div className="base-component-image">
                                                            <img src={require(`${'./assets/Landing_page_christmas1.jpg'}`)} />
                                                        </div>
                                                        <div className="base-component-detail">
                                                            <div>
                                                                <h3>Share the festive feeling with a gift they'll love</h3>
                                                                <p>Give them exactly what they want this Christmas with an e-gift card. T&Cs apply</p>
                                                            </div>
                                                            <div>
                                                                <span className="span-shop">
                                                                    <span>Shop e-gift cards</span><span> <MdOutlineArrowForwardIos size={20} /></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="base-container-typeTwo">
                                                <div className="base-component-container-typeTwo">
                                                    <Link>
                                                        <div className="base-component-image">
                                                            <img src={require(`${'./assets/iphone15.jpg'}`)} />
                                                        </div>
                                                        <div className="base-component-detail">
                                                            <div>
                                                                <h3>Iphone 15 and airpods pro offer </h3>
                                                                <p>save £180 with clubcard prices when you buy the incredible iphone 15 with airpods pro at Express mobile</p>
                                                            </div>
                                                            <div>
                                                                <span className="span-shop">
                                                                    <span>Shop Express mobile</span><span> <MdOutlineArrowForwardIos size={20} /></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className="base-container-typeTwo">
                                                <div className="base-component-container-typeTwo">
                                                    <Link>
                                                        <div className="base-component-image">
                                                            <img src={require(`${'./assets/35987.jpg'}`)} />
                                                        </div>
                                                        <div className="base-component-detail">
                                                            <div>
                                                                <h3>Forgotten something?</h3>
                                                                <p>Dont worry, we can deliver last-minute festive essentials from as little as 20 minutes</p>
                                                            </div>
                                                            <div>
                                                                <span className="span-shop">
                                                                    <span>Book a Whoosh slot</span><span> <MdOutlineArrowForwardIos size={20} /></span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </section>


                            <div className="footer-note mt-0">
                                <p>*Drinkaware.co.uk. 18+. 25% off 6 bottles of wine offer excludes Wine Route and Finest Meal Deal wines, boxed wine, fortified wine, bottles under £5.50 in England and NI or £7 in Wales and bottles under 200ml. Minimum unit pricing applies in Wales. Max. 36 bottles. Excludes Express, Scotland and Whoosh. While stocks last. Clubcard/app required. Delivery charges may apply. Ends 17/12/23.</p>
                            </div>
                            <div className="footer-note">
                                <p>**Available in majority of larger stores. In-store only. Excludes Next. Offer includes F&F slippers. Offer excludes slipper socks. To qualify present your Clubcard/app at time of purchase. Subject to availability. Selected lines. Offer valid until 19/12/23.</p>
                            </div>
                            <div className="footer-note">
                                <p>†iPhone 15 and AirPods Pro offer based on 6GB data, 128GB storage, 36 month contract. T&Cs apply.</p>
                            </div>
                            <div className="footer-note">
                                <p>††Fees apply. Delivery times range from 20-60 minutes. Selected areas only. Pricing specific to Whoosh. Please check the Whoosh delivery times over the Christmas period. See express.com/whoosh</p>
                            </div>
                            <div className="footer-note">
                                <p>‡Aldi Price Match product prices matched and checked on hundreds of comparable products from GB Aldi stores and/or online twice weekly. Price most often found is matched excluding promotions. Prices matched pro rata. Products matched may vary by week. Selected Express store excluding Express and NI stores. Product availability varies by store.</p>
                            </div>
                            <div className="footer-note">
                                <p>‡‡Low Everyday Prices includes over 1,000 products across larger Express stores. Excludes Express. Prices locked until January 2024. Look out for the Low Everyday Prices roundel in-store and online. See Express.com/groceries/en-GB/zone/low-everyday-prices</p>
                            </div>

                        </div>
                    </div>

                    <Footer footerBtn={footerBtn} />
                </Container >

            </Container >
        </>)
}
export default LandingPage