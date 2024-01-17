import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "./navbar/Navbar";
import Footer from "./footer/Footer";
import Navmenu from "./navbar/Navmenu";
import NavContent from "./navbar/NavStoreContent";
import MenuComponent from "./navbar/MenuComponent";
import CarouselComponent from "./carousel/CarouselComponent";
import FooterParagraph from "./footer/FooterParagraphComp";
import useCarouselBtn from "./custom-hooks/use-carousel";
import SubAd from "./subAdvertComp";
import useNavigator from "./custom-hooks/use-Navigation";
import AdSection from "./AdvertSectionOne";
import BaseComponentOne from "./BaseComponent";
import BaseComponentTwo from "./BaseComponentTwo";
import useCategory from "./custom-hooks/use-category";
import usePause from "./custom-hooks/use-pause";


const LandingPage = ({
    footerBtn,
    toggleStorevNav }) => {

    const isMenu = useSelector(state => state.isMenu)
    const isSearch = useSelector(state => state.isSearch)
    const isStore = useSelector(state => state.isStore)
    const isSignin = useSelector(state => state.isSignin)
    const activeCategory = useSelector(state => state.activeCategory)

    const [handleToggleCategory, toggleDepartment, toggleInnerDepartment, handleNavBtn] = useCategory()
    const [isPause, handlePause] = usePause()

    const [handleNavigation] = useNavigator()

    const [timeOfDay, setTimeOfDay] = useState('');

    const [innerWidth, setInnerWidth] = useState()

    useEffect(() => {

        toggleStorevNav('STOREMENU-LANDINGPAGE')
        handlePause(false)
        determineTimeOfDay();

        const intervalId = setInterval(determineTimeOfDay, 10000);

        return () => clearInterval(intervalId);
    }, [])

    useEffect(() => {

        toggleEffects()


    }, [innerWidth, activeCategory, isMenu, isSearch, isStore, isSignin])


    // const scrollToTop = () => {

    //     if (isStore || isSearch) {
    //         window.scrollTo({
    //             top: 0,
    //             behavior: 'smooth'
    //         });
    //     }
    // }

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

    const toggleEffects = () => {
        const inventoryContainer = document.querySelector('.inventory');
        const searchButton = document.querySelector('.searchbtn');
        const locationBtn = document.querySelector('.locationbtn');
        const signInBtn = document.querySelector('.signinbtn');
        const mainCont = document.querySelector('.main-container')

        if (window.innerWidth < 830) {

            if (activeCategory && !isMenu) {
                handleNavBtn('menu')

            } else if (activeCategory && isMenu) {
                inventoryContainer.classList.add('active');

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

    return (
        <>
            <NavContent />

            <div className={`navmenu-component ${activeCategory ? 'active' : ''}`}>
                <Navmenu />
            </div>

            <Container fluid className='inventory'>

                <NavBar />

                <MenuComponent />

                <Container fluid className={`main-container`}>
                    <div className="main-div">

                        <div className="main-content">

                            <div className="greetings-div">
                                <h2>Good {timeOfDay}</h2>
                                <p><Link to={'/signIn/signin/user'}>Sign in</Link> for the best experience. Not a customer yet? <Link to={'/signIn/register/user'}>Register</Link></p>
                            </div>

                            <CarouselComponent />


                            <AdSection />


                            {/*<SubAd /> */}

                            <div className="title-section">
                                <h2 className="styled-title">
                                    What's new this week?
                                </h2>
                            </div>

                            <section className="base-component">
                                <div className="base-component-element">
                                    <BaseComponentOne />
                                </div>
                            </section>


                            <div className="title-section">
                                <h2 className="styled-title">
                                    Discover more at Express
                                </h2>
                            </div>



                            <section className="base-component mb-0">
                                <div className="base-component-element-typeTwo">
                                    <BaseComponentTwo />
                                </div>
                            </section>


                            <FooterParagraph />
                        </div>
                    </div >

                    <Footer footerBtn={footerBtn} />
                </Container >

            </Container >
        </>)
}
export default LandingPage