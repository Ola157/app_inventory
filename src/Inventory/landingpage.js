import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { SlLocationPin } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { RiTiktokLine } from "react-icons/ri";
import { FaPinterest } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GiCompass } from "react-icons/gi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { FaCircle } from "react-icons/fa";


const LandingPage = ({
    handleNavigation,
    navBtn,
    footerBtn }) => {

    const isMenu = useSelector(state => state.isMenu)
    const isSearch = useSelector(state => state.isSearch)
    const isStore = useSelector(state => state.isStore)
    const isHelp = useSelector(state => state.isHelp)
    const isAbout = useSelector(state => state.isAbout)
    const isWebsite = useSelector(state => state.isWebsite)
    const isLink = useSelector(state => state.isLink)

    const [timeOfDay, setTimeOfDay] = useState('');

    let slides = [
        {
            image: './assets/imgs/christmaschicken.jpg',
            h4: 'Order your festive food',
            p: 'Add festive food to order to your basket by 11.45pm 14 December',
            b: 'Festive food to order'
        },
        {
            image: './assets/imgs/christmasoven.jpg',
            h4: 'Christmas party food range',
            p: `Christmas party food range`,
            b: 'Shop christmas party food'
        },
        {
            h4: '25% off 6 wines',
            image: './assets/imgs/christmaswine.jpg',
            p: 'Spend less on wines for your Christmas dinner and parties*',
            b: 'Shop the offer'
        }, {
            h4: 'Top up your drinks cabinet',
            image: './assets/imgs/christmasdrinks.jpg',
            p: 'Browse the latest offers on our festive favourites',
            b: 'shop christmas drinks'
        }
    ]

    const [currentSlide, setCurrentSlide] = useState(0);
    const [manualClick, setClick] = useState(false)

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

        if (manualClick) return
        let intervalTime = setInterval(nextSlide, 6000)
        return () => {
            clearInterval(intervalTime)
        }

    }, [currentSlide, manualClick])

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };


    return (<Container fluid className="inventory">
        <nav className={`inventory-nav ${isMenu ? 'active' : ''}`}>

            <div className="user-div">
                <div className="user-logdiv">
                    <button>Sign in</button>
                    <button><span><SlLocationPin size={20} /></span>Store locator</button>
                    <button>Contact us</button>
                    <button>Help</button>
                    <button><FaRegUser size={20} />My account</button>
                </div>
            </div>

            <div className={`inventory-brand ${isMenu ? 'active' : ''}`}>
                <div className="inventory-brand-div">
                    <h4>Express</h4>
                    <span>
                        <select>
                            <option>Groceries</option>
                            <option>Clubcard</option>
                            <option>Recipies</option>
                        </select>
                        <input placeholder="Search" />
                        <button><BsSearch /></button>
                    </span>
                    <span>
                        <button onClick={() => handleNavigation('/signIn/landing/*')}><FaRegUser size={20} /></button>
                        <button className={isStore ? 'active' : ''} onClick={() => navBtn('store')}><SlLocationPin size={20} /></button>
                        <button className={isSearch ? 'active' : ''} onClick={() => navBtn('search')}><BsSearch size={20} /></button>
                    </span>

                </div>
            </div>

            <div className="store-content">
                <ul className="store-content-ul">
                    <li>Groceries</li>
                    <li>F&F Clothing</li>
                    <li>Express Clubcard</li>
                    <li>Express Bank</li>
                    <li>Express Mobile</li>
                    <li>Recipes</li>
                    <li></li>
                </ul>
            </div>

            <div className="menu-div">
                <button className={isMenu ? 'active' : ''} onClick={() => navBtn('menu')}>Menu
                    <MdKeyboardArrowDown size={25} />
                </button>
            </div>

            <div className="menu-container">

                <div className={`menu-content ${isMenu ? 'active' : ''}`}>
                    <ul className="menu-content-ul">
                        <li><button><span>Groceries</span> <span></span><MdArrowForwardIos /></button></li>
                        <li><button><span>F&F Clothing </span><span><MdArrowForwardIos /></span></button></li>
                        <li><button><span>Express Clubcard</span> <span><MdArrowForwardIos /></span></button></li>
                        <li><button><span>Express Bank</span> <span><MdArrowForwardIos /></span></button></li>
                        <li><button><span>Express Mobile</span> <span><MdArrowForwardIos /></span></button></li>
                        <li><button><span>Recipes</span> <span><MdArrowForwardIos /></span></button></li>
                        <li><button onClick={() => handleNavigation('/signIn/landing/*')}>Sign in</button></li>
                        <li><button><span>Store locator</span> <span><SlLocationPin size={20} /></span></button></li>
                        <li><button>Contact us</button></li>
                        <li><button>Help</button></li>
                        <li><button><span>My account</span><span><FaRegUser size={20} /></span></button></li>
                    </ul>
                </div>

                <div className={`smsearch-div ${isSearch ? 'active' : ''}`}>
                    <select>
                        <option>Groceries</option>
                        <option>Clubcard</option>
                        <option>Recipies</option>
                    </select>
                    <input placeholder="Search" />
                    <button>Search</button>
                </div>

                <section className={`store-location-section ${isStore ? 'active' : ''}`}>
                    <div className="location-content">
                        <h4><IoIosSearch /> <span>Find a store</span></h4>
                        <div> <input placeholder="Enter postcode, city or town" /><button>Search</button></div>
                        <div><button><span>Find stores near me </span><GiCompass size={20} /></button></div>
                        <div><a>Filter your search</a></div>
                    </div>
                    <div>Use our store locator to find a store near you or <span>browse our directory.</span></div>
                </section>
            </div>
        </nav>

        <Container fluid className={`main-container ${isSearch || isStore || isMenu ? 'active' : ''}`}>
            <div className="main-div">

                <div className="main-content">

                    <div className="greetings-div">
                        <h2>Good {timeOfDay}</h2>
                        <p><Link to={'/signIn/signin/user'}>Sign in</Link> for the best experience. Not a customer yet? <Link to={'/signIn/register/user'}>Register</Link></p>
                    </div>

                    <section className="carousel-section">

                        <div className="carousel-container">
                            <div className="carousel-track">
                                {slides.map((slide, index) => (
                                    <div
                                        className={`carousel_item ${currentSlide === index && !manualClick ? `active` :
                                            currentSlide === index && manualClick ? 'slideback' : ''}`}
                                        key={index}
                                    >
                                        <div>
                                            {slide.h4 ? <h4>{slide.h4}</h4> : null}
                                            <p>{slide.p}</p>
                                            <button>{slide.b} <MdOutlineArrowForwardIos /></button>
                                        </div>

                                        <div>
                                            <img src={require(`${slide.image}`)} alt={`Slide ${index}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="carousel-control-container">
                            <div className="carousel-control">
                                <div>
                                    <ul>
                                        <li><button onClick={() => prevSlide()}><MdOutlineArrowBackIos /> </button></li>
                                        {slides.map((slid, index) => (
                                            <li key={index}>
                                                <span><FaCircle className={index === currentSlide ? 'active' : ''} /></span>
                                            </li>
                                        ))}
                                        <li><button className="m-0" onClick={() => nextSlide()}> <MdOutlineArrowForwardIos /></button></li>
                                        <li><hr></hr></li>
                                        <li><button onClick={() => setClick(!manualClick)}>{!manualClick ? <CiPause1 /> : <CiPlay1 />}</button></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="battery-section">

                        <div className="battery-container">
                            <div>
                                <p>Dont forget the batteries!</p>
                                <p>Make sure you are prepared for Christmas</p>
                            </div>
                            <div>
                                <img src={require(`${'./assets/imgs/2555.jpg'}`)} />
                                <button onClick={() => nextSlide()}> <MdOutlineArrowForwardIos /></button>
                            </div>
                        </div>

                    </section>

                    <section className="christmas-shop-container">
                        <div className="christmas-h2div">
                            <h2>
                                Let's get Christmas sorted
                            </h2>
                        </div>

                        <div className="christmas-dinning">
                            <div>
                                <h3>Festive inspiration is here</h3>
                                <p>The festive season is upon us and we want to help you spend less while you enjoy more</p>
                            </div>
                            <div>
                            </div>
                        </div>
                    </section>

                    <section className="base-component">
                        <div className="base-component-element">
                            <div className="base-component-grid-row">
                                <div className="base-container">
                                    <div className="base-component-container">
                                        <Link>
                                            <div className="base-component-image">
                                                <img src={require(`${'./assets/imgs/christmas-choc.jpg'}`)} />
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

                                <div className="base-container">
                                    <div className="base-component-container">
                                        <Link>
                                            <div className="base-component-image">
                                                <img src={require(`${'./assets/imgs/christmas-dessert.jpg'}`)} />
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

                                <div className="base-container">
                                    <div className="base-component-container">
                                        <Link>
                                            <div className="base-component-image">
                                                <img src={require(`${'./assets/imgs/christmasgift.jpg'}`)} />
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

                                <div className="base-container">
                                    <div className="base-component-container">
                                        <Link>
                                            <div className="base-component-image">
                                                <img src={require(`${'./assets/imgs/6201855.jpg'}`)} />
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
                            Discover more with December deals
                        </h2>
                    </div>

                    <section className="base-component">

                        <div className="base-component-element-typeTwo">
                            <div className="base-component-element">
                                <div className="base-component-grid-row">
                                    <div className="base-container-typeTwo">
                                        <div className="base-component-container-typeTwo">
                                            <Link>
                                                <div className="base-component-image">
                                                    <img src={require(`${'./assets/imgs/family-christmas.jpg'}`)} />
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
                                                    <img src={require(`${'./assets/imgs/Landing_page_christmas1.jpg'}`)} />
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
                                                    <img src={require(`${'./assets/imgs/iphone15.jpg'}`)} />
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
                                                    <img src={require(`${'./assets/imgs/35987.jpg'}`)} />
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

                    <div className="footer-note">
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
        </Container >

        <footer>
            <div className="footer-content">
                <div className="footer-div-ul">
                    <ul>
                        <li className={`eventli ${isHelp ? 'active' : ''}`} onClick={() => footerBtn('help')}>
                            <span>Here to help</span>
                            <MdOutlineArrowForwardIos size={25} className="d-sm-block d-md-none" />
                        </li>

                        <div className={`spanhidden ${isHelp ? 'active' : ''}`}>
                            <li><span>Help & FAQs</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                            <li><span>Contact us</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                        </div>
                    </ul>

                    <ul>
                        <li className={`eventli ${isAbout ? 'active' : ''}`} onClick={() => footerBtn('about')}>
                            <span>About Express</span>
                            <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" />
                        </li>

                        <span className={`spanhidden ${isAbout ? 'active' : ''}`}>

                            <li><span>Store vacancies</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                            <li><span>Careers</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                            <li><span>PLC</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                            <li><span>Sustainability</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                            <li><span>Our little helps</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                        </span>
                    </ul>


                    <ul>
                        <li className={`eventli ${isWebsite ? 'active' : ''}`} onClick={() => footerBtn('website')}>
                            <span>Our website</span>
                            <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" />
                        </li>

                        <span className={`spanhidden ${isWebsite ? 'active' : ''}`}>
                            <li><span>Terms & Conditions</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                            <li><span>Privacy & Cookie Policy</span> <MdOutlineArrowForwardIos size={25} className="d-sm-block d-md-none" /></li>
                            <li><span>Privacy Center</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                            <li><span>Site map</span> <MdOutlineArrowForwardIos size={25} className="d-sm-block d-md-none" /></li>
                            <li><span>Accessibility</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                        </span>
                    </ul>

                    <ul>
                        <li className={`eventli ${isLink ? 'active' : ''}`} onClick={() => footerBtn('links')}>
                            <span>Useful links</span>
                            <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" />
                        </li>

                        <span className={`spanhidden ${isLink ? 'active' : ''}`}>
                            <li><span>Pharmacy</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                            <li><span>Product recall</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                            <li><span>Store locator</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                            <li><span>Bags of Help</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                            <li><span>Rate this page</span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></li>
                        </span>
                    </ul>
                </div>

                <p>
                    Follow us  <FaFacebookF size={30} />
                    <FaInstagram size={30} />
                    <FaPinterest size={30} />
                    <IoLogoTwitter size={30} />
                    <RiTiktokLine size={30} />
                    <FaSquareYoutube size={30} />
                </p>
            </div>
            <div className="rights-div">
                <p >
                    &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                </p>
            </div>
        </footer>
    </Container >)
}
export default LandingPage