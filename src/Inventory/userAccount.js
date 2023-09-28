import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from 'react-redux';
import { BiUserCircle } from "react-icons/bi";
import { PiArrowSquareLeftFill } from "react-icons/pi";

const UserAccount = ({ handleMyDetails, handleUserLogged }) => {
    const navigate = useNavigate()
    let firstNAME = useSelector(state => state.personalDetails.firstName)
    let userLogged = useSelector(state => state.userLoggedIn)
    const [accountLinks, setLinks] = useState([
        { title: 'Personal Details', description: 'Manage Your Personal And Security Details', link: '/mydetails' },
        { title: 'Addresses', description: 'Manage Your Delivery And Billing Address', link: '/address' },
        { title: 'Preferences', description: 'Your marketing and substitution options', link: '/mypref' },
    ])

    useEffect(() => {
        if (!userLogged) {
            navigate('/signup')

        }

        if (!firstNAME) {
            handleMyDetails();
        }
    }, [userLogged]);


    const handleLogout = () => {
        localStorage.removeItem('myAccessToken')
        handleUserLogged()
        navigate('/')
    }

    return (<Container fluid className='inventory'>
        <Row className='d-flex justify-content-center align-items-center m-0 navbar '>
            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end text-white mx-0 me-0 w-100'>
                <button
                    className='inventory__navbar-btn'
                    onClick={userLogged ? () => handleLogout() : () => navigate("/signIn")}
                >
                    {userLogged ? 'Logout' : 'Login/register'}
                </button>
            </Col>

            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                <button className='trolley-title-btn' onClick={() => navigate('/')}>
                    Express
                </button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-start align-items-center'>
            <Col className='back-col'>
                <button onClick={() => navigate('/')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>Homepage</span>
                </button>
            </Col>
        </Row>


        <Row className='welcome-section'>
            <Col className='text-center'>
                <div className='header-title'>Welcome, {firstNAME}</div>
                <div className='welcome-subtitle'>Here’s where you’ll find all your account details.</div>
            </Col>
        </Row>

        <Row className='user-action-section'>
            <Col lg={6} className='action-box'>
                <div className='header-title'>My Orders</div>
                <div className='action-description'>Manage scheduled orders and view previous ones.</div>
                <div className='d-flex justify-content-center'>
                    <button className='action-btn' onClick={() => navigate('/allorders')}>
                        See all orders <MdKeyboardArrowRight />
                    </button>
                </div>
            </Col>
        </Row>

        <Row className='user-settings-section'>
            {accountLinks.map((item, index) => (
                <Col lg={3} key={index} className='settings-box'>
                    <button className='settings-btn' onClick={() => navigate(item.link)}>
                        <div className='settings-header'>
                            <span className='settings-title'>{item.title}</span>
                            <MdKeyboardArrowRight />
                        </div>
                        <div className='settings-description'>{item.description}</div>
                    </button>
                </Col>
            ))}
        </Row>
        <footer className="inventory__footer">
            <Container>
                <Row>
                    <Col lg={12} className='text-center'>
                        <p className="inventory__footer-text">
                            &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </Container>
    )
}
export default UserAccount