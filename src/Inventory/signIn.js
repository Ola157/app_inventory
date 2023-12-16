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

const RegistrationPage = ({
    handleAuthentication,
    handleAddClick,
    handleIncomingMessage,
    handleNavigation,
    navBtn,
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
    const isLink = useSelector(state => state.isLink)
    const isWebsite = useSelector(state => state.isWebsite)
    const isHelp = useSelector(state => state.isHelp)
    const isAbout = useSelector(state => state.isAbout)


    useEffect(() => {
        homePageReturn();
    }, [isLogged])


    useEffect(() => {
        if (page === 'register') {
            setRegister(true)
        }

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
        <nav className={`inventory-nav signin-nav ${isMenu ? 'active' : ''}`}>

            <div className="user-div">
                <div className="user-logdiv">
                    <button onClick={() => handleNavigation('/')}>Express.com</button>
                    <button>Contact us</button>
                    <button>Help</button>
                    <button><span>Feedback</span></button>
                </div>
            </div>

            <div className={`inventory-brand ${isMenu ? 'active' : ''}`}>
                <div className="inventory-brand-div">
                    <h4>Express</h4>
                </div>
            </div>

            <div className="menu-div">
                <button className={isMenu ? 'active' : ''} onClick={() => navBtn('menu')}>Menu
                    <MdKeyboardArrowDown size={25} />
                </button>
            </div>

            <div className="menu-container">

                <div className={`menu-content ${isMenu ? 'active' : ''}`}>
                    <ul className="menu-content-ul menu-signin-content">
                        <li className='d-none'><button><span>Groceries</span> <span></span><MdArrowForwardIos /></button></li>
                        <li className='d-none'><button><span>F&F Clothing </span><span><MdArrowForwardIos /></span></button></li>
                        <li className='d-none'><button><span>Express Clubcard</span> <span><MdArrowForwardIos /></span></button></li>
                        <li className='d-none'><button><span>Express Bank</span> <span><MdArrowForwardIos /></span></button></li>
                        <li className='d-none'><button><span>Express Mobile</span> <span><MdArrowForwardIos /></span></button></li>
                        <li className='d-none'><button><span>Recipes</span> <span><MdArrowForwardIos /></span></button></li>
                        <li><button onClick={() => handleNavigation('/')}>Express.com</button></li>
                        <li><button>Contact us</button></li>
                        <li><button>Help</button></li>
                        <li><button><span>Feedback</span></button></li>
                    </ul>
                </div>

            </div>
        </nav>

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


        <footer>
            <div className="footer-content">
                <div className="footer-div-ul">
                    <ul>
                        <li className={`eventli ${isHelp ? 'active' : ''}`} onClick={() => footerBtn('help')}>
                            <span>Here to help</span>
                            <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" />
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
export default RegistrationPage