import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PiArrowSquareLeftFill } from 'react-icons/pi'
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { GiCompass } from "react-icons/gi";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { RiTiktokLine } from "react-icons/ri";
import { FaPinterest } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";
import { MdOutlineArrowBackIos } from "react-icons/md";
import Footer from './Footer'
import NavBar from './navbar/Navbar'
import NavContent from './navbar/NavStoreContent'
import Navmenu from './navbar/Navmenu'
import MenuComponent from './navbar/MenuComponent'

const RegistrationPage = ({
    handleAuthentication,
    handleAddClick,
    handleIncomingMessage,
    handleNavigation,
    navBtn,
    toggleCategory,
    footerBtn }) => {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [title, setTitle] = useState('')
    let [mobileNumber, setMobileNumber] = useState('')
    const isLogged = useSelector(state => state.isLogged)
    const { page, itemId } = useParams()
    const message = useSelector(state => state.message)
    let [isClickRegister, setRegister] = useState(false)
    const isMenu = useSelector(state => state.isMenu)
    const activeCategory = useSelector(state => state.activeCategory)

    useEffect(() => {
        homePageReturn();
    }, [isLogged])


    useEffect(() => {
        if (page === 'register') {
            setRegister(true)
        }

        let inventoryNav = document.querySelector('.inventoryNav')
        let respondLi = document.querySelector('.responding-li')
        let menuContent = document.querySelector('.menu-content')

        respondLi.classList.add('bg-switch')
        menuContent.classList.add('shortHeight')
        inventoryNav.classList.add('height-reduction')

    }, [])

    const homePageReturn = () => {
        if (!isLogged) {
            return;
        }
        else if (page === 'viewmore') {
            handleNavigation(`/viewmore/${itemId}`);
        } else if (page === 'homepage' && itemId) {
            handleAddClick({ itemId, newUserQuantity: 0 });
            handleNavigation('/');
        } else if (page === 'homepage') {
            handleNavigation('/');
        }
    };

    const handleAuth = (type) => {
        if (email && password) {
            setEmail('')
            setPassword('')
            setFirstName('')
            setLastName('')
            setTitle('')
            setMobileNumber('')
            return handleAuthentication({ type, email, title, password, firstName, lastName, mobileNumber })
        }
        else {
            handleIncomingMessage('inputs cant be blank')
        }
    }

    return (<Container fluid className='inventory'>

        <NavBar toggleCategory={toggleCategory}
            activeCategory={activeCategory}
            page={page}
            navBtn={navBtn}
            handleNavigation={handleNavigation} />

        <MenuComponent
            page={page}
            navBtn={navBtn}
            handleNavigation={handleNavigation} />

        <section className={`authentication-section ${isMenu ? 'active' : ''}`}>

            <div className='authentication-content'>
                <div className='return-div'>
                    <p onClick={() => handleNavigation('/')}><MdOutlineArrowBackIos size={18} /> <span>Back to Express.com</span></p>
                </div>
                <div className='signin-intro'>
                    {!isClickRegister ?
                        <h2>Sign in to your account</h2>
                        :
                        <>
                            <h2>Register</h2>
                            <p className='m-0'>Let's get you up and running with your online Express account. We just need a few details.</p>
                        </>}

                    {!isClickRegister ?
                        <p>New to Express? <a onClick={() => setRegister(true)}> Register for an account</a></p>
                        :
                        <p>Already got an account? <a onClick={() => setRegister(false)}> Sign in</a></p>
                    }
                </div>
                <div className='signin-div'>
                    {isClickRegister && <h3 className='py-2'>Account details</h3>}
                    <div>
                        <label htmlFor='email'>Email address</label>
                        <input id='email' value={email}
                            placeholder='e.g name@email.com'
                            onInput={event => setEmail(event.target.value)} type='email' required />
                    </div>
                    <div>
                        <label htmlFor='password'>{!isClickRegister ? 'Password' : 'Set Password'}</label>
                        <input id='password' value={password}
                            onInput={event => setPassword(event.target.value)} type='password' required />
                    </div>

                    {isClickRegister &&
                        <div className='registration-div'>
                            <hr></hr>
                            <h3>Personal details</h3>
                            <div>
                                <label>Title</label>
                                <select value={title} onInput={event => setTitle(event.target.value)}>
                                    <option value="">Select</option>
                                    <option value="mr">Mr</option>
                                    <option value="mr">Mrs</option>
                                    <option value="mr">Miss</option>
                                    <option value="mr">Ms</option>
                                </select>
                            </div>
                            <div>
                                <label>First Name</label>
                                <input value={firstName} onInput={event => setFirstName(event.target.value)} />
                            </div>

                            <div>
                                <label>Last Name</label>
                                <input value={lastName} onInput={event => setLastName(event.target.value)} />
                            </div>

                            <div>
                                <label>Mobile Number</label>
                                <input value={mobileNumber} onInput={event => setMobileNumber(event.target.value)} />
                            </div>

                        </div>
                    }

                    <div>
                        {!isClickRegister && <a>I've forgotten my password</a>}
                        <button onClick={() => handleAuth(!isClickRegister ? 'login' : 'signup')}>
                            {!isClickRegister ? 'Log In' : 'Create account'}
                        </button>
                    </div>

                    {isClickRegister &&
                        <div className='registration-term'>
                            <p>By creating an Express account you're agreeing to our terms and conditions. Read our privacy and cookies policy to find out how we collect and use your personal data.</p>
                        </div>
                    }
                </div>
            </div>

        </section>


        <Footer footerBtn={footerBtn} />
    </Container >)
}
export default RegistrationPage