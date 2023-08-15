import React, { useState, useEffect } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import axios from 'axios';
import { useSelector } from 'react-redux';

const ViewMore = ({ handleCart }) => {
    const { itemId } = useParams();
    let viewed = useSelector(state => state.allGoods)
    let [customerQuantity, setCustQty] = useState('')
    let findViewed = viewed ? viewed.find(good => good._id === itemId) : ''
    let { item, detail, image, _id, addItem } = findViewed
    let products = useSelector(state => state.allGoods)
    let userLogged = useSelector(state => state.userLoggedIn)
    let navigate = useNavigate()

    useEffect(() => {
        let checkCart = products ? products.find(good => good.addItem === false) : ''

        if (checkCart) {
            if (userLogged === false) {
                navigate('/signup')
            }
        }
    }, [userLogged, products])

    const handleCustomerQuantiy = (event, itemId) => {
        setCustQty({ event, itemId })
    }

    const handleCartItems = (any, itemId) => {
        if (any === 'buy') {
            handleCart({ any, itemId });
        } else if (any === 'addItem') {
            const findItem = itemId === customerQuantity.itemId ? customerQuantity : '';
            if (findItem) {
                handleCart({ any, customerQuantity: findItem.event, itemId: findItem.itemId });
            } else {
                handleCart({ any: true, itemId });
            }
        }
    }

    return (<Container fluid className='display pb-5'>
        <Navbar expand="lg" className='bg-black mb-2 icon py-4'>

        </Navbar>

        <Row>
            <Col lg={12} md={12} sm={12} xs={12} className='text-start'>
                <Link to='/' className='d-flex justify-content-start align-items-center' style={{ textDecoration: 'none', color: 'black' }}><BiArrowBack className='m-1' />Back</Link>
            </Col>
            <Col><hr className='m-1 line'></hr></Col>
        </Row>

        <Row className='d-flex justify-content-center m-2'>
            <Col lg={12} md={12} sm={12} xs={12} className='text-center m-1'>More Details On Product</Col>
            <Col lg={12} md={12} sm={12} xs={12}><hr className='m-1 line'></hr></Col>

            {findViewed ?
                <Col lg={3} md={6} sm={12} xs={12} className='border userProducts pe-0 px-0 m-1'>
                    <div><img className='w-100' src={`https://inventory-be-seven.vercel.app/${image}`} /></div>
                    <hr className='my-0'></hr>
                    <div className='text-center itemName'>{item}</div>
                    <hr className='my-0'></hr>
                    <div className='text-center itemName p-1'>{detail}</div>
                    <hr className='my-0'></hr>
                    <div className='d-flex justify-content-center p-1'>
                        {!addItem ?
                            <input className='border text-center mx-1 border rounded' style={{ width: "50px", height: '25px' }}
                                onInput={event => handleCustomerQuantiy(Number(event.target.value), _id)} />
                            : ''}
                        <button className='border-0 btnDis me-1 border rounded'
                            style={{ width: "50px", height: '25px' }}
                            onClick={!addItem ?
                                () => handleCartItems('addItem', _id)
                                :
                                () => handleCartItems('buy', _id)
                            }> {!addItem ? 'Add' : 'Buy'}
                        </button>
                    </div>
                </Col>
                : ''}
        </Row>
    </Container >)
}
export default ViewMore;


