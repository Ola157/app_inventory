import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PiArrowSquareLeftFill } from "react-icons/pi";

const RecordPage = ({ handleRecordPull, handleNavigation }) => {
    const cartRecord = useSelector(state => state.cartRecord)
    const { recordId } = useParams()
    let [total, setTotal] = useState('')
    useEffect(() => {
        handleRecordPull(recordId)
    }, [])

    useEffect(() => {
        const total = cartRecord.length ? cartRecord.reduce((acc, item) => acc + item.cost, 0) : null
        setTotal(total)
    }, [cartRecord])

    return (<Container fluid className='inventory'>
        <Row className='d-flex justify-content-center align-items-center m-0 navbar '>
            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                <button className='trolley-title-btn' onClick={() => handleNavigation('/')}>
                    Express
                </button>
            </Col>
        </Row>

        <Row className='d-flex justify-content-start align-items-center'>
            <Col className='back-col'>
                <button onClick={() => handleNavigation('/allorders')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>All Orders</span>
                </button>
            </Col>
        </Row>

        <Row className="justify-content-center">
            <Col lg={8} md={10} sm={12} xs={12} className="table-responsive">
                <Table bordered>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th className="text-center">Item</th>
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Cost</th>
                        </tr>
                    </thead>
                    <tbody >
                        {cartRecord.map((rec, index) => (
                            <tr key={index}>
                                <td>{rec.date}</td>
                                <td className="text-center">{rec.item}</td>
                                <td className="text-center">{rec.userQuantity}</td>
                                <td className="text-center">{rec.price}</td>
                                <td className="text-center">{rec.cost}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={4}>Total</td>
                            <td className="text-center">{total}</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>

        <footer className="inventory__footer">
            <Container>
                <Row>
                    <Col lg={12} className='text-center'>
                        <p className="inventory__footer-text">
                            &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    </Container>)
}
export default RecordPage