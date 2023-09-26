import React, { useEffect, useState } from 'react';
import DisplayItems from './DisplayItems';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { PiArrowSquareLeftFill } from "react-icons/pi";
import axios from 'axios';

const AdminPage = ({ handleAddItem, handleEditDelete }) => {
    let [item, setItem] = useState('');
    let [quantity, setQty] = useState('');
    let [price, setPrice] = useState('');
    let [image, setImage] = useState('');
    let [detail, setDetail] = useState('');
    let [img, setImg] = useState('')
    let [products, setProducts] = useState('')
    const navigate = useNavigate('')

    useEffect(() => {
        const handleFetch = async () => {
            try {
                let response = await axios.get('https://inventory-be-seven.vercel.app/store/getAllgoods', null)
                let { allGoods } = response.data
                setProducts(allGoods)
            }
            catch (err) {
                console.log(err)
            }
        }
        handleFetch()
    })

    const selectImage = e => {
        setImage(e.target.files[0])
        setImg('')
    }

    const handleAdd = async () => {
        handleAddItem({ item, quantity, image, price, detail })
        setDetail('')
        setItem('')
        setPrice('')
        setImage('')
        setQty('')
    }

    return (
        <Container fluid className='inventory'>

            <Navbar expand="lg" className='navbar'>
                <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                    <button className='trolley-title-btn' onClick={() => navigate('/')}>
                        Express
                    </button>
                </Col>
            </Navbar>

            <Row className='d-flex justify-content-start align-items-center'>
                <Col className='back-col'>
                    <button onClick={() => navigate('/useraccount')} className='back-button'>
                        <PiArrowSquareLeftFill className='back-icon' />
                        <span className='back-text'>Homepage</span>
                    </button>
                </Col>
            </Row>


            <Row className='admin-input-row'>
                <Col className='admin-input-col' lg={2} md={3} sm={10} xs={10}>
                    <input className='admin-input' value={item} placeholder='Item Name' onInput={event => setItem(event.target.value)} />
                </Col>
                <Col className='admin-input-col' lg={2} md={3} sm={10} xs={10}>
                    <input className='admin-input' value={quantity} placeholder='Quantity' onInput={event => setQty(Number(event.target.value))} />
                </Col>
                <Col className='admin-input-col' lg={2} md={3} sm={10} xs={10}>
                    <input className='admin-input' value={price} placeholder='Price' onInput={event => setPrice(Number(event.target.value))} />
                </Col>
                <Col className='admin-input-col' lg={2} md={3} sm={10} xs={10}>
                    <input className='admin-input' value={detail} placeholder='Description' onInput={event => setDetail(event.target.value)} />
                </Col>
                <Col className='admin-input-col' lg={2} md={3} sm={10} xs={10}>
                    <input className='admin-input' type='file' value={img} onChange={selectImage} />
                </Col>
                <Col className='admin-input-col' lg={2} md={3} sm={10} xs={10}>
                    <button className='admin-add-btn' onClick={() => handleAdd()}>ADD</button>
                </Col>
            </Row>

            {products &&
                <Row className='admin-products-row'>
                    {products.map((each, index) => (
                        <Col className='admin-product-col' key={index} lg={3} md={3} sm={5} xs={10}>
                            <DisplayItems each={each} handleEditDelete={handleEditDelete} />
                        </Col>
                    ))}
                </Row>
            }
        </Container >
    )
}
export default AdminPage;