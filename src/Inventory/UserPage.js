import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import axios from 'axios';
import { useSelector } from 'react-redux';

const UserPage = ({ handleCart, handleGoods }) => {
    const navigate = useNavigate()
    const user = < BiUserCircle style={{ color: 'white' }} />
    let products = useSelector(state => state.allGoods)
    let [cart, setCartLength] = useState('')

    useEffect(() => {
        if (!products) { handleGoods() }
    }, [])

    useEffect(() => {
        let custQty = products ? products.filter(item => item.customerQuantity > 0) : ''
        setCartLength(custQty)
    }, [products])

    return (<Container fluid className='display pb-5'>
        <Navbar expand="lg" className='bg-black mb-2 icon'>
            <Container className='d-flex justify-content-end'>
                <div className='d-xs-none m-0'>
                    <Nav className="me-auto">
                        {cart.length > 0 ?
                            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end m-2'>
                                <button className='border-0 text-white bg-transparent' onClick={() => navigate('/trolley')}>
                                    <span className='d-flex justify-content-center align-items-baseline'>
                                        <sup>
                                            <h6>
                                                {cart.length}
                                            </h6>
                                        </sup>
                                        <span>
                                            <AiOutlineShoppingCart style={{ height: '1em', width: '1em' }} />
                                        </span>
                                    </span>
                                </button>
                            </Col> : ''}
                        <NavDropdown title={user} id="basic-nav-dropdown" className='bg-black'>
                            <NavDropdown.Item onClick={() => navigate("/adminpage")}>
                                Admin
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </div>

            </Container>
        </Navbar>

        <Row className='m-2'>
            <Col lg={12} md={12} sm={12} xs={12} className='text-center m-2'>
                <h3 className='welcome'>Welcome, Happy Shopping</h3>
            </Col>
        </Row >


        <Row className='d-flex justify-content-evenly my-3 p-2'>
            {products ?
                products.map((item, index) =>
                (<Col lg={2} md={3} sm={3} xs={12} className='m-1 text-center pe-0 px-0 border userProducts' key={index}>
                    {/* <img className='img' src={require(`./assets/imgs/${item.image}`)} /> */}
                    <hr className='my-0 w-100'></hr>
                    <span className='itemName'>{item.item}</span>
                    <hr className='my-0 w-100'></hr>
                    {item.addItem === false ?
                        <div className='text-center p-1'><button className='border-0 btnDis' onClick={() => handleCart('subtract', '', item._id)}> - </button><input className='border text-center' value={item.customerQuantity} style={{ width: "50px" }} onInput={event => handleCart('event', Number(event.target.value), index)} /><button className='border-0 btnDis' onClick={() => handleCart('add', '', item._id)}>+</button></div>
                        : <div className='text-center'><button onClick={() => handleCart('addItem', '', item._id)} className='py-0 border-1 m-1 rounded btnDis'>Add</button></div>}
                    <hr className='my-0 w-100'></hr>
                    <button className='border-0 py-0 my-1 bg-transparent viewmore' onClick={() => navigate(`/viewmore/${item._id} `)}>view more</button>
                </Col>))
                : ''}
        </Row>

    </Container >)
}
export default UserPage;