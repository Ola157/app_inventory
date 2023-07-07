import React from 'react';
import { Col, Container, Nav, NavDropdown, Navbar, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";

const UserPage = ({ products, cart, handleAllItem }) => {
    const navigate = useNavigate()
    const user = < BiUserCircle style={{ color: 'white' }} />

    return (<Container fluid className='display pb-5'>
        <Navbar expand="lg" className='bg-black mb-2 icon'>
            <Container className='d-flex justify-content-end'>
                <div className='d-xs-none m-0'>
                    <Nav className="me-auto">
                        {cart.length > 0 ? <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end m-2'><button className='border-0 text-white bg-transparent' onClick={() => navigate('/trolley')}><span className='d-flex justify-content-center align-items-baseline'><sup><h6>{cart.length}</h6></sup><span><AiOutlineShoppingCart style={{ height: '1em', width: '1em' }} /></span></span></button></Col> : ''}
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


        <Row className='d-flex justify-content-evenly my-3'>
            {products ?
                products.map((each, index) => (<Col lg={2} md={3} sm={3} xs={4} className='m-1 text-center pe-0 px-0 border userProducts' key={index}>
                    <img className='img' src={require(`./assets/imgs/${each.image}`)} />
                    <hr className='my-0 w-100'></hr>
                    <span className='itemName'>{each.item}</span>
                    <hr className='my-0 w-100'></hr>
                    {each.editAdd === 'addItem' ?
                        <div className='text-center p-1'><button className='border-0 btnDis' onClick={() => handleAllItem('sub', '', each.id)}> - </button><input className='border text-center' value={each.cusQty} style={{ width: "30px" }} onInput={event => handleAllItem('event', Number(event.target.value), index)} /><button className='border-0 btnDis' onClick={() => handleAllItem('add', '', each.id)}>+</button></div>
                        : <div className='text-center'><button onClick={() => handleAllItem('addItem', '', each.id)} className='py-0 border-1 m-1 rounded btnDis'>Add</button></div>}
                    <hr className='my-0 w-100'></hr>
                    <button className='border-0 py-0 my-1 bg-transparent viewmore' onClick={() => navigate(`/viewmore/${each.id} `)}>view more</button>
                </Col>
                ))
                : ''}
        </Row>

    </Container >)
}
export default UserPage;