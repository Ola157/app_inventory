import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { CiCircleAlert } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";

const UserPage = ({
    handleGoods,
    handlePullCart,
    handleLogOut,
    handleCancelMessage,
    modifyValue,
    handleSearchedItem,
    handleNavigation,
    handleAddClick,
    handleSubtractClick
}) => {
    const products = useSelector(state => state.goods)
    const isLogged = useSelector(state => state.isLogged)
    const total = useSelector(state => state.total)
    const cart = useSelector(state => state.cart)
    const searched = useSelector(state => state.searched)
    const message = useSelector(state => state.message)

    useEffect(() => {
        handleGoods();
        handlePullCustomerCart()
    }, [])

    const handlePullCustomerCart = () => {
        if (!isLogged) return
        handlePullCart('updatequantity');
    }

    return (< Container fluid className={products.length ? 'inventory' : 'nodisplay'}>

        <Row className='inventory__navbar'>
            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-actions'>
                <div className='d-flex'>
                    {isLogged && (
                        <button className='inventory__navbar-btn' onClick={() => handleNavigation("/useraccount")}>
                            <BiUserCircle className='inventory__navbar-icon' />
                            My account
                        </button>
                    )}

                    <button
                        className='inventory__navbar-btn'
                        onClick={isLogged ? () => handleLogOut() : () => handleNavigation(`/signIn/${'homepage'}/${'user'}`)}
                    >
                        {isLogged ? 'Logout' : 'Login/register'}
                    </button>
                </div>

                <button className='inventory__navbar-btn inventory__navbar-cart' onClick={() => handleNavigation('/trolley')}>
                    {cart.length > 0 ? <span className='inventory__navbar-cart-count'>{cart.length}</span> : ''}
                    <AiOutlineShoppingCart className='inventory__navbar-icon' />
                    {total ? `$${total} ` : '$0.00'}
                </button>
            </Col>

            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                Express
            </Col>

            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-search'>
                <input className='inventory__search-input' placeholder='Search products' onInput={(event) => handleSearchedItem(event.target.value)} />
            </Col>
        </Row>

        {
            message &&
            <Row className='inventory__alert my-2'>
                <Col className='inventory__alert-content' lg={4} md={6} sm={10} xs={10}>
                    <CiCircleAlert />
                    {message}
                </Col>
            </Row>
        }


        <Row className='inventory__products m-0'>
            {products.length > 0 && searched.length < 1 &&
                products.map((item, index) => {
                    return (
                        <Col lg={2} md={3} sm={3} xs={5} className='inventory__product' key={index}>
                            {item.image && (
                                <div className='item-image my-2'>
                                    <img src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/inventory/${item.image}`} alt={item.item} />
                                </div >
                            )}
                            <span className='inventory__product-name my-2'>{item.item}</span>
                            <div className='inventory__product-actions'>

                                {item.addItem === false ? (
                                    <button className='inventory__product-btn'
                                        onClick={() => handleAddClick({ itemId: item._id, newUserQuantity: item.userQuantity, quantity: item.quantity, page: 'homepage' })}>
                                        Add
                                    </button>
                                ) : (
                                    <div className='inventory__product-qty'>
                                        <button className='inventory__product-btn m-1'
                                            onClick={() => handleSubtractClick({ itemId: item._id, newUserQuantity: item.userQuantity, quantity: item.quantity })}
                                        >-</button>
                                        <input className='inventory__product-input' value={item.userQuantity} readOnly />
                                        <button className='inventory__product-btn m-1'
                                            onClick={() => handleAddClick({ itemId: item._id, newUserQuantity: item.userQuantity, quantity: item.quantity })}>
                                            +</button>
                                    </div>
                                )}
                            </div>
                            <button
                                className='inventory__product-more'
                                onClick={() => handleNavigation(`/viewmore/${item._id}`)}
                            >
                                View More
                            </button>
                        </Col >
                    );
                })}


            {
                !searched.length ?
                    null
                    : searched.map((item, index) => (
                        <Col lg={2} md={3} sm={3} xs={5} key={index} className='inventory__product'>
                            <div className='item-image my-2'>
                                {item.image && <img src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/inventory/${item.image}`} />}
                            </div>
                            <span className='inventory__product-name'>{item.item}</span>
                            <div className='inventory__product-actions'>
                                {!item.addItem ?
                                    <button className='inventory__product-btn' onClick={() => modifyValue('addItem', item._id, item.userQuantity, 'homepage')}>Add</button>
                                    :
                                    <div className='inventory__product-qty'>
                                        <button className='inventory__product-btn m-1'
                                            onClick={() => handleSubtractClick({ itemId: item._id, newUserQuantity: item.userQuantity, quantity: item.quantity })}
                                        >-</button>
                                        <input className='inventory__product-input' value={item.userQuantity} readOnly />
                                        <button className='inventory__product-btn m-1'
                                            onClick={() => handleAddClick({ itemId: item._id, newUserQuantity: item.userQuantity, quantity: item.quantity })}
                                        >+</button>
                                    </div>
                                }
                            </div>
                            <button className='inventory__product-more' onClick={() => handleNavigation(`/viewmore/${item._id} `)}>view more</button>
                        </Col>
                    ))
            }
        </Row >
        <footer className="footer-container">
            <Row className='inventory-footer'>
                <Col lg={12} className='text-center'>
                    <p >
                        &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                    </p>
                </Col>
            </Row>
        </footer>

    </Container >)
}
export default UserPage; 