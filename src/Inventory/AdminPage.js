import React, { useEffect, useState } from 'react';
import DisplayItems from './DisplayItems';
import { Col, Container, Navbar, Row } from 'react-bootstrap';
import { Link, usehandleNavigation } from 'react-router-dom';
import { PiArrowSquareLeftFill } from "react-icons/pi";
import axios from 'axios';

const AdminPage = ({ handleAddItem, handleProductAmends, handleNavigation }) => {
    let [item, setItem] = useState('');
    let [quantity, setQty] = useState('');
    let [price, setPrice] = useState('');
    let [image, setImage] = useState('');
    let [description, setDescription] = useState('');
    let [products, setProducts] = useState('')
    let [img, setImg] = useState('')

    useEffect(() => {
        handleFetch()
    })


    const handleFetch = async () => {
        try {
            let response = await axios.get('https://inventory-be-seven.vercel.app/store/getAllgoods')
            let { allGoods } = response.data
            setProducts(allGoods)
        }
        catch (err) {
            console.log(err)
        }
    }


    const selectImage = e => {
        let image = e.target.files[0]
        setImage(image)
    }

    const handleAdd = () => {
        handleAddItem({ item, quantity, image, price, description })
        setDescription('')
        setItem('')
        setPrice('')
        setImage('')
        setQty('')
    }

    return (
        <Container fluid className='inventory'>

            <Navbar expand="lg" className='navbar'>
                <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                    <button className='trolley-title-btn' onClick={() => handleNavigation('/')}>
                        Express
                    </button>
                </Col>
            </Navbar>

            <Row className='d-flex justify-content-start align-items-center'>
                <Col className='back-col'>
                    <button onClick={() => handleNavigation('/')} className='back-button'>
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
                    <input className='admin-input' value={description} placeholder='Description' onInput={event => setDescription(event.target.value)} />
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
                            <DisplayItems each={each} handleProductAmends={handleProductAmends} handleFetch={handleFetch} />
                        </Col>
                    ))}
                </Row>
            }
            <footer className="footer-container">
                <Row className='inventory-footer'>
                    <Col lg={12} className='text-center'>
                        <p >
                            &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                        </p>
                    </Col>
                </Row>
            </footer>
        </Container >
    )
}
export default AdminPage;