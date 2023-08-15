import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const MyPreference = () => {
    const navigate = useNavigate('')
    let style = {
        save: { fontWeight: '500', backgroundColor: 'rgb(156, 104, 205)', color: 'white', width: '70%', borderRadius: '2px', border: 'none' },
        cancel: { color: 'white', backgroundColor: 'gray', width: '70%', border: 'none', fontWeight: 'bold', borderRadius: '2px' },
    }

    return (<Container fluid className='display'>
        <Row className='d-flex justify-content-center'>
            <Col lg={6} md={6} sm={12} xs={12} className='mb-2'>
                <h4 className='text-center personal_Address'>Groceries preferences</h4>
                <p className='text-center' style={{ fontSize: '.9em' }}> We want to know how you like things done. So here's where you can set your product substitution and marketing communication preferences.</p>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center bg-white'>
            <Col lg={6} md={6} sm={12} xs={12} className='my-4'>
                <h4 className='text-center personal_Address'>Product substitution</h4>
                <p className='text-start' style={{ fontSize: '.9em' }}>  If an item in your online order isn't available, we can substitute it with another similar product. And if you're not happy with the substitute item, you can just return it on the spot to your delivery driver for a full refund.

                    Please note that any changes you make to your preference will automatically update any pending orders.
                </p>
                <div className='px-5'>
                    <Col className='d-flex align-items-baseline'><input name='option' type='radio' className='me-2' /><span>Yes, please bring me substitutes if items aren' t available.</span></Col>
                    <Col className='d-flex align-items-baseline'><input name='option' type='radio' className='me-2' /><span>No, don' t bring me any substitutes if items aren't available. </span></Col>
                </div>
            </Col>
        </Row>
        <Row className='d-flex justify-content-center'>
            <Col lg={4} md={6} sm={6} xs={8}>
                <div className='my-3 text-center'>
                    <button className='py-1' style={style.save} onClick={() => navigate('/useraccount')}>Save Preference</button>
                </div>

                <div className='my-3 text-center'>
                    <button className='py-1' style={style.cancel} onClick={() => navigate('/useraccount')}>Cancel</button>
                </div>
            </Col >
        </Row >
    </Container >)
}
export default MyPreference