import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { BiUserCircle } from "react-icons/bi";
import { PiArrowSquareLeftFill } from "react-icons/pi";

const MyPreference = ({ handleUserLogged }) => {
    const navigate = useNavigate('')
    let style = {
        save: { fontWeight: '500', backgroundColor: 'rgb(156, 104, 205)', color: 'white', width: '70%', borderRadius: '2px', border: 'none' },
        cancel: { color: 'white', backgroundColor: 'gray', width: '70%', border: 'none', fontWeight: 'bold', borderRadius: '2px' },
    }

    let userLogged = useSelector(state => state.userLoggedIn)

    useEffect(() => {
        if (!userLogged) {
            navigate('/signup')

        }

    }, [userLogged]);

    const handleLogout = () => {
        localStorage.removeItem('myAccessToken')
        handleUserLogged()
        navigate('/')
    }

    return (<Container fluid className='display pb-5'>
        <Row className='d-flex justify-content-center align-items-center m-0 navbar '>
            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end text-white px-4'>

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
                <button onClick={() => navigate('/useraccount')} className='p-0 border-0 my-1 mx-0 me-0 bg-transparent' style={{ fontSize: '1.3em' }}><PiArrowSquareLeftFill className='my-0 mx-1 me-0 p-0' /><span className='backBtn'>My Account</span></button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
            <Col lg={6} md={6} sm={12} xs={12} className='mb-2'>
                <h4 className='text-center personal_Address'>Groceries preferences</h4>
                <p className='text-center' style={{ fontSize: '.9em' }}> We want to know how you like things done. So here's where you can set your product substitution and marketing communication preferences.</p>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center bg-white'>
            <Col lg={6} md={6} sm={12} xs={12} className='my-4'>
                <h4 className='text-center personal_Address'>Product substitution</h4>
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
                <div className='my-3 text-center'>
                    <button className='py-1' style={style.save} onClick={() => navigate('/useraccount')}>Save Preference</button>
                </div>

                <div className='my-3 text-center'>
                    <button className='py-1' style={style.cancel} onClick={() => navigate('/useraccount')}>Cancel</button>
                </div>
            </Col >
        </Row >
    </Container >)
}
export default MyPreference