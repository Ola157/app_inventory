import React, { useEffect, useState } from 'react'
import { Col, Container, Navbar, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowRight } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { PiArrowSquareLeftFill } from "react-icons/pi";

const AllOrders = ({ handleDisplay, handleFetchPastOrder, handleUserLogged }) => {
    const navigate = useNavigate()
    let allOrders = useSelector(state => state.allOrders)
    let userLogged = useSelector(state => state.userLoggedIn)

    useEffect(() => {
        if (!userLogged) {
            navigate('/signup')

        }
        if (!allOrders.length) {
            handleFetchPastOrder()
        }
    }, [userLogged, allOrders]);

    const handleLogout = () => {
        localStorage.removeItem('myAccessToken')
        handleUserLogged()
        navigate('/')
    }

    return (<Container fluid className='display pb-5'>
        <Row className='d-flex navbar'>
            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-end text-white px-4'>

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
            </Col>


            <Col lg={12} md={12} sm={12} xs={12} className='d-flex justify-content-start text-white px-4'>
                <button className='border-0 bg-transparent' onClick={() => navigate('/')}>
                    <h2 style={{ color: 'blueviolet' }}>Express</h2>
                </button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-start align-items-center'>
            <Col className='p-0 mx-3 my-1' lg={2} md={2} sm={2} xs={2}>
                <button onClick={() => navigate('/useraccount')} className='p-0 border-0 my-1 mx-0 me-0 bg-transparent' style={{ fontSize: '1.3em' }}><PiArrowSquareLeftFill className='my-0 mx-1 me-0 p-0' /><span className='backBtn'>My Account</span></button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>
            <Col className='personal_Address my-2 text-center' lg={12} md={12} sm={12} xs={12}>My orders</Col>
            {allOrders.length ?
                <>
                    {allOrders.map((orders, i) => (<Col key={i} lg={12} md={12} sm={12} xs={12} className='bg-white'>
                        <button className='my-2 d-flex  py-0 mx-1 datetime' onClick={() => handleDisplay(orders._id)}><span className='d-block'>{orders.date}</span><span className='d-block'><MdKeyboardArrowRight style={{ fontSize: 'larger' }} /></span></button>
                        {orders.showOrder &&
                            <Col className='table-responsive' lg={9} md={6} sm={12} xs={12}>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <th>
                                                Image
                                            </th>
                                            <th>
                                                Item
                                            </th>
                                            <th>
                                                Quantity
                                            </th>
                                            <th>
                                                Cost
                                            </th>
                                        </tr>
                                    </thead>

                                    {orders.cart.map((data, index) => (<tbody key={index}>

                                        <tr>
                                            <td><img style={{ height: '5em', width: '5em' }} src={`https://inventory-be-seven.vercel.app/${orders.image}`} /></td>
                                            < td className='border-x'> {data.item}</td>
                                            <td>{data.customerQuantity}</td>
                                            <td>{data.price * data.customerQuantity}</td>
                                        </tr>
                                    </tbody>))}
                                </Table>
                            </Col>}

                    </Col>))}
                </>
                :
                <Col lg={12} md={12} sm={12} xs={12} className='text-center my-4'>
                    <div className='my-1'>You do not currently have any orders in your account</div>
                    <button className='userAccount py-3' onClick={() => navigate('/')}>Start Shopping</button>
                </Col>
            }
        </Row>
    </Container >)
}
export default AllOrders