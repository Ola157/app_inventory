import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { CiCircleAlert } from "react-icons/ci";

const UserPage = ({ handleCart, handleGoods, handle_Fetch_Cart }) => {
    const navigate = useNavigate()
    let products = useSelector(state => state.allGoods)
    let userLogged = useSelector(state => state.userLoggedIn)
    let [customQty, setCustQty] = useState('')
    let cart = useSelector(state => state.cart)
    let [modal, setModal] = useState("")
    let style = {
        color: 'orange'
    }

    useEffect(() => {
        let checkCart = products ? products.find(good => good.addItem === false) : ''

        if (products.length < 1) {
            handleGoods()
        }
        if (userLogged) {
            handle_Fetch_Cart()
        }

        if (checkCart) {
            if (userLogged === false) {
                navigate('/signIn')
            }
        }
    }, [userLogged, products, cart])



    const handleCustomerQuantiy = (event, itemId) => {
        setCustQty({ event, itemId })
    }

    const handleCartItems = (any, itemId) => {
        const findItem = itemId === customQty.itemId ? customQty : '';
        const checkQtyAvailable = products.find(item => item._id === itemId);
        const { quantity } = checkQtyAvailable;
        if (any === 'buy') {
            if (quantity > 0) {
                setModal(false)
                return handleCart({ any, itemId });

            } else {
                return setModal('Out of Stock, Item to be replenished soon');
            }
        }

        if (any === 'addItem') {
            if (quantity < 1 || !findItem.event) {
                setModal(false)
                return handleCart({ any: true, itemId });
            } else if (findItem.event <= quantity) {
                setModal(false)
                return handleCart({ any, customerQuantity: findItem.event, itemId: findItem.itemId });
            } else {
                handleCart({ any: true, itemId });
                return setModal(`Limited Stock, Only ${quantity} available`)
            }
        }
    };

    const handleToggle = () => {
        setModal(false)
    }

    return (<Container fluid className='display pb-5'>
        <Navbar expand="lg" className='bg-black mb-2 icon'>
            <Container className='d-flex justify-content-end'>
                <div className='d-xs-none m-0'>
                    <Nav className="me-auto d-flex justify-content-between align-items-baseline">
                        {cart ?
                            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end m-2'>
                                <button className='border-0 text-white bg-transparent' onClick={() => navigate('/trolley')}>
                                    <span className='d-flex justify-content-center align-items-baseline'>
                                        <sup>
                                            <h6>
                                                {cart.length === 0 ? '' : cart.length}
                                            </h6>
                                        </sup>
                                        <span>
                                            {cart.length === 0 ? '' : <AiOutlineShoppingCart style={{ height: '1em', width: '1em' }} />}
                                        </span>
                                    </span>
                                </button>
                            </Col>
                            : ''}
                        <div className='bg-black' onClick={userLogged ? () => navigate("/useraccount") : () => navigate("/signIn")}>
                            < BiUserCircle style={{ color: 'white' }} />
                        </div>
                    </Nav>
                </div>

            </Container>
        </Navbar>

        {modal ?
            <Row className='d-flex justify-content-center'>
                <Col className='border py-1 d-flex justify-content-between align-items-center px-1 pe-1 modalAlert' lg={3} md={3} sm={3} xs={4}>
                    <span className='px-1 py-1'><CiCircleAlert style={{ color: 'red' }} /></span>
                    <span className='px-1 pe-1 py-1' style={style}>{modal}</span>
                    <button className='bg-transparent border-0 pe-1 py-1' style={{ color: 'red' }} onClick={handleToggle}>
                        x
                    </button>
                </Col>
            </Row>
            : ''}


        <Row className='d-flex justify-content-evenly my-3 p-2'>
            {products ?
                products.map((item, index) =>
                (<Col lg={2} md={3} sm={3} xs={12} className='m-1 text-center pe-0 px-0 border userProducts' key={index}>
                    {/* <img className='img' src={`https://inventory-be-seven.vercel.app/${item.image}`} /> */}

                    {/* <hr className='my-0 w-100'></hr> */}
                    <span className='itemName my-2'>{item.item}</span>
                    <hr className='my-0 w-100 itemLine my-2'></hr>
                    <div className='d-flex justify-content-center p-1'>
                        {item.addItem === false ?
                            <input className='border text-center mx-1 border rounded' style={{ width: "50px", height: '25px' }} onChange={event => handleCustomerQuantiy(Number(event.target.value), item._id)} />
                            : ''}
                        <button className='border-0 btnDis me-1 border rounded'
                            style={{ width: "50px", height: '25px' }}
                            onClick={item.addItem === false ?
                                () => handleCartItems('addItem', item._id)
                                :
                                () => handleCartItems('buy', item._id)
                            }> {item.addItem === false ? 'Add' : 'Buy'}
                        </button>
                    </div>
                    < hr className='my-0 w-100 itemLine my-2' ></hr>
                    <button className='border-0 py-0 my-2 bg-transparent viewmore' onClick={() => navigate(`/viewmore/${item._id} `)}>view more</button>
                </Col >))
                : ''}
        </Row >

    </Container>)
}
export default UserPage; 