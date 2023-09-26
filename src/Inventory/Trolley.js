import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PiWarningOctagonFill } from "react-icons/pi";
import { PiArrowSquareLeftFill } from "react-icons/pi";

const Trolley = ({ handleCart, handleCheckOut, handle_Fetch_Cart, handle_Modal }) => {
    const navigate = useNavigate('')
    let cart = useSelector(state => state.cart)
    let modal = useSelector(state => state.modal)
    let [total, setTotal] = useState('')


    useEffect(() => {
        const updateCartTotal = cart.reduce((acc, item) => acc + item.customerQuantity * item.price, 0);
        setTotal(updateCartTotal);

        handle_Fetch_Cart();

        let timeoutId;
        if (!cart.length) {
            timeoutId = setTimeout(() => {
                handle_Modal()
                navigate('/');
            }, 500);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [cart]);

    return (<Container fluid className='inventory'>
        <Navbar className='trolley-navbar'>
            <Col className='d-flex justify-content-start text-white px-4'>
                <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                    <button className='trolley-title-btn' onClick={() => navigate('/')}>
                        Express
                    </button>

                </Col>
            </Col>
        </Navbar>

        <Row className='back-row'>
            <Col className='back-col'>
                <button onClick={() => navigate('/')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>Homepage</span>
                </button>
            </Col>
        </Row>

        {modal && (
            <Row className='trolley-modal-row'>
                <Col lg={4} md={6} sm={12} xs={12} className='trolley-modal-col'>
                    {modal !== 'payment successful, thanks for shopping with us' && <PiWarningOctagonFill />}
                    <div>{modal === 'payment successful, thanks for shopping with us' || modal === 'payment unsuccessful ' ? modal : ''}</div>
                </Col>
            </Row>
        )}

        {cart.length > 0 ? (
            <>
                <Row className='trolley-summary-row'>
                    <Col lg={7} md={6} sm={12} xs={12}>
                        <Table className='trolley-table'>

                            <thead>
                                <tr>
                                    <th colSpan={4} className='text-start'>Trolley Summary</th>
                                </tr>
                            </thead>
                            <tbody >
                                {cart.map((item, index) =>
                                    <tr key={index} className='d-flex justify-content-evenly align-items-center'>
                                        {/* <td className='d-flex justify-content-center border-0'><img style={{ height: '5em', width: '5em' }} src={`https://inventory-be-seven.vercel.app/${item.image}`} /></td> */}
                                        <td className='text-center border-0'>{item.item}</td>
                                        <td className='d-flex justify-content-center align-items-center border-0'>
                                            <input className='border text-center' style={{ width: "2em", height: '2em' }}
                                                value={item.customerQuantity}
                                                readOnly />
                                        </td>
                                        <td className='border-0'>${item.customerQuantity * item.price}</td>
                                        <td className='border-0 text-center'><button className='border-0 bg-transparent' onClick={() => handleCart('removeItem', item._id)}>X</button></td>
                                    </tr>
                                )}
                            </tbody>
                        </Table> <button className='btn-empty' onClick={() => handleCart('empty')}>Empty Trolley</button>
                    </Col>
                    <Col lg={4} md={6} sm={12} xs={12}>
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
    </Container>)
}
export default Trolley;