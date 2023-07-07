import React, { useEffect, useState } from 'react';
import { Col, Container, Navbar, Row, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

const Trolley = ({ cart, handleAllItem }) => {
    let [total, setTotal] = useState('')

    useEffect(() => {
        let tota = cart ? cart.reduce((acc, a) => acc + a.cusQty * a.price, 0) : ''
        setTotal(tota)
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
                            {cart.map((a, index) =>
                                <tr key={index} className='d-flex justify-content-evenly align-items-center'>
                                    <td className='d-flex justify-content-center border-0'><img style={{ height: '5em', width: '5em' }} src={require(`./assets/imgs/${a.image}`)} /></td>
                                    <td className='text-center border-0'>{a.item}</td>
                                    <td className='d-flex justify-content-center align-items-center border-0'>
                                        <button className='border-1 btnTrolley' onClick={() => handleAllItem('sub', '', a.id)}>-</button>
                                        <input className='text-center border-0' style={{ width: '2em' }} value={a.cusQty} onInput={() => handleAllItem()} />
                                        <button className='border-1 btnTrolley' onClick={() => handleAllItem('add', '', a.id)}>+</button>
                                    </td>
                                    <td className='border-0'>${a.cusQty * a.price}</td>
                                </tr>
                            )}
                        </tbody>
                    </Table> : ''}
                <button className='border-1 border rounded btnEmpty m-4 py-4' onClick={() => handleAllItem('empty')}>Empty Trolley</button>
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
                            <td className='w-100'><button className='py-1 my-1 mx-1 me-1 text-center border-1 w-100 btnTrolley' onClick={() => handleAllItem('checkOut')}>Proceed To Pay</button></td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    </Container >)
}
export default Trolley;