import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BiRightArrow } from "react-icons/bi";
import { useSelector } from 'react-redux';

const MyDetails = ({ handle_Changes, handleMyDetails }) => {
    let [title, setTitle] = useState('')
    let [firstName, setFirstName] = useState('')
    let [lastName, setlastName] = useState('')
    let [email, setEmail] = useState('')
    let [conEmail, setConEmail] = useState('')
    let [epassword, setEpassword] = useState('');
    let [newPassword, setNpassword] = useState('')
    let [conPassword, setConpassword] = useState('')
    let [mobNumber, SetmobNumber] = useState('')
    let [alterNumber, setAltNumber] = useState('')
    let [inputErrStyle, setIES] = useState({})
    const navigate = useNavigate()
    let myDetails = useSelector(state => state.personalDetails)


    let style = {
        errorStyle: { border: '2px solid red' },
        save: { fontWeight: '500', backgroundColor: 'rgb(156, 104, 205)', color: 'white', width: '70%', borderRadius: '2px', border: 'none' },
        cancel: { color: 'white', backgroundColor: 'gray', width: '70%', border: 'none', fontWeight: 'bold', borderRadius: '2px' },
        address: { fontWeight: '500', backgroundColor: 'rgb(156, 104, 205)', color: 'white', borderRadius: '2px', border: 'none' }

    }
    useEffect(() => {
        if (!myDetails) {
            handleMyDetails();
        }
    }, [])


    const handleChanges = () => {
        if (epassword && email === conEmail && newPassword === conPassword && alterNumber) {
            handle_Changes({ any: 'details', title, firstName, lastName, email, epassword, newPassword, mobNumber, alterNumber })
            setAltNumber('')
            setConpassword('')
            setConEmail('')
            setNpassword('')
            setEpassword('')
            setEmail('')
        }
        else {
            setIES({ ...inputErrStyle, errorStyle: style.errorStyle })
            setTimeout(() => { setIES({}) }, 2000)
        }
    }

    return (<Container fluid className='display' >

        <Row>
            <Col className='py-2 px-0 pe-0 d-flex justify-content-start align-items-center' >
                <span lg={1} md={2} sm={3} xs={3}><span className='bg-white py-1'>my account </span>< BiRightArrow className='rightarrow px-0  text-white' /></span>
            </Col>
        </Row>

        <Row className='d-flex justify-content-center'>

            <Col className='text-center' lg={5} md={6} sm={12} xs={12}>
                <span className='personal_Address'>Personal details</span>
                <p className='text-start'>Here's where you can view, update or add to your personal account details.</p>

                <p className='text-start'> To keep your details secure, we'll ask for your password whenever you make any changes.</p>
            </Col>
        </Row >

        <Row className='d-flex justify-content-center'>
            <Col className='bg-white d-flex justify-content-center py-3 my-5' lg={10} md={10} sm={12} xs={12}>
                <Col lg={5} md={5} sm={12} xs={12}>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor="title">Title</label>

                        <select onChange={(event) => setTitle(event.target.value)} value={myDetails.title ? myDetails.title : title} name="title" id="title" style={{ width: '40%' }} className='personalInput'>
                            <option value="Mx">Mx</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Mr">Mr</option>
                            <option value="Miss">Miss</option>
                            <option value="Ms">Ms</option>
                            <option value="Capt">Capt</option>
                            <option value="Sir">Sir</option>
                        </select>
                    </div>


                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='firstName'>First Name</label>
                        <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} value={myDetails.firstName ? myDetails.firstName : firstName} onInput={(event) => setFirstName(event.target.value)} id='firstName' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='lastName'>Last Name</label>
                        <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} value={myDetails.lastName ? myDetails.lastName : lastName} onInput={(event) => setlastName(event.target.value)} id='lastName' className='w-100 personalInput' />
                    </div>

                    <div className='my-4'>
                        <span className='d-block dlabel'>Existing email address</span>
                        <span className='d-block'> {myDetails.email}</span>
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='email'>Email Address</label>
                        <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} value={email} type='email' onInput={(event) => setEmail(event.target.value)} id='email' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='conemail'>Confrim Email Address</label>
                        <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} value={conEmail} type='email' onInput={(event) => setConEmail(event.target.value)} id='conemail' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='epassword'>Existing password <span style={{ fontWeight: 'lighter' }}>(required for changes)</span></label>
                        <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} value={epassword} type='password' onInput={(event) => setEpassword(event.target.value)} id='epassword' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='npassword'>New Password</label>
                        <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} value={newPassword} type='password' onInput={(event) => setNpassword(event.target.value)} id='npassword' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='conpassword'>Confrim New Password</label>
                        <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} value={conPassword} type='password' onInput={(event) => setConpassword(event.target.value)} id='conpassword' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='mobNumber'>Mobile Number</label>
                        <input style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} value={myDetails.mobNumber ? `+44 ${myDetails.mobNumber}` : mobNumber} onInput={(event) => SetmobNumber(event.target.value)} id='mobNumber' className='w-100 personalInput' />
                    </div>

                    <div className='my-2'>
                        <label className='d-block my-2 mx-1 dlabel' htmlFor='altNum'>Alternate Number<span style={{ fontWeight: 'lighter' }}>(optional)</span></label>
                        <input value={alterNumber} style={inputErrStyle ? inputErrStyle.errorStyle : inputErrStyle} onInput={(event) => setAltNumber(event.target.value)} id='altNum' className='w-100 personalInput' />
                    </div>

                    <div className='my-3 text-center'>
                        <button className='py-1' style={style.save} onClick={() => handleChanges()}>Save</button>
                    </div>

                    <div className='my-3 text-center'>
                        <button className='py-1' style={style.cancel} onClick={() => navigate('/useraccount')}>Cancel changes</button>
                    </div>
                </Col>
            </Col>
        </Row>
    </Container >)
}
export default MyDetails