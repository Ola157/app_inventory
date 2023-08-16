import React, { useEffect } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from 'react-redux';

const UserAccount = ({ handleMyDetails }) => {
    const navigate = useNavigate()
    let firstNAME = useSelector(state => state.personalDetails.firstName)

    useEffect(() => {
        if (true) {
            handleMyDetails();
        }
    }, [])


    return (<Container fluid className='display'>
        <Navbar expand="lg" className='navbar'>
            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-start text-white px-4'>
                <button className='border-0 bg-transparent' onClick={() => navigate('/')}>
                    <h2 style={{ color: 'blueviolet' }}>Express</h2>
                </button>
            </Col>
        </Navbar>

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