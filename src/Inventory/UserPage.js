import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { CiCircleAlert } from "react-icons/ci";
import axios from 'axios';

const UserPage = ({
    handleCart,
    handleGoods,
    handle_Fetch_Cart,
    handleUserLogged,
    handle_Modal
}) => {
    const navigate = useNavigate()
    let products = useSelector(state => state.allGoods)
    let userLogged = useSelector(state => state.userLoggedIn)
    let cart = useSelector(state => state.cart)
    let [modal, handleToggle] = useState("")
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
        handleToggle(false)
        setTimeout(async () => {
            setItemId(itemId)
            try {
                const response = await axios.get(`https://inventory-be-seven.vercel.app/store/searchItem/${itemId}`);
                let { findItem } = response.data;

                if (findItem) {
                    handleToggle(false)
                    return setSearch(findItem);
                } else {
                    handleToggle(response.data);
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
        handleToggle(false)
        let checkQtyAvailable = products.find(item => item._id === id)
        let { customerQuantity, quantity } = checkQtyAvailable
        if (userLogged) {
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
        else {
            navigate('/signIn');
        }
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



            <Col lg={12} md={12} sm={12} xs={12}>
                <input className='me-0 w-100 p-1 inputSearch' placeholder='Search products' style={{ width: '90%' }} onInput={(event) => handleSearch(event.target.value)} />
            </Col>
        </Row>

        {modal &&
            <Row className='d-flex justify-content-center'>
                <Col className='border py-1 d-flex justify-content-between align-items-center px-1 pe-1 modalAlert' lg={3} md={3} sm={3} xs={4}>
                    <span className='px-1 py-1'><CiCircleAlert style={{ color: 'red' }} /></span>
                    <span className='px-1 pe-1 py-1 text-black' >{modal}</span>
                    <button style={{ color: 'red' }} className='border-0' onClick={() => handleToggle(false)}>x</button>
                </Col>
            </Row>
        }

        <Row className='d-flex justify-content-evenly my-3 p-2'>
            {products && !searched &&
                products.map((item, index) =>
                (<Col lg={2} md={3} sm={3} xs={12} className='m-1 text-center pe-0 px-0 border userProducts' key={index}>
                    {/* <img className='img' src={`https://inventory-be-seven.vercel.app/${item.image}`} /> */}

                    {/* <hr className='my-0 w-100'></hr> */}
                    <span className='itemName my-2'>{item.item}</span>
                    <hr className='my-0 w-100 itemLine my-2'></hr>

                    {item.addItem ?
                        <button className='border-0 cartBtn border rounded'
                            style={{ width: "3em", height: '2em' }}
                            onClick={() => handleQty('addItem', item._id)}>Add
                        </button>
                        :
                        <div className='d-flex justify-content-center p-1'>
                            <button className='border-0 text-center cartBtn'
                                onClick={() => handleQty('subtract', item._id)}>-</button>
                            <input className='border-0 text-center' style={{ width: "2em", height: '2em' }}
                                value={item.customerQuantity}
                                readOnly
                            />
                            <button className='border-0 text-center cartBtn'
                                onClick={() => handleQty('add', item._id)}>+</button>
                        </div>
                    }
                    < hr className='my-0 w-100 itemLine my-2' ></hr>
                    <button style={{ height: '2em' }} className='border-0 py-0 my-2 bg-transparent viewmore' onClick={userLogged ? () => navigate(`/viewmore/${item._id} `) : () => navigate('/signIn')}>view more</button>
                </Col >))
            }

            {searched &&
                <Col lg={2} md={3} sm={3} xs={12} className='m-1 text-center pe-0 px-0 border userProducts'>
                    {/* <img className='img' src={`https://inventory-be-seven.vercel.app/${item.image}`} /> */}

                    {/* <hr className='my-0 w-100'></hr> */}
                    <span className='itemName my-2'>{searched.item}</span>
                    <hr className='my-0 w-100 itemLine my-2'></hr>

                    {searched.addItem ?
                        <button className='border-0 btnDis border rounded text-center'
                            style={{ width: "3em", height: '2em' }}
                            onClick={() => handleQty('addItem', searched._id)}>Add
                        </button>
                        :
                        <div className='d-flex justify-content-center p-1'>
                            <button className='border-0 text-center cartBtn'
                                onClick={() => handleQty('subtract', searched._id)}>-</button>
                            <input className='border-0 text-center' style={{ width: "2em", height: '2em' }}
                                value={searched.customerQuantity}
                                readOnly
                            />
                            <button className='border-0 text-center cartBtn'
                                onClick={() => handleQty('add', searched._id)}>+</button>
                        </div>
                    }
                    < hr className='my-0 w-100 itemLine my-2' ></hr>
                    <button className='border-0 py-0 my-2 bg-transparent viewmore' onClick={userLogged ? () => navigate(`/viewmore/${searched._id} `) : () => navigate('/signIn')}>view more</button>
                </Col >}
        </Row >

    </Container >)
}
export default UserPage; 