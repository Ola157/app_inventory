import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiArrowSquareLeftFill } from "react-icons/pi";

const MyAddress = ({ handleAddAddress, handleGetAddress, handleAmends, handleNavigation, handleIncomingMessage }) => {
    let [title, setTitle] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setLastName] = useState('')
    let [buildingName, setBuildingName] = useState('')
    let [buildingNumber, setBuildingNumber] = useState('')
    let [flatNumber, setFlatNumber] = useState('')
    let [street, setStreet] = useState('')
    let [county, setCounty] = useState('')
    let [addressName, setAddressName] = useState('')
    let [editId, setEditId] = useState('')
    const myAddress = useSelector(state => state.address)
    const message = useSelector(state => state.message)
    let [isShowAddress, setShowAddress] = useState(false)

    useEffect(() => {
        handleGetAddress()
    }, []);


    const handleAddress = () => {
        if (firstName && lastName && buildingNumber || buildingName && flatNumber && street && county && addressName) {
            handleAddAddress({ title, firstName, lastName, buildingNumber, buildingName, flatNumber, street, county, addressName, editId })
            setEditId('')
            return setShowAddress(false)
        } else {
            handleIncomingMessage("inputs can't be blank")
        }
    }

    const handleChanges = (type, addressId) => {
        if (type === 'delete') {
            return handleAmends(addressId)
        }
        if (type === 'edit') {
            setEditId(addressId)
            return setShowAddress(true)
        }
    }

    return (<Container fluid className='inventory'>
        <Row className='d-flex justify-content-center align-items-center m-0 navbar '>

            <Col lg={12} md={12} sm={12} xs={12} className='inventory__navbar-title'>
                <button className='trolley-title-btn' onClick={() => handleNavigation('/')}>
                    Express
                </button>
            </Col>
        </Row>

        <Row className='back-row'>
            <Col className='back-col'>
                <button onClick={() => handleNavigation('/useraccount')} className='back-button'>
                    <PiArrowSquareLeftFill className='back-icon' />
                    <span className='back-text'>My Account</span>
                </button>
            </Col>
        </Row>

        {
            message &&
            <Row className='inventory__alert m-2'>
                <Col className='inventory__alert-content' lg={4} md={6} sm={10} xs={10}>
                    {message}
                </Col>
            </Row>
        }

        < Row className='d-flex justify-content-center m-2'>
            <Col className='text-center'>
                <span className='header-title'>My Address</span>
                <span className='my-2 d-block'>{!Array.isArray(myAddress) ? 'You do not have any saved addresses.' : "Here's where you can edit, add or delete your delivery and billing addresses"}
                </span>
                {!isShowAddress && (
                    <div className='d-flex justify-content-center'>
                        <button className='action-btn' onClick={() => setShowAddress(true)}>Add a new address</button>
                    </div>)}
            </Col>
        </Row>


        {isShowAddress ?
            <Row className='d-flex justify-content-center pt-0 bg-white m-2'>
                <Col className='d-flex justify-content-center py-3 mb-5' lg={10} md={10} sm={12} xs={12}>
                    <Col lg={4} md={4} sm={12} xs={12}>
                        <div className='input-section'>
                            <label className='input-label' htmlFor="title">Title</label>

                            <select onChange={(event) => setTitle(event.target.value)} name="title" id="title" className='personalInput w-50'>
                                <option value="">Select</option>
                                <option value="Mr">Mx</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Mr">Mr</option>
                                <option value="Miss">Miss</option>
                                <option value="Ms">Ms</option>
                                <option value="Capt">Capt</option>
                                <option value="Sir">Sir</option>
                            </select>
                        </div>

                        <div className='input-section'>
                            <label className='input-label' htmlFor='firstName'>First Name</label>
                            <input onInput={(event) => setFirstName(event.target.value)} className='personalInput w-100' id='firstName' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='lastName'>Last Name</label>
                            <input onInput={(event) => setLastName(event.target.value)} className='personalInput w-100' id='lastName' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='buildingName'>Building Name</label>
                            <input onInput={(event) => setBuildingName(event.target.value)} className='personalInput w-100' id='buildingName' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='buildingNumberber'>Or building number</label>
                            <input onInput={(event) => setBuildingNumber(event.target.value)} className='personalInput w-100' id='buildingNumberber' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='flatNumberber'>Flat number <span style={{ fontWeight: 'lighter' }}>(if relevant)</span></label>
                            <input onInput={(event) => setFlatNumber(event.target.value)} className='personalInput w-100' id='flatNumberber' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='street'>Street</label>
                            <input onInput={(event) => setStreet(event.target.value)} className='personalInput w-100' id='street' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='county'>County <span style={{ fontWeight: 'lighter' }}>(optional)</span></label>
                            <input onInput={(event) => setCounty(event.target.value)} className='personalInput w-100' id='county' />
                        </div>
                        <div className='input-section'>
                            <label className='input-label' htmlFor='addressName'>Address nickname</label>
                            <p style={{ fontSize: '.8em' }}>Give this address a nickname - it'll make it easier to pick out when you have more than one.</p>
                            <input onInput={(event) => setAddressName(event.target.value)} className='personalInput w-100' id='addressName' />
                        </div>


                        <div className='centered-button-section'>
                            <button className='action-button save-button' onClick={() => handleAddress()}>Save</button>
                        </div>

                        <div className='centered-button-section'>
                            <button className='action-button cancel-button' onClick={() => handleNavigation('/useraccount')}>Cancel</button>
                        </div>
                    </Col>
                </Col>
            </Row>
            : null}

        {!isShowAddress &&
            <Row className='d-flex justify-content-center m-2'>
                {Array.isArray(myAddress) &&
                    myAddress.map((myaddy, index) =>
                        <Col key={index} lg={4} md={8} sm={12} xs={12} className='bg-white p-3 m-1'>
                            <div style={{ fontSize: 'larger', fontWeight: '900' }}>flat {myaddy.flatNumber}, {myaddy.street} </div>
                            <div>{myaddy.title}  {myaddy.firstName}  {myaddy.lastName} </div>
                            <div>flat {myaddy.flatNumber}</div>
                            <div>{myaddy.buildingName} {myaddy.buildingNumber}</div>
                            <div>{myaddy.street}</div>
                            <div>{myaddy.county} </div>
                            <div> {myaddy.addressName} </div>
                            <div className='d-flex justify-content-between align-items-baseline'>
                                <Col lg={6} md={6} sm={6} xs={6}>
                                    <button className='py-0 my-2 border-0 bg-transparent addressButton d-flex justify-content-between align-items-center'
                                        onClick={() => handleChanges('edit', myaddy._id)}>
                                        <GrEdit className='pe-1' style={{ fontSize: '1.7em' }} />
                                        <span className='px-1'>Edit</span>
                                    </button >
                                </Col>
                                <Col lg={6} md={6} sm={6} xs={6}><button className='py-0 m-1 border-0 bg-transparent addressButton d-flex justify-content-between align-items-center'
                                    onClick={() => handleChanges('delete', myaddy._id)}>
                                    <RiDeleteBin6Line className='pe-1' style={{ fontSize: '1.7em' }} />
                                    <span className='px-1'>Delete</span></button>
                                </Col>
                            </div>
                        </Col >)}
            </Row >
        }

        <div className='my-4'>

        </div>
        <footer className="footer-container">
            <Row className='inventory-footer'>
                <Col lg={12} className='text-center'>
                    <p >
                        &copy; {new Date().getFullYear()} Express. All Rights Reserved.
                    </p>
                </Col>
            </Row>
        </footer>
    </Container >)
}
export default MyAddress