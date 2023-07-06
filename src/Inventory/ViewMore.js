import React, { useState, useEffect } from 'react';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";

const ViewMore = ({ products, handleAllItem }) => {
    const { itemId } = useParams();
    let [viewMore, setViewedMore] = useState('')
    useEffect(() => {
        let viewItem = products.find((_, i) => i == Number(itemId))
        setViewedMore(viewItem)
    }, [products, []]);

    let { item, detail, image } = viewMore

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

            {viewMore ?
                <Col lg={3} md={6} sm={12} xs={12} className='border userProducts pe-0 px-0 m-1'>
                    <div><img className='w-100' src={require(`./assets/imgs/${image}`)} /></div>
                    <hr className='my-0'></hr>
                    <div className='text-center itemName'>{item}</div>
                    <hr className='my-0'></hr>
                    <div className='text-center itemName'>{detail}</div>
                    <hr className='my-0'></hr>
                    {viewMore.editAdd === 'addItem' ? <div className='text-center p-1'><button className='border-0' onClick={() => handleAllItem('sub', '', Number(itemId))}> - </button><input className='border text-center' value={viewMore.cusQty} style={{ width: "30px" }} onChange={() => handleAllItem()} /><button className='border-0' onClick={() => handleAllItem('add', '', Number(itemId))}>+</button></div>
                        : <div className='text-center'><button onClick={() => handleAllItem('addItem', '', Number(itemId))} className='py-0 border-1 border-black m-1 border rounded btnDis'>Add</button></div>}
                </Col>
                : ''}
        </Row>
    </Container >)
}
export default ViewMore;


