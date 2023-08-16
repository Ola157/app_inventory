import React, { useEffect, useState } from 'react';
import { Col, Container, Nav, NavDropdown, Navbar, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { useSelector } from 'react-redux';
import { CiCircleAlert } from "react-icons/ci";
import { GrSearch } from "react-icons/gr";
import axios from 'axios';

const UserPage = ({ handleCart, handleGoods, handle_Fetch_Cart, handleUserLogged }) => {
    const navigate = useNavigate()
    let products = useSelector(state => state.allGoods)
    let userLogged = useSelector(state => state.userLoggedIn)
    let [customQty, setCustQty] = useState('')
    let cart = useSelector(state => state.cart)
    let [modal, setModal] = useState("")
    let [searched, setSearch] = useState('')
    let style = {
        color: 'orange'
    }
    let [total, setTotal] = useState('')


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
        if (cart) {
            let total = cart.reduce((acc, item) => acc + item.customerQuantity * item.price, 0)
            setTotal(total)
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
        setModal(!modal)
    }

    const handleLogout = () => {
        localStorage.removeItem('myAccessToken')
        handleUserLogged()
    }

    const handleSearch = async (itemId) => {
        if (itemId) {
            return setTimeout(async () => {
                try {
                    const response = await axios.get(`https://inventory-be-seven.vercel.app/store/searchItem/${itemId}`)

                    let { findItem } = response.data
                    if (findItem) {
                        return setSearch(findItem)
                    }
                    else {
                        setModal(response.data)
                    }
                }
                catch (err) { console.error(err) };
            }, 2000)
        }

        else if (!itemId) {
            setSearch('')
        }
    }

    return (<Container fluid className='display pb-5'>
        <Row className='navbar d-flex justify-content-between align-items-center'>
            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end align-items-center pe-3 mb-2'>
                {userLogged && (
                    <button className='border-0 bg-transparent d-flex justify-content-end align-items-center mx-1' onClick={() => navigate("/useraccount")}>
                        <BiUserCircle style={{ color: 'black' }} />
                        <span style={{ fontWeight: 'bold' }} className='text-black navaccount m-1'>My account</span>
                    </button>
                )}

                <button
                    className='border-0 bg-transparent navaccount text-black d-flex justify-content-center align-items-center me-2 mx-1'
                    onClick={userLogged ? () => handleLogout("/") : () => navigate("/signIn")}
                    style={{ fontWeight: 'bold' }}
                >
                    {userLogged ? 'Logout' : 'Login/register'}
                </button>

                {cart && (
                    <button className='border-0 text-black bg-transparent py-0 d-flex justify-content-end align-items-center mx-1'
                        style={{ fontWeight: 'bold' }}
                        onClick={() => navigate('/trolley')}>
                        {cart.length > 0 && <sup>{cart.length}</sup>}

                        <AiOutlineShoppingCart style={{ fontSize: '1em' }} className='me-1' />
                        <span style={{ fontSize: '.9em' }}>  {cart.length > 0 ? <>$ {total}</> : <>$0.00</>}</span>

                    </button>
                )}
            </Col>

            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-start text-white px-4'>
                <h2 style={{ color: 'blueviolet' }}>Yesco's</h2>
            </Col>



            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-center m-1 w-100'>
                <input className='me-0 w-100 py-1 inputSearch' placeholder='  Search products' style={{ width: '90%' }} onInput={(event) => handleSearch(event.target.value)} />
            </Col>
        </Row>
        {
            modal ?
                <Row className='d-flex justify-content-center'>
                    <Col className='border py-1 d-flex justify-content-between align-items-center px-1 pe-1 modalAlert' lg={3} md={3} sm={3} xs={4}>
                        <span className='px-1 py-1'><CiCircleAlert style={{ color: 'red' }} /></span>
                        <span className='px-1 pe-1 py-1' style={style}>{modal}</span>
                        <button className='bg-transparent border-0 pe-1 py-1' style={{ color: 'red' }} onClick={handleToggle}>
                            x
                        </button>
                    </Col>
                </Row>
                : ''
        }


        <Row className='d-flex justify-content-evenly my-3 p-2'>
            {products && !searched &&
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
            }

            {typeof searched === Object &&
                <Col lg={2} md={3} sm={3} xs={12} className='m-1 text-center pe-0 px-0 border userProducts'>
                    {/* <img className='img' src={`https://inventory-be-seven.vercel.app/${item.image}`} /> */}

                    {/* <hr className='my-0 w-100'></hr> */}
                    <span className='itemName my-2'>{searched.item}</span>
                    <hr className='my-0 w-100 itemLine my-2'></hr>
                    <div className='d-flex justify-content-center p-1'>
                        {searched.addItem === false ?
                            <input className='border text-center mx-1 border rounded' style={{ width: "50px", height: '25px' }} onChange={event => handleCustomerQuantiy(Number(event.target.value), searched._id)} />
                            : ''}
                        <button className='border-0 btnDis me-1 border rounded'
                            style={{ width: "50px", height: '25px' }}
                            onClick={searched.addItem === false ?
                                () => handleCartItems('addItem', searched._id)
                                :
                                () => handleCartItems('buy', searched._id)
                            }> {searched.addItem === false ? 'Add' : 'Buy'}
                        </button>
                    </div>
                    < hr className='my-0 w-100 itemLine my-2' ></hr>
                    <button className='border-0 py-0 my-2 bg-transparent viewmore' onClick={() => navigate(`/viewmore/${searched._id} `)}>view more</button>
                </Col >}
        </Row >

    </Container >)
}
export default UserPage; 