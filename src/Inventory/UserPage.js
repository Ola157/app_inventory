import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { CiCircleAlert } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import axios from 'axios';

const UserPage = ({
    handleCart,
    handleGoods,
    handle_Fetch_Cart,
    handleUserLogged,
    handle_Modal,
    handleItemModal,
    modalInfo
}) => {
    const navigate = useNavigate()
    let products = useSelector(state => state.allGoods)
    let userLogged = useSelector(state => state.userLoggedIn)
    let cart = useSelector(state => state.cart)
    let [searched, setSearch] = useState('')
    let [total, setTotal] = useState('')
    let [searchId, setItemId] = useState('')


    useEffect(() => {
        let checkActivity = products ? products.find((item) => item.customerQuantity > 0) : ''
        if (!products.length) {
            handleGoods();
        }
        if (userLogged && !checkActivity) {
            setTimeout(() => { handleLogout() }, 1200000)
        }

        if (userLogged) {
            handle_Fetch_Cart();
        }
        if (cart) {
            const total = cart.reduce((acc, item) => acc + item.customerQuantity * item.price, 0);
            setTotal(total);
        }
    }, [userLogged, products, cart]);

    const handleSearch = (itemId) => {
        handleItemModal(false)
        setTimeout(async () => {
            setItemId(itemId)
            try {
                const response = await axios.get(`https://inventory-be-seven.vercel.app/store/searchItem/${itemId}`);
                let { findItem } = response.data;

                if (findItem) {
                    handleItemModal(false)
                    return setSearch(findItem);
                } else {
                    handleItemModal(response.data);
                }
            }
            catch (err) {
                console.error(err);
            }
        }, 800)
        if (!itemId) {
            setSearch('')
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('myAccessToken')
        handleUserLogged()
        handle_Modal()
    }

    const handleQty = (type, id) => {
        handleItemModal(false)
        let checkQtyAvailable = products.find(item => item._id === id)
        let { customerQuantity, quantity } = checkQtyAvailable
        if (userLogged) {
            switch (type) {
                case 'add':
                    if (quantity > customerQuantity && quantity > 0) {
                        return handleCart(type, id)
                    }
                    else (
                        handleItemModal(`Limited Stock, Only ${quantity} available`)
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
                        return handleItemModal('Out of Stock, Item to be replenished soon')
                    }
                    else {
                        handleCart(type, id)
                    }
                    break;
            }
        }
        else {
            navigate(`/signIn/${type}/${id}`);
        }
    }

    return (< Container fluid className='inventory' >

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
                        onClick={userLogged ? () => handleLogout() : () => navigate(`/signIn/${'home'}/${'home'}`)}
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

            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-search'>
                <input className='inventory__search-input' placeholder='Search products' onInput={(event) => handleSearch(event.target.value)} />
            </Col>
        </Row>

        {
            modalInfo &&
            <Row className='inventory__alert my-2'>
                <Col className='inventory__alert-content' lg={4} md={6} sm={10} xs={10}>
                    <>
                        <CiCircleAlert />
                        {modalInfo}
                    </>
                    <button className='inventory__alert-close' onClick={() => handleItemModal(false)}> <MdOutlineCancel /> </button>
                </Col>
            </Row>
        }

        <Row className='inventory__products'>
            {products && !searched &&
                products.map((item, index) => (
                    <Col lg={2} md={3} sm={3} xs={5} className='inventory__product' key={index}>
                        <span className='inventory__product-name'>{item.item}</span>
                        <div className='inventory__product-actions'>
                            {item.addItem ?
                                <button className='inventory__product-btn' onClick={() => handleQty('addItem', item._id)}>Add</button>
                                :
                                <div className='inventory__product-qty'>
                                    <button className='inventory__product-btn m-1' onClick={() => handleQty('subtract', item._id)}>-</button>
                                    <input className='inventory__product-input' value={item.customerQuantity} readOnly />
                                    <button className='inventory__product-btn m-1' onClick={() => handleQty('add', item._id)}>+</button>
                                </div>
                            }
                        </div>
                        <button className='inventory__product-more' onClick={userLogged ? () => navigate(`/viewmore/${item._id} `) : () => navigate(`/signIn/${'viewmore'}/${item._id}`)}>view more</button>
                    </Col>
                ))
            }

            {searched &&
                <Col lg={2} md={3} sm={3} xs={5} className='inventory__product'>
                    <span className='inventory__product-name'>{searched.item}</span>
                    <div className='inventory__product-actions'>
                        {searched.addItem ?
                            <button className='inventory__product-btn' onClick={() => handleQty('addItem', searched._id)}>Add</button>
                            :
                            <div className='inventory__product-qty'>
                                <button className='inventory__product-btn' onClick={() => handleQty('subtract', searched._id)}>-</button>
                                <input className='inventory__product-input' value={searched.customerQuantity} readOnly />
                                <button className='inventory__product-btn' onClick={() => handleQty('add', searched._id)}>+</button>
                            </div>
                        }
                    </div>
                    <button className='inventory__product-more' onClick={userLogged ? () => navigate(`/viewmore/${searched._id} `) : () => navigate(`/signIn/${'viewmore'}/${searched._id}`)}>view more</button>
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
export default UserPage; 