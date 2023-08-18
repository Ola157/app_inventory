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

    return (<Container fluid className='display pb-5'>
        <Row className='d-flex justify-content-center align-items-center m-0 navbar '>
            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end text-white mx-0 me-0 w-100'>

                {userLogged && (
                    <button className='border-0 bg-transparent d-flex justify-content-end align-items-center mx-1' onClick={() => navigate("/useraccount")}>
                        <BiUserCircle style={{ color: 'black' }} />
                        <span style={{ fontWeight: 'bold' }} className='text-black navaccount m-1'>My account</span>
                    </button>
                )}

                <button
                    className='border-0 bg-transparent navaccount text-black d-flex justify-content-center align-items-center me-2 mx-1'
                    onClick={userLogged ? () => handleLogout() : () => navigate("/signIn")}
                    style={{ fontWeight: 'bold' }}
                >
                    {userLogged ? 'Logout' : 'Login/register'}
                </button>
            </Col>

            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-start text-white px-4'>
                <button className='border-0 bg-transparent' onClick={() => navigate('/')}>
                    <h2 style={{ color: 'blueviolet' }}>Express</h2>
                </button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-start align-items-center'>
            <Col className='p-0 mx-3 my-1' lg={2} md={2} sm={2} xs={2}>
                <button onClick={() => navigate('/')} className='p-0 border-0 my-1 mx-0 me-0 bg-transparent' style={{ fontSize: '1.3em' }}><PiArrowSquareLeftFill className='my-0 mx-1 me-0 p-0' /><span className='backBtn'>Homepage</span></button>
            </Col>
        </Row>

        <Row>
            <Col className='text-center'>
                <div className='my-2 userpage'>Welcome {firstNAME}</div>
                <div className='my-2'>Here’s where you’ll find all your account details</div>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
            <Col className='text-center myOrders my-3 mx-2 me-2' lg={6} md={6} sm={12} xs={12}>
                <div className='my-3 userpage'>My Orders</div>
                <div className='my-3'>Manage scheduled orders and view previous ones</div>
                <button className='my-3 py-2 userAccount' onClick={() => navigate('/allorders')}><span>See all orders</span><span><MdKeyboardArrowRight /></span></button>
            </Col>
        </Row >

        <Row className='d-flex justify-content-between'>
            <Col lg={4} md={4} sm={12} xs={12} className='my-3 mx-0 me-0'>
                <button className='border-0 bg-white w-100 h-100 text-start py-2' onClick={() => navigate('/mydetails')}>
                    <div className='personal_Address d-flex justify-content-between'><span>Personal Details</span> <span><MdKeyboardArrowRight /></span></div>
                    <div>Manage Your Personal And Security Details</div>
                </button>
            </Col>

            <Col lg={4} md={4} sm={12} xs={12} className='my-3 mx-0 me-0'>
                <button className='border-0 bg-white w-100 h-100 text-start py-2' onClick={() => navigate('/address')}>
                    <div className='personal_Address d-flex justify-content-between'><span>Addresses</span> <span><MdKeyboardArrowRight /></span></div>
                    <div>Manage Your Delivery And Billing Address</div>
                </button>
            </Col>

            <Col lg={4} md={4} sm={12} xs={12} className='my-3 mx-0 me-0'>
                <button className='border-0 bg-white w-100 h-100 text-start py-2' onClick={() => navigate('/mypref')}>
                    <div className='personal_Address d-flex justify-content-between'><span>Preferences</span> <span><MdKeyboardArrowRight /></span></div>
                    <div>Your marketing and substitution options</div>
                </button>
            </Col>


        </Row >

    </Container >)
}
export default UserAccount