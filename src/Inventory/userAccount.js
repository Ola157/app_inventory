import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { usehandleNavigation } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from 'react-redux';
import { PiArrowSquareLeftFill } from "react-icons/pi";

const UserAccount = ({ handlePersonalDetails, handleLogOut, handleNavigation }) => {
    let firstNAME = useSelector(state => state.personalDetails.firstName)
    let isLogged = useSelector(state => state.isLogged)
    const [accountLinks, setLinks] = useState([
        { title: 'Personal Details', description: 'Manage Your Personal And Security Details', link: '/mydetails' },
        { title: 'Addresses', description: 'Manage Your Delivery And Billing Address', link: '/address' },
        { title: 'Preferences', description: 'Your marketing and substitution options', link: '/mypref' },
    ])

    useEffect(() => {
        handlePersonalDetails();
    }, []);

    return (<Container fluid className='inventory'>
        <Row className='d-flex justify-content-center align-items-center m-0 navbar '>

            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                <button className='trolley-title-btn' onClick={() => handleNavigation('/')}>
                    Express
                </button>
            </Col>
        </Row>

        <Row className='back-row'>
            <Col className='back-col'>
                <button onClick={() => handleNavigation('/')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>Homepage</span>
                </button>
            </Col>
        </Row>


        <Row className='welcome-section m-2'>
            <Col className='text-center'>
                <div className='header-title'>Welcome, {firstNAME}</div>
                <div className='welcome-subtitle'>Here’s where you’ll find all your account details.</div>
            </Col>
        </Row>

        <Row className='user-action-section m-0'>
            <Col lg={6} className='action-box'>
                <div className='header-title'>My Orders</div>
                <div className='action-description'>Manage scheduled orders and view previous ones.</div>
                <div className='d-flex justify-content-center'>
                    <button className='action-btn' onClick={() => handleNavigation('/allorders')}>
                        See all orders <MdKeyboardArrowRight />
                    </button>
                </div>
            </Col>
        </Row>

        <Row className='user-settings-section m-2'>
            {accountLinks.map((item, index) => (
                <Col lg={3} key={index} className='settings-box'>
                    <button className='settings-btn' onClick={() => handleNavigation(item.link)}>
                        <div className='settings-header'>
                            <span className='settings-title'>{item.title}</span>
                            <MdKeyboardArrowRight />
                        </div>
                        <div className='settings-description'>{item.description}</div>
                    </button>
                </Col>
            ))}
        </Row>

        <footer className="footer-container">
            <Row className='inventory-footer'>
                <Col lg={12} className='text-center'>
                    <p >
                        &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                    </p>
                </Col>
            </Row>
        </footer>
    </Container>
    )
}
export default UserAccount