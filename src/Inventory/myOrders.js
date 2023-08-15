import React, { useEffect } from 'react'
import { Col, Container, Row, Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdKeyboardArrowRight } from "react-icons/md";

const AllOrders = ({ handleDisplay, handleFetchPastOrder }) => {
    const navigate = useNavigate()
    let allOrders = useSelector(state => state.allOrders)

    useEffect(() => {
        if (true) {
            handleFetchPastOrder()
        }
    }, [])

    return (<Container className='display pb-5'>
        <Row className='d-flex justify-content-center'>
            <Col className='personal_Address my-2 text-center' lg={12} md={12} sm={12} xs={12}>My orders</Col>
            {allOrders.length > 0 ?
                <>
                    {allOrders.map((orders, i) => (<Col key={i} lg={12} md={12} sm={12} xs={12} >
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