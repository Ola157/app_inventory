import React, { useEffect } from 'react';
import { Col, Container, Navbar, Row, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { PiArrowSquareLeftFill } from "react-icons/pi";

const Trolley = ({
    cartHandler,
    handleCheckOut,
    handleNavigation,
    handlePullCart }) => {

    const cart = useSelector(state => state.cart)
    const total = useSelector(state => state.total)
    const message = useSelector(state => state.message)

    useEffect(() => {
        handlePullCart()
    }, [])

    return (<Container fluid className='inventory'>
        <Navbar className='trolley-navbar'>
            <Col className='d-flex justify-content-start text-white px-4'>
                <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                    <button className='trolley-title-btn' onClick={() => handleNavigation('/')}>
                        Express
                    </button>

                </Col>
            </Col>
        </Navbar>

        <Row className='back-row'>
            <Col className='back-col'>
                <button onClick={() => handleNavigation('/')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>Homepage</span>
                </button>
            </Col>
        </Row>

        {message && (
            <Row className='trolley-modal-row'>
                <Col lg={4} md={6} sm={12} xs={12} className='trolley-modal-col'>
                    {message}
                </Col>
            </Row>
        )}

        {cart.length > 0 ? (
            <>
                <Row className='trolley-summary-row'>
                    <Col sm={12} xs={12} lg={6} md={6} className='table-responsive'>
                        <Table className='trolley-table'>

                            <thead>
                                <tr>
                                    <th colSpan={4} className='text-start'>Trolley Summary</th>
                                </tr>
                            </thead>
                            <tbody >
                                {cart.map((item, index) =>
                                    <tr key={index} className='d-flex justify-content-evenly align-items-center'>

                                        <td className='d-flex justify-content-center border-0 d-block d-md-none'>
                                            <img style={{ width: '1.6em', height: '2em' }} src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/inventory/${item.image}`} />
                                        </td>
                                        <td className='d-flex justify-content-center border-0 d-none d-md-block'>
                                            <img style={{ width: '5em', height: '5em' }} src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/inventory/${item.image}`} />
                                        </td>
                                        <td className='text-center border-0'>{item.item}</td>
                                        <td className='d-flex justify-content-center align-items-center border-0'>
                                            <input className='border text-center' style={{ width: "3em", height: '2em' }}
                                                value={item.userQuantity}
                                                readOnly />
                                        </td>
                                        <td className='border-0'>${item.userQuantity * item.price}</td>
                                        <td className='border-0 text-center'><button className='border-0 bg-transparent' onClick={() => cartHandler('removeItem', item.itemId)}>X</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                        <button className='btn-empty' onClick={() => cartHandler('clearcart')}>Clear Cart</button>
                    </Col>

                    <Col sm={12} xs={12} lg={4} md={4} className='table-responsive'>
                        <Table bordered className='order-summary-table'>
                            <thead>
                                <tr>
                                    <th>Order Summary</th>
                                </tr>
                                <tr>
                                    <th className='d-flex justify-content-between'><span>Trolley</span><span>${total}</span></th>
                                </tr>
                                <tr>
                                    <th className='d-flex justify-content-between'><span>Total to pay</span><span>${total}</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='d-flex justify-content-center'>
                                    <td className='w-100'><button className='py-1 my-1 mx-1 me-1 text-center border-1 w-100 btn-empty' onClick={() => handleCheckOut()}>Proceed To Pay</button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>

                </Row>
            </>
        ) : (
            <Row className='trolley-empty-row'>
                <Col lg={4} md={6} sm={12} xs={12} className='text-center'>
                    <span>Cart Empty</span>
                </Col>
            </Row>
        )}
        <footer className="footer-container">
            <Row className='inventory-footer'>
                <Col lg={12} className='text-center'>
                    <p >
                        &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                    </p>
                </Col>
            </Row>
        </footer>

    </Container>)
}
export default Trolley;