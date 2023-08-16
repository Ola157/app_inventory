import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { PiWarningOctagonFill } from "react-icons/pi";

const Trolley = ({ handleCart, handleCheckOut, handle_Fetch_Cart, handle_Modal }) => {
    const navigate = useNavigate('')
    let cart = useSelector(state => state.cart)
    let modal = useSelector(state => state.modal)
    let [total, setTotal] = useState(cart ? cart.reduce((acc, item) => acc + item.customerQuantity * item.price, 0) : [])
    let style = {
        color: 'blueviolet'
    }

    useEffect(() => {
        handle_Fetch_Cart()
        let interval
        if (cart.length < 1) {
            interval = setTimeout(() => {
                navigate('/')
            }, 500)
        }
        return clearTimeout(interval)
    }, [cart])


    return (<Container className='display pb-5'>
        <Navbar expand="lg" className='bg-black mb-2 icon py-4'>

        </Navbar>

        {modal &&
            <Row className='d-flex justify-content-center'>
                <Col className="d-flex justify-content-between align-items-baseline bg-white mx-2 me-2 py-3" lg={4} md={6} sm={12} xs={12}>
                    {modal == 'payment successful, thanks for shopping with us' ? '' : <span><PiWarningOctagonFill style={{ color: 'red' }} /></span>}
                    <div style={style}>{modal}</div>
                    <button className="border-0 bg-transparent" aria-label="Close">
                    </button>
                </Col>
            </Row>
        }

        {cart.length > 0 ?
            <>
                <Row className='pt-3'>
                    <Col lg={12} md={12} sm={12} xs={12} className='text-start'><Link to='/' className='d-flex justify-content-start align-items-center' style={{ textDecoration: 'none', color: 'black' }}><BiArrowBack className='m-1' />Back</Link></Col>
                </Row>

                <Row className='d-flex justify-content-between my-5'>
                    <Col lg={7} md={6} sm={12} xs={12} className='table-responsive m-1' >
                        {cart ?
                            < Table className='bg-white border' >
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
                                                {item.customerQuantity}
                                            </td>
                                            <td className='border-0'>${item.customerQuantity * item.price}</td>
                                            <td className='border-0'><button className='border-0 bg-transparent' onClick={() => handleCart({ any: 'removeItem', itemId: item._id })}>X</button></td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table> : ''}
                        <button className='border-1 border rounded btnEmpty m-4 py-4' onClick={() => handleCart({ any: 'empty' })}>Empty Trolley</button>
                    </Col>

                    <Col lg={4} md={6} sm={12} xs={12} className='table-responsive m-1 mt-5'>

                        <Table bordered className='bg-white'>
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
                                    <td className='w-100'><button className='py-1 my-1 mx-1 me-1 text-center border-1 w-100 btnTrolley' onClick={() => handleCheckOut()}>Proceed To Pay</button></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row >
            </>
            : <Row className='d-flex justify-content-center'>
                <Col className='text-center bg-white my-4 py-2' lg={4} md={6} sm={12} xs={12}>
                    <span style={style}>Cart Empty</span>
                </Col>
            </Row>}
    </Container >)
}
export default Trolley;