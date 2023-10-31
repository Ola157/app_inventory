import React, { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { CiCircleAlert } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { PiArrowSquareLeftFill } from "react-icons/pi";
import { MdOutlineCancel } from "react-icons/md";

const ViewMore = ({
    handleAddClick,
    handleSubtractClick,
    handleLogOut,
    handleCancelMessage,
    handleViewedItem,
    handleNavigation }) => {

    const { itemId } = useParams();
    let isLogged = useSelector(state => state.isLogged)
    const cart = useSelector(state => state.cart)
    const total = useSelector(state => state.total)
    const viewed = useSelector(state => state.viewed)
    const message = useSelector(state => state.message)

    useEffect(() => {
        handleViewedItem(itemId)
    }, [])


    return (<Container fluid className='inventory'>
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
                        onClick={isLogged ? () => handleLogOut() : () => handleNavigation(`/signIn/${'viewmore'}/${itemId}/${'viewmore'}`)}
                    >
                        {isLogged ? 'Logout' : 'Login/register'}
                    </button>
                </div>

                <button className='inventory__navbar-btn inventory__navbar-cart' onClick={() => handleNavigation('/trolley')}>
                    {cart.length ? <span className='inventory__navbar-cart-count'>{cart.length}</span> : ''}
                    <AiOutlineShoppingCart className='inventory__navbar-icon' />
                    {total ? `$${total}` : '$0.00'}
                </button>
            </Col>

            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                Express
            </Col>
        </Row>

        <Row className='back-row'>
            <Col className='back-col'>
                <button onClick={() => handleNavigation('/')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>Homepage</span>
                </button>
            </Col>
        </Row>

        {message &&
            < Row className='inventory__alert my-1'>
                <Col className='inventory__alert-content' lg={4} md={6} sm={10} xs={10}>
                    <>
                        <CiCircleAlert />
                        {message}
                    </>
                    <button className='inventory__alert-close' onClick={() => handleCancelMessage()}> <MdOutlineCancel /> </button>
                </Col>
            </Row>
        }

        <Row className='d-flex justify-content-center m-1'>

            <Col lg={12} md={12} sm={12} xs={12} className='details-container'>
                <div className='details-content'>
                    Discover More About This Product
                </div>
            </Col>

            {viewed &&
                <Col lg={2} md={3} sm={3} xs={5} className='inventory__product'>
                    <div className='my-2'>
                        {viewed.image && <img src={`https://expressbuckett.s3.eu-west-2.amazonaws.com/inventory/${viewed.image}`} />}
                    </div>
                    <span className='inventory__product-name'>{viewed.item}</span>
                    <div>{viewed.description}</div>
                    <div className='inventory__product-actions'>
                        {!viewed.addItem ?
                            <button className='inventory__product-btn' onClick={() => handleAddClick({ itemId: viewed._id, newUserQuantity: viewed.userQuantity, quantity: viewed.quantity, page: 'viewmore' })}>Add</button>
                            :
                            <div className='inventory__product-qty'>
                                <button className='inventory__product-btn m-1'
                                    onClick={() => handleSubtractClick({ itemId: viewed._id, newUserQuantity: viewed.userQuantity, quantity: viewed.quantity })}>-</button>
                                <input className='inventory__product-input' value={viewed.userQuantity} readOnly />
                                <button className='inventory__product-btn m-1'
                                    onClick={() => handleAddClick({ itemId: viewed._id, newUserQuantity: viewed.userQuantity, quantity: viewed.quantity })}>+</button>
                            </div>
                        }
                    </div>
                </Col>
            }
        </Row>

        <footer className="footer-container  mt-1">
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
export default ViewMore;


