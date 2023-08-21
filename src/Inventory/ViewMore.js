import React, { useState, useEffect } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { CiCircleAlert } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { PiArrowSquareLeftFill } from "react-icons/pi";

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

    return (<Container fluid className='display pb-5'>
        <Row className='navbar d-flex justify-content-between align-items-center m-0'>
            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end align-items-center mb-2 mx-0 me-0 w-100'>
                {userLogged && (
                    <button className='border-0 bg-transparent d-flex justify-content-end align-items-center mx-1' onClick={() => navigate("/useraccount")}>
                        <BiUserCircle style={{ color: 'black' }} />
                        <span style={{ fontWeight: 'bold' }} className='text-black navaccount m-1'>My account</span>
                    </button>
                )}

                <button
                    className='border-0 bg-transparent navaccount text-black d-flex justify-content-center align-items-center me-2 mx-1'
                    onClick={userLogged ? () => handleLogout() : () => navigate("/signIn")}
                    style={{ fontWeight: 'bold' }}
                >
                    {userLogged ? 'Logout' : 'Login/register'}
                </button>


                <button className='border-0 text-black bg-transparent py-0 d-flex justify-content-end align-items-center mx-1'
                    style={{ fontWeight: 'bold' }}
                    onClick={userLogged ? () => navigate('/trolley') : () => navigate('/signIn')}>
                    {userLogged && cart.length >= 1 && <sup>{cart.length}</sup>}

                    <AiOutlineShoppingCart style={{ fontSize: '1em' }} className='me-1' />
                    <span style={{ fontSize: '.9em' }}>  {userLogged ? <>${total}</> : <>$0.00</>}</span>
                </button>

            </Col>

            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-start text-white px-4'>
                <h2 style={{ color: 'blueviolet' }}>Express</h2>
            </Col>
        </Row>

        <Row className='d-flex justify-content-start align-items-center'>
            <Col className='p-0 mx-3 my-1' lg={2} md={2} sm={2} xs={2}>
                <button onClick={() => navigate('/')} className='p-0 border-0 my-1 mx-0 me-0 bg-transparent' style={{ fontSize: '1.3em' }}><PiArrowSquareLeftFill className='my-0 mx-1 me-0 p-0' /><span className='backBtn'>Homepage</span></button>
            </Col>
        </Row>

        {
            modal ?
                <Row className='d-flex justify-content-center'>
                    <Col className='border py-1 d-flex justify-content-between align-items-center px-1 pe-1 modalAlert' lg={3} md={3} sm={3} xs={4}>
                        <span className='px-1 py-1'><CiCircleAlert style={{ color: 'red' }} /></span>
                        <span className='px-1 pe-1 py-1 text-black' >{modal}</span>
                        <button style={{ color: 'red' }} className='border-0' onClick={() => handleToggle(false)}>x</button>
                    </Col>
                </Row>
                : ''
        }

        <Row className='d-flex justify-content-center m-2'>
            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-center my-2'>
                <Col lg={5} md={8} sm={12} xs={12} className='text-center m-1 userpage'>
                    More Details On Product
                </Col>
            </Col>

            {findViewed ?
                <Col lg={3} md={6} sm={12} xs={12} className='border userProducts pe-0 px-0 m-1'>
                    <div><img className='w-100' src={`https://inventory-be-seven.vercel.app/${image}`} /></div>
                    <hr className='my-0'></hr>
                    <div className='text-center itemName'>{item}</div>
                    <hr className='my-0'></hr>
                    <div className='text-center itemName p-1'>{detail}</div>
                    <hr className='my-0'></hr>
                    {addItem ?
                        <div className='text-center'>
                            <button className='border-0 border my-2 rounded text-center cartBtn'
                                style={{ width: "3em", height: '2em' }}
                                onClick={() => handleQty('addItem', _id)}>Add
                            </button>
                        </div>
                        :
                        <div className='d-flex justify-content-center p-1'>
                            <button className='border-0 text-center cartBtn'
                                onClick={() => handleQty('subtract', _id)}>-</button>
                            <input className='border-0 text-center' style={{ width: "2em", height: '2em' }}
                                value={customerQuantity}
                                readOnly
                            />
                            <button className='border-0 text-center cartBtn'
                                onClick={() => handleQty('add', _id)}>+</button>
                        </div>
                    }
                </Col>
                : ''}
        </Row>
    </Container >)
}
export default ViewMore;


