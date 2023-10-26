import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { usehandleNavigation } from 'react-router-dom'
import { BiUserCircle } from "react-icons/bi";
import { PiArrowSquareLeftFill } from "react-icons/pi";

const MyPreference = ({ handleLogOut, handleNavigation }) => {
    const isLogged = useSelector(state => state.isLogged)

    return (<Container fluid className='inventory'>
        <Row className='d-flex justify-content-center align-items-center m-0 navbar '>
            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                <button className='trolley-title-btn' onClick={() => handleNavigation('/')}>
                    Express
                </button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-start align-items-center'>
            <Col className='back-col'>
                <button onClick={() => handleNavigation('/useraccount')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>My Account</span>
                </button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
            <Col lg={6} md={6} sm={12} xs={12} className='mb-2'>
                <h4 className='header-title'>Groceries preferences</h4>
                <p className='text-center' style={{ fontSize: '.9em' }}> We want to know how you like things done. So here's where you can set your product substitution and marketing communication preferences.</p>
            </Col>
        </Row>

        <Row className='user-action-section'>
            <Col lg={6} className='action-box'>
                <h4 className='header-title'>Product substitution</h4>
                <p className='text-start' style={{ fontSize: '.9em' }}>  If an item in your online order isn't available, we can substitute it with another similar product. And if you're not happy with the substitute item, you can just return it on the spot to your delivery driver for a full refund.

                    Please note that any changes you make to your preference will automatically update any pending orders.
                </p>
                <div className='px-5'>
                    <Col className='d-flex align-items-baseline'><input name='option' type='radio' className='me-2' /><span>Yes, please bring me substitutes if items aren' t available.</span></Col>
                    <Col className='d-flex align-items-baseline'><input name='option' type='radio' className='me-2' /><span>No, don' t bring me any substitutes if items aren't available. </span></Col>
                </div>
            </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
            <Col lg={4} md={6} sm={6} xs={8}>
                <div className='centered-button-section'>
                    <button className='action-button save-button' onClick={() => handleNavigation('/useraccount')}>Save Preference</button>
                </div>

                <div className='centered-button-section'>
                    <button className='action-button cancel-button' onClick={() => handleNavigation('/useraccount')}>Cancel</button>
                </div>
            </Col >
        </Row >
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
    </Container >)
}
export default MyPreference