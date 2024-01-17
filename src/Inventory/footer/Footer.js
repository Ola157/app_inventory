import React from "react";
import { useSelector } from "react-redux";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { RiTiktokLine } from "react-icons/ri";
import { FaPinterest } from "react-icons/fa6";
import { FaSquareYoutube } from "react-icons/fa6";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Footer = ({ footerBtn }) => {

    const isHelp = useSelector(state => state.isHelp)
    const isAbout = useSelector(state => state.isAbout)
    const isWebsite = useSelector(state => state.isWebsite)
    const isLink = useSelector(state => state.isLink)


    return (
        <footer>
            <div className="footer-content">
                <div className="footer-div-ul">
                    <ul>
                        <li className={`eventli ${isHelp ? 'active' : ''}`} onClick={() => footerBtn('help')}>
                            <span>Here to help</span>
                            <span><MdOutlineArrowForwardIos size={25} className="d-sm-block d-md-none" /></span>
                        </li>

                        <div className={`spanhidden ${isHelp ? 'active' : ''}`}>
                            <li><span>Help & FAQs</span> <span><MdOutlineArrowForwardIos size={25} className="d-sm-block d-md-none" /></span></li>
                            <li><span>Contact us</span> <span><MdOutlineArrowForwardIos size={25} className="d-sm-block d-md-none" /></span></li>
                        </div>
                    </ul>

                    <ul>
                        <li className={`eventli ${isAbout ? 'active' : ''}`} onClick={() => footerBtn('about')}>
                            <span>About Express</span>
                            <span><MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span>
                        </li>

                        <span className={`spanhidden ${isAbout ? 'active' : ''}`}>

                            <li><span>Store vacancies</span><span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li>
                            <li><span>Careers</span> <span><MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li>
                            <li><span>PLC</span> <span><MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li>
                            <li><span>Sustainability</span> <span><MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li >
                            <li><span>Our little helps</span> <span><MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li >
                        </span >
                    </ul >


                    <ul>
                        <li className={`eventli ${isWebsite ? 'active' : ''}`} onClick={() => footerBtn('website')}>
                            <span>Our website</span>
                            <span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span>
                        </li>

                        <span className={`spanhidden ${isWebsite ? 'active' : ''}`}>
                            <li><span>Terms & Conditions</span> <span><MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li >
                            <li><span>Privacy & Cookie Policy</span> <span><MdOutlineArrowForwardIos size={25} className="d-sm-block d-md-none" /></span></li >
                            <li><span>Privacy Center</span><span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li >
                            <li><span>Site map</span> <span><MdOutlineArrowForwardIos size={25} className="d-sm-block d-md-none" /></span></li >
                            <li><span>Accessibility</span><span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li >
                        </span>
                    </ul >

                    <ul>
                        <li className={`eventli ${isLink ? 'active' : ''}`} onClick={() => footerBtn('links')}>
                            <span>Useful links</span>
                            <span><MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span>
                        </li>

                        <span className={`spanhidden ${isLink ? 'active' : ''}`}>
                            <li><span>Pharmacy</span> <span><MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li>
                            <li><span>Product recall</span> <span><MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li>
                            <li><span>Store locator</span> <span><MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li>
                            <li><span>Bags of Help</span> <span><MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li>
                            <li><span>Rate this page</span><span> <MdOutlineArrowForwardIos size={25} className=" d-sm-block d-md-none" /></span></li>
                        </span>
                    </ul >
                </div >

                <p>
                    Follow us  <FaFacebookF size={30} />
                    <FaInstagram size={30} />
                    <FaPinterest size={30} />
                    <IoLogoTwitter size={30} />
                    <RiTiktokLine size={30} />
                    <FaSquareYoutube size={30} />
                </p>
            </div >
            <div className="rights-div">
                <p >
                    &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                </p>
            </div>
        </footer >
    )
}

export default Footer