import React, { useState, useEffect } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { CiCircleAlert } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { PiArrowSquareLeftFill } from "react-icons/pi";
import { MdOutlineCancel } from "react-icons/md";

const ViewMore = ({ handleCart, handle_Fetch_Cart, handleUserLogged }) => {
    const { itemId } = useParams();
    let products = useSelector(state => state.allGoods)
    let findViewed = products.find(good => good._id === itemId)
    let { item, detail, image, _id, addItem, customerQuantity } = findViewed
    let userLogged = useSelector(state => state.userLoggedIn)
    let navigate = useNavigate()
    let [modal, handleToggle] = useState("")
    let cart = useSelector(state => state.cart)
    let [total, setTotal] = useState('')

    useEffect(() => {
        if (userLogged) {
            handle_Fetch_Cart();
        }

        if (cart) {
            const total = cart.reduce((acc, item) => acc + item.customerQuantity * item.price, 0);
            setTotal(total);
        }
    }, [userLogged, products, cart]);

    const handleQty = (type, id) => {
        handleToggle(false)
        let checkQtyAvailable = products.find(item => item._id === id)
        let { customerQuantity, quantity } = checkQtyAvailable
        switch (type) {
            case 'add':
                if (quantity > customerQuantity && quantity > 0) {
                    return handleCart(type, id)
                }
                else (
                    handleToggle(`Limited Stock, Only ${quantity} available`)
                )
                break;
            case 'subtract':
                if (customerQuantity <= 1) {
                    return handleCart('cancel', id)
                }
                if (customerQuantity > 0) {
                    return handleCart(type, id)
                }
                break;
            case 'addItem':
                if (quantity <= 1) {
                    return handleToggle('Out of Stock, Item to be replenished soon')
                }
                else {
                    handleCart(type, id)
                }
                break;
        }

    }

    const handleLogout = () => {
        localStorage.removeItem('myAccessToken')
        handleUserLogged()
    }

    return (<Container fluid className='inventory'>
        <Row className='inventory__navbar'>
            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-actions'>
                <div className='d-flex'>
                    {userLogged && (
                        <button className='inventory__navbar-btn' onClick={() => navigate("/useraccount")}>
                            <BiUserCircle className='inventory__navbar-icon' />
                            My account
                        </button>
                    )}

                    <button
                        className='inventory__navbar-btn'
                        onClick={userLogged ? () => handleLogout() : () => navigate("/signIn")}
                    >
                        {userLogged ? 'Logout' : 'Login/register'}
                    </button>
                </div>

                <button className='inventory__navbar-btn inventory__navbar-cart' onClick={userLogged ? () => navigate('/trolley') : () => navigate('/signIn')}>
                    {userLogged && cart.length >= 1 && <span className='inventory__navbar-cart-count'>{cart.length}</span>}
                    <AiOutlineShoppingCart className='inventory__navbar-icon' />
                    {userLogged ? `$${total}` : `$0.00`}
                </button>
            </Col>

            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                Express
            </Col>
        </Row>

        <Row className='back-row'>
            <Col className='back-col'>
                <button onClick={() => navigate('/')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>Homepage</span>
                </button>
            </Col>
        </Row>

        {
            modal &&
            <Row className='inventory__alert my-2'>
                <Col className='inventory__alert-content' lg={4} md={6} sm={10} xs={10}>
                    <>
                        <CiCircleAlert />
                        {modal}
                    </>
                    <button className='inventory__alert-close' onClick={() => handleToggle(false)}> <MdOutlineCancel /> </button>
                </Col>
            </Row>
        }

        <Row className='d-flex justify-content-center m-2'>

            <Col lg={12} md={12} sm={12} xs={12} className='details-container'>
                <div className='details-content'>
                    Discover More About This Product
                </div>
            </Col>

            {findViewed &&
                <Col lg={2} md={3} sm={3} xs={5} className='inventory__product'>
                    <span className='inventory__product-name'>{item}</span>
                    <div>{detail}</div>
                    <div className='inventory__product-actions'>
                        {addItem ?
                            <button className='inventory__product-btn' onClick={() => handleQty('addItem', _id)}>Add</button>
                            :
                            <div className='inventory__product-qty'>
                                <button className='inventory__product-btn m-1' onClick={() => handleQty('subtract', _id)}>-</button>
                                <input className='inventory__product-input' value={customerQuantity} readOnly />
                                <button className='inventory__product-btn m-1' onClick={() => handleQty('add', _id)}>+</button>
                            </div>
                        }
                    </div>
                </Col>
            }
        </Row>
    </Container >)
}
export default ViewMore;


