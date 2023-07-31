import React, { useState, useEffect } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import axios from 'axios';
import { useSelector } from 'react-redux';

const ViewMore = ({ handleCart }) => {
    const { itemId } = useParams();
    let viewed = useSelector(state => state.allGoods)

    let findViewed = viewed ? viewed.find(good => good._id === itemId) : ''
    let { item, detail, image, _id, customerQuantity, addItem } = findViewed

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
                    <div><img className='w-100' src={`http://localhost:9810/${image}`} /></div>
                    <hr className='my-0'></hr>
                    <div className='text-center itemName'>{item}</div>
                    <hr className='my-0'></hr>
                    <div className='text-center itemName p-1'>{detail}</div>
                    <hr className='my-0'></hr>
                    {addItem === false ?
                        <div className='text-center p-1'><button className='border-0 btnDis' onClick={() => handleCart('subtract', '', _id)}> - </button><input className='border text-center' value={customerQuantity} style={{ width: "50px" }} onInput={handleCart} /><button className='border-0 btnDis' onClick={() => handleCart('add', '', _id)}>+</button></div>
                        : <div className='text-center'><button onClick={() => handleCart('addItem', '', _id)} className='py-0 border-1 m-1 rounded btnDis'>Add</button></div>}
                </Col>
                : ''}
        </Row>
    </Container >)
}
export default ViewMore;


