import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { MdKeyboardArrowRight } from "react-icons/md";
import { PiArrowSquareLeftFill } from "react-icons/pi";
import useNavigator from './custom-hooks/use-Navigation';

const Records = ({ handleOrderRecords }) => {
    const records = useSelector(state => state.records)
    const message = useSelector(state => state.message)
    const [handleNavigation] = useNavigator()

    useEffect(() => {
        handleOrderRecords()
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
                <button onClick={() => handleNavigation('/useraccount')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>My Account</span>
                </button>
            </Col>
        </Row>

        <Row className='orders-row m-2'>
            <Col className='orders-header' lg={12} md={12} sm={12} xs={12}>My orders</Col>
            {records.length && !message ?
                records.map((order, i) => (
                    <Col key={i} lg={8} md={8} sm={12} xs={12} className='order-container'>
                        <button className='order-toggle' onClick={() => handleNavigation(`/record/${order.cartId}`)}>
                            <span>{i + 1}</span>
                            <span className='order-date'>{order.date}</span>
                            <span className='order-icon'><MdKeyboardArrowRight className='icon' /></span>
                        </button>
                    </Col>))
                :
                <Col className='no-orders' lg={12} md={12} sm={12} xs={12}>
                    <div className='no-orders-text'>You do not currently have any orders in your account</div>
                    <button className='shop-now-btn' onClick={() => handleNavigation('/')}>Start Shopping</button>
                </Col>
            }
        </Row>

        <div className='my-4'>

        </div>
        <footer className="footer-container">
            <Row className='inventory-footer'>
                <Col lg={12} className='text-center'>
                    <p >
                        &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                    </p>
                </Col>
            </Row>
        </footer>
    </Container >)
}
export default Records