import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from 'react-redux';

const Trolley = ({ handleCart, handleCheckOut }) => {
    let [total, setTotal] = useState('')
    let product = useSelector(state => state.allGoods)
    let cart = product.filter(good => good.customerQuantity > 0)
    const navigate = useNavigate('')

    useEffect(() => {
        let tota = cart ? cart.reduce((acc, item) => acc + item.customerQuantity * item.price, 0) : ''
        setTotal(tota)
        if (cart.length === 0) {
            navigate('/')
        }
    }, [cart, []])

    return (<Container className='display pb-5'>
        <Navbar expand="lg" className='bg-black mb-2 icon py-4'>

        </Navbar>
        <Row className='pt-3'>
            <Col lg={12} md={12} sm={12} xs={12} className='text-start'><Link to='/' className='d-flex justify-content-start align-items-center' style={{ textDecoration: 'none', color: 'black' }}><BiArrowBack className='m-1' />Back</Link></Col>
        </Row>

        <Row className='d-flex justify-content-between my-5'>

            <Col lg={7} md={6} sm={12} xs={12} className='table-responsive m-1' >
                {cart.length > 0 ?

                    <Table className='bg-white border' >
                        <thead>
                            <tr>
                                <th colSpan={4} className='text-start'>Trolley Summary</th>
                            </tr>
                        </thead>
                        <tbody >
                            {cart.map((item, index) =>
                                <tr key={index} className='d-flex justify-content-evenly align-items-center'>
                                    <td className='d-flex justify-content-center border-0'><img style={{ height: '5em', width: '5em' }} src={`http://localhost:9810/${item.image}`} /></td>
                                    <td className='text-center border-0'>{item.item}</td>
                                    <td className='d-flex justify-content-center align-items-center border-0'>
                                        <button className='border-1 btnTrolley' onClick={() => handleCart('subtract', '', item._id)}>-</button>
                                        <input className='text-center border-0' style={{ width: '2em' }} value={item.customerQuantity} onInput={() => handleCart()} />
                                        <button className='border-1 btnTrolley' onClick={() => handleCart('add', '', item._id)}>+</button>
                                    </td>
                                    <td className='border-0'>${item.customerQuantity * item.price}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table> : ''}
                <button className='border-1 border rounded btnEmpty m-4 py-4' onClick={() => handleCart('empty')}>Empty Trolley</button>
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
        </Row>
    </Container >)
}
export default Trolley;