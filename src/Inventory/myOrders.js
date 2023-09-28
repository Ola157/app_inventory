import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { PiArrowSquareLeftFill } from "react-icons/pi";

const AllOrders = ({ handleDisplay, handleFetchPastOrder, handleUserLogged }) => {
    const navigate = useNavigate()
    let allOrders = useSelector(state => state.allOrders)
    let userLogged = useSelector(state => state.userLoggedIn)

    useEffect(() => {
        if (!userLogged) {
            navigate('/signup')

        }
        if (!allOrders.length) {
            handleFetchPastOrder()
        }
    }, [userLogged, allOrders]);

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
                <button onClick={() => navigate('/useraccount')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>My Account</span>
                </button>
            </Col>
        </Row>

        <Row className='orders-row'>
            <Col className='orders-header' lg={12} md={12} sm={12} xs={12}>My orders</Col>
            {allOrders.length ?
                allOrders.map((order, i) => (
                    <Col key={i} lg={8} md={8} sm={12} xs={12} className='order-container'>
                        <button className='order-toggle' onClick={() => handleDisplay(order._id)}>
                            <span className='order-date'>{order.date}</span>
                            <span className='order-icon'><MdKeyboardArrowRight className='icon' /></span>
                        </button>
                        {order.showOrder &&
                            <Row className='justify-content-center'>
                                <Col className='order-details' lg={9} md={6} sm={12} xs={12}>
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th>Image</th>
                                                <th>Item</th>
                                                <th>Quantity</th>
                                                <th>Cost</th>
                                            </tr>
                                        </thead>
                                        {order.cart.map((data, index) => (
                                            <tbody key={index}>
                                                <tr>
                                                    <td className='item-image'>
                                                        <img src={`https://inventory-be-seven.vercel.app/${order.image}`} alt={`Item ${index}`} />
                                                    </td>
                                                    <td className='item-name'>{data.item}</td>
                                                    <td className='item-quantity'>{data.customerQuantity}</td>
                                                    <td className='item-cost'>{data.price * data.customerQuantity}</td>
                                                </tr>
                                            </tbody>
                                        ))}
                                    </Table>
                                </Col>
                            </Row>
                        }
                    </Col>
                ))
                :
                <Col className='no-orders' lg={12} md={12} sm={12} xs={12}>
                    <div className='no-orders-text'>You do not currently have any orders in your account</div>
                    <button className='shop-now-btn' onClick={() => navigate('/')}>Start Shopping</button>
                </Col>
            }
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
    </Container >)
}
export default AllOrders